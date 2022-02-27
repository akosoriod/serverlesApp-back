# Welcome to modak app - backend

### AWS 

* `cdk synth modak-V1-InfrastructureStack-development  > template.yaml` Emit the synthesized CloudFormation template
* `cdk deploy  modak-V1-InfrastructureStack-development` Create Api in AWS
* `cdk deploy  modak-V1-DatabaseStack-development` Create dynamoDB and execute seeders
* `cdk deploy  modak-V1-PipelineStack-development` Create pipeline 


 ### Start the Api locally 
- `cdk synth TPChain-V1-InfrastructureStack-development --no-staging > template.yaml` Emit the synthesized CloudFormation template
- `sam local start-api -l logs.log  Start Api with logs file and docker network
