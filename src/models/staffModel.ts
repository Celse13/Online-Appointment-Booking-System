import mongoose from 'mongoose';
import StaffValidators from '../validators/staffValidators';

import { userSchema } from './userModel';
const staffSchema = userSchema.clone();

staffSchema.add({
  position: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
  workingHours: {
    startHour: {
      type: String,
      validate: {
        validator: StaffValidators.validateHour,
        message: 'Invalid hour format',
      },
      required: true,
    },
    endHour: {
      type: String,
      validate: {
        validator: StaffValidators.validateHour,
        message: 'Invalid hour format',
      },
      required: true,
    },
  },
});

const StaffModel = mongoose.model('Staff', staffSchema);
export default StaffModel;
