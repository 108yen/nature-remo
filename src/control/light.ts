import { SIGNAL_ID, TRIGGER } from "@/constant"
import { log } from "@/logger"
import { Props } from "@/models"
import { store } from "@/store"

export async function lightControl({
  cloud,
  data,
  daytime,
  deviceConnected,
  midnight,
}: Props) {
  if (data.il.val < TRIGGER.light && daytime && deviceConnected) {
    await cloud.sendSignal(SIGNAL_ID.toggle_light)

    store.set("light", 1)
    log(`Turn on light. brightness: ${data.il.val}`, "INFO")
  }

  if (data.il.val > TRIGGER.light && midnight && !deviceConnected) {
    await cloud.sendSignal(SIGNAL_ID.toggle_light)

    store.set("light", 0)
    log(`Turn off light. brightness: ${data.il.val}`, "INFO")
  }

  if (data.il.val < TRIGGER.light) {
    store.set("light", 0)
    log(
      `Update the light parameter to 0 because the light is expected to be off. brightness: ${data.il.val}`,
      "DEBUG",
    )
  } else if (midnight) {
    store.set("light", 1)
    log(
      `Update the light parameter to 1 because the light is expected to be on. brightness: ${data.il.val}`,
      "DEBUG",
    )
  }
}