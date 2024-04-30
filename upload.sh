#!/bin/bash
          
# ADD YOUR BUCKETNAME HERE (no quotes necessary)
# For example:
# BUCKETNAME=somerandombucket123
BUCKETNAME=acmhs-site-bucket

echo "Removing out folder..."
sleep 1;
rm -rf out
echo "Creating production build..."
sleep 1;
npm run build

echo "Uploading assets to the cloud..."
sleep 1;
gsutil -m rsync -r out gs://$BUCKETNAME