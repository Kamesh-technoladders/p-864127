
import { z } from "zod";

export const documentSchema = z.object({
  aadharNumber: z.string()
    .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits"),
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN number must be in format ABCDE1234F"),
  esicNumber: z.string()
    .regex(/^\d{17}$/, "ESIC number must be exactly 17 digits")
    .optional()
    .or(z.literal("")),
  uanNumber: z.string()
    .regex(/^10\d{10}$/, "UAN number must be 12 digits starting with 10")
    .optional()
    .or(z.literal("")),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
