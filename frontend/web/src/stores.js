import create from 'zustand'


export const useAuth = create((set) => ({
    is_authenticated: 'suspense',
    setIsAuthenticated: (is_authenticated) => set(state => ({ ...state, is_authenticated })),
    userMail: '',
    setUserMail: (userMail) => set(state => ({ ...state, userMail })),
}))
