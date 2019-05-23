<template>
  <Card class="shoppers" title="Shoppers">
    <form @submit.prevent="insert()" class="shoppers__form" action="#">
      <input class="shoppers__name" type="text" v-model="name" placeholder="Shopper name" required>
      <button class="button">
        <i class="fas fa-plus"></i>
      </button>
    </form>
    <div class="shoppers__list">
      <div class="shopper" v-for="shopper in shoppers" :key="shopper.id">
        {{ shopper.name }}
        <button @click="remove(shopper)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <h3 class="shoppers__total">
      Shopping total: {{ total.toFixed(2) }} PLN
    </h3>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import Receipt from '@/models/Receipt'
import Shopper from '@/models/Shopper'

export default {
  name: 'shoppers',
  data () {
    return {
      nextId: 1,
      name: null
    }
  },
  components: {
    Card
  },
  computed: {
    shoppers () {
      return Shopper.all()
    },
    receipts () {
      return Receipt.all()
    },
    total () {
      return this.receipts.reduce((total, receipt) => {
        return total + receipt.items.reduce((prev, curr) => {
          return prev + curr
        }, 0)
      }, 0)
    }
  },
  methods: {
    insert () {
      Receipt.insert({
        data: {
          shoppers: [
            {
              id: this.nextId++,
              name: this.name
            }
          ]
        }
      })

      this.name = null
    },
    remove (shopperToRemove) {
      const receipts = Receipt.query().with('shoppers').has('shoppers', '<', 3).get()

      receipts.forEach(receipt => {
        receipt.shoppers.forEach(shopper => {
          if (shopper.id === shopperToRemove.id) {
            Receipt.delete(receipt.id)
          }
        })
      })

      Shopper.delete(shopperToRemove.id)

    }
  }
}
</script>

<style lang="scss">
.shoppers {
  flex-shrink: 0;

  .card__content {
    display: flex;
    flex-direction: column;
  }

  &__form {
    display: flex;
  }

  &__name {
    flex: 1;
    margin-right: 8px;
  }

  &__list {
    flex: 1;
    margin-top: 16px;
    max-height: 100%;
    overflow-y: auto;
  }

  &__total {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 24px 0 16px 0;
    color: #091e42;
    font-weight: 900;
  }
}

.shopper {
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 16px;
  border-radius: 8px;

  &:last-child {
    margin-right: 0;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
