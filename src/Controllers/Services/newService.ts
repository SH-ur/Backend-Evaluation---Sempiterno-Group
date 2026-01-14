import { PrismaClient } from "@prisma/client";
import dateRegex from "../../../Utilities/dateRegex";
const prisma = new PrismaClient();

interface ServiceData {
  adminId: string;
  name: string;
  price: number;
  date_available: string;
  duration: string;
}

const newService = async (serviceData: ServiceData) => {
  try {
    const { name, price, date_available, duration, adminId } = serviceData;

    //Next, we need to prove that the one creating the service for the tool is an ADMIN
    const itIsAdmin = await prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });

    if (itIsAdmin?.rol != "ADMIN")
      return {
        status: "error",
        message:
          "Wow, you're not an ADMIN. Sorry, we cannot continue with this operation anymore.",
      };
    if (
      typeof adminId != "string" ||
      typeof name != "string" ||
      typeof price != "number" ||
      typeof date_available != "string" ||
      typeof duration != "number"
    )
      return {
        status: "error",
        message:
          "Name must be a string, Price an Integer, the Available Date must be a string for now, and duration must be a number too... and do not forget about the ADMIN credentials!",
      };

    //Validate date_available input format
    const valiDate = dateRegex(date_available);
    if (valiDate != null) return valiDate;

    //Just in case, let's validate that the services doesn't have the same names.
    const repeatedName = await prisma.service.findFirst({
      where: {
        name,
      },
    });
    if (repeatedName != null)
      return {
        status: "error",
        message: "Sorry, but it's better to have services with different names",
      };

    //Now, we fix the format to match in Prisma DB
    const fixedDate = new Date(date_available);

    //Now we can actually create the service
    const theNewService = await prisma.service.create({
      data: {
        name,
        price,
        duration,
        date_available: fixedDate,
        userId: adminId,
      },
    });

    return {
      status: "success",
      message: "Service Succesfully Created!",
      theService: theNewService,
    };
  } catch (error: Error | any) {
    console.error("An error Ocurred: " + error);
    throw new Error(error?.message);
  }
};

export default newService;
