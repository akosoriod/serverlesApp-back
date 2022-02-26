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
            // billingMode: dynamoDb.BillingMode.PROVISIONED,
            // readCapacity: 1,
            // writeCapacity: 1,
            // removalPolicy: cdk.RemovalPolicy.DESTROY,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            partitionKey: {name: 'PK', type: dynamoDb.AttributeType.STRING},
            sortKey: {name: 'SK', type: dynamoDb.AttributeType.STRING},
            // pointInTimeRecovery: true,
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

        new Seeder(this, 'seeder', {
            table: table,
            setup: require ("./seeders/test.json"),
            teardown: [],
            refreshOnUpdate: true,
        });

    }
}
