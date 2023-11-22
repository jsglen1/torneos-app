import { TypeFormUser } from "@/types/formUser";

export const validateAlertFormUser = (user: TypeFormUser) => {
    return (
        user.name === '' ||
        user.email === '' ||
        user.password === '' ||
        user.role === ''
    );
}