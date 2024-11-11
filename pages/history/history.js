Page({
  data: {
    history: [],
    groupedHistory: []
  },

  onLoad: function() {
    this.loadHistory();
  },

  onShow: function() {
    this.loadHistory();
  },

  // 加载浏览历史
  loadHistory: function() {
    const history = wx.getStorageSync('browsingHistory') || [];
    this.setData({ history });
    this.groupHistoryByDate();
  },

  // 按日期分组历史记录
  groupHistoryByDate: function() {
    const history = this.data.history;
    const groups = {};
    
    history.forEach(item => {
      const date = this.formatDate(item.timestamp);
      if (!groups[date]) {
        groups[date] = {
          date: date,
          products: []
        };
      }
      groups[date].products.push(item);
    });

    const groupedHistory = Object.values(groups);
    this.setData({ groupedHistory });
  },

  // 格式化日期
  formatDate: function(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today - 24*60*60*1000);

    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  },

  // 清空历史记录
  clearHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清空浏览记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('browsingHistory');
          this.setData({
            history: [],
            groupedHistory: []
          });
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 跳转到商品详情
  navigateToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
}); 