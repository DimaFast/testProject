import React from 'react'

const SimpleInput = ({
  register,
  type = 'text',
  onFocus = () => null,
  defaultValue = '',
  className = 'inputSign',
}) => {
  return (
    <input
      defaultValue={defaultValue}
      {...register}
      type={type}
      className={className}
      onFocus={onFocus}
    />
  )
}

export default SimpleInput
