# Doce Saber

Jogo educativo de navegador para o 3º ano do Ensino Fundamental. Não requer instalação nem servidor para jogar: abra `index.html` no navegador.

## Mundos disponíveis

- **Bosque dos Doces (Matemática):** 12 fases.
- **Ponte dos Desafios:** 3 fases que combinam interpretação de textos e situações matemáticas; fica disponível depois de concluir Matemática.
- **Vila das Palavras (Língua Portuguesa):** 10 fases; fica disponível depois de concluir a ponte de desafios.
- Uma prévia coberta por nuvens indica o mundo de Português enquanto ele está bloqueado.
- Banco inicial de 137 questões originais: 72 de Matemática, 15 de desafios mistos e 50 de Português. Cada tentativa sorteia 5 questões da fase.
- Perguntas com explicações e identificação de habilidades da BNCC.
- Estrelas por respostas corretas, usadas para comprar skins.
- Cada fase pode ser jogada no modo normal ou em um desafio opcional com 15 segundos por pergunta. No desafio, errar ou deixar o tempo acabar encerra a rodada, sem conceder estrelas nem alterar o avanço das fases.
- O desafio registra as três melhores marcas de cada fase neste navegador, ordenadas pelo número de acertos e pelo menor tempo total de resposta. Rodadas abandonadas não entram no placar.
- Cada personagem equipado também muda a paleta de cores do jogo; a escolha permanece salva entre visitas.
- Progresso e personagem salvos no armazenamento local do navegador. O progresso de Matemática salvo anteriormente é preservado.
- Layout adaptável a celular e computador, animações leves e respeito à preferência por movimento reduzido.

O progresso fica neste navegador e dispositivo; não há contas nem sincronização entre aparelhos. As questões são uma seleção inicial de prática alinhada às habilidades indicadas, não uma cobertura completa da BNCC nem material oficial do MEC.

## Publicar com GitHub Pages

1. Envie estes arquivos para um repositório GitHub.
2. No repositório, abra **Settings → Pages**.
3. Escolha a branch e a pasta que contém `index.html` como fonte de publicação.
4. Abra o endereço publicado informado pelo GitHub.

Como o jogo é estático, não precisa de backend. A fonte Nunito é carregada do Google Fonts quando há conexão; o navegador usa uma fonte local alternativa se estiver offline.
