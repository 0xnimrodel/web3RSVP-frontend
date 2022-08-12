import { useState } from "react"

export default function SearchBar() {

  const [searchResult, setSearchResult] = useState([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='w-80 ml-4 mb-4'> 
      <div aria-hidden='true' className='max-w-xs'>
        <input
          className='h-8 p-4 text-sm w-full border rounded-md focus:outline-sky-500 dark:border-slate-800 bg-slate-800'
          placeholder='Search'
          onChange={handleSearch}
          value={searchQuery}
        />

        {/* {isOpen && (
          <div
            className='flex absolute flex-col mt-2 w-full sm:max-w-md '
            ref={dropdownRef}
          >
            {searchQuery.length > 0 && (
              <div className='rounded-none sm:rounded-xl border dark:border-neutral-600 bg-white dark:bg-neutral-800 overflow-y-auto py-2 max-h-[80vh] dark:text-neutral-200'>
                {/* {searchResult.map((profile, index) => {
                  return (
                    
                  )
                })} *
                {searchResult.length === 0 && (
                  <div className='py-2 px-4'>No matching profiles</div>
                )}
              </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  )
}
