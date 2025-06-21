const { check, validationResult } = require('express-validator');

module.exports = [
    check('fullName').notEmpty().withMessage('Họ và tên không được để trống.'),
    check('email')
        .isEmail()
        .withMessage('Email không hợp lệ.')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự.')
        .matches(/\d/)
        .withMessage('Mật khẩu phải chứa ít nhất một số.')
        .matches(/[A-Z]/)
        .withMessage('Mật khẩu phải chứa ít nhất một chữ cái viết hoa.'),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Mật khẩu xác nhận không khớp.'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('auth/register', {
                errors: errors.array(),
            });
        }
        next();
    },
];
