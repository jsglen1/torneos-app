import Swal from "sweetalert2"

export const alertValidateSuccess = (text: string, title:string) => {
    return Swal.fire({
        icon: 'success',
        title ,
        text ,
    })
}