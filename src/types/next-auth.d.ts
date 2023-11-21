// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      rol: string;
      token: string;
    };
  }

  interface User {
    token: string;
  }

  interface JWT {
    id: number;
    name: string;
    email: string;
    rol: string;
    token: string;
  }
}

// jwt.d.ts
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    rol: string;
    token: string;
  }
}
