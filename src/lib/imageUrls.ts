export const IMAGE_URLS = {
  brandLogo: "https://cdn.phototourl.com/free/2026-08-08-130795de-dd2f-484b-8c27-5bfd18f16d15.jpg",
  winwinLogo: "https://cdn.phototourl.com/free/2026-08-08-3f1601ef-fe03-4624-bca8-e150cdf1cdca.jpg",
  greenbetLogo:
    "https://cdn.phototourl.com/free/2026-08-08-3f1601ef-fe03-4624-bca8-e150cdf1cdca.jpg",
  coldbetLogo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DgkrzvuOnqvE_rkCuwQTh_cGKW1YlRfN9MANztK6tg&s=10",
  heroBg: "https://cdn.phototourl.com/free/2026-08-08-f467818f-8025-461c-8258-c0b9c24f6f79.jpg",
  plane: "https://cdn.phototourl.com/free/2026-08-08-1c110c45-e731-425e-bcaa-b8378b2e7781.png",
  skyBg: "https://cdn.phototourl.com/free/2026-08-08-873e2992-95a7-46ac-953a-8270b6d19a81.jpg",
  termsHero: "https://cdn.phototourl.com/free/2026-08-08-5f2c7f9f-6a1b-4f78-980a-3e11c9c20285.jpg",
  stepDownload:
    "https://cdn.phototourl.com/free/2026-08-08-c8988641-d35a-4049-9cc8-8d19cb1afd0c.jpg",
  stepRegister:
    "https://cdn.phototourl.com/free/2026-08-08-ea05938b-8d3f-4bf3-a989-50773b474430.jpg",
  stepTelegram:
    "https://cdn.phototourl.com/free/2026-08-08-09d3e36d-522a-4f77-9c83-9af5a6f8f2d8.jpg",
  stepDeposit:
    "https://cdn.phototourl.com/free/2026-08-08-7a9cc240-20a8-4958-8d1a-8af54cf6128a.jpg",
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
