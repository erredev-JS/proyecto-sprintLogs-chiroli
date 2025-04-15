import Swal from "sweetalert2";

export const popUpSweetAlert = (title: String, subtitle: String | "") => {
    let timerInterval = 4000;
    Swal.fire({
      title: title,
      html: subtitle,
      timer: 4000,
      timerProgressBar: true,
      icon: "success",
      toast: true, // ✅ Estilo tipo toast (más pequeño y sin fondo gris)
      position: 'bottom-end', // ✅ Abajo a la derecha
      showConfirmButton: false, // ❌ Sin botón de confirmación
      background: "#fff", // Fondo blanco, o el que prefieras
      didOpen: () => {
        Swal.showLoading();
        
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
}