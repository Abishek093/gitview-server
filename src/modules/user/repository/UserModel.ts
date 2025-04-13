import { Schema, model, Document } from 'mongoose';
import { IUserProps } from '../entity/UserEntity'; 

export interface IUserDocument extends IUserProps, Document {}

const UserSchema = new Schema<IUserDocument>({
  login: { type: String, required: true, unique: true },
  name: { type: String },
  company: { type: String },
  blog: { type: String },
  location: { type: String },
  bio: { type: String },
  avatar_url: { type: String, required: true },
  public_repos: { type: Number, default: 0 },
  public_gists: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  deleted: { type: Boolean, default: false }
},
{
  versionKey: false,
});

const UserModel = model<IUserDocument>('User', UserSchema);
export default UserModel;
