"use strict";

const STORAGE_KEY = "doce-saber-save-v1";
const QUESTIONS_PER_LEVEL = 5;
const PASSING_SCORE = 3;
const LETTERS = ["A", "B", "C"];

const levels = [
  { title: "Portão dos Milhares", icon: "🔢", topic: "Números até 9.999", skill: "EF03MA01", questions: [
    { text: "Qual número é formado por 3 milhares, 4 centenas, 2 dezenas e 6 unidades?", choices: ["3.426", "3.246", "4.326"], answer: 0, explanation: "3 milhares = 3.000; 4 centenas = 400; 2 dezenas = 20; e 6 unidades. Juntando tudo: 3.426." },
    { text: "Como escrevemos o número 5.018 por extenso?", choices: ["Cinco mil e dezoito", "Quinhentos e dezoito", "Cinco mil e oitenta"], answer: 0, explanation: "5.018 tem 5 milhares, nenhuma centena, 1 dezena e 8 unidades: cinco mil e dezoito." },
    { text: "Qual número vem logo depois de 2.999?", choices: ["2.100", "3.000", "2.990"], answer: 1, explanation: "Depois de 2.999 unidades, completamos 3 milhares: o próximo número é 3.000." },
    { text: "No número 7.352, quanto vale o algarismo 3?", choices: ["3 unidades", "30 dezenas", "300"], answer: 2, explanation: "O 3 está na casa das centenas. Então ele vale 3 centenas, ou 300." },
    { text: "Qual é a decomposição correta de 4.709?", choices: ["4.000 + 700 + 9", "4.000 + 70 + 9", "400 + 700 + 9"], answer: 0, explanation: "O 4 vale 4.000, o 7 vale 700, o 0 vale zero dezenas e o 9 vale 9." },
    { text: "Qual destes números é o maior?", choices: ["6.180", "6.801", "6.108"], answer: 1, explanation: "Todos têm 6 milhares. Comparando as centenas, 8 é maior que 1; por isso 6.801 é o maior." }
  ] },
  { title: "Ponte da Ordem", icon: "↕️", topic: "Comparação e sequência", skill: "EF03MA01", questions: [
    { text: "Qual número é menor?", choices: ["4.530", "4.503", "4.350"], answer: 2, explanation: "Todos têm 4 milhares. Nas centenas, 3 é menor que 5; então 4.350 é o menor." },
    { text: "Complete a sequência: 1.200, 1.300, 1.400, ___.", choices: ["1.410", "1.500", "2.400"], answer: 1, explanation: "A sequência aumenta de 100 em 100. Depois de 1.400 vem 1.500." },
    { text: "Qual sinal deixa a comparação verdadeira? 2.765 ___ 2.756", choices: [">", "<", "="], answer: 0, explanation: "Os milhares e as centenas são iguais. Nas dezenas, 6 é maior que 5; então 2.765 > 2.756." },
    { text: "Que número fica entre 3.498 e 3.500?", choices: ["3.490", "3.499", "3.501"], answer: 1, explanation: "Contando de um em um: 3.498, 3.499, 3.500." },
    { text: "Qual lista está em ordem crescente?", choices: ["2.340, 2.304, 2.430", "2.304, 2.340, 2.430", "2.430, 2.340, 2.304"], answer: 1, explanation: "Crescente quer dizer do menor para o maior: 2.304, depois 2.340, depois 2.430." },
    { text: "Na reta numérica, qual número está mais perto de 5.000?", choices: ["4.990", "4.850", "5.200"], answer: 0, explanation: "4.990 está a 10 de 5.000; 4.850 está a 150 e 5.200 está a 200." }
  ] },
  { title: "Cachoeira da Soma", icon: "➕", topic: "Adição com estratégia", skill: "EF03MA05", questions: [
    { text: "A biblioteca tinha 238 livros e ganhou mais 145. Quantos livros tem agora?", choices: ["373", "383", "393"], answer: 1, explanation: "238 + 145 = 238 + 100 + 40 + 5 = 383 livros." },
    { text: "Quanto é 356 + 227?", choices: ["573", "583", "593"], answer: 1, explanation: "356 + 200 = 556; mais 27 = 583." },
    { text: "Uma trilha tem 425 metros e outra tem 310 metros. Quantos metros têm juntas?", choices: ["725", "735", "7350"], answer: 1, explanation: "425 + 310 = 735 metros." },
    { text: "Qual soma resulta em 1.000?", choices: ["650 + 350", "600 + 300", "750 + 150"], answer: 0, explanation: "650 + 350 = 1.000. Podemos completar 650 até 700 com 50 e ainda faltam 300." },
    { text: "Lia juntou 174 figurinhas e ganhou 89. Quantas tem?", choices: ["253", "263", "273"], answer: 1, explanation: "174 + 89 = 174 + 80 + 9 = 263 figurinhas." },
    { text: "Uma escola arrecadou 326 kg de alimentos pela manhã e 198 kg à tarde. Qual foi o total?", choices: ["514 kg", "524 kg", "534 kg"], answer: 1, explanation: "326 + 198 = 326 + 200 - 2 = 524 kg." }
  ] },
  { title: "Caverna da Subtração", icon: "➖", topic: "Subtração e diferenças", skill: "EF03MA05", questions: [
    { text: "Havia 500 balas. Foram distribuídas 175. Quantas sobraram?", choices: ["325", "335", "375"], answer: 0, explanation: "500 - 175 = 325. Uma estratégia é fazer 500 - 100 = 400, -70 = 330, -5 = 325." },
    { text: "Quanto é 742 - 318?", choices: ["414", "424", "434"], answer: 1, explanation: "742 - 300 = 442; 442 - 18 = 424." },
    { text: "Uma coleção tinha 263 cartões. Quantos faltam para chegar a 300?", choices: ["27", "37", "47"], answer: 1, explanation: "De 263 até 300 faltam 37: 263 + 37 = 300." },
    { text: "O ônibus tinha 86 passageiros. Desceram 29. Quantos ficaram?", choices: ["57", "67", "63"], answer: 0, explanation: "86 - 29 = 86 - 30 + 1 = 57 passageiros." },
    { text: "Qual é o resultado de 1.000 - 460?", choices: ["440", "540", "640"], answer: 1, explanation: "1.000 - 400 = 600; depois 600 - 60 = 540." },
    { text: "A diferença entre 650 e 425 é...", choices: ["125", "225", "235"], answer: 1, explanation: "650 - 425 = 225. Podemos conferir: 425 + 225 = 650." }
  ] },
  { title: "Jardim das Fileiras", icon: "✖️", topic: "Multiplicação", skill: "EF03MA07", questions: [
    { text: "Há 4 vasos com 5 flores em cada um. Quantas flores há ao todo?", choices: ["9", "20", "25"], answer: 1, explanation: "São 4 grupos de 5: 5 + 5 + 5 + 5 = 20, ou 4 × 5 = 20." },
    { text: "Uma caixa tem 3 fileiras com 6 maçãs em cada. Quantas maçãs?", choices: ["18", "9", "36"], answer: 0, explanation: "3 fileiras de 6: 3 × 6 = 18 maçãs." },
    { text: "Quanto é 8 × 4?", choices: ["28", "32", "36"], answer: 1, explanation: "8 grupos de 4 são 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 = 32." },
    { text: "Cada pacote tem 10 adesivos. Quantos adesivos há em 7 pacotes?", choices: ["17", "70", "700"], answer: 1, explanation: "7 grupos de 10: 7 × 10 = 70 adesivos." },
    { text: "Há 5 mesas com 4 crianças em cada mesa. Quantas crianças?", choices: ["20", "9", "15"], answer: 0, explanation: "5 grupos de 4: 5 × 4 = 20 crianças." },
    { text: "Uma cartela tem 3 linhas e 7 colunas de figurinhas. Quantas figurinhas?", choices: ["10", "21", "37"], answer: 1, explanation: "São 3 grupos de 7: 3 × 7 = 21 figurinhas." }
  ] },
  { title: "Labirinto da Divisão", icon: "➗", topic: "Divisão em partes iguais", skill: "EF03MA08", questions: [
    { text: "12 biscoitos serão divididos igualmente entre 3 crianças. Quantos para cada?", choices: ["3", "4", "6"], answer: 1, explanation: "12 dividido em 3 partes iguais dá 4 em cada: 4 + 4 + 4 = 12." },
    { text: "20 lápis serão guardados em 5 potes iguais. Quantos em cada pote?", choices: ["4", "5", "15"], answer: 0, explanation: "20 ÷ 5 = 4 lápis por pote. Podemos conferir: 5 × 4 = 20." },
    { text: "Há 18 flores para montar buquês de 3 flores. Quantos buquês?", choices: ["5", "6", "9"], answer: 1, explanation: "18 ÷ 3 = 6 buquês. São 6 grupos de 3 flores." },
    { text: "24 figurinhas foram repartidas igualmente entre 4 amigos. Quantas cada um recebeu?", choices: ["6", "8", "20"], answer: 0, explanation: "24 ÷ 4 = 6 figurinhas para cada amigo." },
    { text: "15 bolinhas serão colocadas em saquinhos com 5 em cada. Quantos saquinhos?", choices: ["3", "5", "10"], answer: 0, explanation: "15 ÷ 5 = 3 saquinhos." },
    { text: "16 crianças formam equipes de 4. Quantas equipes completas?", choices: ["2", "4", "8"], answer: 1, explanation: "16 ÷ 4 = 4 equipes completas." }
  ] },
  { title: "Montanha das Formas", icon: "🔷", topic: "Formas geométricas", skill: "EF03MA13", questions: [
    { text: "Qual objeto lembra uma esfera?", choices: ["Uma bola", "Uma caixa de sapatos", "Uma lata"], answer: 0, explanation: "A bola lembra uma esfera: ela é redonda em todas as direções e não tem faces planas." },
    { text: "Uma caixa de presente em forma de cubo tem quantas faces?", choices: ["4", "6", "8"], answer: 1, explanation: "O cubo tem 6 faces quadradas." },
    { text: "Qual objeto lembra um cilindro?", choices: ["Uma lata de milho", "Uma bola de futebol", "Um dado"], answer: 0, explanation: "A lata lembra um cilindro: tem duas bases redondas e uma parte lateral curva." },
    { text: "Quantos vértices tem um cubo?", choices: ["6", "8", "12"], answer: 1, explanation: "O cubo tem 8 vértices, que são os cantinhos onde as arestas se encontram." },
    { text: "Qual forma espacial tem uma ponta e uma base circular?", choices: ["Cone", "Cubo", "Esfera"], answer: 0, explanation: "O cone tem uma base circular e uma ponta chamada vértice." },
    { text: "Uma pirâmide de base quadrada tem quantas faces ao todo?", choices: ["4", "5", "6"], answer: 1, explanation: "Ela tem 1 base quadrada e 4 faces triangulares: 5 faces ao todo." }
  ] },
  { title: "Relógio do Coelho", icon: "🕒", topic: "Horas e duração", skill: "EF03MA22", questions: [
    { text: "O filme começou às 14h e terminou às 16h. Quanto tempo durou?", choices: ["1 hora", "2 horas", "3 horas"], answer: 1, explanation: "De 14h até 16h passam 2 horas." },
    { text: "Que horas são 30 minutos depois das 8h?", choices: ["8h30", "9h30", "8h15"], answer: 0, explanation: "Meia hora são 30 minutos. Trinta minutos depois das 8h são 8h30." },
    { text: "A aula começou às 13h. Ela dura 1 hora. A que horas termina?", choices: ["13h30", "14h", "14h30"], answer: 1, explanation: "Uma hora depois das 13h são 14h." },
    { text: "Quantos minutos há em 1 hora?", choices: ["30 minutos", "60 minutos", "100 minutos"], answer: 1, explanation: "Uma hora tem 60 minutos." },
    { text: "O treino começou às 9h30 e terminou às 10h. Quanto durou?", choices: ["30 minutos", "1 hora", "1 hora e 30 minutos"], answer: 0, explanation: "De 9h30 até 10h faltam 30 minutos." },
    { text: "São 15h. Que horas serão daqui a 2 horas?", choices: ["16h", "17h", "18h"], answer: 1, explanation: "Contando duas horas depois de 15h: 16h, 17h." }
  ] },
  { title: "Lago das Medidas", icon: "🧪", topic: "Comprimento, massa e capacidade", skill: "EF03MA18", questions: [
    { text: "Qual instrumento é mais adequado para medir o comprimento de um lápis?", choices: ["Régua", "Relógio", "Balança"], answer: 0, explanation: "A régua mede comprimentos pequenos, como o de um lápis." },
    { text: "Qual unidade costuma ser usada para medir a massa de uma melancia?", choices: ["Quilograma", "Litro", "Metro"], answer: 0, explanation: "Quilograma (kg) é uma unidade usada para medir massa." },
    { text: "Qual recipiente pode guardar mais água?", choices: ["Uma garrafa de 2 litros", "Um copo de 200 mililitros", "Uma colher"], answer: 0, explanation: "2 litros equivalem a 2.000 mililitros, muito mais que 200 mililitros." },
    { text: "Para medir a altura de uma porta, é melhor usar...", choices: ["Metro", "Quilograma", "Litro"], answer: 0, explanation: "O metro é uma unidade de comprimento adequada para a altura de uma porta." },
    { text: "Qual instrumento usamos para descobrir a massa de uma mochila?", choices: ["Balança", "Fita métrica", "Termômetro"], answer: 0, explanation: "A balança mede a massa de objetos, como uma mochila." },
    { text: "Uma jarra tem capacidade de 1 litro. Quantos mililitros são?", choices: ["100 mL", "1.000 mL", "10.000 mL"], answer: 1, explanation: "1 litro equivale a 1.000 mililitros." }
  ] },
  { title: "Mercadinho Mágico", icon: "🪙", topic: "Sistema monetário brasileiro", skill: "EF03MA24", questions: [
    { text: "Uma fruta custa R$ 4. Você paga com uma nota de R$ 10. Qual é o troco?", choices: ["R$ 4", "R$ 6", "R$ 14"], answer: 1, explanation: "R$ 10 - R$ 4 = R$ 6 de troco." },
    { text: "Quanto valem juntas uma moeda de R$ 1 e outra de R$ 0,50?", choices: ["R$ 1,50", "R$ 1,05", "R$ 2,50"], answer: 0, explanation: "R$ 1,00 + R$ 0,50 = R$ 1,50." },
    { text: "Um caderno custa R$ 8. Quanto custam 2 cadernos?", choices: ["R$ 10", "R$ 16", "R$ 18"], answer: 1, explanation: "Dois cadernos de R$ 8 custam 8 + 8 = R$ 16." },
    { text: "Você tem R$ 5. Um suco custa R$ 3,50. Quanto sobra?", choices: ["R$ 1,50", "R$ 2,50", "R$ 1,25"], answer: 0, explanation: "R$ 5,00 - R$ 3,50 = R$ 1,50." },
    { text: "Qual combinação forma R$ 10?", choices: ["Uma nota de R$ 5 e uma de R$ 5", "Uma nota de R$ 2 e uma de R$ 5", "Duas moedas de R$ 1"], answer: 0, explanation: "R$ 5 + R$ 5 = R$ 10." },
    { text: "Um brinquedo custa R$ 12. Você já juntou R$ 7. Quanto falta?", choices: ["R$ 4", "R$ 5", "R$ 6"], answer: 1, explanation: "R$ 12 - R$ 7 = R$ 5." }
  ] },
  { title: "Trilha dos Desafios", icon: "🌟", topic: "Desafios de adição e multiplicação", skill: "EF03MA05 · EF03MA07", questions: [
    { text: "Uma turma plantou 6 filas com 5 sementes em cada. Quantas sementes plantou?", choices: ["11", "30", "56"], answer: 1, explanation: "6 grupos de 5: 6 × 5 = 30 sementes." },
    { text: "Uma caixa tinha 145 peças e recebeu mais 120. Quantas peças tem?", choices: ["255", "265", "275"], answer: 1, explanation: "145 + 120 = 265 peças." },
    { text: "Há 32 balões para dividir igualmente entre 4 equipes. Quantos para cada equipe?", choices: ["8", "9", "28"], answer: 0, explanation: "32 ÷ 4 = 8 balões para cada equipe." },
    { text: "Qual número completa: 250 + ___ = 400?", choices: ["100", "150", "250"], answer: 1, explanation: "De 250 até 400 faltam 150, pois 250 + 150 = 400." },
    { text: "Uma receita usa 3 ovos. Quantos ovos são necessários para fazer 4 receitas?", choices: ["7", "12", "14"], answer: 1, explanation: "4 receitas com 3 ovos cada: 4 × 3 = 12 ovos." },
    { text: "Uma turma arrecadou 84 livros e colocou 7 em cada caixa. Quantas caixas usou?", choices: ["11", "12", "13"], answer: 1, explanation: "84 ÷ 7 = 12 caixas, porque 12 × 7 = 84." }
  ] },
  { title: "Castelo das Estrelas", icon: "🏰", topic: "Grande desafio final", skill: "EF03MA01 · EF03MA05 · EF03MA24", questions: [
    { text: "Qual é o maior número: 3.906, 3.690 ou 3.960?", choices: ["3.906", "3.690", "3.960"], answer: 2, explanation: "Os milhares e as centenas se comparam assim: 3.960 tem 9 centenas, mais do que os outros." },
    { text: "O castelo recebeu 275 visitantes de manhã e 308 à tarde. Quantos ao todo?", choices: ["573", "583", "593"], answer: 1, explanation: "275 + 308 = 583 visitantes." },
    { text: "Quanto é 9 × 5?", choices: ["40", "45", "50"], answer: 1, explanation: "9 grupos de 5 são 45." },
    { text: "Você comprou algo por R$ 15 e pagou com R$ 20. Qual é o troco?", choices: ["R$ 3", "R$ 5", "R$ 7"], answer: 1, explanation: "R$ 20 - R$ 15 = R$ 5." },
    { text: "Uma festa começou às 10h e terminou às 12h30. Quanto durou?", choices: ["2 horas", "2 horas e 30 minutos", "3 horas"], answer: 1, explanation: "De 10h até 12h são 2 horas; mais 30 minutos: 2 horas e 30 minutos." },
    { text: "Uma equipe tem 4 crianças. Quantas crianças há em 6 equipes?", choices: ["10", "20", "24"], answer: 2, explanation: "6 grupos de 4: 6 × 4 = 24 crianças." }
  ] }
];

const bridgeLevels = [
  { worldId: "bridge", title: "Bilhete do Piquenique", icon: "🧺", topic: "Leitura de bilhete e adição", skill: "EF15LP03 · EF03MA05", questions: [
    { text: "No bilhete, Nina escreveu: “Leve 12 maçãs e 8 peras.” Quantas frutas ela pediu?", choices: ["18", "20", "24"], answer: 1, explanation: "O bilhete informa 12 maçãs e 8 peras. Somando 12 + 8, são 20 frutas." },
    { text: "O bilhete diz: “Encontro às 9 horas.” Qual informação ele apresenta?", choices: ["O horário do encontro", "O nome de uma fruta", "O preço do lanche"], answer: 0, explanation: "A expressão “às 9 horas” informa quando será o encontro." },
    { text: "Beto leu: “Há 15 sanduíches. Vamos repartir igualmente entre 5 amigos.” Quantos cada um recebe?", choices: ["3", "5", "10"], answer: 0, explanation: "A informação pede uma divisão em partes iguais: 15 ÷ 5 = 3 sanduíches para cada amigo." },
    { text: "No recado “Traga 6 copos azuis e 7 copos verdes”, quantos copos serão levados?", choices: ["13", "12", "14"], answer: 0, explanation: "O recado pede 6 copos azuis e 7 verdes. Ao todo: 6 + 7 = 13." },
    { text: "Um convite marca a festa para sábado, dia 18. Se hoje é dia 15, quantos dias faltam?", choices: ["2 dias", "3 dias", "4 dias"], answer: 1, explanation: "Contando do dia 15 até o dia 18: 16, 17 e 18. Faltam 3 dias." }
  ] },
  { worldId: "bridge", title: "Receita das Palavras", icon: "🥣", topic: "Leitura de receita e multiplicação", skill: "EF03LP11 · EF03MA07", questions: [
    { text: "A receita diz: “Use 2 bananas para cada porção.” Quantas bananas são necessárias para 4 porções?", choices: ["6", "8", "10"], answer: 1, explanation: "São 2 bananas para cada uma das 4 porções: 2 + 2 + 2 + 2 = 8." },
    { text: "Na receita, a palavra “misture” indica...", choices: ["Uma ação que deve ser feita", "O nome de um ingrediente", "A quantidade de porções"], answer: 0, explanation: "“Misture” é uma instrução, uma ação que a pessoa deve fazer." },
    { text: "Uma receita usa 3 copos de água. Quantos copos para preparar 2 receitas iguais?", choices: ["5", "6", "9"], answer: 1, explanation: "Dobrar a receita é fazer 3 + 3 = 6 copos de água." },
    { text: "A receita rende 12 bolinhos. Eles serão colocados igualmente em 3 pratos. Quantos por prato?", choices: ["4", "6", "9"], answer: 0, explanation: "12 bolinhos divididos igualmente em 3 pratos: 12 ÷ 3 = 4." },
    { text: "Qual palavra da instrução mostra a ordem do passo: “Depois, acrescente a farinha”?", choices: ["Depois", "Farinha", "Acrescente"], answer: 0, explanation: "“Depois” mostra em que momento esse passo deve acontecer." }
  ] },
  { worldId: "bridge", title: "Feira dos Cartazes", icon: "🎪", topic: "Leitura de cartaz e subtração", skill: "EF15LP03 · EF03MA05", questions: [
    { text: "O cartaz anuncia: “Feira às 14h, entrada gratuita!” O que significa “gratuita”?", choices: ["Não precisa pagar entrada", "A feira dura 14 horas", "Só entram 14 pessoas"], answer: 0, explanation: "“Gratuita” quer dizer que não é preciso pagar para entrar." },
    { text: "A barraca preparou 30 maçãs e vendeu 12. Quantas sobraram?", choices: ["18", "22", "42"], answer: 0, explanation: "Subtraímos as 12 maçãs vendidas: 30 - 12 = 18." },
    { text: "No cartaz, “Compre 2 sucos por R$ 8” informa...", choices: ["A quantidade e o preço", "O horário da feira", "O nome de quem escreveu"], answer: 0, explanation: "A frase apresenta o que está à venda, a quantidade e o preço." },
    { text: "Há 24 pães para colocar em 4 cestas iguais. Quantos pães em cada cesta?", choices: ["6", "8", "20"], answer: 0, explanation: "24 ÷ 4 = 6 pães em cada cesta." },
    { text: "Uma banca tinha 16 livros. Chegaram mais 9. Quantos livros há agora?", choices: ["23", "25", "27"], answer: 1, explanation: "Somamos os livros que chegaram: 16 + 9 = 25." }
  ] }
];

const portugueseLevels = [
  { worldId: "portuguese", title: "Jardim da Ortografia", icon: "🔤", topic: "Escrita de palavras", skill: "EF03LP01 · EF03LP03", questions: [
    { text: "Qual palavra está escrita corretamente?", choices: ["passarinho", "pasarinho", "passarino"], answer: 0, explanation: "“Passarinho” é escrita com ss e com o dígrafo nh." },
    { text: "Complete: “O menino foi à ___ para pegar um livro.”", choices: ["biblioteca", "bibliotéca", "bibliotequa"], answer: 0, explanation: "A escrita correta é “biblioteca”, com c antes de a." },
    { text: "Qual palavra completa “O ___ latiu para o carteiro”?", choices: ["cachoro", "cachorro", "caxorro"], answer: 1, explanation: "“Cachorro” se escreve com ch e rr." },
    { text: "Qual palavra está escrita corretamente?", choices: ["folha", "foia", "folia"], answer: 0, explanation: "“Folha” é escrita com lh." },
    { text: "Complete: “A ___ está brilhando no céu.”", choices: ["estrela", "estela", "estrelaa"], answer: 0, explanation: "A escrita correta é “estrela”, com r depois do t." }
  ] },
  { worldId: "portuguese", title: "Trilha das Sílabas", icon: "👏", topic: "Sílabas e sons das palavras", skill: "EF03LP02 · EF03LP05", questions: [
    { text: "Quantas sílabas tem a palavra “boneca”?", choices: ["2", "3", "4"], answer: 1, explanation: "Separando: bo-ne-ca. A palavra tem 3 sílabas." },
    { text: "Qual palavra tem duas sílabas?", choices: ["gato", "janela", "sol"], answer: 0, explanation: "Separando ga-to, “gato” tem duas sílabas." },
    { text: "Qual palavra começa com a mesma sílaba de “sapato”?", choices: ["sapo", "cavalo", "pipoca"], answer: 0, explanation: "“Sapato” começa com a sílaba sa. “Sapo” também começa com sa." },
    { text: "Qual palavra tem três sílabas?", choices: ["caderno", "trem", "livro"], answer: 0, explanation: "Separando ca-der-no, “caderno” tem três sílabas." },
    { text: "Qual palavra tem quatro sílabas?", choices: ["abacaxi", "janela", "pato"], answer: 0, explanation: "Separando a-ba-ca-xi, “abacaxi” tem quatro sílabas." }
  ] },
  { worldId: "portuguese", title: "Ilha da Pontuação", icon: "❓", topic: "Pontuação e entonação", skill: "EF03LP07", questions: [
    { text: "Qual sinal usamos no final de uma pergunta?", choices: ["?", "!", "."], answer: 0, explanation: "O ponto de interrogação (?) aparece no final de uma pergunta." },
    { text: "Qual frase mostra surpresa e está pontuada corretamente?", choices: ["Que lindo jardim!", "Que lindo jardim?", "Que lindo jardim,"], answer: 0, explanation: "O ponto de exclamação pode mostrar surpresa ou entusiasmo." },
    { text: "Qual pontuação completa: “A menina leu o livro___”", choices: [".", "?", "!"], answer: 0, explanation: "A frase conta uma informação. O ponto final encerra uma declaração." },
    { text: "Qual frase está escrita como uma pergunta?", choices: ["Você vem brincar?", "Você vem brincar.", "Você vem brincar!"], answer: 0, explanation: "O ponto de interrogação mostra que a pessoa está perguntando." },
    { text: "Na frase “Socorro!”, o ponto de exclamação mostra...", choices: ["Um chamado com emoção", "Uma pergunta", "O fim de uma lista"], answer: 0, explanation: "O ponto de exclamação pode indicar emoção ou um chamado forte." }
  ] },
  { worldId: "portuguese", title: "Vila dos Substantivos", icon: "🏘️", topic: "Substantivos e verbos", skill: "EF03LP08", questions: [
    { text: "Na frase “O coelho saltou”, qual palavra nomeia um ser?", choices: ["coelho", "saltou", "o"], answer: 0, explanation: "“Coelho” é o nome do animal: um substantivo." },
    { text: "Na frase “A menina desenha”, qual palavra mostra uma ação?", choices: ["menina", "desenha", "a"], answer: 1, explanation: "“Desenha” é o que a menina faz: um verbo que indica ação." },
    { text: "Qual destas palavras é o nome de um lugar?", choices: ["escola", "correr", "alegre"], answer: 0, explanation: "“Escola” nomeia um lugar e é um substantivo." },
    { text: "Complete com uma ação: “Os amigos ___ no parque.”", choices: ["brincam", "amigos", "parque"], answer: 0, explanation: "“Brincam” é o verbo que indica a ação dos amigos." },
    { text: "Na frase “A chuva molhou a rua”, qual palavra indica o que aconteceu?", choices: ["chuva", "molhou", "rua"], answer: 1, explanation: "“Molhou” é o verbo: conta a ação que aconteceu." }
  ] },
  { worldId: "portuguese", title: "Bosque dos Adjetivos", icon: "🎨", topic: "Adjetivos e características", skill: "EF03LP09", questions: [
    { text: "Na frase “A borboleta colorida voou”, qual palavra descreve a borboleta?", choices: ["colorida", "voou", "borboleta"], answer: 0, explanation: "“Colorida” conta uma característica da borboleta: é um adjetivo." },
    { text: "Qual palavra completa “O gigante ___ ajudou o vilarejo” descrevendo o tamanho?", choices: ["alto", "ajudou", "vilarejo"], answer: 0, explanation: "“Alto” descreve o gigante." },
    { text: "Qual destas palavras indica uma característica?", choices: ["macio", "pular", "cadeira"], answer: 0, explanation: "“Macio” descreve como algo é." },
    { text: "Em “As flores perfumadas enfeitam o jardim”, que palavra descreve as flores?", choices: ["perfumadas", "enfeitam", "jardim"], answer: 0, explanation: "“Perfumadas” é a característica das flores." },
    { text: "Escolha um adjetivo para completar: “O filhote é muito ___.”", choices: ["brincalhão", "correr", "filhote"], answer: 0, explanation: "“Brincalhão” descreve uma característica do filhote." }
  ] },
  { worldId: "portuguese", title: "Oficina de Palavras", icon: "🛠️", topic: "Formação de palavras", skill: "EF03LP10", questions: [
    { text: "Qual palavra formada a partir de “feliz” tem sentido contrário?", choices: ["infeliz", "felizmente", "felicidade"], answer: 0, explanation: "“Infeliz” é formada com o começo “in-”, que muda a ideia de feliz para o sentido contrário." },
    { text: "A palavra “desligar” começa com “des-”. Qual ideia esse começo pode indicar?", choices: ["Fazer o contrário da ação de ligar", "Um lugar para ligar", "Uma pessoa que liga"], answer: 0, explanation: "O começo “des-” pode indicar a ideia contrária: desligar é o contrário de ligar." },
    { text: "Qual palavra pode ser formada acrescentando “-eiro” a “livro”?", choices: ["livreiro", "livrinho", "livraria"], answer: 0, explanation: "“Livreiro” é uma palavra formada com a base “livro” e o final “-eiro”." },
    { text: "Se alguém é “cuidadoso”, essa pessoa costuma...", choices: ["agir com cuidado", "perder todo cuidado", "ser um lugar"], answer: 0, explanation: "“Cuidadoso” descreve quem age com cuidado." },
    { text: "Qual palavra tem um começo que indica repetição?", choices: ["reler", "flor", "papel"], answer: 0, explanation: "“Reler” é ler de novo. O começo “re-” indica repetição." }
  ] },
  { worldId: "portuguese", title: "Cozinha das Instruções", icon: "🧑‍🍳", topic: "Receitas e instruções", skill: "EF03LP11 · EF03LP16", questions: [
    { text: "Qual texto costuma apresentar uma lista de ingredientes e um modo de preparo?", choices: ["Receita", "Convite", "Bilhete de aniversário"], answer: 0, explanation: "Uma receita costuma listar os ingredientes e explicar como preparar algo." },
    { text: "Em uma instrução, a palavra “acrescente” pede que a pessoa...", choices: ["coloque mais um ingrediente", "apague a receita", "leia o título"], answer: 0, explanation: "“Acrescente” é uma orientação para colocar mais alguma coisa." },
    { text: "Por que uma receita costuma mostrar os ingredientes antes do preparo?", choices: ["Para saber o que separar antes de começar", "Para contar uma aventura", "Para esconder os passos"], answer: 0, explanation: "A lista ajuda a conferir e separar o que será usado." },
    { text: "Qual sequência faz mais sentido para preparar uma salada?", choices: ["Lavar os ingredientes, cortar e misturar", "Misturar, guardar e só então lavar", "Cortar, servir e depois buscar os ingredientes"], answer: 0, explanation: "Primeiro lavamos os ingredientes; depois podemos cortá-los e misturá-los." },
    { text: "A frase “Mexa a massa devagar” é...", choices: ["Uma instrução", "Uma pergunta", "Uma lista de ingredientes"], answer: 0, explanation: "A frase orienta a pessoa sobre uma ação a realizar." }
  ] },
  { worldId: "portuguese", title: "Correio das Histórias", icon: "💌", topic: "Bilhetes, cartas e diários", skill: "EF03LP12 · EF03LP17", questions: [
    { text: "Qual saudação combina com o começo de uma carta para um amigo?", choices: ["Olá, Pedro!", "Misture tudo.", "Fim da receita."], answer: 0, explanation: "“Olá, Pedro!” é uma saudação adequada para começar uma carta a um amigo." },
    { text: "Em um diário, a pessoa costuma escrever...", choices: ["acontecimentos e pensamentos", "somente preços de produtos", "instruções de trânsito"], answer: 0, explanation: "No diário, a pessoa registra coisas que viveu, sentiu ou pensou." },
    { text: "Qual informação combina com o final de uma carta pessoal?", choices: ["Uma despedida e o nome de quem escreveu", "Uma lista de compras sem saudação", "Uma conta de multiplicação"], answer: 0, explanation: "Cartas pessoais costumam terminar com uma despedida e a assinatura." },
    { text: "Lia escreveu “Senti saudades e espero brincar com você”. O que ela expressou?", choices: ["Um sentimento e um desejo", "Uma ordem de preparo", "O preço de um brinquedo"], answer: 0, explanation: "Lia contou que sente saudades e disse o que gostaria que acontecesse." },
    { text: "Qual frase parece contar um acontecimento de um diário?", choices: ["Hoje visitei minha avó e fiquei feliz.", "Coloque duas xícaras de farinha.", "Atenção: promoção na loja!"], answer: 0, explanation: "A frase conta algo vivido e um sentimento, como em um diário." }
  ] },
  { worldId: "portuguese", title: "Praça dos Anúncios", icon: "📣", topic: "Cartazes e finalidade dos textos", skill: "EF03LP19", questions: [
    { text: "Um cartaz diz “Cuide da praça: jogue o lixo na lixeira!”. Qual é o objetivo?", choices: ["Incentivar as pessoas a cuidar da praça", "Ensinar uma receita", "Contar um sonho"], answer: 0, explanation: "O cartaz quer convencer e orientar as pessoas a manter a praça limpa." },
    { text: "Qual frase combina com um convite para uma festa?", choices: ["Venha comemorar com a gente!", "Desligue a televisão.", "Era uma vez um castelo."], answer: 0, explanation: "“Venha comemorar com a gente!” convida o leitor para participar." },
    { text: "Em um cartaz, letras grandes e coloridas podem ajudar a...", choices: ["chamar a atenção para a mensagem", "esconder a mensagem", "mostrar o final de uma carta"], answer: 0, explanation: "Cores e letras destacadas ajudam a chamar a atenção do leitor." },
    { text: "Um anúncio diz “Doe livros e espalhe histórias”. O que ele quer?", choices: ["Incentivar a doação de livros", "Vender uma receita", "Avisar que a biblioteca fechou"], answer: 0, explanation: "O anúncio convida as pessoas a doar livros." },
    { text: "Qual frase é um slogan para economizar água?", choices: ["Cada gota conta: feche a torneira!", "O bolo ficou no forno.", "Minha carta chegou ontem."], answer: 0, explanation: "A frase é curta, chama a atenção e incentiva a economizar água." }
  ] },
  { worldId: "portuguese", title: "Biblioteca Encantada", icon: "📚", topic: "Leitura e compreensão", skill: "EF15LP03", questions: [
    { text: "Leia: “Caio levou um guarda-chuva porque o céu estava escuro.” Por que ele levou o guarda-chuva?", choices: ["Porque o céu estava escuro", "Porque ia à biblioteca", "Porque perdeu o livro"], answer: 0, explanation: "O texto diz que Caio levou o guarda-chuva porque o céu estava escuro." },
    { text: "Leia: “O gato dormiu sobre a almofada azul.” Onde o gato dormiu?", choices: ["Sobre a almofada azul", "Dentro da mochila", "No jardim amarelo"], answer: 0, explanation: "A informação aparece diretamente na frase: ele dormiu sobre a almofada azul." },
    { text: "Leia: “Bia regou a horta pela manhã. À tarde, colheu tomates.” O que Bia fez primeiro?", choices: ["Regou a horta", "Colheu tomates", "Preparou uma carta"], answer: 0, explanation: "O texto conta primeiro que Bia regou a horta pela manhã." },
    { text: "Leia: “Rui emprestou o livro para Ana.” Quem recebeu o livro?", choices: ["Ana", "Rui", "O livro"], answer: 0, explanation: "Ana recebeu o livro emprestado por Rui." },
    { text: "Leia: “A equipe guardou os brinquedos depois da brincadeira.” Quando guardou os brinquedos?", choices: ["Depois da brincadeira", "Antes de chegar", "Durante o almoço"], answer: 0, explanation: "A frase diz que a equipe guardou os brinquedos depois da brincadeira." }
  ] }
];

levels.push(...bridgeLevels, ...portugueseLevels);

const worlds = [
  { id: "math", title: "Bosque dos Doces", shortTitle: "Matemática", eyebrow: "MUNDO 1 · MATEMÁTICA", icon: "🌳", start: 0, count: 12 },
  { id: "bridge", title: "Ponte dos Desafios", shortTitle: "Desafio misto", eyebrow: "PONTE ENTRE OS MUNDOS · MATEMÁTICA + PORTUGUÊS", icon: "🌉", start: 12, count: 3 },
  { id: "portuguese", title: "Vila das Palavras", shortTitle: "Português", eyebrow: "MUNDO 2 · LÍNGUA PORTUGUESA", icon: "📚", start: 15, count: 10 }
];

const skins = [
  { id: "fox", name: "Raposa", emoji: "🦊", price: 0 },
  { id: "dragon", name: "Dragão", emoji: "🐲", price: 12 },
  { id: "unicorn", name: "Unicórnio", emoji: "🦄", price: 20 },
  { id: "robot", name: "Robô", emoji: "🤖", price: 28 }
];

const initialState = {
  stars: 0,
  unlockedLevel: 0,
  completedLevels: [],
  equippedSkin: "fox",
  ownedSkins: ["fox"]
};

const elements = {
  starCount: document.querySelector("#star-count"),
  shopStarCount: document.querySelector("#shop-star-count"),
  progress: document.querySelector("#world-progress"),
  progressFill: document.querySelector("#progress-fill"),
  progressLabel: document.querySelector("#progress-label"),
  heroMascot: document.querySelector("#hero-mascot"),
  worldTabs: document.querySelector("#world-tabs"),
  worldEyebrow: document.querySelector("#world-eyebrow"),
  mapTitle: document.querySelector("#map-title"),
  mapCard: document.querySelector(".map-card"),
  levelPath: document.querySelector("#level-path"),
  skinList: document.querySelector("#skin-list"),
  quizOverlay: document.querySelector("#quiz-overlay"),
  closeQuiz: document.querySelector("#close-quiz"),
  quizTopic: document.querySelector("#quiz-topic"),
  quizCounter: document.querySelector("#quiz-counter"),
  quizProgress: document.querySelector("#quiz-progress-fill"),
  quizMascot: document.querySelector("#quiz-mascot"),
  questionSkill: document.querySelector("#question-skill"),
  quizTitle: document.querySelector("#quiz-title"),
  answerList: document.querySelector("#answer-list"),
  feedback: document.querySelector("#answer-feedback"),
  continueButton: document.querySelector("#continue-button"),
  toast: document.querySelector("#toast")
};

let state = loadState();
let activeRun = null;
let summaryOutcome = null;
let selectedWorldId = getWorldForLevel(state.unlockedLevel).id;
let toastTimeout = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(initialState);
    const parsed = JSON.parse(saved);
    const valid = parsed &&
      Number.isInteger(parsed.stars) && parsed.stars >= 0 &&
      Number.isInteger(parsed.unlockedLevel) &&
      Array.isArray(parsed.completedLevels) &&
      Array.isArray(parsed.ownedSkins) &&
      skins.some((skin) => skin.id === parsed.equippedSkin) &&
      parsed.ownedSkins.includes(parsed.equippedSkin);
    if (!valid) throw new Error("O progresso salvo não tem o formato esperado.");
    return {
      ...initialState,
      stars: parsed.stars,
      unlockedLevel: Math.min(levels.length - 1, Math.max(0, parsed.unlockedLevel)),
      completedLevels: [...new Set(parsed.completedLevels.filter((level) => Number.isInteger(level) && level >= 0 && level < levels.length))],
      equippedSkin: parsed.equippedSkin,
      ownedSkins: [...new Set(parsed.ownedSkins.filter((id) => skins.some((skin) => skin.id === id)))]
    };
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof Error) {
      showToast("Não consegui ler o progresso salvo. Vamos começar uma aventura nova.");
      return structuredClone(initialState);
    }
    throw error;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast("O navegador não conseguiu salvar o progresso. Você ainda pode continuar jogando.");
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => elements.toast.classList.remove("visible"), 3200);
}

function render() {
  renderStats();
  renderWorldTabs();
  renderLevels();
  renderShop();
}

function renderStats() {
  document.body.dataset.theme = state.equippedSkin;
  elements.starCount.textContent = state.stars;
  elements.shopStarCount.textContent = state.stars;
  elements.heroMascot.textContent = getEquippedSkin().emoji;
  const completed = state.completedLevels.length;
  elements.progressFill.style.width = `${(completed / levels.length) * 100}%`;
  elements.progressLabel.textContent = `${completed} de ${levels.length} fases concluídas`;
  elements.progress.setAttribute("aria-valuenow", String(completed));
  elements.progress.setAttribute("aria-valuemax", String(levels.length));
}

function getWorldForLevel(levelIndex) {
  return worlds.find((world) => levelIndex >= world.start && levelIndex < world.start + world.count) || worlds[0];
}

function renderWorldTabs() {
  elements.worldTabs.replaceChildren();
  worlds.forEach((world) => {
    const isUnlocked = state.unlockedLevel >= world.start;
    const isSelected = selectedWorldId === world.id;
    const completed = Array.from({ length: world.count }, (_, index) => world.start + index)
      .every((index) => state.completedLevels.includes(index));
    const button = document.createElement("button");
    button.type = "button";
    button.className = `world-tab${isSelected ? " selected" : ""}${completed ? " completed" : ""}${isUnlocked ? "" : " locked"}`;
    button.disabled = !isUnlocked;
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute("aria-label", `Mundo ${world.shortTitle}${completed ? ", concluído" : isUnlocked ? ", disponível" : ", bloqueado"}`);
    button.innerHTML = `<span class="world-tab-icon" aria-hidden="true">${isUnlocked ? world.icon : "🔒"}</span><span class="world-tab-copy"><span class="world-tab-title">${world.shortTitle}</span><span class="world-tab-progress">${isUnlocked ? `${state.completedLevels.filter((index) => index >= world.start && index < world.start + world.count).length} de ${world.count} fases` : "Complete o mundo anterior"}</span></span>`;
    if (isUnlocked) {
      button.addEventListener("click", () => {
        selectedWorldId = world.id;
        renderWorldTabs();
        renderLevels();
      });
    }
    elements.worldTabs.append(button);
  });
  const selectedWorld = worlds.find((world) => world.id === selectedWorldId) || worlds[0];
  elements.worldEyebrow.textContent = selectedWorld.eyebrow;
  elements.mapTitle.innerHTML = `${selectedWorld.title} <span aria-hidden="true">${selectedWorld.icon}</span>`;
}

function renderLevels() {
  elements.levelPath.replaceChildren();
  const columns = window.matchMedia("(max-width: 650px)").matches ? 3 : 4;
  const world = worlds.find((item) => item.id === selectedWorldId) || worlds[0];
  elements.levelPath.classList.toggle("short-path", world.id === "bridge");
  elements.mapCard.classList.toggle("short-map", world.id === "bridge");
  levels.slice(world.start, world.start + world.count).forEach((level, localIndex) => {
    const index = world.start + localIndex;
    const isCompleted = state.completedLevels.includes(index);
    const isLocked = index > state.unlockedLevel;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `level-node${isCompleted ? " completed" : ""}${isLocked ? " locked" : ""}${index === state.unlockedLevel && !isCompleted ? " current" : ""}`;
    button.disabled = isLocked;
    button.setAttribute("aria-label", `Fase ${localIndex + 1}: ${level.title}${isCompleted ? ", concluída" : isLocked ? ", bloqueada" : ", disponível"}`);
    button.style.animationDelay = `${localIndex * 35}ms`;
    const row = Math.floor(localIndex / columns);
    const positionInRow = localIndex % columns;
    button.style.gridRow = String(row + 1);
    button.style.gridColumn = String(row % 2 === 0 ? positionInRow + 1 : columns - positionInRow);
    button.innerHTML = `<span class="level-icon" aria-hidden="true">${isLocked ? "🔒" : isCompleted ? "✓" : level.icon}</span><span class="level-name">${localIndex + 1}. ${level.title}</span><span class="level-stars" aria-label="${isCompleted ? "Fase concluída" : ""}">${isCompleted ? "★ ★ ★" : " "}</span>`;
    if (!isLocked) button.addEventListener("click", () => startLevel(index));
    elements.levelPath.append(button);
  });
}

function renderShop() {
  elements.skinList.replaceChildren();
  skins.forEach((skin) => {
    const isOwned = state.ownedSkins.includes(skin.id);
    const isEquipped = state.equippedSkin === skin.id;
    const card = document.createElement("article");
    card.className = `skin-card${isEquipped ? " equipped" : ""}`;
    card.innerHTML = `<span class="skin-emoji" aria-hidden="true">${skin.emoji}</span><span class="skin-name">${skin.name}</span>`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "skin-button";
    button.textContent = isEquipped ? "Em uso" : isOwned ? "Vestir" : `⭐ ${skin.price}`;
    button.disabled = isEquipped || (!isOwned && state.stars < skin.price);
    button.setAttribute("aria-label", isEquipped ? `${skin.name} já está em uso` : isOwned ? `Vestir skin ${skin.name}` : `Comprar skin ${skin.name} por ${skin.price} estrelas`);
    button.addEventListener("click", () => chooseSkin(skin));
    card.append(button);
    elements.skinList.append(card);
  });
}

function getEquippedSkin() {
  return skins.find((skin) => skin.id === state.equippedSkin) || skins[0];
}

function chooseSkin(skin) {
  const isOwned = state.ownedSkins.includes(skin.id);
  if (!isOwned && state.stars < skin.price) return;
  if (!isOwned) {
    state.stars -= skin.price;
    state.ownedSkins.push(skin.id);
  }
  state.equippedSkin = skin.id;
  saveState();
  render();
  showToast(`${skin.emoji} ${skin.name} está pronto para a aventura!`);
}

function startLevel(index) {
  const level = levels[index];
  if (!level || index > state.unlockedLevel) return;
  activeRun = {
    levelIndex: index,
    questions: shuffle(level.questions).slice(0, QUESTIONS_PER_LEVEL),
    questionIndex: 0,
    correctAnswers: 0,
    selectedAnswer: null,
    answered: false
  };
  elements.quizOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  const world = getWorldForLevel(index);
  elements.quizTopic.textContent = `${world.shortTitle} · FASE ${index - world.start + 1} · ${level.topic}`;
  elements.quizMascot.textContent = getEquippedSkin().emoji;
  renderQuestion();
  elements.closeQuiz.focus();
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderQuestion() {
  const question = activeRun.questions[activeRun.questionIndex];
  const level = levels[activeRun.levelIndex];
  elements.quizCounter.textContent = `${activeRun.questionIndex + 1} de ${activeRun.questions.length}`;
  elements.quizProgress.style.width = `${((activeRun.questionIndex + 1) / activeRun.questions.length) * 100}%`;
  elements.questionSkill.textContent = `HABILIDADE ${question.skill || level.skill}`;
  elements.quizTitle.textContent = question.text;
  elements.answerList.replaceChildren();
  elements.feedback.hidden = true;
  elements.feedback.className = "answer-feedback";
  elements.feedback.textContent = "";
  elements.continueButton.hidden = false;
  elements.continueButton.disabled = true;
  elements.continueButton.textContent = "Enviar resposta";
  elements.continueButton.focus();
  activeRun.selectedAnswer = null;
  activeRun.answered = false;

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span class="answer-letter" aria-hidden="true">${LETTERS[index]}</span><span>${choice}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    elements.answerList.append(button);
  });
}

function selectAnswer(answerIndex) {
  if (!activeRun || activeRun.answered) return;
  activeRun.selectedAnswer = answerIndex;
  const buttons = [...elements.answerList.querySelectorAll(".answer-option")];
  buttons.forEach((button, index) => {
    button.classList.toggle("selected", index === answerIndex);
    button.setAttribute("aria-pressed", String(index === answerIndex));
  });
  elements.continueButton.disabled = false;
}

function answerQuestion() {
  if (!activeRun || activeRun.answered || activeRun.selectedAnswer === null) return;
  activeRun.answered = true;
  const question = activeRun.questions[activeRun.questionIndex];
  const buttons = [...elements.answerList.querySelectorAll(".answer-option")];
  const isCorrect = activeRun.selectedAnswer === question.answer;
  if (isCorrect) activeRun.correctAnswers += 1;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    else if (index === activeRun.selectedAnswer) button.classList.add("incorrect");
  });
  elements.feedback.hidden = false;
  elements.feedback.classList.toggle("wrong", !isCorrect);
  elements.feedback.textContent = `${isCorrect ? "Muito bem! " : "Quase! "} ${question.explanation}`;
  elements.continueButton.textContent = activeRun.questionIndex === activeRun.questions.length - 1 ? "Ver resultado ✨" : "Próximo desafio →";
  elements.continueButton.disabled = false;
}

function continueRun() {
  if (summaryOutcome) {
    const outcome = summaryOutcome;
    summaryOutcome = null;
    closeQuiz();
    if (!outcome.passed) startLevel(outcome.levelIndex);
    else showToast(outcome.levelIndex === levels.length - 1 ? "Incrível! Você terminou a trilha! 🌟" : `A fase "${levels[outcome.levelIndex].title}" foi concluída!`);
    return;
  }
  if (!activeRun) return;
  if (!activeRun.answered) {
    answerQuestion();
    return;
  }
  if (activeRun.questionIndex < activeRun.questions.length - 1) {
    activeRun.questionIndex += 1;
    renderQuestion();
  } else {
    finishLevel();
  }
}

function finishLevel() {
  const run = activeRun;
  summaryOutcome = { passed: run.correctAnswers >= PASSING_SCORE, levelIndex: run.levelIndex };
  const passed = run.correctAnswers >= PASSING_SCORE;
  const previousUnlockedLevel = state.unlockedLevel;
  state.stars += run.correctAnswers;
  if (passed) {
    if (!state.completedLevels.includes(run.levelIndex)) state.completedLevels.push(run.levelIndex);
    state.unlockedLevel = Math.max(state.unlockedLevel, Math.min(levels.length - 1, run.levelIndex + 1));
  }
  if (state.unlockedLevel > previousUnlockedLevel) selectedWorldId = getWorldForLevel(state.unlockedLevel).id;
  saveState();
  render();
  const world = getWorldForLevel(run.levelIndex);
  const nextWorld = worlds.find((item) => item.start === world.start + world.count);
  const unlockedNewWorld = passed && state.unlockedLevel > previousUnlockedLevel && nextWorld;
  elements.quizTopic.textContent = passed ? unlockedNewWorld ? "NOVO MUNDO DESBLOQUEADO" : "FASE CONCLUÍDA" : "VOCÊ ESTÁ APRENDENDO";
  elements.quizProgress.style.width = "100%";
  elements.questionSkill.textContent = "";
  elements.quizTitle.textContent = passed ? "Você conseguiu!" : "Mais uma tentativa e você chega lá!";
  elements.quizMascot.textContent = passed ? "🎉" : getEquippedSkin().emoji;
  elements.answerList.replaceChildren();
  elements.feedback.hidden = false;
  elements.feedback.className = "answer-feedback";
  elements.feedback.textContent = passed
    ? `Você acertou ${run.correctAnswers} de ${run.questions.length} desafios e ganhou ${run.correctAnswers} ⭐. ${unlockedNewWorld ? `A aventura "${nextWorld.title}" está aberta!` : run.levelIndex === levels.length - 1 ? "Você completou todos os mundos da aventura!" : "O próximo caminho já está aberto!"}`
    : `Você acertou ${run.correctAnswers} de ${run.questions.length}. Ganhou ${run.correctAnswers} ⭐ e pode tentar a fase novamente quando quiser. Não tem pressa!`;
  elements.continueButton.hidden = false;
  elements.continueButton.textContent = passed ? "Voltar ao mapa" : "Tentar de novo";
}

function closeQuiz() {
  activeRun = null;
  summaryOutcome = null;
  elements.quizOverlay.hidden = true;
  document.body.style.overflow = "";
}

elements.closeQuiz.addEventListener("click", closeQuiz);
elements.quizOverlay.addEventListener("click", (event) => {
  if (event.target === elements.quizOverlay) closeQuiz();
});
elements.continueButton.addEventListener("click", continueRun);
window.matchMedia("(max-width: 650px)").addEventListener("change", renderLevels);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.quizOverlay.hidden) closeQuiz();
});

render();
