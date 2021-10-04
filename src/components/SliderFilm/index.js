import React from 'react'
import Slider from 'rc-slider'
import { FILM_ADVERTISING } from '../../constans'

const [MIN] = FILM_ADVERTISING

const SliderFilm = ({ field, value, max = [6000], marks, marksLabel, setTime }) => {
  return (
    <Slider
      {...field}
      onChange={(value) => {
        setTime(value)
        field.onChange(value)
      }}
      step={[60]}
      min={MIN}
      value={value}
      max={max}
      dotStyle={{ display: 'none' }}
      marks={{
        [marks]: {
          label: marksLabel / 60,
          style: {
            position: 'absolute',
            marginTop: -30,
            transform: 'translateX(0)',
            left: '0',
          },
        },
      }}
    />
  )
}

export default SliderFilm
