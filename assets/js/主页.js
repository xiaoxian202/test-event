$(function() {
    //判断标志是否存在
    var mytoken = localStorage.getItem('mytoken')
    if(!mytoken) {
        //如果不存在，调转到登录页面
        location.href = './练习登录.html'
    }
})