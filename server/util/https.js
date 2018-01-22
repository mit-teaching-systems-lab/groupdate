// Redirect to HTTPS
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }
  return next();
}

module.exports = {enforceHTTPS};