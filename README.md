# 🥇 1st Place Hackathon Codecon Universe 05/18/2025
**Codecon Universe** is a hackathon promoted by the Codecon community, aimed at programmers from all over Brazil. The 2025 edition had the theme *“Useless ideas and things nobody needs”*, challenging participants to unleash unlimited creativity and build absurdly brilliant projects.  

## 🎥 Presentation Video (YouTube)  
https://www.youtube.com/watch?v=b8nZ-fH-l7Q  

---

## 🧸 Doctor Reborn — AI Diagnosis for Reborn Babies  

> **Legal Disclaimer:** This project was created for demonstration purposes only and should not be used as a real medical source. Reborn babies do not require clinical care. Yet.  

---

## 🩺 Project Description  

**Doctor Reborn** is an AI-assisted medical diagnosis platform, dedicated exclusively to the health of Reborn Babies. Through an intuitive interface, authenticated parents can manage their dependents with full CRUD functionality, and obtain immediate esthetic and clinical diagnoses through an intelligent chat. Use the image upload feature for LLM analysis, or choose WhatsApp consultation for a more personalized service.  

---

## 👨‍💻👨‍💻 Team Members  

**Gabriel Horner**  
Experience Designer & Creative Strategist  
Responsible for the entire visual and emotional layer of the project. Ensures that every pixel has a purpose (even if useless) and that the user journey is aesthetically absurd.  
LinkedIn: https://www.linkedin.com/in/gabriel-luis-horner-201337151/  

**Lucas Klemke**  
Fullstack Developer & Technical Executor  
Transforms insane ideas into functional code. He is the brain behind the engineering that delivers clinical diagnoses on plastic dolls with hospital-level seriousness.  
LinkedIn: https://www.linkedin.com/in/lucasklemke/  

---

## ✅ Functional Requirements (FR)  

- **FR01**: Allow parent registration and authentication.  
- **FR02**: CRUD for managing Reborn Babies (dependents).  
- **FR03**: Allow image upload of a Reborn Baby for analysis.  
- **FR04**: Process the image and return a “clinical diagnosis” via LLM-powered chat.  
- **FR05**: Redirect to WhatsApp consultation for specialized services.  

---

## 🚫 Non-Functional Requirements (NFR)  

- **NFR01**: The system must be available 99.9% of the time (except during specific lunar phases).  
- **NFR02**: AI response time must not exceed 5 seconds.  
- **NFR03**: The application must be mobile-compatible.  
- **NFR04**: All communication must simulate extreme medical seriousness.  
- **NFR05**: Code must be modular and easy to maintain for future simulated syndromes.  
- **NFR06**: The application must use Next.js with server-side rendering for “almost real-time” diagnoses.  
- **NFR07**: The system must simulate medical ethics even if no legal basis exists.  

---

## 🧱 Tech Stack  

- [x] **Next.js**  
- [x] **TailwindCSS + Shadcn UI**  
- [x] **TypeScript**  
- [x] **Prisma (ORM)**  
- [x] **Local SQLite**  
- [x] **Zustand** (for global persistence of clinical state)  
- [x] **LLM with image upload support**  

---

## 🚀 How to Run the Project  

1. **Clone the repository**  

   ```bash
   git clone https://github.com/youruser/doctor_reborn.git
   cd doctor_reborn
   ```

2. **Install dependencies**  

   ```bash
   pnpm install
   ```

3. **Configure the `.env` file**  
   Create the file with the required variables:  

   ```env
   OPENAI_API_KEY=

   DATABASE_URL=""your_supabase_project_url""

   NEXTAUTH_SECRET=ouwAFDvipk5n7kLU5IqXIwxfDh0xkenB/jqF9FaYiG8=

   NEXTAUTH_URL=http://localhost:3000

   NEXT_PUBLIC_SUPABASE_URL=

   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

4. **Generate Prisma files**  

   After setting up `.env`, run:  

   ```bash
   npx prisma generate
   ```

   If you want to create and apply database migrations, run:  

   ```bash
   npx prisma migrate dev
   ```

5. **Run the project**  

   ```bash
   pnpm dev
   ```

6. **Access**  
   ```
   http://localhost:3000
   ```

---

## 💡 Future Features  

- Diagnosis by analyzing reborn baby crying audio.  
- Digital certificate of rebornological birth.  
- Integration with funeral homes and simulated births.  
- Multiplayer mode: competitions for “ugliest reborn baby.”  

---

## 🤡 Why is this gloriously useless?  

Because nobody *in their right mind* would pay for medical diagnoses on a vinyl doll. I think.  
