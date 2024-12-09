import { config } from "dotenv"

import { Cloud } from "../../src/remoAPI"

config({ path: ".env" })

async function main() {
  const cloud = new Cloud(process.env.ACCESS_TOKEN as string)

  // get device list
  // const response = await cloud.getAppliances()

  // updateTV
  await cloud.updateTV("d251790e-4086-4b74-a833-f395021074bb", "power")

  // get TV
  // const response = await cloud.listTV()

  // console.dir(response,{depth:null})
}

main()
