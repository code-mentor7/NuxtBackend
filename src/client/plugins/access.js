export default function ({ app }) {
  console.log("### yoyoyoyoy")
  if (!app.$auth.loggedIn) {
    return
  }
  const username = app.$auth.user.username
}
