import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { random } from 'lodash'
import Layout from '../../components/Layout'

const Test = () => {
  const { register, handleSubmit } = useForm()
  const [value, setValue] = useState()
  const [valueFirst, setValueFirst] = useState()
  const [valueWord, setValueWord] = useState()
  const [valueWordLength, setValueWordLength] = useState()
  const [valueMax, setValueMax] = useState()
  const [valueMatrix, setValueMatrix] = useState()
  const onSubmit = (data) => {
    setValue(data.value * Math.pow(10, -6))
    setValueFirst(data.value.split('')[0])
    let maxValue = 0
    let index = 0
    for (let [valueDateIndex, valueDate] of data.value.split('').entries()) {
      if (maxValue < valueDate) {
        maxValue = valueDate
        index = valueDateIndex + 1
      }
    }
    setValueMax(`Max Value = ${maxValue} : Index Max Value = ${index}`)
  }
  const onSubmitStroke = (data) => {
    const str = data.valueStroke.split(' ')
    let longest = 0
    let word = null
    for (let i = 0; i < str.length; i++) {
      if (longest < str[i].length) {
        longest = str[i].length
        word = str[i]
      }
    }
    setValueWordLength(data.valueStroke.substr(5, 15))
    setValueWord(word)
  }
  const onSubmitMatrix = (data) => {
    let mass = [[data], [data]]
    for (var i = 0; i < data.valueMatrix; i++) {
      for (var j = 0; j < data.valueMatrix; j++) {
        mass[([i], [j])] = random(0, 10)
        console.log(mass)
        if (mass[([i], [j])] === 0) {
          return setValueMatrix(`${i} + ${j}`)
        }
      }
    }
  }
  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h1>Test</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Value in byte
          </label>
          <input {...register('value')} type="number" className="inputSign" />
          <button type="submit">Submit</button>
        </form>
        <label style={{ display: 'block' }} className="inputLabel">
          Value in Mb
        </label>
        <input defaultValue={value} type="number" />
        <label style={{ display: 'block' }} className="inputLabel">
          First number of Value
        </label>
        <input defaultValue={valueFirst} type="number" />
        <label style={{ display: 'block' }} className="inputLabel">
          Max element
        </label>
        <input style={{ width: 265 }} value={valueMax} type="text" />
        <form onSubmit={handleSubmit(onSubmitStroke)}>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Stroke
          </label>
          <input {...register('valueStroke')} type="text" className="inputSign" />
          <button type="submit">Submit</button>
        </form>
        <label style={{ display: 'block' }} className="inputLabel">
          The most big word
        </label>
        <input defaultValue={valueWord} type="text" />
        <label style={{ display: 'block' }} className="inputLabel">
          Output Stroke from 6 to 20
        </label>
        <input defaultValue={valueWordLength} type="text" />
        <form onSubmit={handleSubmit(onSubmitMatrix)}>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Matrix
          </label>
          <input {...register('valueMatrix')} type="text" className="inputSign" />
          <button type="submit">Submit</button>
        </form>
        <label style={{ display: 'block' }} className="inputLabel">
          First 0
        </label>
        <input value={valueMatrix} type="text" className="inputSign" />
      </div>
    </Layout>
  )
}
export default Test
