const { createProxyMiddleware } = require('http-proxy-middleware');
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const proxyOptions = {
  target: 'http://localhost:5000',
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(502).json({ message: 'Backend server unavailable' });
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.headers['x-auth-token']) {
      proxyReq.setHeader('x-auth-token', req.headers['x-auth-token']);
    }
  }
};

const socketProxyOptions = {
  ...proxyOptions,
  ws: true,
  pathRewrite: { '^/socket.io': '' }
};

module.exports = function(app) {
  // API Proxy with retry middleware
  app.use('/api', createRetryMiddleware(MAX_RETRIES, RETRY_DELAY), createProxyMiddleware(proxyOptions));
  
  // WebSocket Proxy
  app.use('/socket.io', createProxyMiddleware(socketProxyOptions));
};

// Custom retry middleware
function createRetryMiddleware(maxRetries, delay) {
  return function(req, res, next) {
    let retries = 0;
    
    function attemptRequest() {
      const proxy = createProxyMiddleware(proxyOptions);
      
      proxy(req, res, (err) => {
        if (err && retries < maxRetries) {
          retries++;
          console.log(`Retry ${retries} for ${req.path}`);
          setTimeout(attemptRequest, delay);
        } else if (err) {
          next(err);
        } else {
          next();
        }
      });
    }
    
    attemptRequest();
  };
}