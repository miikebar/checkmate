<template>
  <transition-group
    enter-active-class="animated flipInY"
    leave-active-class="animation-exit"
    move-class="move"
    tag="div"
    class="receipts">
    <ReceiptCard v-for="receipt in receipts" :key="receipt.id" :receipt="receipt"/>
    <CreateReceipt class="delayed" v-if="showCreate" key="create" />
    <div class="receipts__spacer" key="spacer"></div>
  </transition-group>
</template>

<script>
import Shopper from '@/models/Shopper'
import Receipt from '@/models/Receipt'
import ReceiptCard from './ReceiptCard'
import CreateReceipt from './CreateReceipt'

export default {
  name: 'checks',
  components: {
    ReceiptCard, CreateReceipt
  },
  computed: {
    showCreate () {
      return Shopper.all().length > 1
    },
    receipts () {
      return Receipt.query().with('shoppers').all()
    }
  }
}
</script>

<style lang="scss">
.receipts {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .card {
    flex-shrink: 0;
    margin-left: 16px;
  }

  &__spacer {
    width: 16px;
    height: 1px;
    flex-shrink: 0;
  }
}

.move {
  transition: transform 1s;
}

.delayed {
  animation-delay: .5s;
}
</style>
