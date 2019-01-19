/**
   @Name：闲言
   @Author 哐哐哐
**/

layui.define(['element', 'form', 'laypage', 'jquery', 'laytpl'], function (exports) {
    var laypage = layui.laypage, $ = layui.jquery, laytpl = layui.laytpl;

    // start 导航显示隐藏
    $("#mobile-nav").on('click', function () {
        $("#pop-nav").toggle();
    });
    // end 导航显示隐藏

    // start 评论的特效
    (function ($) {
        $.extend({
            tipsBox: function (options) {
                options = $.extend({
                    obj: null,  //jq对象，要在那个html标签上显示
                    str: "+1",  //要显示的内容，也可以传一段htm
                    startSize: "12px",  //动画开始的文字大小
                    endSize: "30px",    //动画结束的文字大小
                    interval: 600,  //动画时间间隔
                    color: "red",    //文字颜色
                    callback: function () {
                    }    //回调函数
                }, options);

                $("body").append("<span class='num'>" + options.str + "</span>");

                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - 10;
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",
                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval, function () {
                    box.remove();
                    options.callback();
                });
            },
            tipsBox2: function (options) {
                options = $.extend({
                    obj: null,  //jq对象，要在那个html标签上显示
                    str: "+1",  //要显示的内容，也可以传一段htm
                    startSize: "12px",  //动画开始的文字大小
                    endSize: "30px",    //动画结束的文字大小
                    interval: 600,  //动画时间间隔
                    color: "red",    //文字颜色
                    callback: function () {
                    }    //回调函数
                }, options);

                $("body").append("<span class='num'>" + options.str + "</span>");

                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() ;
                var top = options.obj.offset().top - 10;
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",
                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval, function () {
                    box.remove();
                    options.callback();
                });
            }
        });
    })($);

    function niceIn(prop) {
        prop.find('i').addClass('niceIn');
        setTimeout(function () {
            prop.find('i').removeClass('niceIn');
        }, 1000);
    }
    // 评论的特效 end

    //  start 留言点赞
    $(function () {
        $('#LAY-msg-box').delegate('span', 'click', function () {
            if ($(this).hasClass('like')) {
                if (!($(this).hasClass("layblog-this"))) {
                    this.text = '已赞';
                    $(this).addClass('layblog-this');
                    $(this).html('<i class="layui-icon layui-icon-praise"></i>' + (parseInt($(this).text()) + 1));
                    $.tipsBox({
                        obj: $(this),
                        str: "+1",
                        callback: function () {
                        }
                    });
                    niceIn($(this));
                    layer.msg('点赞成功', {
                        icon:6,
                        time: 1000
                    })
                }
                // 取消赞
                else {
                    $(this).html('<i class="layui-icon layui-icon-praise"></i>' + (parseInt($(this).text()) - 1));
                    $(this).removeClass('layblog-this');
                    $.tipsBox({
                        obj: $(this),
                        str: "-1",
                        callback: function () {
                        }
                    });
                    niceIn($(this));
                    layer.msg('取消点赞', {
                        icon: 5,
                        time: 1000
                    })
                }
            }
        });
    });
    //  留言点赞 end

    // start 留言提交按钮
    $('#item-btn').on('click', function () {
        var elemCont = $('#LAY-msg-content'), content = elemCont.val();
        // 从本地获取个人信息
        var d = JSON.parse(localStorage.getItem('pdata'));

        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入留言');
            return elemCont.focus();
        }
        else{
            var view = $('#LAY-msg-tpl').html();
                data = {
                    username: d.nickname,
                    avatar: d.headpic,
                    praise: 0,
                    content: content
                };

            // 分页的内容重新渲染
            itemsnum++;  // 数据总数+1
            laypage.render({
                elem: 'test1',
                count: itemsnum,
                theme: '#07A8C5',
                jump: function (obj,first) {
                    if(!first) {
                        console.log(obj.curr); //获取当前页面
                    }
                }
            });

            // 新增的留言放在首页，删除页面最后一条留言
            if( $('.info-box').length >9){
                $(".info-box:last-child").remove();
            }

            //模板渲染
            laytpl(view).render(data, function (html) {
                $('#LAY-msg-box').prepend(html);
                elemCont.val('');
                layer.msg('留言成功', {
                    icon: 1
                })
            });
        }
    });
    // 留言提交按钮 end

    // start 动态的点赞
    $(function () {
        $('.index-wrap').delegate('span', 'click', function () {
            if ($(this).hasClass('like')) {
                if (!($(this).hasClass("layblog-this"))) {
                    this.text = '已赞';
                    $(this).addClass('layblog-this');
                    $(this).html('<i class="layui-icon layui-icon-praise"></i>' + (parseInt($(this).text()) + 1));
                    $.tipsBox2({
                        obj: $(this),
                        str: "+1",
                        callback: function () {
                        }
                    });
                    niceIn($(this));
                    layer.msg('点赞成功', {
                        icon:6,
                        time: 1000,
                        offset:['50%','50%']
                    })
                }
                // 取消赞
                else {
                    $(this).html('<i class="layui-icon layui-icon-praise"></i>' + (parseInt($(this).text()) - 1));
                    $(this).removeClass('layblog-this');
                    $.tipsBox2({
                        obj: $(this),
                        str: "-1",
                        callback: function () {
                        }
                    });
                    niceIn($(this));
                    layer.msg('取消点赞', {
                        icon: 5,
                        time: 1000,
                        offset:['50%','50%']
                    })
                }
            }
        });
    });
    // end 动态的点赞

    // start 上传动态配图
    let picFile,picSrc;
    $('#upload').on('change',function () {
        // 获取读到的上传文件
        picFile = document.getElementById('upload').files[0];
        if(picFile){
            $('#imagepath').text(picFile.name);
            // 将成功上传图标改为显示状态
            $('#suc_upload').css({
                display: 'block'
            });
            var reader = new FileReader();
            reader.readAsDataURL(picFile);
            //监听文件读取结束后事件
            reader.onloadend = function (e) {
                if(e.target.result){
                    picSrc = 'src =' +e.target.result;
                }
            };
        }
        $('#upload').val('');
    });
    // 上传动态配图 end

    // start 发表动态
    $('#submit-btn').on('click',function () {
        var content = $('#LAY-msg-content').val();
        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入动态内容',{
                offset:['30%','50%']
            });
            return  $('#LAY-msg-content').focus();
        }

        if(!picFile){
            picSrc = '';
        }

        let newDongtai= {
            content:content,
            pic : picSrc
        };
        console.log(newDongtai);
        $.ajax({
            type: 'POST',
            xhrFields:{
                withCredentials:true
            },
            url: 'http://192.168.1.105:8080/moment/refresh', // 后端接口
            data: JSON.stringify(newDongtai),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $('.item').remove();
                $(showMoment(data.moments)).insertAfter(".fixed");
                $('#LAY-msg-content').val('');
                layer.msg('动态发布成功', {
                    icon: 1,
                });
            },
        });


        clearPre();
        // 清除本次上传的内容和提示内容
        function clearPre(){
            picFile = null;
            picSrc = null;
            $('#suc_upload').css({
                display: 'none'
            });
            $('.image-path').text('');
        }
    });
    // 发表动态 end

    //输出test接口
    exports('blog', {});
});

