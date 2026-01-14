import { Request, Response } from "express";
import restoreUser from "../../Controllers/Users/restoreUser";

const restoreUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ message: "We need the id to restore the register." });
    if (typeof id != "string")
      return res
        .status(400)
        .json({ status: "error", message: "The id must be of string type" });
    const restoredUser = await restoreUser(id);

    return restoredUser && restoredUser?.userRestored
      ? res.status(200).json(restoredUser)
      : res.status(400).json(restoredUser);
  } catch (error: any) {
    res.status(500).json(error?.message);
  }
};

export default restoreUserHandler;
