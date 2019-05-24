<template>
  <div class="card">
    <div class="card__header">
      <h2 v-if="title" :title="title" class="card__title">
        {{ title }}
      </h2>
      <button v-if="closeable" @click="close()" class="card__close">
        <i class="fas fa-times"></i>
      </button>
    </div>
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
    },
    closeable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
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
  box-shadow: 2px 5px 30px rgba(#000, .3);
  max-height: 600px;
  height: 100%;
  width: 100%;
  max-width: 400px;

  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    font-weight: 900;
    color: #091e42;
    flex: 1;
  }

  &__close {
    background: transparent;
    border: none;
    color: rgba(#000, .3);
    cursor: pointer;
    transition: all .2s ease-in;
  }

  &__close:hover {
    color: rgba(#000, .8);
  }

  &__content {
    flex: 1;
    max-height: 100%;
  }

}
</style>
