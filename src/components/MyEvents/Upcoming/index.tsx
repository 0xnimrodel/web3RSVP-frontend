import Dashboard from '@components/UI/Dashboard'
import { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import EventCard from '@components/UI/EventCard'
import { MY_UPCOMING_EVENTS } from '@utils/gql/queries'
import { Event } from 'src/types'

export default function MyUpcomingEvents() {
  const { data: account } = useAccount()
  const page = 'my-events'

  const eventOwner = account ? account.address?.toLowerCase() : ''
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  )
  const { loading, error, data } = useQuery(MY_UPCOMING_EVENTS, {
    variables: { eventOwner, currentTimestamp },
  })

  if (loading)
    return (
      <Dashboard page={page}>
        <p  className="sm:w-10/12 sm:pl-8">Loading...</p>
      </Dashboard>
    )
  if (error)
    return (
      <Dashboard page={page}>
        <p  className="sm:w-10/12 sm:pl-8">Error! {error.message}</p>
      </Dashboard>
    )

  return (
    <Dashboard page={page}>
      <div className="sm:w-10/12 sm:pl-8">
        {account ? (
          <div>
            {data && data.events.length == 0 && <p>No upcoming events found</p>}
            {data && data.events.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
              >
                {data.events.map((event: Event, idx: number) => (
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
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <p className="mb-4">
              Please connect your wallet to view your events
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
    </Dashboard>
  )
}
