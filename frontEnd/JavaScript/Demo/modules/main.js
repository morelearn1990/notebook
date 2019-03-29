

require.config({
    paths:{
        jquery:'jquery-1.11.2.min',
        jqueryUI:'jquery-ui.min'
    }
});

require(['jquery','window'],function($,w){
    $('#a').click(function() {
        var win = new w.Window();
        win.alert({
            title:'提示',
            content:'你好!',
            hasCloseBtn:true,
            text4AlertBtn:'bu确定',
            width:300,
            height:100,
            y:200,
            skinClassName:'window_skin_a',
            dragHandle:'.window_header'
        }).on("alert",function(){
            alert("the first alert handler");
        }).on("alert",function(){
            alert("the second alert handler");
        }).on("alert",function(){
            alert("the third alert handler");
        }).on("close",function(){
            alert("the first close handler");
        }).on("close",function(){
            alert("the second close handler");
        });
    });
    $('#b').click(function() {
        new w.Window().confirm({
            title:'提示',
            content:'你确定点击么？',
            hasCloseBtn:true,
            text4AlertBtn:'bu确定',
            width:300,
            height:120,
            y:20,
            text4ConfirmBtn:"不去定",
            text4CancelBtn:"好吧",
            skinClassName:'window_skin_a',
            dragHandle:'.window_header'
        }).on("confirm",function(){
            alert("the confirm handler");
        }).on("cancel",function(){
            alert("the cancel handler");
        });
    });
    $('#c').click(function() {
        new w.Window().prompt({
            title:'请输入您的贱名',
            content:'你的名字将被用来买卖！',
            hasCloseBtn:true,
            width:300,
            height:200,
            y:20,
            text4PromptBtn:"输入",
            text4CancelBtn:"好吧",
            defaultValue4PromptInput:'张三',
            dragHandle:'.window_header',
            handler4PromptBtn:function(inputValue){
                alert("你的贱名是："+inputValue);
            },
            handler4CancelBtn:function(){
                alert("却笑");
            }
        });
    });
    $('#d').click(function() {
        new w.Window().common({
            content:'我是来卖萌的',
            hasCloseBtn:true,
            width:300,
            height:200,
            y:20,
            dragHandle:'.window_header'
        });
    });
})
