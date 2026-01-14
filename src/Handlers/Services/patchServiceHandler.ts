import { Request, Response } from "express";
import updService from "../../Controllers/Services/updService";

const patchServiceHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Service ID is required in URL parameters",
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "User information is required to update",
      });
    }

    const serviceData = { id, ...updateData };

    const answer = await updService(serviceData);
    answer?.updatedService
      ? res.status(200).json(answer)
      : res.status(400).json(answer);
  } catch (error: any | Error) {
    res.status(500).json(error.message);
  }
};


export default patchServiceHandler;