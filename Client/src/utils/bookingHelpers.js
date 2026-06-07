import { DATE_FORMAT_OPTIONS } from "../assets/constance/bookingconfig";

export const fmt = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);

export const daysBetween = (a, b) =>
  Math.max(1, Math.round((new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24)));