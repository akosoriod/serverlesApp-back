import { getDB, queryDB, executeTransactWrite,getClient } from "../helpers/dynamoHelper";
import { IParams } from "../interfaces/IParams";

const TABLE_NAME = process.env.TABLE_NAME || "";

export const allfriendships = async (): Promise<any> => {
  const params: IParams = {
    TableName: TABLE_NAME,
    IndexName: "GSI1",
    KeyConditionExpression: "#PK = :pk ",
    ExpressionAttributeValues: {
        ":pk": "FRIENDSHIPS"
    },
    ExpressionAttributeNames: {
        "#PK": "GSI1"
    },
}
  try {
      return await queryDB(params, "Not friendships yet");
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const userFriends = async (username:string): Promise<any> => {
    const params: IParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#PK = :pk ",
        ExpressionAttributeValues: {
            ":pk": "FRIENDS#" + username
        },
        ExpressionAttributeNames: {
            "#PK": "PK"
        },
    }
    try {
        return await queryDB(params, "Not friendships yet");
      } catch (error) {
          console.log(error)
          throw error
      }
  }