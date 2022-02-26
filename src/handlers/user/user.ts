import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { userInfo } from "../../entities/user"
import { getResponse } from "../../helpers/lambdaResponseHelper";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        const username = event?.pathParameters?.username || '';
        let userData:any = await userInfo(username);
        return getResponse({
            statusCode: 200,
            body:  JSON.stringify({
                userData
            })
        })
    }catch (error){
        return getResponse({error})
    }
    
}