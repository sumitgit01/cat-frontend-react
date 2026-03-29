#!/bin/bash

app_name=$(jq -r '.name' package.json)
version=$(jq -r '.version' package.json)

echo "App: $app_name"
echo "Version: $version"

# ✅ Correct (NO http://)
NEXUS_URL="192.168.68.124:8070"
REPO_NAME="cat-frontend-react"

# Build image
docker build -t $app_name:$version .

# Tag image
docker tag $app_name:$version \
$NEXUS_URL/$REPO_NAME/$app_name:$version

# Push image
docker push $NEXUS_URL/$REPO_NAME/$app_name:$version