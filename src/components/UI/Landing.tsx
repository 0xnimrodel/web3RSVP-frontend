import Head from 'next/head'
import Link from 'next/link'

export default function Landing({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>web3rsvp</title>
        <meta
          name="description"
          content="Find, join, and create virtual events with your web3 frens"
        />
      </Head>
      <section className="py-12 flex h-screen-md items-center">
        <div className="w-full md:w-8/12 text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
            <span>Discover what&apos;s happening in the </span>
            <span className="text-sky-500">metaverse</span>
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-8">
            Find, join, and create virtual events with your web3 frens!
          </p>
          {/* <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-100 border-2 dark:hover:bg-sky-900 dark:border-sky-600 scale-105 hover:scale-110 transition-all mr-8 hover:cursor-pointer"> */}
            <Link  href="/events" passHref><span className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-100 border-2 dark:hover:bg-sky-900 dark:border-sky-600 scale-105 hover:scale-110 transition-all mr-8 hover:cursor-pointer'>All Events</span></Link>
          {/* </div> */}
          {/* <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-100 border-2 dark:border-sky-600 dark:bg-sky-600 scale-105 hover:scale-110 transition-all  hover:cursor-pointer"> */}
            <Link href="/create-event" passHref>
              <span className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-100 border-2 dark:border-sky-600 dark:bg-sky-600 scale-105 hover:scale-110 transition-all  hover:cursor-pointer'>Create Event</span>
            </Link>
          {/* </div> */}
        </div>
      </section>
      {/* <section className="py-12">{children}</section> */}
    </div>
  )
}
