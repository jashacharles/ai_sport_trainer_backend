#!/bin/bash
set -e

echo ">>> Creating S3 bucket..."
awslocal s3 mb s3://sport-trainer-matt

echo ">>> Creating SQS queue..."
awslocal sqs create-queue --queue-name sport-trainer-queue

QUEUE_ARN=$(awslocal sqs get-queue-attributes \
  --queue-url http://localhost:4566/000000000000/sport-trainer-queue \
  --attribute-names QueueArn \
  --query 'Attributes.QueueArn' \
  --output text)

echo ">>> Queue ARN: $QUEUE_ARN"

echo ">>> Setting S3 bucket CORS policy..."
awslocal s3api put-bucket-cors \
  --bucket sport-trainer-matt \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedOrigins": ["http://localhost:3000"],
        "AllowedMethods": ["PUT", "GET", "DELETE", "HEAD"],
        "AllowedHeaders": ["*"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
      }
    ]
  }'

echo ">>> Wiring S3 bucket notification → SQS..."
awslocal s3api put-bucket-notification-configuration \
  --bucket sport-trainer-matt \
  --notification-configuration "{
    \"QueueConfigurations\": [
      {
        \"Id\": \"sport-trainer-upload-event\",
        \"QueueArn\": \"$QUEUE_ARN\",
        \"Events\": [\"s3:ObjectCreated:*\"],
        \"Filter\": {
          \"Key\": {
            \"FilterRules\": [
              { \"Name\": \"suffix\", \"Value\": \".mp4\" }
            ]
          }
        }
      }
    ]
  }"

echo ">>> LocalStack ready: bucket + queue + notification wired"
