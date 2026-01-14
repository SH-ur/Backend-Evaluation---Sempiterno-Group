import { Request, Response } from "express";
import deleteUser from "../../Controllers/Users/delUser";

const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id != "string")
      return res
        .status(400)
        .json({ status: "error", message: "The id must be of string type" });
    const answer = await deleteUser(id);

    if (answer && answer?.status == "success") res.status(200).json(answer);
    else res.status(400).json(answer);
  } catch (error: any) {
    return res.status(500).json(error?.message);
  }
};

export default deleteUserHandler;
