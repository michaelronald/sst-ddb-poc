import { ApiHandler } from "sst/node/api";
import { Time } from "@dashboard/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. I guess the time is ${Time.now()}?`,
  };
});
