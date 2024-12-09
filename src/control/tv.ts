import { SIGNAL } from "../constant"
import { log } from "../logger"
import { Props } from "../models"

export async function tvControl({ cloud, date, deviceConnected }: Props) {
  const holiday = date.day() == 0 || date.day() == 6
  const nineOclock = date.hour() == 9 && date.minute() == 0

  if (holiday && nineOclock && deviceConnected) {
    log("Turn on tv.", "INFO")
    await cloud.updateTV(SIGNAL.tv.id, SIGNAL.tv.power)
  }
}
