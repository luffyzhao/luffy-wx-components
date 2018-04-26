### Luffy Zhao 小程序组件集合

##### Canvas实现3D全景图

> 首先准备实物拍照, 角度按一定的间隔。间隔越小图片越多，dome里的例子就是用的 7.2 度。所以有 50 张图片，图片越多越平滑但加载会慢

##### 示例：
```
<three-d-view :urls="{{ ['https://...', '/iamges/01.png'] }}"></three-d-view>
# 参数:
# width      组件宽度
# height     组件高度
# urls       图片地址;可以用本地图片，也可以用远程图片
# imageWidth 图片宽度
# imageHeight 图片高度
```
