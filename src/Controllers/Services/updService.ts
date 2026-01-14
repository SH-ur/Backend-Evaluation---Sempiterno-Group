import { PrismaClient } from "@prisma/client";
import dateRegex from "../../../Utilities/dateRegex";
const prisma = new PrismaClient();
interface updateServiceData {
  id: string;
  name?: string;
  price?: number;
  duration?: number;
  date_available?: string;
  adminId: string;
}
const updService = async (data2Update: updateServiceData) => {
  try {
    const { id, name, price, duration, date_available, adminId } = data2Update;

    const itIsAdmin = await prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });
    //First, let's see if the service exists
    const serviceDoesExists = await prisma.service.findUnique({
      where: { id },
    });
    if (!serviceDoesExists)
      return {
        status: "error",
        message: "The service doesn't exist on the DB.",
      };

    //Next, we search if deletedAt is different from null
    if (serviceDoesExists.deletedAt)
      return {
        status: "error",
        message: "That service is blocked. We cannot update.",
      };

    if (itIsAdmin?.rol != "ADMIN")
      return {
        status: "error",
        message:
          "Wow, you're not an ADMIN. Sorry, we cannot continue with this operation anymore.",
      };

    //Now, let's look at the data in data2Update
    const validateLength = Object.keys(data2Update).length;

    if (adminId && id && !(validateLength >= 3))
      return {
        status: "error",
        message:
          "So, you only sent the admin credentials and the service Id, but no value to update in the service?",
      };
    let fixedDate;
    //Validate the Date format_
    if (date_available && typeof date_available == "string") {
      const valiDate = dateRegex(date_available);
      if (valiDate != null) return valiDate;
      fixedDate = new Date(date_available);
    }

    //Next, let's update the service with the available data.
    const upd = await prisma.service.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        duration,
        date_available: fixedDate,
      },
    });

    if (Object.keys(upd).length > 0)
      return {
        status: "success",
        message: "Service Successfully Updated!",
        updatedService: upd,
      };
    else
      return {
        status: "error",
        message: "Something went wrong updating, try again later.",
      };
  } catch (error: any | Error) {
    throw new Error(error?.message);
  }
};

export default updService;
