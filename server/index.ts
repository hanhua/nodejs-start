import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import healthRouter from './routes/health-router';

console.log("================================");
console.log(`NODE_ENV=${process.env.NODE_ENV ?? "(undefined)"}`);
console.log("================================");

const app = express();
const cwd = process.cwd();

app.use('/assets', express.static(path.join(cwd, "assets"), {fallthrough: false}));
app.use(bodyParser.json());

/* BEGIN of API handling */
app.use(healthRouter());
/* End of API handling */
// All other /api will return 404
app.use('/api', (req, res) => {
    res.status(404).send("Not found: " + req.originalUrl);
});
// The rest of the code server the client under ./dist/client
const client_dir = path.join(cwd, "dist", "client");
const index_html = path.join(client_dir, "index.html");
app.use('/', express.static(client_dir, {fallthrough: true}));
app.use('/', (req, res, next) => {
    res.sendFile(index_html);
});

const port = process.env.SERVER_PORT || process.env.PORT || (
    process.env.NODE_ENV === 'production' ? 8080 : 3000
);
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
