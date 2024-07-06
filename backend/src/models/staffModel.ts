import mongoose from 'mongoose';

interface IStaff extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  position: string;
  permissions: string[];
  workingHours: {
    startHour: string;
    endHour: string;
  };
}

const staffSchema = new mongoose.Schema<IStaff>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  permissions: [{
    type: String,
    required: true,
  }],
  workingHours: {
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: 'Invalid time format. Expected HH:MM (24-hour format).'
      }
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: 'Invalid time format. Expected HH:MM (24-hour format).'
      }
    },
  },
}, { timestamps: true });

const StaffModel = mongoose.model<IStaff>('Staff', staffSchema);
export default StaffModel;
