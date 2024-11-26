import { CronJob } from "cron"
import { config } from "dotenv"

import { SIGNAL_ID } from "./constant"
import dayjs from "./dayjs"
import { log } from "./logger"
import { Cloud } from "./remoAPI"
import { deviceIsConnectedLocalNetwork, getEvents } from "./utils"

config({ path: ".env" })

async function main() {
  const date = dayjs().tz()
  const isDaytime = date.hour() > 8 && date.hour() < 19
  const isDeviceConnected = await deviceIsConnectedLocalNetwork()

  const cloud = new Cloud(process.env.ACCESS_TOKEN as string)

  const response = await cloud.getDevices()
  const data = getEvents(response)

  if (data.il.val < 100 && isDaytime && isDeviceConnected) {
    await cloud.sendSignal(SIGNAL_ID.toggle_light)
    log(`Toggle light. light: ${data.il.val}`, "INFO")
  }
}

CronJob.from({
  cronTime: "*/10 * * * * *",
  onTick: () => {
    main()
  },
  start: true,
  timeZone: "Asia/Tokyo",
})
