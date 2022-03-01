import React, { ChangeEvent, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RainfocusEvent } from '../../types'
import { selectInputValues, setInputValue } from '../EventInfo/eventSlice'

interface InputProps {
  type: string
}

const Input = ({ type }: InputProps) => {
  const dispatch = useDispatch()
  const inputValues = useSelector(selectInputValues)
  const handleChange = (type: string, event: ChangeEvent) => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value
    switch (type) {
    case 'address':
      dispatch(setInputValue({ key: 'address', value: value }))
      break
    case 'color':
      dispatch(setInputValue({ key: 'color', value: value }))
      break
    case 'company':
      dispatch(setInputValue({ key: 'company', value: value }))
      break
    case 'createdOn':
      dispatch(setInputValue({ key: 'createdOn', value: value }))
      break
    case 'date':
      dispatch(setInputValue({ key: 'date', value: value }))
      break
    case 'description':
      dispatch(setInputValue({ key: 'description', value: value }))
      break
    case 'email':
      dispatch(setInputValue({ key: 'email', value: value }))
      break
    case 'id':
      dispatch(setInputValue({ key: 'id', value: value }))
      break
    case 'image':
      dispatch(setInputValue({ key: 'image', value: value }))
      break
    case 'isActive':
      dispatch(setInputValue({ key: 'isActive', value: value }))
      break
    case 'name':
      dispatch(setInputValue({ key: 'name', value: value }))
      break
    case 'phone':
      dispatch(setInputValue({ key: 'phone', value: value }))
      break
    case 'time':
      dispatch(setInputValue({ key: 'time', value: value }))
      break
    }
  }
  return (
    <Fragment>
      <tr>
        <td>
          <label htmlFor={type}>{type}: </label>
        </td>
        <td>
          <input type='text' name={type} onChange={event => handleChange(type, event)} value={inputValues[type]} />
        </td>
      </tr>
    </Fragment>
  )
}

export default Input
