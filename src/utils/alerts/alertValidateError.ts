import Swal from "sweetalert2"

export const alertValidateError = (text: string, title:string) => {
    return Swal.fire({
        icon: 'error',
        title ,
        text ,
    })
}