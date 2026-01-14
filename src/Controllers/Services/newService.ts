import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface ServiceData {
    name: string;
    price: number;
    date_available: string;
    duration:string;
}

const newService = async(serviceData: ServiceData)=>{
    try {
        const {name, price, date_available, duration} = serviceData;

        if(typeof name != "string" || typeof price != "number" || typeof date_available != "string" || typeof duration != "number")
            return {status: "error", message: "Name must be a string, Price an Integer, the Available Date must be a string for now, and duration must be a number too"};

        //Validate date_available input format
        const validate = process.env.dateRegexp?.test(date_available);
        if(!validate) return {status: "error", message: "The Available Date Input must be of the format YYYY-MM-DD"}

        //Now, we fix the format to match in Prisma DB

        const fixedDate= new Date(date_available)
    } catch (error) {
        
    }
}