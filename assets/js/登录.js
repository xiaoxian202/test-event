//实现登录功能
$(function() {
    // 表单验证 
    //基于layui自定义验证规则
    var form = layui.form
    form.verify({
        uname:[/^[\S]{6,8}$/,'密码必须6到8位，且不能出现空格'],
        pwd:function(value,item) {
            // value表示，输入的值
            // item表示，dom对象
            // 正则 密码必须是六位数字
            var reg = /^\d{6}$/
            if(!reg.test(value)) {
                return '密码必须是六位数字'
            }
        }
    })

    //提交事件
    $('.layui-form').submit(function(e) {
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