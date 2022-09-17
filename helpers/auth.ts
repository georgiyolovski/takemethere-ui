import { GoogleLoginResponse } from 'react-google-login';

export const refreshGoogleTokenSetup = (
  res: GoogleLoginResponse,
  setNewTokenCallback?: (newToken: string) => void
) => {
  // Timing to renew access token
  if (res.tokenObj) {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes:', newAuthRes);

      if (setNewTokenCallback) {
        setNewTokenCallback(newAuthRes.access_token);
      }

      localStorage.setItem('authToken', newAuthRes.id_token);

      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  }
};
