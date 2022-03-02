import React, { Fragment, useEffect, useState, PointerEvent } from 'react'
import './App.css'
import styled from 'styled-components'
import { RainfocusEvent, RowProps } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, selectRenderForm, setEvent, setRenderForm, selectEventList, deleteEvent, setCurrentEventIndex, selectGetStatus, selectPostStatus, selectDeleteStatus } from './components/EventInfo/eventSlice'
import { useNavigate } from 'react-router-dom'
import Form from './components/Form'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [indexOfHoveredElement, setIndexOfHoveredElement] = useState(-1)
  const renderForm = useSelector(selectRenderForm)
  const eventList = useSelector(selectEventList)
  const getStatus = useSelector(selectGetStatus)
  const postStatus = useSelector(selectPostStatus)
  const deleteStatus = useSelector(selectDeleteStatus)
  useEffect(() => {
    dispatch(getEvents())
  }, [])
  const handleRowClick = (rfEvent: RainfocusEvent<string>, index: number) => {
    dispatch(setCurrentEventIndex(index))
    dispatch(setEvent(rfEvent))
    navigate('/event')
  }
  const handleButtonClick = (event: PointerEvent, type: 'add' | 'edit' | 'delete', rfEvent?: RainfocusEvent<string>, index?: number) => {
    event.stopPropagation()
    switch (type) {
    case 'add':
      dispatch(setRenderForm(true))
      break
    case 'edit':
      if (rfEvent !== undefined) {
        dispatch(setEvent(rfEvent))
        navigate('/event')
        dispatch(setRenderForm(true))
      }
      break
    case 'delete':
      if (rfEvent !== undefined && index !== undefined && Object.prototype.hasOwnProperty.call(rfEvent, 'id')) {
        dispatch(setCurrentEventIndex(index))
        dispatch(deleteEvent(rfEvent.id as string))
      }
      break
    }
  }
  return (
    <Fragment>
      <section>
        <h1>Hover over a row for options. Click a row for more details and options.</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {getStatus !== 'failed' && Array.isArray(eventList) ? (
              eventList.length > 0 ? (
                eventList.map((rfEvent: RainfocusEvent<string>, index) => {
                  return (
                    <Row key={`company-${rfEvent.id}`} backgroundColor={indexOfHoveredElement === index ? 'yellow' : 'white'} onMouseOver={() => setIndexOfHoveredElement(index)} onMouseLeave={() => setIndexOfHoveredElement(-1)} onPointerUp={() => handleRowClick(rfEvent, index)}>
                      <td>{rfEvent.name}</td>
                      <td>{rfEvent.description}</td>
                      <td>{rfEvent.company}</td>
                      {indexOfHoveredElement !== index ? (
                        <Fragment>
                          <td>
                            <Button disabled>add</Button>
                          </td>
                          <td>
                            <Button disabled>edit</Button>
                          </td>
                          <td>
                            <Button disabled>delete</Button>
                          </td>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <td>
                            <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'add')}>Add</button>
                          </td>
                          <td>
                            <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'edit', rfEvent)}>Edit</button>
                          </td>
                          <td>
                            <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'delete', rfEvent, index)}>Delete</button>
                          </td>
                        </Fragment>
                      )}
                    </Row>
                  )
                })
              ) : (
                <h1>No data points! Try adding some.</h1>
              )
            ) : (
              <h1>Something went wrong, please try again later</h1>
            )}
          </tbody>
        </table>
        {renderForm && <Form />}
        {postStatus === 'failed' && <h1>Failed to send your event. Please try again later.</h1>}
        {deleteStatus === 'failed' && <h1>Failed to delete your event. Please try again later.</h1>}
      </section>
    </Fragment>
  )
}

const Row = styled.tr<RowProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
`

const Button = styled.button`
  visibility: hidden;
`

export default App
