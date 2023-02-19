import { useAtom } from 'jotai'
import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'
import { selectedAtom } from '../states'

interface Props {
  url: string
  setSelected: () => void
  isDisabled?: boolean
  isCorrect?: boolean
}

export const Card: FunctionComponent<Props> = memo(
    setSelected,

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
