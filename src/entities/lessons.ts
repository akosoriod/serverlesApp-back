import { queryDB, executeTransactWrite, getClient } from "../helpers/dynamoHelper";
import { IParams } from "../interfaces/IParams";

const TABLE_NAME = process.env.TABLE_NAME || "";

export const userlessons = async (username: string): Promise<any> => {
    const params: IParams = {
        TableName: TABLE_NAME,
        IndexName: "Inverted",
        KeyConditionExpression: "#PK = :pk  AND begins_with(#att, :att)",
        ExpressionAttributeValues: {
            ":pk": "USER#" + username,
            "#att": "LESSONS"
        },
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK",
        },
    }
    try {
        return await queryDB(params, "Not friendships yet");
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const allLessons = async (): Promise<any> => {
    const params: IParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#PK = :pk ",
        ExpressionAttributeValues: {
            ":pk": "LESSONS"        },
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