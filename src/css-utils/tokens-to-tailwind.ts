import slugify from 'slugify';

interface Token {
  name: string;
  value: any;
}

/**
 * Normalizes token names for Tailwind config keys.
 *
 * @param {Token[]} tokens Array of named token values.
 * @return {Record<string, any>} Object with slugified keys and original values.
 */
const tokensToTailwind = (tokens: Token[]): Record<string, any> => {
  const nameSlug = (text: string): string => slugify(text, {lower: true});
  let response: Record<string, any> = {};

  tokens.forEach(({name, value}) => {
    response[nameSlug(name)] = value;
  });

  return response;
};

export default tokensToTailwind;
