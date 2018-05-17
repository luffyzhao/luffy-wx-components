// components/wxml3dView/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    urls: {
      type: Array,
      default: []
    },
    imageWidth: {
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
  ready: function (e) {
    this.calculate()
  },

  /**
   * 组件的初始数据
   */
  data: {
    touche: {},
    frame: 0,
    dx: 0,
    dy: 0,
    oldTouche:{
      pageX: 0
    }
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
    viewBindtouchstart(e) {
      this.setData({
        touche: e.touches[0]
      })

      this.setData({
        oldTouche: e.touches[0]
      })
    },
    /**
     * 手指触摸后移动
     */
    viewBindtouchmove(e) {

      var count = Math.ceil(Math.abs((this.data.touche.pageX - e.touches[0].pageX) / 72))
      var frameIndex = Math.floor((this.data.oldTouche.pageX - e.touches[0].pageX));
      
      while (count > 0) {
        count--;
        if (frameIndex >= 0) {
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

        this.setData({
          oldTouche: e.touches[0]
        })
      }
    },
    /**
     * 手指触摸动作结束
     */
    viewBindtouchend(e) {
      this.setData({
        touche: {}
      })
    },
    /**
     * 计算宽高和padding
     */
    calculate() {
      let width = this.data.width || wx.getSystemInfoSync().windowWidth;
      let height = this.data.height || wx.getSystemInfoSync().windowHeight;
      if (width > wx.getSystemInfoSync().windowWidth) {
        height = height * (wx.getSystemInfoSync().windowWidth / width)
        width = wx.getSystemInfoSync().windowWidth
      }

      if (height > wx.getSystemInfoSync().windowHeight) {
        width = width * (wx.getSystemInfoSync().windowHeight / height)
        height = wx.getSystemInfoSync().windowHeight
      }

      let iw = this.data.imageWidth || width
      let ih = this.data.imageHeight || height

      if (iw > width) {
        ih = ih * (width / iw)
        iw = width
      }

      if (ih > height) {
        iw = iw * (height / ih)
        ih = height
      }

      let dx = this.data.dx
      let dy = this.data.dy

      if (width > iw) {
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
