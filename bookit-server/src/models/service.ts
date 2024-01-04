import mongoose, { Schema } from 'mongoose'
import { Service } from './types'

const ServiceSchema = new Schema<Service>({
  uuid: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  serviceImage: { type: String, required: false },
  isDeleted: { type: Boolean, default: false },
  description: { type: String, required: false },
})

const ServiceModel = mongoose.model<Service>('Service', ServiceSchema)

export default ServiceModel
