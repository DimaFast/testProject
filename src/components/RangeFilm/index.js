import React from 'react'
import { Range } from 'rc-slider'
import { FILM_ADVERTISING } from '../../constans'

const { MIN } = FILM_ADVERTISING

const RangeFilm = ({
  field,
  setValueFilm,
  value,
  max,
  marksMin,
  marksMax,
  marksMinLabel,
  marksMaxLabel,
}) => {
  return (
    <Range
      {...field}
      onChange={(value) => {
        setValueFilm(value)
        field.onChange(value)
      }}
      step={[60]}
      min={MIN}
      value={value}
      max={max}
      dotStyle={{ display: 'none' }}
      marks={{
        [marksMin]: {
          label: marksMinLabel / 60,
          style: {
            position: 'absolute',
            marginTop: -30,
            transform: 'translateX(0)',
            left: '0',
          },
        },
        [marksMax]: {
          label: marksMaxLabel / 60,
          style: {
            position: 'absolute',
            top: -30,
            transform: 'translateX(0)',
            right: '0',
            left: 'auto',
          },
        },
      }}
    />
  )
}

export default RangeFilm
