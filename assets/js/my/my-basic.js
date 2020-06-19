$(function() {
    //获取用户信息
    var form = layui.form
    $.ajax({
        type:'get',
        url:'my/userinfo',
        success:function(res) {
            // console.log(res);
            if(res.status !== 0) {
                return layer.msg(res.message)
            }else{
                form.val('basicForm',res.data)
            }
        }
    })

    //修改用户信息
    $('#form').submit(function(e) {
        e.preventDefault()
        //获取用户信息
        // serializeArray获取表单所有的数据，返回值是数组
        var formData = $(this).serializeArray()
        // 遍历 筛选，name="username"之外的值
        formData = formData.filter(function(val) {
            return val.name !== 'username'
        })
        //调用接口，实现用户信息修改
        $.ajax({
            type:'post',
            url:'my/userinfo',
            data:formData,
            success:function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }else {
                    layer.msg(res.message)
                }
            }
        })
    })
})