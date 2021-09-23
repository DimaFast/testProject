import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap'

import routes from '../../routes'
import { name, text, img } from '../../constans'
import { getFilmsId } from '../../api/films'

import './styles.css'

const ChangeList = ({ open, setOpen, changeFilm }) => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const history = useHistory()
  const [value, setValue] = useState({})

  useEffect(() => {
    getFilmsId(id).then((data) => setValue(data))
  }, [])

  const onSubmit = (data) => {
    changeFilm(id, data)
    history.push(routes.list)
  }

  return (
    <Modal show={open} centered>
      <button
        onClick={() => {
          setOpen(false)
          history.push(routes.list)
        }}
        className="close"
      >
        Close
      </button>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="listForm">
        <div>
          <label className="labelList">Name Film</label>
          <input defaultValue={value?.name} {...register(name)} type="text" className="inputList" />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <input {...register(text)} defaultValue={value?.text} type="text" className="inputList" />
        </div>
        <div>
          <label className="labelList">Film Image</label>
          <input {...register(img)} type="file" className="inputList" />
        </div>
        <button type="submit" className="buttonSave">
          Save
        </button>
      </form>
    </Modal>
  )
}
export default ChangeList
