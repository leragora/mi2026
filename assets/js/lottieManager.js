// assets/js/lottieManager.js
// Mantém cache por containerId e permite loop opcional

const lottieAnimations = {};

export function createLottieAnimation(containerId, animationPath, loop = false) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Contêiner com ID '${containerId}' não encontrado.`);
    return null;
  }

  // Reaproveita instância se já existir
  if (lottieAnimations[containerId]) {
    return lottieAnimations[containerId];
  }

  const animation = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop,           // <- controla por parâmetro (default false)
    autoplay: false,
    path: animationPath
  });

  animation.addEventListener('DOMLoaded', () => {
    console.log(`Lottie carregada: ${containerId}`);
  });

  animation.addEventListener('error', (err) => {
    console.error(`Erro Lottie (${containerId}):`, err);
  });

  lottieAnimations[containerId] = animation;
  return animation;
}
