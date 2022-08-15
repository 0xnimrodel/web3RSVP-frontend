import { BigNumber, Bytes } from "ethers"

export type Event = {
  id: Bytes
  eventId: Bytes
  name: string
  description: string
  link: string
  imageUrl: string
  eventOwner: Bytes
  eventTimestamp: number
  
  maxCapacity: BigNumber
  deposit: BigNumber
  paidOut: boolean
  totalRSVPs: BigNumber
  totalConfirmedAttendees: BigNumber
  rsvps: [RSVP] 
  confirmedAttendees: [Confirmation]
}

export type Account = {
  id: Bytes
  totalRSVPs: BigNumber
  totalAttendedEvents: BigNumber
  rsvps: [RSVP] 
  attendedEvents: [Confirmation]
}

export type RSVP = {
  id: Bytes
  attendee: Account
  event: Event
}

export type Confirmation = {
  id: Bytes
  attendee: Account
  event: Event
}
