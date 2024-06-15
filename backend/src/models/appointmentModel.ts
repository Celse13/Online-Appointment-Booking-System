import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    clientName: {
      type: String,
      ref: 'Client',
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: false,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    service: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true
        },
        cost: {
          type: Number,
          required: true
        }
      },
    ],
  },
  { timestamps: true },
);

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
export default AppointmentModel;
