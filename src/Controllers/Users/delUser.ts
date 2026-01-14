import newDeletedRecord from "../../../Utilities/deleteMiddleware";

const deleteUser = async (id2Delete: string) => {
  try {
    if (!id2Delete) return { status: "error", message: "Sorry, missing ID." };

    const deletedRecord = await newDeletedRecord(id2Delete, "user", "normal");
    return !deletedRecord?.message && typeof deletedRecord != undefined
      ? {
          status: "success",
          message: "User Successfully Deleted!",
          deletedUser: deletedRecord,
        }
      : { status: "error", message: deletedRecord?.message };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default deleteUser;