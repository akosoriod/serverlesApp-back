#!/usr/bin/env node
import {App} from '@aws-cdk/core';
import {modakPipelineStack} from "../lib/modak-pipeline-stack";
import {modakInfrastructureStack} from "../lib/modak-infrastructure-stack";
import {modakDatabaseStack} from "../lib/modak-database-stack";
import {envDevelopment, envStaging, envMaster} from "./env";


const app = new App();

// LOCAL
/*
new modakDatabaseStack(app, `${envLocal.PROJECT_NAME}-V${envLocal.PROJECT_VERSION}-DatabaseStack-local`, envLocal, {
    env: envLocal.AWS_ENVIRONMENT
});

new modakInfrastructureStack(app, `${envLocal.PROJECT_NAME}-V${envLocal.PROJECT_VERSION}-InfrastructureStack-local`, envLocal, {
   env: envLocal.AWS_ENVIRONMENT
});

new modakPipelineStack(app, `${envLocal.PROJECT_NAME}-V${envLocal.PROJECT_VERSION}-PipelineStack-local`, envLocal, {
   env: envLocal.AWS_ENVIRONMENT
});
*/

// DEVELOPMENT

new modakDatabaseStack(app, `${envDevelopment.PROJECT_NAME}-V${envDevelopment.PROJECT_VERSION}-DatabaseStack-development`, envDevelopment, {
     env: envDevelopment.AWS_ENVIRONMENT
});

new modakInfrastructureStack(app, `${envDevelopment.PROJECT_NAME}-V${envDevelopment.PROJECT_VERSION}-InfrastructureStack-development`, envDevelopment, {
    env: envDevelopment.AWS_ENVIRONMENT
});

new modakPipelineStack(app, `${envDevelopment.PROJECT_NAME}-V${envDevelopment.PROJECT_VERSION}-PipelineStack-development`, envDevelopment, {
    env: envDevelopment.AWS_ENVIRONMENT
});


// STAGING
/*
new modakDatabaseStack(app, `${envStaging.PROJECT_NAME}-V${envStaging.PROJECT_VERSION}-DatabaseStack-staging`, envStaging, {
    env: envStaging.AWS_ENVIRONMENT
});

new modakInfrastructureStack(app, `${envStaging.PROJECT_NAME}-V${envStaging.PROJECT_VERSION}-InfrastructureStack-staging`, envStaging, {
    env: envStaging.AWS_ENVIRONMENT
});

new modakPipelineStack(app, `${envStaging.PROJECT_NAME}-V${envStaging.PROJECT_VERSION}-PipelineStack-staging`, envStaging, {
    env: envStaging.AWS_ENVIRONMENT
});
*/
// MASTER
/*
new modakDatabaseStack(app, `${envMaster.PROJECT_NAME}-V${envMaster.PROJECT_VERSION}-DatabaseStack-master`, envMaster, {
    env: envMaster.AWS_ENVIRONMENT
});

new modakInfrastructureStack(app, `${envMaster.PROJECT_NAME}-V${envMaster.PROJECT_VERSION}-InfrastructureStack-master`, envMaster, {
    env: envMaster.AWS_ENVIRONMENT
});

new modakPipelineStack(app, `${envMaster.PROJECT_NAME}-V${envMaster.PROJECT_VERSION}-PipelineStack-master`, envMaster, {
    env: envMaster.AWS_ENVIRONMENT
});
*/
app.synth();