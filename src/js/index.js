// =============================================================================
// PROJETO: Wild Clash - Regulamento (JavaScript)
// DESCRIÇÃO: Sistema de rolagem para aceitação das regras (sem redirecionamento)
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const rulesScroll = document.getElementById('rules-scroll');
    const rulesProgress = document.getElementById('rules-progress');
    const rulesProgressText = document.getElementById('rules-progress-text');
    const btnAceitar = document.getElementById('btn-aceitar-regras');
    
    if (!rulesScroll || !btnAceitar) {
        console.warn('Elementos necessários não encontrados');
        return;
    }
    
    let hasReadRules = false;
    
    // Inicialmente desabilitado
    btnAceitar.disabled = true;
    btnAceitar.classList.remove('enabled', 'accepted');
    
    // Evento de scroll
    rulesScroll.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight - this.clientHeight;
        let scrollPercentage = 0;
        
        if (scrollHeight > 0) {
            scrollPercentage = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
        }
        
        // Atualiza barra de progresso
        if (rulesProgress) {
            rulesProgress.style.width = scrollPercentage + '%';
        }
        
        if (rulesProgressText) {
            rulesProgressText.textContent = scrollPercentage + '% lido';
        }
        
        // Se atingiu 95% ou mais, habilita o botão (se ainda não foi aceito)
        if (scrollPercentage >= 95 && !hasReadRules && !btnAceitar.classList.contains('accepted')) {
            hasReadRules = true;
            
            btnAceitar.disabled = false;
            btnAceitar.classList.add('enabled');
            btnAceitar.classList.remove('accepted');
            
            // Animação sutil
            btnAceitar.style.animation = 'pulse 2s infinite';
        }
    });
    
    // Clique no botão de aceitar
    btnAceitar.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Só executa se estiver habilitado e não aceito ainda
        if (!btnAceitar.disabled && !btnAceitar.classList.contains('accepted')) {
            // Marca como aceito
            btnAceitar.classList.remove('enabled');
            btnAceitar.classList.add('accepted');
            btnAceitar.disabled = true; // Mantém disabled para não clicar novamente
            btnAceitar.style.animation = 'none';
            
            // Altera o texto (opcional)
            btnAceitar.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Regras aceitas!</span>';
            
            // NÃO redireciona – apenas permanece na página com feedback visual
        }
    });
    
    // Fallback para imagens de redes sociais
    const socialImages = document.querySelectorAll('.social-icon img');
    socialImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const parent = this.parentNode;
            if (!parent.querySelector('.default-icon')) {
                const defaultIcon = document.createElement('span');
                defaultIcon.className = 'default-icon';
                defaultIcon.style.width = '100%';
                defaultIcon.style.height = '100%';
                defaultIcon.style.background = 'rgba(255,255,255,0.2)';
                defaultIcon.style.borderRadius = '4px';
                parent.appendChild(defaultIcon);
            }
        };
    });
    
    // Forçar verificação inicial (caso o conteúdo seja pequeno)
    setTimeout(() => {
        const scrollHeight = rulesScroll.scrollHeight - rulesScroll.clientHeight;
        if (scrollHeight <= 0) {
            // Conteúdo não precisa rolar, já está totalmente visível
            hasReadRules = true;
            btnAceitar.disabled = false;
            btnAceitar.classList.add('enabled');
            btnAceitar.classList.remove('accepted');
            
            if (rulesProgress) rulesProgress.style.width = '100%';
            if (rulesProgressText) rulesProgressText.textContent = '100% lido';
        }
    }, 500);
});