import app from './lib/app';
import httpServer from './lib/http/server';

app.attach(httpServer);
httpServer.listen(8080, () => {
  console.log('sap-moh server is now running at 8080.');
});
