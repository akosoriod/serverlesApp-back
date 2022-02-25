import { getDB,  executeTransactWrite,getClient } from "../helpers/dynamoHelper";

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