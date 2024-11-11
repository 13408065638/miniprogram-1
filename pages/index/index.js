// index.js
Page({
  data: {
    banners: [],
    categories: [],
    recommendProducts: [],
    page: 1,
    loading: false,
    noMore: false
  },

  onLoad: function() {
    this.fetchBanners();
    this.fetchCategories();
    this.fetchRecommendProducts();
  },

  // 获取轮播图数据
  fetchBanners: function() {
    this.setData({
      banners: [
        { id: 1, imageUrl: '/assets/icons/tried1.jpg' },
        { id: 2, imageUrl: '/assets/icons/tried2.jpg' },
        { id: 3, imageUrl: '/assets/icons/tried3.jpg' }
      ]
    });
  },

  // 获取分类数据
  fetchCategories: function() {
    this.setData({
      categories: [
        { id: 1, name: '轿车', icon: '/assets/icons/car.png' },
        { id: 2, name: 'SUV', icon: '/assets/icons/suv.png' },
        { id: 3, name: '跑车', icon: '/assets/icons/sports.png' },
        { id: 4, name: '定制', icon: '/assets/icons/custom.png' },
        { id: 5, name: '轿车1', icon: '/assets/icons/car.png' },
        { id: 6, name: 'SUV1', icon: '/assets/icons/suv.png' },
        { id: 7, name: '跑车1', icon: '/assets/icons/sports.png' },
        { id: 8, name: '定制1', icon: '/assets/icons/custom.png' }
      ]
    });
  },

  // 获取推荐商品（修改为分页加载）
  fetchRecommendProducts: function() {
    if (this.data.loading || this.data.noMore) return;
    
    this.setData({ loading: true });

    // 模拟API请求
    setTimeout(() => {
      const newProducts = [
        {
          id: this.data.recommendProducts.length + 1,
          name: '铝合金运动轮毂 18寸',
          price: 1299 + Math.floor(Math.random() * 1000),
          imageUrl: '/tried.jpg'
        },
        {
          id: this.data.recommendProducts.length + 2,
          name: '锻造轮毂 19寸',
          price: 2499 + Math.floor(Math.random() * 1000),
          imageUrl: '/tried.jpg'
        },
        {
            id: this.data.recommendProducts.length + 1,
            name: '铝合金运动轮毂 17寸',
            price: 1299 + Math.floor(Math.random() * 1000),
            imageUrl: '/tried.jpg'
          },
          {
            id: this.data.recommendProducts.length + 2,
            name: '锻造轮毂 20寸',
            price: 2499 + Math.floor(Math.random() * 1000),
            imageUrl: '/tried.jpg'
          }
      ];

      this.setData({
        recommendProducts: [...this.data.recommendProducts, ...newProducts],
        page: this.data.page + 1,
        loading: false,
        noMore: this.data.page >= 4  // 模拟数据到底
      });
    }, 500);
  },

  // 监听滚动到底部
  onReachBottom: function() {
    this.fetchRecommendProducts();
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      recommendProducts: [],
      page: 1,
      loading: false,
      noMore: false
    });
    
    this.fetchBanners();
    this.fetchCategories();
    this.fetchRecommendProducts();
    
    wx.stopPullDownRefresh();
  },

  // 跳转到分类页
  navigateToCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${categoryId}`
    });
  },

  // 跳转到商品详情页
  navigateToDetail: function(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${productId}`
    });
  }
});
