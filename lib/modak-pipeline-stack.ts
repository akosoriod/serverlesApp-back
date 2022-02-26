import {CodePipeline, CodePipelineSource, ShellStep} from "@aws-cdk/pipelines";
import * as codeCommit from "@aws-cdk/aws-codecommit";
import {Construct, Stack, StackProps, Stage, StageProps} from '@aws-cdk/core';
import {modakInfrastructureStack} from "./modak-infrastructure-stack";
import {modakDatabaseStack} from "./modak-database-stack";


class modakInfrastructureStage extends Stage {

    constructor(scope: Construct, id: string, env: any, props?: StageProps) {
        super(scope, id, props);

        const Stack = new modakInfrastructureStack(this, env.STACK_NAME, env);

    }
}
/*
class modakDatabaseStage extends Stage {

    constructor(scope: Construct, id: string, env: any, props?: StageProps) {
        super(scope, id, props);

        const Stack = new modakDatabaseStack(this, env.STACK_NAME, env);

    }
}
*/


export class modakPipelineStack extends Stack {
    constructor(scope: Construct, id: string, env: any, props?: StackProps) {
        super(scope, id, props);

        const repository = codeCommit.Repository.fromRepositoryArn(this, 'Repository', env.REPOSITORY_ARN)

        const modakPipeline = new CodePipeline(this, env.PIPELINE_NAME, {
            pipelineName: env.PIPELINE_NAME,
            dockerEnabledForSynth: true,
            dockerEnabledForSelfMutation: true,
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.codeCommit(repository, env.PROJECT_ENVIRONMENT),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ],
            }),
        });

       /* const DatabaseStage = new modakDatabaseStage(this, `Database`, env, {
            env: env.AWS_ENVIRONMENT
        })

        modakPipeline.addStage(DatabaseStage);*/

        const InfrastructureStage = new modakInfrastructureStage(this, `Infrastructure`, env, {
            env: env.AWS_ENVIRONMENT
        })

        modakPipeline.addStage(InfrastructureStage);

    }
    
}