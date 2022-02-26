import * as dynamoDb from '@aws-cdk/aws-dynamodb';
import * as cdk from '@aws-cdk/core';
import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import { Seeder } from 'aws-cdk-dynamodb-seeder';

export class modakDatabaseStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env:any, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = new dynamoDb.Table(this, env.MAIN_TABLE_NAME, {
            tableName: env.MAIN_TABLE_NAME,
            billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
            //removalPolicy: env.REMOVAL_POLICY,
            removalPolicy:cdk.RemovalPolicy.RETAIN,
            partitionKey: {name: 'PK', type: dynamoDb.AttributeType.STRING},
            sortKey: {name: 'SK', type: dynamoDb.AttributeType.STRING}
        });
        table.addLocalSecondaryIndex({
            indexName: "dob",
            sortKey: {name: 'dob', type: dynamoDb.AttributeType.NUMBER},
            projectionType: dynamoDb.ProjectionType.ALL,
        });
        table.addLocalSecondaryIndex({
            indexName: "gender",
            sortKey: {name: 'gender', type: dynamoDb.AttributeType.STRING},
            projectionType: dynamoDb.ProjectionType.ALL,
        });
        table.addLocalSecondaryIndex({
            indexName: "status",
            sortKey: {name: 'status', type: dynamoDb.AttributeType.STRING},
            projectionType: dynamoDb.ProjectionType.ALL,
        });
        table.addLocalSecondaryIndex({
            indexName: "role",
            sortKey: {name: 'role', type: dynamoDb.AttributeType.STRING},
            projectionType: dynamoDb.ProjectionType.ALL,
        });
        table.addGlobalSecondaryIndex({
            indexName: "Inverted",
            partitionKey: {name: 'SK', type: dynamoDb.AttributeType.STRING},
            sortKey: {name: 'PK', type: dynamoDb.AttributeType.STRING},
            projectionType: dynamoDb.ProjectionType.ALL,
        });
        table.addGlobalSecondaryIndex({
            indexName: "GSI1",
            partitionKey: {name: 'GSI1', type: dynamoDb.AttributeType.STRING},
            sortKey: {name: 'PK', type: dynamoDb.AttributeType.STRING},
            projectionType: dynamoDb.ProjectionType.ALL,
        });

        const seederStack = new Stack(scope, 'seeder-stack');
        new Seeder(seederStack, 'seeder', {
            table,
            setup: require("./seeders/seeders.json"),
            teardown: [],
            refreshOnUpdate: true,
        });
        seederStack.addDependency(this);
    }
}
