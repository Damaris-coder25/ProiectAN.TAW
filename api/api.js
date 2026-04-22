import express from "express";
import accessRouter from "./routes/access.js";
import homeRouter from "./routes/home.js";

const app = express();
const port = 3000

app.use(express.json());

app.use('/access', accessRouter);
app.use('/product', homeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})