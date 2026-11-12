// ADVDourado - WhatsApp Assistant Content Script
// Monitora conversas no WhatsApp Web, realiza triagem e envia respostas automáticas com delay

let botSettings = {
  enabled: true,
  backendUrl: 'http://localhost:3000',
  geminiApiKey: '',
  diegoTestMode: true,
  diegoPhone: '71988068222',
  delaySeconds: 3,
}

// Carrega configurações salvas
chrome.storage.local.get(
  ['enabled', 'backendUrl', 'geminiApiKey', 'diegoTestMode', 'diegoPhone', 'delaySeconds'],
  (res) => {
    botSettings = { ...botSettings, ...res }
    renderFloatingBadge()
  }
)

chrome.storage.onChanged.addListener((changes) => {
  for (const key in changes) {
    botSettings[key] = changes[key].newValue
  }
  renderFloatingBadge()
})

// Badge visual na interface do WhatsApp Web
function renderFloatingBadge() {
  let badge = document.getElementById('advdourado-status-badge')
  if (!badge) {
    badge = document.createElement('div')
    badge.id = 'advdourado-status-badge'
    badge.style.position = 'fixed'
    badge.style.bottom = '20px'
    badge.style.right = '20px'
    badge.style.zIndex = '999999'
    badge.style.padding = '8px 14px'
    badge.style.borderRadius = '20px'
    badge.style.fontSize = '12px'
    badge.style.fontFamily = 'system-ui, -apple-system, sans-serif'
    badge.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)'
    badge.style.display = 'flex'
    badge.style.alignItems = 'center'
    badge.style.gap = '8px'
    badge.style.fontWeight = '600'
    badge.style.transition = 'all 0.3s ease'
    document.body.appendChild(badge)
  }

  if (botSettings.enabled) {
    badge.style.backgroundColor = '#0f172a'
    badge.style.color = '#e2b34a'
    badge.style.border = '1px solid #e2b34a'
    badge.innerHTML = `
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
      ADVDourado IA: ATIVO ${botSettings.diegoTestMode ? '(Modo Diego)' : ''}
    `
  } else {
    badge.style.backgroundColor = '#1e293b'
    badge.style.color = '#94a3b8'
    badge.style.border = '1px solid #475569'
    badge.innerHTML = `
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ef4444;"></span>
      ADVDourado IA: PAUSADO
    `
  }
}

// Conjunto para evitar responder a mesma mensagem duas vezes
const processedMessages = new Set()
let isProcessingResponse = false

// Monitoramento de novas mensagens usando MutationObserver
function startChatObserver() {
  const mainChatContainer = document.querySelector('#main') || document.body

  const observer = new MutationObserver(() => {
    if (!botSettings.enabled || isProcessingResponse) return
    checkActiveChat()
  })

  observer.observe(mainChatContainer, {
    childList: true,
    subtree: true,
  })
}

// Analisa a conversa aberta
async function checkActiveChat() {
  if (isProcessingResponse) return

  // Obtém informações do contato atual no cabeçalho do chat
  const headerTitleEl = document.querySelector('#main header [title], #main header span[dir="auto"]')
  if (!headerTitleEl) return

  const contactTitle = headerTitleEl.getAttribute('title') || headerTitleEl.innerText || ''
  const cleanPhone = contactTitle.replace(/\D/g, '')

  const isDiego =
    cleanPhone.endsWith('88068222') ||
    cleanPhone === botSettings.diegoPhone.replace(/\D/g, '') ||
    contactTitle.toLowerCase().includes('diego')

  // Se não for Diego e o modo for estrito, verifica se é contato desconhecido (apenas números)
  const isPhoneNumberOnly = /^[+\d\s()-]+$/.test(contactTitle.trim())
  const shouldProcess = (isDiego && botSettings.diegoTestMode) || isPhoneNumberOnly

  if (!shouldProcess) return

  // Pega a última mensagem recebida (mensagem que veio do cliente)
  const incomingMessages = document.querySelectorAll('#main .message-in')
  if (!incomingMessages || incomingMessages.length === 0) return

  const lastIncoming = incomingMessages[incomingMessages.length - 1]
  const textElement = lastIncoming.querySelector('.selectable-text, span[dir="ltr"], span[dir="rtl"]')
  if (!textElement) return

  const messageText = textElement.innerText.trim()
  if (!messageText) return

  // Gera hash único para a mensagem
  const msgHash = `${contactTitle}_${messageText}_${lastIncoming.getBoundingClientRect().top}`
  if (processedMessages.has(msgHash)) return

  // Verifica se a última mensagem do chat foi enviada por nós (message-out) posterior a esta
  const allMessages = document.querySelectorAll('#main .message-in, #main .message-out')
  const lastMsg = allMessages[allMessages.length - 1]
  if (lastMsg && lastMsg.classList.contains('message-out')) {
    processedMessages.add(msgHash)
    return
  }

  // Marcar como processada e disparar IA
  processedMessages.add(msgHash)
  await handleBotResponse(contactTitle, cleanPhone || botSettings.diegoPhone, messageText, isDiego)
}

async function handleBotResponse(contactName, phone, messageText, isDiego) {
  try {
    isProcessingResponse = true
    updateBadgeText('Pensando...')

    const endpoint = `${botSettings.backendUrl.replace(/\/$/, '')}/api/bot/chat`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderPhone: phone || contactName,
        message: messageText,
        isContact: !isDiego,
        apiKey: botSettings.geminiApiKey,
        forceTestMode: isDiego && botSettings.diegoTestMode,
      }),
    })

    if (!response.ok) {
      console.warn('Erro ao chamar API ADVDourado:', await response.text())
      return
    }

    const data = await response.json()
    if (!data.ok || !data.reply) return

    const delayMs = (botSettings.delaySeconds || 3) * 1000
    updateBadgeText(`Digitando (${botSettings.delaySeconds}s)...`)

    // Aguarda o delay humanizado de 3 segundos
    await new Promise((r) => setTimeout(r, delayMs))

    // Injeta e envia no WhatsApp Web
    await sendWhatsAppMessage(data.reply)
  } catch (err) {
    console.error('Erro na automação do WhatsApp Web:', err)
  } finally {
    isProcessingResponse = false
    renderFloatingBadge()
  }
}

function updateBadgeText(text) {
  const badge = document.getElementById('advdourado-status-badge')
  if (badge) {
    badge.innerHTML = `
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;animation:pulse 1s infinite;"></span>
      ADVDourado: ${text}
    `
  }
}

// Injeção segura de texto no input do WhatsApp Web
async function sendWhatsAppMessage(text) {
  const input =
    document.querySelector('#main footer [contenteditable="true"]') ||
    document.querySelector('#main footer div[data-tab="10"]') ||
    document.querySelector('#main footer div[role="textbox"]')

  if (!input) {
    console.warn('Input do WhatsApp Web não encontrado.')
    return
  }

  input.focus()

  // Executa comando de inserção de texto
  document.execCommand('insertText', false, text)

  // Dispara eventos para simular interação real
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))

  await new Promise((r) => setTimeout(r, 400))

  // Clica no botão de enviar
  const sendBtn =
    document.querySelector('#main footer span[data-icon="send"]') ||
    document.querySelector('#main footer button[aria-label="Enviar"]') ||
    document.querySelector('#main footer button span[data-icon="send"]')?.parentElement

  if (sendBtn) {
    sendBtn.click()
  } else {
    // Fallback: pressiona Enter
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        code: 'Enter',
        which: 13,
        bubbles: true,
      })
    )
  }
}

// Inicialização com tolerância de carregamento do WhatsApp Web
setTimeout(() => {
  renderFloatingBadge()
  startChatObserver()
}, 3500)
