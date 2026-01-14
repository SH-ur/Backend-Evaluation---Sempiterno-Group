import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface newUserData {
  name: string;
  rol: "CLIENT" | "ADMIN";
  email: string;
  password: string;
}

const newUser = async (userData: newUserData) => {
  try {
    const { name, rol, password, email } = userData;
    if (!name || !rol || !email || !password)
      return { status: "error", message: "All fields are required." };

    //Checking if there's an user with the same email on DB
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        status: "error",
        message: "Email is already in use",
      };
    }

    //Next, Hashing the password
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    if (rol && rol != "ADMIN" && rol != "CLIENT")
      return { status: "error", message: "The rol must be ADMIN or CLIENT." };
    //Now, creating the user after checking
    const theNewUser = await prisma.user.create({
      data: {
        email,
        name,
        rol,
        password: hashedPass,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = theNewUser;

    return {
      status: "success",
      message: "User created successfully",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: "error",
      message: "Internal Server Error Creating User.",
    };
  }
};

export default newUser;
