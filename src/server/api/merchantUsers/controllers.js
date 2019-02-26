import { generateControllers } from "../../common/query"
import MerchantUsers from "./models"

export default generateControllers(MerchantUsers, [
  "name", "contact_number", "password", "localeLang", "dark_theme", "roles"
])
