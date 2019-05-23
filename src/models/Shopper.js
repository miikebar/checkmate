import { Model } from '@vuex-orm/core'
import Receipt from './Receipt'
import ShopperReceipt from './ShopperReceipt'

export default class Shopper extends Model {
  static entity = 'shoppers'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(),
      receipts: this.belongsToMany(Receipt, ShopperReceipt, 'shopper_id', 'receipt_id')
    }
  }
}
