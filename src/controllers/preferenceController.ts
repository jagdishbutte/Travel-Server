import { RequestHandler } from "express";
import Preferences from "../models/preferences";
import User from "../models/users";

const saveUserPreferences: RequestHandler = async (req, res) => {
  const {
    userId,
    tripDuration,
    budgetRange,
    travelType,
    destinationType,
    activities,
    foodPreferences,
    transport,
    accommodation,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let preferences = await Preferences.findOne({ userId });

    if (preferences) {
      // Update existing preferences
      preferences.tripDuration = tripDuration;
      preferences.budgetRange = budgetRange;
      preferences.travelType = travelType;
      preferences.destinationType = destinationType;
      preferences.activities = activities;
      preferences.foodPreferences = foodPreferences;
      preferences.transport = transport;
      preferences.accommodation = accommodation;
    } else {
      // Create new preferences
      preferences = new Preferences({
        userId,
        tripDuration,
        budgetRange,
        travelType,
        destinationType,
        activities,
        foodPreferences,
        transport,
        accommodation,
      });

      // Save the reference in the User model
      user.preferences = preferences._id;
      await user.save();
    }

    await preferences.save();
    res.status(201).json({ message: "Preferences saved successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default saveUserPreferences;
