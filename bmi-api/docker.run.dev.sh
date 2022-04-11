#!/bin/bash -xe
docker run --name bmi-api-service -p 1337:1337 \
--env AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
--env AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
--env NODE_ENV=production --env AWS_REGION=${AWS_REGION} \
--env DYNAMODB_TABLE=bmi-table \
--env SQS_URL=https://sqs.us-west-2.amazonaws.com/530260462866/test-sqs \
--env TOPIC_URL=arn:aws:sns:us-west-2:530260462866:test-sns-topic  \
-it rgederin/bmi-api-image