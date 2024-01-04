import mongoose, { Document, Schema } from 'mongoose'

export type WorkingHours = { start: Date; end: Date }
interface Schedule extends Document {
  uuid: string
  shopId: Schema.Types.ObjectId
  workingHours: WorkingHours[]
  date: Date
}

const ScheduleSchema = new Schema<Schedule>({
  uuid: { type: String, required: true, index: true, unique: true },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  workingHours: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, required: true },
})

const ScheduleModel = mongoose.model<Schedule>('Schedule', ScheduleSchema)

export default ScheduleModel
