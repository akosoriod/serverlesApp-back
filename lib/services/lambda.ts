import * as cdk from "@aws-cdk/core";
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs";
import {Construct} from "@aws-cdk/core";
import {NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs/lib/function";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource";
import * as apiGateway from "@aws-cdk/aws-apigateway";

const handlersDirectoryPath = path.join(__dirname, `./../../src/handlers/`)

const getFunctionsForSynth = (
    allLambdas: { [key: string]: () => NodejsFunction },
    onlySynth: string[]
) => {
    let lambdasForSynth: { [key: string]: NodejsFunction } = {}

    if (onlySynth.length > 0) {
        onlySynth.forEach((functionKey: string) => {
            lambdasForSynth[functionKey] = allLambdas[functionKey]();
        })
    } else {
        Object.keys(allLambdas).forEach((functionKey: string) => {
            lambdasForSynth[functionKey] = allLambdas[functionKey]();
        })
    }

    return lambdasForSynth;
}

const addLambdaToRoute = (
    lambdaFunction: NodejsFunction,
    baseRoute: Resource,
    method: string
) => {
    baseRoute.addMethod(
        method,
        new apiGateway.LambdaIntegration(lambdaFunction, {proxy: true})
    )
}

const addLambdaToNewRoute = (
    lambdaFunction: NodejsFunction,
    baseRoute: Resource,
    path: string,
    method: string
) => {
    const newRoute = baseRoute.addResource(path);

    addLambdaToRoute(
        lambdaFunction,
        newRoute,
        method
    )
}

const getNodeLambdaFunction =
    (scope: Construct,
     functionName: string,
     handlerPathFromHandlers: string,
     env: any,
     remainingProps?: NodejsFunctionProps,
     routeConfig?: {
         baseRoute: Resource,
         method: string,
         path?: string,
     }
    ) => {
        const lambdaFunction = new NodejsFunction(scope, functionName, {
            functionName: `${env.PROJECT_NAME}-V${env.PROJECT_VERSION}-${functionName}-${env.PROJECT_ENVIRONMENT}`,
            memorySize: remainingProps?.memorySize || 128,
            timeout: remainingProps?.timeout || cdk.Duration.seconds(15),
            runtime: remainingProps?.runtime || lambda.Runtime.NODEJS_14_X,
            handler: remainingProps?.handler || 'handler',
            entry: handlersDirectoryPath + handlerPathFromHandlers,
            environment: remainingProps?.environment,
            bundling: {
                minify: true,
                externalModules: ['aws-sdk']
            },
        })

        if (routeConfig) {
            if (routeConfig.path) {
                addLambdaToNewRoute(
                    lambdaFunction,
                    routeConfig.baseRoute,
                    routeConfig.path,
                    routeConfig.method
                );
            } else {
                addLambdaToRoute(
                    lambdaFunction,
                    routeConfig.baseRoute,
                    routeConfig.method
                )
            }

        }

        return lambdaFunction;
    }


export const getLambdas = (
    stack: cdk.Construct,
    env: any,
    opt: any
): { [key: string]: NodejsFunction } => {

     
    const friends = () => getNodeLambdaFunction(
        stack,
        "friends",
        "friends/friends.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.MAIN_TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.nftsRoute, path: 'friends', method: "GET"}
    )

    const users = () => getNodeLambdaFunction(
        stack,
        "users",
        "users/users.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.MAIN_TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.nftsRoute, path: 'users', method: "GET"}
    )


    
    const userFriends = () => getNodeLambdaFunction(
        stack,
        "userFriends",
        "friends/userFriends.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.MAIN_TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.nftsRoute, path: 'userFriends', method: "GET"}
    )
    
    const lessons = () => getNodeLambdaFunction(
        stack,
        "lessons",
        "lessons/lessons.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.MAIN_TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.nftsRoute, path: 'lessons', method: "GET"}
    )

    const userLessons = () => getNodeLambdaFunction(
        stack,
        "userLessons",
        "lessons/userLessons.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.MAIN_TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.nftsRoute, path: 'userLessons', method: "GET"}
    )
 

    const allLambdas: { [key: string]: () => NodejsFunction } = {
        friends,
        users,
        userFriends,
        lessons,
        userLessons,
    }

    return getFunctionsForSynth(allLambdas, opt.onlySynth || []);

}