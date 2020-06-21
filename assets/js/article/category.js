$(function() {
    function loadUserInfo() {
        // 调用接口，获取文章分类列表
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                if(res.status === 0) {
                    //获取成功 
                    // 调用template方法
                    var result = template('list-tpl',res)
                    //渲染页面
                    $('tbody').html(result)
                }
            }
        })
    }
    loadUserInfo()
    //添加弹出层的唯一标识
    var addIndex = null

    //编辑文章类别唯一标识
    var editIndex = null

    //添加类别
    $('#add-category').click(function() {
        //弹出层
        addIndex = layer.open({
            type:1,//页面层
            title:'添加文章类列', //标题
            content:$('#add-tlp').html(),
            area:['500px', '250px']
        })
    })
    //事件委托，获取数据
    $('body').on('submit','#add-form',function(e) {
        //阻止默认
        e.preventDefault()
        // 获取表单数据
        var fd = $(this).serialize()
        //调用接口，提交数据
        $.ajax({
            type:'post',
            url:'my/article/addcates',
            data:fd,
            success:function(res) {
                if(res.status === 0) {
                    //成功获取数据 提示
                    layer.msg(res.message)
                    //关闭弹出层
                    layer.close(addIndex)
                    //刷新页面
                    loadUserInfo()
                }
            }
        })
    })

    //删除类别
    $('body').on('click','.del',function(e) {
        //获取删除的id
        var id = e.target.dataset.id
        //调用接口，根据id获取对应的数据
        $.ajax({
            type:'get',
            url:'my/article/deletecate/'+id,
            data:{
                id:id
            },
            success:function(res) {
                //弹出层
                layer.confirm('你确定要删除吗?', {icon: 3, title:'提示'}, function(index){
                    // 关闭弹出层
                    layer.close(index);
                    // 刷新页面
                    loadUserInfo()
                })
            }
        })
        
    })

    //编辑文章类列
    var form = layui.form
    $('body').on('click','.edit',function(e) {
        //根据id获取对应数据
        var id = e.target.dataset.id
        //调用接口 获取数据
        $.ajax({
            type:'get',
            url:'my/article/cates/'+id,
            data:{
                id:id
            },
            success:function(res) {
                if(res.status === 0) {
                    //弹出层
                    editIndex = layer.open({
                        type:1,//页面层
                        title:'修改文章分类', //标题
                        content:$('#edit-tlp').html(),
                        area:['500px', '250px']
                    })
                    //给表单填充数据
                    form.val('editForm',res.data)
                }
            }
        })
    })
    // 提交修改数据
    $('body').on('submit','#edit-form',function(e) {
         //阻止默认
         e.preventDefault()
         // 获取表单数据
         var fd = $(this).serialize()
         //调用接口，提交数据
         $.ajax({
             type:'post',
             url:'my/article/updatecate',
             data:fd,
             success:function(res) {
                 if(res.status === 0) {
                     //成功获取数据 提示
                     layer.msg(res.message)
                     //关闭弹出层
                     layer.close(editIndex)
                     //刷新页面
                     loadUserInfo()
                 }
             }
         })
    })
})