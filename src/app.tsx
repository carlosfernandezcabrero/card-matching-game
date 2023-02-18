import { useSignal } from '@preact/signals'
import type { FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'

const IMAGE_REPOSITORY_URL = 'https://icongr.am'
const IMAGE_SIZE = 80
const IMAGES = [
  `${IMAGE_REPOSITORY_URL}/devicon/git-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/html5-original-wordmark.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/nodejs-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/php-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/typescript-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/javascript-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/python-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/java-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/redis-original.svg?size=${IMAGE_SIZE}&color=currentColor`,
  `${IMAGE_REPOSITORY_URL}/devicon/css3-original.svg?size=${IMAGE_SIZE}&color=currentColor`
]
  .flatMap((icon) => [`a|${icon}`, `b|${icon}`])
  .sort(() => Math.random() - 0.5)

export const App: FunctionComponent = () => {
  const selected = useSignal<string[]>([])
  const allSelected = useSignal<string[]>([])
  const selectedValue = selected.value
  const allSelectedValue = allSelected.value

  useEffect(() => {
    if (selectedValue.length === 2) {
      const [first, second] = selectedValue

      if (first.split('|')[1] === second.split('|')[1]) {
        allSelected.value = [...allSelectedValue, ...selectedValue]
      }

      setTimeout(() => (selected.value = []), 600)
    }
  }, [selectedValue])

  return (
    <>
      <header class="text-center py-8 mb-12">
        <h1 class="text-5xl text-[#DEA01E] font-semibold tracking-wide">
          Empareja las cartas
        </h1>
      </header>
      <main role="main" class="px-8 flex justify-center">
        <div class="columns-5 gap-x-7">
          {IMAGES.map((image) => {
            const url = image.split('|')[1]
            const isSelected =
              selectedValue.includes(image) || allSelectedValue.includes(image)

            const imageUrl = isSelected
              ? url
              : `${IMAGE_REPOSITORY_URL}/clarity/search.svg?size=${IMAGE_SIZE}&color=currentColor`

            return (
              <button
                key={image}
                onClick={() => (selected.value = [...selectedValue, image])}
                disabled={isSelected || selectedValue.length === 2}
                class="bg-gray-700 p-2 border border-[#96ADCF] rounded-md shadow-lg break-inside-avoid mb-7 block"
              >
                <img src={imageUrl} alt="icon" />
              </button>
            )
          })}
        </div>
      </main>
    </>
  )
}