# Welcome to modak app - backend

### AWS 

* `cdk synth modak-V1-InfrastructureStack-development  > template.yaml` Emit the synthesized CloudFormation template
* `cdk deploy  modak-V1-InfrastructureStack-development` Create Api in AWS
* `cdk deploy  modak-V1-DatabaseStack-development` Create dynamoDB and execute seeders
* `cdk deploy  modak-V1-PipelineStack-development` Create pipeline 

 ### Local
- `cdk synth TPChain-V1-InfrastructureStack-development --no-staging > template.yaml` Emit the synthesized CloudFormation template
- `sam local start-api -l logs.log  Start Api with logs file and docker network

[DynamoDB](https://aws.amazon.com/dynamodb/?trk=ps_a134p000006gXuVAAU&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_LATAMO&sc_publisher=Google&sc_category=Database&sc_country=LATAMO&sc_geo=LATAM&sc_outcome=acq&sc_detail=dynamodb&sc_content=DynamoDB_e&sc_matchtype=e&sc_segment=490481979029&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Database|DynamoDB|LATAMO|EN|Text&s_kwcid=AL!4422!3!490481979029!e!!g!!dynamodb&ef_id=Cj0KCQiA3-yQBhD3ARIsAHuHT66y84c79Drxaf68WxPUS9e86-z0ekEmzrHn0LUYH63ZMbHr7iPBQiUaAoxAEALw_wcB:G:s&s_kwcid=AL!4422!3!490481979029!e!!g!!dynamodb)
[CDK](https://docs.aws.amazon.com/cdk/index.html)
[API gateway](https://aws.amazon.com/es/api-gateway/)
[AWS Lambda](https://aws.amazon.com/es/lambda/)
[Typescript](https://www.typescriptlang.org/)
