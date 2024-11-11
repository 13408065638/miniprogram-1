Page({
  data: {
    favorites: [],
    isEditMode: false,
    selectedItems: {},
    isAllSelected: false,
    selectedCount: 0
  },

  onLoad: function() {
    this.loadFavorites();
  },

  onShow: function() {
    this.loadFavorites();
  },

  // 加载收藏列表
  loadFavorites: function() {
    const favoriteIds = wx.getStorageSync('favorites') || [];
    // 模拟从本地存储获取商品详情
    const favorites = favoriteIds.map(id => ({
      id,
      name: '高性能铝合金轮毂 18寸',
      description: '采用优质铝合金材质，轻量化设计',
      price: 1299 + Math.floor(Math.random() * 1000),
      imageUrl: '/assets/images/wheel1.jpg'
    }));

    this.setData({
      favorites,
      isEditMode: false,
      selectedItems: {},
      isAllSelected: false,
      selectedCount: 0
    });
  },

  // 切换编辑模式
  toggleEditMode: function() {
    this.setData({
      isEditMode: !this.data.isEditMode,
      selectedItems: {},
      isAllSelected: false,
      selectedCount: 0
    });
  },

  // 切换选择状态
  toggleSelect: function(e) {
    const id = e.currentTarget.dataset.id;
    const selectedItems = { ...this.data.selectedItems };
    selectedItems[id] = !selectedItems[id];

    const selectedCount = Object.values(selectedItems).filter(v => v).length;
    const isAllSelected = selectedCount === this.data.favorites.length;

    this.setData({
      selectedItems,
      isAllSelected,
      selectedCount
    });
  },

  // 切换全选状态
  toggleSelectAll: function() {
    const isAllSelected = !this.data.isAllSelected;
    const selectedItems = {};
    
    if (isAllSelected) {
      this.data.favorites.forEach(item => {
        selectedItems[item.id] = true;
      });
    }

    this.setData({
      selectedItems,
      isAllSelected,
      selectedCount: isAllSelected ? this.data.favorites.length : 0
    });
  },

  // 删除选中项
  deleteSelected: function() {
    wx.showModal({
      title: '提示',
      content: '确定要删除选中的商品吗？',
      success: (res) => {
        if (res.confirm) {
          const selectedIds = Object.keys(this.data.selectedItems).filter(
            id => this.data.selectedItems[id]
          );
          
          // 更新本地存储
          const favorites = wx.getStorageSync('favorites') || [];
          const newFavorites = favorites.filter(id => !selectedIds.includes(id.toString()));
          wx.setStorageSync('favorites', newFavorites);

          // 刷新页面
          this.loadFavorites();

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 跳转到商品详情
  navigateToDetail: function(e) {
    if (!this.data.isEditMode) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    }
  }
}); 