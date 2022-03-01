import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postEvent, selectInputValues, setRenderForm } from '../EventInfo/eventSlice'
import Input from '../Input.tsx'

const Form = () => {
  const dispatch = useDispatch()
  const inputValues = useSelector(selectInputValues)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const data = {
      address: inputValues.address,
      color: inputValues.color,
      company: inputValues.company,
      createdOn: inputValues.createdOn,
      date: inputValues.date,
      description: inputValues.description,
      email: inputValues.email,
      image: inputValues.image,
      id: inputValues.id,
      isActive: Boolean(inputValues.isActive),
      name: inputValues.name,
      phone: inputValues.phone,
      time: inputValues.time
    }
    dispatch(postEvent(data))
  }
  return (
    <form action='submit'>
      <table>
        <tbody>
          <Input type='address' />
          <Input type='color' />
          <Input type='company' />
          <Input type='createdOn' />
          <Input type='date' />
          <Input type='description' />
          <Input type='email' />
          <Input type='image' />
          <Input type='isActive' />
          <Input type='name' />
          <Input type='phone' />
          <Input type='time' />
        </tbody>
      </table>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => dispatch(setRenderForm(false))}>Cancel</button>
      </div>
    </form>
  )
}

export default Form
