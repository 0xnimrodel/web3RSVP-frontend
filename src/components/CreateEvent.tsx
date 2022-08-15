import { useState, useEffect, ChangeEvent, Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import getRandomImage from '@utils/getRandomImage'
import { ethers } from 'ethers'
import connectContract from '@utils/connectContract'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Alert from '@components/UI/Alert'
import ChooseFile from './ChooseFile'
import { storeData } from '@utils/web3-storage'
import Image from 'next/image'

export default function CreateEvent() {
  const { data: account } = useAccount()

  const [success, setSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [eventId, setEventId] = useState(null)

  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('')
  const [refund, setRefund] = useState('')
  const [eventLink, setEventLink] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [showImgLarger, setShowImgLarger] = useState<boolean>(false)
  const [image, setImage] = useState<ImageSrc>()

  type ImageSrc = {
    file: File
    url: string
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      console.log('file', file)
      setImage({ file, url: URL.createObjectURL(file) })
    }
  }

  console.log('account', account)

  async function handleSubmit(e: any) {
    e.preventDefault()

    const body = {
      name: eventName,
      description: eventDescription,
      link: eventLink,
      image: `/${image?.file.name}`,
    }
    console.log(body)
    try {
      const cid = await storeData(body, image?.file)
      if (cid) {
        await createEvent(cid)
      } else {
        alert('Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert(`Something went wrong. Please try again later. Error: ${error}`)
    }
  }

  const createEvent = async (cid: string) => {
    try {
      const rsvpContract = connectContract()
      console.log(rsvpContract)

      if (rsvpContract) {
        let deposit = ethers.utils.parseEther(refund)
        let eventDateAndTime = new Date(`${eventDate} ${eventTime}`)
        let eventTimestamp = eventDateAndTime.getTime()
        let eventDataCID = cid

        const txn = await rsvpContract.createNewEvent(
          eventTimestamp,
          deposit,
          maxCapacity,
          eventDataCID,
          { gasLimit: 900000 }
        )
        setLoading(true)
        console.log('Minting...', txn.hash)
        await txn.wait()
        console.log('Minted -- ', txn.hash)
        let wait = await txn.wait()
        console.log(eventId)
        setEventId(wait.events[0].args[0])
        setSuccess(true)
        setLoading(false)
        setMessage('Your event has been created successfully.')
      } else {
        console.log('Error getting contract')
      }
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setMessage(`There was an error creating your event. Error: ${error}`)
      setLoading(false)
    }
  }

  const enlargeImage = (image: string) => {}

  // useEffect(() => {
  //   // disable scroll on <input> elements of type number
  //   document.addEventListener('wheel', (event) => {
  //     if (document.activeElement?.type === 'number') {
  //       document.activeElement.blur()
  //     }
  //   })
  // })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create your event | web3rsvp</title>
        <meta
          name="description"
          content="Create your virtual event on the blockchain"
        />
      </Head>
      <section className="relative py-12">
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

        {!success && (
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-sky-500 sm:text-4xl md:text-5xl mb-4">
            Create your virtual event
          </h1>
        )}

        {account && !success && (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="space-y-6 sm:space-y-5">
              <div className="form-item-container">
                <label htmlFor="eventname" className="form-label">
                  Event name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="event-name"
                    name="event-name"
                    type="text"
                    className="form-input"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-item-container">
                <label htmlFor="date" className="form-label">
                  Date & time
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    Your event date and time
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 flex flex-wrap sm:flex-nowrap gap-2">
                  <div className="w-1/2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="form-input"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>

                  <div className="w-1/2">
                    <input
                      id="time"
                      name="time"
                      type="time"
                      className="form-input"
                      required
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-item-container">
                <label htmlFor="max-capacity" className="form-label">
                  Max capacity
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    Limit the number of spots available for your event.
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="max-capacity"
                    id="max-capacity"
                    min="1"
                    placeholder="100"
                    className="form-input"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-item-container">
                <label htmlFor="max-capacity" className="form-label">
                  Event Image
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    An image for your event
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center space-x-3">
                    <ChooseFile
                      onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                        handleUpload(evt)
                      }
                    />
                    {uploading && (
                      <span
                        className="h-5 w-5 border-2 border-brand-200 border-t-brand-600"
                        animate-spin
                        rounded-full
                      />
                    )}
                  </div>
                  {image && (
                    <div className="h-36 mt-4 relative form-input">
                      <Image
                        // onClick={() => {
                        //   setShowImgLarger(true)
                        // }}
                        src={image.url}
                        layout="fill"
                        objectFit="contain"
                        className="shadow-md border-4 rounded-md overflow-hidden m-auto hover:cursor-zoom-in"
                        alt="image of the event"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-item-container">
                <label htmlFor="refundable-deposit" className="form-label">
                  Refundable deposit
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    Require a refundable deposit (in MATIC) to reserve one spot
                    at your event
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="refundable-deposit"
                    id="refundable-deposit"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    placeholder="0.00"
                    className="form-input"
                    value={refund}
                    onChange={(e) => setRefund(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-item-container">
                <label htmlFor="event-link" className="form-label">
                  Event link
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    The link for your virtual event
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="event-link"
                    name="event-link"
                    type="text"
                    className="form-input"
                    required
                    value={eventLink}
                    onChange={(e) => setEventLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-item-container">
                <label htmlFor="about" className="form-label">
                  Event description
                  <p className="mt-2 text-sm text-gray-200">
                    Let people know what your event is about!
                  </p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={10}
                    className="form-input"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <Link href="/">
                  <a className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:bg-gray-400 focus:scale-95 transition-all duration-150 ease-in-out">
                    Cancel
                  </a>
                </Link>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-sky-500 hover:bg-indigo-700 dark:hover:bg-sky-400 focus:outline-none  focus:ring-indigo-500 dark:focus:bg-sky-700 focus:scale-95 transition-transform duration-150 ease-in-out"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        )}
        {success && eventId && (
          <div>
            Success! Please wait a few minutes, then check out your event page{' '}
            <span className="font-bold text-sky-500">
              <Link href={`/event/${eventId}`}>here</Link>
            </span>
          </div>
        )}
        {!account && (
          <section className="flex flex-col items-start py-8">
            <p className="mb-4">Please connect your wallet to create events.</p>
            <ConnectButton />
          </section>
        )}

        {/* {showImgLarger && (
          <Transition
            show={showImgLarger}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <Dialog
              className="relative z-50"
              open={showImgLarger}
              onClose={() => setShowImgLarger(false)}
            >
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="flex min-h-full items-center justify-center">
                  <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
                    <Image
                      onClick={() => {
                        setShowImgLarger(true)
                      }}
                      src={image?.url!}
                      layout="fill"
                      objectFit="contain"
                      className="shadow-md border-4 rounded-md overflow-hidden hover:cursor-zoom-in m-4"
                      alt="image of the event"
                    />
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition>
        )} */}
      </section>
    </div>
  )
}
