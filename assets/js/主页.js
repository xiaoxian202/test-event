$(function() {
    //判断标志是否存在
    var mytoken = localStorage.getItem('mytoken')
    if(!mytoken) {
        //如果不存在，调转到登录页面
        location.href = './练习登录.html'
    }

    //获取用户信息
    function loadUserInFo() {
        $.ajax({
            type:'get',
            url:'http://ajax.frontend.itheima.net/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('mytoken')
            },
            success:function(res) {
                if(res.status === 0) {
                    //获取数据，把对应数据放到页面指定位置
                    var data = res.data
                    $('.welcome-uname').html(data.username)
                    $('.log-uname').html(data.username)
    
                    //填充头像
                    // info.user_pic = 'http://t.cn/RCzsdCq'
                    if(data.user_pic) {
                        //删除div，添加img
                        $('.log-uname').siblings('div').remove()
                        $('.log-uname').parent().prevend('<img src="'+data.user_pic+'">')
    
                        $('.welcome-uname').parent().siblings('div').remove()
                        $('.welcome-uname').parent().parent().prevend('<img src="'+data.user_pic+'">')
                        
                    }else {
                        //显示div
                    }
                }
            }
        })
    }
    loadUserInFo()

    //退出功能
    
})