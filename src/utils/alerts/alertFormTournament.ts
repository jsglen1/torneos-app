import { TypeFormTournament } from "@/types/formTournament";
import moment from "moment";
import Swal from "sweetalert2";


export const alertFormTournament = async (initialValues?: TypeFormTournament): Promise<TypeFormTournament> => {

  const formInputDefault: TypeFormTournament = {
    name: '',
    date: '',
    max_participants: 0
  };

  const formHtml = `
  <form id="myFormTournament" class="custom-form">
    <div class="form-group">
      <label for="nombre">Nombre Torneo:</label>
      <input id="nombre" placeholder="Ingrese el nombre" value="${initialValues?.name || ''}">
    </div>

    <div class="form-group">
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" placeholder="Seleccione la fecha" value="${initialValues?.date || ''}">
    </div>

    <div class="form-group">
      <label for="jugadores">Jugadores:</label>
      <select id="jugadores">
        <option value="1" ${initialValues?.max_participants === 1 ? 'selected' : ''}>1 vs 1</option>
        <option value="2" ${initialValues?.max_participants === 2 ? 'selected' : ''}>2 vs 2</option>
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
      customClass: 'alert-form',
      preConfirm: () => {
        return new Promise((resolve) => {
          // Aquí manejas la lógica de envío del formulario
          const name = document.getElementById('nombre') as HTMLInputElement;
          const fecha = document.getElementById('fecha') as HTMLInputElement;
          const jugadores = document.getElementById('jugadores') as HTMLInputElement;


          const formInput: TypeFormTournament = {
            name: name.value,
            date: fecha.value,
            max_participants: parseInt(jugadores.value),
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
