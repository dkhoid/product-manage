const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const accountSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        token: { type: String }, // Token will be generated dynamically
        phone: { type: String },
        avatar: { type: String },
        role_id: { type: String, default: 'user' }, // Default role
        delete: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true }
);

// Instance method to generate JWT
accountSchema.methods.generateAccessToken = function () {
    const payload = { id: this._id, email: this.email, role: this.role_id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Account = mongoose.model('Account', accountSchema, 'users');
module.exports = Account;
