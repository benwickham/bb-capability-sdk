# @get-bb/capability-sdk

The typed facade BB capability authors compile against. The root preserves the
complete `BbCapabilityApi` and `BbSdk` contract; `./app` is the frontend runtime
that `bb capability build` replaces with BB's shared implementation.

The authoritative contracts are the exported declarations in
[`src/backend-contract.ts`](src/backend-contract.ts) and
[`src/app-contract.ts`](src/app-contract.ts). Keep author-facing guidance in
the built-in `bb-capability-authoring` skill synchronized with those declarations.

## Composer customization

Composer UI extensions register through `app.composer.customize(...)`. A
`ComposerCustomization` can contribute React action and banner components,
host-rendered `ComposerPlusMenuItem` rows, and `ComposerRichTextSpec` rules.
Mounted components use `useComposer()` for writes, effects, and input locking,
and `useComposerView()` for the reactive scope, layout, draft, and run state.
Any mounted capability component can use
`useBbNavigate().openThreadPanel(...)` to request one of the
same capability's registered thread-panel actions; it returns false when the
current surface has no thread side panel.

Every panel-open entry point reports the same way: `openThreadPanel` and the
`openPanel` handed to `threadPanelAction`, `experimental_newThreadPanelAction`,
and `messageAction` `run` callbacks all return `boolean` — true when the host
accepted the open, false when it declined (non-JSON `params`, an unavailable
action id, or a surface with no side panel). A decline is a return value, never
a thrown error, so a capability registering several kinds of action can share one
open routine and branch on the result.

See the
[`composer-customization` reference capability](../../examples/capabilities/composer-customization/README.md)
for every region in one small app. The deprecated pre-1.0
`app.slots.composerAccessory(...)` footer API has been removed; migrate footer
controls to actions or the plus menu and larger content to banners.

## Trusted frontend content scripts

Use `app.contentScripts.register({ id, mount })` for ordinary
bundled TypeScript/JavaScript that enhances the bb app shell without rendering
a React slot. The host supplies `{ capabilityId, generation, signal }`, awaits
mount setup, and owns abort plus exact-once reverse-order disposal across hash
reload, disable, removal, failed replacement, and app-window teardown. The old
generation is disposed before candidate mounts, so generations never overlap.
Content scripts are trusted same-origin page code, not a sandbox.

Static styles should stay in the normal imported `app.css`; scripts may own
dynamic DOM/style nodes when their disposer removes them. See the
[`content-script` reference capability](../../examples/capabilities/content-script/README.md)
for a cleanup-safe editor enhancement.

## External capability tests

The packed package includes executable JavaScript and portable declarations
for `@get-bb/capability-sdk/testing` and `@get-bb/capability-sdk/testing/app`; neither subpath
imports BB workspace packages or source TypeScript at runtime. Install the SDK
with the test stack used by your capability (the peer dependencies are optional so
headless capabilities do not install a browser harness):

```sh
npm install --save-dev @get-bb/capability-sdk vitest better-sqlite3 zod cron-parser hono
npm install --save-dev react react-dom @testing-library/react jsdom # frontend tests
```

Backend example:

```ts
import { createFakeCapabilityHost } from "@get-bb/capability-sdk/testing";
import plugin from "./server.js";

const host = createFakeCapabilityHost({ capabilityId: "notes" });
await capability(host.bb);

await host.harness.behavior.callRpc("list", { query: "today" });
expect(host.harness.inspection.registrations.rpcMethods).toContain("list");
await host.harness.lifecycle.dispose();
```

`harness.behavior` contains deterministic host inputs (RPC/HTTP/CLI calls,
events, settings, tools, interactions, and schedules), `harness.inspection`
contains registrations and recorded state, and `harness.lifecycle` owns atomic
reload and disposal. Every pre-existing direct member remains as an alias for
source compatibility. A successful `reload(factory)` preserves settings, KV,
and database state and invalidates the old API only after the replacement
factory succeeds; a failed factory leaves the old load live.

Frontend example (`// @vitest-environment jsdom`):

```tsx
import {
  loadCapabilityApp,
  mountCapabilityContentScripts,
  renderSlot,
} from "@get-bb/capability-sdk/testing/app";

const app = await loadCapabilityApp(() => import("./app.js"));
const scripts = await mountCapabilityContentScripts(app, { capabilityId: "notes" });
const slot = renderSlot(
  app.homepageSections[0]!,
  { projectId: "proj_1" },
  {
    rpc: { list: () => [] },
    context: { projectId: "proj_1", threadId: null },
  },
);

await slot.behavior.emitRealtime("notes-changed", null);
expect(slot.inspection.rpcCalls).toHaveLength(1);
slot.lifecycle.unmount();
await scripts.lifecycle.dispose();
```

`loadCapabilityApp` installs the runtime before a thunk import and validates all
registrations. `mountCapabilityContentScripts` mirrors the host's ordered mount,
rollback, independent per-window signal, and exact-once disposal. `renderSlot` supplies
RPC, realtime, settings, navigation, context, and scoped composer behavior,
then returns Testing Library queries plus the same behavior/inspection/lifecycle
split. Use a setup-file `installTestCapabilityRuntime()` only when a static app
import is unavoidable.

## Fidelity boundaries

The backend fake matches observable schema-RPC validation/errors and strict
JSON results, additive events, keyed-registration failures, atomic reload,
settings, KV/database storage, conditional agent configuration, request input,
and disposal order. HTTP runs through Hono but does not enforce BB's local or
token authentication. Background services and schedules run only when driven;
there are no restart timers or cron sweeps. Storage is process-local in a
temporary directory, secrets are kept in memory, `bb.sdk` is always bound and
unstubbed calls throw, and cross-capability/global collision policy is outside one
fake host.

The frontend harness matches registration validation, content-script mount and
cleanup ordering, RPC/realtime JSON
boundaries, panel and slot props, navigation recording, and composer text,
scope, quote, mention, focus, and clear behavior. It does not reproduce BB
layout, CSS, persistence, routing, host authentication, crash boundaries, or
multi-capability arbitration; use a live BB test for those boundaries.

## Declaration surface

The complete root declaration flattens the unpublished BB workspace contracts.
The testing declarations reuse that public `@get-bb/capability-sdk` root instead of
embedding a second copy, and no declaration depends on unpublished `@bb/*`
packages. Genuine npm types (`hono`, `better-sqlite3`, `zod`, React, and Testing
Library) remain peer imports. Scaffolded plugins depend on this package —
`bb capability new` pins it exactly in `devDependencies` — and read the root/app
declarations straight from `node_modules/@get-bb/capability-sdk/bundled-types/`,
the same files the testing subpaths reuse. Plugins scaffolded before that
switch still vendor a copy of the root/app declarations in `types/` and map
`@get-bb/capability-sdk` onto them through their `tsconfig.json`; `bb capability
types` keeps those refreshed until they migrate.
