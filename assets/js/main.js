// assets/js/main.js
import { setupMSO } from './observerSetup.js';
import { msoConfigs } from './configs.js';
import { createLottieAnimation } from './lottieManager.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Fluxo normal para MSOs
  Object.keys(msoConfigs).forEach(setupMSO);

  // 2) Fallback: se o elemento NÃO tiver .pageItem.state, cria/toca direto
  Object.entries(msoConfigs).forEach(([msoId, cfg]) => {
    const root = document.getElementById(msoId);
    if (!root) return;

    const hasStates = root.querySelector('.pageItem.state');
    if (!hasStates) {
      const c = cfg.default || Object.values(cfg)[0];
      if (c?.containerId && c?.path) {
        const anim = createLottieAnimation(c.containerId, c.path, c.loop || false);
        if (anim) anim.play();
      }
    }
  });
});
