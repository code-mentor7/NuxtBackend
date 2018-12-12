
export const state = () => {
  return {
    product: {},
    products: [],
    productsCount: 0
  }
}

export const mutations = {
  SET_PRODUCT (state, value) {
    state.product = value
  },
  SET_PRODUCTS (state, value) {
    state.products = value
  },
  SET_PRODUCTS_COUNT (state, value) {
    state.productsCount = value
  }
}
export const actions = {
  setProduct ({ commit }, value) {
    commit("SET_PRODUCT", value)
  },
  setProducts ({ commit }, value) {
    commit("SET_PRODUCTS", value)
  },
  setProductsCount ({ commit }, value) {
    commit("SET_PRODUCTS_COUNT", value)
  }

}
