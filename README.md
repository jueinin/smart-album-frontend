<h1>React技术栈+spring boot+koa+mysql实现的智能相册应用</h1>
<h2>功能描述</h2>
<h3>前端部分</h3>
<div>
    <div><input type="checkbox" checked/>图片瀑布流展示</div>
    <div><input type="checkbox" checked/>图片自定义标签</div>
    <div><input type="checkbox" checked/>支持批量上传及单个上传,上传时可以选择相册,名字描述等等</div>
    <div><input type="checkbox" checked/>路由权限管理</div>
    <div><input type="checkbox" checked/>对图片或者相册页的修改立即生效</div>
    <div><input type="checkbox" checked/>登陆注册字段约束</div>
    <div><input type="checkbox" checked/>修改密码,以及资料等</div>
</div>
<h3>后端部分</h3>
<h4><a href="https://github.com/dreamgyf/smart_album">后端大佬的repo链接</a></h4>
<div>
    <div><input type="checkbox" checked/>spring boot mybaties数据库操作</div>
    <div><input type="checkbox" checked/>基于session的身份验证</div>
    <div><input type="checkbox" checked/>基本的增删查改以及路由管理</div>
    <div><input type="checkbox" checked/>图片exif信息读取</div>
    <div><input type="checkbox" checked/>修改密码,发送邮件</div>
    <div><input type="checkbox" checked/>相册及图片可打包下载</div>
    <div><input type="checkbox" checked/>图片误删除可找回</div>
    <div><input type="checkbox" checked/>使用百度AI接口,智能分类图片</div>
</div>
<h3>技术栈</h3>
<div>
    <div><input type="checkbox" checked/>react</div>
    <div><input type="checkbox" checked/>antd</div>
    <div><input type="checkbox" checked/>mobx-react</div>
    <div><input type="checkbox" checked/>mobx</div>
    <div><input type="checkbox" checked/>react-route-dom</div>
    <div><input type="checkbox" checked/>babel</div>
    <div><input type="checkbox" checked/>webpack</div>
    <div><input type="checkbox" checked/>Koa</div>
    <div><input type="checkbox" checked/>Spring Boot</div>
    <div><input type="checkbox" checked/>mysql</div>
</div>
<h3>项目效果</h3>
<h4>PS 已经部署在 <a href="newbee.cf:3000">newbee.cf:3000</a>可以注册一个帐户体验一下,服务器只有1M的带宽可能比较卡,可以自行部署到本机体验</h4>
<div>
    <h4>首页</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E9%A6%96%E9%A1%B5.png"
         alt="'首页"/>
    <h4>注册</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E6%B3%A8%E5%86%8C.png"
         alt="注册"/>
    <h4>登录</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E7%99%BB%E5%BD%95.png"
         alt="注册"/>
    <h4>个人主页</h4>
    <img style="width: 100%" src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5.png"
         alt="个人主页"/>
    <h4>个人主页</h4>
    <img style="width: 100%" src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5.png"
         alt="个人主页"/>
    <h4>上传图片</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png" alt="上传图片">
    <h4>修改资料</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E4%BF%AE%E6%94%B9%E8%B5%84%E6%96%99.png" alt="修改资料">
    <h4>回收站</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E5%9B%9E%E6%94%B6%E7%AB%99.png" alt="回收站">
    <h4>多选删除</h4>
    <img src="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E5%A4%9A%E9%80%89%E5%88%A0%E9%99%A4.png" alt="多选删除"/>
</div>
<h2>项目介绍</h2>
<p>这就是一个简易的增删查改相册应用,有的地方还不完善,待更新</p>

<h2>
    如何部署?
</h2>
<div>
    本项目前后端分离,部署需要两个都部署下.
    <p>前端: git clone https://github.com/jueinin/smart-album-frontend.git</p>
    <p>cd smart-album-frontend</p>
    <p>npm install ,npm start 即可</p>
    <br>
    <p>后端: git clone https://github.com/dreamgyf/smart_album.git --depth 1</p>
    <p>新建test数据库并执行sql语句<a href="http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/smart_album">点我下载</a> </p>
    <p>在application.properties文件内配置好QQ邮箱的账号密码,注意不是QQ密码,要去qq邮箱申请一个密钥密码,并修改email包下类的From字段为你的邮箱</p>
    <p>运行SmartAlbumApplication主类即可</p>
</div>
<div>
    <p>有问题欢迎提issue,尚未完善,还有一些bug,遇见了可以直接刷新先跳过</p>
</div>
