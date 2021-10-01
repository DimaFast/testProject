import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Slider, { Range } from 'rc-slider'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import {
  FILM_ADVERTISING,
  NAME_FIELD,
  TEXT_FIELD,
  TIME_FILM,
  TIME_TO_ADVERTISING,
  LINK_IMAGE,
} from '../../constans'
import { setFilms } from '../../api/films'
import SimpleInput from '../../components/SimpleInput'

import './styles.css'

const [MIN] = FILM_ADVERTISING

const AddFilmModal = ({ open, setOpen }) => {
  const [advertisingLabel, setAdvertisingLabel] = useState(FILM_ADVERTISING)
  const [q, setQ] = useState(FILM_ADVERTISING)
  const { register, handleSubmit, reset, control } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    setFilms(data).then(() => {
      dispatch({ type: 'CREATE_FILMS', payload: data })
      setOpen(false)
      reset()
    })
  }

  return (
    <Modal show={open} centered>
      <button
        onClick={() => {
          setOpen(false)
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
          <SimpleInput register={{ ...register(NAME_FIELD) }} />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <SimpleInput register={{ ...register(TEXT_FIELD) }} />
        </div>
        <div>
          <label className="labelList">Link image film</label>
          <SimpleInput register={{ ...register(LINK_IMAGE) }} />
        </div>
        <div style={{ width: '100%', maxWidth: 287 }}>
          <label className="labelList">Date Film</label>
          <SimpleInput register={{ ...register('dateFilm') }} type="date" />
        </div>
        <div style={{ width: '100%', maxWidth: 287, marginBottom: 20 }}>
          <label style={{ marginBottom: 20 }} className="labelList">
            Time Film
          </label>
          <Controller
            control={control}
            name={TIME_FILM}
            defaultValue={q[1]}
            render={({ field }) => (
              <Slider
                {...field}
                onChange={(value) => {
                  setQ([[], value])
                  field.onChange(value)
                }}
                step={[60]}
                min={MIN}
                value={q[1]}
                max={[6000]}
                dotStyle={{ display: 'none' }}
                marks={{
                  [MIN]: {
                    label: q[1] / 60,
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
            defaultValue={advertisingLabel}
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
                max={q[1]}
                dotStyle={{ display: 'none' }}
                marks={{
                  [MIN]: {
                    label: advertisingLabel[0] / 60,
                    style: {
                      position: 'absolute',
                      marginTop: -30,
                      transform: 'translateX(0)',
                      left: '0',
                    },
                  },
                  [q[1]]: {
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
export default AddFilmModal
