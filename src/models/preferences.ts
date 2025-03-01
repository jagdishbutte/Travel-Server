import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  tripDuration: {
    type: [String],
    enum: ["Weekend", "Short", "Long"],
    required: true,
  },
  budgetRange: {
    type: [String],
    enum: ["Economy", "Mid-range", "Luxury"],
    required: true,
  },
  travelType: {
    type: [String],
    enum: ["Solo", "Couple", "Family", "Friends"],
    required: true,
  },
  destinationType: {
    type: [String],
    enum: ["Mountains", "Beaches", "Cities", "Historical Places"],
    required: true,
  },
  activities: {
    type: [String],
    required: true,
  },
  foodPreferences: {
    type: [String],
    enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    required: true,
  },
  transport: {
    type: [String],
    enum: ["Flight", "Train", "Car"],
    required: true,
  },
  accommodation: {
    type: [String],
    enum: ["Budget Hotel", "Luxury Hotel", "Resort"],
    required: true,
  },
});

const Preferences = mongoose.model("Preferences", preferencesSchema);
export default Preferences;
