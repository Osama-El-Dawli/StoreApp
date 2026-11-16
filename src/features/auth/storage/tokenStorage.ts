import Keychain from 'react-native-keychain';

type Tokens = { accessToken: string; refreshToken: string };

export async function saveTokens(accessToken: string, refreshToken: string) {
  await Keychain.setGenericPassword(
    'tokens',
    JSON.stringify({ accessToken, refreshToken }),
  );
}

export async function getTokens(): Promise<Tokens | null> {
  const tokens = await Keychain.getGenericPassword();
  if (!tokens) return null;
  return JSON.parse(tokens.password) as Tokens;
}

export async function clearTokens() {
  await Keychain.resetGenericPassword();
}
