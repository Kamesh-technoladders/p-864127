
import * as z from "zod";

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required")
});

export const personalDetailsSchema = z.object({
  profilePictureUrl: z.string().optional(),
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  sameAsPresent: z.boolean().optional()
});

export type PersonalDetailsFormSchema = z.infer<typeof personalDetailsSchema>;
