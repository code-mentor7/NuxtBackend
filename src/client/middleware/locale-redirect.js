export default function ({ params, route, redirect, app }) {
  // hypothetical set of all supported locales
  const otherLocales = ["zh"]

  // const findLocale = locales.find((locale) => {
  //   return route.fullPath.indexOf(locale) !== -1
  // })
  // if (!findLocale) {
  //   // redirect to the same path with default locale as prefix
  //   return redirect("301", `/en${route.fullPath}`)
  // }
  if (app.$auth.user) {
    if (route.fullPath.indexOf(app.$auth.user.localeLang) === -1 && app.$auth.user.localeLang !== "en") {
      const noLocalePath = route.fullPath.substring(3)
      return redirect(`/${app.$auth.user.localeLang}${noLocalePath}`)
    }
  }
}
