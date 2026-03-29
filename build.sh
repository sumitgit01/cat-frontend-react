app_name=$(jq -r '.name' package.json)
echo $app_name
version=$(jq -r '.version' package.json)
nexusUrl="http://192.168.68.124:8081/repository/${app_name}"
echo $nexusUrl
docker build -t $app_name:$version .

#docker tag $app_name:$version $account_id.dkr.ecr.ap-southeast-1.amazonaws.com/$cluster_name:$version
#Finally we push our image to ECR
#docker push $account_id.dkr.ecr.ap-southeast-1.amazonaws.com/$cluster_name:$version
docker tag $app_name:$version $nexusUrl:$version
#Finally we push our image to ECR
docker push $nexusUrl:$version 

