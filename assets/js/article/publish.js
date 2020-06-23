$(function() {
    var form = layui.form
    // //提交表单数据
    // $('#add-form').submit(function(e) {
    //     e.preventDefault()
    //     //处理文件上传
    //     var fd = new FormData(this)
    //     //调用接口发布文章
    //     $.ajax({
    //         type:'post',
    //         url:'my/article/add',
    //         data:fd,
    //         processData:false,//阻止转成字符串
    //         contentType:false,//不使用默认参数格式
    //         success:function(res) {
    //             if(res.status === 0) {
    //                 layer.msg(res.message)
    //             }
    //         }
    //     })

    // })

    //分类下拉列表
    function loadListData() {
        //调用接口获取数据
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                if(res.status === 0) {
                    var tags = template('cate-tpl',res)
                    $('#cate-list').html(tags)
                    form.render('select')
                }
            }
        })
    }
    loadListData()

    //富文本
    initEditor()

    //文章封面
    //初始化文件裁剪区
    var $image = $('#image')
    //配置项
    var options = {
        //纵横比
        aspectRatio:400 /280,
        //预览区
        preview:".img-preview"
    }
    $image.cropper(options)

    //触发事件
    $('#select-btn').click(function() {
        $('#file-btn').click()
    })

    //获取选中的文件
    $('#file-btn').change(function(e) {
        var file = e.target.files[0]
        //将文件转化成url地址
        var imgURL = URL.createObjectURL(file)
        //修改图片地址
        $image.cropper('destroy')   //销毁之前的
            .attr('src',imgURL)     //改变图片路径
            .cropper(options)       //创建新的裁剪区域
    })

    // 处理按钮的点击行为
    //状态
    var state = ''
    $('.layui-btn').click(function() {
        //获取自定义类型
        var type = $(this).data('type')  
        //判断
        if(type === 'publish') {
            state = '已发布'
        }else if(type === 'temp') {
            state = '草稿'
        }
        // console.log(state);
    })
    

    //表单提交
    $('#add-form').submit(function(e) {
        e.preventDefault()
        //生成文章封面图片
        $image.cropper('getCroppedCanvas',{ //创建一个canvas画布
            width:400,
            height:280
        }).toBlob(function(blob) {
            //处理文件上传
            var form = $('#add-form').get(0)
            var fd = new FormData(form)
            fd.append('state',state)
            fd.append('cover_img',blob)
           
            // console.log(fd.get('title'));
            // console.log(fd.get('cate_id'));
            // console.log(fd.get('content'));
            // console.log(fd.get('cover_img'));
            // console.log(fd.get('state'));
            //调用接口发布文章
            $.ajax({
                type:'post',
                url:'my/article/add',
                data:fd,
                processData:false,//阻止转成字符串
                contentType:false,//不使用默认参数格式
                success:function(res) {
                    if(res.status === 0) {
                        layer.msg(res.message)
                    }
                }
            })
        })
        
    })
})