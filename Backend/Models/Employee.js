const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["manager", "admin", "designer","management"], required: true },
    permissions: {
        canView: { type: Boolean, default: false },
        canCreate: { type: Boolean, default: false },
        canEdit: { type: Boolean, default: false },
        canDelete: { type: Boolean, default: false },
    },
});

module.exports = mongoose.model("Employee", employeeSchema);
