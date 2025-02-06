import { Resource } from 'sst';
import { Util } from '@writeitdown/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.Notes.name,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event?.pathParameters?.id,
    },
  };

  const result = await dynamoDB.send(new GetCommand(params));
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  return JSON.stringify(result.Item);
});
