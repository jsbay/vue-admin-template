#!/bin/bash

## 切换到工作目录
# cd /Users/baizhanying/工作/2018.3.19-安图/Gitlit/ATMP/SourceCode/FrontendSourceCode

## 打包
npm run build:prod

# prod
remote_host='administrator@192.168.49.233'
remote_path='C:\Users\administrator\Desktop\web'

# ## 登陆远程服务器并 删除上次打包结果
ssh $remote_host "cd $remote_path && rd /s /q css && rd /s /q fonts && rd /s /q img && rd /s /q js"

# ## 复制要发布的文件到远程服务器
scp -r ./dist/** $remote_host:/$remote_path
