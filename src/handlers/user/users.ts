import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { user } from "../../entities/user"
import { getResponse } from "../../helpers/lambdaResponseHelper";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        const { username } = event.pathParameters;
        let userData:any = await user(username);
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
