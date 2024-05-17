<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const welcomeMessage = ref('');

onMounted(() => {
  fetchWelcomeMessage();
});

const fetchWelcomeMessage = () => {
  axios.get('http://127.0.0.1:8000/api/v1/welcome')
      .then(response => {
        welcomeMessage.value = response.data.title;
      })
      .catch(error => {
        console.error('Error fetching welcome message:', error);
      });
};

defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="page__welcome_msg_area">
    <span class="page___welcome_in_msg">{{ icon }}</span>
    <div class="page___welcome_msg" v-html="welcomeMessage"></div>
  </section>
</template>

<style scoped>
.page___welcome_in_msg{
  display: block;
  text-align: center;
  padding: 40px 0 0;
  color: white;
  font-size: 40px;
}
.page___welcome_msg{
  text-align: center;
  padding: 20px 0 40px;
}
.page___welcome_msg >>> h2,
.page___welcome_msg >>> p,
.page___welcome_msg >>> li{
  padding: 0 0 20px;
}
</style>