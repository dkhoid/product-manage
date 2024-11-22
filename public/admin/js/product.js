const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');

    buttonChangeStatus.forEach(button => {
        button.addEventListener('click',  () => {
            const id = button.getAttribute('data-id');
            const currentStatus = button.getAttribute('data-status');
            let changeStatus = currentStatus === "Active" ? "Inactive" : "Active";
            formChangeStatus.action = path +'/'+ changeStatus + '/' + id+"?_method=PATCH";
            formChangeStatus.submit();
        });
    });
}
