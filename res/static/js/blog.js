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
                var left = options.obj.offset().left + options.obj.width();
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

    // start 取消赞函数
    function isliked(id, isCancel, type) {
        $.ajax({
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            url: 'http://47.100.226.85:8080/find-friends/look/like', // 后端接口
            data: JSON.stringify({'id': id, 'isCancel': isCancel, 'type': type}),
            contentType: "application/json",
            success: function () {
                console.log(1);
            }
        });
    }

    // 取消赞函数 end

    //  start 留言点赞
    $(function () {
        $('#LAY-msg-box').delegate('span', 'click', function () {
            let messageID = $(this).parents('.info-box').children('.messageID').text();
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
                        icon: 6,
                        time: 1000
                    });
                    isliked(messageID, 'false', 'message');
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
                    });
                    isliked(messageID, 'true', 'message');
                }
            }
        });
    });
    //  留言点赞 end

    // start 留言提交
    $('#item-btn').on('click', function () {
        var elemCont = $('#LAY-msg-content'), content = elemCont.val();

        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入留言');
            return elemCont.focus();
        }
        else {
            // 从本地获取被访问人信息
            let user = JSON.parse(localStorage.getItem('UserAccount'));
            $.ajax({
                url: 'http://47.100.226.85:8080/find-friends/message/refresh',
                type: 'post',
                xhrFields: {
                    withCredentials: true
                },
                contentType: "application/json",
                data: JSON.stringify({
                    'toAccount': user,
                    'text': content,
                    'isPublish':'true'
                }),
                success: function (data) {
                    // 分页设置
                    layui.laypage.render({
                        elem: 'test1', //test1是ID，不用加#号
                        count: data.totalMessages,
                        theme: '#07A8C5',
                        jump: function (obj,first) {
                            let curPage = obj.curr;
                            if(!first) {
                                $.ajax({
                                    url:'http://47.100.226.85:8080/find-friends/message/refresh',
                                    xhrFields:{
                                        withCredentials:true
                                    },
                                    data:JSON.stringify({
                                        ownerAccount: user,
                                        pageNumber:curPage,
                                        isPublish:'false'
                                    }), // 参数是页码
                                    type:'post',
                                    contentType:'application/json',
                                    success:function (data) {
                                        console.log(data);
                                        updateContent(data.messages);
                                    },
                                });
                            }
                        }
                    });
                    // 更新页面内容
                    updateContent(data.messages);
                    elemCont.val('');
                    layer.msg('留言成功', {
                        icon: 1
                    })
                }
            });
        }
    });
    // 留言提交按钮 end


    // start 给朋友留言
    $('#item-btn1').on('click', function () {
        var elemCont = $('#LAY-msg-content'), content = elemCont.val();

        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入留言');
            return elemCont.focus();
        }
        else {
            // 从本地获取被访问人信息
            let user = JSON.parse(localStorage.getItem('friendAccount'));
            $.ajax({
                url: 'http://47.100.226.85:8080/find-friends/message/refresh',
                type: 'post',
                xhrFields: {
                    withCredentials: true
                },
                contentType: "application/json",
                data: JSON.stringify({
                    'toAccount': user,
                    'text': content,
                    'isPublish':'true'
                }),
                success: function (data) {
                    // 分页设置
                    layui.laypage.render({
                        elem: 'test1', //test1是ID，不用加#号
                        count: data.totalMessages,
                        theme: '#07A8C5',
                        jump: function (obj,first) {
                            let curPage = obj.curr;
                            if(!first) {
                                $.ajax({
                                    url:'http://47.100.226.85:8080/find-friends/message/refresh',
                                    xhrFields:{
                                        withCredentials:true
                                    },
                                    data:JSON.stringify({
                                        ownerAccount: user,
                                        pageNumber:curPage,
                                        isPublish:'false'
                                    }), // 参数是页码
                                    type:'post',
                                    contentType:'application/json',
                                    success:function (data) {
                                        console.log(data);
                                        updateContent(data.messages);
                                    },
                                });
                            }
                        }
                    });
                    // 更新页面内容
                    updateContent(data.messages);
                    elemCont.val('');
                    layer.msg('留言成功', {
                        icon: 1
                    })
                }
            });
        }
    });
    // 给朋友留言 end

    // start 留言删除
    $(function () {
        $('#LAY-msg-box').delegate('.delete', 'click', function () {
            if (confirm('确认删除此条留言？')) {
                let messageID = $(this).siblings('.messageID').text();
                $.ajax({
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    url: 'http://47.100.226.85:8080/find-friends/message/delete', // 后端接口
                    data: JSON.stringify({'id': messageID}),
                    contentType: "application/json",
                    success: function (data) {
                        console.log(data);
                        let timer = setTimeout(function () {
                            layer.msg('留言已删除', {
                                icon: 6,
                                time: 1000
                            });
                            clearTimeout(timer);
                        }, 500);
                        layui.laypage.render({
                            elem: 'test1', //test1是ID，不用加#号
                            count: parseInt(data),
                            theme: '#07A8C5',
                            jump: function (obj,first) {
                                let curPage = obj.curr;
                                if(!first) {
                                    $.ajax({
                                        url:'http://47.100.226.85:8080/find-friends/message/refresh',
                                        xhrFields:{
                                            withCredentials:true
                                        },
                                        data:JSON.stringify({
                                            ownerAccount: user,
                                            pageNumber:curPage,
                                            isPublish:'false'
                                        }), // 参数是页码
                                        type:'post',
                                        contentType:'application/json',
                                        success:function (data) {
                                            console.log(data);
                                            updateContent(data.messages);
                                        },
                                    });
                                }
                            }
                        });
                    }
                });
                // 从页面删除此条留言
                $(this).parents('.info-box').remove();
            }
        })
    });
    // 删除留言 end

    // start 动态点赞
    $(function () {
        $('.index-wrap').delegate('span', 'click', function () {
            let momentID = $(this).parents('.item').children('.momentID').text();
            console.log(momentID);
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
                        icon: 6,
                        time: 1000,
                        offset: ['50%', '50%']
                    });
                    isliked(momentID, false, 'moment');
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
                        offset: ['50%', '50%']
                    });
                    isliked(momentID, true, 'moment');
                }
            }
        });
    });
    // end 动态点赞

    // start 动态删除
    $(function () {
        $('.index-wrap').delegate('.delete', 'click', function () {
            if (confirm('确认删除此条动态？')) {
                let momentID = $(this).siblings('.momentID').text();
                $.ajax({
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    url: 'http://47.100.226.85:8080/find-friends/moment/delete', // 后端接口
                    data: JSON.stringify({'id': momentID}),
                    contentType: "application/json",
                    success: function () {
                        layer.msg('动态已删除', {
                            icon: 6,
                            time: 1000
                        })
                    }
                });
                // 从主页删除此条动态
                $(this).parents('.item').remove();
                // 刷新动态数
                let $totalMoment = $('.static-item').eq(0).children('span');
                $totalMoment.text($totalMoment.text() - 1);
            }
        })
    });
    // 动态删除 end

    // start 上传动态配图
    let picFile, picSrc;
    $('#upload').on('change', function () {
        // 获取读到的上传文件
        picFile = document.getElementById('upload').files[0];
        if (picFile) {
            $('#imagepath').text(picFile.name);
            // 将成功上传图标改为显示状态
            $('#suc_upload').css({
                display: 'block'
            });
            var reader = new FileReader();
            reader.readAsDataURL(picFile);
            //监听文件读取结束后事件
            reader.onloadend = function (e) {
                if (e.target.result) {
                    picSrc = 'src =' + e.target.result;
                }
            };
        }
        $('#upload').val('');
    });
    // 上传动态配图 end

    // start 发表动态
    $('#submit-btn').on('click', function () {
        var content = $('#LAY-msg-content').val();
        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入动态内容', {
                offset: ['30%', '50%']
            });
            return $('#LAY-msg-content').focus();
        }

        if (!picFile) {
            picSrc = '';
        }

        let newDongtai = {
            content: content,
            pic: picSrc,
            isPublish: 'true'
        };
        console.log(newDongtai);
        $.ajax({
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            url: 'http://47.100.226.85:8080/find-friends/moment/refresh', // 后端接口
            data: JSON.stringify(newDongtai),
            contentType: "application/json",
            success: function (data) {
                $('.item').remove();
                $(showMoment(data.moments)).insertAfter(".fixed");
                $('#LAY-msg-content').val('');
                layer.msg('动态发布成功', {
                    icon: 1,
                });
                // 刷新动态总数
                let $totalMoment = $('.static-item').eq(0).children('span');
                $totalMoment.text(parseInt($totalMoment.text()) + 1);
            },
        });


        clearPre();

        // 清除本次上传的内容和提示内容
        function clearPre() {
            picFile = null;
            picSrc = null;
            $('#suc_upload').css({
                display: 'none'
            });
            $('.image-path').text('');
        }
    });
    // 发表动态 end

    // 退出页面
    $('.exit').on("click", function () {
        if (confirm("您确认要退出闲言吗？") == true) {
            $(window).attr('location', 'login.html');
            // 清除当前用户的cookies和账户
            localStorage.removeItem('UserAccount');
            localStorage.removeItem('friendAccount');
            $.ajax({
                type: 'post',
                xhrFields: {
                    withCredentials: true
                },
                url: '47.100.226.85:8080/find-friends/user/logout',
            })
        }
    });

    // 查找、添加好友
    $(function () {
        let searchInfo = '';
        $('.layui-input').on('change', function () {
            searchInfo = $('.layui-input').val();
        });
        $('.layui-icon-search').on('click', function () {
            if(searchInfo){
                $.ajax({
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    url: 'http://47.100.226.85:8080/find-friends/user/findfriends', // 后端接口
                    data: JSON.stringify({"keyWord":searchInfo}),
                    contentType: "application/json",
                    success: function (data) {
                        let newfriend = '';
                        if(data.length>0){
                            $('.search-follow').html(findfriend(data));
                            $('.search-output').css('display','block');
                            $('.search-output').one('click',function (event) {

                                if(event.target.className!=='new'){
                                    $('.search-output').css('display','none');
                                    $('.layui-input').val('');
                                }
                                else{
                                    let friendMail = (event.target.id);
                                    console.log(friendMail);
                                    $.ajax({
                                        type: 'POST',
                                        xhrFields: {
                                            withCredentials: true
                                        },
                                        url: 'http://47.100.226.85:8080/find-friends/user/makefriends', // 后端接口
                                        data: JSON.stringify({"email":friendMail}),
                                        contentType: "application/json",
                                    });
                                    newfriend = `<li>
                                        <span class="item-head"
                                              style="background:url('${data[0].headpic}') center center;background-size: 100%"></span>
                                        <span>${data[0].name}</span>
                                        <span class="friendEmail"
                                              style="display: none">${data[0].email}</span>
                                    </li>`;
                                    $('.friend-items').append(newfriend);
                                    $('.search-output').css('display','none');
                                    $('.layui-input').val('');
                                }
                            })
                        }
                        else{
                            $('.layui-input').val('');
                            layer.msg('此用户不存在', {
                                icon: 5,
                                time: 1000,
                                offset: ['50%', '50%']
                            });
                        }
                    },
                });
            }
        });
    });

    //输出test接口
    exports('blog', {});
});

