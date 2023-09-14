import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const CategoryModal = mongoose.model('live-category', categorySchema);

export default CategoryModal;
