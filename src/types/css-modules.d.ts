/**
 * Ambient declaration for CSS Module imports.
 *
 * Without this file, `import styles from "./X.module.css"` fails to
 * type-check anywhere in the project (TS2307: "Cannot find module") —
 * confirmed by an actual `tsc --noEmit` run during the Project
 * Integration Review, which failed on every single component that
 * imports a CSS Module (i.e. all of them). Next.js's dev/build pipeline
 * handles the runtime bundling of CSS Modules regardless, but the
 * TypeScript compiler needs this declaration independently — Next.js
 * does not generate it automatically the way it does next-env.d.ts.
 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
