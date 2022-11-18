import neatCSV from 'neat-csv'
import fs from 'node:fs/promises'

const precisions = []
const recalls = []
const mAPs = []
const mAPs95 = []

const filename = '多类带噪'

;(async () => {
  const content = await fs.readFile(`yolo/${filename}.csv`)
  const lines = await neatCSV(content)

  lines.forEach(line => {
    precisions.push(parseFloat(line["   metrics/precision"].trim()))
    recalls.push(parseFloat(line["      metrics/recall"].trim()))
    mAPs.push(parseFloat(line["     metrics/mAP_0.5"].trim()))
    mAPs95.push(parseFloat(line["metrics/mAP_0.5:0.95"].trim()))
  })

  const results = {
    precisions,
    recalls,
    mAPs,
    mAPs95
  }

  await fs.writeFile(`${filename}.json`, JSON.stringify(results))
})()
