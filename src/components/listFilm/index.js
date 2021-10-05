import React from 'react'
import { isEmpty, isNil } from 'lodash'
import { Link } from 'react-router-dom'

import './styles.css'

const ListFilm = ({ item, setOpen, removeFilm }) => {
  if (isEmpty(item)) {
    return null
  }

  return (
    <div className="filmItem">
      <div className="filmWrapper">
        <div className="filmWrapperItem">
          <p className="filmName">{item?.name}</p>
          <p className="filmRating">{item?.text}</p>
          <p className="filmRating">The film continues {item?.timeFilm / 60} hours</p>
          <p className="filmRating">
            {isNil(item?.timeToAdvertising)
              ? 'Not have advertising'
              : `Time to advertising from ${item?.timeToAdvertising[0] / 60} to ${
                  item?.timeToAdvertising[1] / 60
                }`}
          </p>
          <p className="filmRating">{item?.dateFilm}</p>
          <Link to={`/list/${item?.id}`} onClick={() => setOpen(true)} className="changeFilm">
            Change
          </Link>
          <p style={{ marginTop: 30 }} onClick={() => removeFilm(item?.id)} className="changeFilm">
            Delete
          </p>
        </div>
        <img className="imageFilm" src={item?.linkImage} alt="" />
      </div>
    </div>
  )
}

export default ListFilm
