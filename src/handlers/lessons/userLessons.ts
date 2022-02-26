import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { userlessons } from "../../entities/lessons"
import { getResponse } from "../../helpers/lambdaResponseHelper"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        const username = event?.pathParameters?.username || '';
        let res:any = await userlessons(username);
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
