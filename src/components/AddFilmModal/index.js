import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
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
import SliderFilm from '../SliderFilm'
import RangeFilm from '../RangeFilm'

import './styles.css'

const AddFilmModal = ({ open, setOpen }) => {
  const [MIN] = FILM_ADVERTISING
  const [advertisingLabel, setAdvertisingLabel] = useState(FILM_ADVERTISING)
  const [q, setQ] = useState(FILM_ADVERTISING)
  const [timeAdvertising, setTimeAdvertising] = useState(false)
  const { register, handleSubmit, reset, control } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (timeAdvertising) {
      delete data.timeToAdvertising
    }
    setFilms(data).then(() => {
      dispatch({ type: 'CREATE_FILMS', payload: data })
      setOpen(false)
      reset()
    })
  }

  return (
    <Modal show={open} centered>
      <button onClick={() => setOpen(false)} className="close">
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
          <SimpleInput register={register(NAME_FIELD, { required: 'please input' })} />
        </div>
        <div>
          <label className="labelList">Rating Film</label>
          <SimpleInput
            className="inputSign appearance"
            type="number"
            register={register(TEXT_FIELD, { required: 'please input' })}
          />
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
                value={q}
                max={[6000]}
                marks={MIN}
                marksLabel={q}
                setTime={setQ}
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
              <RangeFilm
                field={field}
                disable={timeAdvertising}
                setValueFilm={setAdvertisingLabel}
                value={advertisingLabel}
                max={q}
                marksMax={q}
                marksMin={MIN}
                marksMinLabel={advertisingLabel[0]}
                marksMaxLabel={advertisingLabel[1]}
              />
            )}
          />
        </div>
        <SimpleInput
          type="checkbox"
          checked={timeAdvertising}
          onClick={() => setTimeAdvertising(!timeAdvertising)}
        />
        <button style={{ marginBottom: 25 }} type="submit" className="signInSubmit">
          Save
        </button>
      </form>
    </Modal>
  )
}
export default AddFilmModal
