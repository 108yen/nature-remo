import dayjs from "./dayjs"
import { Cloud, DeviceEventType, EventValue } from "./remoAPI"

export interface Props {
  readonly cloud: Cloud
  readonly data: Record<DeviceEventType, EventValue>
  readonly date: dayjs.Dayjs
  readonly daytime: boolean
  readonly deviceConnected: boolean
  readonly midnight: boolean
}
