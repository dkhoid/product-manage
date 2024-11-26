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
const formSearch = document.querySelector('#form-search');
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


//checkbox multi
const checkboxMulti = document.querySelector('table[checkbox-multi]');
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='check-all']");
    const inputCheckId = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener('click', () => {
        if (inputCheckAll.checked) {
            inputCheckId.forEach(input => {
                input.checked = true;

            })
        } else {
            inputCheckId.forEach(input => {
                input.checked = false;
            });
        }
    });
    inputCheckId.forEach(input => {
        input.addEventListener('click', () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked === inputCheckId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}

//change status multi
const formChangeMulti = document.querySelector('#form-change-multi-status');
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkboxmulti = document.querySelector('table[checkbox-multi]');
        const inputChecked = checkboxmulti.querySelectorAll("input[name='id']:checked");
        if (inputChecked.length === 0) {
            alert('Vui lòng chọn ít nhất 1 sản phẩm');
        }
        else {
            const checkmultiDelete = e.target.elements.type.value === 'Delete-all';
            if(checkmultiDelete){
                if(!confirm('Bạn có chắc chắn muốn xóa những sản phẩm này không?'))
                    return;
            }
            let ids = [];
            const inputIds = document.querySelector('input[name="ids"]');
            inputChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            });
            console.log(ids.join(','));
            inputIds.value = ids.join(',');
            formChangeMulti.submit();
        }
    });
}


//delete multi
const checkmulti = document.querySelector('#check-multi');