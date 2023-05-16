import { SSTConfig } from "sst";
import { API } from "./stacks/API";
import { Database } from "./stacks/Database";
import { Web } from "./stacks/Web";

export default {
  config(_input) {
    return {
      name: "dashboard",
      region: "us-east-1",
    };
  },

  stacks(app) {
    app.stack(Database).stack(API).stack(Web);

    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
  },
} satisfies SSTConfig;
