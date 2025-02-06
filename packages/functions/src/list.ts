import { Resource } from 'sst';
import { Util } from '@writeitdown/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { QueryCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.Notes.name,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDB.send(new QueryCommand(params));

  return JSON.stringify(result.Items);
});
