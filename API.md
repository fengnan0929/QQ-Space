## 🌳 用户模块

##### 👉 判断邮箱是否使用  

**接口：**/user/validemail

**请求方式：**get/post

**参数：**email（String）

**返回：** String

- 邮箱可以用：true

- 邮箱已经注册过，不可以用：false



##### 👉 注册

**接口：**/user/register

请求方式：post

参数：

```java
 	// 邮箱
    private String email;
    // 密码
    private String password;
    // 昵称
    private String nickname;
    // 个性签名
    private String motto;
    // 性别
    private String sex;
    //年龄
    private int age;
    // 星座
    private String xinzuo;
```

返回：String

- 成功注册：success
- 注册失败（原因：生成默认头像失败）：sorry, server sucks



##### 👉 登录

**接口：**/user/login

请求方式：post

**参数：**

```java
String email;
String password;
```

**返回：**String

- 用户不存在：user does not exist
- 密码错误：incorrect password
- 登录成功：用户邮箱，即传入的email



##### 👉 注销登录

**接口：**/user/logout

**请求方式：**get/post

**参数：**nothing

**返回**：nothing



## 🌳 主页面模块

##### 👉 获取某用户主页信息

**接口：**/look/homepage

**请求方式**：get/post

**参数：** `String ownerAccount`  访问的是谁的主页面

**返回**：JSON对象

- 用户处于登录状态：主页信息，包括

  > 个人信息
  >
  > 好友列表
  >
  > 主页主人动态条数和留言数
  >
  > 前10条自己和好友的动态（包含访问者是否点赞信息），以及是否是最后一页

  ```java
   	// 个人信息
      private Person personal;
      // 好友列表
      private List<Friend> friends;
      // 统计信息
      private StaticInfo statics;
      // 动态列表
      private List<MomentWithLike> dongtailist;
      // 是否最后一页
      private boolean isLastPageOfMoment;
  ```



##### 👉 获取某用户留言板主页（第一页）

**接口：**/look/messages

**请求方式**：get/post

**参数：** `String ownerAccount`  访问的是谁的留言板

**返回**：JSON对象

- 如果请求的用户没有登录/登录状态过期： null

- 用户处于登录状态：返回前10条留言信息和留言总数，留言信息中包括当前浏览的用户是否点赞了

  ```java
  // 留言列表 
  private List<MessageWithLike> messages;
  // 留言总数
  private int totalMessages;
  ```





## 🌳 动态模块

##### 👉 发表动态

**接口：**/moment/refresh

**请求方式**：post

**参数：** *需要一样的名字*

```java
	// 内容
    private String content;
    // 内容图片,包含base64的dataURL
    private String pic;
```

**返回**：JSON对象

返回最新的10条动态以及是否最后一页

```java
// 动态列表
private List<MomentWithLike> moments;
// 是否最后一页
private boolean isLastPage;
```



##### 👉 获取下一页动态

**接口：**/moment/refresh

**请求方式**：get

**参数：** *需要一样的名字*

```java
// 主页拥有者
String ownerAccount;
// 需要的页码
int pageNumger;
// 是否发表
isPublish
```

**返回：**JSON对象

返回下一页的10条动态以及是否最后一页（同上）



##### 👉 删除动态

**接口：**/moment/delete

**请求方式**：get/post

**参数：** 

```java
// 动态id
Long id;
```

**返回：** String

- 删除的用户不是发动态的用户：permission denied
- 删除成功：success 





## 🌳 留言模块

##### 👉 发表留言

**接口：**/message/refresh

**请求方式**：post

**参数：** *需要一样的名字*

```java
 	// 被留言者账号
    private String toAccount;
    // 留言内容
    private String text;
```

**返回：**JSON对象 `List<MessageWithLike>`

发表这条留言后的新的10条留言



##### 👉 获取第n页留言

**接口：**/message/refresh

**请求方式**：get

**参数：** *需要一样的名字*

```java
// 留言板主人账号
String ownerAccount;
// 留言页数，必须是合理的页数
int pageNumber
```

**返回：**JSON对象 `List<MessageWithLike>`

该页的10条留言



##### 👉 删除留言

**接口：**/message/delete

**请求方式：**post

**参数：**

```java
// 被留言者账户
String toAccount;
// 留言id
Long id；
```

**返回：**String

- 删除者不是留言者或被留言者：permission denied
- 删除成功：success  ~~FIXME：这里怎么处理~~



## 🌳 点赞模块

##### 👉 给留言或动态点赞/取消赞

**接口：**/look/like

**请求方式：**post

**参数：**

```java
// 动态或留言的id
Long id；
// 是否取消赞
boolean isCancle;
```

**返回：**String   success





## 🌳 个人信息模块

##### 👉 显示个人信息

**接口：**/user/personal

**请求方式：**get

**参数：**nothing

**返回：**JSON对象

```java
    // 邮箱
    private String email;
    // 密码
    private String password;
    // 昵称
    private String name;
    // 头像
    private String headpic;
    // 个性签名
    private String motto;
    // 性别
    private String sex;
    //年龄
    private int age;
    // 星座
    private String xinzuo;
```



##### 👉 修改个人信息

**接口：**/user/personal

**请求方式：**post

**参数：**

```java

```

**返回：**JSON对象



##### 👉 修改头像

**接口：**/user/headpic

**请求方式：**post

**参数：**String  dataURL（含base64图片信息）

**返回：**String  新的图片地址



## 🌳 添加好友模块

##### 👉 根据邮箱/名字查询好友

**接口：**/user/findfriends

**请求方式：**post

**参数：**需要一样的参数名

```java
// 按邮箱
String email;
// 按昵称
String name;
// 是否按邮箱
boolean isEmail;
```

**返回：**User列表，单个用户包括以下信息

```java
// email
String email;
// 昵称
String name;
// 头像
String headpic;
```



##### 👉 关注好友

**接口：**/user/makefriends

**请求方式：**post

**参数：**需要一样的参数名

```java
// 要添加的好友的邮箱
String email;
```

**返回：**String 

- 添加成功：success
- 服务器内部错误：sorry，server sucks





1.朋友圈分页和留言分页

2.删除好友

3.跳转到好友界面 用新的页面展示

4.上传多张图片并且可以预览

5.可以发表情



