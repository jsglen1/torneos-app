// next-auth.d.ts
/*
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
*/
// next-auth.d.ts
// next-auth.d.ts
/*
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      rol: string;
      token: string; // Puedes optar por omitir este campo si no es necesario en el cliente
    };
  }

  interface User {
    token: string;
  }

  // Puedes omitir la interfaz JWT si no necesitas usarla directamente
  // y prefieres trabajar directamente con el objeto de sesión.
}

*/

import "next-auth";

declare module "next-auth" { // change type data default next auth

  // type data credentials provider return authorize
  interface User {
    id: number; // Hacer la propiedad 'id' opcional
    name: string;
    email: string;
    rol: string;
    // Otras propiedades...
  }

  // type data client useSession
  interface Session {
    user: {
      email: string;
      token: string;
      rol: string;
    };
  }
}
