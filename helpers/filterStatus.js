module.exports = (query) => {
    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
            class: 'active'
        },
        {
            name: 'Hoạt động',
            status: 'Active',
            class: ''
        },
        {
            name: 'Ngừng hoạt động',
            status: 'Inactive',
            class: ''
        }
    ]
    if (query.status) {
        filterStatus.forEach(status => {
            if (status.status === query.status) {
                status.class = 'active';
            } else {
                status.class = '';
            }
        });
    }
    return filterStatus;
}