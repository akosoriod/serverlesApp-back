import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { allLessons } from "../../entities/lessons"
import { getResponse } from "../../helpers/lambdaResponseHelper"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try{
        let res:any = await allLessons();
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
