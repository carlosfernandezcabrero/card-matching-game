import { useAtom } from 'jotai'
import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'
import { selectedAtom } from '../states'

interface Props {
  url: string
  isFlipped: boolean
  setSelected: () => void
  isDisabled?: boolean
  isCorrect?: boolean
}

export const Card: FunctionComponent<Props> = memo(
  ({
    isFlipped,
    setSelected,
    isCorrect = false,
    isNotCorrect = false
  }) => {
    let borderColor = 'border-[#96ADCF]'
    if (isCorrect) borderColor = 'border-green-600'
    if (isNotCorrect) borderColor = 'border-red-600'

    function handleClick(): void {
      setSelected((prev) => [...prev, imageName])
    }

    return (
      <button
        onClick={setSelected}
        disabled={isDisabled}
        class={`bg-gray-700 p-2 border ${
          isCorrect ? 'border-green-500' : 'border-[#96ADCF]'
        } rounded-md shadow-lg break-inside-avoid mb-7 block`}
      >
        <img src={url} alt="icon" />
      </button>
    )
  }
)
