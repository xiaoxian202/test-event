$(function() {
    //获取表单
    var form = layui.form
    // 页码值
    var pagenum = 1
    // 每页显示多少条数据
    var pagesize = 10
    // 处理日期的格式化： 基于模板引擎的过滤器
    template.defaults.imports.formDate = function (data) {
        // 实现日期的格式化：把参数data日期字符串转换为日期对象
        var d = new Date(data)
        var year = d.getFullYear()
        var month = addZero(d.getMonth() + 1)
        var day = addZero(d.getDate())
        var hour = addZero(d.getHours())
        var minutes = addZero(d.getMinutes())
        var seconds = addZero(d.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }

    // 补零函数
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    //调用接口 分类下拉列表
    function loadCateData() {
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                    //依据模板引擎，渲染页面
                    var tags = template('tpl-category',res)
                    $('#category').html(tags)
                    //更新渲染
                    form.render('select')
            }
        })
    }
    loadCateData()

    // 获取文章列表数据
    function loadListData(param) {
        $.ajax({
            type:'get',
            url:'my/article/list',
            data:param,
            success:function(res) {
                // console.log(res);
                var tags = template('list-tpl',res)
                $('.layui-table tbody').html(tags)

            }
        })
    }
    loadListData({
        pagenum: pagenum,
        pagesize:pagesize
    })

    // 搜索功能
    $('#search-form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        var fd = $(this).serializeArray()
        var params = {
            pagenum:pagenum,
            pagesize:pagesize
        }
        fd.filter(function(item) {
            //动态添加属性
            params[item.name] = item.value
        })
        loadListData(params)      
    })

    //删除功能
    $('body').on('click','.del',function() {
        //获取删除的id
        var id = $(this).data('id')
        //调用接口
        $.ajax({
            type:'get',
            url:'my/article/delete/'+id,
            data:{
                id:id
            },
            success:function(res) {
                if(res.status === 0) {
                    layer.confirm('你确定要删除吗?', {icon: 3, title:'提示'}, function(index){
                        //刷新页面
                        loadListData({
                            pagenum: pagenum,
                            pagesize:pagesize
                        })
                        
                        layer.close(index);
                    })
                } 
            }
        })
    })
})