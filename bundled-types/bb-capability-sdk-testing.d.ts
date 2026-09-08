// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

import { BbCapabilityApi, CapabilitySettingValue, CapabilityAgentToolExperimentalStatusLabels, CapabilityAgentToolContext, CapabilityAgentToolResult, JsonValue, CapabilityCliContext, CapabilityCliExecutionResult, CapabilityThreadEventName, CapabilityThreadEventPayloads, CapabilityAgentConfigurationContext, CapabilitySettingDescriptors, CapabilityHttpAuthMode, CapabilityHttpHandler, CapabilityCliCommandInfo, CapabilityCliResult, CapabilityAgentConfiguration, CapabilityMentionTrigger, CapabilityMentionSearchContext, CapabilityMentionItem, CapabilityInteractionRequest } from '@get-bb/capability-sdk';

type BbSdk = BbCapabilityApi["sdk"];
/**
 * Recordable `bb.sdk` stand-in for {@link createFakeCapabilityHost}. Every call
 * through the fake is recorded (post capability-attribution defaulting, so
 * assertions see what the server would receive); calls without a stubbed
 * implementation throw with a message naming the exact path to stub.
 */
/** One recorded `bb.sdk` call. `path` is dot-joined, e.g. "threads.spawn". */
interface FakeSdkCall {
    path: string;
    args: unknown[];
}
/**
 * A stub keeps the real method's parameter types but may return anything —
 * tests usually only build the fields the capability reads, not the full wire
 * response.
 */
type LooseStub<F> = F extends (...args: infer A) => unknown ? (...args: A) => unknown : never;
/**
 * Stub implementations keyed like `BbSdk`: an object per area with a subset
 * of its methods, or a function for the root-level members (`on`).
 */
type FakeSdkOverrideTree<T> = {
    [K in keyof T]?: T[K] extends (...args: never[]) => unknown ? LooseStub<T[K]> : FakeSdkOverrideTree<T[K]>;
};
type FakeSdkOverrides = FakeSdkOverrideTree<BbSdk>;
interface FakeSdkHarness {
    /** Every `bb.sdk` call in order, including ones whose stub threw. */
    readonly calls: FakeSdkCall[];
    /** Argument lists of the calls to one dot-joined path. */
    callsTo(path: string): unknown[][];
    /** Add or replace one method's implementation after creation. */
    stub(path: string, implementation: (...args: never[]) => unknown): void;
}
declare function createFakeSdk(options: {
    capabilityId: string;
    overrides?: FakeSdkOverrides;
}): {
    sdk: BbSdk;
    harness: FakeSdkHarness;
};

/**
 * `createFakeCapabilityHost` — an in-process stand-in for the BB server's capability
 * runtime (apps/server/src/services/capabilities/capability-api.ts), for unit-testing
 * a capability's `server.ts` without a server. `bb` satisfies {@link BbCapabilityApi};
 * `harness` drives and inspects it.
 *
 * Faithful where a capability can observe it: registration name validation and
 * error messages, the kv 256KB cap, append-only database migrations, settings
 * read/update semantics (including onChange), schema-validated rpc/cli
 * invocation shapes (strict JSON boundaries, exit-code normalization), `threads.spawn`
 * attribution, atomic reload, and dispose order (services aborted, hooks LIFO,
 * database closed, stale handles throw). New tests can keep host inputs,
 * assertions, and shutdown explicit through `harness.behavior`,
 * `harness.inspection`, and `harness.lifecycle`; direct members remain aliases.
 *
 * Deliberately different from the real host:
 * - storage is process-local: kv in a Map, `storage.database()` one shared
 *   better-sqlite3 handle in a temp directory (same data across calls, like
 *   the host's shared file), secret settings alongside plain values (no files).
 * - `bb.sdk` is always bound (no listen gate) and every unstubbed method
 *   throws instead of hitting a server.
 * - http auth modes are recorded but not enforced — signature checks and
 *   token handling inside handlers still run.
 * - background services/schedules never run on timers; `harness.runService`
 *   and `harness.runSchedule` invoke them deterministically.
 */
/** Same shape (and name) the real host throws for stale API handles. */
declare class CapabilityContextStaleError extends Error {
    constructor(capabilityId: string);
}
type FakeLogLevel = "debug" | "error" | "info" | "warn";
interface FakeLogEntry {
    level: FakeLogLevel;
    message: string;
}
interface FakeHttpRouteRecord {
    method: string;
    path: string;
    auth: CapabilityHttpAuthMode;
    handler: CapabilityHttpHandler;
}
interface FakeScheduleRecord {
    name: string;
    cron: string;
    fn: () => void | Promise<void>;
}
interface FakeServiceRecord {
    name: string;
    start: (signal: AbortSignal) => void | Promise<void>;
}
interface FakeCliRecord {
    name: string;
    summary: string;
    commands: CapabilityCliCommandInfo[];
    run: (argv: string[], ctx: CapabilityCliContext) => CapabilityCliResult | Promise<CapabilityCliResult>;
}
interface FakeAgentToolRecord {
    name: string;
    description: string;
    experimentalStatusLabels: CapabilityAgentToolExperimentalStatusLabels | null;
    instructions: string | null;
    /** JSON-schema object the host would send Pi. */
    inputSchema: unknown;
    parse(input: unknown): {
        ok: true;
        value: unknown;
    } | {
        ok: false;
        error: string;
    };
    execute(params: unknown, ctx: CapabilityAgentToolContext): CapabilityAgentToolResult | Promise<CapabilityAgentToolResult>;
}
interface FakeMentionProviderRecord {
    id: string;
    label: string;
    triggers: readonly CapabilityMentionTrigger[];
    search: (ctx: CapabilityMentionSearchContext) => CapabilityMentionItem[] | Promise<CapabilityMentionItem[]>;
    resolve: (itemId: string) => {
        context: string;
    } | Promise<{
        context: string;
    }>;
}
interface FakeRealtimeSignal {
    channel: string;
    /** JSON-round-tripped, like the WS broadcast; `undefined` → `null`. */
    payload: unknown;
}
interface ExperimentalFakeHostRpcCall {
    method: string;
    input: unknown;
    hostId: string;
    signal?: AbortSignal;
}
/** Everything the capability registered, exposed raw for assertions. */
interface FakeCapabilityRegistrations {
    settingsDescriptors: CapabilitySettingDescriptors;
    httpRoutes: FakeHttpRouteRecord[];
    rpcMethods: string[];
    services: FakeServiceRecord[];
    schedules: FakeScheduleRecord[];
    cli: FakeCliRecord | null;
    agentTools: FakeAgentToolRecord[];
    /** Configuration callback from bb.agents.configure, or null when absent. */
    agentConfigurationResolver: ((context: CapabilityAgentConfigurationContext) => CapabilityAgentConfiguration) | null;
    /** Callback from contributeInstructions, or null when none registered. */
    instructionContributor: ((ctx: {
        threadId: string;
        projectId: string;
    }) => string | null) | null;
    threadEventHandlers: Record<CapabilityThreadEventName, number>;
    mentionProviders: FakeMentionProviderRecord[];
}
/** Read-only state for assertions after a capability registers or handles work. */
interface FakeCapabilityInspectionState {
    readonly capabilityId: string;
    /** Every `bb.log` line, in order. */
    readonly logEntries: FakeLogEntry[];
    /** Every `bb.realtime.publish`, payload normalized like the wire. */
    readonly realtimeSignals: FakeRealtimeSignal[];
    /** Every `bb.status.needsConfiguration` message, in order. */
    readonly needsConfigurationMessages: string[];
    /** Recorded `bb.sdk` calls + stub control. */
    readonly sdk: FakeSdkHarness;
    readonly registrations: FakeCapabilityRegistrations;
    /** Calls made through bb.hosts.experimental_client, after input validation. */
    readonly experimental_hostRpcCalls: readonly ExperimentalFakeHostRpcCall[];
    readonly pendingInteractions: readonly (CapabilityInteractionRequest & {
        id: string;
    })[];
}
/** Deterministic inputs that stand in for behavior normally driven by BB. */
interface FakeCapabilityBehaviorDrivers {
    /** Deliver an unexpected host-worker exit to every registered client. */
    experimental_emitHostWorkerExit(hostId: string): Promise<void>;
    /** Deliver a host signal through its registered payload schema. */
    experimental_emitHostSignal(hostId: string, signal: string, payload: unknown): Promise<void>;
    submitInteraction(id: string, value: JsonValue): void;
    cancelInteraction(id: string): void;
    /**
     * Apply a settings update the way the host's settings save does:
     * validate against the declared descriptors (`null` unsets), store, and
     * fire `onChange` listeners when effective values changed. Throws on
     * unknown keys or wrong value types.
     */
    setSettings(values: Record<string, CapabilitySettingValue | null>): Promise<void>;
    /**
     * Invoke a registered rpc method with host semantics: input/output schemas,
     * strict JSON result normalization, and structured failure codes. Rejects
     * with the same message/code/issues the frontend client surfaces.
     */
    callRpc(method: string, input?: unknown): Promise<unknown>;
    /**
     * Invoke the capability's CLI command with host semantics: the result's
     * exitCode must be a number, stdout/stderr default to "", and a throwing
     * run() becomes `{ exitCode: 1, stderr: "bb <name> failed: …" }`.
     */
    runCli(argv: string[], ctx?: CapabilityCliContext): Promise<CapabilityCliExecutionResult>;
    /**
     * Dispatch a request to a registered `bb.http` route (exact method+path
     * match, like the host's V1 router) through a real Hono context. Auth
     * modes are not enforced. A throwing handler yields the host's 500
     * `{ ok: false, error: "capability route failed: …" }` response.
     */
    fetchHttp(method: string, path: string, init?: RequestInit): Promise<Response>;
    /**
     * Start a registered background service once, deterministically. `done`
     * settles when `start` returns; abort `controller` to signal shutdown.
     * A thrown NeedsConfigurationError (matched by name, like the host) is
     * recorded via needsConfiguration and resolves `done`; other errors
     * reject it.
     */
    runService(name: string): {
        controller: AbortController;
        done: Promise<void>;
    };
    /** Run a registered schedule's function once (no timers, no cron sweep). */
    runSchedule(name: string): Promise<void>;
    /**
     * Deliver a thread lifecycle event to every `bb.events.on` handler. Handlers run
     * sequentially; errors are caught and logged like the host's
     * fire-and-forget dispatch, and returned for assertions.
     */
    emitThreadEvent<E extends CapabilityThreadEventName>(event: E, payload: CapabilityThreadEventPayloads[E]): Promise<{
        errors: unknown[];
    }>;
    /**
     * Call a registered agent tool the way a Pi tool call would:
     * arguments go through the tool's parse step (zod-validated for zod
     * registrations; a parse failure throws), then execute. `ctx` fields
     * default to "thread-test"/"project-test" and a fresh signal.
     */
    callAgentTool(name: string, input: unknown, ctx?: Partial<CapabilityAgentToolContext>): Promise<CapabilityAgentToolResult>;
    /** Evaluate `bb.agents.configure` with production validation/fail-closed
     * semantics. With no callback, every registered tool/declared test skill is
     * selected. Callback failures are logged and return empty selections. */
    resolveAgentConfiguration(context: CapabilityAgentConfigurationContext): Promise<{
        operations: FakeAgentToolRecord[];
        skills: string[];
        cli: boolean;
        instructions: string | null;
        instructionMode: "append" | "replace";
        includeCapabilityDisclosure?: true;
    }>;
}
/** Reload/shutdown controls, kept separate from behavior and inspection. */
interface FakeCapabilityLifecycleControls {
    /**
     * Load a replacement against the same persisted settings, kv, and database.
     * The current host remains live when the factory throws; on success its
     * services/hooks are disposed and the returned host becomes current.
     */
    reload(factory: (bb: BbCapabilityApi) => void | Promise<void>): Promise<FakeCapabilityHost>;
    /**
     * Dispose like a host reload/disable: abort services started via
     * runService, run onDispose hooks LIFO (isolated), close database handles,
     * then poison the `bb` handle (further use throws
     * CapabilityContextStaleError). Idempotent.
     */
    dispose(): Promise<void>;
}
/**
 * Complete fake-host harness. Direct members are retained for compatibility;
 * the named views make intent explicit in new tests.
 */
interface FakeCapabilityHarness extends FakeCapabilityInspectionState, FakeCapabilityBehaviorDrivers, FakeCapabilityLifecycleControls {
    readonly behavior: FakeCapabilityBehaviorDrivers;
    readonly inspection: FakeCapabilityInspectionState;
    readonly lifecycle: FakeCapabilityLifecycleControls;
}
interface CreateFakeCapabilityHostOptions {
    /** Defaults to "test-capability". */
    capabilityId?: string;
    /**
     * Value served by `bb.server.loopbackBaseUrl` (always bound here, like
     * `bb.sdk`). Defaults to "http://127.0.0.1:38886".
     */
    loopbackBaseUrl?: string;
    /**
     * Pre-seeded stored settings values (as if saved before this load) —
     * including secret ones, which the fake keeps in memory instead of
     * files. Values with the wrong type for their descriptor fall back to
     * the descriptor default on read, like the host.
     */
    settings?: Record<string, CapabilitySettingValue>;
    /** Initial `bb.sdk` stubs; extend later via `harness.sdk.stub`. */
    sdk?: FakeSdkOverrides;
    /** Static manifest skill ids available to configure() in this fake host. */
    agentSkillIds?: readonly string[];
    /** Deterministic stand-in for the targeted daemon host entry. */
    experimental_callHostRpc?: (call: ExperimentalFakeHostRpcCall) => unknown | Promise<unknown>;
}
interface FakeCapabilityHost {
    bb: BbCapabilityApi;
    harness: FakeCapabilityHarness;
}
declare function createFakeCapabilityHost(options?: CreateFakeCapabilityHostOptions): FakeCapabilityHost;

type ThreadResponse = CapabilityThreadEventPayloads["thread.created"]["thread"];
/**
 * A complete, deterministic `ThreadResponse` for thread lifecycle event
 * payloads (`harness.emitThreadEvent`). Defaults are the minimal idle
 * thread; override the fields the test cares about. If the contract grows a
 * required field, this builder fails typecheck — update the default here.
 */
declare function makeThreadResponse(overrides?: Partial<ThreadResponse>): ThreadResponse;

export { CapabilityContextStaleError, createFakeCapabilityHost, createFakeSdk, makeThreadResponse };
export type { CreateFakeCapabilityHostOptions, FakeAgentToolRecord, FakeCapabilityBehaviorDrivers, FakeCapabilityHarness, FakeCapabilityHost, FakeCapabilityInspectionState, FakeCapabilityLifecycleControls, FakeCapabilityRegistrations, FakeCliRecord, FakeHttpRouteRecord, FakeLogEntry, FakeLogLevel, FakeMentionProviderRecord, FakeRealtimeSignal, FakeScheduleRecord, FakeSdkCall, FakeSdkHarness, FakeSdkOverrides, FakeServiceRecord };
