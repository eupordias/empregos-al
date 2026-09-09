/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo: Assistente e Intérprete Virtual de LIBRAS (Língua Brasileira de Sinais)
 * Acessibilidade para Cidadãos Surdos • Lei Brasileira de Inclusão nº 13.146/15
 */

(function () {
  'use strict';

  class LibrasAssistant {
    constructor() {
      this.isOpen = false;
      this.isSigning = false;
      this.speed = 1.0; // 0.75, 1.0, 1.5
      this.currentSign = 'BEM_VINDO';
      this.currentGloss = ['BEM-VINDO', 'SETEQ', 'ALAGOAS'];
      this.activeTimer = null;

      this.dictionary = {
        'TRABALHO': {
          label: 'Trabalho / Emprego',
          gloss: 'TRABALHO [P-SINAL]',
          description: 'Punhos em formato de "S", movendo-se alternadamente para frente e para trás na altura do peito.',
          leftHand: 'translate(-10px, -18px) rotate(20deg)',
          rightHand: 'translate(10px, -12px) rotate(-15deg)',
          face: 'expressao-focada'
        },
        'VAGA': {
          label: 'Vaga / Oportunidade',
          gloss: 'VAGA / ENTRAR ESPAÇO',
          description: 'Mão esquerda forma um círculo aberto; a mão direita entra como sinalizando ocupação do espaço.',
          leftHand: 'translate(4px, -12px) rotate(10deg)',
          rightHand: 'translate(-12px, -22px) rotate(25deg)',
          face: 'expressao-afirmativa'
        },
        'SINE': {
          label: 'SINE Alagoas',
          gloss: 'S-I-N-E / TRABALHO LUGAR',
          description: 'Datilologia rápida S-I-N-E seguida do sinal de agência pública de intermediação de mão de obra.',
          leftHand: 'translate(-6px, -14px) rotate(15deg)',
          rightHand: 'translate(8px, -16px) rotate(-20deg)',
          face: 'expressao-neutra'
        },
        'SETEQ': {
          label: 'SETEQ Governo de Alagoas',
          gloss: 'SECRETARIA TRABALHO GOVERNO ALAGOAS',
          description: 'Sinal indicativo de secretaria de estado e promoção do emprego no território alagoano.',
          leftHand: 'translate(-14px, -20px) rotate(25deg)',
          rightHand: 'translate(14px, -20px) rotate(-25deg)',
          face: 'expressao-solene'
        },
        'CURSO': {
          label: 'Curso / Qualifica AL',
          gloss: 'ESTUDAR / CAPACITAÇÃO / APRENDER',
          description: 'Palma da mão esquerda aberta para cima como um livro; mão direita toca a palma repetidamente.',
          leftHand: 'translate(0px, -8px) rotate(5deg)',
          rightHand: 'translate(-8px, -22px) rotate(30deg)',
          face: 'expressao-positiva'
        },
        'CURRICULO': {
          label: 'Currículo Oficial',
          gloss: 'DOCUMENTO / HISTÓRICO TRABALHO',
          description: 'Mãos abertas frente ao peito traçando os limites de uma folha de papel e apontando dados pessoais.',
          leftHand: 'translate(-12px, -12px) rotate(15deg)',
          rightHand: 'translate(12px, -12px) rotate(-15deg)',
          face: 'expressao-focada'
        },
        'SEGURO_DESEMPREGO': {
          label: 'Seguro-Desemprego',
          gloss: 'AJUDA FINANCEIRA / TRABALHADOR PARADO',
          description: 'Sinal de proteção/garantia social com as duas mãos cruzadas suavemente à frente do tórax.',
          leftHand: 'translate(6px, -16px) rotate(18deg)',
          rightHand: 'translate(-6px, -16px) rotate(-18deg)',
          face: 'expressao-atenta'
        },
        'SALARIO': {
          label: 'Salário / Renda',
          gloss: 'DINHEIRO / PAGAMENTO MENSAL',
          description: 'Polegar e indicador friccionam-se suavemente simulando cédulas, com movimento horizontal.',
          leftHand: 'translate(-4px, -10px) rotate(10deg)',
          rightHand: 'translate(12px, -18px) rotate(-25deg)',
          face: 'expressao-positiva'
        },
        'AJUDA': {
          label: 'Ajuda / Atendimento',
          gloss: 'AJUDAR-VOCÊ / ATENDIMENTO',
          description: 'Mão esquerda em punho serve de base; mão direita em polegar para cima empurra para frente.',
          leftHand: 'translate(0px, -10px) rotate(0deg)',
          rightHand: 'translate(0px, -24px) rotate(0deg)',
          face: 'expressao-amigavel'
        },
        'BEM_VINDO': {
          label: 'Boas-Vindas',
          gloss: 'BEM-VINDO / ACOLHER',
          description: 'Braços abrem-se suavemente com as palmas voltadas para cima, convidando o cidadão.',
          leftHand: 'translate(-16px, -16px) rotate(20deg)',
          rightHand: 'translate(16px, -16px) rotate(-20deg)',
          face: 'expressao-sorridente'
        }
      };

      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.render());
      } else {
        this.render();
      }
    }

    toggle() {
      this.isOpen = !this.isOpen;
      const win = document.getElementById('libras-window');
      const trigger = document.getElementById('libras-pill-trigger');

      if (!win) return;

      if (this.isOpen) {
        win.classList.remove('minimized');
        win.classList.remove('hidden');
        this.playSign('BEM_VINDO');
        if (window.Toast) {
          window.Toast.show('🤟 Intérprete de LIBRAS da SETEQ ativado!', 'info', 2500);
        }
      } else {
        win.classList.add('minimized');
        setTimeout(() => {
          if (!this.isOpen) win.classList.add('hidden');
        }, 300);
      }
    }

    setSpeed(speedVal) {
      this.speed = speedVal;
      const stage = document.getElementById('libras-avatar-stage');
      if (stage) {
        const hands = stage.querySelectorAll('.libras-hand-left, .libras-hand-right');
        hands.forEach(h => {
          h.style.animationDuration = `${1.8 / speedVal}s`;
        });
      }
      if (window.Toast) window.Toast.show(`Velocidade de sinalização: ${speedVal}x`, 'info', 1500);
    }

    render() {
      let root = document.getElementById('libras-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'libras-root';
        document.body.appendChild(root);
      }

      root.innerHTML = `
        <!-- Botão Flutuante Lateral Oficial de LIBRAS (Padrão Gov.br) -->
        <aside id="libras-pill-trigger" class="libras-pill-trigger group flex items-center gap-2 py-3 px-3.5 no-print" title="Ativar Assistente de LIBRAS (Alt + L)" aria-label="Ativar Acessibilidade em LIBRAS">
          <div class="flex flex-col items-center">
            <!-- Ícone Universal de LIBRAS: Duas mãos sinalizando -->
            <svg class="w-6 h-6 text-cyan-300 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            <span class="text-[10px] font-black tracking-wider text-white mt-0.5 uppercase">LIBRAS</span>
          </div>
        </aside>

        <!-- Janela do Intérprete Virtual de LIBRAS -->
        <div id="libras-window" class="libras-window fixed bottom-6 left-4 sm:left-6 z-50 w-80 sm:w-96 rounded-3xl bg-slate-900 border-2 border-cyan-500/50 flex flex-col shadow-2xl overflow-hidden hidden minimized text-white select-none">
          
          <!-- Cabeçalho do Intérprete -->
          <div class="p-3.5 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                🤟
              </div>
              <div>
                <h4 class="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
                  <span>Intérprete Virtual LIBRAS</span>
                  <span class="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">SETEQ AL</span>
                </h4>
                <p class="text-[10px] text-slate-400">Acessibilidade para Pessoas Surdas</p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button id="libras-close-btn" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm leading-none font-bold" title="Fechar intérprete">
                ✕
              </button>
            </div>
          </div>

          <!-- Palco do Avatar Animado em LIBRAS -->
          <div id="libras-avatar-stage" class="libras-avatar-stage h-64 flex flex-col items-center justify-between p-3 relative">
            
            <!-- Badge de Velocidade -->
            <div class="w-full flex items-center justify-between text-[10px] z-10">
              <span class="px-2 py-0.5 rounded-full bg-slate-900/80 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                Avatar: Guga SETEQ
              </span>
              
              <div class="flex items-center gap-1 bg-slate-900/80 rounded-lg p-0.5 border border-slate-700">
                <button class="libras-speed-btn px-1.5 py-0.5 rounded text-[10px] ${this.speed === 0.75 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}" data-speed="0.75">0.75x</button>
                <button class="libras-speed-btn px-1.5 py-0.5 rounded text-[10px] ${this.speed === 1.0 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}" data-speed="1.0">1.0x</button>
                <button class="libras-speed-btn px-1.5 py-0.5 rounded text-[10px] ${this.speed === 1.5 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}" data-speed="1.5">1.5x</button>
              </div>
            </div>

            <!-- Desenho Vetorial do Avatar (Ícaro / Guga) com Animação de Braços e Mãos -->
            <div class="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 120 120" class="w-full h-full filter drop-shadow-md">
                <!-- Tronco e Camisa com Selo de Alagoas -->
                <path d="M40 70 L80 70 L86 115 L34 115 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
                <!-- Brasão Alagoas na camisa -->
                <circle cx="60" cy="85" r="5" fill="#DC2626"/>
                <circle cx="60" cy="85" r="2.5" fill="#FFFFFF"/>
                <circle cx="60" cy="85" r="1.2" fill="#0D47A1"/>
                
                <!-- Pescoço -->
                <rect x="54" y="52" width="12" height="18" fill="#FBBF24" rx="3"/>
                
                <!-- Cabeça e Rosto Expressivo -->
                <g class="libras-avatar-head">
                  <!-- Cabelo moderno -->
                  <path d="M44 32 C44 20, 76 20, 76 32 C78 30, 80 34, 76 36 C76 26, 44 26, 44 36 Z" fill="#1E293B"/>
                  <!-- Cabeça -->
                  <ellipse cx="60" cy="38" rx="16" ry="18" fill="#FCD34D"/>
                  <!-- Olhos expressivos -->
                  <circle cx="54" cy="36" r="2" fill="#0F172A"/>
                  <circle cx="66" cy="36" r="2" fill="#0F172A"/>
                  <!-- Sobrancelhas -->
                  <path d="M51 31 Q54 29 57 31" stroke="#1E293B" stroke-width="1.2" fill="none"/>
                  <path d="M63 31 Q66 29 69 31" stroke="#1E293B" stroke-width="1.2" fill="none"/>
                  <!-- Sorriso/Boca animada -->
                  <path d="M54 46 Q60 51 66 46" stroke="#B45309" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                </g>

                <!-- Braço e Mão Esquerda com Articulação LIBRAS -->
                <g class="libras-hand-left" id="avatar-hand-left">
                  <!-- Braço -->
                  <path d="M38 72 Q24 82 28 96" stroke="#FBBF24" stroke-width="8" stroke-linecap="round" fill="none"/>
                  <!-- Mão com configuração de dedos -->
                  <circle cx="28" cy="98" r="6" fill="#FCD34D"/>
                  <path d="M25 94 L22 90 M27 94 L25 87 M30 94 L30 86 M33 95 L34 88" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
                </g>

                <!-- Braço e Mão Direita com Articulação LIBRAS -->
                <g class="libras-hand-right" id="avatar-hand-right">
                  <!-- Braço -->
                  <path d="M82 72 Q96 82 92 96" stroke="#FBBF24" stroke-width="8" stroke-linecap="round" fill="none"/>
                  <!-- Mão com configuração de dedos -->
                  <circle cx="92" cy="98" r="6" fill="#FCD34D"/>
                  <path d="M95 94 L98 90 M93 94 L95 87 M90 94 L90 86 M87 95 L86 88" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
                </g>
              </svg>
            </div>

            <!-- Caixa de Glosa / Legenda Sincronizada -->
            <div class="libras-glosa-box w-full p-2 rounded-xl text-center z-10 space-y-0.5">
              <span class="text-[9px] font-bold text-cyan-400 tracking-wider uppercase block">Glosa LIBRAS (Estrutura Gramatical):</span>
              <p id="libras-current-gloss" class="text-xs font-mono font-bold text-white tracking-wide">
                [BEM-VINDO] • [SETEQ] • [ALAGOAS]
              </p>
            </div>
          </div>

          <!-- Barra de Tradução Instantânea -->
          <div class="p-3 bg-slate-950 border-t border-slate-800 space-y-2.5">
            
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold text-slate-300">Dicionário de Sinais Rápidos:</span>
              <button id="btn-translate-selection" class="px-2 py-0.5 rounded bg-cyan-900/60 hover:bg-cyan-800 text-cyan-300 border border-cyan-700 text-[10px] font-semibold transition-colors flex items-center gap-1" title="Traduzir texto que você selecionou na página">
                <span>✂️</span> Traduzir Seleção
              </button>
            </div>

            <!-- Grade de Sinais Frequentes da SETEQ -->
            <div class="grid grid-cols-3 gap-1.5 text-[11px]">
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="TRABALHO">
                💼 Trabalho
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="VAGA">
                🔍 Vaga
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="SINE">
                🏢 SINE AL
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="CURSO">
                🎓 Cursos
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="CURRICULO">
                📄 Currículo
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="SEGURO_DESEMPREGO">
                🛡️ Seguro Des.
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="SALARIO">
                💰 Salário
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="SETEQ">
                🏛️ SETEQ
              </button>
              <button class="libras-sign-btn p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 font-semibold text-center transition-colors truncate" data-sign="AJUDA">
                🤝 Ajuda
              </button>
            </div>

            <!-- Campo para Digitar e Traduzir Qualquer Palavra -->
            <div class="flex items-center gap-1.5 pt-1">
              <input 
                type="text" 
                id="libras-custom-input" 
                placeholder="Digitar palavra para sinalizar..." 
                class="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              <button id="libras-btn-submit-text" class="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors">
                Sinalizar
              </button>
            </div>

            <div class="text-[10px] text-slate-400 text-center pt-0.5 flex justify-between items-center">
              <span>Atalho: <strong>Alt + L</strong></span>
              <span class="text-cyan-400">Lei Federal 13.146/15</span>
            </div>

          </div>

        </div>
      `;

      this.bindEvents();
    }

    bindEvents() {
      // Toggle lateral
      const trigger = document.getElementById('libras-pill-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => this.toggle());
      }

      // Fechar janela
      const closeBtn = document.getElementById('libras-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.toggle());
      }

      // Velocidade
      document.querySelectorAll('.libras-speed-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const speed = parseFloat(e.currentTarget.dataset.speed);
          this.setSpeed(speed);
          document.querySelectorAll('.libras-speed-btn').forEach(b => {
            b.classList.remove('bg-cyan-600', 'text-white', 'font-bold');
            b.classList.add('text-slate-400');
          });
          e.currentTarget.classList.add('bg-cyan-600', 'text-white', 'font-bold');
          e.currentTarget.classList.remove('text-slate-400');
        });
      });

      // Botões do Dicionário
      document.querySelectorAll('.libras-sign-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const signKey = e.currentTarget.dataset.sign;
          this.playSign(signKey);
        });
      });

      // Traduzir seleção do usuário
      const translateSelBtn = document.getElementById('btn-translate-selection');
      if (translateSelBtn) {
        translateSelBtn.addEventListener('click', () => {
          const selectedText = window.getSelection().toString().trim();
          if (selectedText) {
            this.translateTextToLibras(selectedText);
          } else {
            if (window.Toast) window.Toast.show('Selecione algum texto na página para ver a tradução em LIBRAS.', 'info', 2000);
          }
        });
      }

      // Enviar texto customizado
      const submitTextBtn = document.getElementById('libras-btn-submit-text');
      const customInput = document.getElementById('libras-custom-input');
      if (submitTextBtn && customInput) {
        const handleCustom = () => {
          const val = customInput.value.trim();
          if (val) {
            this.translateTextToLibras(val);
            customInput.value = '';
          }
        };

        submitTextBtn.addEventListener('click', handleCustom);
        customInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') handleCustom();
        });
      }

      // Atalho Alt + L
      window.addEventListener('keydown', (e) => {
        if (e.altKey && (e.key === 'l' || e.key === 'L')) {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    playSign(signKey) {
      const data = this.dictionary[signKey] || {
        label: signKey,
        gloss: `[${signKey.toUpperCase()}]`,
        description: 'Sinalização com movimento padrão em LIBRAS.',
        leftHand: 'translate(-8px, -14px) rotate(15deg)',
        rightHand: 'translate(8px, -14px) rotate(-15deg)'
      };

      const stage = document.getElementById('libras-avatar-stage');
      const glossEl = document.getElementById('libras-current-gloss');

      if (glossEl) {
        glossEl.textContent = data.gloss;
      }

      if (stage) {
        stage.classList.add('signing-active');
        const leftHand = document.getElementById('avatar-hand-left');
        const rightHand = document.getElementById('avatar-hand-right');

        if (leftHand && data.leftHand) leftHand.style.transform = data.leftHand;
        if (rightHand && data.rightHand) rightHand.style.transform = data.rightHand;

        clearTimeout(this.activeTimer);
        this.activeTimer = setTimeout(() => {
          stage.classList.remove('signing-active');
        }, 1800 / this.speed);
      }

      if (window.Toast) {
        window.Toast.show(`🤟 Sinalizando: ${data.label}`, 'info', 1800);
      }
    }

    translateTextToLibras(text) {
      const words = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/);
      const glossList = [];

      // Mapeamento semântico português -> Glosa LIBRAS
      words.forEach(w => {
        if (w.includes('trabalh') || w.includes('empreg')) glossList.push('TRABALHO');
        else if (w.includes('vag')) glossList.push('VAGA');
        else if (w.includes('sine')) glossList.push('SINE');
        else if (w.includes('curs') || w.includes('qualific') || w.includes('estud')) glossList.push('CURSO');
        else if (w.includes('curricul')) glossList.push('CURRÍCULO');
        else if (w.includes('segur') || w.includes('desempreg')) glossList.push('SEGURO_DESEMPREGO');
        else if (w.includes('salari') || w.includes('dinheir') || w.includes('pag')) glossList.push('SALÁRIO');
        else if (w.includes('seteq') || w.includes('govern')) glossList.push('SETEQ');
        else if (w.includes('ajud') || w.includes('atend')) glossList.push('AJUDA');
        else if (w.length > 2) glossList.push(w.toUpperCase());
      });

      if (glossList.length === 0) glossList.push('BEM_VINDO');

      const primary = glossList[0];
      const fullGlossText = glossList.map(g => `[${g}]`).join(' • ');

      const glossEl = document.getElementById('libras-current-gloss');
      if (glossEl) glossEl.textContent = fullGlossText;

      this.playSign(primary);
    }
  }

  window.LibrasAssistant = LibrasAssistant;
  window.librasAssistant = new LibrasAssistant();
})();
