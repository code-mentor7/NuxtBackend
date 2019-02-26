
export const state = () => {
  return {
    productFormData: {}
  }
}

export const mutations = {
  SET_PRODUCT_FORM_DATA (state, value) {
    state.productFormData = value
  }

}
export const actions = {
  setProductFormData ({ commit }, value) {
    commit("SET_PRODUCT_FORM_DATA", value)
  }

}
