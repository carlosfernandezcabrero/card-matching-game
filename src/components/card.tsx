import { useAtom } from 'jotai'
import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'
import { selectedAtom } from '../states'

interface Props {
  url: string
  imageName: string
  isDisabled?: boolean
  isCorrect?: boolean
}

export const Card: FunctionComponent<Props> = memo(
  ({ url, imageName, isDisabled = false, isCorrect = false }) => {
    const [, setSelected] = useAtom(selectedAtom)

    function handleClick(): void {
      setSelected((prev) => [...prev, imageName])
    }

    return (
      <button
        onClick={handleClick}
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
