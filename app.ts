import express, { Application, Request, Response, NextFunction } from "express";

const app:Application = express();
const port = 8000;


app.get("/", (req: Request, res: Response) => {
  res.send(`Online on ${new Date()}`)
})


app.listen(port, () => console.log("Server running"))