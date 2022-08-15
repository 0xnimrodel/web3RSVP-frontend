import Dashboard from './Dashboard'

export default function Notifications({
  loading,
  error,
  page,
}: {
  loading: boolean
  error: any
  page: string
}) {
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
  return <></>
}
