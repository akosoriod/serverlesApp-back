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
        table,
        setup: [
            { PK: 'USER', SK: 'USER#Mark', dob: '1014589797', gender: 'Male', role: 'Student' },
            { PK: 'USER', SK: 'USER#Jody', dob: '709424997', gender: 'Male', role: 'Student' },
            { PK: 'USER', SK: 'USER#Rachel', dob: '937175453', gender: 'Female', role: 'Student' },
            { PK: 'USER', SK: 'USER#Rachel', dob: '937175453', gender: 'Female', role: 'Student' },
            { PK: 'FRIENDS#Rachel', SK: 'USER#Jody', GSI1: 'Friendships' },
            { PK: 'FRIENDS#Jody', SK: 'USER#Mark', GSI1: 'Friendships' },
            { PK: 'FRIENDS#Jody', SK: 'USER#Rachel', GSI1: 'Friendships' },
            { PK: 'FRIENDS#Mark', SK: 'USER#Jody', GSI1: 'Friendships' },
            { PK: 'LESSONS', SK: 'LESSON#DEBATE#1'},
            { PK: 'LESSONS', SK: 'LESSON#Spanish#1'},
            { PK: 'LESSONS', SK: 'LESSON#Spanish#2'},
            { PK: 'LESSON#DEBATE#1', SK: 'USER#Mark'},
            { PK: 'LESSON#Spanish#1', SK: 'USER#Rachel'},
            { PK: 'LESSON#Spanish#2', SK: 'USER#Rachel'},
            { PK: 'LESSON#Spanish#2', SK: 'USER#Mark'}
        ],
        refreshOnUpdate: true,
        });

    }
}
