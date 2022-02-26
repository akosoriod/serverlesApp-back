import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { userInfo } from "../../entities/user"
import { getResponse } from "../../helpers/lambdaResponseHelper";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        const username = event?.pathParameters?.username || '';
        let res:any = await userInfo(username);
        return getResponse({
            statusCode: 200,
            body: {
                res
            }
        })
    }catch (error){
        return getResponse({error})
    }
    
}
