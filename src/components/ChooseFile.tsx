import { ChangeEventHandler, FC } from 'react'

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const ChooseFile: FC<Props> = ({ onChange }) => {
  return (
    <input
      className="form-input"
      type="file"
      accept="image/*"
      onChange={onChange}
    />
  )
}

export default ChooseFile