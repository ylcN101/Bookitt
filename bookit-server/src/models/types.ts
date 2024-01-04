import { Schema, Document } from 'mongoose'

export interface Service extends Document {
  uuid: string
  name: string
  duration: number
  price: number
  shopId: Schema.Types.ObjectId
  serviceImage: string
  isDeleted: boolean
  description: string
}
