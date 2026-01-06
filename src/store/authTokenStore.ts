let accessToken: string | null = null;

export const authTokenStore = {
  get() {
    return accessToken;
  },
  set(token: string | null) {
    accessToken = token;
  },
};
