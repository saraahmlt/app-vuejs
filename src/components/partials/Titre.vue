<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="page__title_area">
    <div class="container">
      <h1 class="page__title">{{ msg }}</h1>
    </div>
  </section>
</template>

<style scoped>
.page__title_area{
  text-align: center;
}
.page__title{
  position: relative;
  text-align: center;
  font-weight: bold;
  color: #b4cfec;
  display: inline-block;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 30px;
}


</style>