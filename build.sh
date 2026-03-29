#!/bin/bash

# Exit on any error
set -e

# Extract metadata from package.json
app_name=$(jq -r '.name' package.json)
version=$(jq -r '.version' package.json)

echo "--- Building: $app_name version $version ---"

NEXUS_URL="192.168.68.124:8082"

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