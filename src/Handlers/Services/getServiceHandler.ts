import { Request, Response } from "express";
import getServices from "../../Controllers/Services/getServices";

const getServiceHandler = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const answer = await getServices(req.body);
      return answer?.list
        ? res.status(200).json(answer)
        : res.status(400).json(answer);
    } else {
      const { adminId } = req.body;
      const answer = await getServices();
      return answer?.filteredServices
        ? res.status(200).json(answer)
        : res.status(400).json(answer);
    }
  } catch (error: Error | any) {
    res.status(500).json(error.message);
  }
};

export default getServiceHandler;
