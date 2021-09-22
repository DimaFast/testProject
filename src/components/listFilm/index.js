import React from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

import './styles.css'

const ListFilm = ({ Item, setOpen, removeFilm }) => {
  if (isEmpty(Item)) {
    return <></>
  }
  return (
    <div className="filmItem">
      <img src={Item.img} alt="" className="filmImg" />
      <div className="filmWrapper">
        <p className="filmName">{Item.name}</p>
        <p className="filmRating">{Item.text}</p>
        <Link to={`/list/${Item.id}`} onClick={() => setOpen(true)} className="changeFilm">
          Change
        </Link>
        <p style={{ marginTop: 30 }} onClick={() => removeFilm(Item.id)} className="changeFilm">
          Delete
        </p>
      </div>
    </div>
  )
}

export default ListFilm
