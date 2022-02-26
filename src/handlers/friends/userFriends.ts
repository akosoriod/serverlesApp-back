import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { userFriends } from "../../entities/friends"
import { getResponse } from "../../helpers/lambdaResponseHelper"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        const username = event?.pathParameters?.username || '';
        let res:any = await userFriends(username);
        return getResponse({
            statusCode: 200,
            body:  JSON.stringify({
                res
            })
        })
    }catch (error){
        return getResponse({error})
    }
    
}

