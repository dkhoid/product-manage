const Account = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports.resetPassword = async (req, res) => {
    const { email, currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
        // Find the user by email
        const user = await Account.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Verify the current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Current password is incorrect');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).send('Password reset successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while resetting the password');
    }
};
