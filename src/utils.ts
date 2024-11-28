import findLocalDevices from "local-devices"

import { LOCAL_NETWORK } from "./constant"
import { DeviceWithEvents } from "./remoAPI"

export async function deviceIsConnectedLocalNetwork() {
  const devices = await findLocalDevices({
    address: LOCAL_NETWORK.ip_range,
  })

  return devices.some(({ mac }) => mac === process.env.MAC_ADDRESS)
}

export function getEvents(deviceEvents: DeviceWithEvents[]) {
  return deviceEvents[0].newest_events
}
