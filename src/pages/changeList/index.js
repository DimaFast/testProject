import React, { useEffect, useState } from 'react'
import { isNil } from 'lodash'
import { Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { TIME_TO_ADVERTISING, NAME_FIELD, TEXT_FIELD, TIME_FILM, LINK_IMAGE } from '../../constans'
import routes from '../../routes'
import { getFilmsId } from '../../api/films'
import SimpleInput from '../../components/SimpleInput'
import SliderFilm from '../../components/SliderFilm'
import RangeFilm from '../../components/RangeFilm'

import './styles.css'

const ChangeList = ({ open, setOpen, changeFilm }) => {
  const { id } = useParams()
  const history = useHistory()
  const [value, setValue] = useState({})
  const [filmTime, setFilmTime] = useState([])
  const [advertisingLabel, setAdvertisingLabel] = useState()
  const boolValue = isNil(advertisingLabel)
  const [advert, setAdvert] = useState(boolValue)

  const {
    register,
    handleSubmit,
    control,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      [TIME_TO_ADVERTISING]: advertisingLabel,
      [NAME_FIELD]: value?.name,
      [TEXT_FIELD]: value?.text,
      ['dateFilm']: value?.dateFilm,
    },
  })

  const onSubmit = (data) => {
    if (advert) {
      delete data?.timeToAdvertising
    }
    changeFilm(id, data)
    history.push(routes.list)
  }

  useEffect(() => {
    getFilmsId(id).then((data) => {
      setValue(data)
      setFormValue(NAME_FIELD, data?.name)
      setFormValue('dateFilm', data?.dateFilm)
      setFormValue(TEXT_FIELD, data?.text)
      setFormValue(TIME_TO_ADVERTISING, data?.timeToAdvertising)
      setFormValue(TIME_FILM, data?.timeFilm)
      setAdvertisingLabel(data?.timeToAdvertising)
      setFilmTime(data?.timeFilm)
    })
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
      <form
        style={{ maxWidth: 'initial' }}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="formSignIn"
      >
        <div>
          <label className="labelList">Name Film</label>
          <SimpleInput defaultValue={value?.name} register={register(NAME_FIELD)} />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <SimpleInput register={register(TEXT_FIELD)} />
        </div>
        <div>
          <label className="labelList">Link image film</label>
          <SimpleInput register={register(LINK_IMAGE)} />
        </div>
        <div style={{ width: '100%', maxWidth: 287 }}>
          <label className="labelList">Date Film</label>
          <SimpleInput register={register('dateFilm', { required: 'please input' })} type="date" />
        </div>
        <div style={{ width: '100%', maxWidth: 287, marginBottom: 20 }}>
          <label style={{ marginBottom: 20 }} className="labelList">
            Time Film
          </label>
          <Controller
            control={control}
            name={TIME_FILM}
            render={({ field }) => (
              <SliderFilm
                field={field}
                value={filmTime}
                marks={filmTime}
                marksLabel={filmTime}
                setTime={setFilmTime}
              />
            )}
          />
        </div>
        <div style={{ width: '100%', maxWidth: 287, marginBottom: 20 }}>
          <label style={{ marginBottom: 20 }} className="labelList">
            Time to Advertising
          </label>
          <Controller
            control={control}
            name={TIME_TO_ADVERTISING}
            render={({ field }) => (
              <RangeFilm
                field={field}
                disable={advert}
                setValueFilm={setAdvertisingLabel}
                value={advert ? [0, 0] : advertisingLabel}
                max={filmTime}
                marksMin={boolValue ? advert[0] : advertisingLabel[0]}
                marksMax={boolValue ? advert[1] : advertisingLabel[1]}
                marksMaxLabel={boolValue ? advert[1] : advertisingLabel[1]}
                marksMinLabel={boolValue ? advert[0] : advertisingLabel[0]}
              />
            )}
          />
        </div>
        <SimpleInput type="checkbox" checked={advert} onClick={() => setAdvert(!advert)} />
        <button style={{ marginBottom: 25 }} type="submit" className="signInSubmit">
          Save
        </button>
      </form>
    </Modal>
  )
}
export default ChangeList
