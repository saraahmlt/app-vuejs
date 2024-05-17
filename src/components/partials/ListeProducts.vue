<script setup>
import {api} from '@/utils/apistock'

import { useRouter } from 'vue-router';
const router = useRouter();

import {ref, onMounted, reactive} from 'vue';
import axios from 'axios';

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore();
if(!authStore.isAuthenticated) authStore.logout(router);

import { useShopStore } from '@/stores/shop'
const shopStore = useShopStore();
shopStore.initState();

const categories = ref(shopStore.categories);
let products = ref(shopStore.products);

onMounted(() => {
  if(!shopStore.products.length) fetchProducts();
});

let selectedCategories = reactive([]);
const filterProductsByCategories = (id) => {
  if(selectedCategories.includes(id)) {
    const index = selectedCategories.indexOf(id);
    if (index !== -1) selectedCategories.splice(index, 1);
  } else selectedCategories.push(id)

  products.value = products.value.map(prdct => {
    prdct.filterHideCat = false;
    if(!selectedCategories.length) return prdct;
    prdct.filterHideCat = true;

    prdct.categories.forEach(cat => {
      if(selectedCategories.includes(cat.id)) prdct.filterHideCat = false;
    })

    return prdct;
  });

  categories.value = categories.value.map(cat => {
    cat.catActive = false;
    if(!selectedCategories.length) return cat;
    if(selectedCategories.includes(cat.id)) cat.catActive = true;
    return cat;
  });
}

const searchQuery = ref('');
const filterProductsByName = () => {
  products.value.map(product => {
    product.filterHideName = !product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return product;
  });
}

const fetchProducts = () => {

    axios.get(api.url+'v1/products', {
      headers: {
        Authorization: 'Bearer '+authStore.token
      }
    })
      .then(response => {
        shopStore.setProducts(response.data);
        products.value = shopStore.getProducts();
      })
      .catch(error => {
        if(error.response.status === 401) authStore.logout(router);
        console.error('Error fetching products message:', error);
      });

    axios.get(api.url+'v1/categories', {
      headers: {
        Authorization: 'Bearer '+authStore.token
      }
    })
      .then(response => {
        shopStore.setCategories(response.data);
        categories.value = shopStore.getCategories();
        selectedCategories = [];
      })
      .catch(error => {
        if(error.response.status === 401) authStore.logout(router);
        console.error('Error fetching categories message:', error,);
      });
};

let updatedProducts = [];
let qtyChange = (type='plus',index,id) => {
  if(type === 'plus') {
    products.value[index].stock++;
  } else {
    if (products.value[index].stock > 0) {
      products.value[index].stock--;
    }
  }
  if(!updatedProducts.includes(id)) updatedProducts.push(id);

  notifs(true,true,false,false);

  debounce(function() {
    // console.log("Click debounced => updateProducts");
    updateProducts();
  }, 1000)
}
const updateProducts = () => {
  if(!updatedProducts.length) return;

  updatedProducts.forEach(id => {
    const prdct = products.value.filter(product => product.id === id)[0];
    if(!prdct) return;

    axios.put(api.url+'v1/products/'+id, {
      "name" : prdct.name,
      "description" : prdct.description,
      "price" : prdct.price,
      "stock" : prdct.stock,
    },{
      headers: {
        Authorization: 'Bearer '+authStore.token
      }
    })
        .then(response => {
          notifs(true,false,true,false);
          // console.log(response);
          setTimeout(() => {
            notifs(false,false,true,false);
          }, 2000);
          setTimeout(() => {
            notifs(false,false,false,false);
          }, 2500);
        })
        .catch(error => {
          notifs(true,false,false,true);
          console.error('Error fetching products message:', error);

          setTimeout(() => {
            notifs(false,false,false,true);
          }, 2000);
          setTimeout(() => {
            notifs(false,false,false,false);
          }, 2500);
        });
  })
}

// DEBOUNCE QTY CHANGES
let timer;
let debounce = (fn, wait) => {
  // console.log(fn, wait,timer);
  if(timer) {
    clearTimeout(timer);
  }
  const context = this;
  timer = setTimeout(()=>{
    fn.apply(context);
  }, wait);
}

let isActive = ref(false);
let isLoading = ref(false);
let isSuccess = ref(false);
let isError = ref(false);
const notifs = (active = false, loading = false, success = false, error = false) => {
  isActive.value = active;
  isLoading.value = loading;
  isSuccess.value = success;
  isError.value = error;
}

</script>

<template>
  <section class="notifications" :class="{ 'active': isActive,'loading': isLoading,'success': isSuccess,'error': isError, }">
    <div class="container">
      <div class="bullet loading" v-if="isLoading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement</span>
        </div>
      </div>
      <div class="bullet success" v-if="isSuccess"><box-icon name='check'></box-icon></div>
      <div class="bullet error" v-if="isError"><box-icon name='x'></box-icon></div>
    </div>
  </section>
  <section class="page__products">
    <div class="container">
      <div class="global__actions">
        <div class="row">
          <button class="col-3-mb-3-btn-btn-primary-update" @click="fetchProducts">Mettre à jour les produits<box-icon name='refresh' ></box-icon></button>
          <div class="col mb-3 input-group flex-nowrap">
            <input @input="filterProductsByName" v-model="searchQuery" class="form-control" type="text" name="search" value="" aria-label="Search product name" placeholder="Recherche un produit..." aria-describedby="addon-wrapping">
          </div>
        </div>
        <div class="categories">
          <div v-if="categories.length > 0">
            <ul class="row">
              <li class="" v-for="category in categories" :key="category.id">
                <button class="btn btn-primary" @click="filterProductsByCategories(category.id)"
                        :class="{ 'filter-active-cat': category.catActive }">{{ category.title }}</button>
              </li>
            </ul>
          </div>
          <div v-else>
            No categories available.
          </div>
        </div>
      </div>
      <div v-if="products.length > 0">
        <ul class="row">
          <li class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="(product, index) in products" :key="product.id"
              :class="{ 'filter-hide-name': product.filterHideName,'filter-hide-cat': product.filterHideCat,'stock-none': product.stock === 0,'stock-low': product.stock <= 10 }">
            <div class="card mb-3">
              <RouterLink class="card-edit" :to="'/edit-product/' + product.id"><box-icon name='pencil' type='solid' ></box-icon></RouterLink>
              <div class="card-img" :style="{ backgroundImage: 'url(http://127.0.0.1:8000/' + product.image + ')' }"></div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <div class="price-line">
                  <span class="price">{{ product.price }} €</span>
                </div>
                <div class="actions-line">
                  <button class="btn-btn-primary" @click="qtyChange('less', index, product.id)">-</button>
                  <span class="stock">{{ product.stock }}</span>
                  <button class="btn--btn-primary" @click="qtyChange('plus', index, product.id)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        No products available.
      </div>
    </div>
  </section>
</template>


<style scoped>

.notifications{
  position: fixed;
  z-index: 300;
  bottom: 0;
  transition: all ease 0.5s;
}
.notifications.active{
  bottom: 60px;
  transition: all ease 0.5s;
}
.notifications.loading .loading{
  opacity: 1;
  transition: all ease 0.5s;
}
.notifications.success .success{
  opacity: 1;
  transition: all ease 0.5s;
}
.notifications.error .error{
  opacity: 1;
  transition: all ease 0.5s;
}

.notifications .container{
  position: relative;
}
.notifications .spinner-border{
  width: 20px;
  height: 20px;
}
.notifications .bullet{
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 15px;
  height: 45px;
  width: 45px;
  border-radius: 5px;
  color: var(--vt-c-white-soft);
  fill: var(--vt-c-white-soft);
  background-color: var(--vt-c-indigo);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.5s;
}
.notifications .success{
  background-color: #black;
}
.notifications .error{
  background-color: black;
}

.page__products{
  margin-top: 40px;
}
.page__products ul{
  list-style-type: none;
  margin: 20px 0 0;
  width: 100%;
  padding: 0;
}
.global__actions .row{
  width: 100%;
  margin: 0;
}
.page__products .update{
  opacity: 0.65;
  position: relative;
  padding-right: 45px;
}
.page__products .update box-icon{
  fill: white;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.page__products .categories{

}
.page__products .categories ul{
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-start;
}
.page__products .categories li{
  width: auto;
  padding: 0;
  margin: 0 5px 5px 0;
}

button.filter-active-cat{
  font-weight: bold;
  background-color: #b4cfec;
  border-color: #b4cfec;
}

.filter-hide-cat,.filter-hide-name{
  display: none !important;
}

.stock-none{
  opacity: 0.5;
}


.page__products .categories button{
  margin: 0;
  padding: 5px;
  border-radius: 20px;
}

.card{
  position: relative;
}
.card .card-title{
  height: 48px;
  font-size: 16px;
}
.card .card-text{
  height: 55px;
  font-size: 12px;
}
.card-edit{
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  line-height: 35px;
  padding-top: 5px;
  padding-left: 6px;
  
  opacity: 0;
}
.card .card-edit{
  background-color: #b4cfec;
  opacity: 1;
  
}
.card-edit box-icon{
  
}
.card-img{
  width: 500px;
  height: 500px;
  /*background-size: cover;*/
  /*background-repeat: no-repeat;*/
  /*background-position: center center;*/
  background: center center/cover no-repeat;
  
}

.card .price{
  font-weight: bold;
  font-size: 16px;
}
.card .actions-line{
  padding-top: 15px;
  
  align-items: center;
  justify-content: space-between;
}
.card .stock{
  font-weight: bold;
  font-size: 16px;
}

.btn-btn-primary {
  background-color: red;
  border: none;
}

.btn--btn-primary {
  background-color: green;
  border: none;
}

.form-control {
  border-radius: 15px;
}

.card-mb-3 {
  border: 1px white solid;
  height: 600px;
  width: 503px;
  margin-top: 20px;
}

.col-3-mb-3-btn-btn-primary-update {
  border-radius: 10px;
}

</style>

