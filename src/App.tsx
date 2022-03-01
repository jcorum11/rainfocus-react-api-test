import React, { Fragment, useEffect, useState, PointerEvent } from 'react'
import './App.css'
import styled from 'styled-components'
import { RainfocusEvent, RowProps } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, selectRenderForm, setEvent, setRenderForm, selectEventList, deleteEvent } from './components/EventInfo/eventSlice'
import { useNavigate } from 'react-router-dom'
import Form from './components/Form'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [eventList, setEventList] = useState<Promise<RainfocusEvent[]> | RainfocusEvent[]>([])
  const [indexOfHoveredElement, setIndexOfHoveredElement] = useState(-1)
  const renderForm = useSelector(selectRenderForm)
  const eventList = useSelector(selectEventList)
  useEffect(() => {
    dispatch(getEvents())
  }, [])
  const handleRowClick = (rfEvent: RainfocusEvent<string>) => {
    dispatch(setEvent(rfEvent))
    navigate('/event')
  }
  const handleButtonClick = (event: PointerEvent, type: 'add' | 'edit' | 'delete', rfEvent?: RainfocusEvent<string>,) => {
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
      if (rfEvent !== undefined && Object.prototype.hasOwnProperty.call(rfEvent, 'id')) {
        dispatch(setEvent(rfEvent))
        dispatch(deleteEvent(rfEvent.id as string))
      }
      break
    }
  }
  return (
    <Fragment>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(eventList) &&
              eventList.length > 0 &&
              eventList.map((rfEvent: RainfocusEvent<string>, index) => {
                return (
                  <Row key={`company-${rfEvent.id}`} backgroundColor={indexOfHoveredElement === index ? 'yellow' : 'white'} onMouseOver={() => setIndexOfHoveredElement(index)} onMouseLeave={() => setIndexOfHoveredElement(-1)} onPointerUp={() => handleRowClick(rfEvent)}>
                    <td>{rfEvent.name}</td>
                    <td>{rfEvent.description}</td>
                    <td>{rfEvent.company}</td>
                    {indexOfHoveredElement === index && (
                      <Fragment>
                        <td>
                          <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'add')}>Add</button>
                        </td>
                        <td>
                          <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'edit', rfEvent)}>Edit</button>
                        </td>
                        <td>
                          <button onPointerUp={(event: PointerEvent) => handleButtonClick(event, 'delete', rfEvent)}>Delete</button>
                        </td>
                      </Fragment>
                    )}
                  </Row>
                )
              })}
          </tbody>
        </table>
        {renderForm && <Form />}
      </section>
    </Fragment>
  )
}

const Row = styled.tr<RowProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
`

export default App
