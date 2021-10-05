import React from 'react'

const SimpleInput = ({
  register,
  type = 'text',
  onFocus = () => null,
  defaultValue = '',
  className = 'inputSign',
  onClick = () => null,
  checked = false,
}) => {
  return (
    <input
      defaultValue={defaultValue}
      {...register}
      type={type}
      className={className}
      onFocus={onFocus}
      onClick={onClick}
      checked={checked}
    />
  )
}

export default SimpleInput
