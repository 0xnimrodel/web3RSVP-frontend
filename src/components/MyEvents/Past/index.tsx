import Dashboard from '@components/UI/Dashboard'
import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import EventCard from '@components/UI/EventCard'
import { MY_PAST_EVENTS } from '@utils/gql/queries'
import { Event } from 'src/types'

export default function MyPastEvents() {
  const { data: account } = useAccount()
  const page = 'my-events'

  const eventOwner = account ? account.address?.toLowerCase() : ''
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  )

  const { loading, error, data } = useQuery(MY_PAST_EVENTS, {
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
          {data && data.events.length == 0 && <p>No past events found</p>}
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
                  <Link href={`/my-events/past/${event.id}`}>
                    <a className="text-sky-600 text-sm truncate hover:underline pl-4">
                      Confirm attendees
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your events</p>
          <ConnectButton />
        </div>
      )}
    </div>
    </Dashboard>
  )
}
