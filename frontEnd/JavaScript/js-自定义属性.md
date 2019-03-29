

自定义属性是个非常有用的技巧，可以用来保存普通字符串，借助 eval() 函数可以用来保存其他类型的数据。

这儿涉及到数据反序列化的问题。将复杂数据类型转化为普通字符串，成为数据的序列化，其逆反操作被称为数据的反序列化。最经典的应用当属 Ajax 了，Ajax 返回数据为 JOSN 是字符串格式，将 JOSN 这个长得像 hash 对象(或数组)的字符串反序列化将得到真正的 hash 对象(或数组)。

如下例子使用自定义属性，

    <a id="a" href="#" info = "{name:'自定义属性',type:'a标签'}">a 标签</a>
    <script type="text/javascript">
        var node = document.getElementById("a");
        var info = node.getAttribute("info");
        alert(typeof info);   //string
        alert(info.name);   //undefined
        alert(info.type);   //undefined
        info = eval("("+info+")");
        alert(typeof info);  //object
        alert(info.name);   //自定义属性
        alert(info.type);   //a标签
    </script>
