import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface updateUserData {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  rol?: "CLIENT" | "ADMIN";
}

const updUser = async (userData: updateUserData) => {
  try {
    const { id, ...updateData } = userData;

    // Validate that ID exists
    if (!id) {
      throw new Error("User ID is required");
    }

    // Check if user exists and is not deleted
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.deletedAt) {
      throw new Error("Cannot update a blocked user");
    }

    // If updating email, check if it already exists with another user
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: updateData.email },
      });

      if (emailExists) {
        throw new Error("That email is already in use by another User");
      }
    }

    // Update only provided fields
    const result = await prisma.user.update({
      where: { id },
      data: { ...updateData },
    });

    return {
      status: "success",
      message: "User updated successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error updating user");
  }
};

export default updUser;