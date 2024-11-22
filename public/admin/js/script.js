//change status bar
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    buttonStatus.forEach(button => {
        let url = new URL(window.location.href);
        button.addEventListener('click', () => {
            buttonStatus.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            console.log(status);
            if (status) {
                url.searchParams.set('status', status);
            } else {
                url.searchParams.delete('status');
            }
            window.location.href = url.href;
        })
    })
}


//form search
const formSearch = document.querySelector('[form-search]');
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set('keyword', keyword);
        } else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    });
}


//pagination
const buttonPagination = document.querySelectorAll('[button-pagination]');
if (buttonPagination.length > 0) {
    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            let url = new URL(window.location.href);
            const page = button.getAttribute('button-pagination');
            if (page > 0) {
                url.searchParams.set('page', page);
            } else {
                url.searchParams.delete('page');
            }
            window.location.href = url.href;
        })
    })
}

