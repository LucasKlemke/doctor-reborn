# 🧸 RebornMed — Diagnóstico IA para Bebês Reborn

> **Aviso Legal:** Este projeto foi criado para fins de demonstração e não deve ser utilizado como fonte médica real. Bebês Reborn não necessitam de atendimento clínico. Ainda.

---

## 🩺 Descrição do Projeto

O **RebornMed** é uma plataforma de diagnóstico médico assistido por IA, dedicada exclusivamente à saúde de Bebês Reborn. Com o avanço das leis que proíbem o atendimento de bonecos no sistema público de saúde (Lei nº 14.785), nasceu a necessidade de um sistema ético, preciso e digital para acolher pais de prole neonatamodular plástica.

Através de uma interface simples, o usuário pode subir uma imagem do seu bebê e receber um diagnóstico estético imediato — com inteligência artificial no plano básico, ou _inteligência humana_ (um link pro WhatsApp) no plano Pro.

---

## ✅ Requisitos Funcionais (RF)

- **RF01**: Permitir upload de imagem de um Bebê Reborn.
- **RF02**: Processar a imagem e retornar um "diagnóstico clínico".
- **RF03**: Exibir frases automáticas depreciando a aparência do bebê (modo gratuito).
- **RF04**: Exibir botão para "Plano Pro", redirecionando para o WhatsApp.
- **RF05**: Sistema de planos: gratuito (IA) e pago (HI).
- **RF06**: Registro de histórico de diagnósticos.
- **RF07**: Tela de loading com frases técnicas rebornológicas.
- **RF08**: Página de erro caso o bebê enviado seja _humano real_.

---

## 🚫 Requisitos Não Funcionais (RNF)

- **RNF01**: O sistema deve estar disponível 99,9% do tempo (exceto em fases lunares específicas).
- **RNF02**: O tempo de resposta da IA não pode exceder 5 segundos.
- **RNF03**: A aplicação deve ser compatível com dispositivos móveis.
- **RNF04**: Toda comunicação deve simular extrema seriedade médica.
- **RNF05**: O código deve ser modular e de fácil manutenção para futuras síndromes simuladas.
- **RNF06**: A aplicação deve utilizar Next.js com renderização server-side para diagnósticos "em tempo quase real".
- **RNF07**: O sistema deve simular ética médica mesmo que a base legal seja inexistente.

---

## 🧱 Stack Utilizada

- [x] **Next.js**
- [x] **TailwindCSS + Shadcn UI**
- [x] **TypeScript**
- [x] **Zustand** (caso desejem persistência global do estado clínico)
- [x] **IA ou Array de Frases** depreciativas (conforme plano)
- [x] **WhatsApp API** (redirecionamento para plano Pro)

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seuusuario/rebornmed.git
   cd rebornmed
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure o arquivo `.env.local`**
   Crie o arquivo com as variáveis necessárias:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   OPENAI_API_KEY=sua-chave-aqui (caso use IA real)
   ```

4. **Rode o projeto**

   ```bash
   pnpm dev
   ```

5. **Acesse**
   ```
   http://localhost:3000
   ```

---

## 💡 Features Futuras

- Diagnóstico por áudio do choro reborn.
- Certificado digital de nascimento rebornológico.
- Integração com funerárias e partos simulados.
- Modo multiplayer: competições de “reborn mais feio”.

---

## 🤡 Por que isso é gloriosamente inútil?

Porque ninguém _em sã consciência_ gastaria dinheiro com diagnósticos médicos para um objeto de vinil.
