# mouser 

### author: 猿某人
### QQ: 1787750205

#### 介绍
鼠标特效库，简单几行代码就可实现华丽的鼠标拖尾特效

#### 菜单（改变drawType）
1. 躁动线条
2. 绚丽流星
3. 大数据专用
4. 街头涂鸦
5. 连线点阵
6. 萤火之光
7. 多彩烟花
8. 放大镜

#### 火候及调料
| 字段 | 默认值 | 说明 |
|:---:|:---:|:---|
| drawType | 1 | 特效选择<br>1 躁动线条<br>2 绚丽流星<br>3 大数据专用<br>4 街头涂鸦<br>5 连线点阵<br>6 萤火之光<br>7 多彩烟花<br>8 放大镜 |
| leaveAutoer | true | 鼠标移出后自动绘制(drawType为1时生效) |
| showTime | 20 | 绘制的线条显示的时间(drawType为1时生效) |
| maxWidth | 20 | 最大宽度(drawType为1时生效) |
| minWidth | 5 | 最小宽度(drawType为1时生效) |
| color | 2默认值#F8EC85<br>5默认值#A5FBFF | 星星的颜色(drawType为2和5时生效) |
| dotColor | #9CD9F9 | 点的颜色(drawType为3时生效) |
| lineColor | #9CD9F9 | 线的颜色(drawType为3时生效) |
| number | 8000 | 点的数量(drawType为5时生效) |
| colors | ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'] | 礼花颜色(drawType为7时生效) |
| multi | 1.5 | 放大倍率(drawType为8时生效) |
| multiDom | `document.getElementById('app')` | 需要放大的dom节点对象（暂不支持canvas或子节点包含canvas的节点） |
| border | null | 放大镜镜框(drawType为8时生效) |

#### 烹调方式
> npm方式

```js
npm i mouser-lqy -S
import 'mouser-lqy';
```
> git下载方式

```js
<script src="mouser/index.js" type="text/javascript" charset="utf-8"></script>
// 或者
import 'mouser/index.js';
```
> 配置并生成鼠标特效，以及实时更换鼠标特效功能

```js
let mouserModel = 1, mouser;
const mouseModels = {
    1: {
        title: '彩色线条',
        options: {
            leaveAutoer: false,
            showTime: 20,
            maxWidth: 12,
            minWidth: 4,
        }
    },
    2: {
        title: '金闪闪',
        options: {
            color: '#F8EC85',
        }
    },
    3: {
        title: '大数据',
        options: {
            dotColor: '#F22323',
            lineColor: '#F2EC23'
        }
    },
    4: {
        title: '街头涂鸦',
        options: {}
    },
    5: {
        title: '连线点阵',
        options: {
            color: '#FFF300',
            number: 10000
        }
    },
    6: {
        title: '萤火之光',
        options: {}
    },
    7: {
        title: '多彩烟花',
        options: {
            colors: ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
        }
    },
    8: {
        title: '放大镜',
        options: {
            multi: 1.5,
            multiDom: document.getElementById('body'),
            border: {
                width: 10,
                color: '#069'
            }
        }
    }
}
mouser = new Mouser({
    ...{
        drawType: mouserModel
    },
    ...mouseModels[mouserModel].options
});
function changeMouser(type) {
    mouserModel = type;
    document.title = `Canvas绘制鼠标${mouseModels[mouserModel].title}特效`;
    mouser.changeModel({
        ...{
            drawType: mouserModel
        },
        ...mouseModels[mouserModel].options
    });
}
```

#### 效果
!['躁动线条'](https://www.ymrlqy.top/work/mdStatic/mouser/1.jpg '躁动线条')
!['绚丽流星'](https://www.ymrlqy.top/work/mdStatic/mouser/2.jpg '绚丽流星')
!['大数据专用'](https://www.ymrlqy.top/work/mdStatic/mouser/3.jpg '大数据专用')
!['街头涂鸦'](https://www.ymrlqy.top/work/mdStatic/mouser/4.jpg '街头涂鸦')
!['连线点阵'](https://www.ymrlqy.top/work/mdStatic/mouser/5.jpg '连线点阵')
!['萤火之光'](https://www.ymrlqy.top/work/mdStatic/mouser/6.jpg '萤火之光')
!['多彩烟花'](https://www.ymrlqy.top/work/mdStatic/mouser/7.jpg '多彩烟花')
!['放大镜'](https://www.ymrlqy.top/work/mdStatic/mouser/8.jpg '放大镜')
