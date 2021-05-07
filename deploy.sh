# 一键发布

# cd /Users/jsbay/工作/2018.3.19-安图/Gitlit/AIDM/web

# 执行打包名
yarn build:prod

# 复制要发布的文件到远程服务器

scp -r ./dist/** aidm:/C:/Users/Administrator/Desktop/web

## 登陆远程服务器并执行

# ssh aidm ""