import axios from "axios";
import { z } from "zod";

const vendorSchema = z.array(
  z.object({
    vendorName: z.string(),
    description: z.string(),
    contactPerson: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    status: z.enum(["active", "disabled"]),
  })
);

export const listVendors = async () => {
  const { data: res } = await axios.get(
    import.meta.env.VITE_APP_API_URL + "/list-vendors"
  );

  return vendorSchema.parse(res.data);
};
