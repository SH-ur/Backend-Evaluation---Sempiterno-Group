import {Router} from "express";
import userRoutes from "./Users/userRoutes";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;