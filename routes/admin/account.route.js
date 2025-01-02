const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/account.controller');

router.get('/', controller.index);

router.get('/register', controller.register);

// router.post('/register', async (req, res) => {
//     const { username, email, password, confirmPassword } = req.body;
//
//     // Kiểm tra dữ liệu đầu vào
//     if (!username || !email || !password || !confirmPassword) {
//         return res.status(400).send('Vui lòng điền đầy đủ thông tin.');
//     }
//     if (password !== confirmPassword) {
//         return res.status(400).send('Mật khẩu không khớp.');
//     }
//
//     try {
//         // Kiểm tra tài khoản đã tồn tại
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).send('Email đã được sử dụng.');
//         }
//
//         // Hash mật khẩu
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         // Tạo tài khoản mới
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });
//         await newUser.save();
//
//         // Chuyển hướng sau khi đăng ký thành công
//         res.redirect('/login');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Đã xảy ra lỗi. Vui lòng thử lại.');
//     }
// });

module.exports = router;

