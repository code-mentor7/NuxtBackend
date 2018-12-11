import fs from "fs"
import Papa from "papaparse"

import * as COMMON from "../../common"
import { generateControllers } from "../../common/query"
import Hotels from "./model"

const bulkUpload = async (req, res) => {
  // var bulk = Hotels.collection.initializeUnorderedBulkOp()
  res.send("qweasd")
  console.log("### req.files,", req.files)

  // https://github.com/mholt/PapaParse/issues/397

  Papa.parse(fs.createReadStream(req.files.hotel_file[0].path), {
    header: true,
    // worker: true,
    fastMode: true,
    skipEmptyLines: true,
    chunk: (results, parser) => {
      // datas = datas.concat(results.data)
      let progress = results.meta.cursor
      console.log("### asd", results.data.length)

      // let newPercent = Math.round(progress / size * 100);
      // datas = datas.concat(results.data);

      // Meteor.call('insertHotelData', results.data);
      // if (newPercent === percent) return;
      // percent = newPercent;
      // this.uploadProgress = percent;
      // console.log("progress", progress, size);
      // console.log(newPercent, percent);
    },
    complete: () => {
      console.log("### complete")
      // this.uploadProgress = 100;

      // this.setupSnackbar({
      //     show: true,
      //     text: message,
      //     type: type
      // });
      // //  this.uploading = false;
      // this.loading = false;
    }
  })
}

export default generateControllers(Hotels, [], {
  bulkUpload: bulkUpload
})
