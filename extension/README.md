# ADVDourado - Extensão Chrome para WhatsApp Web

Extensão de automação e triagem jurídica com inteligência artificial para o WhatsApp Web da Dra. Bruna Dourado.

---

## 🚀 Como Instalar no Google Chrome

1. Abra o navegador Google Chrome no computador onde o WhatsApp Web será utilizado.
2. Na barra de endereços, digite e acesse: `chrome://extensions/`
3. No canto superior direito da tela, **ative a chave "Modo do desenvolvedor"**.
4. No canto superior esquerdo, clique no botão **"Carregar sem compactação"** (ou *Load unpacked*).
5. Selecione a pasta `c:\Projetos\advdourado\extension` (ou a pasta onde este arquivo está localizado).
6. Pronto! O ícone da **ADVDourado IA** aparecerá na barra de ferramentas do seu Chrome.

---

## ⚙️ Configurações Principais

Clique no ícone da extensão para abrir o popup:
- **Automação do Bot:** Liga/desliga o assistente em tempo real.
- **Modo Testador (Diego):** Quando ativado, qualquer mensagem vinda do número do Diego (`71 98806-8222`) passará pelo funil completo para testes. Ao digitar `"Oi"`, o fluxo reinicia.
- **URL do Backend:** Por padrão usa `http://localhost:3000` em desenvolvimento ou `https://advdourado.com.br` em produção.
- **Chave Gemini API:** Opcional. Se preenchida, utiliza a sua cota personalizada do Google Gemini.
- **Delay de Digitação:** 3 segundos por padrão, simulando digitação humana antes de enviar.

---

## 🛡️ Regras de Atendimento
1. **Contatos Novos / Desconhecidos:** O robô pergunta a cidade/estado e se o assunto é Profissional ou Pessoal.
2. **Assuntos Pessoais:** O bot envia imediatamente *"Em breve, Bruna vai te dar uma resposta."* e desliga o atendimento automatizado para que a Dra. Bruna fale diretamente.
3. **Assuntos Profissionais:** Qualifica se é Trabalhista, Cível, Consumidor ou Parceiro, salvando os dados no banco Neon.
4. **Cache Inteligente no Neon:** Perguntas frequentes são respondidas diretamente pelo banco Neon sem gastar chamadas de IA.
