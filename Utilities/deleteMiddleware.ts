import { deleteMiddlewareAnswer, modelTypes } from "../types/controllerTypes";
import { modelType } from "../types/controllerTypes"
const newDeletedRecord = async (
  idToDelete: string,
  model: modelType,
  delType: string
): Promise<deleteMiddlewareAnswer | undefined> => {
  try {
    const modelDelegate = modelTypes[model];
    if (!idToDelete || !model || !delType)
      return {
        message:
          "I'm Sorry, we need this information to make a delete function.",
      };

    if (delType == "normal") {
      const recordExists = await (modelDelegate as any).findUnique({
        where: { id: idToDelete },
      });

      if (!recordExists)
        return {
          message: `That ${model} doesn't exist in the DB.`,
        };
      const deletedRecord = await (modelDelegate as any).delete({
        where: {
          id: idToDelete,
        },
      });
      const deleteState = await (modelDelegate as any).findUnique({
        where: { id: idToDelete },
      });
      return deleteState == null ? deletedRecord : undefined;
    } else if (delType == "soft") {
      const recordExists = await (modelDelegate as any).findUnique({
        where: { id: idToDelete },
      });
      if (!recordExists)
        return {
          message: `That ${model} doesn't exist in the DB.`,
        };
      else if (recordExists.deletedAt != null)
        return { message: `That ${model} is already blocked.` };
      const softDelete = await (modelDelegate as any).update({
        where: {
          id: idToDelete,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return softDelete.deletedAt != null ? softDelete : undefined;
    }
  } catch (error: any | unknown) {
    throw new Error(error?.message);
  }
};

export default newDeletedRecord;