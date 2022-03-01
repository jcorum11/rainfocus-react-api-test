import { RainfocusEvent } from '../types'

const api = {
  async getEvents() {
    const response = await fetch('https://rf-json-server.herokuapp.com/events/')
    return response
  },
  async postEvent(rfEvent: RainfocusEvent<string>) {
    const response = await fetch('https://rf-json-server.herokuapp.com/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rfEvent)
    })
    return response
  },
  async putEvent(rfEvent: RainfocusEvent<string>) {
    console.log(rfEvent)
    const response = await fetch(`https://rf-json-server.herokuapp.com/events/${rfEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rfEvent)
    })
    return response
  },
  async deleteEvent(rfEventId: string) {
    const response = await fetch(`https://rf-json-server.herokuapp.com/events/${rfEventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }
}

export default api
export const postEvent = api.postEvent
export const getEvents = api.getEvents
export const putEvent = api.putEvent
export const deleteEvent = api.deleteEvent
