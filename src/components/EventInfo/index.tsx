import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../Form'
import { selectCurrentEvent, selectRenderForm, setRenderForm } from './eventSlice'

const EventInfo = () => {
  const dispatch = useDispatch()
  const currentEvent = useSelector(selectCurrentEvent)
  const renderForm = useSelector(selectRenderForm)
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
          <button onClick={() => dispatch(setRenderForm(true))}>Edit</button>
          <button>Delete</button>
        </div>
      ) : <Form />}
    </Fragment>
  )
}

export default EventInfo
