import { PrismaClient } from "@prisma/client";
import dateRegex from "../../../Utilities/dateRegex";
import dateFilterFunction from "../../../Utilities/dateFilterFunction";
interface showServices {
  filter?: string;
  fromDate?: string;
  toDate?: string;
}

const prisma = new PrismaClient();
const getServices = async (data?: showServices) => {
  try {
   
    if (data) {
      const { filter, fromDate, toDate } = data;

      if (fromDate && typeof fromDate == "string") {
        const valiDate = dateRegex(fromDate);
        if (valiDate != null) return valiDate;
      }

      if (toDate && typeof toDate == "string") {
        const valiDate = dateRegex(toDate);
        if (valiDate != null) return valiDate;
      }

      let response;
      if (filter && fromDate && toDate)
        response = await dateFilterFunction(filter, fromDate, prisma, toDate);
      else if (filter && fromDate)
        response = await dateFilterFunction(filter, fromDate, prisma);

      if (response?.length > 0 || response != null)
        return {
          status: "success",
          message: "Here are the Filtered Services.",
          list: response,
        };
      else return { status: "error", message: "Something went wrong..." };
    } else {
      const response = await prisma.service.findMany();
      return response.length > 0
        ? {
            status: "success",
            message: "Here are the List of Services",
            list: response,
          }
        : {
            status: "error",
            message: "It seems that there aren't any Service on the DB",
          };
    }
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

export default getServices;
