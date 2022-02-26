import * as cdk from '@aws-cdk/core';
import {getLambdas} from "./services/lambda";
import {getIAMPolicy} from "./services/iam";
import {getApiGatewayResources} from "./services/apiGateway";

export class modakInfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StackProps) {

        super(scope, id, props);

        // API GATEWAY

        const {
            versionRoute,
            lessonsRoute,
            userRoute,
            friendsRoute
        } = getApiGatewayResources(this, env);

        // LAMBDAS

        const lambdas = getLambdas(
            this,
            env,
            {
                onlySynth: [],
                routes: {
                    versionRoute,
                    lessonsRoute,
                    userRoute,
                    friendsRoute
                }
            });

        const {
            friends,
            user,
            userFriends,
            lessons,
            userLessons,
        } = lambdas;

        Object.keys(lambdas).forEach((lambdaFunctionKey: string) => {
            const lambdaFunction = lambdas[lambdaFunctionKey];
            lambdaFunction.addToRolePolicy(getIAMPolicy(["dynamodb:*"]));
        })
    }
}
