
import * as z from "zod";

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address line is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required")
});

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;
export const MARITAL_STATUS = ['married', 'unmarried'] as const;

export const personalDetailsSchema = z.object({
  profilePictureUrl: z.string().optional(),
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bloodGroup: z.enum(BLOOD_GROUPS, {
    required_error: "Blood group is required"
  }),
  maritalStatus: z.enum(MARITAL_STATUS, {
    required_error: "Marital status is required"
  }),
  aadharNumber: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number format"),
  uanNumber: z.string().regex(/^\d{12}$/, "UAN number must be 12 digits").optional(),
  esicNumber: z.string().regex(/^\d{17}$/, "ESIC number must be 17 digits").optional(),
  presentAddress: addressSchema,
  permanentAddress: addressSchema.optional(),
  sameAsPresent: z.boolean().optional()
});

export type PersonalDetailsFormSchema = z.infer<typeof personalDetailsSchema>;
