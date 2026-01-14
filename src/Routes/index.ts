import {Router} from "express";
import userRoutes from "./Users/userRoutes";
import servicesRoutes from "./Services/servicesRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/services", servicesRoutes);

export default routes;