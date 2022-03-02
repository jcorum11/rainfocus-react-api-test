import { RainfocusEvent } from '../types'

const api = {
  async getEvents() {
    try {
      const response = await fetch('https://rf-json-server.herokuapp.com/events/')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    } catch (error) {
      console.error(`Error on api.getEvents: ${error}`)
    }
  },
  async postEvent(rfEvent: RainfocusEvent<string>) {
    try {
      const response = await fetch('https://rf-json-server.herokuapp.com/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rfEvent)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    } catch (error) {
      console.error(`Error on api.postEvent: ${error}`)
    }
  },
  async putEvent(rfEvent: RainfocusEvent<string>) {
    try {
      const response = await fetch(`https://rf-json-server.herokuapp.com/events/${rfEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rfEvent)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    } catch (error) {
      console.error(`Error on api.putEvent: ${error}`)
    }
  },
  async deleteEvent(rfEventId: string) {
    try {
      const response = await fetch(`https://rf-json-server.herokuapp.com/events/${rfEventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    } catch (error) {
      console.error(`Error on api.deleteEvent: ${error}`)
    }
  }
}

export default api
export const postEvent = api.postEvent
export const getEvents = api.getEvents
export const putEvent = api.putEvent
export const deleteEvent = api.deleteEvent
