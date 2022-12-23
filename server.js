// Install express server
import express from 'express';
import path from 'path';
import helmet from "helmet";
import fetch from 'node-fetch';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet(
  {
    contentSecurityPolicy: false
  }
));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/rick-and-morty'));

const createBufferFromImage = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
  // await fs.writeFile(path, buffer);
}

app.get('/image', async function(req,res) {
  // const imagePathSplitted = req.query.image.split('/')
  const buffer = await createBufferFromImage(req.query.image);
  res.end(buffer, 'binary');
  // res.sendFile(req.query.image);
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/rick-and-morty/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
