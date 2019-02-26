export default function ({ app }) {
  if (!app.$auth.loggedIn) {
    return
  }
  const username = app.$auth.user.username
}
