import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { allUsers } from "../../entities/user"
import { getResponse } from "../../helpers/lambdaResponseHelper";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        let res:any = await allUsers();
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
