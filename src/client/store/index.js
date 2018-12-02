
export const state = () => {
  return {
    inactive: false,
    isDarkTheme: true,
    isFullPageLoading: false,
    isSnackbar: false,
    localeLang: { value: "en", name: "English", code: "en" },
    resetPasswordStatus: false,
    showSideBar: false,
    snackBarText: "",
    snackBarType: "info",
    verificationMessage: ""
  }
}

export const mutations = {
  SET_FULL_PAGE_LOADING (state, value) {
    state.isFullPageLoading = value
  },
  SET_INACTIVE (state, value) {
    state.inactive = value
  },
  SET_IS_DARK_THEME (state, value) {
    state.isDarkTheme = value
  },
  SET_LOCALE_LANG (state, value) {
    state.localeLang = value
  },
  SET_RESET_PASSWORD_STATUS (state, value) {
    state.resetPasswordStatus = value
  },
  SET_SNACKBAR (state, value) {
    state.isSnackbar = value
  },
  SET_SNACKBAR_TEXT (state, value) {
    state.snackBarText = value
  },
  SET_SNACKBAR_TYPE (state, value) {
    state.snackBarType = value
  },
  SET_VERIFICATION_MESSAGE (state, value) {
    state.verificationMessage = value
  },
  SHOW_SIDE_BAR (state, value) {
    state.showSideBar = value
  }
}
export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // commit('SET_IP', ip)
    // let promiseArr = [
    //   app.$axios.$get("/api/landing-page"),
    //   app.$axios.$get("/api/site-identity")
    // ]
    // await Promise.all(promiseArr)
    //   .then(async (promiseResultArray) => {
    //     await commit("api/SET_LANDING_PAGE", promiseResultArray[0][0])
    //     await commit("api/SET_SITE_IDENTITY", promiseResultArray[1][0])
    //   })
  },
  showSideBar ({ commit }, value) {
    commit("SHOW_SIDE_BAR", value)
  },
  setInactive ({ commit }, value) {
    commit("SET_INACTIVE", value)
  },
  setFullPageLoading ({ commit }, value) {
    commit("SET_FULL_PAGE_LOADING", value)
  },
  setLocaleLang ({ commit }, value) {
    commit("SET_LOCALE_LANG", value)
  },
  setResetPasswordStatus ({ commit }, value) {
    commit("SET_RESET_PASSWORD_STATUS", value)
  },
  setSnackbar ({ commit }, value) {
    commit("SET_SNACKBAR", value)
  },
  setIsDarkTheme ({ commit }, value) {
    commit("SET_IS_DARK_THEME", value)
  },
  setVerificationMessage ({ commit }, value) {
    commit("SET_VERIFICATION_MESSAGE", value)
  },
  setupSnackbar ({ commit }, { show, text, type }) {
    commit("SET_SNACKBAR_TEXT", text)
    commit("SET_SNACKBAR_TYPE", type)
    commit("SET_SNACKBAR", show)
  }

}
