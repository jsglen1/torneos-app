import { TypeFormTournament } from "@/types/formTournament";
import moment from "moment";
import Swal from "sweetalert2";

export const alertFormTournament = async (): Promise<TypeFormTournament> => {

  const formInputDefault: TypeFormTournament = {
    name: '',
    date: '',
    players: 0
  };

  const formHtml = `
    <form id="myForm">
      <div class="form-wrapper">
        <input id="nombre" class="swal2-input compact-input" placeholder="Nombre Categoria">
        <input  type="date" id="fecha" class="swal2-input compact-input" placeholder="Descripción Categoria" type="text">
        <select id="jugadores" class="swal2-input compact-input">    
          <option value="${1}" >1 vs 1</option>
          <option value="${1}" >2 vs 2</option>
      </select>
      </div>
    </form>
  `;

  try {
    const result = await Swal.fire({
      title: 'Completa el formulario',
      html: formHtml,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      customClass:'alert-form',
      preConfirm: () => {
        return new Promise((resolve) => {
          // Aquí manejas la lógica de envío del formulario
          const name = document.getElementById('nombre') as HTMLInputElement;
          const fecha = document.getElementById('fecha') as HTMLInputElement;
          const jugadores = document.getElementById('jugadores') as HTMLInputElement;


          const formInput: TypeFormTournament = {
            name: name.value,
            date: fecha.value,
            players: parseInt(jugadores.value),
          };
          // Resuelve la promesa a true para que SweetAlert2 se cierre
          resolve(formInput);
        });
      }
    });

    if (result.isConfirmed) {
      return result.value;
    } else {
      return formInputDefault;
    }
  } catch (error) {
    //console.error(error);
    return formInputDefault;
  }
}
