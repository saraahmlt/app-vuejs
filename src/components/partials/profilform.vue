<script setup>
import {api} from '@/utils/apistock'

import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.initState();

const formData = ref({
  name: authStore.user.name,
  email: authStore.user.email,
  password: '',
  password_confirmation: '',
});
const success = ref([]);
const errors = ref([]);

const updateUser = async () => {
  try {
    const response = await axios.put(api.url+'v1/users/'+authStore.user.id, formData.value,{
      headers: {
        Authorization: 'Bearer '+authStore.token
      }
    });

    if(response.data.data) {
      authStore.setUser(response.data.data,authStore.token);
      success.value = ["User updated !"];
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
</script>

<template>
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <form class="login-form" @submit.prevent="updateUser">
          <div class="form-group mt-2">
            <label for="email">Email</label>
            <input v-model="formData.email" type="email" class="form-control dark-input" id="email" name="email" placeholder="Entrer email">
          </div>

          <div class="form-group mt-2">
            <label for="password">Name</label>
            <input v-model="formData.name" type="text" class="form-control dark-input" id="name" name="name" placeholder="Ton nom">
          </div>

          <div class="form-group mt-4">
            <p>Confirmez votre profil pour le mettre à jour</p>
          </div>

          <div class="form-group mt-1">
            <label for="password">Password</label>
            <input v-model="formData.password" type="password" class="form-control dark-input" id="password" name="password" placeholder="Password">
          </div>
          <div class="form-group mt-2 mb-4">
            <label for="password">Password Confirmation</label>
            <input v-model="formData.password_confirmation" type="password" class="form-control dark-input" id="password_confirmation" name="password_confirmation" placeholder="Confirmer password">
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
            <button type="submit" class="btn btn-primary btn-block btn-lg">Mettre à jour</button>
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