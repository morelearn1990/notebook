Atom 折腾笔记

## 下载

[官网 atom.io](https://atom.io/)  
[GitHub 下载地址](https://github.com/atom/atom/releases/)

## 插件推荐

#### theme 推荐

| theme        | choice        |
| ------------ | ------------- |
| UI theme     | One Light     |
| Syntax theme | atom-material |

#### packages 推荐

可以查看[Github 开源编辑器 Atom 常用插件及安装方法](http://www.jianshu.com/p/f435363e85d2#)选择适合自己的

| package                 | description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| emmet                   | HTML 代码编写必不可少，效率提高的神器                              |
| atom-ternjs             | 通过 suggest 的形式提示对外提供的属性和方法                        |
| autocomplete-paths      | 文件路径自动提示                                                   |
| autoprefixer            | 自动为 CSS 属性添加特定的前缀                                      |
| csscomb                 | CSSComb 帮你写出更漂亮的 CSS                                       |
| file-icons              | 给文件加上图标                                                     |
| hyperclick              | cmd+click 跳转到定义，跳转到文件                                   |
| js-hyperclick           | cmd+click 跳转到定义，跳转到文件                                   |
| highlight-selected      | 高亮选择的代码                                                     |
| JavaScript Snippets     | 输入特殊的字符后自动扩展成对应的                                   |
| JavaScript              | 代码片段                                                           |
| jQuery Snippets         | 输入特殊的字符后自动扩展成对应的代码片段                           |
| Language-Markdown       | 支持 markdown 语法                                                 |
| minimap                 | 代码缩略图，主要是用来跳转到想要去的位置                           |
| linter                  | 代码错误检查，这是粗糙的检查，需要配合其他针对性的代码检查插件来用 |
| open-in-browser         | 浏览器里打开                                                       |
| color-picker            | 取色器                                                             |
| pigments                | 能够根据颜色代码直接显示该颜色                                     |
| pretty-josn             | 格式化 josn                                                        |
| atom-beautify           | 代码格式化                                                         |
| atom-minify             | JS/CSS 代码压缩，命名为.min.                                       |
| project-manager         | 项目管理插件，左边文件目录一样的                                   |
| simplified-chinese-menu | 简体中文菜单                                                       |
| script                  | editor 中运行脚本                                                  |
| merge-conflicts         | 解决 Atom 中合并冲突插件！                                         |
| atom-ctags              | 使用 ctags 来强化自动完成功能，需借助于 autocomplete-plus          |

#### 插件安装错误

可以进入设置界面 打开 Open Config Folder 进入设置界面，打开.atom 下的.apmrc 配置设置 `strict-ssl=false` 和设置代理，本人没有在这儿设置代理，而是使用的 shadowscocks 下面的设置，其实也没设置什么，就是找对好的代理设置好服务器就好，主要是服务器要找到好的。

#### 离线安装方法

先在 .atom/packages 文件夹里面克隆将需要安装的 atom 插件克隆下来，然后在 .atom/packages (cd .atom => cd packages) 文件夹使用 cmd 命令提示符执行命令 apm install <plugs name> 过程中不能关闭界面

现在都用 vscode ，atom 是啥？
