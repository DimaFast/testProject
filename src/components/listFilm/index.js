import React from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

import './styles.css'

const ListFilm = ({ item, setOpen, removeFilm }) => {
  if (isEmpty(item)) {
    return null
  }

  return (
    <div className="filmItem">
      <img src={item?.img} alt="" className="filmImg" />
      <div className="filmWrapper">
        <p className="filmName">{item?.name}</p>
        <p className="filmRating">{item?.text}</p>
        <Link to={`/list/${item?.id}`} onClick={() => setOpen(true)} className="changeFilm">
          Change
        </Link>
        <p style={{ marginTop: 30 }} onClick={() => removeFilm(item?.id)} className="changeFilm">
          Delete
        </p>
      </div>
    </div>
  )
}

export default ListFilm
