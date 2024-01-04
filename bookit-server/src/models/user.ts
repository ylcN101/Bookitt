import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  username: string;
  password: string;
  uid: string;
  image: string;
  roles: string[];
  shopId: string;
  phone: string;
  lastLogin: Date;
  isAdmin: boolean;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, required: false, unique: false },
  password: { type: String, required: false },
  image: { type: String, required: false },
  roles: { type: [String], required: false },
  shopId: { type: String, required: false },
  phone: { type: String, required: true, unique: true },
  lastLogin: { type: Date, default: Date.now },
  uid: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
