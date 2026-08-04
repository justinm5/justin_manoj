const LOGO_DEV_TOKEN = "pk_fXCV10JCSr6znQsS2CaIqw";

export const logoDevUrl = (domain: string, size: number) =>
  `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=${size}&retina=true&format=png&fallback=404`;
