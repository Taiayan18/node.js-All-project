import express from 'express';
import { route } from './routes/bookroutes.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log("Request hit:", req.method, req.url);
    next();
});

app.use('/api', route);

app.listen(3001, () => {
    console.log("Test server running on 3001");
});
