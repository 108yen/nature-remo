import { config } from "dotenv"

import { Cloud } from "./remoAPI"

config({ path: ".env" })

async function main() {
  const cloud = new Cloud(process.env.ACCESS_TOKEN as string)

  const devices = await cloud.getDevices()

  console.dir(devices, { depth: null })
}

main()
