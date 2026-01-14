import { Request, Response } from "express";
import newUser from "../../../Controllers/Users/Auth/newUser";

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log(Object.keys(userData).length === 0);
    // Validate that body is provided
    if (!userData || Object.keys(userData).length === 0)
      return res.status(400).json({
        status: "error",
        message: "User data is required",
      });

    const result = await newUser(userData);

    if (result.status === "success") {
      res.status(201).json({
        status: "success",
        message: result.message,
        data: result.user,
      });
    } else {
      // Handle specific error cases
      if (result.message.includes("Email is already in use")) {
        res.status(409).json({
          status: "error",
          message: result.message,
        });
      } else if (result.message.includes("All fields are required")) {
        res.status(400).json({
          status: "error",
          message: result.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: result.message,
        });
      }
    }
  } catch (error) {
    console.error("Error in postUser:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export default createUserHandler;
