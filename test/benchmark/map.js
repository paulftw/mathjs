import Benchmark from 'benchmark'
import padRight from 'pad-right'
import { ones, abs, DenseMatrix, map, random, round } from '../../lib/esm/index.js'

const genericMatrix = map(ones(10, 10, 'dense'), _ => round(random(-5, 5), 2))
const numberMatrix = new DenseMatrix(genericMatrix, 'number')
const array = genericMatrix.toArray()

// console.log('data', array)
// console.log('abs(data)', abs(array))npm run

new Benchmark.Suite()
  .add(pad('abs(genericMatrix)'), () => {
    abs(genericMatrix)
  })
  .add(pad('abs(array)'), () => {
    abs(array)
  })
  .add(pad('abs(numberMatrix)'), () => {
    abs(numberMatrix)
  })
  .add(pad('genericMatrix.map(abs)'), () => {
    genericMatrix.map(abs)
  })
  .add(pad('numberMatrix.map(abs)'), () => {
    numberMatrix.map(abs)
  })
  .add(pad('map(genericMatrix, abs)'), () => {
    map(genericMatrix, abs)
  })
  .add(pad('map(numberMatrix, abs)'), () => {
    map(numberMatrix, abs)
  })
  .add(pad('map(array, abs)'), () => {
    map(array, abs)
  })
  .add(pad('map(array, abs.signatures.number)'), () => {
    map(array, abs.signatures.number)
  })
  .add(pad('genericMatrix.map(abs.signatures.number)'), () => {
    genericMatrix.map(abs.signatures.number)
  })
  .add(pad('numberMatrix.map(abs.signatures.number)'), () => {
    numberMatrix.map(abs.signatures.number)
  })
  .add(pad('map(array, abs + idx)'), () => {
    map(array, (x, idx) => abs(x) + idx[0] - idx[1])
  })
  .add(pad('genericMatrix.map(abs + idx)'), () => {
    genericMatrix.map((x, idx) => abs(x) + idx[0] - idx[1])
  })
  .add(pad('numberMatrix.map(abs + idx)'), () => {
    numberMatrix.map((x, idx) => abs(x) + idx[0] - idx[1])
  })
  .add(pad('map(array, abs + idx + arr)'), () => {
    map(array, (x, idx, X) => abs(x) + idx[0] - idx[1] + X[0][0])
  })
  .add(pad('genericMatrix.map(abs + idx + matrix)'), () => {
    genericMatrix.map((x, idx, X) => abs(x) + idx[0] - idx[1] + X.get([0, 0]))
  })
  .add(pad('numberMatrix.map(abs + idx + matrix)'), () => {
    numberMatrix.map((x, idx, X) => abs(x) + idx[0] - idx[1] + X.get([0, 0]))
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
  })
  .run()

function pad (text) {
  return padRight(text, 42, ' ')
}
