import { PrismaClient } from "@prisma/client";

const restoreUser = async (id2Restore: string) => {
  try {
    if (!id2Restore)
      return { message: "Sorry, we need both model name and id to continue." };
    const prisma = new PrismaClient();
    const itExists = await prisma.user.findUnique({
      where: { id: id2Restore },
    });

    if (itExists == null)
      return {
        status: "error",
        message: `There's no User with that id in the DB.`,
      };
    if (itExists?.deletedAt == null)
      return {
        status: "error",
        message: "There's no user to restore, because it's active!",
      };

    const restoreUser = await prisma.user.update({
      where: {
        id: id2Restore,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoreUser?.email
      ? {
          status: "success",
          message: "User Successfully Restored!",
          userRestored: restoreUser,
        }
      : {
          status: "success",
          message:
            "It seems that we couldn't find any register with that id, so there's nothing to restore.",
        };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default restoreUser;