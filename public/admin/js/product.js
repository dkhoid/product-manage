const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');

    buttonChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const currentStatus = button.getAttribute('data-status');
            let changeStatus = currentStatus === "Active" ? "Inactive" : "Active";
            formChangeStatus.action = path + '/' + changeStatus + '/' + id + "?_method=PATCH";
            formChangeStatus.submit();
        });
    });
}




const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete");
    const path = formDelete.getAttribute('data-path');

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure you want to delete this category?");

            if (isConfirm) {
                const id = button.getAttribute("data-id");
                formDelete.action = path + "/" + id + "/?_method=DELETE";  // Set form action for DELETE request
                formDelete.submit();  // Submit the form
            }
        });
    });
}
