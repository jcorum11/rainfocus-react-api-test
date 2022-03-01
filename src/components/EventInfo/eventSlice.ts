import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RainfocusEvent } from '../../types'
import { RootState } from '../../store'
import { RfEventState } from '../../types'
import api from '../../api'

export const postEvent = createAsyncThunk('events/postEvent', async (rfEvent: RainfocusEvent<string>) => {
  const response = await api.postEvent(rfEvent)
  return await response.json()
})

export const getEvents = createAsyncThunk('events/getEvent', async () => {
  const response = await api.getEvents()
  return await response.json()
})

export const putEvent = createAsyncThunk('events/putEvent', async (rfEvent: RainfocusEvent<string>) => {
  const response = await api.putEvent(rfEvent)
  return await response.json()
})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (rfEventId: string) => {
  const response = await api.deleteEvent(rfEventId)
  return await response.json()
})

const initialState: RfEventState = {
  currentEvent: {
    address: '',
    color: '',
    company: '',
    createdOn: '',
    date: '',
    description: '',
    email: '',
    id: '',
    image: '',
    isActive: '',
    name: '',
    phone: '',
    time: ''
  },
  currentEventIndex: -1,
  postStatus: 'idle',
  getStatus: 'idle',
  putStatus: 'idle',
  deleteStatus: 'idle',
  eventList: [],
  renderForm: false,
  inputValues: {
    address: '',
    color: '',
    company: '',
    createdOn: '',
    date: '',
    description: '',
    email: '',
    id: '',
    image: '',
    isActive: '',
    name: '',
    phone: '',
    time: ''
  }
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<RainfocusEvent<string>>) => {
      state.currentEvent = action.payload
    },
    setRenderForm: (state, action: PayloadAction<boolean>) => {
      state.renderForm = action.payload
    },
    setInputValue: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload
      state.inputValues[key] = value
    },
    setCurrentEventIndex: (state, action: PayloadAction<number>) => {
      state.currentEventIndex = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getEvents.pending, state => {
      state.getStatus = 'pending'
    }),
    builder.addCase(postEvent.pending, state => {
      state.postStatus = 'pending'
    }),
    builder.addCase(putEvent.pending, state => {
      state.putStatus = 'pending'
    }),
    builder.addCase(deleteEvent.pending, state => {
      state.deleteStatus = 'pending'
    }),
    builder.addCase(getEvents.rejected, state => {
      state.getStatus = 'failed'
    }),
    builder.addCase(postEvent.rejected, state => {
      state.postStatus = 'failed'
    }),
    builder.addCase(putEvent.rejected, state => {
      state.putStatus = 'failed'
    }),
    builder.addCase(deleteEvent.rejected, state => {
      state.deleteStatus = 'failed'
    }),
    builder.addCase(getEvents.fulfilled, (state, action: PayloadAction<RainfocusEvent<string>[]>) => {
      state.getStatus = 'succeeded'
      state.eventList = action.payload
    }),
    builder.addCase(postEvent.fulfilled, (state, action: PayloadAction<RainfocusEvent<string>>) => {
      state.postStatus = 'succeeded'
      state.eventList.push(action.payload)
    }),
    builder.addCase(putEvent.fulfilled, (state, action: PayloadAction<RainfocusEvent<string>>) => {
      state.putStatus = 'succeeded'
      const index = state.eventList.indexOf(action.payload)
      if (index > -1) {
        state.eventList.splice(index, 1, action.payload)
      }
    }),
    builder.addCase(deleteEvent.fulfilled, (state) => {
      state.deleteStatus = 'succeeded'
      console.log(state.currentEventIndex)
      if (state.currentEventIndex > -1) {
        state.eventList.splice(state.currentEventIndex, 1)
      }
    })
  }
})

export const { setEvent, setRenderForm, setInputValue, setCurrentEventIndex } = eventsSlice.actions
export const selectCurrentEvent = (state: RootState) => state.events.currentEvent
export const selectRenderForm = (state: RootState) => state.events.renderForm
export const selectPostStatus = (state: RootState) => state.events.postStatus
export const selectEventList = (state: RootState) => state.events.eventList
export const selectInputValues = (state: RootState) => state.events.inputValues
export const selectCurrentEventIndex = (state: RootState) => state.events.currentEventIndex

export default eventsSlice.reducer
