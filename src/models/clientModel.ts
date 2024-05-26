import mongoose, { Document, Schema } from 'mongoose';
import { userSchema } from './userModel';

interface IClient extends Document {
  appointment: Array<{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }>
}

const clientSchema = new mongoose.Schema<IClient>({
  ...userSchema.obj,
  appointment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

const ClientModel = mongoose.model<IClient>('Client', clientSchema);
export default ClientModel;