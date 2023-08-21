export const routes = {
  todos: {
    base: '/todos',
  },
  auth: {
    login: "/api/auth/signin?callbackUrl=/protected/todos"
  }
}