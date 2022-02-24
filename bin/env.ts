const getEnvVariables = (dependentVariables: any) => {
  const {
      PROJECT_ENVIRONMENT
  } = dependentVariables;

  const PROJECT_NAME = "modak";
  const PROJECT_VERSION = 1;

  const AWS_ACCOUNT = '322889881075';
  const AWS_CURRENT_REGION = 'us-east-1';

  const EMAIL = "test@mail.com"

  let SUBDOMAIN_FOR_APIS;
  switch (PROJECT_ENVIRONMENT) {
      case "development":
          SUBDOMAIN_FOR_APIS = "dev";
          break;
      case "staging":
          SUBDOMAIN_FOR_APIS = "stg";
          break;
      case "master":
          SUBDOMAIN_FOR_APIS = "";
          break;
  }

  const SUBDOMAIN_API = `${SUBDOMAIN_FOR_APIS}api-modak`;

  const MAIN_TABLE_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-MainTable-${PROJECT_ENVIRONMENT}`;

  const REPOSITORY_ARN = `arn:aws:codecommit:${AWS_CURRENT_REGION}:${AWS_ACCOUNT}:${PROJECT_NAME}`

  const PIPELINE_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-Pipeline-${PROJECT_ENVIRONMENT}`

  const API_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-Api-${PROJECT_ENVIRONMENT}`;
  const API_STAGE_NAME = PROJECT_ENVIRONMENT;

  const STACK_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-Stack-${PROJECT_ENVIRONMENT}`


  const AWS_ENVIRONMENT = {
      account: AWS_ACCOUNT,
      region: AWS_CURRENT_REGION,
  }

  return {
      PROJECT_ENVIRONMENT,
      PROJECT_NAME,
      EMAIL,
      PROJECT_VERSION,
      AWS_ACCOUNT,
      AWS_CURRENT_REGION,
      SUBDOMAIN_API,
      MAIN_TABLE_NAME,
      REPOSITORY_ARN,
      PIPELINE_NAME,
      API_NAME,
      API_STAGE_NAME,
      STACK_NAME,
      AWS_ENVIRONMENT
  }

}

const developmentDependentVariables = {
  PROJECT_ENVIRONMENT: "development",

}

export const envDevelopment = getEnvVariables(developmentDependentVariables);

const stagingDependentVariables = {
  PROJECT_ENVIRONMENT: "staging",

}

export const envStaging = getEnvVariables(stagingDependentVariables);

const masterDependentVariables = {
  PROJECT_ENVIRONMENT: "master",

}

export const envMaster = getEnvVariables(masterDependentVariables);