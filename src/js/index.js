// =============================================================================
// PROJETO: Wild Clash - Regulamento (JavaScript)
// DESCRIÇÃO: Sistema de rolagem para aceitação das regras (sem redirecionamento)
// VERSÃO: 2.1 - Correção de bugs e logs de depuração
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando script...');

    // Elementos
    const rulesScroll = document.getElementById('rules-scroll');
    const rulesProgress = document.getElementById('rules-progress');
    const rulesProgressText = document.getElementById('rules-progress-text');
    const btnAceitar = document.getElementById('btn-aceitar-regras');
    
    // Verificação de elementos
    if (!rulesScroll) {
        console.error('Elemento #rules-scroll não encontrado!');
        return;
    }
    if (!rulesProgress) {
        console.error('Elemento #rules-progress não encontrado!');
        return;
    }
    if (!rulesProgressText) {
        console.error('Elemento #rules-progress-text não encontrado!');
        return;
    }
    if (!btnAceitar) {
        console.error('Elemento #btn-aceitar-regras não encontrado!');
        return;
    }
    
    console.log('Todos os elementos encontrados:', { rulesScroll, rulesProgress, rulesProgressText, btnAceitar });
    
    let hasReadRules = false;
    
    // Inicialmente desabilitado
    btnAceitar.disabled = true;
    btnAceitar.classList.remove('enabled', 'accepted');
    
    // Função para atualizar a barra de progresso
    function updateProgress() {
        const scrollTop = rulesScroll.scrollTop;
        const scrollHeight = rulesScroll.scrollHeight - rulesScroll.clientHeight;
        let scrollPercentage = 0;
        
        if (scrollHeight > 0) {
            scrollPercentage = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
        } else {
            // Se não há necessidade de rolar, considera 100%
            scrollPercentage = 100;
        }
        
        // Atualiza barra de progresso
        rulesProgress.style.width = scrollPercentage + '%';
        rulesProgressText.textContent = scrollPercentage + '% lido';
        
        console.log('Scroll percentual:', scrollPercentage, 'hasReadRules:', hasReadRules, 'btnAceitar class:', btnAceitar.className);
        
        // Se atingiu 95% ou mais, habilita o botão (se ainda não foi aceito)
        if (scrollPercentage >= 95 && !hasReadRules && !btnAceitar.classList.contains('accepted')) {
            hasReadRules = true;
            
            btnAceitar.disabled = false;
            btnAceitar.classList.add('enabled');
            btnAceitar.classList.remove('accepted');
            
            // Animação sutil
            btnAceitar.style.animation = 'pulse 2s infinite';
            
            console.log('Botão habilitado!');
        }
    }
    
    // Evento de scroll
    rulesScroll.addEventListener('scroll', updateProgress);
    
    // Verifica imediatamente após o carregamento (caso o conteúdo já seja todo visível)
    setTimeout(() => {
        console.log('Verificação inicial após 500ms');
        updateProgress();
    }, 500);
    
    // Clique no botão de aceitar
    btnAceitar.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Botão clicado. disabled:', btnAceitar.disabled, 'classList:', btnAceitar.classList);
        
        // Só executa se estiver habilitado e não aceito ainda
        if (!btnAceitar.disabled && !btnAceitar.classList.contains('accepted')) {
            // Marca como aceito
            btnAceitar.classList.remove('enabled');
            btnAceitar.classList.add('accepted');
            btnAceitar.disabled = true; // Mantém disabled para não clicar novamente
            btnAceitar.style.animation = 'none';
            
            // Altera o texto
            btnAceitar.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Regras aceitas!</span>';
            
            console.log('Regras aceitas!');
            
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
});