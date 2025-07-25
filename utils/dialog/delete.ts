import Swal, { type SweetAlertResult } from "sweetalert2";

const swalWithTailwindButtons = Swal.mixin({
    customClass: {
        popup: 'liquid-glass-popup',
        confirmButton: "text-md px-5 py-2 bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-md transition-all duration-300",
        cancelButton: "text-md px-5 py-2 bg-red-400 dark:bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-all duration-300",
        actions: "space-x-3"
    },
    background: 'transparent',
    buttonsStyling: false
});

const Delete = (
    title: string,
    text: string,
    confirmTitle: string,
    cancelTitle: string,
    confirmText: string,
    cancelText: string,
    callback: () => void
): void => {
    swalWithTailwindButtons
        .fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
        })
        .then((result: SweetAlertResult): void => {
        if (result.isConfirmed) {
            swalWithTailwindButtons.fire({
            title: confirmTitle,
            text: confirmText,
            icon: "success"
            });
            callback && callback();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithTailwindButtons.fire({
            title: cancelTitle,
            text: cancelText,
            icon: "error"
            });
        }
    });
};

export default Delete;
