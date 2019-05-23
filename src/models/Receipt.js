import { Model } from '@vuex-orm/core'
import Shopper from './Shopper'
import ShopperReceipt from './ShopperReceipt'

export default class Receipt extends Model {
  static entity = 'receipts'

  static fields () {
    return {
      id: this.increment(),
      items: this.attr([]),
      shoppers: this.belongsToMany(Shopper, ShopperReceipt, 'receipt_id', 'shopper_id')
    }
  }

  total () {
    return this.items.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  }

  shared () {
    return this.total() / this.shoppers.length
  }
}
