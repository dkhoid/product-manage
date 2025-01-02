const { check, validationResult } = require('express-validator');

router.post('/register',
    [
        check('username').notEmpty().withMessage('Tên tài khoản không được để trống.'),
        check('email').isEmail().withMessage('Email không hợp lệ.'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('auth/register', {
                errors: errors.array(),
            });
        }

    }
);
