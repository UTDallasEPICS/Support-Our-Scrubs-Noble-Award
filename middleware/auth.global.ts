import { authClient } from "~/shared/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data: session } = await authClient.useSession(useFetch);

	if (!session.value?.user?.email) {
		if (to.path === "/admin" || to.path === "/nominator/myNominees" || to.path === "/nominator/edit") {
			return navigateTo("/");
		}
		return;
	}

	const { role } : { role: 'admin' | 'nominator' | 'nominee' } = await $fetch(
		"/api/checkEmail", 
		{ method: "POST", body: { email: session.value.user.email } }
	);

	// guard Admin Pages if user is not an admin
	if (to.path === "/admin" && role !== 'admin') {
		return navigateTo("/");
	}

	// guard My Nominees Page if user is not a nominator
	if ((to.path === "/nominator/myNominees" || to.path === "/nominator/edit") && role !== 'nominator') {
		return navigateTo("/");
	}
});
