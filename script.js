/* ============================================
   TRABALHO: Esporte Digital — ACESSÍVEL
   ALUNO: [SEU NOME] - 3º Ano EM
   Inclui recursos de acessibilidade
============================================ */


/* ============================================
   1. MENU MOBILE (com ARIA)
============================================ */
const botaoMenu = document.getElementById('botaoMenu');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', function() {
  const aberto = menu.classList.toggle('aberto');
  
  // Atualiza aria-expanded para leitores de tela
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute(
    'aria-label', 
    aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
  );
});

document.querySelectorAll('.menu a').forEach(function(link) {
  link.addEventListener('click', function() {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});


/* ============================================
   2. ACESSIBILIDADE — TAMANHO DA FONTE
============================================ */
let tamanhoAtual = 16;

const btnAumentar = document.getElementById('btnAumentar');
const btnDiminuir = document.getElementById('btnDiminuir');

btnAumentar.addEventListener('click', function() {
  if (tamanhoAtual < 24) {
    tamanhoAtual += 2;
    document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
    salvarPreferencias();
  }
});

btnDiminuir.addEventListener('click', function() {
  if (tamanhoAtual > 12) {
    tamanhoAtual -= 2;
    document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
    salvarPreferencias();
  }
});


/* ============================================
   3. ACESSIBILIDADE — ALTO CONTRASTE
============================================ */
const btnContraste = document.getElementById('btnContraste');

btnContraste.addEventListener('click', function() {
  const ativo = document.body.classList.toggle('alto-contraste');
  btnContraste.setAttribute('aria-pressed', ativo);
  salvarPreferencias();
});


/* ============================================
   4. ACESSIBILIDADE — FONTE PARA DISLEXIA
============================================ */
const btnDislexia = document.getElementById('btnDislexia');

btnDislexia.addEventListener('click', function() {
  const ativo = document.body.classList.toggle('fonte-dislexia');
  btnDislexia.setAttribute('aria-pressed', ativo);
  salvarPreferencias();
});


/* ============================================
   5. ACESSIBILIDADE — RESETAR
============================================ */
const btnReset = document.getElementById('btnReset');

btnReset.addEventListener('click', function() {
  // Remove todas as classes de acessibilidade
  document.body.classList.remove('alto-contraste', 'fonte-dislexia');
  
  // Volta o tamanho da fonte
  tamanhoAtual = 16;
  document.documentElement.style.setProperty('--tamanho-fonte', '16px');
  
  // Reseta os botões
  btnContraste.setAttribute('aria-pressed', 'false');
  btnDislexia.setAttribute('aria-pressed', 'false');
  
  // Limpa o armazenamento
  localStorage.removeItem('preferenciasAcessibilidade');
});


/* ============================================
   6. SALVAR PREFERÊNCIAS NO NAVEGADOR
   Assim as escolhas do usuário ficam guardadas
============================================ */
function salvarPreferencias() {
  const prefs = {
    tamanho: tamanhoAtual,
    contraste: document.body.classList.contains('alto-contraste'),
    dislexia: document.body.classList.contains('fonte-dislexia')
  };
  localStorage.setItem('preferenciasAcessibilidade', JSON.stringify(prefs));
}

function carregarPreferencias() {
  const salvo = localStorage.getItem('preferenciasAcessibilidade');
  if (!salvo) return;
  
  const prefs = JSON.parse(salvo);
  
  if (prefs.tamanho) {
    tamanhoAtual = prefs.tamanho;
    document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
  }
  
  if (prefs.contraste) {
    document.body.classList.add('alto-contraste');
    btnContraste.setAttribute('aria-pressed', 'true');
  }
  
  if (prefs.dislexia) {
    document.body.classList.add('fonte-dislexia');
    btnDislexia.setAttribute('aria-pressed', 'true');
  }
}

// Carrega ao abrir o site
carregarPreferencias();


/* ============================================
   7. CONTADOR ANIMADO
============================================ */
const numeros = document.querySelectorAll('.numero');

function animarContador(elemento) {
  const valorFinal = parseInt(elemento.getAttribute('data-numero'));
  const duracao = 2000;
  const inicio = performance.now();
  
  function atualizar(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = Math.floor(progresso * valorFinal);
    
    elemento.textContent = valorAtual >= 1000
      ? valorAtual.toLocaleString('pt-BR')
      : valorAtual;
    
    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      elemento.textContent = valorFinal >= 1000
        ? valorFinal.toLocaleString('pt-BR')
        : valorFinal;
    }
  }
  
  requestAnimationFrame(atualizar);
}

const observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      animarContador(entrada.target);
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 });

numeros.forEach(function(numero) {
  observador.observe(numero);
});


/* ============================================
   8. MODALIDADES (com ARIA)
============================================ */
const modalidades = {
  fps: {
    titulo: 'FPS — First Person Shooter',
    descricao: 'Jogos de tiro em primeira pessoa exigem reflexos rápidos, precisão e estratégia em equipe.',
    habilidades: ['Precisão e mira', 'Reflexos rápidos', 'Estratégia em equipe']
  },
  moba: {
    titulo: 'MOBA — Multiplayer Online Battle Arena',
    descricao: 'Dois times se enfrentam para destruir a base inimiga. Trabalho em equipe é essencial.',
    habilidades: ['Trabalho em equipe', 'Visão de mapa', 'Tomada de decisão rápida']
  },
  esportes: {
    titulo: 'Esportes Virtuais (FIFA, NBA 2K)',
    descricao: 'Simuladores de esportes reais como futebol, basquete e corrida.',
    habilidades: ['Conhecimento esportivo', 'Controle preciso', 'Leitura de jogo']
  },
  estrategia: {
    titulo: 'Estratégia (Xadrez, LoL, Age of Empires)',
    descricao: 'Jogos que exigem planejamento, raciocínio lógico e antecipação.',
    habilidades: ['Planejamento', 'Antecipação', 'Análise de dados']
  },
  vr: {
    titulo: 'Realidade Virtual (VR)',
    descricao: 'Uso de óculos VR para praticar esportes em ambiente imersivo.',
    habilidades: ['Imersão total', 'Condicionamento físico', 'Coordenação motora']
  }
};

const botoesModalidade = document.querySelectorAll('.botao-modalidade');
const tituloModalidade = document.getElementById('tituloModalidade');
const descricaoModalidade = document.getElementById('descricaoModalidade');
const habilidadesModalidade = document.getElementById('habilidadesModalidade');
const painelModalidade = document.getElementById('painelModalidade');

botoesModalidade.forEach(function(botao) {
  botao.addEventListener('click', function() {
    
    botoesModalidade.forEach(function(b) {
      b.classList.remove('ativo');
      b.setAttribute('aria-selected', 'false');
    });
    
    botao.classList.add('ativo');
    botao.setAttribute('aria-selected', 'true');
    
    const tipo = botao.getAttribute('data-modalidade');
    const info = modalidades[tipo];
    
    tituloModalidade.textContent = info.titulo;
    descricaoModalidade.textContent = info.descricao;
    
    habilidadesModalidade.innerHTML = '';
    info.habilidades.forEach(function(habilidade) {
      const li = document.createElement('li');
      li.textContent = habilidade;
      habilidadesModalidade.appendChild(li);
    });
    
    painelModalidade.style.animation = 'none';
    setTimeout(function() {
      painelModalidade.style.animation = 'aparecer 0.4s ease';
    }, 10);
    
  });
});


/* ============================================
   9. QUIZ
============================================ */
const perguntas = document.querySelectorAll('.pergunta');
const resultadoQuiz = document.getElementById('resultadoQuiz');

let acertos = 0;
let respondidas = 0;

perguntas.forEach(function(pergunta) {
  const respostaCorreta = pergunta.getAttribute('data-resposta');
  const opcoes = pergunta.querySelectorAll('.opcao');
  
  opcoes.forEach(function(opcao) {
    opcao.addEventListener('click', function() {
      
      if (pergunta.classList.contains('respondida')) return;
      pergunta.classList.add('respondida');
      
      const escolha = opcao.getAttribute('data-opcao');
      
      if (escolha === respostaCorreta) {
        opcao.classList.add('correta');
        acertos++;
      } else {
        opcao.classList.add('errada');
        opcoes.forEach(function(o) {
          if (o.getAttribute('data-opcao') === respostaCorreta) {
            o.classList.add('correta');
          }
        });
      }
      
      opcoes.forEach(function(o) {
        o.disabled = true;
      });
      
      respondidas++;
      
      if (respondidas === perguntas.length) {
        mostrarResultado();
      }
      
    });
  });
});

function mostrarResultado() {
  let mensagem = '';
  let cor = '';
  
  if (acertos === 5) {
    mensagem = `🏆 Perfeito! Você acertou ${acertos} de 5. Você é um expert em esporte digital!`;
    cor = '#d1fae5';
  } else if (acertos >= 3) {
    mensagem = `👏 Muito bem! Você acertou ${acertos} de 5. Continue explorando!`;
    cor = '#dbeafe';
  } else {
    mensagem = `📚 Você acertou ${acertos} de 5. Que tal reler a seção "Sobre" e tentar de novo?`;
    cor = '#fef3c7';
  }
  
  resultadoQuiz.textContent = mensagem;
  resultadoQuiz.style.background = cor;
  resultadoQuiz.style.color = '#0F172A';
  resultadoQuiz.classList.add('ativo');
}


/* ============================================
   10. FORMULÁRIO ACESSÍVEL
============================================ */
const formulario = document.getElementById('formulario');
const mensagemSucesso = document.getElementById('mensagemSucesso');
const detalhesInscricao = document.getElementById('detalhesInscricao');

formulario.addEventListener('submit', function(evento) {
  
  evento.preventDefault();
  
  // Limpa mensagens de erro anteriores
  document.querySelectorAll('.mensagem-erro').forEach(function(msg) {
    msg.remove();
  });
  document.querySelectorAll('.campo').forEach(function(campo) {
    campo.classList.remove('erro');
  });
  
  // Pega os valores
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const idade = document.getElementById('idade').value;
  const modalidade = document.getElementById('modalidade').value;
  const experiencia = document.getElementById('experiencia').value;
  
  let valido = true;
  let primeiroErro = null;
  
  // Função para mostrar erro acessível
  function mostrarErro(id, mensagem) {
    const campo = document.getElementById(id).closest('.campo');
    campo.classList.add('erro');
    
    const erro = document.createElement('span');
    erro.className = 'mensagem-erro';
    erro.textContent = mensagem;
    erro.setAttribute('role', 'alert');
    campo.appendChild(erro);
    
    // Liga o erro ao campo (leitor de tela anuncia)
    document.getElementById(id).setAttribute('aria-invalid', 'true');
    document.getElementById(id).setAttribute('aria-describedby', 'erro-' + id);
    erro.id = 'erro-' + id;
    
    if (!primeiroErro) primeiroErro = document.getElementById(id);
    valido = false;
  }
  
  // Validações
  if (nome.length < 3) {
    mostrarErro('nome', 'Por favor, digite seu nome completo (mínimo 3 letras).');
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    mostrarErro('email', 'Por favor, digite um e-mail válido.');
  }
  
  if (!idade || idade < 10 || idade > 99) {
    mostrarErro('idade', 'Por favor, digite uma idade entre 10 e 99 anos.');
  }
  
  if (!modalidade) {
    mostrarErro('modalidade', 'Por favor, escolha uma modalidade.');
  }
  
  if (!experiencia) {
    mostrarErro('experiencia', 'Por favor, escolha seu nível de experiência.');
  }
  
  // Se algo deu errado, foca no primeiro erro
  if (!valido) {
    if (primeiroErro) primeiroErro.focus();
    return;
  }
  
  // Sucesso!
  const botao = formulario.querySelector('button[type="submit"]');
  botao.textContent = 'Enviando...';
  botao.disabled = true;
  
  setTimeout(function() {
    
    formulario.style.display = 'none';
    
    const modalidadeTexto = {
      fps: 'FPS',
      moba: 'MOBA',
      esportes: 'Esportes',
      estrategia: 'Estratégia',
      vr: 'Realidade Virtual'
    }[modalidade];
    
    detalhesInscricao.textContent = 
      `${nome}, você se inscreveu na modalidade ${modalidadeTexto}.`;
    
    mensagemSucesso.classList.add('ativa');
    mensagemSucesso.focus();
    
    console.log('📩 Inscrição:', { nome, email, idade, modalidade, experiencia });
    
    setTimeout(function() {
      formulario.reset();
      formulario.style.display = 'block';
      mensagemSucesso.classList.remove('ativa');
      botao.innerHTML = 'Confirmar Inscrição <span aria-hidden="true">🎮</span>';
      botao.disabled = false;
    }, 6000);
    
  }, 1000);
  
});


/* ============================================
   11. ROLAGEM SUAVE
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(evento) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      evento.preventDefault();
      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Foca no destino para leitores de tela
      destino.setAttribute('tabindex', '-1');
      destino.focus();
    }
  });
});