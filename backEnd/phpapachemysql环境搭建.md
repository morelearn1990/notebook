# php + apache + mysql 环境搭建

## 前言

之前都是使用 node 作为服务器开发，因为 ‘业务’ 需要所以要搭建 php + apache + mysql 开发环境，windows 使用 wamp 搭建环境。这儿讲如何使用 mac 搭建这样的开发环境 。以便以后需要时翻看

## apache 开启和配置

使用一下命令开启、关闭、重启 Apache 服务器：
```
sudo apachectl start
sudo apachectl stop
sudo apachectl restart
```
ps 使用 sudo 命令需要输入密码。启动后可以再浏览器里面输入 127.0.0.1 进入，如果显示 It works!  表示开启成功。

Apache 服务器默认文件夹在 /libaries/WebServer/Documents 文件夹里面，我喜欢将它定义到我想要的、专门的文件夹里面，便于管理。
配置 Apache 服务器：
```
cd /etc/apache2      //进入 Apache 安装文件目录
vim httpd.conf       //使用 vim 打开配置文件

                     // 以下内容在 vim 里操作
/Listen              // 可以设置监听端口
/DocumentRoot        // 找到设置文件夹 将其改成你想要的文件夹，我设置的是  /Users/fuhao/WebServer  并将其下面一行 <Directory "/libaries/WebServer/Document"> 里面的路径改成 DocumentRoot 文件夹路径（这步不知对否，改了后能成功运行，需要验证）。

/Virtual hosts       //找到虚拟目录配置行。将 Include /private/etc/apache2/extra/httpd-vhosts.conf 前面的 # 号去掉就可以在 httpd-vhosts.conf 里面设置虚拟目录了，设置方法和里面的样式一样，其实看不懂里面的那些配置，我一般只设置 ServerName 和 DocumentRoot 其他的配置删掉不用配置，它会使用默认的，在设置本地的 ServerName 以后需要到打开 /etc/hosts 将 127.0.0.1   ServerName 加进去才能生效呢。

/LoadModule php5_module libexec/apache2/libphp5.so    //查找 LoadModule php5_module libexec/apache2/libphp5.so 并将前面的 # 号去掉，这是开启 PHP 的步骤。

```
ps: 这儿使用 vim 编辑器编辑的，不会用的使用其他编辑器编辑。记住这儿要使用 :wq! 来保存才行（w 表示保存，q 表示退出 ，这是 vim 命令，不懂的 这儿需要去学学，很好玩的编辑器 ）。


以上基本 mac 上自主配置 Apache 的过程。接下来是 MySQL 。

## MySQL 安装 和 配置

进入官网下载，这儿建议在官网下载 MySQL 安装包安装。而不用 homebrew 来安装，使用 homebrew 安装会需要配置很多‘奇怪’的配置，当然它将进过它安装的软件都安装到自己的目录下很好管理。但是在配置一些东西的时候会折腾死人，于是我在还没熟练之前，先弃坑。以下是下载网址，进去下载自己需要的版本。

`http://dev.mysql.com/downloads/mysql/`

下载安装的过程没有什么稀奇的，需要注意的是安装的时候回弹出对话框，上面有数据库的登录密码，注意记录一下，如果记不住，它会发到你的通知里面，可以在那儿找，如果那儿也清空了，就自己找办法重置吧 ^V^。

由于安装的使用没有将 MySQL 的命令加入到终端全局，我们需要手动加入
```
vim ~/.bash_profile   //打开终端配置文件，将 PATH=$PATH:/usr/local/mysql/bin 加入到文件里面，保存退出。

source ~/.bash_profile  //使更改生效

mysql -uroot -p    //登录数据库需要输入上面记录的密码。登录后使用以下命令更改密码，密码输入错误不能进入。

SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');

//更改密码后 就可以使用以下命令开启和停止 MySQL 服务。也可以到系统设置里面去开启和停止服务

mysql.server start 
mysql.server stop

```
ps: 在配置 mac 的一些程序是，经常会用到 bash zsh 等的配置文件，这儿有一篇文章介绍他们的一点知识，需要了解的去看看。`http://blog.csdn.net/chenchong08/article/details/7833242`

## 安装 phpMyAdmin 管理数据库。


到官网下载最新版本 `https://www.phpmyadmin.net` 一般下载 all-languages.zip 的版本。

将下载的文件放到项目目录中，接下来我是配置虚拟目录来访问的。
接下来需要配置 phpMyAdmin 的配置。
```
//将 libraries 下的 config.default.php 复制到网站根目录并重名为 config.ini.php 使用编辑器打开，配置一下项目：
$cfg['PmaAbsoluteUri'] = ''  //这是配置访问网址，由于我是使用虚拟目录配置的，所以这儿留空。
$cfg['Servers'][$i]['host'] = 'localhost';  //这儿可以使用 127.0.0.1 
$cfg['Servers'][$i]['auth_type'] = 'cookie'; 

$cfg['blowfish_secret'] = ‘’;  //这是配置短密码，不配置也行，会在进入网站是在网页下部提示错误，字符串长度短了会发出警告。


```

到这儿基本就配置完成了，但是总有程序要出错。会发现出现不能连接的情况，是因为在 php.ini 里面需要指定 MySQL 所在的目录。由于没指定就会返回找不到目录或文件的错误。具体错误代码忘记了。以下是配置方法：

```
mysql -uroot -p  //登录数据库
mysql>status     //登录数据库后输入 status 查找数据库信息。找到 Unix socket 一般为 /tmp/mysql.sock 

//重新打开一个终端或退出登录 mysql 。
cd /etc/   //进入 php.ini 所在目录
cp php.ini.default  php.ini  //一般 php.ini 不存在，而存在的是 php.ini.default 需要复制和重名为我们需要的
vim php.ini   //打开配置文件
找到 mysql.default_socket、mysqli.default_socket、pdo_mysql.default_socket 这几项如果和 /tmp/mysql.sock 不一样则需要将其值改成这个。

sudo apachectl restart   //重启服务器

```
打开 phpMyAdmin 本地网站于是就 OK 了。




