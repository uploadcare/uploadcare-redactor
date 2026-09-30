import {JQUERY, PLUGIN} from './helpers'

// Every adapter records the plugin events as {name, data}, with the same data
// on all versions: show gets [dialog, options], done gets [files], cancel gets []
function fromParams(record, name) {
  return params => record({name, data: params.slice(1)})
}

// Redactor 2 and 3 put the label in aria-label and show it as text without an icon
function reButton(box) {
  return box.querySelector('.redactor-toolbar .re-uploadcare')
}

export const redactor2 = {
  name: 'Redactor 2',
  // the loaded editor must be this version, and the plugin must report it
  expectedVersion: /^2\./,
  version: () => window.jQuery && window.jQuery.Redactor && window.jQuery.Redactor.VERSION,
  reportedVersion: version => version,
  styles: ['/demo/redactor2/redactor.min.css'],
  scripts: [JQUERY, '/demo/redactor2/redactor.min.js', PLUGIN],
  defaultIcon: 're-icon-file',
  supports: {buttonIconEnabled: true, labelWithoutIcon: true, imageTag: true},
  create(textarea, uploadcare, record) {
    window.jQuery(textarea).redactor({
      plugins: ['uploadcare'],
      callbacks: {
        uploadcareShow: fromParams(record, 'show'),
        uploadcareDone: fromParams(record, 'done'),
        uploadcareCancel: fromParams(record, 'cancel'),
      },
      uploadcare,
    })
  },
  button: reButton,
  label: button => button.getAttribute('aria-label'),
  buttonNames: box => [...box.querySelectorAll('.redactor-toolbar .re-button')].map(b => b.getAttribute('rel')),
  content: box => box.querySelector('.redactor-layer'),
}

export const redactor3 = {
  name: 'Redactor 3',
  expectedVersion: /^3\./,
  version: () => window.$R && window.$R.version,
  reportedVersion: version => version,
  styles: ['/demo/redactor3/redactor.min.css'],
  scripts: [JQUERY, '/demo/redactor3/redactor.js', PLUGIN],
  defaultIcon: 're-icon-file',
  supports: {buttonIconEnabled: true, labelWithoutIcon: true},
  create(textarea, uploadcare, record) {
    window.$R(textarea, {
      plugins: ['uploadcare'],
      callbacks: {
        uploadcareShow: fromParams(record, 'show'),
        uploadcareDone: fromParams(record, 'done'),
        uploadcareCancel: fromParams(record, 'cancel'),
      },
      uploadcare,
    })
  },
  button: reButton,
  label: button => button.getAttribute('aria-label'),
  buttonNames: box => [...box.querySelectorAll('.redactor-toolbar .re-button')].map(b => b.dataset.reName),
  content: box => box.querySelector('.redactor-in'),
}

// Redactor X shows plugin buttons only while a block is selected
export const redactorX = {
  name: 'Redactor X',
  // Redactor X is numbered 1.x; the plugin reports it with an X prefix
  expectedVersion: /^1\./,
  version: () => window.RedactorX && window.RedactorX.version,
  reportedVersion: version => 'X' + version,
  styles: ['/demo/redactorX/redactorx.min.css'],
  scripts: [JQUERY, '/demo/redactorX/redactorx.js', PLUGIN],
  defaultIcon: 'rx-icon-file',
  selectBlockFirst: true,
  supports: {iconAlways: true, imageTag: true, svgIcon: true, buttonBar: 'addbar'},
  create(textarea, uploadcare, record) {
    window.RedactorX(textarea, {
      plugins: ['uploadcare'],
      subscribe: {
        uploadcareShow: event => fromParams(record, 'show')(event.params),
        uploadcareDone: event => fromParams(record, 'done')(event.params),
        uploadcareCancel: event => fromParams(record, 'cancel')(event.params),
      },
      uploadcare,
    })
  },
  button: box => box.querySelector('.rx-toolbar [data-name="uploadcare"]'),
  // the add bar is a popup outside the editor box
  barButton: () => document.querySelector('.rx-popup-item[data-name="uploadcare"]'),
  openBar: box => box.querySelector('.rx-toolbar [data-name="add"]'),
  label: button => button.dataset.tooltip || button.textContent.trim(),
  buttonNames: box => [...box.querySelectorAll('.rx-toolbar [data-name]')].map(b => b.dataset.name),
  content: box => box.querySelector('.rx-editor'),
}

// written from the Redactor 5 docs and the plugin code; it has not run against
// a real build yet, so selectors may need adjusting the first time it does
export const redactor5 = {
  name: 'Redactor 5',
  expectedVersion: /^5\./,
  version: () => window.Redactor && window.Redactor.version,
  reportedVersion: version => version,
  styles: [],
  scripts: [PLUGIN],
  defaultIcon: null,
  selectBlockFirst: true,
  supports: {svgIcon: true, iconAlways: true, buttonBar: null},
  create(textarea, uploadcare, record) {
    window.Redactor(textarea, {
      plugins: ['uploadcare'],
      events: {
        'uploadcare:show': data => record({name: 'show', data: [data.dialog, data.options]}),
        'uploadcare:done': data => record({name: 'done', data: [data.files]}),
        'uploadcare:cancel': () => record({name: 'cancel', data: []}),
      },
      uploadcare,
    })
  },
  button: box => box.querySelector('[data-name="uploadcare"]'),
  label: button => button.dataset.tooltip || button.getAttribute('aria-label') || button.textContent.trim(),
  buttonNames: box => [...box.querySelectorAll('.rx-toolbar [data-name]')].map(b => b.dataset.name),
  content: box => box.querySelector('.rx-editor'),
}
