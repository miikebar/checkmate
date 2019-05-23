<template>
  <div class="card">
    <h2 v-if="title" :title="title" class="card__title">
      {{ title }}
    </h2>
    <div class="card__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 32px;
  color: #42526e;
  box-shadow: 2px 5px 30px rgba(0,0,0,0.1);
  max-height: 600px;
  height: 100%;
  width: 100%;
  max-width: 400px;

  &__title {
    font-weight: 900;
    color: #091e42;
  }

  &__content {
    flex: 1;
    max-height: 100%;
  }
}
</style>
