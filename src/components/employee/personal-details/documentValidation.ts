
import { z } from "zod";

export const documentSchema = z.object({
  aadharNumber: z.string()
    .regex(/^\d{12}$/, "Enter 12 digit Aadhar number")
    .refine((val) => /^\d{12}$/.test(val), {
      message: "Enter 12 digit Aadhar number"
    }),
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter valid PAN")
    .refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
      message: "Enter valid PAN"
    }),
  esicNumber: z.string()
    .regex(/^\d{17}$/, "Enter 17 digit ESIC number")
    .optional()
    .or(z.literal("")),
  uanNumber: z.string()
    .regex(/^10\d{10}$/, "Enter 12 digit UAN starting with 10")
    .optional()
    .or(z.literal("")),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
