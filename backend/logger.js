export default function logger(app, fs, path, __dirname) {

  // open a connection/stream to our log file
  // note: create a new log file every time the backend is restarted
  let logFilePath, count = 1;
  while (!logFilePath || fs.existsSync(logFilePath)) {
    logFilePath = path.join(__dirname, '..', 'logs', `log-${count++}.json`);
  }
  console.log('Logging to', logFilePath)
  let logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  // if behind a reverse-proxy 
  // then trust info from the proxy (about protocol)
  app.enable('trust proxy');

  // listen to all requests so we can log them
  app.use((request, response, next) => {

    // remember when the request was made so we can calculate
    // time it toke to respond later
    let timeRequestWasMade = Date.now();

    // collect data to log about the request
    let data = {
      // when the request was mad
      requestTime: now(),
      // ip number
      // note: x-forwared-fro used behind reverse-proxies (like Nginx)
      // ::1 -> IP6 equivalent of 127.0.0.1
      ipNumber: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
      // the request url
      url: request.url,
      // the request method
      requestMethod: request.method,
      // the request body (normally only present on POST and PUT routes)
      requestBody: request.body,
      // request headers (SPOOFABLE - CAN BE SET BY A HACKER)
      // includes the referrer -> the  page that sent us here  // SPOOFABLE
      // includes the user agent -> information about the browser
      requestHeaders: request.headers,
      // the session id
      // (helps us differentiate users on some IP)
      sessionId: request.session.id
    };

    // the ip v6 ::1 is equivalent to ip v4 127.0.0.1 (localhost)
    // and in our opinion 127.0.0.1 is easier to understand
    if (data.ipNumber === '::1') { data.ipNumber = '127.0.0.1' };

    // modify the url if it is sent from the frontend route helper
    // (so that we get the actual url/route used in the frontend)
    if (data.url.startsWith('/api/frontend-route-change/')) {
      data.url = decodeURIComponent(data.url.split('/').pop());
    }

    // add the protocol (http or https) 
    // + the host (domain, ip or localhost+port) part to the url
    data.url = request.protocol + '://' +
      (request.headers["x-forwarded-host"] || request.headers.host)
      + data.url;

    // wait for the server to send a response
    // so we can add som info about the response too
    // status code, response headers etc
    response.on('finish', () => {
      data.responseHeaders = JSON.parse(JSON.stringify(response.getHeaders()));
      data.responseStatusCode = response.statusCode;
      data.responseTime = now();
      data.responseTimeTakenMs = Date.now() - timeRequestWasMade;

      // write the data about the request to our log file
      logStream.write(JSON.stringify(data, '', '  ') + ',\n\n');

      // log directly to the terminal as well (for educational purposes)
      console.log(data, '\n');
    });

    // let the server - the rest of our backend code - handle the request
    next();
  });

  // answer calls from the frontend log-helper
  app.get('/api/frontend-route-change/:route', (request, response) => {
    response.json({ ok: true });
  });

}

// helper to get date + detailed time with milliseconds
function now() {
  let date = new Date();
  return date.toLocaleString('sv-SE') + ':'
    + date.toISOString().split('.').pop().slice(0, -1);
}