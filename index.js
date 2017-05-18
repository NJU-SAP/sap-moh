import app from './lib/app';
import httpServer from './lib/http/server';

const PORT = process.env.PORT ? process.env.PORT : 8080

app.attach(httpServer);
httpServer.listen(PORT, () => {
  console.log(`sap-moh server is now running at ${PORT}.`);
});
