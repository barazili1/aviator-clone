export const IMAGE_URLS = {
  brandLogo: "/__l5e/assets-v1/7529420e-9c0e-447c-8fd4-4485a5385e4c/brand-logo.jpg",
  winwinLogo: "/__l5e/assets-v1/ccaed62f-955e-446e-9a95-54acee3bd52a/winwin.png",
  greenbetLogo: "/__l5e/assets-v1/bfdc5697-6f3e-4c8c-b71b-ecd4dc817010/greenbet.jpg",
  heroBg: "/__l5e/assets-v1/bd1870b1-8d98-44c6-ab10-a6f5db6ac057/hero-bg.jpg",
  plane: "/__l5e/assets-v1/5a54e27f-324c-452a-a705-e18f74ae044f/plane-3d.png",
  skyBg: "/__l5e/assets-v1/78d07f95-77d6-4e7a-9529-9708d491e774/sky-bg.jpg",
  termsHero: "/__l5e/assets-v1/13370d78-4421-406b-b3bf-d78dea5f3609/terms-hero.jpg",
  stepDownload: "/__l5e/assets-v1/768dbdec-907c-4cdc-b082-6ee77845135a/step-download.jpg",
  stepRegister: "/__l5e/assets-v1/da228cfd-f6b9-4f6d-9131-1441df46e2a5/step-register.jpg",
  stepTelegram: "/__l5e/assets-v1/42d2fa31-ff8e-4459-85d6-3112bb7e59e8/step-telegram.jpg",
  stepDeposit: "/__l5e/assets-v1/f49b113e-1d44-4d3b-a785-933c6e00ca14/step-deposit.jpg",
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