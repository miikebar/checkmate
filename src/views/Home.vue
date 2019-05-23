<template>
  <div class="home">
    <Shoppers />
    <Receipts />
  </div>
</template>

<script>
import Receipts from '@/components/Receipts'
import Shoppers from '@/components/Shoppers'

export default {
  name: 'home',
  components: {
    Shoppers, Receipts
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 100px;
}
</style>
