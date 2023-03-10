import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'

interface Props {
  url: string
  setSelected: () => void
  isFlipped?: boolean
  isDisabled?: boolean
  isCorrect?: boolean
  isNotCorrect?: boolean
  isNotHighlighted?: boolean
}

export const Card: FunctionComponent<Props> = memo(
  ({
    url,
    setSelected,
    isFlipped = false,
    isDisabled = false,
    isCorrect = false,
    isNotCorrect = false,
    isNotHighlighted = false
  }) => {
    let borderColor = 'border-[#96ADCF]'
    let bgColor = 'bg-[#DBE2EF]'
    let highlightedStyle = 'opacity-100'

    if (isNotHighlighted) highlightedStyle = 'opacity-60'

    if (!url.includes('search')) {
      if (isCorrect) borderColor = 'border-green-600'
      if (isNotCorrect) borderColor = 'border-red-600'
      if (isFlipped) bgColor = 'bg-blue-50'
    }

    return (
      <button
        onClick={setSelected}
        disabled={isDisabled}
        class={`${bgColor} p-[4px] border-2 ${borderColor} rounded-md shadow-md break-inside-avoid mb-[15px] sm:mb-[28px] block card ${highlightedStyle}`}
      >
        <img src={url} alt="icon" width={70} height={70} />
      </button>
    )
  }
)
