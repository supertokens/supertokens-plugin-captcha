### FAQ
- Q: How do we make sure that a required recipe is installed (backend)?
- A: When overring a recipe, set the `recipeInitRequired` field to `true`


- Q: How do i add authorization?
- A: You can use the `getAuthorisedUserId` or `isAUthroised` utility from `./utils`


### Known Issues
- Throwing an error inside a handler will crash the server

### To Do (besides known issues)
- [ ] Standardised error handling
- [ ] Path matching in handlers. This means would allow REST style paths
- [ ] Defined a better structure and better conventions for plugins.
- [ ] Enforce guidelines

### General Guidelines
- Every plugin should have both/either folders: `backend`, `frontend`
- Backend plugins should have the mininum file strucutre:
  - `backend/lib/tsconfig.json` - TypeScript config for building the backend plugin.
  - `backend/lib/build` - will the built sources of the plugin.
  - `backend/lib/ts` - plugin source files.
  - `backend/lib/ts/config.ts` - contains various plugin configurations. At minimum it should contain and export `PLUGIN_ID` - unique identifier of the plugin.
  - `backend/lib/ts/plugin.ts` - contains and exports the `init` plugin method - It initialises the plugin and returns a config object that implements `SuperTokensPlugin` from the `supertokens-node/types` package.
  - `backedn/lib/ts/utils` - contains some commonly used methods for doing basic authorisation, loggin, etc.
  - `backend/lib/ts/index.ts` - exports the `init` method and `PLUGIN_ID`.

### Contributing
- As this will be a continuolsy evolvong repo, all changes to structure, best practices, conventions, etc SHOULD be documented
- Preferably, they should also be enforce through linters, build rules, commit hooks, etc
