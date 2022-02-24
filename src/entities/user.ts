import { getDB,  executeTransactWrite,getClient } from "../helpers/dynamoHelper";

const TABLE_NAME = process.env.TABLE_NAME || "";

export const userInfo = async (username:string): Promise<any> => {
  const PK: string = "WALLET";
  const SK: string = "USER#" + username;
  const params = {
      Key: {
          PK,
          SK
      },
      TableName: TABLE_NAME,
      ProjectionExpression: "#pk,#nft,#key",
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#nft": "firstNftClaimed",
        "#key": "public_key",
      }
  };
  try {
      return await getDB(params, "The NFT not exist");
    } catch (error) {
        console.log(error)
        throw error
    }
}