$(function() {
    //表单验证
    var form = layui.form
    form.verify({
        // 原密码是6-8位
        oldPwd:[/^[\S]{6,8}$/,'密码是6-8位'],
        // 新旧密码不能一致
        newPwd:function(value) {
            //获取旧密码
            var oldPwd = $('#form input[name="oldPwd"]').val()
            if(value === oldPwd) {
                return '新旧密码不能一致'
            }
        },
        //两次输入的密码需要一致
        same:function(value){
            //获取新密码
            var newPwd = $('#form input[name="newPwd"]').val()
            if(value !== newPwd) {
                return '两次输入的密码不一致'
            }

        }
    })

    //提交事件
    $('#form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        var fd = $(this).serialize()

        //调用接口将消息发送给服务器
        $.ajax({
            type:'post',
            url:'my/updatepwd',
            data:fd,
            success:function(res) {
                // console.log(res);
                if(res.status === 0) {
                    layer.msg(res.message)
                    //清空表单
                    $('#form')[0].reset()
                }
            }
        })
    })
})