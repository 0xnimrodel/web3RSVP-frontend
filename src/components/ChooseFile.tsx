import { ChangeEventHandler, FC } from 'react'

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const ChooseFile: FC<Props> = ({ onChange }) => {
  return (
    <input
      className="max-w-lg dark:text-gray-900 bg-gray-200 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
      type="file"
      accept="image/*"
      onChange={onChange}
    />
  )
}

export default ChooseFile