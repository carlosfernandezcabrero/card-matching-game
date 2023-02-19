import { useAtom } from 'jotai'
import type { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'
import { selectedAtom } from '../states'

interface Props {
  url: string
  isDisabled: boolean
  imageName: string
}

export const Card: FunctionComponent<Props> = memo(
  ({ url, isDisabled, imageName }) => {
    const [, setSelected] = useAtom(selectedAtom)

    function handleClick(): void {
      setSelected((prev) => [...prev, imageName])
    }

    return (
      <button
        onClick={handleClick}
        disabled={isDisabled}
        class="bg-gray-700 p-2 border border-[#96ADCF] rounded-md shadow-lg break-inside-avoid mb-7 block"
      >
        <img src={url} alt="icon" />
      </button>
    )
  }
)
