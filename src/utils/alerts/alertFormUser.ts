import { TypeFormUser } from "@/types/formUser";
import { TypeDefineRolUser } from "@/types/formUserSignup";
import { TypeUserResponse } from "@/types/userReponse";
import moment from "moment";
import Swal from "sweetalert2";


export const alertFormUser = async (initialValues?: TypeUserResponse): Promise<TypeFormUser> => {

  const formInputDefault: TypeFormUser = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  const formHtml = `
  <form id="myFormTournament" class="custom-form">
    <div class="form-group">
      <label for="nombre">Nombre Usuario:</label>
      <input id="nombre" placeholder="nameExample" value="${initialValues?.name || ''}">
    </div>

    <div class="form-group">
      <label for="correo">Correo:</label>
      <input type="email" id="correo" placeholder="email@gmail.com" value="${initialValues?.email || ''}">
    </div>

    <div class="form-group">
    <label for="contrasenia">Contraseña:</label>
    <input type="password" id="contrasenia" placeholder="*******" value="${formInputDefault?.password || ''}">
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
          const password = document.getElementById('contrasenia') as HTMLInputElement;
          const role = document.getElementById('rol') as HTMLInputElement;


          const formInput: TypeFormUser = {
            name: name.value,
            email: email.value,
            password: password.value,
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
