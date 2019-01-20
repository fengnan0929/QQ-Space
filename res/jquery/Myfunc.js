// 只有一位数时前面补零
function parse(month) {
    if (month < 10) {
        month = '0' + month;
    }
    else {
        month += "";
    }
    return month;
}

// 获取当前的时间 参数为时间戳
function getTime(timestamp) {
    timestamp = parseInt(timestamp);
    var now = Date.parse(new Date()); //获取当前的时间戳
    var res;
    if (now - timestamp < 60000) {
        if( parseInt((now - timestamp) / 1000) == 0){
            res ='刚刚'
        }
        else{
            res = parseInt((now - timestamp) / 1000) + "秒前";
        }
    }
    else if (now - timestamp < 3600000) {
        res = parseInt((now - timestamp) / 60000) + "分钟前";
    }
    else if ((now - timestamp < 3600000 * 24)) {
        res = parseInt((now - timestamp) / 3600000) + '小时前';
    }
    else {
        var time = new Date(timestamp);
        res = time.getFullYear() + '-' + parse((time.getMonth() + 1)) + "-" + parse(time.getDate()) + " " + parse(time.getHours()) + ":" + parse(time.getMinutes());
    }
    return res;
}

// 初始化好友动态
function showMoment(list) {
    let lists = "";
    for (let i = 0; i < list.length; i++) {
        lists = lists + `<div class="item">
                                <div class="item-box  layer-photos-demo1 layer-photos-demo">
                                    <div class="publish-details">
                                        <span class="head-nail" style="background: url('${list[i].headpic}') center center;background-size: 100%"></span>
                                        <div class="nail-right">
                                            <span class="nickname">${list[i].nickname}</span>
                                            <span class="publish-time">发布于：${getTime(list[i].time)}</span>
                                        </div>
                                        <span class="info-img like ${(list[i].liked)?'layblog-this':''}"><i class="layui-icon  layui-icon-praise"></i>${list[i].like}</span>
                                    </div>
                                    <p>${list[i].text}</p>
                                    <img ${(list[i].pic)? 'src=' +list[i].pic :''}  style="max-width:100%;margin-top: 10px;display:${(list[i].pic)? 'block':'none'}">
                                </div>
                                <div class="momentID" style="display: none"> ${list[i].id} </div>
                                <span class="delete" style="display:${(list[i].deletable)? 'block':'none'} "><i class="layui-icon  layui-icon-delete"></i></span>
                            </div>`
    }
    return lists;
};

//初始化留言
function updateContent(messages){
    let content = " ";
    for(let i=0; i<messages.length; i++){ // 10处应该为messages.length
        content = content +`<div class="info-box">
                    <div class="info-item">
                        <img class="info-img" src="${messages[i].headpic}" style="width: 70px;height: 70px;" alt="">
                        <div class="info-text">
                            <p class="title count">
                                <span class="name" style="color:#000000;">${messages[i].nick}</span>
                                <span class="name" style="margin-left:10px;">${getTime(messages[i].time)}</span>
                                <span class="info-img like ${(messages[i].liked)?'layblog-this':''}"><i class="layui-icon  layui-icon-praise"></i>${messages[i].like}</span>
                            </p>
                            <p class="info-intr">${messages[i].text}</p>
                        </div>
                    </div>
                    <div class="messageID" style="display: none">${messages[i].id}</div>
                    <span class="delete" style="display:${(messages[i].deletable)? 'block':'none'} "><i class="layui-icon  layui-icon-delete"></i></span>
                </div>`
    }
    $('#LAY-msg-box').html(content);
}

// 显示好友
function findfriend(friend){
    let content ="";
    for(let i=0; i<friend.length; i++){
        content = content + ` <li>
                                <img src=${friend[i].headpic} class="search-pic">
                                <span class="search-name">${friend[i].name}</span>
                                <span class="search-mail">(${friend[i].email})</span>
                                <span class=${(friend[i].friends)?"follow":"new"} id=${friend[i].email}>${(friend[i].friends)?'已关注':'关注+'}</span>
                            </li>`
    }
    return content;
}