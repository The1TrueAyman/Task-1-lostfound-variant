import mongoose from 'mongoose';

// TODO: define the Item schema per README.md section 1.

const itemSchema = new mongoose.Schema(
  {
      title: {
        type: String,
        required: true,
        trim: true,
        },
      description: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        enum: ['electronics', 'clothing', 'documents', 'accessories', 'other'],
        default: 'other',
      },
      status: {
        type: String,
        enum: ['lost', 'found', 'claimed'],
        default: 'lost',
      },
      location: {
        type: String,
        trim: true,
      },
      reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // optional - plain field, no extra validation beyond the ref type
      },
      },
  { timestamps: true }
);


// TODO: add the uniqueness constraint described in README.md section 1.

export const Item = mongoose.model('Item', itemSchema);
