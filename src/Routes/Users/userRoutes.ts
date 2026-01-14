import {Router} from "express";
import createUserHandler from "../../Handlers/Users/AuthHandlers/createUserHandler";
import showUsersHandler from "../../Handlers/Users/AuthHandlers/showUsersHandler";
import login from "../../Handlers/Users/AuthHandlers/login";
import patchUserHandler from "../../Handlers/Users/patchUserHandler";
import blockedUserHandler from "../../Handlers/Users/blockUserHandler";
import deleteUserHandler from "../../Handlers/Users/deleteUserHandler";
import restoreUserHandler from "../../Handlers/Users/restoreUserHandler";

const userRoutes= Router();

userRoutes.post("/new-user", createUserHandler);
userRoutes.post("/show-users", showUsersHandler);
userRoutes.post("/login", login);
userRoutes.patch("/update-user/:id", patchUserHandler)
userRoutes.delete("/block-user/:id", blockedUserHandler)
userRoutes.delete("/delete-user/:id", deleteUserHandler)
userRoutes.put("/restore-user/:id", restoreUserHandler);
export default userRoutes;