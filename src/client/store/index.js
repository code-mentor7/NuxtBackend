
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
  async nuxtServerInit ({ commit }, { app, redirect, route, params, i18n }) {
    if (app.$auth.user) {
      await commit("SET_IS_DARK_THEME", app.$auth.user.dark_theme)
      await commit("SET_LOCALE_LANG", app.$auth.user.localeLang)
      await commit("i18n/I18N_SET_LOCALE", app.$auth.user.localeLang)
    }
    // let app = qweasd.app
    // let redirect = qweasd.redirect

    // if (app.$auth.user) {
    //   // if (route.fullPath.indexOf("en") === -1) return redirect("301", `/en${route.fullPath}`)
    //   console.log("### ", route.fullPath.indexOf(app.$auth.user.localeLang))
    //   if (route.fullPath.indexOf(app.$auth.user.localeLang) === -1) {
    //     return redirect("301", `/${app.$auth.user.localeLang}${route.path}`)
    //   }
    //   // if (app.$auth.user.localeLang)
    //   if (app.$auth.user.localeLang !== "en") {
    //     // redirect(app.switchLocalePath("zh"), { params })
    //     // redirect(app.locale("zh", { params }))
    //   }
    //   await commit("SET_IS_DARK_THEME", app.$auth.user.dark_theme)
    //   await commit("SET_LOCALE_LANG", app.$auth.user.localeLang)
    //   await commit("i18n/I18N_SET_LOCALE", app.$auth.user.localeLang)
    // }
    // else {
    //   if (route.fullPath.indexOf("en") === -1) return redirect("301", `/en${route.fullPath}`)
    // }
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
