import mongoose from "mongoose";
import { userSchema } from "./userModel";
import AdminValidators from "../validators/adminValidators";


// Admin schema => this is the structure of the admin document in the collection

const adminSchema = new mongoose.Schema({
    permission: {
        type: [String],
        default: ['manage_users', 'approve_appointments']
    },
    notifications: {
        type: [String],
        default: []
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    businessType: {
        type: String,
        required: true
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    }],
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }],
    workingHours: {
        startHour: {
            type: String,
            validate: {
                validator: AdminValidators.validateHour,
                message: "Invalid hour format"
            },
            required: true
        },
        endHour: {
            type: String,
            validate: {
                validator: AdminValidators.validateHour,
                message: "Invalid hour format"
            },
            required: true
        }
    },
    workingDays: {
        type: [String],
        validate: {
            validator: AdminValidators.validateWorkingDays,
            message: "Invalid working days"
        },
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    availability: [{
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }],
    businessAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
    },
}, { timestamps: true });


adminSchema.add(userSchema);

const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;