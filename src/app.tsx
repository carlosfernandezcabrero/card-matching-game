import { useSignal } from '@preact/signals'
import { useAtom } from 'jotai'
import type { FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import '../node_modules/pattern.css/dist/pattern.css'
import { Card } from './components/card'
import { selectedAtom } from './states'

const IMAGE_REPOSITORY_URL = '/public/images'
const IMAGES = [
  `${IMAGE_REPOSITORY_URL}/git.svg`,
  `${IMAGE_REPOSITORY_URL}/html5.svg`,
  `${IMAGE_REPOSITORY_URL}/nodejs.svg`,
  `${IMAGE_REPOSITORY_URL}/php.svg`,
  `${IMAGE_REPOSITORY_URL}/typescript.svg`,
  `${IMAGE_REPOSITORY_URL}/javascript.svg`,
  `${IMAGE_REPOSITORY_URL}/python.svg`,
  `${IMAGE_REPOSITORY_URL}/java.svg`,
  `${IMAGE_REPOSITORY_URL}/redis.svg`,
  `${IMAGE_REPOSITORY_URL}/css3.svg`
]
  .flatMap((icon) => [`a|${icon}`, `b|${icon}`])
  .sort(() => Math.random() - 0.5)

export const App: FunctionComponent = () => {
  const [selected, setSelected] = useAtom(selectedAtom)
  const allSelected = useSignal<string[]>([])
  const allSelectedValue = allSelected.value

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected

      if (first.split('|')[1] === second.split('|')[1]) {
        allSelected.value = [...allSelectedValue, ...selected]
        setSelected([])
      } else {
        const timeoutId = setTimeout(() => {
          setSelected([])
          clearTimeout(timeoutId)
        }, 1_100)
      }
    }
  }, [selected])

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
              selected.includes(image) || allSelectedValue.includes(image)
            const imageUrl = isSelected
              ? image.split('|')[1]
              : `${IMAGE_REPOSITORY_URL}/search.svg`

            return (
              <Card
                key={image}
                url={imageUrl}
                imageName={image}
                isDisabled={isDisabled}
                isCorrect={isCorrect}
              />
            )
          })}
        </div>
      </main>

      {allSelected.value.length === IMAGES.length && (
        <Dialog>
          <header>
            <h2 class="text-5xl text-center font-extrabold text-green-600">
              ¡Felicidades!
            </h2>
          </header>
          <div class="my-16" />
          <footer>
            <button
              class="border-2 border-[#112D4E] font-bold py-2 px-4 rounded mt-6 block mx-auto text-lg bg-[#F9F7F7] hover:bg-[#DBE2EF] text-gray-800 active:scale-110"
              onClick={resetGame}
            >
              Volver a jugar
            </button>
          </footer>
        </Dialog>
      )}
    </>
  )
}
