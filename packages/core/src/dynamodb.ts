import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

export * as dynamodb from "./dynamodb";

const client = new DynamoDBClient({});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const service = DynamoDBDocumentClient.from(client, translateConfig);

export const Query = async (pk: string) => {
  const params = new QueryCommand({
    TableName: Table.db.tableName,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":pk": pk,
    },
  });

  try {
    const res = await service.send(params);
    return res.Items;
  } catch (error) {
    console.error(error);
    throw new Error("Error: Failed to add item to DynamoDB table.");
  }
};

export const PutItem = async (data: any) => {
  const params = new PutCommand({
    TableName: Table.db.tableName,
    Item: data,
    ConditionExpression: "attribute_not_exists(sk)",
  });

  try {
    const res = await service.send(params);
    return res.Attributes;
  } catch (error) {
    console.error(error);
    throw new Error("Error: Failed to add item to DynamoDB table.");
  }
};
