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

module.exports.registerPost = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('admin/pages/account/register', {
            pageTitle: "Đăng kí tài khoản",
            errors: errors.array()
        });
    }

    // Check if user already exists
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
        return res.status(400).render('admin/pages/account/register', {
            pageTitle: "Đăng kí tài khoản",
            errors: [{ msg: 'Email đã được đăng ký.' }]
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new Account({
        fullName,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.redirect('/admin/account');
    } catch (err) {
        res.status(500).render('admin/pages/account/register', {
            pageTitle: "Đăng kí tài khoản",
            errors: [{ msg: 'Đã xảy ra lỗi, vui lòng thử lại.' }]
        });
    }
}
