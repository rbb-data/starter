const { dsvFormat, csvFormat } = require('d3-dsv')
const fs = require('fs')
const path = require('path')
const rawData = fs.readFileSync(
  path.join(__dirname, '../raw/detailed-reviews-csv-17092020 2018-2020.csv'),
  'utf8'
)

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const counts = csv.reduce((accumulator, currentValue) => {
  const date = new Date(currentValue.date)
  const month = `${date.getFullYear()}-${date
    .getMonth()
    .toLocaleString('en', { minimumIntegerDigits: 2 })}`
  if (accumulator[month] === undefined) accumulator[month] = 0
  accumulator[month] += 1
  return accumulator
}, {})

const sorted = Object.entries(counts)
  .map(([month, count]) => ({
    month,
    count,
  }))
  .sort((a, b) => a.month.localeCompare(b.month))

const formated = csvFormat(sorted)

fs.writeFileSync(path.join(__dirname, '../public/counts.csv'), formated, 'utf8')

console.log('done')
