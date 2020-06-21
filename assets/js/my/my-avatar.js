//1.实现基本裁剪效果
//获取裁剪区域dom元素
var $image = $('.cropper-box img')
//配置项
var option = {
    //纵横比
    aspectRatio:1,
    //指定预览区域
    preview:'.img-preview'
}
//创建裁剪区域
$image.cropper(option)

//2.点击上传按钮 触发隐藏文件上传
$('#loadUp').click(function() {
    $('#file').click()
})

//3.添加change事件
$('#file').change(function(e) {
    //获取上传的文件
    var file = e.target.files[0]
    //把文件转化成url地址
    var imgURL = URL.createObjectURL(file)
    //改变裁剪区域的src属性值
    $('#image').cropper('destroy')  //销毁之前的裁剪区
            .prop('src',imgURL)     //更新图片路径
            .cropper(option)        //重新生成一份裁剪区
})

//4.点击确定按钮，更新头像
$('#okbtn').click(function() {
    //获取裁剪后的图片信息
    var imgData = $image.cropper('getCroppedCanvas',{
        width:100,
        height:100
    }).toDataURL('image/png')//将canvas画布上的内容转化成base64字符串
    //把上述图片调用接口发送给服务器
    $.ajax({
        type:'post',
        url:'my/update/avatar',
        data:{
            avatar:imgData
        },
        success:function(res) {
            if(res.status === 0) {
                //获取成功 提示
                layer.msg(res.message)
                //window表示当前页面
                //parent表示iframe的父窗口
                window.parent.$.loadUserInFo()
            }
        }
    })
    

})