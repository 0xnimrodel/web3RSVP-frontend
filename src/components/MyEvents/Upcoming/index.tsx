import Dashboard from '@components/UI/Dashboard'
import { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import EventCard from '@components/UI/EventCard'
import { MY_UPCOMING_EVENTS } from '@utils/gql/queries'
import { Event } from 'src/types'
import Notifications from '@components/UI/Notifications'
import ConnectMessage from '@components/UI/ConnectMessage'

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

  if (loading || error) {
    return <Notifications error={error} loading={loading} page={page} />
  }

  return (
    <Dashboard page={page}>
      <div className="sm:w-10/12 sm:pl-8">
        {account ? (
          <div>
            {data && data.events.length == 0 && <p>No upcoming events found</p>}
            {data && data.events.length > 0 && (
              <ul role="list" className="event-list">
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
          <ConnectMessage page={'events'} />
        )}
      </div>
    </Dashboard>
  )
}
