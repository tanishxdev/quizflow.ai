import {
  getAttemptHistory,
  calculateConsistency,
  classifyTopics,
} from "./analytics.service.js";
import AnalyticsSnapshot from "../models/analyticsSnapshot.model.js";
import { successResponse } from "../utils/response.js";
import { validateSubjectParam } from "./analytics.validator.js";

/**
 * ===============================
 * OVERVIEW ANALYTICS
 * ===============================
 * Returns all analytics snapshots for the user
 */
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

/**
 * ===============================
 * SUBJECT-WISE ANALYTICS
 * ===============================
 * Returns analytics filtered by subject
 */
export const getSubjectAnalytics = async (req, res, next) => {
  try {
    validateSubjectParam(req.params.subject);

    const data = await AnalyticsSnapshot.find({
      userId: req.user._id,
      subject: req.params.subject,
    });

    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};

/**
 * ===============================
 * ATTEMPT HISTORY
 * ===============================
 * Lists all submitted quiz attempts
 */
export const getAttemptHistoryController = async (req, res, next) => {
  try {
    const history = await getAttemptHistory(req.user._id);

    return successResponse(res, history);
  } catch (err) {
    next(err);
  }
};

/**
 * ===============================
 * CONSISTENCY SCORE
 * ===============================
 * Measures performance stability
 */
export const getConsistencyController = async (req, res, next) => {
  try {
    const data = await calculateConsistency(req.user._id);

    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};

/**
 * ===============================
 * WEAK / STRONG TOPIC ANALYSIS
 * ===============================
 * Classifies topics by performance
 */
export const getTopicClassificationController = async (req, res, next) => {
  try {
    const data = await classifyTopics(req.user._id);

    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};
