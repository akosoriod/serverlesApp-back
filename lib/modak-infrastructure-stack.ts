import * as cdk from '@aws-cdk/core';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
import {getLambdas} from "./services/lambda";
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
        } = getApiGatewayResources(this, env, {});

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
            users,
            userFriends,
            lessons,
            userLessons,
        } = lambdas;

    }
}
