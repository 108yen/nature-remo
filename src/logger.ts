import dayjs from "./dayjs"

type Severity = "DEBUG" | "ERROR" | "INFO" | "WARNING"

export function log(message: string, severity: Severity) {
  if (process.env.NODE_ENV == "production" && severity == "DEBUG") return

  const content = {
    message,
    severity,
    timestamp: dayjs().tz().format(),
  }

  console.log(JSON.stringify(content))
}
