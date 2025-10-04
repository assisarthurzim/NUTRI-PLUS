// Mobile Navigation
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-link[href*=" + sectionId + "]")?.classList.add("active")
    } else {
      document.querySelector(".nav-link[href*=" + sectionId + "]")?.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", scrollActive)

// Diet Calculator
const dietForm = document.getElementById("dietForm")
const results = document.getElementById("results")
const closeResults = document.getElementById("closeResults")

dietForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const peso = Number.parseFloat(document.getElementById("peso").value)
  const altura = Number.parseFloat(document.getElementById("altura").value) / 100 // Convert to meters
  const idade = Number.parseInt(document.getElementById("idade").value)
  const sexo = document.getElementById("sexo").value
  const atividade = document.getElementById("atividade").value

  // Calculate IMC
  const imc = (peso / (altura * altura)).toFixed(1)

  // Determine IMC status
  let imcStatus = ""
  if (imc < 18.5) imcStatus = "Abaixo do peso"
  else if (imc < 25) imcStatus = "Peso normal"
  else if (imc < 30) imcStatus = "Sobrepeso"
  else imcStatus = "Obesidade"

  // Calculate BMR (Basal Metabolic Rate)
  let bmr
  if (sexo === "masculino") {
    bmr = 88.362 + 13.397 * peso + 4.799 * altura * 100 - 5.677 * idade
  } else {
    bmr = 447.593 + 9.247 * peso + 3.098 * altura * 100 - 4.33 * idade
  }

  // Calculate TDEE (Total Daily Energy Expenditure)
  let tdee
  switch (atividade) {
    case "sedentario":
      tdee = bmr * 1.2
      break
    case "leve":
      tdee = bmr * 1.375
      break
    case "moderado":
      tdee = bmr * 1.55
      break
    case "intenso":
      tdee = bmr * 1.725
      break
    default:
      tdee = bmr * 1.2
  }

  const calorias = Math.round(tdee)

  // Generate diet plan
  const dietPlan = generateDietPlan(calorias, imc)

  // Display results
  document.getElementById("imcValue").textContent = imc
  document.getElementById("imcStatus").textContent = imcStatus
  document.getElementById("caloriasValue").textContent = calorias
  document.getElementById("dietPlan").innerHTML = dietPlan

  results.style.display = "block"
  results.scrollIntoView({ behavior: "smooth", block: "nearest" })
})

closeResults.addEventListener("click", () => {
  results.style.display = "none"
})

function generateDietPlan(calorias, imc) {
  let plan = '<div class="diet-plan">'

  // Breakfast
  plan += '<div class="meal-section">'
  plan += "<h5>☀️ Café da Manhã (25% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>2 fatias de pão integral</li>"
  plan += "<li>2 ovos mexidos ou cozidos</li>"
  plan += "<li>1 fruta (banana, maçã ou mamão)</li>"
  plan += "<li>Café ou chá sem açúcar</li>"
  plan += "</ul>"
  plan += "</div>"

  // Morning Snack
  plan += '<div class="meal-section">'
  plan += "<h5>🥤 Lanche da Manhã (10% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>1 iogurte natural</li>"
  plan += "<li>1 porção de oleaginosas (castanhas, amêndoas)</li>"
  plan += "</ul>"
  plan += "</div>"

  // Lunch
  plan += '<div class="meal-section">'
  plan += "<h5>🍽️ Almoço (30% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>1 porção de proteína (frango, peixe ou carne magra - 150g)</li>"
  plan += "<li>2 colheres de arroz integral</li>"
  plan += "<li>1 concha de feijão</li>"
  plan += "<li>Salada verde à vontade</li>"
  plan += "<li>Legumes cozidos</li>"
  plan += "</ul>"
  plan += "</div>"

  // Afternoon Snack
  plan += '<div class="meal-section">'
  plan += "<h5>🥗 Lanche da Tarde (10% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>1 fruta</li>"
  plan += "<li>2 torradas integrais com pasta de amendoim</li>"
  plan += "</ul>"
  plan += "</div>"

  // Dinner
  plan += '<div class="meal-section">'
  plan += "<h5>🌙 Jantar (20% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>1 porção de proteína magra (120g)</li>"
  plan += "<li>Salada ou sopa de legumes</li>"
  plan += "<li>1 porção pequena de carboidrato (batata doce ou quinoa)</li>"
  plan += "</ul>"
  plan += "</div>"

  // Evening Snack
  plan += '<div class="meal-section">'
  plan += "<h5>🌜 Ceia (5% das calorias)</h5>"
  plan += "<ul>"
  plan += "<li>1 xícara de chá</li>"
  plan += "<li>2 biscoitos integrais ou 1 fruta</li>"
  plan += "</ul>"
  plan += "</div>"

  // Tips
  plan += '<div class="diet-tips">'
  plan += "<h5>💡 Dicas Importantes:</h5>"
  plan += "<ul>"
  plan += "<li>Beba pelo menos 2 litros de água por dia</li>"
  plan += "<li>Evite alimentos processados e açúcar refinado</li>"
  plan += "<li>Faça refeições a cada 3 horas</li>"
  plan += "<li>Pratique atividade física regularmente</li>"

  if (imc < 18.5) {
    plan +=
      "<li><strong>Seu IMC indica baixo peso. Considere aumentar a ingestão calórica com alimentos nutritivos.</strong></li>"
  } else if (imc >= 25) {
    plan +=
      "<li><strong>Seu IMC indica sobrepeso. Foque em alimentos com baixa densidade calórica e aumente a atividade física.</strong></li>"
  }

  plan += "</ul>"
  plan += "</div>"

  plan += "</div>"

  return plan
}

// Recipe Tabs
const tabBtns = document.querySelectorAll(".tab-btn")
const receitaCards = document.querySelectorAll(".receita-card")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    tabBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const category = btn.getAttribute("data-tab")

    // Filter recipes
    receitaCards.forEach((card) => {
      if (category === "todas" || card.getAttribute("data-category") === category) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Modal Functions
const modal = document.getElementById("modal")
const modalClose = document.getElementById("modalClose")
const modalBody = document.getElementById("modalBody")

modalClose.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal()
})

function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function openModal(content) {
  modalBody.innerHTML = content
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Show Diet Details
function showDietDetails(type) {
  let content = ""

  if (type === "perda") {
    content = `
            <h2>Dieta para Perda de Peso</h2>
            <p>Esta dieta é projetada para criar um déficit calórico saudável, promovendo perda de peso gradual e sustentável.</p>
            
            <h3>Princípios:</h3>
            <ul>
                <li>Déficit calórico de 300-500 kcal/dia</li>
                <li>Alta ingestão de proteínas para preservar massa muscular</li>
                <li>Fibras para aumentar saciedade</li>
                <li>Carboidratos complexos em quantidades moderadas</li>
                <li>Gorduras saudáveis em porções controladas</li>
            </ul>
            
            <h3>Alimentos Recomendados:</h3>
            <ul>
                <li>Proteínas: Frango, peixe, ovos, tofu</li>
                <li>Carboidratos: Batata doce, arroz integral, aveia</li>
                <li>Vegetais: Brócolis, espinafre, couve, abobrinha</li>
                <li>Frutas: Maçã, morango, melancia (com moderação)</li>
                <li>Gorduras: Abacate, azeite, castanhas (porções pequenas)</li>
            </ul>
            
            <h3>Evitar:</h3>
            <ul>
                <li>Açúcares refinados e doces</li>
                <li>Alimentos processados</li>
                <li>Bebidas calóricas</li>
                <li>Frituras</li>
            </ul>
        `
  } else if (type === "ganho") {
    content = `
            <h2>Dieta para Ganho de Massa Muscular</h2>
            <p>Plano alimentar com superávit calórico controlado para promover hipertrofia muscular.</p>
            
            <h3>Princípios:</h3>
            <ul>
                <li>Superávit calórico de 300-500 kcal/dia</li>
                <li>Alta ingestão proteica (2g/kg de peso corporal)</li>
                <li>Carboidratos suficientes para energia e recuperação</li>
                <li>Refeições frequentes (5-6 por dia)</li>
                <li>Timing nutricional ao redor dos treinos</li>
            </ul>
            
            <h3>Alimentos Recomendados:</h3>
            <ul>
                <li>Proteínas: Carne vermelha magra, frango, peixe, ovos, whey protein</li>
                <li>Carboidratos: Arroz, batata, macarrão integral, aveia, pão integral</li>
                <li>Gorduras: Amendoim, abacate, azeite, salmão</li>
                <li>Vegetais: Todos, especialmente os verdes</li>
                <li>Frutas: Banana, manga, uva</li>
            </ul>
            
            <h3>Dicas:</h3>
            <ul>
                <li>Consuma proteína em todas as refeições</li>
                <li>Carboidratos antes e depois do treino</li>
                <li>Não pule refeições</li>
                <li>Hidrate-se adequadamente</li>
            </ul>
        `
  } else if (type === "manutencao") {
    content = `
            <h2>Dieta Equilibrada para Manutenção</h2>
            <p>Alimentação balanceada para manter peso saudável e garantir todos os nutrientes essenciais.</p>
            
            <h3>Princípios:</h3>
            <ul>
                <li>Calorias de manutenção (TDEE)</li>
                <li>Macros balanceados (40% carbo, 30% proteína, 30% gordura)</li>
                <li>Variedade alimentar</li>
                <li>Foco em alimentos integrais</li>
                <li>Flexibilidade e sustentabilidade</li>
            </ul>
            
            <h3>Estrutura das Refeições:</h3>
            <ul>
                <li>Café da manhã completo e nutritivo</li>
                <li>Almoço balanceado com todos os grupos alimentares</li>
                <li>Lanches saudáveis entre refeições</li>
                <li>Jantar leve mas satisfatório</li>
            </ul>
            
            <h3>Grupos Alimentares:</h3>
            <ul>
                <li>Proteínas: Carnes magras, peixes, ovos, leguminosas</li>
                <li>Carboidratos: Integrais preferencialmente</li>
                <li>Gorduras: Fontes naturais e saudáveis</li>
                <li>Vegetais: Variedade de cores</li>
                <li>Frutas: 2-3 porções diárias</li>
            </ul>
            
            <h3>Regra 80/20:</h3>
            <p>80% da alimentação deve ser de alimentos nutritivos e integrais, 20% pode ser mais flexível para ocasiões sociais e prazeres pessoais.</p>
        `
  }

  openModal(content)
}

// Show Recipe Details
function showRecipe(recipeId) {
  const recipes = {
    oats: {
      title: "Overnight Oats com Frutas Vermelhas",
      time: "10 min (+ 8h geladeira)",
      servings: "1 porção",
      calories: "320 kcal",
      ingredients: [
        "½ xícara de aveia em flocos",
        "1 xícara de leite vegetal (amêndoas ou coco)",
        "1 colher de sopa de chia",
        "1 colher de chá de mel ou xarope de bordo",
        "½ xícara de frutas vermelhas (morango, mirtilo, framboesa)",
        "1 colher de sopa de castanhas picadas",
      ],
      instructions: [
        "Em um pote de vidro, misture a aveia, chia e leite vegetal",
        "Adicione o mel e mexa bem",
        "Tampe e leve à geladeira por no mínimo 8 horas (ou overnight)",
        "Pela manhã, adicione as frutas vermelhas por cima",
        "Finalize com as castanhas picadas",
        "Está pronto para consumir!",
      ],
    },
    panquecas: {
      title: "Panquecas Proteicas de Banana",
      time: "15 min",
      servings: "2 porções",
      calories: "280 kcal",
      ingredients: [
        "2 bananas maduras",
        "2 ovos",
        "½ xícara de aveia em flocos",
        "1 colher de chá de canela",
        "1 pitada de sal",
        "Óleo de coco para untar",
      ],
      instructions: [
        "Amasse as bananas em um bowl",
        "Adicione os ovos e misture bem",
        "Acrescente a aveia, canela e sal",
        "Misture até obter uma massa homogênea",
        "Aqueça uma frigideira antiaderente com um pouco de óleo de coco",
        "Despeje porções da massa e cozinhe por 2-3 minutos de cada lado",
        "Sirva com frutas frescas ou mel",
      ],
    },
    frango: {
      title: "Frango Grelhado com Quinoa",
      time: "30 min",
      servings: "2 porções",
      calories: "450 kcal",
      ingredients: [
        "2 peitos de frango (300g)",
        "1 xícara de quinoa",
        "2 xícaras de água ou caldo de legumes",
        "Abobrinha, pimentão e tomate cereja",
        "Alecrim, tomilho, alho",
        "Azeite, sal e pimenta",
      ],
      instructions: [
        "Tempere o frango com ervas, alho, sal e pimenta",
        "Grelhe o frango por 6-7 minutos de cada lado",
        "Cozinhe a quinoa no caldo por 15 minutos",
        "Corte os vegetais e asse no forno a 200°C por 20 minutos",
        "Monte o prato com quinoa, frango fatiado e vegetais",
        "Regue com azeite e sirva",
      ],
    },
    salmao: {
      title: "Salmão com Batata Doce",
      time: "25 min",
      servings: "2 porções",
      calories: "520 kcal",
      ingredients: [
        "2 filés de salmão (300g)",
        "2 batatas doces médias",
        "1 maço de brócolis",
        "Limão, endro, alho",
        "Azeite, sal e pimenta",
      ],
      instructions: [
        "Corte as batatas doces em cubos e tempere com azeite e sal",
        "Asse a 200°C por 25 minutos",
        "Tempere o salmão com limão, endro, alho, sal e pimenta",
        "Asse o salmão por 15 minutos a 180°C",
        "Cozinhe o brócolis no vapor por 5 minutos",
        "Sirva tudo junto e aproveite",
      ],
    },
    sopa: {
      title: "Sopa de Legumes Detox",
      time: "35 min",
      servings: "4 porções",
      calories: "180 kcal",
      ingredients: [
        "2 xícaras de abóbora em cubos",
        "2 cenouras",
        "1 cebola",
        "2 dentes de alho",
        "1 pedaço de gengibre",
        "Cúrcuma, sal e pimenta",
        "1 litro de caldo de legumes",
      ],
      instructions: [
        "Refogue a cebola e alho no azeite",
        "Adicione o gengibre ralado e cúrcuma",
        "Acrescente os legumes e o caldo",
        "Cozinhe por 25 minutos até os legumes ficarem macios",
        "Bata tudo no liquidificador até ficar cremoso",
        "Ajuste o tempero e sirva quente",
      ],
    },
    peixe: {
      title: "Peixe Grelhado com Salada",
      time: "20 min",
      servings: "2 porções",
      calories: "350 kcal",
      ingredients: [
        "2 filés de tilápia (300g)",
        "Mix de folhas verdes",
        "Tomate cereja, pepino, cenoura",
        "Limão, ervas frescas",
        "Iogurte natural, mostarda, mel (molho)",
        "Azeite, sal e pimenta",
      ],
      instructions: [
        "Tempere o peixe com limão, sal, pimenta e ervas",
        "Grelhe por 4-5 minutos de cada lado",
        "Prepare a salada com as folhas e vegetais",
        "Faça o molho misturando iogurte, mostarda e mel",
        "Monte o prato e regue com o molho",
        "Sirva imediatamente",
      ],
    },
    energy: {
      title: "Energy Balls de Tâmaras",
      time: "10 min",
      servings: "12 bolinhas",
      calories: "150 kcal (3 unidades)",
      ingredients: [
        "1 xícara de tâmaras sem caroço",
        "½ xícara de castanhas mistas",
        "2 colheres de sopa de cacau em pó",
        "1 colher de sopa de mel",
        "Coco ralado para cobrir",
      ],
      instructions: [
        "Coloque as tâmaras e castanhas no processador",
        "Pulse até formar uma massa pegajosa",
        "Adicione o cacau e mel, misture bem",
        "Faça bolinhas com as mãos",
        "Passe no coco ralado",
        "Guarde na geladeira por até 1 semana",
      ],
    },
    hummus: {
      title: "Hummus com Palitos de Vegetais",
      time: "5 min",
      servings: "4 porções",
      calories: "200 kcal",
      ingredients: [
        "1 lata de grão-de-bico",
        "2 colheres de sopa de tahine",
        "1 dente de alho",
        "Suco de 1 limão",
        "Azeite, cominho, sal",
        "Cenoura, pepino, pimentão (palitos)",
      ],
      instructions: [
        "Escorra o grão-de-bico (reserve um pouco da água)",
        "Bata no processador com tahine, alho, limão e temperos",
        "Adicione água do grão-de-bico até obter consistência cremosa",
        "Transfira para um pote e regue com azeite",
        "Corte os vegetais em palitos",
        "Sirva o hummus com os vegetais",
      ],
    },
    mousse: {
      title: "Mousse de Chocolate com Abacate",
      time: "10 min",
      servings: "4 porções",
      calories: "220 kcal",
      ingredients: [
        "2 abacates maduros",
        "¼ xícara de cacau em pó",
        "¼ xícara de mel ou xarope de bordo",
        "1 colher de chá de essência de baunilha",
        "1 pitada de sal",
        "Leite vegetal (se necessário)",
      ],
      instructions: [
        "Bata todos os ingredientes no liquidificador",
        "Adicione leite vegetal se necessário para ajustar consistência",
        "Bata até ficar completamente cremoso",
        "Distribua em potinhos",
        "Leve à geladeira por 1 hora",
        "Decore com frutas ou cacau nibs antes de servir",
      ],
    },
    nicecream: {
      title: "Nice Cream de Banana",
      time: "5 min",
      servings: "2 porções",
      calories: "120 kcal",
      ingredients: [
        "3 bananas congeladas em rodelas",
        "1 colher de sopa de pasta de amendoim (opcional)",
        "1 colher de chá de cacau em pó (opcional)",
        "Toppings: granola, frutas, chocolate",
      ],
      instructions: [
        "Coloque as bananas congeladas no processador",
        "Bata até formar uma consistência cremosa (pode levar 5 minutos)",
        "Adicione pasta de amendoim ou cacau se desejar",
        "Sirva imediatamente como sorvete soft",
        "Ou congele por 1 hora para consistência mais firme",
        "Adicione seus toppings favoritos",
      ],
    },
  }

  const recipe = recipes[recipeId]

  if (recipe) {
    const content = `
            <h2>${recipe.title}</h2>
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <span><strong>⏱️ Tempo:</strong> ${recipe.time}</span>
                <span><strong>🍽️ Porções:</strong> ${recipe.servings}</span>
                <span><strong>🔥 Calorias:</strong> ${recipe.calories}</span>
            </div>
            
            <h3>Ingredientes:</h3>
            <ul>
                ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
            
            <h3>Modo de Preparo:</h3>
            <ol>
                ${recipe.instructions.map((inst) => `<li>${inst}</li>`).join("")}
            </ol>
        `

    openModal(content)
  }
}

// Contact Nutritionist
function contactNutritionist(name) {
  const content = `
        <h2>Agendar Consulta com ${name}</h2>
        <p>Para agendar sua consulta online, preencha o formulário abaixo e entraremos em contato em até 24 horas.</p>
        
        <form id="contactForm" style="margin-top: 1.5rem;">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Nome Completo</label>
                <input type="text" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e5e5; border-radius: 0.5rem;">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">E-mail</label>
                <input type="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e5e5; border-radius: 0.5rem;">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Telefone/WhatsApp</label>
                <input type="tel" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e5e5; border-radius: 0.5rem;">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Melhor dia e horário</label>
                <input type="text" placeholder="Ex: Segunda-feira, 14h" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e5e5; border-radius: 0.5rem;">
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Mensagem (opcional)</label>
                <textarea rows="4" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e5e5; border-radius: 0.5rem;" placeholder="Conte um pouco sobre seus objetivos..."></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary btn-full">Enviar Solicitação</button>
        </form>
    `

  openModal(content)

  // Handle form submission
  setTimeout(() => {
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Solicitação enviada com sucesso! Entraremos em contato em breve.")
      closeModal()
    })
  }, 100)
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
