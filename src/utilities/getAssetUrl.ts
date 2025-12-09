export function getAssetUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path; 
  return import.meta.env.BASE_URL + cleanPath; 
}