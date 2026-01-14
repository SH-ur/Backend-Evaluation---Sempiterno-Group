import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./Routes/index";
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET, POST, DELETE, OPTIONS, PUT, PATCH",
        allowHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan("dev"));

//Routes here
app.use("/", routes)
app.get("/", (req, res)=>{
    res.send("API is working :)");
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  }
);

export default app;