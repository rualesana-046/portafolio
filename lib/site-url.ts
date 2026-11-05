const LOCAL_SITE_URL = "http://localhost:3000";

export interface SiteUrlEnvironment {
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly VERCEL_PROJECT_PRODUCTION_URL?: string;
}

export function resolveSiteUrl(environment: SiteUrlEnvironment): URL {
  const explicitUrl = environment.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitUrl) {
    return new URL(explicitUrl);
  }
  const productionHost = environment.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return new URL(`https://${productionHost}`);
  }
  return new URL(LOCAL_SITE_URL);
}
