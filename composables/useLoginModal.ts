export const useLoginModal = () => {
  const showLogin = useState<boolean>('loginModal', () => false)

  const open = () => {
    showLogin.value = true
  }

  const close = () => {
    showLogin.value = false
  }

  return { showLogin, open, close }
}
