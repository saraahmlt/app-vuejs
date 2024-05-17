
import { defineStore } from 'pinia';

export const useShopStore = defineStore({
  id: 'shop',
  state: () => ({
    products: [],
    categories: [],
    orders: [],
  }),
  actions: {
    setProducts(products) {
      this.products = products;
      this.removeDeletedProducts(products);
    },
    removeDeletedProducts(newProducts) {
      const existingProductIds = this.products.map(product => product.id);
      this.products = this.products.filter(product => newProducts.some(newProduct => newProduct.id === product.id));
      const removedProducts = this.products.filter(product => !existingProductIds.includes(product.id));
      removedProducts.forEach(removedProduct => {
        const index = this.orders.findIndex(order => order.productId === removedProduct.id);
        if (index !== -1) {
          this.orders.splice(index, 1);
        }
      });
      this.persistState();
    },
    getProducts() {
      return this.products;
    },
    setCategoriesFromProducts(products) {
      const categoriesTitles = products.reduce((acc, product) => {
        product.categories.forEach(category => {
          if (!acc.includes(category.title)) {
            acc.push(category.title);
            this.categories.push(category);
          }
        });
        return acc;
      }, []);
      this.persistState();
    },
    setCategories(categories) {
      this.categories = categories;
    },
    getCategories() {
      return this.categories;
    },
    setOrders(orders) {
      this.orders = orders;
      this.persistState();
    },
    getOrders(orders) {
       return this.orders;
    },
    empty() {
      this.products = [];
      this.categories = [];
      this.orders = [];
      this.persistState();
    },
    persistState() {
      localStorage.setItem('shopStore', JSON.stringify(this.$state));
    },
    initState() {
      const savedState = localStorage.getItem('shopStore');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(this.$state, parsedState);
      }
    },
  },
  created() {
    this.initState();
  },
});
