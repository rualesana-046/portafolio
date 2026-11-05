const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_ENVIRONMENT = "production";

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

export function currentSiteUrl(): URL {
  return resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  });
}

export function shouldIndex(isIndexable: boolean, deploymentEnvironment: string | undefined): boolean {
  return isIndexable && deploymentEnvironment === PRODUCTION_ENVIRONMENT;
}
