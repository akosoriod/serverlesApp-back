import * as AWS from "aws-sdk";
import {DynamoDB} from "aws-sdk";
import {DynamoOperation} from "aws-sdk/clients/iotevents";

const dynamo = new AWS.DynamoDB.DocumentClient();
type executeTransactWriteInput = {
    client: DynamoDB
    params: DynamoDB.Types.TransactWriteItemsInput
}
let client: AWS.DynamoDB | null = null;

export const getClient = (): DynamoDB => {
    if (client) return client
    client = new DynamoDB({
        httpOptions: {
            connectTimeout: 1000,
            timeout: 1000
        }
    })
    return client
}
export const queryDB = async (params: any, msg: string): Promise<any> => {

    return dynamo
        .query(params)
        .promise()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return ({
                err,
                statusCode: 404,
                body: JSON.stringify({
                    message: msg,
                }),
            });
        });
}


export const executeTransactWrite = async ({client, params}: executeTransactWriteInput) => {
    const transactionRequest = client.transactWriteItems(params)
    let cancellationReasons: any;
    transactionRequest.on("extractError", (response: { httpResponse: { body: { toString: () => string; }; }; }) => {
        try {
            cancellationReasons = JSON.parse(response.httpResponse.body.toString()).CancellationReasons
        } catch (err) {
            // suppress this just in case some types of errors aren't JSON parseable
            console.error("Error extracting cancellation error", err)
        }
    })
    return new Promise((resolve, reject) => {
        transactionRequest.send((err, response) => {
            if (err) {
                /* tslint:disable-next-line */
                //err.cancellationReasons = cancellationReasons
                return reject(err)
            }
            return resolve(response)
        })
    })
}

export const getDB = async (params: any, msg: string): Promise<any> => {
    return dynamo
        .get(params)
        .promise()
        .then((result) => {
            return result.Item;
        })
        .catch((err) => {
            return ({
                err,
                statusCode: 404,
                body: JSON.stringify({
                    message: msg,
                }),
            });
        });

}
export const postDB = (params: any, msg: string): Promise<any> => {
    return dynamo
        .put(params)
        .promise()
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log(error);
            return ({
                statusCode: 404,
                body: JSON.stringify({
                    message: msg,
                }),
            });
        });

}
export const scanDB = async (params: any, msg: string, counter: boolean): Promise<any> => {

    return dynamo
        .scan(params)
        .promise()
        .then((result) => {
            if (counter)
                return result.Count;
            else
                return result;
        })
        .catch(() => {
            return ({
                statusCode: 404,
                body: JSON.stringify({
                    message: msg,
                }),
            });
        });

}

export const updateDB = (params: any): Promise<any> => {
    return dynamo.update(params)
        .promise()
        .then((results) => {
            return results;
        }).catch((error) => {
            console.log(error)
            throw error
        })
}
