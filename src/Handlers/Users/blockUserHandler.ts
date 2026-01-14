import blockUser from "../../Controllers/Users/blockUser";
import { Response, Request } from "express";
const blockedUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id != "string")
     return res
        .status(400)
        .json({ status: "error", message: "The id must be of string type" });

    const answer = await blockUser(id);

    return answer?.blockedRecord && answer?.blockedRecord != undefined
      ? res.status(200).json(answer)
      : res.status(400).json(answer);
  } catch (error: any) {
    return res.status(500).json(error?.message);
  }
};

export default blockedUserHandler;
