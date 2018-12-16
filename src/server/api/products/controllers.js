import * as COMMON from "../../common"
import { generateControllers } from "../../common/query"
import Products from "./models"

export default generateControllers(Products,
  COMMON.getSchemaKeys(Products, ["_id", "id", "created_at", "updated_at", "slug"])
)
