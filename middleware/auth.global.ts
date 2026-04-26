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

});
