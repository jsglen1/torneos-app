import { TypeFormTournament } from "@/types/formTournament";

export const validateAlertFormTournament = (tournament: TypeFormTournament) => {
    return (
        tournament.name === '' ||
        tournament.date === '' ||
        isNaN(tournament.max_participants)
    );
}