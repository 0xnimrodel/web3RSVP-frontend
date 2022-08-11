import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import EventCard from '@components/UI/EventCard'
import { MY_PAST_RSVPS } from '@utils/gql/queries'
import { RSVP } from 'src/types'
import Dashboard from '@components/UI/Dashboard'

export default function MyPastRSVPs() {
  const { data: account } = useAccount()
  const id = account ? account.address?.toLowerCase() : ''
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime())
  const { loading, error, data } = useQuery(MY_PAST_RSVPS, {
    variables: { id },
  })

  const page = 'my-rsvps'

  if (loading)
    return (
      <Dashboard page={page}>
        <p className="sm:w-10/12 sm:pl-8">Loading...</p>
      </Dashboard>
    )
  if (error)
    return (
      <Dashboard page={page}>
        <p className="sm:w-10/12 sm:pl-8">Error! {error.message}</p>
      </Dashboard>
    )
  if (data) console.log(data)

  return (
    <Dashboard page={page}>
      <div className="sm:w-10/12 sm:pl-8">
        {account ? (
          <div>
            {data && !data.account && <p>No past RSVPs found</p>}
            {data && data.account && (
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
              >
                {data.account.rsvps.map(function (rsvp: RSVP, idx: number) {
                  if (rsvp.event.eventTimestamp < currentTimestamp) {
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
          <div className="flex flex-col items-center py-8">
            <p className="mb-4">
              Please connect your wallet to view your rsvps
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
    </Dashboard>
  )
}
