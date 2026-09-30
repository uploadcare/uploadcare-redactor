import {vi} from 'vitest'
import {page, userEvent} from 'vitest/browser'

export const JQUERY = '/node_modules/jquery/dist/jquery.min.js'
export const PLUGIN = '/dist/uploadcare.redactor.min.js'
// see vitest.config.mjs; the demo project only accepts images
export const PUBLIC_KEY = __UPLOADCARE_PUBLIC_KEY__ || 'demopublickey'
export const ACCEPTS_ANY_FILE = Boolean(__UPLOADCARE_PUBLIC_KEY__)

const UPLOAD_TIMEOUT = 60_000

export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = src
    script.onload = resolve
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

export function loadStyle(href) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

// scripts run in order: jQuery, then the editor, then the plugin
export async function loadPage({styles = [], scripts = []}) {
  styles.forEach(loadStyle)

  for (const src of scripts) {
    await loadScript(src)
  }
}

export function waitForWidget() {
  return vi.waitUntil(() => window.uploadcare, {timeout: 30_000})
}

let editorCount = 0

// each test gets its own editor in its own box
export function mountTextarea(html = '<p>Start text</p>') {
  editorCount += 1

  const box = document.createElement('div')
  const textarea = document.createElement('textarea')

  box.id = `box-${editorCount}`
  textarea.id = `editor-${editorCount}`
  textarea.value = html
  box.appendChild(textarea)
  document.body.appendChild(box)

  return {box, textarea}
}

export function makeImage(name = 'square.png', color = '#c83c3c') {
  const canvas = document.createElement('canvas')

  canvas.width = 40
  canvas.height = 40

  const context = canvas.getContext('2d')

  context.fillStyle = color
  context.fillRect(0, 0, 40, 40)

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(new File([blob], name, {type: 'image/png'})), 'image/png')
  })
}

export function makeTextFile(name = 'notes.txt') {
  return new File(['Uploaded by the uploadcare-redactor tests'], name, {type: 'text/plain'})
}

export function dialog() {
  return document.querySelector('.uploadcare--dialog_status_active')
}

export function waitForDialog() {
  return vi.waitUntil(dialog, {timeout: 15_000})
}

// "Choose a local file" makes the widget add a file input to the file tab and
// click it; the click is stubbed so no native file picker opens
export async function chooseFiles(files) {
  const click = HTMLInputElement.prototype.click

  HTMLInputElement.prototype.click = function() {
    if (this.type !== 'file') {
      click.call(this)
    }
  }

  try {
    await page.getByRole('button', {name: 'Choose a local file'}).click()
  }
  finally {
    HTMLInputElement.prototype.click = click
  }

  const input = await vi.waitUntil(
    () => document.querySelector('.uploadcare--tab_name_file input[type=file]'),
    {timeout: 5_000}
  )

  await userEvent.upload(page.elementLocator(input), files)
}

// the dialog ends on the preview or crop step for one file and on the file
// list for several; both have a Done button that is enabled once uploads finish
export async function confirmDialog() {
  const done = await vi.waitUntil(() => {
    const buttons = document.querySelectorAll('.uploadcare--preview__done, .uploadcare--panel__done')

    return [...buttons].find(button => button.offsetParent && !button.disabled)
  }, {timeout: UPLOAD_TIMEOUT})

  await userEvent.click(done)
  await vi.waitUntil(() => !dialog(), {timeout: UPLOAD_TIMEOUT})
}

export async function closeDialog() {
  await userEvent.click(document.querySelector('.uploadcare--dialog__close'))
  await vi.waitUntil(() => !dialog(), {timeout: 5_000})
}

export function waitFor(check, timeout = UPLOAD_TIMEOUT) {
  return vi.waitUntil(check, {timeout})
}
