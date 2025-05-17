# 🧸 Doctor Reborn — Diagnóstico IA para Bebês Reborn

> **Aviso Legal:** Este projeto foi criado para fins de demonstração e não deve ser utilizado como fonte médica real. Bebês Reborn não necessitam de atendimento clínico. Ainda.

---

## 🩺 Descrição do Projeto

O **Doctor Reborn** é uma plataforma de diagnóstico médico assistido por IA, dedicada exclusivamente à saúde de Bebês Reborn. Através de uma interface intuitiva, pais autenticados podem gerenciar seus dependentes com um CRUD completo, e obter diagnósticos estéticos e clínicos imediatos através de um chat inteligente. Use a funcionalidade de upload de imagens para análise com LLM, ou opte pelo atendimento via WhatsApp para uma consulta mais personalizada.

---

## ✅ Requisitos Funcionais (RF)

- **RF01**: Permitir o cadastro e autenticação de pais.
- **RF02**: CRUD para gerenciamento de Bebês Reborn (dependentes).
- **RF03**: Permitir upload de imagem de um Bebê Reborn para análise.
- **RF04**: Processar a imagem e retornar um "diagnóstico clínico" via chat com LLM.
- **RF05**: Exibir frases automáticas depreciando a aparência do bebê (modo gratuito).
- **RF06**: Direcionamento para atendimento via WhatsApp para consultas especializadas.

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
- [x] **SQLite Local**
- [x] **Zustand** (para persistência global do estado clínico)
- [x] **LLM com suporte a upload de imagens**

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seuusuario/doctor_reborn.git
   cd doctor_reborn
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure o arquivo `.env`**
   Crie o arquivo com as variáveis necessárias:

   ```env
   OPENAI_API_KEY=

   DATABASE_URL="file:./dev.db"

   NEXTAUTH_SECRET=

   NEXTAUTH_URL=http://localhost:3000
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
