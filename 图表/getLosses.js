const fs = require('fs').promises
const path = require('path')

const getLosses = async (filePath, re) => {
  const contents = await fs.readFile(filePath, 'utf8')
  // const re = /losses: (\d+\.\d+),/g
  losses = []
  res = re.exec(contents)

  while (res != null) {
    losses.push(parseFloat(res[1]).toFixed(5))
    res = re.exec(contents)
  }

  return losses
}

(async () => {
  const losses = await getLosses(path.join(__dirname, 'logs', 'sd-gan-g5d5.log'), /g_loss_fake: (-?\d+\.\d+(e-?\d+)?),?/g)
  console.log(losses.length)
  fs.writeFile(path.join(__dirname, 'sdg5d5', 'g_loss_fake.json'), JSON.stringify(losses))
  console.log(losses)
})()