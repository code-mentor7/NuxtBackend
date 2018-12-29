import fs from "fs"
import Papa from "papaparse"

import * as COMMON from "../../common"
import { generateControllers } from "../../common/query"
import Hotels from "./model"

const bulkUpload = async (req, res) => {
  let bulkOp = Hotels.collection.initializeUnorderedBulkOp()
  res.send("done")
  let counter = 0
  // console.log("### reqwbody", req.body.data.length)
  // req.body.data.forEach(data => {
  //   bulkOp.find({ hotel_id: data.hotel_id }).upsert().updateOne(data)
  // })
  // bulkOp.execute(function (e, result) {
  //   console.log("### inside eachexec", e)
  //   console.log("### inside eachexec result", result)
  //   res.send("done")
  //   // do something with result
  // })

  // https://github.com/mholt/PapaParse/issues/397

  console.time("Full start")
  Papa.parse(fs.createReadStream(req.files.hotel_file[0].path), {
    header: true,
    // worker: true,
    // fastMode: true,
    quoteChar: "\"",
    escapeChar: "\"",
    skipEmptyLines: true,
    transformHeader: (h) => {
      return h
    },
    chunk: (results, parser) => {
      // console.log("### ", results.data.length)
      // console.log("### chunk")
      // if (!parser.paused()) {
      //   parser.pause()
      // }
      // setTimeout(function () {
      //   results = null
      //   if (parser.paused()) {
      //     parser.resume()
      //     console.log("### resume")
      //   }
      // }, Math.random() * 10000)
      results.data.forEach((data) => {
        // bulkOp.find({ hotel_name: data.hotel_name }).upsert().updateOne(data)
        Hotels.findOneAndUpdate({ hotel_name: data.hotel_name }, data, { upsert: true }, function () {})
        // counter++
        // if (counter % 500 === 0) {
        //   console.time("Time this")
        //   // if (!parser.paused()) {
        //   //   parser.pause()
        //   // }
        //   // console.log("### inside each", counter)
        //   // Execute per 1000 operations and re-initialize every 1000 update statements
        //   bulkOp.execute((e, result) => {
        //     // if (parser.paused()) {
        //     //   parser.resume()
        //     //   console.log("### resume")
        //     // }
        //     console.timeEnd("Time this")
        //     console.log("### inside eachexec", e)
        //     console.log("### inside eachexec result", result)
        //     // do something with result
        //   })
        //   bulkOp = Hotels.collection.initializeUnorderedBulkOp()
        // }
      })
    },
    complete: () => {
      // Clean up queues
      // if (counter % 500 !== 0) {
      //   bulkOp.execute(function (e, result) {
      //     // do something with result
      //   })
      // }
      COMMON.removeFile(req.files.hotel_file[0].path)
      console.log("### complete")
      console.timeEnd("Full start")
    }
  })
}

export default generateControllers(Hotels, [], {
  bulkUpload: bulkUpload
})
