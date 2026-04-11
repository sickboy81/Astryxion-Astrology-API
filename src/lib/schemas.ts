import { z } from "zod";

export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const BirthDateSchema = z.string().datetime();

export const CommonQueryParamsSchema = z.object({
  lang: z.enum(["en", "pt"]).default("en"),
});

export const SignParamSchema = z.object({
  sign: z.string().min(1),
});

export const PeriodEnum = z.enum(["daily", "weekly", "monthly"]);

export const GeoSearchSchema = z.object({
  location: z.string().min(1),
});

export const TimezoneDstSchema = z.object({
  timezone: z.string().min(1),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});
