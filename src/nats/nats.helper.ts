import { snakeCase } from 'lodash';

export const NATS_CRM: string = 'user';
/** @deprecated */
export const NATS_BASE_ROUTE: string = 'user';

export function natsRoute(
  parts: string | string[],
  baseName: string = NATS_CRM,
): string {
  return joinBy(
    [baseName, ...(Array.isArray(parts) ? parts : [parts])],
    '.',
    snakeCase,
  );
}

function joinBy(
  parts: string[],
  separator: string,
  iteratee?: (str: string) => string,
): string {
  if (!parts?.length) return '';

  const result = [];

  for (let part of parts) {
    if (!(part = part.trim())) continue;
    for (let str of part.split(separator)) {
      if (!(str = str.trim())) continue;
      result.push(iteratee ? iteratee(str) : str);
    }
  }

  return result.join(separator);
}
