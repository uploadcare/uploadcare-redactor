import {expect, test, vi} from 'vitest'
import {PLUGIN, loadScript} from './helpers'

test('logs an error and does not throw when no Redactor is on the page', async () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const uncaught = vi.fn()

  window.addEventListener('error', uncaught)
  await loadScript(PLUGIN)
  window.removeEventListener('error', uncaught)

  expect(error).toHaveBeenCalledWith('Uploadcare: Redactor not found.')
  expect(uncaught).not.toHaveBeenCalled()
})
