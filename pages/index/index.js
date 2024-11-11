// index.js
Page({
  data: {
    banners: [],
    categories: [],
    recommendProducts: []
  },

  onLoad: function() {
    this.fetchBanners();
    this.fetchCategories();
    this.fetchRecommendProducts();
  },

  // 获取轮播图数据
  fetchBanners: function() {
    // 模拟数据，实际开发需要对接后端API
    this.setData({
      banners: [
        { id: 1, imageUrl: '/assets/images/banner1.jpg' },
        { id: 2, imageUrl: '/assets/images/banner2.jpg' },
        { id: 3, imageUrl: '/assets/images/banner3.jpg' }
      ]
    });
  },

  // 获取分类数据
  fetchCategories: function() {
    this.setData({
      categories: [
        { id: 1, name: '轿车轮毂', icon: '/assets/icons/car.png' },
        { id: 2, name: 'SUV轮毂', icon: '/assets/icons/suv.png' },
        { id: 3, name: '跑车轮毂', icon: '/assets/icons/sports.png' },
        { id: 4, name: '定制轮毂', icon: '/assets/icons/custom.png' }
      ]
    });
  },

  // 获取推荐商品
  fetchRecommendProducts: function() {
    this.setData({
      recommendProducts: [
        {
          id: 1,
          name: '铝合金运动轮毂 18寸',
          price: 1299,
          imageUrl: '/assets/images/wheel1.jpg'
        },
        {
          id: 2,
          name: '锻造轮毂 19寸',
          price: 2499,
          imageUrl: '/assets/images/wheel2.jpg'
        }
      ]
    });
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
