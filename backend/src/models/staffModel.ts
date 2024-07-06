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
    startHour: {
      type: String,
      required: true,
    },
    endHour: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const StaffModel = mongoose.model<IStaff>('Staff', staffSchema);
export default StaffModel;
