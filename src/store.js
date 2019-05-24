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
  plugins: [VuexORM.install(database)],

  state: {
    nextShopperId: 1,
    nextReceiptId: 1
  },

  mutations: {
    INCREMENT_SHOPPER_ID (state) {
      state.nextShopperId++
    },
    INCREMENT_RECEIPT_ID (state) {
      state.nextReceiptId++
    }
  },

  actions: {
    createShopper ({ commit, getters }, name) {
      Receipt.insert({
        data: {
          shoppers: [
            {
              id: getters.nextShopperId,
              name
            }
          ]
        }
      })

      commit('INCREMENT_SHOPPER_ID')
      commit('INCREMENT_RECEIPT_ID')
    },

    removeShopper ({ }, id) {
      const receipts = Receipt.query().with('shoppers').has('shoppers', '<', 3).get()

      receipts.forEach(receipt => {
        receipt.shoppers.forEach(shopper => {
          if (shopper.id === id) {
            Receipt.delete(receipt.id)
          }
        })
      })

      Shopper.delete(id)
    },

    createReceipt ({ commit, getters }, shopperIds) {
      const shoppers = shopperIds.map(id => {
        const shopper = Shopper.find(id)
        return {
          id: shopper.id,
          name: shopper.name
        }
      })

      Receipt.insert({
        id: getters.nextReceiptId,
        data: {
          shoppers
        }
      })

      commit('INCREMENT_RECEIPT_ID')
    },

    removeReceipt ({}, { id }) {
      Receipt.delete(id)
    },

    addCashToReceipt ({}, { receipt, cash }) {
      Receipt.update({
        where: receipt.id,
        data: {
          items: [...receipt.items, parseFloat(cash)]
        }
      })
    },

    removeCashFromReceipt({}, { receipt, cashIndex }) {
      const newItems =
        receipt.items.slice(0, cashIndex).concat(receipt.items.slice(cashIndex + 1, receipt.items.length))

      Receipt.update({
        where: receipt.id,
        data: {
          items: newItems
        }
      })
    }

  },

  getters: {
    nextShopperId (state) {
      return state.nextShopperId
    },
    nextReceiptId (state) {
      return state.nextReceiptId
    }
  }


})
