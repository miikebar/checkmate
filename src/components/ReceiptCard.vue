<template>
  <Card class="receipt" :title="title" :closeable="isShared" @close="deleteReceipt()">
    <form @submit.prevent="insert()" class="receipt__form" action="#">
      <input class="receipt__cash" min="0" step="0.01" type="number" v-model="cash" placeholder="Cash amount" required>
      <button class="button">
        <i class="fas fa-plus"></i>
      </button>
    </form>
    <div class="receipt__items">
      <div class="receipt__item" v-if="!isShared && shared !== 0">
        <button class="receipt__shared" disabled>
          <i class="fas fa-plus"></i>
        </button>
        <span>
          {{ shared.toFixed(2) }} from {{ sharedCount }} shared reciepts
        </span>
      </div>
      <div class="receipt__item" v-for="(item, index) in receipt.items" :key="index">
        <button @click="remove(index)" class="receipt__remove">
          <i class="fas fa-times"></i>
        </button>
        <span>
          {{ item.toFixed(2) }}
        </span>
      </div>
    </div>
    <h3 class="receipt__total">
      Total: {{ total.toFixed(2) }} PLN
    </h3>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import Shopper from '@/models/Shopper'
import Receipt from '@/models/Receipt'
import { mapActions } from 'vuex'

export default {
  name: 'receipt-card',
  components: {
    Card
  },
  props: {
    receipt: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cash: null
    }
  },
  computed: {
    title () {
      return this.receipt.shoppers.map(shopper => shopper.name).join(', ')
    },
    isShared () {
      return this.receipt.shoppers.length > 1
    },
    ownerId () {
      return this.receipt.shoppers[0].id
    },
    sharedCount () {
      const shopper = Shopper.query().with('receipts').where('id', this.receipt.shoppers[0].id).get();
      return shopper[0].receipts.length - 1
    },
    shared () {
      let shared = 0
      const receipts = Receipt.query().with('shoppers').has('shoppers', '>', 1).get()

      for (let receipt of receipts) {
        for (let shopper of receipt.shoppers) {
          if (shopper.id === this.ownerId) {
            shared += receipt.shared()
          }
        }
      }

      return shared
    },
    total () {
      return (this.isShared ? this.receipt.total() : this.receipt.total() + this.shared)
    }
  },
  methods: {
    ...mapActions([
      'addCashToReceipt',
      'removeCashFromReceipt',
      'removeReceipt'
    ]),

    insert () {
      this.addCashToReceipt({
        cash: this.cash,
        receipt: this.receipt
      })

      this.cash = null
    },

    remove (index) {
      this.removeCashFromReceipt({
        cashIndex: index,
        receipt: this.receipt
      })
    },

    deleteReceipt () {
      console.log('DELET DIS')
      this.removeReceipt({
        id: this.receipt.id
      })
    }
  }
}
</script>

<style lang="scss">
.receipt {

  &__shared {
    font-weight: 400;
    font-size: 12px;
    color: rgba(#000, .8);
  }

  .card__content {
    display: flex;
    flex-direction: column;
  }

  .card__title {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
  }

  &__form {
    display: flex;
  }

  &__cash {
    flex: 1;
    margin-right: 8px;
  }

  .button {
    background: #091e42;
  }

  &__items {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    max-height: 100%;
    overflow-y: auto;
  }

  &__item {
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__item:last-child {
    border: none;
  }

  &__total {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 24px 0 16px 0;
    color: #091e42;
    font-weight: 900;
  }

  &__remove, &__shared {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  &__shared {
    font-size: 13px;
  }
}
</style>
