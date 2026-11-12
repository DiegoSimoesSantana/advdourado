// ADVDourado WhatsApp Extension - Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    diegoTestMode: true,
    backendUrl: 'http://localhost:3000',
    geminiApiKey: '',
    diegoPhone: '71988068222',
    delaySeconds: 3,
  })
  console.log('ADVDourado Extension instalada com sucesso!')
})
