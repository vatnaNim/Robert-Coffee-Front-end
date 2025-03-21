import Swal from "sweetalert2";

const Alert = (title: string, callback: () => void): void => {
    Swal.fire({
        title: title,
        icon: "success",
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export default Alert;
