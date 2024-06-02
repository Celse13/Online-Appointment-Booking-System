import mongoose from 'mongoose';
import { userSchema } from './userModel';
import AdminValidators from '../validators/adminValidators';

// Admin schema => this is the structure of the admin document in the collection

interface IBusiness extends Document {
  [key: string]: any;
}

const BusinessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    permission: {
      type: [String],
      default: ['manage_client', 'approve_appointments'],
    },
    notifications: {
      type: [String],
      default: [],
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    businessDescription: {
      type: String,
      required: false,
      validate: [function(value: string) {
        return value.length >= 10 && value.length <= 500;
      }, 'The business description should be between 10 and 500 characters.'],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
      },
    ],
    
  },
  { timestamps: true },
);
const BusinessModel = mongoose.model<IBusiness>('Business', BusinessSchema);
export { BusinessModel, IBusiness };
