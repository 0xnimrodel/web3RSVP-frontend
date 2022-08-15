import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import EventCard from '@components/UI/EventCard'
import { MY_UPCOMING_RSVPS } from '@utils/gql/queries'
import { RSVP } from 'src/types'
import Dashboard from '@components/UI/Dashboard'
import Notifications from '@components/UI/Notifications'
import ConnectMessage from '@components/UI/ConnectMessage'

export default function MyUpcomingRSVPs() {
  const { data: account } = useAccount()
  const page = 'my-rsvps'

  const id = account ? account.address?.toLowerCase() : ''
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime())
  const { loading, error, data } = useQuery(MY_UPCOMING_RSVPS, {
    variables: { id },
  })

  if (loading || error) {
    return <Notifications error={error} loading={loading} page={page} />
  }

  return (
    <Dashboard page={page}>
      <div className="sm:w-10/12 sm:pl-8">
        {account ? (
          <div>
            {data && !data.account && <p>No upcoming RSVPs found</p>}
            {data && data.account && (
              <ul role="list" className="event-list">
                {data.account.rsvps.map(function (rsvp: RSVP, idx: number) {
                  if (rsvp.event.eventTimestamp > currentTimestamp) {
                    return (
                      <li key={idx}>
                        <EventCard
                          id={rsvp.event.id}
                          name={rsvp.event.name}
                          eventTimestamp={rsvp.event.eventTimestamp}
                          imageUrl={rsvp.event.imageUrl}
                        />
                      </li>
                    )
                  }
                })}
              </ul>
            )}
          </div>
        ) : (
          <ConnectMessage page={'rsvps'} />
        )}
      </div>
    </Dashboard>
  )
}
