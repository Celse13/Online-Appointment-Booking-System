import mongoose from 'mongoose';

interface IClient extends mongoose.Document {
  client: mongoose.Types.ObjectId;
  appointments: mongoose.Types.ObjectId[];
}

const clientSchema = new mongoose.Schema<IClient>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

const ClientModel = mongoose.model<IClient>('Client', clientSchema);
export default ClientModel;
