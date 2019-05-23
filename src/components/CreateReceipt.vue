<template>
  <div class="create">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animation-exit">
    <Card v-if="!creating" class="create__waiting" key="waiting">
      <button  @click="start()" class="create__button">
        <i class="fas fa-plus"></i>
      </button>
    </Card>
    <Card class="create__creating" v-else :title="title" key="creating">
      <div class="create__form">
        <button @click="close()" class="create__close">
          <div class="fas fa-times"></div>
        </button>
        <span class="create__about">Select at least two shoppers you wish to create a shared receipt for.</span>
        <form action="#">
          <div class="create__shopper" v-for="shopper in shoppers" :key="shopper.id">
            <input :id="shopper.id" class="checkbox" :value="shopper.id" v-model="checkedShoppers" type="checkbox">
            <label :for="shopper.id">{{ shopper.name }}</label>
          </div>
        </form>
        <div class="create__actions">
          <button :disabled="!allow" class="button" @click="create()">Create</button>
        </div>
      </div>
    </Card>
    </transition>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Shopper from '@/models/Shopper'
import Receipt from '@/models/Receipt'

export default {
  name: 'create-receipt',
  components: {
    Card
  },
  data () {
    return {
      creating: false,
      checkedShoppers: []
    }
  },
  computed: {
    shoppers () {
      return Shopper.all()
    },
    title () {
      return (this.creating ? 'Create a shared receipt' : null)
    },
    allow () {
      return this.checkedShoppers.length > 1
    }
  },
  methods: {
    start () {
      this.creating = true
    },
    close () {
      this.creating = false,
      this.checkedShoppers = []
    },
    create () {
      const shoppers = this.checkedShoppers.map(id => {
        const shopper = Shopper.find(id)
        return {
          id: shopper.id,
          name: shopper.name
        }
      })

      Receipt.insert({
        data: {
          shoppers
        }
      })

      this.checkedShoppers = []
      this.creating = false
    }
  }
}
</script>

<style lang="scss">
.create {
  width: 400px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 16px;

  .card__content {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__waiting {
    font-size: 24px;
    background-color: rgba(#000, .2);
    box-shadow: inset 0 0 4px 0 rgba(#000, .2);
  }

  &__button {
    cursor: pointer;
    background: transparent;
    border: none;
    color: rgba(#fff, .2);
    width: 100%;
    height: 100%;
    transition: all .2s ease-in;
  }

  &__button:hover {
    color: rgba(#fff, .8);
  }

  &__waiting .card__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__form form {
    flex: 1;
    margin-top: 16px;
    max-height: 100%;
    overflow-y: auto;
  }

  &__about {
    line-height: 1.5;
  }

  &__shopper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(#000, .1);
  }

  &__shopper:last-child {
    border: none;
  }

  &__shopper label {
    padding: 16px 0;
  }

  &__actions {
    padding-top: 16px;
    border-top: 1px solid rgba(#000, .1);
  }

  .button {
    width: 100%;
    margin-bottom: 8px;
  }

  &__close {
    position: absolute;
    right: 0;
    top: -44px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: rgba(#000, 0.2);
    transition: all .1s ease-in;
  }

  &__close:hover {
    color: rgba(#000, .5);
  }
}
</style>
