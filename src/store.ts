import { configureStore } from '@reduxjs/toolkit'
import EventReducer from './components/EventInfo/eventSlice'

export const store = configureStore({
  reducer: {
    events: EventReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
