import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Shopper from '@/models/Shopper'
import Receipt from '@/models/Receipt'
import ShopperReceipt from '@/models/ShopperReceipt'

Vue.use(Vuex)

const database = new VuexORM.Database()
database.register(Shopper)
database.register(Receipt)
database.register(ShopperReceipt)

export default new Vuex.Store({
  plugins: [VuexORM.install(database)]
})
