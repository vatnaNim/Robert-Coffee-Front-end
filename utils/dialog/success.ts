import Swal from "sweetalert2";

const Success = (title: string, callback: () => void): void => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
}).then((result) => {
    if(result.isConfirmed) {
        callback();
    }
});
};

export default Success;

