import express , {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import path from "path"
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const WWW = path.join(__dirname, "../../app/www")

app.use(express.static(WWW));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(WWW, "./index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});