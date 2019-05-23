import { Model } from '@vuex-orm/core'

export default class ShopperReceipt extends Model {
  static entity = 'shopperReceipt'
  static primaryKey = ['shopper_id', 'receipt_id']

  static fields () {
    return {
      shopper_id: this.attr(null),
      receipt_id: this.attr(null)
    }
  }
}
