import asyncHandler from "express-async-handler";
import { IPinfoWrapper } from "node-ipinfo";
import * as UAParser from "ua-parser-js";

const indexPage = asyncHandler(async (req, res) => {
    /* if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
             (position) => {
                 console.log(position.coords.latitude, position.coords.longitude);
             }
         );
     } else {
         console.log("This browser is not compatible with navigator.geolocation")
     } */

    const parser = new UAParser.UAParser(req.headers["user-agent"]);
    const device = parser.getDevice();
    const deviceType = device.vendor
    console.log(deviceType)
    const ipInfoWrapper = new IPinfoWrapper("dd68644026218a");
    const ipInfo = await ipInfoWrapper.lookupIp("197.210.84.32")
    console.log(ipInfo);
    res.send("Good")
})

export { indexPage } 
