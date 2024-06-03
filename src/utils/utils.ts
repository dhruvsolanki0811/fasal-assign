export function appendToBaseUrl(endpoint: string): string {
  return `${process.env.NEXT_PUBLIC_APIBASEURL}/${endpoint}`;
}

export function getBaseUrl(): string {
  return `${process.env.NEXT_PUBLIC_BASEURL}`;
}
