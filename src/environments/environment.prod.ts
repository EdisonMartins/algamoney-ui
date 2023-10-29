export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',
   // RexExp → por isso estão delimitados por slash “/”
   whitelistedDomains: [ /algamoney-api.herokuapp.com/ ],
   blacklistedRoutes: [/\/oauth\/token/],

};
