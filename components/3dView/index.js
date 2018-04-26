/**
 * 路飞小程序组件
 * 示例：
 *    <three-d-view :urls="{{ ['https://...', '/iamges/01.png'] }}"></three-d-view>
 * 参数:
 * width      组件宽度
 * height     组件高度
 * urls       图片地址;可以用本地图片，也可以用远程图片
 * imageWidth 图片宽度
 * imageHeight 图片高度
 */
Component({
  /**
   * 对外属性
   */
  properties:{
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    urls: {
      type: Array,
      default: []
    },
    imageWidth:{
      type: Number,
      default: 0
    }, 
    imageHeight: {
      type: Number,
      default: 0
    }
  },
  /**
   * 布局之后
   */
  ready: function (e){
    this.calculate()

    if (this.data.urls.length > 0){
      this.setData({
        canvan: wx.createCanvasContext(this.data.id, this)
      });
      this.redraw()
    }else{
      console.error("[错误]：urls 参数必须填写！")
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      id: '3dView',
      canvan: null,
      touche: {},
      frame: 0,
      dx: 0,
      dy: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * canvas 错误
   */
    canvasErrorCallback: function (e) {
      console.error(e.detail.errMsg)
    },
    /**
     * 手指触摸动作开始
     */
    canvasBindtouchstart(e) {
      this.setData({
        touche: e.touches[0]
      })
    },
    /**
     * 手指触摸后移动
     */
    canvasBindtouchmove(e){
      var count = Math.floor(Math.abs((this.data.touche.x - e.touches[0].x) / 30))
      var frameIndex = Math.floor((this.data.touche.x - e.touches[0].x) / 30);  
      while (count > 0) { 
        count--; 
        if (frameIndex > 0) {
          frameIndex--;
          this.setData({
            frame: this.data.frame + 1
          })
        } else if (frameIndex < 0) {
          frameIndex++;
          this.setData({
            frame: this.data.frame - 1
          })
        }
        else if (frameIndex == 0) {
          break;
        }

        if (this.data.frame >= this.data.urls.length) {
          this.data.frame = 0;
        }
        if (this.data.frame < 0) {
          this.data.frame = this.data.urls.length - 1;
        }
        this.redraw();
      }
    },
    /**
     * 手指触摸动作结束
     */
    canvasBindtouchend(e){
      this.setData({
        touche: {}
      })
    },
    /**
     * 选择渲染的图片
     */
    redraw(){
      let path = this.data.urls[this.data.frame];
      this.data.canvan.clearRect(this.data.dx, this.data.dy, this.data.imageWidth, this.data.imageHeight)
      this.data.canvan.drawImage(path, this.data.dx, this.data.dy, this.data.imageWidth, this.data.imageHeight)
      this.data.canvan.draw()
    },
    /**
     * 计算宽高和padding
     */
    calculate(){
      let width = this.data.width || wx.getSystemInfoSync().windowWidth;
      let height = this.data.height || wx.getSystemInfoSync().windowHeight;
      if (width > wx.getSystemInfoSync().windowWidth){
        height = height * (wx.getSystemInfoSync().windowWidth / width)
        width = wx.getSystemInfoSync().windowWidth
      }
      
      if (height > wx.getSystemInfoSync().windowHeight) {
        width = width * (wx.getSystemInfoSync().windowHeight / height)
        height = wx.getSystemInfoSync().windowHeight
      }

      let iw = this.data.imageWidth || width
      let ih = this.data.imageHeight || height

      if (iw > width){
        ih = ih * (width / iw)
        iw = width
      }

      if(ih > height){
        iw = iw * (height / ih)
        ih = height
      }

      let dx = this.data.dx
      let dy = this.data.dy

      if (width > iw){
        dx = (width - iw) / 2
      }

      if (height > ih) {
        dy = (height - ih) / 2
      }

      this.setData({
        width,
        height,
        dx,
        dy,
        imageWidth: iw,
        imageHeight: ih
      })
    }
  },
  
})
