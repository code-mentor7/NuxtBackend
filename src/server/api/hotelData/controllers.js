import fs from "fs"
import Papa from "papaparse"

import * as COMMON from "../../common"
import { generateControllers } from "../../common/query"
import Hotels from "./model"

const bulkUpload = async (req, res) => {
  let bulkOp = Hotels.collection.initializeUnorderedBulkOp()
  res.send("qweasd")
  let counter = 0

  // https://github.com/mholt/PapaParse/issues/397

  Papa.parse(fs.createReadStream(req.files.hotel_file[0].path), {
    header: true,
    // worker: true,
    fastMode: true,
    skipEmptyLines: true,
    chunk: (results, parser) => {
      results.data.forEach((data) => {
        bulkOp.find({ hotel_id: data.hotel_id }).upsert().updateOne(data)
        counter++
        console.log("### data.hotel_id", data.hotel_id)
        if (counter % 5000 === 0) {
          console.log("### inside each", counter)
          // Execute per 1000 operations and re-initialize every 1000 update statements
          bulkOp.execute(function (e, result) {
            console.log("### inside eachexec", e)
            console.log("### inside eachexec result", result)
            // do something with result
          })
          bulkOp = Hotels.collection.initializeUnorderedBulkOp()
        }
      })
    },
    complete: () => {
      // Clean up queues
      if (counter % 5000 !== 0) {
        bulkOp.execute(function (e, result) {
          // do something with result
        })
      }
      console.log("### complete", counter)
    }
  })
}

export default generateControllers(Hotels, [], {
  bulkUpload: bulkUpload
})
