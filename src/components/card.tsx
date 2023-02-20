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
    let bgColor = 'bg-[#DBE2EF]'

    if (!url.includes('search')) {
      if (isCorrect) borderColor = 'border-green-600'
      if (isNotCorrect) borderColor = 'border-red-600'
      if (isFlipped) bgColor = 'bg-blue-50'
    }

    return (
      <button
        onClick={setSelected}
        disabled={isDisabled}
        class={`${bgColor} p-[4px] border-2 ${borderColor} rounded-md shadow-md break-inside-avoid mb-[15px] lg:mb-[30px] block card`}
      >
        <img src={url} alt="icon" width={70} height={70} />
      </button>
    )
  }
)
