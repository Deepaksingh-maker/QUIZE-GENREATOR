import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    storagePath: { type: String, required: true },
    pageCount: { type: Number, default: 0 },
    extractedText: { type: String, required: true },
    topics: [{ type: String }],
    keyConcepts: [{ type: String }]
  },
  { timestamps: true }
);

export const Document = mongoose.model('Document', documentSchema);
