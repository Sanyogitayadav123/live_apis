import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const BrandModal = mongoose.model('live-brand', brandSchema);

export default BrandModal;
