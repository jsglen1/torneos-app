import { TypeFormUserSignin } from "@/types/formUserSignin";

export const validateFormSignin = (user: TypeFormUserSignin) => {
    return (
        user.email === '' ||
        user.password === ''
    );
}