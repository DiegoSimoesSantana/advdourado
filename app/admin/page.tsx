'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Send,
  Share2,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  Video,
  FileText,
  Smartphone,
  Linkedin,
  Instagram,
  Facebook,
  MessageSquare,
  Bot,
  Database,
  Users,
  RefreshCw,
  Trash2,
  Plus,
  ExternalLink,
  Info,
  LogOut,
  ChevronRight,
  UserCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  ThumbsUp,
  Heart,
  Bookmark,
  MoreHorizontal,
  Play,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

type SocialTab = 'linkedin' | 'instagram' | 'facebook' | 'whatsapp'
type PostType = 'texto' | 'imagem' | 'video'
type MainTab = 'social' | 'leads' | 'knowledge' | 'simulator' | 'extension'

export default function AdminPage() {
  // ----------------------------------------------------
  // ESTADO DE AUTENTICAÇÃO
  // ----------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [authChecking, setAuthChecking] = useState<boolean>(true)
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string>('')

  // ----------------------------------------------------
  // NAVEGAÇÃO PRINCIPAL DO PAINEL
  // ----------------------------------------------------
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('social')

  // ----------------------------------------------------
  // ESTADO DO PUBLICADOR SOCIAL (SOCIAL HUB)
  // ----------------------------------------------------
  const [postType, setPostType] = useState<PostType>('imagem')
  const [postTitle, setPostTitle] = useState<string>('Direitos do Trabalhador em Rescisões')
  const [baseCaption, setBaseCaption] = useState<string>(
    `Você sabia que a rescisão de contrato de trabalho exige o cálculo preciso de todas as verbas no prazo legal?\n\n📌 Fique atento aos seus direitos:\n• Saldo de salário e aviso prévio;\n• Férias vencidas e proporcionais + 1/3;\n• 13º salário proporcional;\n• Multa de 40% sobre o FGTS e liberação das guias.\n\nA ADVDourado atua de forma preventiva e estratégica para garantir a correta aplicação da legislação.\n\n📲 Dúvidas? Fale com a Dra. Bruna Dourado.`
  )
  const [captionLinkedin, setCaptionLinkedin] = useState<string>('')
  const [captionInstagram, setCaptionInstagram] = useState<string>('')
  const [captionFacebook, setCaptionFacebook] = useState<string>('')
  const [captionWhatsapp, setCaptionWhatsapp] = useState<string>('')
  const [previewTab, setPreviewTab] = useState<SocialTab>('instagram')

  // Mídia
  const [mediaUrl, setMediaUrl] = useState<string>('/brunadourado.jpeg')
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '16:9'>('4:5')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // IA Copywriter
  const [aiTopic, setAiTopic] = useState<string>('')
  const [aiArea, setAiArea] = useState<string>('trabalhista')
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Salvar no banco
  const [isSavingPost, setIsSavingPost] = useState<boolean>(false)
  const [savedPosts, setSavedPosts] = useState<any[]>([])

  // ----------------------------------------------------
  // ESTADO DA CENTRAL DE LEADS DO WHATSAPP
  // ----------------------------------------------------
  const [leadsList, setLeadsList] = useState<any[]>([])
  const [leadsLoading, setLeadsLoading] = useState<boolean>(false)
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [leadAreaFilter, setLeadAreaFilter] = useState<string>('todos')

  // ----------------------------------------------------
  // ESTADO DA BASE DE CONHECIMENTO DO BOT
  // ----------------------------------------------------
  const [knowledgeList, setKnowledgeList] = useState<any[]>([])
  const [knowledgeLoading, setKnowledgeLoading] = useState<boolean>(false)
  const [newQuestion, setNewQuestion] = useState<string>('')
  const [newAnswer, setNewAnswer] = useState<string>('')
  const [newCategory, setNewCategory] = useState<string>('trabalhista')

  // ----------------------------------------------------
  // ESTADO DO SIMULADOR DO BOT
  // ----------------------------------------------------
  const [simPhone, setSimPhone] = useState<string>('71988068222')
  const [simIsDiego, setSimIsDiego] = useState<boolean>(true)
  const [simInputText, setSimInputText] = useState<string>('')
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; source?: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual do escritório da Dra. Bruna Dourado. Para direcionar seu atendimento: de qual cidade e estado você fala? O seu contato é para um assunto Profissional/Jurídico ou Pessoal?',
      source: 'saudacao_inicial',
      time: 'Agora',
    },
  ])
  const [simLoading, setSimLoading] = useState<boolean>(false)
  const [simLeadState, setSimLeadState] = useState<any>(null)

  // ----------------------------------------------------
  // VERIFICAÇÃO INICIAL DE SESSÃO
  // ----------------------------------------------------
  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    try {
      setAuthChecking(true)
      const res = await fetch('/api/admin/auth')
      const data = await res.json()
      if (data.ok && data.authenticated) {
        setIsAuthenticated(true)
        loadSavedPosts()
      } else {
        setIsAuthenticated(false)
      }
    } catch (e) {
      setIsAuthenticated(false)
    } finally {
      setAuthChecking(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      })

      const data = await res.json()
      if (data.ok) {
        setIsAuthenticated(true)
        loadSavedPosts()
      } else {
        setLoginError(data.error || 'Senha incorreta.')
      }
    } catch (err) {
      setLoginError('Erro de conexão ao validar senha.')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      setPasswordInput('')
    } catch (e) {
      console.error(e)
    }
  }

  // Sincroniza legendas específicas quando a base muda
  useEffect(() => {
    if (!captionLinkedin) setCaptionLinkedin(baseCaption)
    if (!captionInstagram) setCaptionInstagram(baseCaption)
    if (!captionFacebook) setCaptionFacebook(baseCaption)
    if (!captionWhatsapp) setCaptionWhatsapp(baseCaption)
  }, [baseCaption])

  // Carrega posts salvos
  async function loadSavedPosts() {
    try {
      const res = await fetch('/api/admin/social')
      const data = await res.json()
      if (data.ok) setSavedPosts(data.posts || [])
    } catch (e) {
      console.warn('Erro ao carregar posts salvos:', e)
    }
  }

  // Carrega leads
  async function loadLeads() {
    try {
      setLeadsLoading(true)
      const res = await fetch('/api/bot/leads')
      const data = await res.json()
      if (data.ok) setLeadsList(data.leads || [])
    } catch (e) {
      console.warn('Erro ao carregar leads:', e)
    } finally {
      setLeadsLoading(false)
    }
  }

  // Carrega base de conhecimento
  async function loadKnowledge() {
    try {
      setKnowledgeLoading(true)
      const res = await fetch('/api/bot/knowledge')
      const data = await res.json()
      if (data.ok) setKnowledgeList(data.items || [])
    } catch (e) {
      console.warn('Erro ao carregar conhecimento:', e)
    } finally {
      setKnowledgeLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (activeMainTab === 'leads') loadLeads()
      if (activeMainTab === 'knowledge') loadKnowledge()
    }
  }, [activeMainTab, isAuthenticated])

  // ----------------------------------------------------
  // GERAÇÃO DE LEGENDA COM IA
  // ----------------------------------------------------
  async function handleGenerateAiCaptions() {
    if (!aiTopic.trim()) {
      alert('Digite o tema ou rascunho da publicação para a IA gerar as legendas.')
      return
    }

    setIsGeneratingAi(true)
    try {
      const res = await fetch('/api/admin/ai-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, area: aiArea }),
      })

      const data = await res.json()
      if (data.ok && data.variations) {
        setPostTitle(data.variations.title || aiTopic)
        setCaptionLinkedin(data.variations.linkedin)
        setCaptionInstagram(data.variations.instagram)
        setCaptionFacebook(data.variations.facebook)
        setCaptionWhatsapp(data.variations.whatsapp)
        setBaseCaption(data.variations.instagram)
      }
    } catch (err) {
      alert('Erro ao gerar com IA. Verifique sua conexão.')
    } finally {
      setIsGeneratingAi(false)
    }
  }

  // Upload de Mídia
  function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const isVid = file.type.startsWith('video/')
    setMediaType(isVid ? 'video' : 'image')
    setPostType(isVid ? 'video' : 'imagem')

    const objectUrl = URL.createObjectURL(file)
    setMediaUrl(objectUrl)
  }

  // Copiar com feedback
  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  // Salvar Post no Banco Neon
  async function handleSavePost() {
    setIsSavingPost(true)
    try {
      const res = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_type: postType,
          title: postTitle,
          caption: baseCaption,
          caption_linkedin: captionLinkedin,
          caption_instagram: captionInstagram,
          caption_facebook: captionFacebook,
          caption_whatsapp: captionWhatsapp,
          media_url: mediaUrl,
          media_type: mediaType,
          target_networks: ['linkedin', 'instagram', 'facebook', 'whatsapp'],
          status: 'publicado',
        }),
      })

      const data = await res.json()
      if (data.ok) {
        alert('Publicação salva no banco Neon com sucesso!')
        loadSavedPosts()
      }
    } catch (e) {
      alert('Erro ao salvar no banco.')
    } finally {
      setIsSavingPost(false)
    }
  }

  // Adicionar Regra na Base de Conhecimento
  async function handleAddKnowledge(e: React.FormEvent) {
    e.preventDefault()
    if (!newQuestion.trim() || !newAnswer.trim()) return

    try {
      const res = await fetch('/api/bot/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newCategory,
          pattern_question: newQuestion,
          answer: newAnswer,
          keywords: newQuestion.toLowerCase().split(/\s+/).filter((w) => w.length > 3),
        }),
      })

      const data = await res.json()
      if (data.ok) {
        setNewQuestion('')
        setNewAnswer('')
        loadKnowledge()
      }
    } catch (e) {
      alert('Erro ao cadastrar conhecimento.')
    }
  }

  async function handleDeleteKnowledge(id: number) {
    if (!confirm('Deseja excluir esta resposta aprendida?')) return
    try {
      await fetch(`/api/bot/knowledge?id=${id}`, { method: 'DELETE' })
      loadKnowledge()
    } catch (e) {
      alert('Erro ao excluir.')
    }
  }

  // Enviar mensagem no Simulador
  async function handleSendSimulatorMessage(customText?: string) {
    const textToSend = (customText || simInputText).trim()
    if (!textToSend) return

    setSimInputText('')
    const newMsgList = [
      ...simMessages,
      {
        sender: 'user' as const,
        text: textToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
    setSimMessages(newMsgList)
    setSimLoading(true)

    try {
      const res = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderPhone: simPhone,
          message: textToSend,
          forceTestMode: simIsDiego,
        }),
      })

      const data = await res.json()
      if (data.ok) {
        setSimMessages([
          ...newMsgList,
          {
            sender: 'bot',
            text: data.reply || '(Sem resposta do bot)',
            source: data.source,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
        setSimLeadState(data.lead)
      }
    } catch (e) {
      setSimMessages([
        ...newMsgList,
        {
          sender: 'bot',
          text: 'Erro ao conectar ao bot. Verifique o console.',
          source: 'erro',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setSimLoading(false)
    }
  }

  // ----------------------------------------------------
  // TELA DE CARREGAMENTO INICIAL
  // ----------------------------------------------------
  if (authChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-sm font-medium text-amber-200/80">Carregando ADVDourado Studio...</p>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // TELA DE LOGIN (PROTEÇÃO POR SENHA)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-radial from-slate-900 via-slate-950 to-black p-4">
        {/* Glow de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md rounded-2xl border border-amber-500/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
              ADVDourado Studio
            </h1>
            <p className="mt-1 text-xs text-amber-300/80">
              {siteConfig.brand.legalName} • {siteConfig.brand.oab}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Área interna restrita para publicação e automação com IA.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a senha interna..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-lg bg-red-950/50 border border-red-800/50 p-3 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold text-slate-950 transition hover:from-amber-400 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Acessar Central Interna</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-amber-300 transition"
            >
              ← Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // PAINEL INTERNO AUTENTICADO
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Topbar Superior */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20">
              BD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-white">ADVDourado Studio</span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  Interno
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Dra. Bruna Dourado • OAB/BA 71507</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Neon PostgreSQL Ativo</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver Site
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 px-3 py-1.5 rounded-lg transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>

        {/* Abas de Navegação Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 py-1 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveMainTab('social')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeMainTab === 'social'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Share2 className="h-4 w-4" />
            Publicador Social Hub
          </button>

          <button
            onClick={() => setActiveMainTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeMainTab === 'leads'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            Central de Leads WhatsApp
            {leadsList.length > 0 && (
              <span className="ml-1 rounded-full bg-slate-900/80 px-1.5 py-0.2 text-[10px] text-amber-300">
                {leadsList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeMainTab === 'knowledge'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Database className="h-4 w-4" />
            Base de Conhecimento Neon
          </button>

          <button
            onClick={() => setActiveMainTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeMainTab === 'simulator'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bot className="h-4 w-4" />
            Simulador do Bot (Diego Test)
          </button>

          <button
            onClick={() => setActiveMainTab('extension')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeMainTab === 'extension'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Extensão WhatsApp Web
          </button>
        </div>
      </header>

      {/* Conteúdo Principal conforme a aba ativa */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ==================================================================== */}
        {/* ABA 1: SOCIAL HUB (PUBLICADOR MULTI-REDES) */}
        {/* ==================================================================== */}
        {activeMainTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna Esquerda: Editor e Controles (7 colunas) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Card 1: Assistente de IA Copywriter */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <h2 className="text-sm font-bold text-amber-300">
                      Assistente de Copywriting Jurídico (IA)
                    </h2>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    OAB Prov. 205/2021
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Digite o assunto ou tema que deseja abordar. A IA adaptará automaticamente os textos no formato ideal para LinkedIn, Instagram, Facebook e WhatsApp.
                </p>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="Ex: Horas extras não pagas e reflexos rescisórios"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <select
                        value={aiArea}
                        onChange={(e) => setAiArea(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      >
                        <option value="trabalhista">Trabalhista</option>
                        <option value="consumidor">Consumidor & Bancos</option>
                        <option value="civel">Cível & Imóveis</option>
                        <option value="familia">Família & Inventário</option>
                        <option value="saude">Planos de Saúde</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateAiCaptions}
                    disabled={isGeneratingAi}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 transition hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    {isGeneratingAi ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Gerando legendas adaptadas com IA...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Gerar 4 Versões para as Redes Sociais</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: Formato e Mídia */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" />
                  Configuração do Post
                </h2>

                {/* Seletor de Tipo de Post */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPostType('texto')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      postType === 'texto'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    Apenas Texto
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostType('imagem')
                      setMediaType('image')
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      postType === 'imagem'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Imagem + Legenda
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostType('video')
                      setMediaType('video')
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      postType === 'video'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Video className="h-4 w-4" />
                    Vídeo + Legenda
                  </button>
                </div>

                {/* Upload e Mídia */}
                {postType !== 'texto' && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">
                        {postType === 'imagem' ? 'Imagem da Publicação' : 'Vídeo da Publicação'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setAspectRatio('1:1')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            aspectRatio === '1:1' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          1:1 Quadrado
                        </button>
                        <button
                          onClick={() => setAspectRatio('4:5')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            aspectRatio === '4:5' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          4:5 Feed/Reels
                        </button>
                        <button
                          onClick={() => setAspectRatio('1:9')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            aspectRatio === '16:9' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          16:9 Widescreen
                        </button>
                      </div>
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-4 text-center bg-slate-950/50 transition group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={postType === 'imagem' ? 'image/*' : 'video/*'}
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        {postType === 'imagem' ? (
                          <ImageIcon className="h-8 w-8 text-amber-400 group-hover:scale-110 transition" />
                        ) : (
                          <Video className="h-8 w-8 text-amber-400 group-hover:scale-110 transition" />
                        )}
                        <span className="text-xs font-semibold text-slate-300">
                          Clique para selecionar arquivo do computador
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {postType === 'imagem' ? 'JPG, PNG, WEBP suportados' : 'MP4, WEBM, MOV suportados'}
                        </span>
                      </div>
                    </div>

                    {/* Mídias Rápidas do Site */}
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
                      <span className="text-[10px] text-slate-400 shrink-0">Fotos do Escritório:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setMediaUrl('/brunadourado.jpeg')
                          setMediaType('image')
                        }}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 whitespace-nowrap"
                      >
                        Foto Dra. Bruna
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMediaUrl('/img/dourado_banner.png')
                          setMediaType('image')
                        }}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 whitespace-nowrap"
                      >
                        Banner ADVDourado
                      </button>
                    </div>
                  </div>
                )}

                {/* Editor de Título e Legendas */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Título Interno / Assunto
                    </label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Abas de Legenda por Rede */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Edição de Texto por Rede Social:
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {previewTab.toUpperCase()} ({
                          previewTab === 'linkedin' ? captionLinkedin.length :
                          previewTab === 'instagram' ? captionInstagram.length :
                          previewTab === 'facebook' ? captionFacebook.length :
                          captionWhatsapp.length
                        } caracteres)
                      </span>
                    </div>

                    <div className="flex gap-1 mb-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTab('linkedin')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          previewTab === 'linkedin'
                            ? 'bg-[#0a66c2] text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                        LinkedIn
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('instagram')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          previewTab === 'instagram'
                            ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        Instagram
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('facebook')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          previewTab === 'facebook'
                            ? 'bg-[#1877f2] text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Facebook className="h-3.5 w-3.5" />
                        Facebook
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('whatsapp')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          previewTab === 'whatsapp'
                            ? 'bg-[#25d366] text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        WhatsApp
                      </button>
                    </div>

                    {/* Textarea específico da rede selecionada */}
                    {previewTab === 'linkedin' && (
                      <textarea
                        rows={8}
                        value={captionLinkedin}
                        onChange={(e) => setCaptionLinkedin(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500 font-mono leading-relaxed"
                        placeholder="Texto adaptado para o LinkedIn..."
                      />
                    )}
                    {previewTab === 'instagram' && (
                      <textarea
                        rows={8}
                        value={captionInstagram}
                        onChange={(e) => setCaptionInstagram(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500 font-mono leading-relaxed"
                        placeholder="Texto adaptado para o Instagram com quebras limpas..."
                      />
                    )}
                    {previewTab === 'facebook' && (
                      <textarea
                        rows={8}
                        value={captionFacebook}
                        onChange={(e) => setCaptionFacebook(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500 font-mono leading-relaxed"
                        placeholder="Texto adaptado para o Facebook..."
                      />
                    )}
                    {previewTab === 'whatsapp' && (
                      <textarea
                        rows={8}
                        value={captionWhatsapp}
                        onChange={(e) => setCaptionWhatsapp(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500 font-mono leading-relaxed"
                        placeholder="Texto com formatação *negrito* para WhatsApp..."
                      />
                    )}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={handleSavePost}
                    disabled={isSavingPost}
                    className="flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2.5 text-xs font-semibold text-white transition flex items-center justify-center gap-2"
                  >
                    <Database className="h-4 w-4 text-amber-400" />
                    {isSavingPost ? 'Salvando...' : 'Salvar no Banco Neon'}
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Live Social Previews & Disparo Direto (5 colunas) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Seletor de visualização */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded-2xl">
                <span className="text-xs font-bold text-slate-300 pl-2">
                  Pré-visualização Fiel da Rede:
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPreviewTab('instagram')}
                    className={`p-2 rounded-xl text-xs transition ${
                      previewTab === 'instagram' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Instagram Preview"
                  >
                    <Instagram className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewTab('linkedin')}
                    className={`p-2 rounded-xl text-xs transition ${
                      previewTab === 'linkedin' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    title="LinkedIn Preview"
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewTab('facebook')}
                    className={`p-2 rounded-xl text-xs transition ${
                      previewTab === 'facebook' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Facebook Preview"
                  >
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewTab('whatsapp')}
                    className={`p-2 rounded-xl text-xs transition ${
                      previewTab === 'whatsapp' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    title="WhatsApp Preview"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* PREVIEW: INSTAGRAM */}
              {/* ---------------------------------------------------- */}
              {previewTab === 'instagram' && (
                <div className="rounded-2xl border border-slate-800 bg-black max-w-sm mx-auto shadow-2xl overflow-hidden text-white font-sans text-xs">
                  {/* Header do Post Instagram */}
                  <div className="flex items-center justify-between p-3 border-b border-neutral-900">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5">
                        <img
                          src="/brunadourado.jpeg"
                          alt="Dra. Bruna Dourado"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1 font-bold">
                          <span>brunadouradoadv</span>
                          <span className="text-amber-400 text-[10px]">⚖️</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">Salvador, Bahia</p>
                      </div>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                  </div>

                  {/* Mídia do Post */}
                  {postType !== 'texto' && (
                    <div
                      className={`relative w-full bg-neutral-900 flex items-center justify-center overflow-hidden ${
                        aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-video'
                      }`}
                    >
                      {mediaType === 'image' ? (
                        <img src={mediaUrl} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <video src={mediaUrl} controls className="h-full w-full object-cover" />
                      )}
                    </div>
                  )}

                  {/* Ações do Instagram */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between text-neutral-300">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
                        <MessageSquare className="h-5 w-5 cursor-pointer" />
                        <Send className="h-5 w-5 cursor-pointer" />
                      </div>
                      <Bookmark className="h-5 w-5 cursor-pointer" />
                    </div>

                    <div className="font-bold text-[11px]">284 curtidas</div>

                    {/* Legenda com quebras limpas */}
                    <div className="space-y-1 text-[11px] text-neutral-200 whitespace-pre-line leading-relaxed">
                      <span className="font-bold mr-1 text-white">brunadouradoadv</span>
                      {captionInstagram}
                    </div>

                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider pt-1">
                      Há 1 hora • Ver tradução
                    </p>
                  </div>

                  {/* Botões de Ação Rápida Instagram */}
                  <div className="p-3 bg-neutral-950 border-t border-neutral-900 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyToClipboard(captionInstagram, 'insta_caption')}
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2 font-bold text-slate-950 flex items-center justify-center gap-1.5 transition hover:opacity-90"
                    >
                      {copiedKey === 'insta_caption' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === 'insta_caption' ? 'Copiado!' : 'Copiar Legenda'}</span>
                    </button>

                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-neutral-800 hover:bg-neutral-700 py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Abrir Instagram</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* PREVIEW: LINKEDIN */}
              {/* ---------------------------------------------------- */}
              {previewTab === 'linkedin' && (
                <div className="rounded-2xl border border-slate-800 bg-[#1b1f23] max-w-md mx-auto shadow-2xl overflow-hidden text-white font-sans text-xs">
                  {/* Header LinkedIn */}
                  <div className="p-3 flex items-start justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/brunadourado.jpeg"
                        alt="Bruna Dourado"
                        className="h-10 w-10 rounded-full object-cover border border-amber-500/30"
                      />
                      <div>
                        <h3 className="font-bold text-white text-xs flex items-center gap-1">
                          Bruna Dourado
                          <span className="text-[10px] text-slate-400 font-normal">• 1º</span>
                        </h3>
                        <p className="text-[10px] text-slate-400 leading-tight">
                          Advogada Trabalhista & Consultoria Estratégica | OAB/BA 71507
                        </p>
                        <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
                          1h • <span className="text-[11px]">🌐</span>
                        </p>
                      </div>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>

                  {/* Texto do Post LinkedIn */}
                  <div className="p-3 text-[11px] text-slate-200 whitespace-pre-line leading-relaxed">
                    {captionLinkedin}
                  </div>

                  {/* Mídia LinkedIn */}
                  {postType !== 'texto' && (
                    <div className="w-full bg-slate-900 aspect-video flex items-center justify-center overflow-hidden border-y border-slate-800">
                      {mediaType === 'image' ? (
                        <img src={mediaUrl} alt="LinkedIn preview" className="h-full w-full object-cover" />
                      ) : (
                        <video src={mediaUrl} controls className="h-full w-full object-cover" />
                      )}
                    </div>
                  )}

                  {/* Ações LinkedIn */}
                  <div className="p-2 border-t border-slate-800 grid grid-cols-4 gap-1 text-[10px] text-slate-400 text-center">
                    <div className="flex items-center justify-center gap-1 py-1.5 hover:bg-slate-800 rounded">
                      <ThumbsUp className="h-3.5 w-3.5 text-blue-400" />
                      <span>Gostei</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 py-1.5 hover:bg-slate-800 rounded">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Comentar</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 py-1.5 hover:bg-slate-800 rounded">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Compartilhar</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 py-1.5 hover:bg-slate-800 rounded">
                      <Send className="h-3.5 w-3.5" />
                      <span>Enviar</span>
                    </div>
                  </div>

                  {/* Botão de Disparo LinkedIn */}
                  <div className="p-3 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyToClipboard(captionLinkedin, 'linkedin_caption')}
                      className="rounded-xl bg-[#0a66c2] hover:bg-[#004182] py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition"
                    >
                      {copiedKey === 'linkedin_caption' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === 'linkedin_caption' ? 'Copiado!' : 'Copiar Texto'}</span>
                    </button>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteConfig.contact.siteUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-slate-800 hover:bg-slate-700 py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-[#0a66c2]" />
                      <span>Compartilhar</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* PREVIEW: FACEBOOK */}
              {/* ---------------------------------------------------- */}
              {previewTab === 'facebook' && (
                <div className="rounded-2xl border border-slate-800 bg-[#242526] max-w-md mx-auto shadow-2xl overflow-hidden text-white font-sans text-xs">
                  <div className="p-3 flex items-center gap-2.5 border-b border-slate-700/50">
                    <img
                      src="/brunadourado.jpeg"
                      alt="Dra. Bruna"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-white text-xs">
                        Bruna Dourado Advocacia & Consultoria
                      </h3>
                      <p className="text-[10px] text-slate-400">1 h • 🌍 Público</p>
                    </div>
                  </div>

                  <div className="p-3 text-[11px] text-slate-200 whitespace-pre-line leading-relaxed">
                    {captionFacebook}
                  </div>

                  {postType !== 'texto' && (
                    <div className="w-full bg-slate-900 aspect-video flex items-center justify-center overflow-hidden border-y border-slate-800">
                      {mediaType === 'image' ? (
                        <img src={mediaUrl} alt="FB preview" className="h-full w-full object-cover" />
                      ) : (
                        <video src={mediaUrl} controls className="h-full w-full object-cover" />
                      )}
                    </div>
                  )}

                  <div className="p-3 bg-[#18191a] border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyToClipboard(captionFacebook, 'fb_caption')}
                      className="rounded-xl bg-[#1877f2] hover:bg-[#166fe5] py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition"
                    >
                      {copiedKey === 'fb_caption' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === 'fb_caption' ? 'Copiado!' : 'Copiar Legenda'}</span>
                    </button>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteConfig.contact.siteUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-slate-800 hover:bg-slate-700 py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <Facebook className="h-3.5 w-3.5 text-[#1877f2]" />
                      <span>Postar no Facebook</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* PREVIEW: WHATSAPP */}
              {/* ---------------------------------------------------- */}
              {previewTab === 'whatsapp' && (
                <div className="rounded-2xl border border-slate-800 bg-[#0b141a] max-w-sm mx-auto shadow-2xl overflow-hidden text-white font-sans text-xs">
                  {/* Header WhatsApp */}
                  <div className="p-3 bg-[#202c33] flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/brunadourado.jpeg"
                        alt="WhatsApp"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-white">Dra. Bruna Dourado</h4>
                        <p className="text-[10px] text-emerald-400">online</p>
                      </div>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>

                  {/* Balão de Mensagem do WhatsApp */}
                  <div className="p-4 bg-[url('/bg-chat.png')] bg-repeat space-y-2 min-h-[220px]">
                    <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-none bg-[#005c4b] p-3 shadow-md space-y-2">
                      {postType !== 'texto' && (
                        <div className="rounded-lg overflow-hidden max-h-48">
                          {mediaType === 'image' ? (
                            <img src={mediaUrl} alt="WhatsApp media" className="w-full object-cover" />
                          ) : (
                            <video src={mediaUrl} controls className="w-full" />
                          )}
                        </div>
                      )}

                      <div className="text-[11px] text-[#e9edef] whitespace-pre-line leading-relaxed">
                        {captionWhatsapp}
                      </div>

                      <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/70 pt-1">
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[#53bdeb]">✓✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Ações WhatsApp */}
                  <div className="p-3 bg-[#202c33] border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyToClipboard(captionWhatsapp, 'wa_caption')}
                      className="rounded-xl bg-slate-800 hover:bg-slate-700 py-2 font-semibold text-white flex items-center justify-center gap-1.5 transition"
                    >
                      {copiedKey === 'wa_caption' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === 'wa_caption' ? 'Copiado!' : 'Copiar Texto'}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(captionWhatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#25d366] hover:bg-[#20bd5a] py-2 font-bold text-slate-950 flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Disparar WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA 2: CENTRAL DE LEADS DO WHATSAPP (NEON) */}
        {/* ==================================================================== */}
        {activeMainTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-400" />
                  Leads e Atendimentos do WhatsApp
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Contatos triados automaticamente pelo robô e salvos no banco Neon PostgreSQL.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadLeads}
                  disabled={leadsLoading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${leadsLoading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </div>
            </div>

            {/* Tabela de Leads */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
              {leadsList.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <Users className="h-10 w-10 mx-auto text-slate-600 mb-3" />
                  <p className="text-sm font-semibold">Nenhum atendimento registrado no Neon ainda.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Use o Simulador na aba ao lado ou conecte a extensão do Chrome para começar.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Telefone / Lead</th>
                        <th className="px-4 py-3">Cidade / Estado</th>
                        <th className="px-4 py-3">Área Triada</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Última Interação</th>
                        <th className="px-4 py-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leadsList.map((lead) => (
                        <tr key={lead.id || lead.phone} className="hover:bg-slate-800/40 transition">
                          <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-emerald-400" />
                            <span>{lead.phone}</span>
                            {lead.is_test_mode && (
                              <span className="rounded bg-amber-500/20 text-amber-300 px-1.5 py-0.2 text-[9px] font-bold">
                                DIEGO TEST
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {lead.city ? `${lead.city}/${lead.state || 'BA'}` : 'Em triagem'}
                          </td>
                          <td className="px-4 py-3">
                            <span className="capitalize font-semibold text-amber-300">
                              {lead.area || 'Geral'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === 'qualificado'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : lead.status === 'pessoal'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-[11px]">
                            {new Date(lead.updated_at).toLocaleString('pt-BR')}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] transition"
                            >
                              <MessageSquare className="h-3 w-3" />
                              Falar
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA 3: BASE DE CONHECIMENTO APRENDIDA (NEON CACHE) */}
        {/* ==================================================================== */}
        {activeMainTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-amber-500/20 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Regras Aprendidas</span>
                  <Database className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-white">{knowledgeList.length}</div>
                <p className="text-[10px] text-slate-500 mt-1">Salvas no Neon PostgreSQL</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Chamadas de IA Economizadas</span>
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-400">
                  {knowledgeList.reduce((acc, curr) => acc + (curr.usage_count || 1), 0)}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Respostas entregues pelo cache</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Modo Auto-Aprendizado</span>
                  <Bot className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-2 text-sm font-bold text-amber-300">🟢 Ativo e Gravando</div>
                <p className="text-[10px] text-slate-500 mt-1">Cada nova resposta da IA vira regra</p>
              </div>
            </div>

            {/* Adicionar nova regra manual */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-400" />
                Adicionar Nova Resposta Padrão / Aprendida
              </h3>
              <form onSubmit={handleAddKnowledge} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Pergunta ou padrão (Ex: Quanto custa a consulta?)"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                    >
                      <option value="trabalhista">Trabalhista</option>
                      <option value="consumidor">Consumidor</option>
                      <option value="civel">Cível</option>
                      <option value="pessoal">Pessoal</option>
                      <option value="saudacao">Saudação</option>
                      <option value="geral">Geral</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Resposta exata que o bot deve fornecer..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500"
                  required
                />

                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  Salvar Regra no Banco Neon
                </button>
              </form>
            </div>

            {/* Lista de Conhecimento */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-bold text-xs text-white flex items-center justify-between">
                <span>Perguntas e Respostas Registradas</span>
                <span className="text-slate-400 font-normal">{knowledgeList.length} itens</span>
              </div>
              <div className="divide-y divide-slate-800/60">
                {knowledgeList.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-800/30 transition flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="capitalize font-bold text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-white">"{item.pattern_question}"</span>
                        <span className="text-[10px] text-slate-500">({item.usage_count || 1} usos)</span>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed pl-1">
                        {item.answer}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteKnowledge(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                      title="Excluir regra"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA 4: SIMULADOR DO BOT WHATSAPP (MODO TESTE DIEGO) */}
        {/* ==================================================================== */}
        {activeMainTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controles de Simulação */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-amber-500/30 bg-slate-900 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bot className="h-4 w-4 text-amber-400" />
                    Configuração de Teste
                  </h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                    Tempo Real
                  </span>
                </div>

                {/* Alternador Modo Diego */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-white">Modo Teste do Diego</span>
                    <input
                      type="checkbox"
                      checked={simIsDiego}
                      onChange={(e) => {
                        setSimIsDiego(e.target.checked)
                        if (e.target.checked) setSimPhone('71988068222')
                      }}
                      className="h-4 w-4 accent-amber-500 rounded"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Quando ativo, simula o número <strong>71 98806-8222</strong>. O bot sempre executa o fluxo profissional e reinicia o loop ao enviar <strong>"Oi"</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Número Simulado
                  </label>
                  <input
                    type="text"
                    value={simPhone}
                    onChange={(e) => setSimPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                {/* Ações Rápidas de Teste */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-400">Mensagens Prontas para Testar:</span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleSendSimulatorMessage('Oi')}
                      className="text-left rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-amber-300 font-semibold transition flex items-center justify-between"
                    >
                      <span>1. "Oi" (Reset do Loop)</span>
                      <RotateCcw className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleSendSimulatorMessage('Salvador/BA, assunto profissional')}
                      className="text-left rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-slate-300 transition"
                    >
                      2. "Salvador/BA, assunto profissional"
                    </button>
                    <button
                      onClick={() => handleSendSimulatorMessage('Fui demitido e a empresa não pagou minhas horas extras e rescisão')}
                      className="text-left rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-slate-300 transition"
                    >
                      3. "Demitido sem horas extras (Trabalhista)"
                    </button>
                    <button
                      onClick={() => handleSendSimulatorMessage('É um assunto pessoal com a Bruna')}
                      className="text-left rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-purple-300 transition"
                    >
                      4. "Assunto pessoal" (Gera pausa)
                    </button>
                  </div>
                </div>

                {/* Reset do chat simulador */}
                <button
                  onClick={() => {
                    setSimMessages([
                      {
                        sender: 'bot',
                        text: 'Olá! Sou o assistente virtual do escritório da Dra. Bruna Dourado. Para direcionar seu atendimento: de qual cidade e estado você fala? O seu contato é para um assunto Profissional/Jurídico ou Pessoal?',
                        source: 'saudacao_inicial',
                        time: 'Agora',
                      },
                    ])
                    setSimLeadState(null)
                  }}
                  className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-semibold text-slate-300 transition text-center"
                >
                  Limpar Janela do Chat
                </button>
              </div>
            </div>

            {/* Chat Simulator Mockup */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-slate-800 bg-[#0b141a] shadow-2xl overflow-hidden flex flex-col h-[580px]">
                {/* Chat Topbar */}
                <div className="p-3 bg-[#202c33] flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src="/brunadourado.jpeg"
                      alt="Avatar Dra. Bruna"
                      className="h-10 w-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                        Dra. Bruna Dourado (Bot IA)
                        {simIsDiego && (
                          <span className="bg-amber-500 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-bold">
                            DIEGO TEST
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-emerald-400">Assistente Jurídico Online</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-[11px]">Simulando: {simPhone}</span>
                  </div>
                </div>

                {/* Mensagens */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                  {simMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[80%] ${
                        msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-3 shadow-md text-xs whitespace-pre-line leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#005c4b] text-white rounded-tr-none'
                            : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/40'
                        }`}
                      >
                        {msg.text}
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-1 px-1">
                        <span>{msg.time}</span>
                        {msg.source && (
                          <span className="rounded bg-slate-800 px-1 text-[8px] text-amber-400">
                            Origem: {msg.source}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {simLoading && (
                    <div className="mr-auto rounded-2xl rounded-tl-none bg-[#202c33] p-3 text-xs text-slate-300 flex items-center gap-2">
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                      <span>Dra. Bruna IA está digitando...</span>
                    </div>
                  )}
                </div>

                {/* Input do Chat */}
                <div className="p-3 bg-[#202c33] border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={simInputText}
                    onChange={(e) => setSimInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendSimulatorMessage()
                    }}
                    placeholder="Digite a mensagem do WhatsApp e aperte Enter..."
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => handleSendSimulatorMessage()}
                    disabled={simLoading || !simInputText.trim()}
                    className="rounded-xl bg-amber-500 hover:bg-amber-400 p-2.5 text-slate-950 font-bold transition disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA 5: AUTOMAÇÃO WHATSAPP (N8N + EVOLUTION API & EXTENSÃO) */}
        {/* ==================================================================== */}
        {activeMainTab === 'extension' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Automação WhatsApp 24/7 (n8n + Evolution API)</h2>
                    <p className="text-xs text-amber-300/90">
                      Integração via Máquina Virtual local com espelhamento Multi-Device e IA Neon.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block rounded-full bg-emerald-950 border border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-300">
                  ⚡ 24/7 Redundante
                </span>
              </div>

              <div className="space-y-5 text-xs text-slate-300">
                {/* Comparativo / Destaque */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-emerald-400" />
                      Intervenção Humana
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Quando a Bruna digita pelo próprio celular, o n8n pausa o bot no Neon automaticamente.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <UserCheck className="h-4 w-4 text-amber-400" />
                      Filtro de Contatos
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Contatos com histórico ou salvos na agenda são ignorados; novos entram na triagem.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Database className="h-4 w-4 text-purple-400" />
                      Cache no Neon
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Dúvidas frequentes são respondidas diretamente pelo PostgreSQL em milissegundos.
                    </p>
                  </div>
                </div>

                {/* Passo a Passo n8n */}
                <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-5 space-y-4">
                  <h3 className="font-bold text-amber-400 text-sm flex items-center justify-between">
                    <span>Instalação na sua Máquina Virtual (3 Passos):</span>
                  </h3>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">1. Subir a Evolution API (Docker Compose)</span>
                        <button
                          onClick={() => {
                            copyToClipboard(`services:
  evolution-api:
    image: atendai/evolution-api:v2.1.2
    container_name: evolution_api
    restart: always
    ports:
      - "8080:8080"
    environment:
      - SERVER_URL=http://localhost:8080
      - AUTHENTICATION_API_KEY=ADVDourado_Secret_Key_2025_Diego
      - AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=sqlite
      - WEBHOOK_GLOBAL_ENABLED=true
      - WEBHOOK_GLOBAL_URL=http://localhost:5678/webhook/advdourado-whatsapp
      - WEBHOOK_EVENTS_MESSAGES_UPSERT=true
    volumes:
      - evolution_instances:/evolution/instances
      - evolution_store:/evolution/store
volumes:
  evolution_instances:
  evolution_store:`, 'docker_compose')
                          }}
                          className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 px-2 py-1 rounded"
                        >
                          {copiedKey === 'docker_compose' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedKey === 'docker_compose' ? 'Copiado!' : 'Copiar docker-compose.yml'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Arquivo localizado em: <code className="text-amber-300">c:\Projetos\advdourado\deploy\evolution-api\docker-compose.yml</code>
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">2. Importar o Fluxo no n8n</span>
                        <button
                          onClick={() => {
                            fetch('/deploy/n8n/advdourado-whatsapp-bot-workflow.json')
                              .then(r => r.text())
                              .then(t => copyToClipboard(t, 'n8n_json'))
                              .catch(() => copyToClipboard('Arquivo localizado em deploy/n8n/advdourado-whatsapp-bot-workflow.json', 'n8n_json'))
                          }}
                          className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 px-2 py-1 rounded"
                        >
                          {copiedKey === 'n8n_json' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedKey === 'n8n_json' ? 'Copiado!' : 'Copiar JSON do n8n'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        No n8n, clique em <strong>Workflows &gt; Add Workflow &gt; Import from File</strong> e selecione <code className="text-amber-300">deploy/n8n/advdourado-whatsapp-bot-workflow.json</code>.
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 space-y-1">
                      <span className="font-bold text-white">3. Parear com o WhatsApp da Dra. Bruna</span>
                      <p className="text-[11px] text-slate-400">
                        Acesse a Evolution API, crie a instância e leia o QR Code no celular da Bruna em <em>Aparelhos Conectados</em>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opção Alternativa: Extensão */}
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-2">
                  <h4 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                    Opção Alternativa (Extensão Chrome para WhatsApp Web)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Se preferir rodar no navegador da Dra. Bruna sem a VM, carregue a pasta <code className="text-amber-300">c:\Projetos\advdourado\extension</code> em <code className="text-slate-300">chrome://extensions/</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
