import { Schema } from 'mongoose';

// User schema definition.
const schema = new Schema(
  {
    title: { $type: String, required: true },
    body: { $type: String },
    user: { $type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    typeKey: '$type', // So that we can use fields named `type`.
  },
);

export default schema;
