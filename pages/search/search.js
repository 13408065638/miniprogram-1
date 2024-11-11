Page({
  data: {
    keyword: '',
    searchHistory: [],
    hotSearches: ['18寸轮毂', '定制轮毂', '锻造轮毂', 'SUV轮毂', 'BBS轮毂', '改装轮毂'],
    products: []
  },

  onLoad: function() {
    this.loadSearchHistory();
  },

  // 加载搜索历史
  loadSearchHistory: function() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ searchHistory: history });
  },

  // 保存搜索历史
  saveSearchHistory: function(keyword) {
    let history = wx.getStorageSync('searchHistory') || [];
    // 删除已存在的相同关键词
    history = history.filter(item => item !== keyword);
    // 将新关键词添加到开头
    history.unshift(keyword);
    // 只保留最近10条
    history = history.slice(0, 10);
    wx.setStorageSync('searchHistory', history);
    this.setData({ searchHistory: history });
  },

  // 清空搜索历史
  clearHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory');
          this.setData({ searchHistory: [] });
        }
      }
    });
  },

  // 输入框输入
  onInput: function(e) {
    this.setData({
      keyword: e.detail.value
    });
    if (e.detail.value) {
      this.searchProducts(e.detail.value);
    } else {
      this.setData({ products: [] });
    }
  },

  // 清空关键词
  clearKeyword: function() {
    this.setData({
      keyword: '',
      products: []
    });
  },

  // 点击搜索
  onSearch: function(e) {
    const keyword = e.detail.value.trim();
    if (keyword) {
      this.saveSearchHistory(keyword);
      this.searchProducts(keyword);
    }
  },

  // 点击标签
  onTagClick: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.saveSearchHistory(keyword);
    this.searchProducts(keyword);
  },

  // 搜索商品
  searchProducts: function(keyword) {
    // 模拟搜索请求
    wx.showLoading({ title: '搜索中...' });
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: '高性能铝合金轮毂 18寸',
          description: '采用优质铝合金材质，轻量化设计',
          price: 1299,
          imageUrl: '/assets/images/wheel1.jpg'
        },
        {
          id: 2,
          name: '定制锻造轮毂 19寸',
          description: '个性化定制，品质保证',
          price: 2499,
          imageUrl: '/assets/images/wheel2.jpg'
        }
      ].filter(item => 
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase())
      );

      this.setData({ products });
      wx.hideLoading();
    }, 500);
  },

  // 跳转到商品详情
  navigateToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack();
  }
}); 