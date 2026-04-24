import { authClient } from "~/shared/auth-client";
import { useCheckEmail } from "~/composables/useCheckEmail";
import { useLoginModal } from "~/composables/useLoginModal";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data: session } = await authClient.useSession(useFetch);
	
	const GUARD_PATHS = ["/admin", "/nominator/myNominees", "/nominator/edit", "/profile"];
	const { open: openLoginModal } = useLoginModal();
	if (GUARD_PATHS.includes(to.path)) {
		if (!session.value?.user) {
			openLoginModal();
			return;
		}
		const { role } = await useCheckEmail(session.value.user.email);
		if (role !== 'admin' && to.path === "/admin") {
			openLoginModal();
			return;
		}
		if (role !== 'nominator' && to.path === "/nominator/myNominees") {
			openLoginModal();
			return;
		}
		if (role !== 'nominee' && to.path === "/profile") {
			openLoginModal();
			return;
		}
		if (role !== 'admin' && role !== 'nominator' && to.path === "/nominator/edit") {
			openLoginModal();
			return;
		}
	}

	// if session is not found,
	// if session is found, 
		// fetch role
		// if role is not admin and to.path is /admin, open login modal
		// if role is not nominator and to.path is /nominator/myNominees, open login modal
		// if role is not nominee and to.path is /nominee/setup-profile, open login modal
		// if role is neither admin nor nominator and to.path is /nominator/edit, open login modal


	// if (!session.value?.user?.email) {
	// 	if (to.path === "/admin" || to.path === "/nominator/myNominees" || to.path === "/nominator/edit") {
	// 		return navigateTo("/");
	// 	}
	// 	return;
	// }

	// const { role } = await useCheckEmail(session.value.user.email);

	// // guard Admin Pages if user is not an admin
	// if (to.path === "/admin" && role !== 'admin') {
	// 	return navigateTo("/");
	// }

	// // guard My Nominees Page if user is not a nominator
	// if ((to.path === "/nominator/myNominees" || to.path === "/nominator/edit") && role !== 'nominator') {
	// 	return navigateTo("/");
	// }
});
