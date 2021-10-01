import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Slider, { Range } from 'rc-slider'
import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import {
  TIME_TO_ADVERTISING,
  FILM_ADVERTISING,
  NAME_FIELD,
  TEXT_FIELD,
  TIME_FILM,
} from '../../constans'
import routes from '../../routes'
import { getFilmsId } from '../../api/films'
import SimpleInput from '../../components/SimpleInput'

import './styles.css'

const [MIN] = FILM_ADVERTISING

const ChangeList = ({ open, setOpen, changeFilm }) => {
  const { id } = useParams()
  const history = useHistory()
  const [value, setValue] = useState({})
  const [filmTime, setFilmTime] = useState([])
  const [advertisingLabel, setAdvertisingLabel] = useState([])

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
    },
  })

  const onSubmit = (data) => {
    changeFilm(id, data)
    history.push(routes.list)
  }

  useEffect(() => {
    getFilmsId(id).then((data) => {
      setValue(data)
      setFormValue(NAME_FIELD, data?.name)
      setFormValue(TEXT_FIELD, data?.text)
      setFormValue(TIME_TO_ADVERTISING, data.timeToAdvertising)
      setFormValue(TIME_FILM, data?.timeFilm)
      setAdvertisingLabel(data.timeToAdvertising)
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
          <SimpleInput defaultValue={value?.name} register={{ ...register(NAME_FIELD) }} />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <SimpleInput register={{ ...register(TEXT_FIELD) }} />
        </div>
        <div style={{ width: '100%', maxWidth: 287, marginBottom: 20 }}>
          <label style={{ marginBottom: 20 }} className="labelList">
            Time Film
          </label>
          <Controller
            control={control}
            name={TIME_FILM}
            render={({ field }) => (
              <Slider
                {...field}
                onChange={(value) => {
                  setFilmTime(value)
                  field.onChange(value)
                }}
                step={[60]}
                min={MIN}
                value={filmTime}
                max={[6000]}
                dotStyle={{ display: 'none' }}
                marks={{
                  [filmTime]: {
                    label: filmTime / 60,
                    style: {
                      position: 'absolute',
                      marginTop: -30,
                      transform: 'translateX(0)',
                      left: '0',
                    },
                  },
                }}
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
              <Range
                {...field}
                onChange={(value) => {
                  setAdvertisingLabel(value)
                  field.onChange(value)
                }}
                step={[60]}
                min={MIN}
                value={advertisingLabel}
                max={filmTime}
                dotStyle={{ display: 'none' }}
                marks={{
                  [advertisingLabel[0]]: {
                    label: advertisingLabel[0] / 60,
                    style: {
                      position: 'absolute',
                      marginTop: -30,
                      transform: 'translateX(0)',
                      left: '0',
                    },
                  },
                  [advertisingLabel[1]]: {
                    label: advertisingLabel[1] / 60,
                    style: {
                      position: 'absolute',
                      top: -30,
                      transform: 'translateX(0)',
                      right: '0',
                      left: 'auto',
                    },
                  },
                }}
              />
            )}
          />
        </div>
        <button style={{ marginBottom: 25 }} type="submit" className="signInSubmit">
          Save
        </button>
      </form>
    </Modal>
  )
}
export default ChangeList
