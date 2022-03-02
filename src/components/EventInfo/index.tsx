import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Form from '../Form'
import { selectCurrentEvent, selectRenderForm, setRenderForm, deleteEvent, selectPutStatus } from './eventSlice'

const EventInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentEvent = useSelector(selectCurrentEvent)
  const renderForm = useSelector(selectRenderForm)
  const putStatus = useSelector(selectPutStatus)
  const handleDeleteClick = () => {
    dispatch(deleteEvent(currentEvent.id as string))
    navigate('/')
  }
  return (
    <Fragment>
      <div>
        {'image' in currentEvent && <img src={currentEvent.image} />}
        {Object.keys(currentEvent).map((key: string) => {
          if (key !== 'image') {
            return (
              <div key={`current-event-${key}`}>
                <div>
                  <strong>{key}</strong>: {currentEvent[key]}
                </div>
              </div>
            )
          }
        })}
      </div>
      {!renderForm ? (
        <div>
          <button onPointerUp={() => dispatch(setRenderForm(true))}>Edit</button>
          <button onPointerUp={handleDeleteClick}>Delete</button>
        </div>
      ) : <Form />}
      {putStatus === 'failed' && <h1>We could not send your update. Please try again later.</h1>}
    </Fragment>
  )
}

export default EventInfo
