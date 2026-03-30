import { authClient } from "~/shared/auth-client";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data: session } = await authClient.useSession(useFetch); 
	if (!session.value) {
		if (to.path === "/admin") {
			return navigateTo("/");
		}
	}
});