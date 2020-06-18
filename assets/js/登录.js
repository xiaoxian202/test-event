//实现登录功能
$(function() {
    //提交事件
    $('form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        var formData = $(this).serialize()
        //利用ajax提交数据
        $.ajax({
            type:'post',
            url:'http://ajax.frontend.itheima.net/api/login',
            data:formData,
            success:function(res) {
                // console.log(res);
                if(res.status === 0) {
                    //成功，调转到主页
                    location.href = './练习主页.html'
                }
            }
        })
    })
})