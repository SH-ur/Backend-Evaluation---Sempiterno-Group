import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface QueryVars {
  id?: string;
  email?: string;
  name?: string;
  rol?: string;
  page?: string | number;
  limit?: string | number;
  [key: string]: any;
}

interface PaginationResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const showUsers = async (queryVars?: QueryVars): Promise<PaginationResult> => {
  try {
    const whereCondition: Record<string, any> = {
      deletedAt: null,
    };

    const page =
      typeof queryVars?.page === "string"
        ? parseInt(queryVars.page)
        : queryVars?.page || 1;
    const limit =
      typeof queryVars?.limit === "string"
        ? parseInt(queryVars.limit)
        : queryVars?.limit || 10;
    const skip = (page - 1) * limit;

    const { page: _, limit: __, ...filterVars } = queryVars || {};

    if (Object.keys(filterVars).length > 0) {
      Object.entries(filterVars).forEach(([key, value]) => {
        if (!value) return;
        switch (key) {
          case "id":
          case "rol":
            whereCondition[key] = value;
            break;
          case "email":
          case "name":
          default:
            whereCondition[key] = { contains: value, mode: "insensitive" };
        }
      });
    }

    const total = await prisma.user.count({
      where: whereCondition,
    });

    const users = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  } catch (error: unknown) {
    console.error("Error getting users:", error);
    throw new Error(
      error instanceof Error ? error.message : "Unknown error getting users"
    );
  }
};

export default showUsers;