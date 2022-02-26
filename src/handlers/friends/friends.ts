import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { allfriendships } from "../../entities/friends"
import { getResponse } from "../../helpers/lambdaResponseHelper"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        let res:any = await allfriendships();
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
