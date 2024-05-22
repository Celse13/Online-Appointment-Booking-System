import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
  },
  { timestamps: true },
);

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
export default AppointmentModel;
