Page({
  data: {
    product: null,
    currentTag: '全部',
    reviewTags: [
      { name: '全部', count: 125 },
      { name: '好评', count: 120 },
      { name: '中评', count: 3 },
      { name: '差评', count: 2 },
      { name: '有图', count: 35 }
    ],
    ratingDistribution: [
      { label: '5星', percentage: 96 },
      { label: '4星', percentage: 2 },
      { label: '3星', percentage: 1 },
      { label: '2星', percentage: 0.5 },
      { label: '1星', percentage: 0.5 }
    ],
    reviews: [],
    page: 1,
    loading: false,
    noMore: false
  },

  onLoad: function(options) {
    const productId = options.id;
    this.loadProductInfo(productId);
    this.loadReviews();
  },

  // 加载商品基本信息
  loadProductInfo: function(productId) {
    // 模拟加载商品信息
    this.setData({
      product: {
        id: productId,
        name: '高性能铝合金轮毂 18寸',
        rating: 4.8
      }
    });
  },

  // 加载评价列表
  loadReviews: function() {
    if (this.data.loading || this.data.noMore) return;

    this.setData({ loading: true });

    // 模拟加载评价数据
    setTimeout(() => {
      const newReviews = [
        {
          id: this.data.reviews.length + 1,
          nickname: '用户' + Math.floor(Math.random() * 1000),
          avatar: '/assets/images/avatar.png',
          rating: 5,
          content: '轮毂质量非常好，安装后效果很棒，店家服务也很周到。',
          images: [
            '/assets/images/review1.jpg',
            '/assets/images/review2.jpg'
          ],
          time: '2024-01-15',
          reply: '感谢您的支持，欢迎下次再来！'
        },
        {
          id: this.data.reviews.length + 2,
          nickname: '张先生',
          avatar: '/assets/images/avatar.png',
          rating: 4,
          content: '整体不错，就是发货稍微有点慢。',
          images: [],
          time: '2024-01-14'
        }
      ];

      this.setData({
        reviews: [...this.data.reviews, ...newReviews],
        page: this.data.page + 1,
        loading: false,
        noMore: this.data.page >= 4 // 模拟数据到底
      });
    }, 1000);
  },

  // 切换标签
  switchTag: function(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      currentTag: tag,
      reviews: [],
      page: 1,
      noMore: false
    });
    this.loadReviews();
  },

  // 预览图片
  previewImage: function(e) {
    const urls = e.currentTarget.dataset.urls;
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      urls,
      current
    });
  },

  // 加载更多
  loadMore: function() {
    this.loadReviews();
  }
}); 