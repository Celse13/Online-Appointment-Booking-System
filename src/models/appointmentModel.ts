import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      hour: {
        type: Number,
        min: 0,
        max: 23,
        required: true,
      },
      minute: {
        type: Number,
        min: 0,
        max: 59,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
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
    service: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    }],
  },
  { timestamps: true },
);

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
export default AppointmentModel;