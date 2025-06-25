import Swal from "sweetalert2";

const Alert = (title: string, callback: () => void): void => {
    Swal.fire({
        title: title,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
            popup: 'liquid-glass-popup ',
            title: 'text-gray-700 dark:text-white',
            confirmButton: "text-md px-5 py-2 bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-md transition-all duration-300",
        },
        background: 'transparent',
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export default Alert;
