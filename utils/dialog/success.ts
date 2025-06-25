import Swal from "sweetalert2";

const Success = (title: string, callback?: () => void): void => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: 'transparent',
        customClass: {
            popup: `
              bg-gray-200/20
              border border-white/30
              text-gray-700
              backdrop-blur-md
              rounded-lg
              shadow-lg
              dark:bg-black/30
              dark:border-black/50
              dark:text-gray-200
            `.replace(/\s+/g, ' ').trim(),
            title: `
              text-gray-700
              dark:text-gray-200
            `.replace(/\s+/g, ' ').trim(),
            icon: `
              text-green-500
              dark:text-green-400
            `.replace(/\s+/g, ' ').trim()
        },
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        willClose: () => {
            if (callback) callback();
        }
    });
};

export default Success;
