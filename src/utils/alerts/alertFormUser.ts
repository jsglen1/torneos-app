import { TypeFormUser } from "@/types/formUser";
import { TypeDefineRolUser } from "@/types/formUserSignup";
import moment from "moment";
import Swal from "sweetalert2";


export const alertFormUser = async (initialValues?: TypeFormUser): Promise<TypeFormUser> => {

  const formInputDefault: TypeFormUser = {
    name: '',
    email: '',
    role: ''
  };

  const formHtml = `
  <form id="myFormTournament" class="custom-form">
    <div class="form-group">
      <label for="nombre">Nombre Usuario:</label>
      <input id="nombre" placeholder="Ingrese el nombre" value="${initialValues?.name || ''}">
    </div>

    <div class="form-group">
      <label for="correo">Correo:</label>
      <input type="email" id="correo" placeholder="Seleccione la fecha" value="${initialValues?.email || ''}">
    </div>

    <div class="form-group">
      <label for="rol">Rol:</label>
      <select id="rol">
        <option value="${TypeDefineRolUser.user}" ${initialValues?.role === TypeDefineRolUser.user ? 'selected' : ''}>usuario</option>
        <option value="${TypeDefineRolUser.admin}" ${initialValues?.role === TypeDefineRolUser.admin ? 'selected' : ''}>administrador</option>
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
          const email = document.getElementById('correo') as HTMLInputElement;
          const role = document.getElementById('rol') as HTMLInputElement;


          const formInput: TypeFormUser = {
            name: name.value,
            email: email.value,
            role: role.value,
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
