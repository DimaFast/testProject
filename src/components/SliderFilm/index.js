import React, { useCallback, useMemo } from 'react'
import Slider from 'rc-slider'
import { FILM_ADVERTISING } from '../../constans'

const [MIN] = FILM_ADVERTISING

const SliderFilm = ({ field, value, max = [6000], marks, marksLabel, setTime }) => {
  const handleChange = useCallback(
    (value) => {
      setTime(value)
      field.onChange(value)
    },
    [field, setTime]
  )

  const createMarks = (marks, marksLabel) => {
    return {
      [marks]: {
        label: marksLabel / 60,
        style: {
          position: 'absolute',
          marginTop: -30,
          transform: 'translateX(0)',
          left: '0',
        },
      },
    }
  }
  const marksMemo = useMemo(() => createMarks(marks, marksLabel), [marks, marksLabel])

  return (
    <Slider
      {...field}
      onChange={(value) => handleChange(value)}
      step={[60]}
      min={MIN}
      value={value}
      max={max}
      dotStyle={{ display: 'none' }}
      marks={marksMemo}
    />
  )
}

export default SliderFilm
