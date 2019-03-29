# sublime text3 配置说明
## package control
安装说明：打开 sublime console log （可以在菜单view下面打开，也可以快捷键 ctrl+ ` 打开）

     import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by) 

安装成功后打开 package control 开始安装插件（打开方式为 ctrl + shift + P 命令输入命令install Package ，sublime 会自动匹配命令输入其中一些字母就好）。在之后弹出的搜索框输入你想要的插件，点就自动就开始安装。
自用插件列表：
1. alignment 
2. Brackethighlight 选择高亮
3. Can I USE 检查能否兼容
4. DocBlockr 文档生成
5. Emmet 快捷编写html
6. fileDiffs 比较两个文件不同
7. Trimmer 多余空格删除工具
8. CSScomb css美化，强迫症专用，可以到官网去生成适合自己的美化
9. sublimehighlight 
10. html/css/js prettify  代码美化
11. sublimeCodeintel 代码提示
12. sublimelinter 代码错误检查
13. colorPicker 颜色选择