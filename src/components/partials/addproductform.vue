<script setup>
import { api } from '@/utils/apistock'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useShopStore } from '@/stores/shop.js'

const router = useRouter()
const authStore = useAuthStore()
const shopStore = useShopStore()

authStore.initState()
if (!authStore.isAuthenticated) router.push('/')

let products = shopStore.getProducts()
const productData = ref({
  name: '',
  description: '',
  price: null,
  stock: null,
  categories: [],
  imagefile: null
})

const categories = ref(shopStore.getCategories());
const success = ref([])
const errors = ref([])

const createProduct = async () => {
  productData.value.price = parseFloat(productData.value.price).toFixed(2)
  try {
    const response = await axios.post(api.url + 'v1/products/', productData.value, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + authStore.token
      }
    })
    if (response.data.data) {
      products.push(response.data.data)
      shopStore.setProducts(products)
      success.value = ["Product created !"]
    } else {
      errors.value = ["Error, please retry later !"]
    }
  } catch (err) {
    console.error('Error update user :', err)
    errors.value = [err.message]
    if (err.response.data.errors) {
      errors.value = Object.values(err.response.data.errors).flatMap(errors => errors)
    }
  }
}

const onFileChange = (event) => {
  productData.value.imagefile = event.target.files[0]
}
</script>

<template>
  <div class="container">
    <!-- Form to create a product -->
    <div class="row">
      <div class="col-md-12">
        <form class="product-form" @submit.prevent="createProduct" enctype="multipart/form-data">
          <!-- Product Name -->
          <div class="form-group mt-2">
            <label for="productName">Nom du produit *</label>
            <input v-model="productData.name" type="text" class="form-control dark-input" id="productName" name="productName" placeholder="Entrer le nom du  product name" required>
          </div>
          <!-- Product Description -->
          <div class="form-group mt-2">
            <label for="productDescription">Description du produit *</label>
            <input v-model="productData.description" type="text" class="form-control dark-input" id="productDescription" name="productDescription" placeholder="Entrer la description du produit" required>
          </div>
          <!-- Product Stock -->
          <div class="form-group mt-2">
            <label for="productStock">Stock *</label>
            <input v-model.number="productData.stock" type="number" min="0" max="1000" class="form-control dark-input" id="productStock" name="productStock" placeholder="Entrer le stock du produit" required>
          </div>
          <!-- Product Price -->
          <div class="form-group mt-2">
            <label for="productPrice">Prix *</label>
            <input v-model.number="productData.price" type="number" min="0.05" max="1000" step="0.01" class="form-control dark-input" id="productPrice" name="productPrice" placeholder="Entrer le prix du produit" required>
          </div>
          <!-- Product Categories -->
          <div class="form-group mt-2">
            <label>Categories</label>
            <div class="categories__list">
              <div class="category__item" v-for="(category, index) in categories" :key="index">
                <label><input type="checkbox" :value="category.id" v-model="productData.categories"> {{ category.title }}</label>
              </div>
            </div>
          </div>
          <!-- Product Image -->
          <div class="form-group mt-2">
            <label for="productImage">Image *</label>
            <input type="file" @change="onFileChange($event)" class="form-control dark-input" id="productImage" name="productImage" accept="image/jpeg,image/png,image/jpg" required>
          </div>
          <!-- Display Errors -->
          <div v-if="errors.length > 0" class="errors">
            <ul class="no-marker-ul py-0 mt-4">
              <li v-for="error in errors">
                <div class="alert alert-danger p-2 mb-1" role="alert">
                  {{ error }}
                </div>
              </li>
            </ul>
          </div>
          <!-- Display Success Message -->
          <div v-if="success.length > 0" class="success">
            <ul class="no-marker-ul py-0 mt-4">
              <li v-for="successMess in success">
                <div class="alert alert-success p-2 mb-1" role="success">
                  {{ successMess }}
                </div>
              </li>
            </ul>
          </div>
          <!-- Submit Button -->
          <div class="form-group mt-4 mx-auto d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-primary btn-block btn-lg">Créer produit</button>
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
