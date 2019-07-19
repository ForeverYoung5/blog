# Blog

（https://github.com/Young5566/blog-flask）



## 数据库字段

### user
```
user_uuid = db.Column(db.String(64), primary_key=True, nullable=False)
user_name = db.Column(db.String(64), nullable=False)
password_hash = db.Column(db.String(256), nullable=False)
email = db.Column(db.String(64))
head_img = db.Column(db.String(256))
```
###  article
```
article_uuid = db.Column(db.String(64), primary_key=True,nullable=False)
title = db.Column(db.String(64), nullable=False)
abstract = db.Column(db.Text, nullable=False)
content = db.Column(db.Text, nullable=False)
tags = db.Column(db.String(64), nullable=False)
second_tags = db.Column(db.String(64), nullable=False)
author_uuid = db.Column(db.String(64), db.ForeignKey('user.user_uuid'))
article_img_uuid = db.Column(db.String(64),db.ForeignKey('image.image_uuid'))
pub_time = db.Column(db.DateTime, index=True, default=datetime.utcnow)
```
### Image
```
image_uuid = db.Column(db.String(64), primary_key=True, nullable=False)
name = db.Column(db.String(128), nullable=False)
group_name = db.Column(db.String(64), nullable=False)
remote_file_id = db.Column(db.String(128), nullable=False)
storage_ip = db.Column(db.String(64), nullable=False)
size = db.Column(db.Integer, nullable=False)
image_url = db.Column(db.String(128), nullable=False)
article = db.relationship('Article', backref='image', lazy='dynamic')
create_time = db.Column(db.DateTime, index=True,default=datetime.utcnow)
```

## 状态码说明
```
SUCCESS = 200
    PARAM_ERROR = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    ERROR = 700
    SQL_ERROR = 701
    TOKEN_ERROR = 703

    msg = {
        SUCCESS: '操作成功',
        PARAM_ERROR: '请求参数错误',
        SQL_ERROR: '数据库操作失败',
        NOT_FOUND: '没有该目标',
        TOKEN_ERROR: 'token过期或错误',
        UNAUTHORIZED: '没有添加token'
    }
```

## 权限认证

### 1用户登录

**简要描述：** 

- 用户登陆

**请求URL：** 
- `/api/v1.0/auth/login`

**请求方式：**

- POST 

** 请求示例 **
```
{
	"user_name":"Young",
	"password":"123"
}
```

**参数：** 

| 参数名       | 必选   | 类型     | 说明   |
| :-------- | :--- | :----- | ---- |
| user_name | 是    | string | 用户名  |
| password  | 是    | string | 密码   |

 **返回示例**

``` 
 {
    "code": 200,
    "data": {
        "email": "403353323@qq.com",
        "head_img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542185269&di=b0ec1e5b09f3a0a2c7f6f98ba232dfc1&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F01%2F20150601135046_kwhEu.thumb.700_0.jpeg",
        "token": "eyJleHAiOjE1NDI3MjMzMDIsImlhdCI6MTU0MjcxOTcwMiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyX3V1aWQiOiI4ODM2ZWY2MS0xNjJmLTRiZjUtYTM3Mi03NGViM2VmZGIxODIifQ.-HKITUEjDuYlXowngP3Njt1LFcTX_qQWCp44H0GB8E8",
        "user_name": "Young",
        "user_uuid": "8836ef61-162f-4bf5-a372-74eb3efdb182"
    },
    "msg": "操作成功"
}
```

 **返回参数说明** 

| 参数名       | 类型     | 说明      |
| :-------- | :----- | ------- |
| code      | int    | 状态码     |
| email     | string | 邮箱      |
| user_uuid | String | 用户Id    |
| head_img  | String | 用户头像    |
| token     | string | 用户token |

 **备注** 

## 文章管理

### 1发布文章

**简要描述：** 

- 发布文章

**请求URL：** 
- `/api/v1.0/article/postArticle`

**请求方式：**

- POST 

** 请求示例 **
```
{
	"title":"hello World",
	"content":"## hello World",
	"tags":"Html", 
	"secondTags":"css",
	"image_uuid":"3dd2d545-b87a-4bcf-b4f1-57de48b18fca",
	"abstract":"这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 "
}
```

**参数：** 

| 参数名              | 必选   | 类型     | 说明        |
| :--------------- | :--- | :----- | --------- |
| title            | 是    | string | 标题        |
| content          | 是    | string | 内容        |
| tags             | 是    | string | 标签        |
| secondTags       | 是    | string | 次标签       |
| article_img_uuid | 是    | string | 文章关联的图片id |


 **返回示例**

``` 
 {
    "code": 200,
    "data": null,
    "msg": "添加成功"
}
```

 **备注** 

### 1修改文章

**简要描述：** 

- 修改文章

**请求URL：** 
- `/api/v1.0/article/updateArticle`

**请求方式：**

- POST 

** 请求示例 **
```
{
	"articleUuid":"35e59a26-8e77-42a7-bfdc-8cb32d4a6b35",
	"articleInfo":{
		"tags":"Java"
	}
}
```

**参数：** 

| 参数名         | 必选   | 类型     | 说明      |
| :---------- | :--- | :----- | ------- |
| articleUuid | 是    | string | 修改的目标id |
| articleInfo | 是    | object | 修改的信息   |

 **返回示例**

``` 
{
    "code": 200,
    "data": null,
    "msg": "操作成功"
}
```

 **备注** 

### A1获取文章详情

**简要描述：** 

- 获取文章详情

**请求URL：** 
- `/api/v1.0/article/getOneArticle/:articleId`

**请求方式：**

- GET

** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/article/getOneArticle/0c001bcd-5651-497b-8759-9ccb48a01e39
```

**参数：** 

| 参数名       | 必选   | 类型     | 说明     |
| :-------- | :--- | :----- | ------ |
| articleId | 是    | string | 获取目标Id |

 **返回示例**

``` 
{
    "code": 200,
    "data": {
        "abstract": "这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 ",
        "article_uuid": "0c001bcd-5651-497b-8759-9ccb48a01e39",
        "author": "Young",
        "content": "## 这里是标题测试 \n|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n这里是内容\n```javaScript\nconsole.log('这里是代码测试');\n```",
        "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvsKTeAQW6sAADAbPBzjhw868.jpg",
        "image_uuid": "3dd2d545-b87a-4bcf-b4f1-57de48b18fca",
        "pub_time": "2018-09-30 11:24",
        "second_tags": "flask",
        "tags": "Java",
        "title": "这里是标题测试 "
    },
    "msg": "操作成功"
}
```

 **备注** 

### A1获取全部文章

**简要描述：** 

- 获取全部文章

**请求URL：** 
- `/api/v1.0/article/getAllArticle`

**请求方式：**

- GET

 **返回示例**

``` 
{
    "code": 200,
    "data": {
        "articles": [
            {
                "abstract": "这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 ",
                "article_uuid": "0218f2ad-8ddc-485b-b3c1-8aea110ec551",
                "author": "Young",
                "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvsKTeAQW6sAADAbPBzjhw868.jpg",
                "image_uuid": "3dd2d545-b87a-4bcf-b4f1-57de48b18fca",
                "pub_time": "2018-11-20 21:53",
                "second_tags": "css",
                "tags": "Html",
                "title": "hello World"
            },
            {
                "abstract": "这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 这里是标题测试 ",
                "article_uuid": "95dbc6e8-cdb1-4fa3-8a6e-54cd7a3a0136",
                "author": "Young",
                "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvsKTeAQW6sAADAbPBzjhw868.jpg",
                "image_uuid": "3dd2d545-b87a-4bcf-b4f1-57de48b18fca",
                "pub_time": "2018-09-30 11:24",
                "second_tags": "flask",
                "tags": "Html",
                "title": "这里是标题测试 "
            }
        ],
        "total": 2
    },
    "msg": "操作成功"
}
```

 **备注** 

### 获取全部标签

**简要描述：** 

- 获取全部标签

**请求URL：** 
- `/api/v1.0/article/getAllTag`

**请求方式：**

- GET

 **返回示例**

``` 
{
    "code": 200,
    "data": {
        "tags": [
            "Html",
            "Java"
        ]
    },
    "msg": "操作成功"
}
```

 **备注** 

### 根据标签查询文章

**简要描述：** 

- 根据标签查询文章, data里面是子标签,子标签里面的是文章

**请求URL：** 
- `/api/v1.0/article/getArticleByTag?tag=value`

**请求方式：**

- GET


** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/article/getArticleByTag?tag=Html
```

**参数：** 

| 参数名   | 必选   | 类型     | 说明    |
| :---- | :--- | :----- | ----- |
| value | 是    | string | 查询的标签 |

 **返回示例**

``` 
{
    {
    "code": 200,
    "data": {
        "css": [
            {
                "id": "0218f2ad-8ddc-485b-b3c1-8aea110ec551",
                "title": "hello World"
            }
        ],
        "django": [
            {
                "id": "56a4d2f6-883a-473c-a260-86a9e4e9d3f3",
                "title": "这里是标题测试 "
            }
        ],
        "flask": [
            {
                "id": "38cbb5ab-d2b4-45f4-82f8-db2bd41e6226",
                "title": "这里是标题测试 "
            },
            {
                "id": "39c4c5d4-acef-43cf-be7e-cfc58deef7d1",
                "title": "这里是标题测试 "
            }
        ]
    },
    "msg": "操作成功"
}
}
```

 **备注** 

### 1删除文章 

**简要描述：** 

- 删除文章 

**请求URL：** 
- `/api/v1.0/article/deleteArticle/:articleId`
- //文章详情除了修改 还有删除按钮，点击删除，*-调接口删除文章

**请求方式：**

- DELETE


** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/article/deleteArticle/8a97640e-409e-4d84-9996-217dcea469dc
```

**参数：** 

| 参数名       | 必选   | 类型     | 说明       |
| :-------- | :--- | :----- | -------- |
| articleId | 是    | string | 要删除的文章Id |

 **返回示例**

``` 
{
    "code": 200,
    "data": null,
    "msg": "操作成功"
}
```

 **备注** 

## 图片管理

### 1添加图片

**简要描述：** 

- 添加图片

**请求URL：** 
- `/api/v1.0/image/addImage`

**请求方式：**

- POST 

** 请求示例 **

```
{
	"name":"haha.jpg",
	“fileUuid"："",
	"groupName":"group1",
	"remoteFileId":"group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
	"storageIp":"192.168.0.129",
	"size":49260,
	"imageUrl":"http://192.168.0.129/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg"
}
```

**参数：** 

| 参数名          | 必选   | 类型     | 说明    |
| :----------- | :--- | :----- | ----- |
| name         | 是    | string | 图片名称  |
| remoteFileId | 是    | string | 文件的Id |
| size         | 是    | int    | 文件大小  |
| imageUrl     | 是    | string | 图片地址  |


 **返回示例**

``` 
{
    "code": 200,
    "data": "36266520-f73a-4bf0-b563-1445ffb27291",
    "msg": "添加成功"
}
```
**参数：** 

| 参数名  | 必选   | 类型     | 说明      |
| :--- | :--- | :----- | ------- |
| data | 是    | string | 添加成功的Id |

 **备注** 

 ### 查询图片详情

**简要描述：** 

- 根据Id查询图片信息

**请求URL：** 
- `/api/v1.0/image/getOneImage/:imageId`

**请求方式：**

- GET

** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/image/getOneImage/22536476-9610-4c64-bc22-362a4ed2f487
```

**参数：** 

| 参数名     | 必选   | 类型     | 说明   |
| :------ | :--- | :----- | ---- |
| imageId | 是    | string | 图片Id |

 **返回示例**

``` 
{
    "code": 200,
    "data": {
        "create_time": "2018-11-15 10:21:21",
        "group_name": "group1",
        "image_name": "haha.jpg",
        "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
        "image_uuid": "22536476-9610-4c64-bc22-362a4ed2f487",
        "remote_file_id": "group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
        "size": 49260,
        "storage_ip": "192.168.0.129"
    },
    "msg": "操作成功"
}
```

 **备注** 

### 1查询全部图片

**简要描述：** 

- 查询全部图片

**请求URL：** 
- `/api/v1.0/image/getAllImage`

**请求方式：**

- GET

** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/image/getAllImage
```

**参数：** 

| 参数名     | 必选   | 类型     | 说明   |
| :------ | :--- | :----- | ---- |
| imageId | 是    | string | 图片Id |

 **返回示例**

``` 
{
    "code": 200,
    "data": {
        "images": [
            {
                "image_name": "haha.jpg",
                "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
                "image_uuid": "36266520-f73a-4bf0-b563-1445ffb27291",
                "remote_file_id": "group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
                "used_count": 0
            },
            {
                "image_name": "haha.jpg",
                "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
                "image_uuid": "22536476-9610-4c64-bc22-362a4ed2f487",
                "remote_file_id": "group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg",
                "used_count": 4
            },
            {
                "image_name": "haha.jpg",
                "image_url": "http://192.168.0.129/group1/M00/00/00/wKgAgVvsKTeAQW6sAADAbPBzjhw868.jpg",
                "image_uuid": "3dd2d545-b87a-4bcf-b4f1-57de48b18fca",
                "remote_file_id": "group1/M00/00/00/wKgAgVvsKTeAQW6sAADAbPBzjhw868.jpg",
                "used_count": 9
            }
        ],
        "total": 3
    },
    "msg": "操作成功"
}
```
**参数：** 

| 参数名   | 必选   | 类型   | 说明   |
| :---- | :--- | :--- | ---- |
| total | 是    | int  | 数据总量 |
 **备注** 

### 1删除图片

**简要描述：** 

- 删除图片

**请求URL：** 
- `/api/v1.0/image/deleteImage/:imageId`

**请求方式：**

- DELETE

** 请求示例 **
```
http://127.0.0.1:5000/api/v1.0/image/deleteImage/22536476-9610-4c64-bc22-362a4ed2f487
```

**参数：** 

| 参数名     | 必选   | 类型     | 说明   |
| :------ | :--- | :----- | ---- |
| imageId | 是    | string | 图片Id |

 **返回示例**

``` 
{
    "code": 200,
    "data": null,
    "msg": "操作成功"
}
```
 **备注** 