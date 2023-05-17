import crypto from "crypto";
import { ApiHandler } from "sst/node/api";
import { dynamodb } from "@dashboard/core/dynamodb";

interface Vendor {
  vendorName: string;
  description: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  status: "active" | "disabled";
}

export const handler = ApiHandler(async (event) => {
  try {
    if (!event.body) {
      throw new Error("Error: Request body is missing or undefined.");
    }

    const data: Vendor = JSON.parse(event.body);

    const vendorId = crypto.randomUUID();

    await dynamodb.PutItem({
      pk: `VENDOR`,
      sk: `VENDOR#${vendorId}`,
      vendorId,
      vendorName: data.vendorName,
      description: data.description,
      contactPerson: data.contactPerson,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      status: data.status,
    });

    return {
      body: JSON.stringify({
        message: "Success: Vendor creation successful.",
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error: Vendor creation failed.",
      }),
    };
  }
});
