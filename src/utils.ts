import { DeviceWithEvents } from "./remoAPI"

export function getEvents(deviceEvents: DeviceWithEvents[]) {
  return deviceEvents[0].newest_events
}
