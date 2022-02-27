cdk synth modak-V1-InfrastructureStack-development --no-staging > template.yaml
sam local start-api -l logs.log 

