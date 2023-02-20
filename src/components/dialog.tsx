import type { ComponentChildren, FunctionComponent } from 'preact'

interface Props {
  children: ComponentChildren
}

export const Dialog: FunctionComponent<Props> = ({ children }) => {
  return (
    <div class="absolute top-0 bg-gray-600/70 w-full h-full flex justify-center items-center">
      <dialog
        open
        class="dialog border-2 border-black rounded-md py-10 px-12 bg-background"
      >
        {children}
      </dialog>
    </div>
  )
}
