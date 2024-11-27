import { CronJob } from "cron"
import { config } from "dotenv"

import { lightControl } from "./control"
import dayjs from "./dayjs"
import { log } from "./logger"
import { Props } from "./models"
import { Cloud } from "./remoAPI"
import { deviceIsConnectedLocalNetwork, getEvents } from "./utils"

config({ path: ".env" })

async function main() {
  const date = dayjs().tz()
  const daytime = date.hour() > 8 && date.hour() < 19
  const midnight = date.hour() > 19 && date.hour() < 4
  const deviceConnected = await deviceIsConnectedLocalNetwork()

  if (deviceConnected) {
    log("Device is detected.", "DEBUG")
  } else {
    log("Device is not detected.", "DEBUG")
  }

  const cloud = new Cloud(process.env.ACCESS_TOKEN as string)

  const response = await cloud.getDevices()
  const data = getEvents(response)

  const props: Props = {
    cloud,
    data,
    date,
    daytime,
    deviceConnected,
    midnight,
  }

  await lightControl(props)
}

CronJob.from({
  cronTime: "0 */5 * * * *",
  onTick: () => {
    try {
      main()
    } catch (error) {
      log(error as string, "ERROR")
    }
  },
  start: true,
  timeZone: "Asia/Tokyo",
})
