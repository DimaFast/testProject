import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap'

import routes from '../../routes'
import { getFilmsId } from '../../api/films'
import { NAME_FIELD, TEXT_FIELD, IMG_FIELD } from '../../constans'
import SimpleInput from '../../components/SimpleInput'

import './styles.css'

const ChangeList = ({ open, setOpen, changeFilm }) => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const history = useHistory()
  const [value, setValue] = useState({})

  const onSubmit = (data) => {
    changeFilm(id, data)
    history.push(routes.list)
  }

  useEffect(() => {
    getFilmsId(id).then((data) => setValue(data))
  }, [])

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
          <SimpleInput
            defaultValue={value?.name}
            register={{ ...register(NAME_FIELD) }}
            className="inputList"
          />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <SimpleInput
            defaultValue={value?.text}
            register={{ ...register(TEXT_FIELD) }}
            className="inputList"
          />
        </div>
        <div>
          <label className="labelList">Film Image</label>
          <SimpleInput register={{ ...register(IMG_FIELD) }} type="file" className="inputList" />
        </div>
        <button type="submit" className="buttonSave">
          Save
        </button>
      </form>
    </Modal>
  )
}
export default ChangeList
