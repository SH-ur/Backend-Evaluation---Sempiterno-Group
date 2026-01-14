import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface LoginData {
  email: string;
  password: string;
}

interface AuthResult {
  status: "success" | "error";
  message: string;
  data?: {
    user: any;
    token: string;
  };
}

const auth = async (userData: LoginData): Promise<AuthResult> => {
  try {
    const { email, password } = userData;

    // Validate input
    if (!email || !password) {
      return {
        status: "error",
        message: "Email and password are required",
      };
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return {
        status: "error",
        message: "Invalid email",
      };

    // Check if user is deleted
    if (user.deletedAt) {
      return {
        status: "error",
        message: "Account has been deactivated",
      };
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: "error",
        message: "Invalid Password",
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      status: "success",
      message: "Login successfully!",
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  } catch (error) {
    console.error("Auth error:", error);
    return {
      status: "error",
      message: "Internal server error during authentication",
    };
  }
};

export default auth;