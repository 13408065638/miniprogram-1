Page({
  data: {
    product: null,
    isFavorite: false,
    showInquiry: false,
    inquiryForm: {
      name: '',
      phone: '',
      message: ''
    },
    reviewTags: [
      { name: '全部', count: 125 },
      { name: '好评', count: 120 },
      { name: '中评', count: 3 },
      { name: '差评', count: 2 },
      { name: '有图', count: 35 },
    ],
    reviews: []
  },

  onLoad: function(options) {
    const productId = options.id;
    this.loadProductDetail(productId);
    this.checkFavoriteStatus(productId);
    this.loadReviews();
  },

  // 加载商品详情
  loadProductDetail: function(productId) {
    // 模拟API请求
    setTimeout(() => {
      const product = {
        id: productId,
        name: '高性能铝合金轮毂 18寸',
        price: 1299,
        description: '采用优质铝合金材质，轻量化设计，提升操控性能',
        images: [
          '/assets/images/wheel1.jpg',
          '/assets/images/wheel2.jpg',
          '/assets/images/wheel3.jpg'
        ],
        specifications: [
          { name: '尺寸', value: '18寸' },
          { name: '材质', value: '铝合金' },
          { name: '重量', value: '8.5kg' },
          { name: '适用车型', value: '通用' },
          { name: '颜色', value: '亮银色' },
          { name: '产地', value: '中国' }
        ],
        detail: '<div>详细的商品介绍...</div>'
      };

      this.setData({ product });
      // 添加到浏览历史
      this.addToHistory(product);
    }, 500);
  },

  // 检查收藏状态
  checkFavoriteStatus: function(productId) {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({
      isFavorite: favorites.includes(productId)
    });
  },

  // 切换收藏状态
  toggleFavorite: function() {
    const productId = this.data.product.id;
    let favorites = wx.getStorageSync('favorites') || [];
    
    if (this.data.isFavorite) {
      favorites = favorites.filter(id => id !== productId);
    } else {
      favorites.push(productId);
    }
    
    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorite: !this.data.isFavorite });
    
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  // 预览图片
  previewImage: function(e) {
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: this.data.product.images
    });
  },

  // 显示询价弹窗
  showInquiryPopup: function() {
    this.setData({ showInquiry: true });
  },

  // 隐藏询价弹窗
  hideInquiryPopup: function() {
    this.setData({ showInquiry: false });
  },

  // 提交询价
  submitInquiry: function() {
    const { name, phone, message } = this.data.inquiryForm;
    
    if (!name || !phone) {
      wx.showToast({
        title: '请填写姓名和电话',
        icon: 'none'
      });
      return;
    }

    // 模拟提交询价
    wx.showLoading({ title: '提交中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      this.setData({
        showInquiry: false,
        inquiryForm: { name: '', phone: '', message: '' }
      });
    }, 1000);
  },

  onShareAppMessage: function() {
    return {
      title: this.data.product.name,
      path: `/pages/detail/detail?id=${this.data.product.id}`
    };
  },

  // 在商品详情页的onLoad函数中添加
  addToHistory: function(product) {
    let history = wx.getStorageSync('browsingHistory') || [];
    
    // 删除已存在的相同商品
    history = history.filter(item => item.id !== product.id);
    
    // 添加新的浏览记录
    history.unshift({
      ...product,
      timestamp: new Date().getTime()
    });
    
    // 只保留最近50条记录
    history = history.slice(0, 50);
    
    wx.setStorageSync('browsingHistory', history);
  },

  // 加载评价
  loadReviews: function() {
    // 模拟加载评价数据
    setTimeout(() => {
      const reviews = [
        {
          id: 1,
          nickname: '用户123',
          avatar: '/assets/images/avatar.png',
          rating: 5,
          content: '轮毂质量非常好，安装后效果很棒，店家服务也很周到。',
          images: [
            '/assets/images/review1.jpg',
            '/assets/images/review2.jpg'
          ],
          time: '2024-01-15'
        },
        {
          id: 2,
          nickname: '张先生',
          avatar: '/assets/images/avatar.png',
          rating: 4,
          content: '整体不错，就是发货稍微有点慢。',
          images: [],
          time: '2024-01-14'
        }
      ];

      this.setData({ reviews });
    }, 500);
  },

  // 预览评价图片
  previewReviewImage: function(e) {
    const urls = e.currentTarget.dataset.urls;
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      urls,
      current
    });
  }
}); 