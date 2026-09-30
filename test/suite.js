import {afterEach, beforeAll, describe, expect, test} from 'vitest'
import pkg from '../package.json'
import {userEvent} from 'vitest/browser'
import {
  ACCEPTS_ANY_FILE,
  PUBLIC_KEY,
  chooseFiles,
  closeDialog,
  confirmDialog,
  dialog,
  loadPage,
  makeImage,
  makeTextFile,
  mountTextarea,
  waitFor,
  waitForDialog,
  waitForWidget,
} from './helpers'

// Runs every plugin case against one Redactor version, using the real editor,
// the real plugin build and real uploads to Uploadcare
export function defineSuite(adapter) {
  const {supports} = adapter

  function setup(options = {}, html) {
    const {box, textarea} = mountTextarea(html)
    const events = []

    adapter.create(textarea, {publicKey: PUBLIC_KEY, ...options}, event => events.push(event))

    return {box, events, named: name => events.filter(event => event.name === name)}
  }

  async function findButton(editor) {
    if (adapter.selectBlockFirst) {
      await userEvent.click(adapter.content(editor.box).querySelector('p'))
    }

    return waitFor(() => adapter.button(editor.box), 5_000)
  }

  async function openDialog(editor) {
    await userEvent.click(await findButton(editor))
    await waitForDialog()
  }

  async function upload(editor, files) {
    await openDialog(editor)
    await chooseFiles(files)
    await confirmDialog()
    await waitFor(() => editor.named('done').length)

    return editor.named('done')[0].data[0]
  }

  describe(adapter.name, () => {
    beforeAll(async () => {
      await loadPage(adapter)
      // stops the whole file with a clear message when the page has another
      // Redactor build than the one this file tests
      expect(String(adapter.version()), `${adapter.name} build on the page`).toMatch(adapter.expectedVersion)
      // the first editor loads the widget, the others reuse it
      setup()
      await waitForWidget()
    })

    afterEach(async () => {
      if (dialog()) {
        await closeDialog()
      }
    })

    describe('toolbar button', () => {
      test('is added with the default label', async () => {
        const button = await findButton(setup())

        expect(adapter.label(button)).toBe('Uploadcare')
      })

      test('uses buttonLabel', async () => {
        const button = await findButton(setup({buttonLabel: 'Add files'}))

        expect(adapter.label(button)).toBe('Add files')
      })

      test.runIf(supports.iconAlways)('shows the file icon by default', async () => {
        const button = await findButton(setup())

        if (adapter.defaultIcon) {
          expect(button.querySelector('i').className).toBe(adapter.defaultIcon)
        }
        else {
          expect(button.querySelector('svg')).not.toBeNull()
        }
      })

      test.runIf(supports.labelWithoutIcon)('shows the label and no icon by default', async () => {
        const button = await findButton(setup())

        expect(button.querySelector('i, svg')).toBeNull()
        expect(button.textContent.trim()).toBe('Uploadcare')
      })

      test.runIf(supports.buttonIconEnabled)('shows the file icon with buttonIconEnabled', async () => {
        const button = await findButton(setup({buttonIconEnabled: true}))

        expect(button.querySelector('i').className).toBe(adapter.defaultIcon)
      })

      test.runIf(supports.buttonIconEnabled || supports.iconAlways)('uses a buttonIcon class', async () => {
        const button = await findButton(setup({buttonIconEnabled: true, buttonIcon: 'my-upload-icon'}))

        expect(button.querySelector('i').className).toBe('my-upload-icon')
      })

      test.runIf(supports.svgIcon)('accepts SVG markup as buttonIcon', async () => {
        const svg = '<svg class="my-svg-icon" width="16" height="16"><rect width="16" height="16"/></svg>'
        const button = await findButton(setup({buttonIconEnabled: true, buttonIcon: svg}))

        expect(button.querySelector('svg.my-svg-icon')).not.toBeNull()
      })

      test('goes before the buttonBefore button', async () => {
        const editor = setup({buttonBefore: 'bold'})

        await findButton(editor)

        const names = adapter.buttonNames(editor.box)

        expect(names.indexOf('uploadcare')).toBe(names.indexOf('bold') - 1)
      })

      test.runIf(supports.buttonBar)('goes to the buttonBar bar', async () => {
        const editor = setup({buttonBar: supports.buttonBar, buttonLabel: 'Add files'})

        await userEvent.click(adapter.content(editor.box).querySelector('p'))
        expect(adapter.button(editor.box)).toBeNull()

        await userEvent.click(adapter.openBar(editor.box))

        const item = await waitFor(adapter.barButton, 5_000)

        expect(item.textContent.trim()).toBe('Add files')

        await userEvent.click(item)
        await waitForDialog()
      })
    })

    describe('upload dialog', () => {
      test('uses Uploadcare Widget 3.x from the CDN', () => {
        const widget = performance.getEntriesByType('resource')
          .find(entry => /ucarecdn\.com\/libs\/widget\/3\.x\/uploadcare(\.full)?\.min\.js/.test(entry.name))

        expect(widget).toBeDefined()
      })

      test('opens with the plugin options and sends the show event', async () => {
        const editor = setup({crop: 'free,1:1'})

        await openDialog(editor)

        const [show] = editor.named('show')
        const [widgetDialog, options] = show.data

        expect(typeof widgetDialog.done).toBe('function')
        expect(options.publicKey).toBe(PUBLIC_KEY)
        expect(options.crop).toBe('free,1:1')
        // a wrong adapter would report another editor or none, as in "Redactor/undefined"
        expect(options.integration).toBe(
          `Redactor/${adapter.reportedVersion(adapter.version())}; Uploadcare-Redactor/${pkg.version}`
        )
      })

      test('sends the cancel event and keeps the text when closed', async () => {
        const editor = setup({}, '<p>Keep this text</p>')

        await openDialog(editor)
        await closeDialog()

        await waitFor(() => editor.named('cancel').length, 5_000)
        expect(editor.named('cancel')[0].data).toEqual([])
        expect(editor.named('done')).toEqual([])

        const content = adapter.content(editor.box)

        expect(content.textContent.trim()).toBe('Keep this text')
        expect(content.querySelector('img, a[href]')).toBeNull()
      })
    })

    describe('uploads', () => {
      test('inserts an image and sends the done event', async () => {
        const editor = setup()
        const files = await upload(editor, [await makeImage()])

        expect(files).toHaveLength(1)
        expect(files[0].isImage).toBe(true)
        expect(files[0].cdnUrl).toMatch(/^https:\/\//)

        const image = await waitFor(() => adapter.content(editor.box).querySelector('img'), 5_000)

        expect(image.getAttribute('src')).toBe(files[0].cdnUrl + '-/preview/')
      })

      // needs UPLOADCARE_PUBLIC_KEY, the demo project rejects files that are not images
      test.runIf(ACCEPTS_ANY_FILE)('inserts a file that is not an image as a link', async () => {
        const editor = setup()
        const files = await upload(editor, [makeTextFile('notes.txt')])

        expect(files[0].isImage).toBe(false)

        const link = await waitFor(() => adapter.content(editor.box).querySelector('a[href]'), 5_000)

        expect(link.getAttribute('href')).toBe(files[0].cdnUrl)
        expect(link.textContent).toBe('notes.txt')
      })

      test('shows the crop step when crop is set', async () => {
        const editor = setup({crop: '1:1'})

        await openDialog(editor)
        await chooseFiles([await makeImage()])
        await waitFor(() => document.querySelector('.uploadcare--crop-sizes'), 30_000)
        await confirmDialog()
        await waitFor(() => editor.named('done').length)

        const [file] = editor.named('done')[0].data[0]
        const image = await waitFor(() => adapter.content(editor.box).querySelector('img'), 5_000)

        expect(image.getAttribute('src').startsWith(file.cdnUrl)).toBe(true)
      })

      test('inserts every file when multiple is on', async () => {
        const editor = setup({multiple: true})
        const files = await upload(editor, [await makeImage('one.png'), await makeImage('two.png', '#3c78c8')])

        expect(files).toHaveLength(2)
        await waitFor(() => adapter.content(editor.box).querySelectorAll('img').length === 2, 5_000)

        const alts = [...adapter.content(editor.box).querySelectorAll('img')].map(image => image.getAttribute('alt'))

        expect(alts).toEqual(['one.png', 'two.png'])
      })

      test('keeps markup in file names as text', async () => {
        const editor = setup()
        // no slash: file names can't contain one
        const [file] = await upload(editor, [await makeImage('a"><img src=x onerror=alert(1)>.png')])

        expect(file.name).toContain('<img')

        const image = await waitFor(() => adapter.content(editor.box).querySelector('img'), 5_000)

        expect(image.getAttribute('alt')).toBe(file.name)
        expect(adapter.content(editor.box).querySelectorAll('img')).toHaveLength(1)
      })

      test.runIf(supports.imageTag)('wraps images in imageTag', async () => {
        const editor = setup({imageTag: 'figure'})

        await upload(editor, [await makeImage()])

        const image = await waitFor(() => adapter.content(editor.box).querySelector('img'), 5_000)

        expect(image.parentElement.tagName).toBe('FIGURE')
      })

      test('calls uploadCompleteCallback for each file instead of inserting it', async () => {
        const received = []
        const editor = setup({
          multiple: true,
          uploadCompleteCallback: fileInfo => received.push(fileInfo),
        })

        const files = await upload(editor, [await makeImage('one.png'), await makeImage('two.png', '#3c78c8')])

        expect(received.map(file => file.uuid)).toEqual(files.map(file => file.uuid))
        expect(adapter.content(editor.box).querySelector('img, a[href]')).toBeNull()
      })
    })
  })
}
