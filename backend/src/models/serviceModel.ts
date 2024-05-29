import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

serviceSchema.pre(/^remove/, async function (next) {
  const service = this as mongoose.Document;
  await mongoose
    .model('Admin')
    .updateMany(
      { services: service._id },
      { $pull: { services: service._id } },
    );
  next();
});

const ServiceModel = mongoose.model('Service', serviceSchema);
export default ServiceModel;
