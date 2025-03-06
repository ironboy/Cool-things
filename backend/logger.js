export default function logger(app) {

  // If behind a reverse-proxy 
  // then trust info from the proxy (about protocol)
  app.enable('trust proxy');

  // listen to all requests so we can log them
  app.use((request, _response, next) => {

    // Collect data to log about the request
    // SPOOFABLE in comments below means "can be modified by a hacker"
    let data = {
      // The request url
      url: request.url,
      // The request method
      requestMethod: request.method,
      // The referrer -> the  page that sent us here  // SPOOFABLE
      referrer: request.header('referrer'),
      // The user-agent - information about the specific browser vendor and version
      // (a lot of lies - but each browser has its own signature) // SPOOFABLE
      userAgent: request.header('user-agent'),
      // Ip number
      // Note: x-forwared-fro used behind reverse-proxies (like Nginx)
      // ::1 -> IP6 equivalent of 127.0.0.1
      ipNumber: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
      // The request body (normally only present on POST and PUT routes)
      requestBody: request.body
    };

    // The ip v6 ::1 is equivalent to ip v4 127.0.0.1 (localhost)
    // and in our opinion 127.0.0.1 is easier to understand
    if (data.ipNumber === '::1') { data.ipNumber = '127.0.0.1' };

    // Modify the url if it is sent from the frontend route helper
    // (so that we get the actual url/route used in the frontend)
    if (data.url.startsWith('/api/frontend-route-change/')) {
      data.url = decodeURIComponent(data.url.split('/').pop());
    }

    // Add the protocol (http or https) 
    // + the host (domain, ip or localhost+port) part to the url
    data.url = request.protocol + '://' +
      (request.headers["x-forwarded-host"] || request.headers.host)
      + data.url;

    console.log(data);

    next();
  });

  // answer calls from the frontend log-helper
  app.get('/api/frontend-route-change/:route', (request, response) => {
    response.json({ ok: true });
  });

}