
import { z } from "zod";

export const documentSchema = z.object({
  aadharNumber: z.string()
    .regex(/^\d{12}$/)
    .refine((val) => /^\d{12}$/.test(val), {
      message: "! Aadhar number is invalid, Aadhar number should be 12 digit"
    }),
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
      message: "! PAN number is invalid, PAN number must be like CAKPD4545K"
    }),
  esicNumber: z.string()
    .regex(/^\d{17}$/)
    .refine((val) => val === "" || /^\d{17}$/.test(val), {
      message: "! ESIC number is invalid, ESIC number must be 17 digits"
    })
    .optional()
    .or(z.literal("")),
  uanNumber: z.string()
    .regex(/^10\d{10}$/)
    .refine((val) => val === "" || /^10\d{10}$/.test(val), {
      message: "! UAN number is invalid, UAN number must start with 10 and be 12 digits"
    })
    .optional()
    .or(z.literal("")),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
