// ADVDourado - Popup Controller

document.addEventListener('DOMContentLoaded', () => {
  const enabledEl = document.getElementById('enabled')
  const diegoTestModeEl = document.getElementById('diegoTestMode')
  const backendUrlEl = document.getElementById('backendUrl')
  const geminiApiKeyEl = document.getElementById('geminiApiKey')
  const delaySecondsEl = document.getElementById('delaySeconds')
  const saveBtn = document.getElementById('saveBtn')
  const statusMsg = document.getElementById('statusMsg')

  // Carrega configurações
  chrome.storage.local.get(
    {
      enabled: true,
      diegoTestMode: true,
      backendUrl: 'http://localhost:3000',
      geminiApiKey: '',
      delaySeconds: 3,
    },
    (items) => {
      enabledEl.checked = items.enabled
      diegoTestModeEl.checked = items.diegoTestMode
      backendUrlEl.value = items.backendUrl
      geminiApiKeyEl.value = items.geminiApiKey
      delaySecondsEl.value = items.delaySeconds
    }
  )

  // Salva configurações
  saveBtn.addEventListener('click', () => {
    const settings = {
      enabled: enabledEl.checked,
      diegoTestMode: diegoTestModeEl.checked,
      backendUrl: backendUrlEl.value.trim() || 'http://localhost:3000',
      geminiApiKey: geminiApiKeyEl.value.trim(),
      delaySeconds: parseInt(delaySecondsEl.value, 10) || 3,
    }

    chrome.storage.local.set(settings, () => {
      statusMsg.innerText = '✓ Configurações salvas com sucesso!'
      setTimeout(() => {
        statusMsg.innerText = ''
      }, 3000)
    })
  })
})
