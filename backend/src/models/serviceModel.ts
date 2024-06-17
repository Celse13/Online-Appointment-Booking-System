import mongoose, { Schema } from 'mongoose';

export const serviceCategories = [
  { id: 1, name: 'Health' },
  { id: 2, name: 'Fitness' },
  { id: 3, name: 'Consultation' },
  { id: 4, name: 'Salon And Barber' },
  { id: 5, name: 'Massage And Spa' },
  { id: 6, name: 'Counselling' },
  { id: 7, name: 'Tuition' },
  { id: 8, name: 'Other' },
];

const serviceDaysData = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface ServiceDocument extends Document {
  business: mongoose.Types.ObjectId;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  categoryName: string;
  categoryId: number;
  serviceLocation: string;
  workingHours: {
    startTime: String;
    endTime: String;
  };
  serviceDays: string[];
  date: Date;
  serviceDescription?: string;
}

const serviceSchema = new Schema<ServiceDocument>({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceDuration: {
    type: Number,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  categoryName: {
    type: String,
    required: true,
    enum: serviceCategories.map(category => category.name)
  },
  categoryId: {
    type: Number,
    required: true,
    enum: serviceCategories.map(category => category.id)
  },
  serviceLocation: {
    type: String,
    required: true
  },
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
  serviceDays: {
    type: [String],
    required: true,
    enum: serviceDaysData
  },
  date: {
    type: Date,
    default: Date.now
  },
  serviceDescription: {
    type: String,
    validate: [
      {
        validator: (value: string) => value.length >= 10 && value.length <= 500,
        message: 'The service description should be between 10 and 500 characters.',
      },
    ],
  },
});

serviceSchema.pre('save', async function (next) {
  const service = this as mongoose.Document & {
    business: mongoose.Types.ObjectId;
  };
  await mongoose
    .model('Business')
    .updateOne({ _id: service.business }, { $push: { services: service._id } });
  next();
});


serviceSchema.pre(/^remove/, async function (next) {
  const service = this as mongoose.Document;
  await mongoose.model('Business').updateMany(
      { services: service._id },
      { $pull: { services: service._id } },
    );
  next();
});

serviceSchema.pre('findOneAndDelete', async function (next) {
  const service = await this.model.findOne(this.getFilter());
  if (service) {
    await mongoose.model('Business').updateMany(
      { services: service._id },
      { $pull: { services: service._id } }
    );
  }
  next();
});

const ServiceModel = mongoose.model('Service', serviceSchema);
export default ServiceModel;
