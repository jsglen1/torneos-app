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
      id: number;
      email: string;
      token: string;
      rol: string;
    };
  }
}
