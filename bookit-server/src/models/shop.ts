import mongoose, { Document, Schema } from 'mongoose'

interface Shop extends Document {
  uuid: string
  name: string
  location: string
  logo?: string
}

const ShopSchema = new Schema<Shop>({
  uuid: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  logo: { type: String, required: false },
})

const ShopModel = mongoose.model<Shop>('Shop', ShopSchema)

export default ShopModel
