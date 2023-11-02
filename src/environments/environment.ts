export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  // As requisições definidas no whitelistedDomains serão interceptadas e o token será adicionado. Ver seguranca.modules.
  whitelistedDomains: ['localhost:8080'],
   // As requisições definidas no blacklistedRoutes NÃO serão interceptadas e o token NÃO será adicionado. Ver seguranca.modules.
  blacklistedRoutes: ['http://localhost:8080/oauth/token'],
  ambiente: "DSV"
};
