// =============================================================================
// PROJETO: Wild Clash - Regulamento (JavaScript)
// DESCRIÇÃO: Fallback para imagens de redes sociais
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Fallback para imagens de redes sociais (caso não sejam encontradas)
    const socialImages = document.querySelectorAll('.social-icon img');
    socialImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const parent = this.parentNode;
            // Se já existir um fallback, não duplicar
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