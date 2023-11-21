import { TypeFormUser } from "@/types/formUser";

export const validateAlertFormUser = (tournament: TypeFormUser) => {
    return (
        tournament.name === '' ||
        tournament.email === '' ||
        tournament.role === ''
    );
}