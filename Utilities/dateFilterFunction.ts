import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/client";
const dateFilterFunction = async (
  filter: string,
  fromDate: string,
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  toDate?: string
) => {
  try {
    const fixedFrom = new Date(fromDate);

    if (filter == "FullRange" && fixedFrom && toDate) {
      const fixedTo = new Date(toDate);
      const results = await prisma.service.findMany({
        where: {
          date_available: {
            gte: fixedFrom,
            lte: fixedTo,
          },
        },
      });
      return results;
    } else if (filter == "Half Range" && fixedFrom) {
      const parallelResults = await prisma.service.findMany({
        where: {
          date_available: {
            gte: fixedFrom,
          },
        },
      });
      return parallelResults;
    } else if (filter == "Specific") {
      const specificResult = await prisma.service.findFirst({
        where: {
          date_available: fixedFrom,
        },
      });

      return specificResult;
    }
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

export default dateFilterFunction;
