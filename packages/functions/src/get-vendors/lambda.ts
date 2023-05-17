import { ApiHandler } from "sst/node/api";
import { dynamodb } from "@dashboard/core/dynamodb";

export const handler = ApiHandler(async (event) => {
  try {
    const vendors = await dynamodb.Query("VENDOR");

    console.log(vendors);

    return {
      body: JSON.stringify({
        message: "Vendor retrieval successful.",
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error: Vendor retrieval failed.",
      }),
    };
  }
});
