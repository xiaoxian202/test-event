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
        },
        same:function(value) {
            var val = $('#register-form input[name="password"]').val()
            console.log(val,value);
            //判断两次输入的密码是否相等
            if(value !== val) {
                return '两次输入的密码不一致，请重新输入'
            }
        }
    })

    //登录表单提交事件
    $('#login-form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        var formData = $(this).serialize()
        //利用ajax提交数据
        $.ajax({
            type:'post',
            url:'api/login',
            data:formData,
            success:function(res) {
                // console.log(res);
                if(res.status === 0) {
                    //成功，调转到主页
                    location.href = './练习主页.html'
                    //记下标志
                    localStorage.setItem('mytoken',res.token)
                }
            }
        })
    })
    //注册表单提交事件
    $('#register-form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        var formData = $(this).serialize()
        //向服务器提交数据
        $.ajax({
            type:'post',
            url:'api/reguser',
            data:formData,
            success:function(res) {
                if(res.status !== 0) {
                    //注册失败
                   layer.msg(res.message)
                }else{
                    //注册成功
                    $('#register-form a').click()
                    //清空表单
                    var form = document.getElementById('register-form');
                    form.reset()
                    
                }              
            }
        })
    })

    //点击登录表单底下的链接
    $('#login-form a').click(function() {
        // 登录表单隐藏，注册表单显示
        $('#login-form').hide()
        $('#register-form').show()
    })
    //点击注册表单底下的链接
    $('#register-form a').click(function() {
        // 注册表单隐藏，登录表单显示
        $('#register-form').hide()
        $('#login-form').show()
    })
})