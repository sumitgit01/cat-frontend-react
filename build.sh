#!/bin/bash

# Exit on any error
set -e

NEXUS_URL=$1
REPO_NAME=$2

# Extract metadata from package.json
app_name=$(jq -r '.name' package.json)
version=$(jq -r '.version' package.json)

echo "--- Building: $app_name version $version ---"
echo "--- Repo: $REPO_NAME ---"


# 1. Build the local image
docker build -t "$app_name:$version" .

# 2. Tag for Nexus
# Note: Since 8082 is tied to the 'cat-frontend-react' repo, 
# we don't include the repo name in the path.
docker tag "$app_name:$version" "$NEXUS_URL/$app_name:$version"

# 3. Push to Nexus
echo "--- Pushing to Nexus ---"
docker push "$NEXUS_URL/$app_name:$version"

echo "--- Build and Push Complete ---"
