/**
通用配置
 */
// 配置通用URL地址
// var baseURL = 'http://ajax.frontend.itheima.net/'
var baseURL = 'http://www.liulongbin.top:3007/'
$.ajaxPrefilter(function(option) {
    //进度条
    option.beforeSend = function() {
        window.NProgress && NProgress.start()
    }
    // console.log(option);
    option.url = baseURL + option.url

    //配置请求头
    if(option.url.lastIndexOf('/my/') !== -1) {
        option.headers = {
            Authorization:localStorage.getItem('mytoken')
        }
    }

    //处理异常情况，服务器结束时触发
    option.complete = function(res) {
        window.NProgress && NProgress.done()
        // console.log(res);
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空错误的token
            localStorage.removeItem('mytoken')

            // 跳转到登录页面
            location.href = '练习登录.html'
        }
    }

})