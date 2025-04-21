import Swal from "sweetalert2";


export const bigSweetAlertPopup = (title: string) => {
    Swal.fire({
        title: title,
        text: "",
        icon: "success"
    });
}