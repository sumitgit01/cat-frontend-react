#!/bin/bash

app_name=$(jq -r '.name' package.json)
version=$(jq -r '.version' package.json)

echo "App: $app_name"
echo "Version: $version"

NEXUS_URL="192.168.68.124:8082"
REPO_NAME="cat-frontend-react"

docker build -t $app_name:$version .

docker tag $app_name:$version \
$NEXUS_URL/$REPO_NAME/$app_name:$version

docker push $NEXUS_URL/$REPO_NAME/$app_name:$version