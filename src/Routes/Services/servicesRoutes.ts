import { Router } from "express";
import createServiceHandler from "../../Handlers/Services/createServiceHandler";
import patchServiceHandler from "../../Handlers/Services/patchServiceHandler";
import getServiceHandler from "../../Handlers/Services/getServiceHandler";

const servicesRoutes = Router();

servicesRoutes.post("/new-service", createServiceHandler);
servicesRoutes.patch("/upd-service/:id", patchServiceHandler);
servicesRoutes.post("/get-services", getServiceHandler);
export default servicesRoutes;
