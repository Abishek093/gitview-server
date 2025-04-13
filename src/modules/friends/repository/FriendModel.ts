import { Schema, model, Document } from 'mongoose';

interface IFriendDocument extends Document {
  user: string;
  friend: string;
  mutual: boolean;
  avatar_url?: string;
}

const FriendSchema = new Schema<IFriendDocument>({
  user: { type: String, required: true },
  friend: { type: String, required: true },
  mutual: { type: Boolean, default: true },
  avatar_url: {type: String,}
}, {
  versionKey: false
});

export default model<IFriendDocument>('Friend', FriendSchema);
