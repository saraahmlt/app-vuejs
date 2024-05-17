<script setup>
import {api} from '@/utils/apistock'

import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const formData = ref({
  email: '',
  password: ''
});
const errors = ref([]);

const login = async () => {
  try {
    const response = await axios.post(api.url+'v1/login', formData.value);
    if(response.data.data.user && response.data.data.token) {
      authStore.setUser(response.data.data.user,response.data.data.token);
      router.push('/');
    } else {
      errors.value = ["Error, please retry later !"];
    }
  } catch (err) {
    console.error('Error logging in:', err);
    errors.value = [err.message];
    if(err.response.data.message) errors.value = [err.response.data.message];
  }
};
</script>

<template>
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <form class="login-form" @submit.prevent="login">
          <div class="form-group mt-2">
            <label for="email">Email</label>
            <input v-model="formData.email" type="email" class="form-control dark-input" id="email" name="email" placeholder="Entrer email">
          </div>
          <div class="form-group mt-2">
            <label for="password">Password</label>
            <input v-model="formData.password" type="password" class="form-control dark-input" id="password" name="password" placeholder="Password">
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

          <div class="form-group mt-4 mx-auto d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-primary btn-block btn-lg">Login</button>
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
</style>

