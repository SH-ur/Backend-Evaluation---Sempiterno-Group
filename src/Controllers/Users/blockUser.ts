import { PrismaClient } from "@prisma/client";
import deleteMiddleware from "../../../Utilities/deleteMiddleware";

const blockUser = async (id2Block: string) => {
  try {
    if (!id2Block)
      return {
        status: "error",
        message:
          "I'm sorry, we need the id to search the user that you want to block.",
      };
    const prisma = new PrismaClient();

    //Find if it's already blocked.
    const isBlocked = await prisma.user.findUnique({ where: { id: id2Block } });

    if (isBlocked?.deletedAt != null)
      return { status: "error", message: "User it's already blocked." };
    else {
      const blockedRecord = await deleteMiddleware(id2Block, "user", "soft");
      return blockedRecord != undefined
        ? {
            status: "success",
            message: "User Blocked Successfully",
            blockedRecord,
          }
        : {
            status: "error",
            message: "Failed blocking User. Try again later.",
          };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default blockUser;