export const index = {
  async get (req, res) {
    res.json("I am from server API.")
    // try {
    //   let users = await User.find({})
    //   if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
    //   res.json(users)
    // } catch (error) {
    //   res.handleServerError(error)
    // }
  }
}
