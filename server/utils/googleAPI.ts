import {google} from "googleapis"


const config = useRuntimeConfig()


export const oAuth2Client = new google.auth.OAuth2(
    config.clientID as string,
    config.clientSecret as string,
    config.redirectURI as string,
)

oAuth2Client.setCredentials({
  refresh_token: config.refreshToken as string,
});