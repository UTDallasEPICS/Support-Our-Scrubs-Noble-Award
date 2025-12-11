
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/auth/callback')) return

  const user = useSupabaseUser()
  const showing = to.query.showLogin === '1'

  if (!user.value && !showing) {
    return navigateTo({
      path: to.path,
      query: { ...to.query, showLogin: '1' },
      replace: true
    })
  }
})
