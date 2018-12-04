import jwt from "jsonwebtoken"
import { omit as _omit } from "lodash"
import nodemailer from "nodemailer"

export const generateEmailHTMLButtonTemplate = (urlWithoutHash, title, shortBodyDescription, buttonText) => {
  let html = `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><!DOCTYPE html><html><head> <meta http-equiv='content-type' content='text/html; charset=utf-8'/> <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'> <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'> <link rel='stylesheet' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <style>.btn-primary{color: #fff; background-color: #ff7300; border-color: #ff7300; text-align: center;}.btn-primary:hover{background-color: #e56700; border-color: #e56700;}@media(min-width:451px){.image{height: 50px;}}@media(max-width:450px){.image{height: 45px;}}.padding-0{padding: 0;}</style></head><body style='font-family: sans-serif;color:#000000'> <div id='page-container'> <div id='page-content-wrapper'> <div class='page-content'> <div class='col-md-12'> <div class='col-md-3'></div><div class='col-md-5' style='padding: 20px; '> <div class='col-md-12' style='padding:20px; text-align:center'> <img height="80" width="80" src='http://res.cloudinary.com/travel96/image/upload/v1539622591/logo_kblyjz.png' class='image'/> </div><div class='col-md-12' style='padding:20px; text-align:center'> <h3 style='margin-bottom: 30px; margin-top: 0; border-bottom: 1px solid; font-weight: bold; font-family: sans-serif; padding-bottom: 20px;'>${title}</h3> <div style='text-align:center;'> <p>${shortBodyDescription}</p><br><a href="${urlWithoutHash}" target="_blank" style="font-size: 16px; background-color: #40C4FF;color: #ffffff; text-decoration: none; border-radius: 3px; padding: 15px 25px; border: 1px solid #256F9C;" class="mobile-button">${buttonText}</a> </div></div></div></div><div class='col-md-12'> <div class='col-md-3'></div><div class='col-md-4' style='padding: 20px; '> <div class='col-md-12' style='padding:20px; text-align:left'> <a href="https://www.96travel.com" target="_blank" > <h5 style=" font-weight: bold;"></h5>Come Travel Sdn. Bhd. ( 958828-P ) (KPL/6719)</h5> </a> <h5> No. 28-2, Jalan Puteri 2/4, Bandar Puteri Puchong, <br>47100 Puchong, Selangor, Malaysia </h5> <h5>Enquiry: enquiry@96travel.com</h5> <h5>Support: support@96travel.com</h5> </div></div><div class='col-md-1' style='padding: 20px; '> <div class='col-md-12' style='padding:20px; text-align:left'> Follow Us: <br><a href="https://www.facebook.com/CTSB-337755833383913/?ref=aymt_homepage_panel"> <img src="https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png" alt="Facebook" width="24" height="24"> </a> <br><a href="https://www.96travel.com"> www.96travel.com </a> </div></div></div></div></div></div></body></html>`

  return html
}

export const generateToken = (signature, expiresIn = "24h", secret) => {
  if (!secret) {
    if (!process.env.SECRET) {
      console.warn("Secret is required")
      throw new Error("Secret is required")
    }
    secret = process.env.SECRET
  }
  if (!signature) {
    console.warn("Secret is required")
    throw new Error("Secret is required")
  }
  return jwt.sign(signature, secret, { expiresIn })
}

export const getSchemaKeys = (model, keysToOmit = ["_id", "id", "created_at", "updated_at"]) => {
  if (keysToOmit && keysToOmit.constructor !== Array) {
    return console.warn("Keys to omit must be in array.")
  }
  return Object.keys(
    _omit(model.schema.tree, keysToOmit)
  )
}

export const sendEmail = async (mailTo, mailSubject, mailBody, mailFrom = "96travel Center <support@96travel.com>") => {
  if (!mailTo || !mailSubject || !mailBody || !process.env.MAILER_URL) {
    console.warn("Mail to, Mail subject Mail Body/HTML and Mailer URL (config) is required.")
    return Promise.reject()
  }
  try {
    const transporter = nodemailer.createTransport(process.env.MAILER_URL)
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      html: mailBody
    })
    return Promise.resolve()
  }
  catch (err) {
    return Promise.reject(err)
  }
}
