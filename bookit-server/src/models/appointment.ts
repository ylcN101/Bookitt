import mongoose, { Document, Schema } from 'mongoose';

interface Appointment extends Document {
  userId: Schema.Types.ObjectId;
  serviceId: Schema.Types.ObjectId;
  scheduleId: Schema.Types.ObjectId;
  date: Date;
  savedTemporaryDate: Date;
  shopUuid: Schema.Types.ObjectId;
  endDate: Date;
}

const AppointmentSchema = new Schema<Appointment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  scheduleId: { type: Schema.Types.ObjectId, ref: 'Schedule', required: false },
  date: { type: Date, required: true },
  endDate: { type: Date, required: true },
  savedTemporaryDate: { type: Date, default: Date.now },
  shopUuid: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
});

const AppointmentModel = mongoose.model<Appointment>(
  'Appointment',
  AppointmentSchema
);

export default AppointmentModel;
