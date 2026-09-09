/**
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Componente de Modal Reutilizável
 */

export const Modal = {
  open({ title = '', contentHtml = '', onRender = null, size = 'lg', footerHtml = '' }) {
    const container = document.getElementById('modal-container');
    if (!container) return;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-xl',
      lg: 'max-w-3xl',
      xl: 'max-w-5xl',
      full: 'max-w-6xl'
    };

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm fade-in" id="modal-backdrop">
        <div class="relative w-full ${sizeClasses[size] || sizeClasses.lg} bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all transform flex flex-col max-h-[90vh]">
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              ${title}
            </h3>
            <button id="modal-close-btn" class="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto flex-1 text-slate-700" id="modal-body-content">
            ${contentHtml}
          </div>

          <!-- Footer (opcional) -->
          ${footerHtml ? `
            <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              ${footerHtml}
            </div>
          ` : ''}

        </div>
      </div>
    `;

    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');

    const handleClose = () => {
      container.innerHTML = '';
      document.removeEventListener('keydown', handleKey);
    };

    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    closeBtn?.addEventListener('click', handleClose);
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) handleClose();
    });
    document.addEventListener('keydown', handleKey);

    if (typeof onRender === 'function') {
      onRender(document.getElementById('modal-body-content'), handleClose);
    }
  },

  close() {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
  }
};
