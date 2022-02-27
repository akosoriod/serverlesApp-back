import { getDB,  executeTransactWrite,getClient, queryDB } from "../helpers/dynamoHelper";
import { IParams, IResponse } from "../interfaces/IParams";
import { userlessons } from "./lessons";

const TABLE_NAME = process.env.TABLE_NAME || "";

export const userInfo = async (username:string): Promise<any> => {
  const PK: string = "USER";
  const SK: string = "USER#" + username;
  const params = {
      Key: {
          PK,
          SK
      },
      TableName: TABLE_NAME
  };
  try {
      return await getDB(params, "The user not exist");
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const allUsers = async (): Promise<any> => {
    let users: IResponse = {Items: []};

    const params: IParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#PK = :pk ",
        ExpressionAttributeValues: {
            ":pk": "USER"
        },
        ExpressionAttributeNames: {
            "#PK": "PK"
        },
    }

    try {
        users = await queryDB(params, "Not friendships yet");
        return users;

      } catch (error) {
          console.log(error)
          throw error
      }
  }

