import { model, models, Schema } from 'mongoose';

type ModelsType = {
  Subscriber: any;
};

export type SubscriberType = {
  email: string;
  createdAt: Date;
};

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscriber = (models as ModelsType)?.Subscriber || model('Subscriber', subscriberSchema);
