import { StackContext, Api, use } from "sst/constructs";
import { Database } from "./Database";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [use(Database)],
      },
    },
    routes: {
      "GET /dashboard-details":
        "packages/functions/src/dashboard-details/lambda.handler",
      "GET /list-vendors": "packages/functions/src/list-vendors/lambda.handler",
      "POST /create-vendor":
        "packages/functions/src/create-vendor/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
