import mongoose, { Schema } from 'mongoose';

interface AppointmentDocument extends Document {
  serviceName: string;
  client: mongoose.Types.ObjectId;
  clientName: string;
  business?: mongoose.Types.ObjectId;
  staff?: mongoose.Types.ObjectId;
  dateTime: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  service: [
    {
      _id: mongoose.Types.ObjectId;
      name: string;
      location: string;
      cost: number;
    }
  ];
}


const appointmentSchema = new Schema<AppointmentDocument>({
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
      required: false,
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
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
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

const AppointmentModel = mongoose.model<AppointmentDocument>('Appointment', appointmentSchema);
export default AppointmentModel;
