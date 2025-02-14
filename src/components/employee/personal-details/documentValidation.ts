
import { z } from "zod";

export const documentSchema = z.object({
  aadharNumber: z.string()
    .regex(/^\d{12}$/)
    .refine((val) => /^\d{12}$/.test(val), {
      message: "Invalid Aadhar number"
    }),
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
      message: "Invalid PAN number"
    }),
  esicNumber: z.string()
    .regex(/^\d{17}$/)
    .refine((val) => val === "" || /^\d{17}$/.test(val), {
      message: "Invalid ESIC number"
    })
    .optional()
    .or(z.literal("")),
  uanNumber: z.string()
    .regex(/^10\d{10}$/)
    .refine((val) => val === "" || /^10\d{10}$/.test(val), {
      message: "Invalid UAN number"
    })
    .optional()
    .or(z.literal("")),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
