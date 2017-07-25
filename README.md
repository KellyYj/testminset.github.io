# testminset.github.io
测试minset
测试静态网页在github上的发布

第一步 创建仓库

第二步 git clone 仓库地址到本地

第三步 把项目放到clone下来的文件夹中

第四步 将更新的代码提交到代码库
        执行如下命令
        git init
        git add -A
        git commit -am "init project"
        git push -u origin master
        
        注意：此时你并不能访问你部署的项目，因为只有gh-pages分支才会把你的项目部署上去所以你需要去创建一个gh-pages分支
        1.在githib页面中直接输入gh-pages回车创建分支
        2.在Settings 页面中Branches选项中设置default branche为gh-pages 点击update 完成。最好清空一下缓存再访问你的项目
        3.在Setting的options中的github pages 中去复制你的网站地址  Your site is published at https://kellyyj.github.io/testminset.github.io/
        便可成功访问了。
        
