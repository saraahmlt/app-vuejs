<script setup>
import {api} from '@/utils/apistock'

import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const productId = route.params.id;

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.initState();
if(!authStore.isAuthenticated) router.push('/');

import { useShopStore } from '@/stores/shop.js';
const shopStore = useShopStore();
shopStore.initState();

let products = shopStore.getProducts();
const product = products.filter(prdct => {
  return Number(prdct.id) === Number(productId);
})[0];
if(!product) router.push('/');

const productData = ref({
  name: product.name,
  description: product.description,
  price: parseFloat(product.price).toFixed(2),
  stock: parseInt(product.stock),
  categories: product.categories.map(category => category.id),
  imagefile: null
});

const categories = ref(shopStore.getCategories());

const success = ref([]);
const errors = ref([]);

const editProduct = async () => {
  productData.value.price = parseFloat(productData.value.price).toFixed(2);
  try {
    const response = await axios.post(api.url+'v1/products/'+product.id+'?_method=put', productData.value,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer '+authStore.token
      }
    });
    if(response.data.data) {
      products = products.map(prdct => {
        if (prdct.id === product.id) {
          return response.data.data;
        }
        else return prdct;
      })
      shopStore.setProducts(products);
      success.value = ["Product updated !"];
    } else {
      errors.value = ["Error, please retry later !"];
    }
  } catch (err) {
    console.error('Error update user :', err);
    errors.value = [err.message];
    if(err.response.data.errors) {
      errors.value = Object.values(err.response.data.errors).flatMap(errors => errors);
    }
  }
};
const onFileChange = (event) => {
  productData.value.imagefile = event.target.files[0];
}

</script>

<template>
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <form class="product-form" @submit.prevent="editProduct" enctype="multipart/form-data">
          <div class="form-group mt-2">
            <label for="productName">Nom du produit *</label>
            <input v-model="productData.name" type="text" class="form-control dark-input" id="productName" name="productName" placeholder="Entrer le nom du produit" required>
          </div>

          <div class="form-group mt-2">
            <label for="productDescription">Description du produit *</label>
            <input v-model="productData.description" type="text" class="form-control dark-input" id="productDescription" name="productDescription" placeholder="Entrer la description du produit" required>
          </div>

           <div class="form-group mt-2">
            <label for="productStock">Stock *</label>
            <input v-model.number="productData.stock" type="number" min="0" max="1000" class="form-control dark-input" id="productStock" name="productStock" placeholder="Entrer le stock du produit" required>
          </div>

          <div class="form-group mt-2">
            <label for="productPrice">Prix *</label>
            <input v-model="productData.price" type="number" min="0.05" max="1000" step="0.01" class="form-control dark-input" id="productPrice" name="productPrice" placeholder="Entrer le prix du produit" required>
          </div>

          <div class="form-group mt-2">
            <label>Categories</label>
            <div class="categories__list">
              <div class="category__item" v-for="(category, index) in categories" :key="index">
                <label><input type="checkbox" :value="category.id" v-model="productData.categories"> {{ category.title }}</label>
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="productImage">Image *</label>
            <div class="file__img" v-if="product.image" :style="{ backgroundImage: 'url(http://127.0.0.1:8000/' + product.image + ')' }"></div>
            <input type="file" @change="onFileChange($event)" class="form-control dark-input" id="productImage" name="productImage" accept="image/jpeg,image/png,image/jpg">
          </div>

          <div v-if="errors.length > 0" class="errors">
            <ul class="no-marker-ul py-0 mt-4">
              <li v-for="error in errors">
                <div class="alert alert-danger p-2 mb-1" role="alert">
                  {{ error }}
                </div>
              </li>
            </ul>
          </div>

          <div v-if="success.length > 0" class="success">
            <ul class="no-marker-ul py-0 mt-4">
              <li v-for="successMess in success">
                <div class="alert alert-success p-2 mb-1" role="success">
                  {{ successMess }}
                </div>
              </li>
            </ul>
          </div>

          <div class="form-group mt-4 mx-auto d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-primary btn-block btn-lg">Modifier produit</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>






<style>
.error {
  color: red;
}

.file__img{
  border-radius: 10px;
  margin: 10px 0;
  display: block;
  width: 100%;
  height: 250px;
  background: center center/cover no-repeat;
  cursor: pointer;
}

.categories__list{
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.category__item{
  width: auto;
  padding: 0 10px 0 0;
}
.category__item input{
  width: auto;
}

</style>