import Landing from '@components/UI/Landing'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import EventCard from '@components/UI/EventCard'
import { Event } from 'src/types'
import { UPCOMING_EVENTS } from '@utils/gql/queries'
import SearchBar from './SearchBar'
import { useAccount } from 'wagmi'

export default function Events() {
  const { data: account } = useAccount()
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  )
  const { loading, error, data } = useQuery(UPCOMING_EVENTS, {
    variables: { currentTimestamp },
  })

  if (loading)
    return (
      <Landing>
        <p>Loading...</p>
      </Landing>
    )
  if (error)
    return (
      <Landing>
        <p>Error! {error.message}</p>
      </Landing>
    )
  return (
    <div className='p-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex md:block items-center justify-between'>
      {/* <SearchBar /> */}
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:gap-x-6"
      >
        {data &&
          data.events.map((event: Event, idx: number) => (
            <li key={idx}>
              <EventCard
                id={event.id}
                name={event.name}
                eventTimestamp={event.eventTimestamp}
                imageUrl={event.imageUrl}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
