import {Request, Response} from "express";
import newService from "../../Controllers/Services/newService";
const createServiceHandler = async(req: Request, res: Response)=>{
    try {
        const answer = await newService(req.body);

        !answer.theService ? res.status(400).json(answer): res.status(201).json(answer);
    } catch (error: Error | any) {
        res.status(500).json(error?.message)
    }
}

export default createServiceHandler;