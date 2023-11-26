const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/bus',
        createProxyMiddleware({
            target: 'http://ws.bus.go.kr/api/rest',
            changeOrigin: true,
        })
    );
};
