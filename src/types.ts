export interface RainfocusEvent<Type> {
  [index: string]: string | undefined | Type
  address: string
  color: string
  company: string
  createdOn: string
  date: string
  description: string
  email: string
  id?: string
  image: string
  isActive: Type
  name: string
  phone: string
  time: string
}

export type RowProps = {
  backgroundColor: string
}

export interface State {
  events: RainfocusEvent<string>[]
}

export interface Action {
  type: string
  events: RainfocusEvent<string>[]
}

export type Status = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface RfEventState {
  currentEvent: RainfocusEvent<string>
  postStatus: Status
  getStatus: Status
  putStatus: Status
  deleteStatus: Status
  eventList: RainfocusEvent<string>[]
  renderForm: boolean
  inputValues: RainfocusEvent<string>
}