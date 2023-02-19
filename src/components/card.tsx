import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'

interface Props {
  url: string
  isFlipped: boolean
  setSelected: () => void
  isDisabled?: boolean
  isCorrect?: boolean
  isNotCorrect?: boolean
}

export const Card: FunctionComponent<Props> = memo(
  ({
    url,
    isFlipped,
    setSelected,
    isDisabled = false,
    isCorrect = false,
    isNotCorrect = false
  }) => {
    let borderColor = 'border-[#96ADCF]'
    if (isCorrect) borderColor = 'border-green-600'
    if (isNotCorrect) borderColor = 'border-red-600'

    let bgColor = 'bg-[#DBE2EF]'
    if (isFlipped) bgColor = 'bg-blue-50'

    return (
      <button
        onClick={setSelected}
        disabled={isDisabled}
        class={`${bgColor} p-2 border-2 ${borderColor} rounded-md shadow-md break-inside-avoid mb-7 block card`}
      >
        <img src={url} alt="icon" />
      </button>
    )
  }
)
