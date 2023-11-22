import { TypeFormUserSignup } from "@/types/formUserSignup";

export const validateFormSignup = (user: TypeFormUserSignup) => {
    return (
        user.name === '' ||
        user.email === '' ||
        user.password === '' 
    );
}