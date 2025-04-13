import { Schema, model, Document } from 'mongoose';

interface IFriendDocument extends Document {
  user: string;
  friend: string;
  mutual: boolean;
}

const FriendSchema = new Schema<IFriendDocument>({
  user: { type: String, required: true },
  friend: { type: String, required: true },
  mutual: { type: Boolean, default: true }
}, {
  versionKey: false
});

export default model<IFriendDocument>('Friend', FriendSchema);
