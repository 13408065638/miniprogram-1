Page({
  data: {
    categories: [],
    currentCategory: {},
    products: [],
    page: 1,
    loading: false,
    noMore: false,
    selectedSize: '',
    selectedMaterial: '',
    selectedPrice: ''
  },

  onLoad: function(options) {
    // 如果从首页传入了分类ID，则直接加载对应分类
    const categoryId = options.id;
    this.loadCategories(categoryId);
  },

  // 加载分类列表
  loadCategories: function(defaultCategoryId) {
    const categories = [
      { id: 1, name: '轿车轮毂' },
      { id: 2, name: 'SUV轮毂' },
      { id: 3, name: '跑车轮毂' },
      { id: 4, name: '定制轮毂' },
      { id: 5, name: '改装轮毂' }
    ];
    
    this.setData({ 
      categories,
      currentCategory: categories.find(c => c.id == defaultCategoryId) || categories[0]
    });

    this.loadProducts();
  },

  // 切换分类
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    const currentCategory = this.data.categories.find(c => c.id === categoryId);
    
    this.setData({
      currentCategory,
      products: [],
      page: 1,
      noMore: false
    });

    this.loadProducts();
  },

  // 加载商品列表
  loadProducts: function() {
    if (this.data.loading || this.data.noMore) return;

    this.setData({ loading: true });

    // 模拟API请求
    setTimeout(() => {
      const newProducts = [
        {
          id: this.data.products.length + 1,
          name: '高性能铝合金轮毂',
          description: '适用于多种车型，轻量化设计',
          price: 1299 + Math.floor(Math.random() * 1000),
          imageUrl: '/assets/images/wheel1.jpg'
        },
        {
          id: this.data.products.length + 2,
          name: '定制锻造轮毂',
          description: '个性化定制，品质保证',
          price: 2499 + Math.floor(Math.random() * 1000),
          imageUrl: '/assets/images/wheel2.jpg'
        }
      ];

      this.setData({
        products: [...this.data.products, ...newProducts],
        page: this.data.page + 1,
        loading: false,
        noMore: this.data.page >= 4 // 模拟数据到底
      });
    }, 500);
  },

  // 显示尺寸筛选
  showSizeFilter: function() {
    wx.showActionSheet({
      itemList: ['全部', '17寸', '18寸', '19寸', '20寸'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.setData({ selectedSize: '' });
        } else {
          this.setData({ selectedSize: res.itemList[res.tapIndex] });
        }
        this.resetAndReload();
      }
    });
  },

  // 重置列表并重新加载
  resetAndReload: function() {
    this.setData({
      products: [],
      page: 1,
      noMore: false
    });
    this.loadProducts();
  },

  // 跳转到商品详情
  navigateToDetail: function(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${productId}`
    });
  },

  // 加载更多
  loadMore: function() {
    this.loadProducts();
  }
}); 