import React, { useCallback, useMemo } from 'react'
import { Range } from 'rc-slider'

const RangeFilm = ({
  field,
  setValueFilm,
  value,
  max,
  marksMin,
  marksMax,
  marksMinLabel,
  marksMaxLabel,
  disable = false,
}) => {
  const changeTime = useCallback(
    (value) => {
      setValueFilm(value)
      field.onChange(value)
    },
    [field, setValueFilm]
  )

  const createMarks = (marksMin, marksMax, marksMinLabel, marksMaxLabel) => {
    return {
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
    }
  }

  const marksMemo = useMemo(
    () => createMarks(marksMin, marksMax, marksMinLabel, marksMaxLabel),
    [marksMin, marksMax, marksMinLabel, marksMaxLabel]
  )

  return (
    <Range
      {...field}
      disabled={disable}
      onChange={(value) => changeTime(value)}
      step={[60]}
      min={1800}
      value={disable ? [0, 0] : value}
      max={max}
      dotStyle={{ display: 'none' }}
      marks={disable ? {} : marksMemo}
    />
  )
}

export default RangeFilm
