import AnalyticsSnapshot from "../models/analyticsSnapshot.model.js";
import { successResponse } from "../utils/response.js";

export const getOverview = async (req, res, next) => {
  try {
    const data = await AnalyticsSnapshot.find({
      userId: req.user._id,
    });

    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};

export const getSubjectAnalytics = async (req, res, next) => {
  try {
    const data = await AnalyticsSnapshot.find({
      userId: req.user._id,
      subject: req.params.subject,
    });

    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};
