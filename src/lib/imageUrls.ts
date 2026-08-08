export const IMAGE_URLS = {
  brandLogo:
    "https://cdn.phototourl.com/free/2026-08-07-853c1ac8-f88a-43ed-9c25-ce6366274c8d.jpg",
  winwinLogo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10",
  greenbetLogo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoAmJRao5l-ZRDcm5skZ_8RXDLW4TTDcXPc1Pn9fNmw&s",
  heroBg: "/__l5e/assets-v1/fa83f29b-6230-468b-a5af-efde76ae45e6/hero-bg.jpg",
  plane: "/__l5e/assets-v1/20eabdc2-6544-43b7-97b6-fc0f5517a4d6/plane-3d.png",
  skyBg: "/__l5e/assets-v1/c954a3fb-9bcb-4cd2-8553-8ce17926aed2/sky-bg.jpg",
  termsHero: "/__l5e/assets-v1/2d3167f4-93c1-489c-89ee-2dcb32136706/terms-hero.jpg",
  stepDownload: "/__l5e/assets-v1/aaf82511-2556-4b01-910f-90d77ba2df09/step-download.jpg",
  stepRegister: "/__l5e/assets-v1/4b7a64b8-82a6-42ac-aff2-58db389e8c8c/step-register.jpg",
  stepTelegram: "/__l5e/assets-v1/c06a362d-b026-4891-aa52-27db98192331/step-telegram.jpg",
  stepDeposit: "/__l5e/assets-v1/7ed78408-a2c5-4170-bb35-93271797d402/step-deposit.jpg",
} as const;

export const ALL_IMAGE_URLS = Object.values(IMAGE_URLS);

export function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    const finish = () => resolve();
    image.onload = finish;
    image.onerror = finish;
    image.src = url;
    if (image.complete) finish();
  });
}