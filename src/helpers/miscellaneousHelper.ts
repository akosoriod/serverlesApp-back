import {APIGatewayProxyEvent} from "aws-lambda";

export const parseBody = (event: APIGatewayProxyEvent) => {
    try {
        return JSON.parse(event.body || "{}");
    } catch (error) {
        return {};
    }
}