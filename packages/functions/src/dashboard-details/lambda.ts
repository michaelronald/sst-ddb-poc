import { ApiHandler } from "sst/node/api";
import { dynamodb } from "@dashboard/core/dynamodb";

export const handler = ApiHandler(async (event) => {
  try {
    const vendors = await dynamodb.Query("VENDOR");

    const count = vendors?.length || 0;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Dashboard details retrieval successful.",
        data: count,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error: Dashboard details retrieval failed.",
      }),
    };
  }
});
