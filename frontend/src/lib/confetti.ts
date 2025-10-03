import type { Options as ConfettiOptions } from 'canvas-confetti';

interface ConfettiOptionsExtended extends ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
}

export const triggerConfetti = (): void => {
  // Dynamic import para evitar problemas con SSR
  import('canvas-confetti').then(({ default: confetti }) => {
    const count = 200;
    const defaults: ConfettiOptionsExtended = {
      origin: { y: 0.7 },
      spread: 100,
      ticks: 100,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    };

    const fire = (particleRatio: number, opts: Partial<ConfettiOptionsExtended> = {}): void => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    // Efectos de confeti en cascada
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }).catch((error: Error) => {
    console.error('Error al cargar el confeti:', error);
  });
};
