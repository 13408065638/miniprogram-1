Page({
  data: {
    userInfo: null,
    userId: '',
    favoriteCount: 0
  },

  onLoad: function() {
    this.checkLoginStatus();
    this.updateFavoriteCount();
  },

  onShow: function() {
    // 每次显示页面时更新收藏数量
    this.updateFavoriteCount();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          userInfo: res.data,
          userId: this.generateUserId()
        });
      }
    });
  },

  // 处理登录
  handleLogin: function() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo;
        this.setData({
          userInfo,
          userId: this.generateUserId()
        });
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        });
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 生成用户ID
  generateUserId: function() {
    return 'USER_' + Math.random().toString(36).substr(2, 9).toUpperCase();
  },

  // 更新收藏数量
  updateFavoriteCount: function() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({
      favoriteCount: favorites.length
    });
  },

  // 清除缓存
  clearCache: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 保留用户信息，清除其他缓存
          const userInfo = wx.getStorageSync('userInfo');
          wx.clearStorage();
          if (userInfo) {
            wx.setStorage({
              key: 'userInfo',
              data: userInfo
            });
          }
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          });
          this.updateFavoriteCount();
        }
      }
    });
  }
}); 