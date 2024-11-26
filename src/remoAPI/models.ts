export interface Aircon {
  range: AirconRange
  tempUnit: "c" | "f"
}

export type AirconModeType = "auto" | "blow" | "cool" | "dry" | "warm"

export interface AirconModeValue {
  dir: string[]
  temp: string[]
  vol: string[]
}

export interface AirconRange {
  fixedButtons: string[]
  modes: Record<AirconModeType, AirconModeValue>
}

export interface AirconSettings {
  button: string
  dir: string
  dirh: string
  mode: AirconModeType
  temp: string
  temp_unit: TemperatureUnit
  vol: string
}

export interface AirconSettingsWithTimestamp extends AirconSettings {
  updated_at: string
}

export interface Appliance {
  aircon: Aircon | null
  device: Device
  id: string
  image: string
  light?: Light
  model: Model | null
  nickname: string
  settings: AirconSettingsWithTimestamp | null
  signals: Signal[]
  smart_meter?: SmartMeter
  tv?: TV
  type: string
}

export type ApplianceType = "AC" | "LIGHT" | "TV"

export interface Button {
  image: string
  label: string
  name: string
}

export interface DetectedAirconModel {
  model: Model
  params: AirconSettings
}

export interface Device {
  created_at: string
  firmware_version: string
  humidity_offset: number
  id: string
  mac_address: string
  name: string
  serial_number: string
  temperature_offset: number
  updated_at: string
}

export type DeviceEventType = "hu" | "il" | "te"

export interface DeviceWithEvents extends Device {
  /**
   * te: Temperature
   * hu: Humidity
   * il: Illumination
   */
  newest_events: Record<DeviceEventType, EventValue>
}

export interface EchonetliteProperties {
  epc: number
  name: string
  updated_at: string
  val: string
}

export interface EventValue {
  created_at: string
  val: number
}

export interface Light {
  buttons: Button[]
  state: LightState
}

export interface LightState {
  brightness: string
  last_button: string
  power: "off" | "on"
}

export interface Model {
  country: string
  id: string
  image: string
  manufacturer: string
  name: string
  remote_name: string
  series: string
}

export interface SensorValue {
  humidity: number | undefined
  illumination: number | undefined
  temperature: number
}

export interface Signal {
  id: string
  image: string
  name: string
}

export interface SignalMessage {
  data: number[]
  format: "us"
  freq: number
}

export interface SmartMeter {
  echonetlite_properties: EchonetliteProperties[]
}

export type TemperatureUnit = "c" | "f"

export interface TV {
  buttons: Button[]
  state: TVState
}

export interface TVState {
  input: "bs" | "cs" | "t"
}

export interface UpdateAirconSettingsOptions {
  air_direction: string
  air_volume: string
  button: string
  operation_mode: string
  temperature: string
}

/** User */
export interface User {
  id: string
  nickname: string
}
