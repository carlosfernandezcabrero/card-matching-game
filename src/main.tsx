import { render } from 'preact'
import { App } from './app'
import './index.css'

const htmlElement = document.getElementById('app') as HTMLElement

render(<App />, htmlElement)
