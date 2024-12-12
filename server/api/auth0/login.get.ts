import { loginRedirectUrl } from "./redirect-urls";

export default defineEventHandler(async (event) => {
  // Redirect the user to the Auth0 login URL
  await sendRedirect(event, loginRedirectUrl());
});
