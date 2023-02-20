import { useSignal } from '@preact/signals'
import type { FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import '../node_modules/pattern.css/dist/pattern.css'
import { Card } from './components/card'
import { Dialog } from './components/dialog'

const IMAGES = [
  'git.svg',
  'html5.svg',
  'nodejs.svg',
  'php.svg',
  'typescript.svg',
  'javascript.svg',
  'python.svg',
  'java.svg',
  'redis.svg',
  'css3.svg'
]
  .map((icon) => `/images/${icon}`)
  .flatMap((icon) => [`a|${icon}`, `b|${icon}`])
  .sort(() => Math.random() - 0.5)

export const App: FunctionComponent = () => {
  const selected = useSignal<string[]>([])
  const allSelected = useSignal<string[]>([])
  const detectFail = useSignal<boolean>(false)

  function resetGame(): void {
    selected.value = []
    allSelected.value = []
  }

  function handleSelected(imageName: string): void {
    selected.value = [...selected.value, imageName]
  }

  useEffect(() => {
    if (selected.value.length === 2) {
      const [first, second] = selected.value

      if (first.split('|')[1] === second.split('|')[1]) {
        allSelected.value = [...allSelected.value, ...selected.value]
        selected.value = []
      } else {
        detectFail.value = true

        const timeoutId = setTimeout(() => {
          selected.value = []
          detectFail.value = false

          clearTimeout(timeoutId)
        }, 1_100)
      }
    }
  }, [selected.value])

  return (
    <>
      <header class="text-center py-8 mb-12">
        <h1 class="text-5xl font-semibold tracking-wide">
          Empareja las cartas
        </h1>
      </header>

      <main role="main" class="px-8 flex justify-center">
        <div class="columns-4 gap-x-[15px] sm:columns-5 sm:gap-x-[28px]">
          {IMAGES.map((image) => {
            const isSelected =
              selected.value.includes(image) ||
              allSelected.value.includes(image)
            const imageUrl = isSelected
              ? image.split('|')[1]
              : '/images/search.svg'

            return (
              <Card
                key={image}
                url={imageUrl}
                isFlipped={isSelected}
                isDisabled={isSelected || selected.value.length === 2}
                isCorrect={allSelected.value.includes(image)}
                isNotCorrect={
                  detectFail.value && selected.value.includes(image)
                }
                isNotHighlighted={
                  !selected.value.includes(image) && detectFail.value
                }
                setSelected={() => handleSelected(image)}
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
              class="border-2 border-[#112D4E] font-bold py-2 px-4 rounded mt-6 block mx-auto text-base bg-[#3F72AF] hover:bg-[#112D4E] text-white active:scale-110"
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
