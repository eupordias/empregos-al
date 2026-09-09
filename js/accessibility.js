/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Módulo de Acessibilidade (WCAG 2.1 AA) e Menu Anexado
 * Sintetizador Web Speech, Modo Alto Contraste, Dark Mode, Escala de Fonte e Controle do Menu Anexado
 */

(function () {
  'use strict';

  class AccessibilityEngine {
    constructor() {
      this.fontScaleSteps = [85, 100, 130];
      this.currentFontIndex = parseInt(localStorage.getItem('seteq_font_index') || '1', 10);
      if (this.currentFontIndex < 0 || this.currentFontIndex >= this.fontScaleSteps.length) {
        this.currentFontIndex = 1;
      }
      this.isDark = localStorage.getItem('seteq_dark_mode') === 'true';
      this.isHighContrast = localStorage.getItem('seteq_high_contrast') === 'true';
      this.isSpeaking = false;
      this.synth = window.speechSynthesis || null;

      this.init();
    }

    init() {
      this.applyFontScale();
      if (this.isDark) this.applyDarkMode(true);
      if (this.isHighContrast) this.applyHighContrast(true);

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.bindEvents());
      } else {
        this.bindEvents();
      }
    }

    bindEvents() {
      // Delegação de eventos no document para garantir funcionamento contínuo mesmo com re-render do Navbar
      document.addEventListener('click', (e) => {
        // 1. Alternar Menu Anexado (Dropdown)
        const toggleMenuBtn = e.target.closest('#btn-toggle-attached-menu');
        if (toggleMenuBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleAttachedMenu();
          return;
        }

        // 2. Fechar Menu Anexado ao clicar fora
        const dropdown = document.getElementById('attached-menu-dropdown');
        if (dropdown && !dropdown.classList.contains('hidden')) {
          if (!e.target.closest('#attached-menu-wrapper')) {
            this.closeAttachedMenu();
          }
        }

        // 3. Botões de Fonte
        if (e.target.closest('#btn-font-dec')) {
          e.preventDefault();
          this.changeFontScale(-1);
          return;
        }
        if (e.target.closest('#btn-font-reset')) {
          e.preventDefault();
          this.resetFontScale();
          return;
        }
        if (e.target.closest('#btn-font-inc')) {
          e.preventDefault();
          this.changeFontScale(1);
          return;
        }

        // 4. Modo Escuro
        if (e.target.closest('#btn-toggle-dark')) {
          e.preventDefault();
          this.toggleDarkMode();
          return;
        }

        // 5. Alto Contraste
        if (e.target.closest('#btn-toggle-contrast')) {
          e.preventDefault();
          this.toggleHighContrast();
          return;
        }

        // 6. Leitor de Texto / Áudio
        if (e.target.closest('#btn-tts-toggle')) {
          e.preventDefault();
          this.toggleSpeech();
          return;
        }

        // 7. Abrir Simulador Mobile
        if (e.target.closest('#btn-open-mobile-simulator')) {
          e.preventDefault();
          if (window.MobileSimulator) {
            window.MobileSimulator.open();
          }
          return;
        }

        // 8. Ativar Intérprete de LIBRAS
        if (e.target.closest('#btn-libras-toggle')) {
          e.preventDefault();
          if (window.librasAssistant) {
            window.librasAssistant.toggle();
          }
          return;
        }
      });

      // Atalhos de teclado para acessibilidade
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAttachedMenu();
        } else if (e.altKey && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault();
          this.toggleHighContrast();
        } else if (e.altKey && (e.key === 'd' || e.key === 'D')) {
          e.preventDefault();
          this.toggleDarkMode();
        } else if (e.altKey && (e.key === 'v' || e.key === 'V')) {
          e.preventDefault();
          this.toggleSpeech();
        } else if (e.altKey && (e.key === 'm' || e.key === 'M')) {
          e.preventDefault();
          if (window.MobileSimulator) window.MobileSimulator.open();
        } else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
          e.preventDefault();
          this.toggleAttachedMenu();
        }
      });
    }

    toggleAttachedMenu() {
      const dropdown = document.getElementById('attached-menu-dropdown');
      const arrow = document.getElementById('attached-menu-arrow');
      const toggleBtn = document.getElementById('btn-toggle-attached-menu');
      if (!dropdown) return;

      const isHidden = dropdown.classList.contains('hidden');
      if (isHidden) {
        dropdown.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.classList.add('hidden');
        if (arrow) arrow.classList.remove('rotate-180');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }

    closeAttachedMenu() {
      const dropdown = document.getElementById('attached-menu-dropdown');
      const arrow = document.getElementById('attached-menu-arrow');
      const toggleBtn = document.getElementById('btn-toggle-attached-menu');
      if (dropdown) dropdown.classList.add('hidden');
      if (arrow) arrow.classList.remove('rotate-180');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    changeFontScale(delta) {
      this.currentFontIndex = Math.max(0, Math.min(this.fontScaleSteps.length - 1, this.currentFontIndex + delta));
      localStorage.setItem('seteq_font_index', this.currentFontIndex);
      this.applyFontScale();
      const currentPct = this.fontScaleSteps[this.currentFontIndex];
      if (window.Toast) window.Toast.show(`Tamanho da fonte ajustado: ${currentPct}%`, 'info', 1800);
    }

    resetFontScale() {
      this.currentFontIndex = 1; // 100%
      localStorage.setItem('seteq_font_index', '1');
      this.applyFontScale();
      if (window.Toast) window.Toast.show('Tamanho da fonte redefinido para o padrão (100%)', 'info', 1800);
    }

    applyFontScale() {
      const scale = this.fontScaleSteps[this.currentFontIndex] || 100;
      document.documentElement.style.fontSize = `${scale}%`;
    }

    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.setItem('seteq_dark_mode', this.isDark);
      this.applyDarkMode(this.isDark);
      if (window.Toast) {
        window.Toast.show(this.isDark ? '🌙 Modo Escuro Ativado' : '☀️ Modo Claro Ativado', 'info', 2000);
      }
    }

    applyDarkMode(active) {
      const darkIcon = document.getElementById('dark-icon');
      const darkText = document.getElementById('dark-text');
      if (active) {
        document.documentElement.classList.add('dark');
        if (darkIcon) darkIcon.textContent = '☀️';
        if (darkText) darkText.textContent = 'Modo Claro';
      } else {
        document.documentElement.classList.remove('dark');
        if (darkIcon) darkIcon.textContent = '🌙';
        if (darkText) darkText.textContent = 'Modo Escuro';
      }
    }

    toggleHighContrast() {
      this.isHighContrast = !this.isHighContrast;
      localStorage.setItem('seteq_high_contrast', this.isHighContrast);
      this.applyHighContrast(this.isHighContrast);
      if (window.Toast) {
        window.Toast.show(this.isHighContrast ? '⚡ Alto Contraste Ativado' : 'Contraste Normal Restaurado', 'warning', 2000);
      }
    }

    applyHighContrast(active) {
      if (active) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }

    // Leitor de voz Web Speech
    toggleSpeech() {
      if (!this.synth) {
        if (window.Toast) window.Toast.show('Síntese de voz não suportada neste navegador.', 'warning');
        return;
      }

      if (this.isSpeaking) {
        this.synth.cancel();
        this.isSpeaking = false;
        this.updateSpeechUi(false);
        if (window.Toast) window.Toast.show('Áudio pausado.', 'info', 1500);
        return;
      }

      // Extrair texto legível da tela ou seleção
      let textToRead = window.getSelection().toString().trim();
      if (!textToRead) {
        const main = document.getElementById('main-content');
        textToRead = main ? main.innerText.slice(0, 1500) : 'Bem-vindo ao portal Empregos Alagoas da Secretaria do Trabalho.';
      }

      if (!textToRead) return;

      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.05;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.updateSpeechUi(true);
        if (window.Toast) window.Toast.show('🔊 Lendo conteúdo da página...', 'info', 2500);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.updateSpeechUi(false);
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.updateSpeechUi(false);
      };

      this.synth.speak(utterance);
    }

    updateSpeechUi(speaking) {
      const icon = document.getElementById('tts-icon');
      const text = document.getElementById('tts-text');
      if (speaking) {
        if (icon) icon.textContent = '⏹️';
        if (text) text.textContent = 'Parar Áudio';
      } else {
        if (icon) icon.textContent = '🔊';
        if (text) text.textContent = 'Ouvir Conteúdo (Voz)';
      }
    }
  }

  window.AccessibilityEngine = AccessibilityEngine;
  window.accessibilityEngine = new AccessibilityEngine();
})();
