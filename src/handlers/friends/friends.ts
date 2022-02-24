import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { userInfo } from "../../entities/user"
import { getResponse } from "../../helpers/lambdaResponseHelper"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        //let userData:any = await userInfo(user.username);
        return getResponse({
            statusCode: 200,
            body: {
                msg:"friends"
            }
        })
    }catch (error){
        return getResponse({error})
    }
    
}
