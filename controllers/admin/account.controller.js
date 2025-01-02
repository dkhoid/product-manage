const Account = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports.index = async (req, res) => {
    const find = {}
    const users = await Account.find(find);
    res.render('admin/pages/account/index', {
        pageTitle:"Danh sách tài khoản",
        users: users
    });
}
module.exports.register = async (req, res) => {
    res.render('admin/pages/account/register', {
        pageTitle:"Đăng kí tài khoản"
    });
}


