import Head from 'next/head'
import DashboardNav from '@components/UI/DashboardNav'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import client from '../../../apollo-client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import connectContract from '@utils/connectContract'
import formatTimestamp from '@utils/formatTimestamp'
import Alert from '@components/UI/Alert'
import { Bytes } from 'ethers'
import { Event } from 'src/types'
import Dashboard from '@components/UI/Dashboard'

function PastEvent(data: any) {
  const event = data.event

  const { data: account } = useAccount()
  const [success, setSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [mounted, setMounted] = useState<boolean>(false)

  const confirmAttendee = async (attendee: Bytes) => {
    try {
      const rsvpContract = connectContract()

      if (rsvpContract) {
        const txn = await rsvpContract.confirmAttendee(event?.id, attendee)
        setLoading(true)
        console.log('Minting...', txn.hash)

        await txn.wait()
        console.log('Minted -- ', txn.hash)
        setSuccess(true)
        setLoading(false)
        setMessage('Attendance has been confirmed.')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      setSuccess(false)
      // setMessage(
      //   `Error: ${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}tx/${txn.hash}`
      // );
      setMessage('Error!')
      setLoading(false)
      console.log(error)
    }
  }

  const confirmAllAttendees = async () => {
    console.log('confirmAllAttendees')
    try {
      const rsvpContract = connectContract()

      if (rsvpContract) {
        console.log('contract exists')
        const txn = await rsvpContract.confirmAllAttendees(event?.id, {
          gasLimit: 300000,
        })
        console.log('await txn')
        setLoading(true)
        console.log('Mining...', txn.hash)

        await txn.wait()
        console.log('Mined -- ', txn.hash)
        setSuccess(true)
        setLoading(false)
        setMessage('All attendees confirmed successfully.')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      setSuccess(false)
      // setMessage(
      //   `Error: ${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}tx/${txn.hash}`
      // );
      setMessage('Error!')
      setLoading(false)
      console.log(error)
    }
  }

  function checkIfConfirmed(event: Event, address: Bytes) {
    for (let i = 0; i < event.confirmedAttendees.length; i++) {
      let confirmedAddress = event.confirmedAttendees[i].attendee.id
      if (
        confirmedAddress.toString().toLowerCase() ==
        address.toString().toLowerCase()
      ) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <div>
        <Head>
          <title>My Dashboard | web3rsvp</title>
          <meta name="description" content="Manage your events and RSVPs" />
        </Head>
        {/* <div className="flex flex-wrap py-8"> */}
        <Dashboard page="my-events">
          <div className="sm:w-10/12 sm:pl-8">
            {loading && (
              <Alert
                alertType={'loading'}
                alertBody={'Please wait'}
                triggerAlert={true}
                color={'white'}
              />
            )}
            {success && (
              <Alert
                alertType={'success'}
                alertBody={message}
                triggerAlert={true}
                color={'palegreen'}
              />
            )}
            {success === false && (
              <Alert
                alertType={'failed'}
                alertBody={message}
                triggerAlert={true}
                color={'palevioletred'}
              />
            )}

            {account ? (
              account.address?.toLowerCase() ===
              event?.eventOwner?.toString().toLowerCase() ? (
                <section>
                  <Link href="/my-events/past">
                    <a className="text-sky-600 text-sm hover:underline">
                      &#8592; Back
                    </a>
                  </Link>
                  <h6 className="text-sm mt-4 mb-2">
                    {formatTimestamp(event.eventTimestamp)}
                  </h6>
                  <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-8">
                    {event.name}
                  </h1>
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50 dark:bg-slate-800">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
                              >
                                Attendee
                              </th>
                              <th
                                scope="col"
                                className="text-right py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <button
                                  type="button"
                                  className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-sky-900 bg-indigo-100 dark:bg-sky-50 hover:scale-105 transition-all hover:bg-indigo-200 focus:outline-none"
                                  onClick={confirmAllAttendees}
                                >
                                  Confirm All
                                </button>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {event.rsvps.map((rsvp: any, idx: number) => (
                              <tr key={idx}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {rsvp.attendee.id}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  {checkIfConfirmed(event, rsvp.attendee.id) ? (
                                    <p>Confirmed</p>
                                  ) : (
                                    <button
                                      type="button"
                                      className="text-indigo-600 hover:text-indigo-900"
                                      onClick={() =>
                                        confirmAttendee(rsvp.attendee.id)
                                      }
                                    >
                                      Confirm attendee
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <p>You do not have permission to manage this event.</p>
              )
            ) : (
              <ConnectButton />
            )}
          </div>
        </Dashboard>
        {/* </div> */}
      </div>
    )
  )
}

export default PastEvent

export async function getServerSideProps(context: any) {
  const { id } = context.params

  const { data } = await client.query({
    query: gql`
      query Event($id: String!) {
        event(id: $id) {
          id
          eventId
          name
          eventOwner
          eventTimestamp
          maxCapacity
          totalRSVPs
          totalConfirmedAttendees
          rsvps {
            id
            attendee {
              id
            }
          }
          confirmedAttendees {
            attendee {
              id
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  })

  return {
    props: {
      event: data.event,
    },
  }
}
