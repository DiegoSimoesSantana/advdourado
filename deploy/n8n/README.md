# ADVDourado - Integração n8n + Evolution API v2 + Neon IA

Guia prático para subir a Evolution API e importar o fluxo do n8n na sua Máquina Virtual.

---

## 🚀 Passo 1: Subir a Evolution API na sua Máquina Virtual

1. No terminal da sua VM, navegue até a pasta `deploy/evolution-api`:
   ```bash
   cd c:\Projetos\advdourado\deploy\evolution-api
   docker compose up -d
   ```
2. A Evolution API estará rodando em `http://localhost:8080`.

---

## 📲 Passo 2: Criar a Instância e Ler o QR Code

Você pode criar a instância da Dra. Bruna enviando uma requisição cURL ou usando o Postman:

```bash
curl -X POST "http://localhost:8080/instance/create" \
  -H "apikey: ADVDourado_Secret_Key_2025_Diego" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "advdourado",
    "token": "ADVDourado_Token_2025",
    "qrcode": true,
    "integration": "WHATSAPP_BAILEYS"
  }'
```

Ou acesse no navegador: `http://localhost:8080/instance/connect/advdourado`
1. Abra o WhatsApp no celular da Dra. Bruna.
2. Vá em **Aparelhos Conectados** > **Conectar um aparelho**.
3. Aponte a câmera para o QR Code gerado.
4. Pronto! O WhatsApp estará 100% conectado 24/7 na sua VM.

---

## ⚙️ Passo 3: Importar o Fluxo no n8n

1. Abra o seu **n8n** (`http://localhost:5678`).
2. Clique em **Workflows** > **Add Workflow**.
3. No canto superior direito, clique nos 3 pontinhos `...` e selecione **"Import from File"** (ou aperte `Ctrl + V` com o conteúdo do arquivo [`advdourado-whatsapp-bot-workflow.json`](./advdourado-whatsapp-bot-workflow.json)).
4. **Ative o Workflow** (chave *Active* no topo).

---

## 🛡️ O que o Fluxo faz automaticamente?

1. **Filtra grupos:** Se for mensagem de grupo, ignora.
2. **Intervenção Humana:** Se a Dra. Bruna responder qualquer coisa pelo próprio celular, o n8n detecta (`fromMe: true`) e pausa o robô para aquele contato no banco Neon.
3. **Triagem Profissional:** Contatos desconhecidos recebem a saudação inicial e passam pelo funil qualificador (Trabalhista, Cível, Consumidor).
4. **Assuntos Pessoais:** Responde *"Em breve, Bruna vai te dar uma resposta."* e desliga o robô.
5. **Modo Diego (`71 98806-8222`):** Sempre passa pelo fluxo para testes e reinicia o loop ao enviar `"Oi"`.
6. **Cache Neon:** Consulta primeiro a base de conhecimento no PostgreSQL para economizar custos de IA e responder em milissegundos.
