// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

/**
 * Core `bb` CLI top-level command names (plus commander's built-in help).
 * Capability CLI commands may not shadow these. Maintained by hand and checked
 * against the real Commander program by
 * apps/cli/src/__tests__/capability-cli-proxy.test.ts.
 *
 * "automation" and "connect" are intentionally absent: builtin capabilities own
 * those top-level commands and the CLI proxies them.
 */
declare const RESERVED_BB_CLI_COMMANDS: readonly string[];

/**
 * The validator-neutral subset of Standard Schema v1 used by capability RPC.
 * Zod 4 schemas implement this interface directly; other validators can do
 * the same without becoming part of BB's public protocol.
 */
interface StandardSchemaV1<Input = unknown, Output = Input> {
    readonly "~standard": {
        readonly version: 1;
        readonly vendor: string;
        readonly validate: (value: unknown) => StandardSchemaV1Result<Output> | Promise<StandardSchemaV1Result<Output>>;
        readonly types?: {
            readonly input: Input;
            readonly output: Output;
        };
    };
}
type StandardSchemaV1Result<Output> = {
    readonly value: Output;
    readonly issues?: undefined;
} | {
    readonly issues: readonly StandardSchemaV1Issue[];
};
interface StandardSchemaV1Issue {
    readonly message: string;
    readonly path?: PropertyKey | readonly (PropertyKey | {
        readonly key: PropertyKey;
    })[];
}
interface CapabilityRpcMethodContract<InputSchema extends StandardSchemaV1 = StandardSchemaV1, OutputSchema extends StandardSchemaV1 = StandardSchemaV1> {
    readonly input: InputSchema;
    readonly output: OutputSchema;
}

/**
 * Declarative settings descriptors (`bb.settings.define`). Deliberately plain
 * data — not zod — so the host can render settings forms and the CLI can
 * parse values without executing capability code.
 */
type CapabilitySettingDescriptor = {
    type: "string";
    label: string;
    description?: string;
    /** Stored in a 0600 file under <dataDir>/capabilities/<id>/secrets/, never in the db or sent to the frontend. */
    secret?: true;
    default?: string;
} | {
    type: "boolean";
    label: string;
    description?: string;
    default?: boolean;
} | {
    type: "select";
    label: string;
    description?: string;
    options: string[];
    default?: string;
} | {
    type: "project";
    label: string;
    description?: string;
    default?: string;
};
type CapabilitySettingDescriptors = Record<string, CapabilitySettingDescriptor>;
interface CapabilityCliOutputLimitError {
    code: "capability_cli_output_too_large";
    message: string;
    maxBytes: number;
    stdoutBytes: number;
    stderrBytes: number;
    totalBytes: number;
}
/** Normalized host result returned by the capability CLI HTTP/testing boundary. */
interface CapabilityCliExecutionResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    error?: CapabilityCliOutputLimitError;
}
type CapabilityMentionTrigger = "!" | "#" | "$" | "@" | "~";

/**
 * Built-in dynamic tool names capabilities may not shadow. Maintained by hand —
 * kept in sync with the built-in tools in
 * apps/server/src/services/threads/thread-runtime-config.ts by
 * apps/server/test/services/capabilities/capability-agent-tools.test.ts.
 */
declare const RESERVED_AGENT_TOOL_NAMES: readonly string[];
/** JSON values ≤256KB; larger writes are rejected with a clear error. */
declare const KV_VALUE_MAX_BYTES: number;
declare const CAPABILITY_HTTP_METHODS: ReadonlySet<string>;
declare const RPC_METHOD_PATTERN: RegExp;
declare const BACKGROUND_NAME_PATTERN: RegExp;
declare const CLI_COMMAND_NAME_PATTERN: RegExp;
declare const AGENT_TOOL_NAME_PATTERN: RegExp;
declare const CAPABILITY_AGENT_STATIC_INSTRUCTIONS_MAX_CHARS = 4096;
/** Status labels ride on every tool-call event and share one timeline row. */
declare const CAPABILITY_AGENT_STATUS_LABEL_MAX_CHARS = 80;
declare const CAPABILITY_AGENT_SELECTION_MAX_IDS = 256;
declare const CAPABILITY_AGENT_DYNAMIC_INSTRUCTIONS_MAX_CHARS = 4096;
/** Honored `experimental_instructionMode: "replace"` only. Append stays 4096. */
declare const CAPABILITY_AGENT_REPLACE_INSTRUCTIONS_MAX_CHARS: number;
declare const CAPABILITY_AGENT_TOOL_PARAMETERS_MAX_BYTES: number;
declare const MENTION_PROVIDER_ID_PATTERN: RegExp;
declare const SETTING_KEY_PATTERN: RegExp;
/**
 * Validate freeform descriptors from capability code and merge them into the
 * capability's registered schema. Capability source is not type-safe at runtime, so
 * both the production and fake hosts must enforce this boundary identically.
 */
declare function registerSettingDescriptors(target: CapabilitySettingDescriptors, added: Record<string, unknown>): CapabilitySettingDescriptors;
/** Validate a settings update. `null` means unset. */
declare function validateSettingsUpdate(descriptors: CapabilitySettingDescriptors, values: Record<string, unknown>): string[];
declare const CAPABILITY_MENTION_TRIGGER_VALUES: readonly ["@", "#", "$", "!", "~"];
declare function isCapabilityMentionTrigger(value: unknown): value is CapabilityMentionTrigger;
declare function normalizeMentionProviderTriggers(providerId: string, triggers: unknown): readonly CapabilityMentionTrigger[];
declare function isStandardSchema(value: unknown): value is StandardSchemaV1;
declare function readRpcMethodContract(method: string, value: unknown): CapabilityRpcMethodContract;
/** Duck-typed zod detection: capability sources may carry their own zod copy,
 * so instanceof is useless — anything with safeParse is treated as zod. */
declare function isZodSchemaLike(value: unknown): boolean;
/**
 * Reject recursive local references before a tool schema reaches a provider.
 * Some providers reject the complete tool list when any one schema contains a
 * recursive `$ref`, so this is a shared production/fake-host boundary rule.
 */
declare function assertNoRecursiveJsonSchemaReferences(schema: unknown, subject: string): void;
/** Compact issue summary from a (possibly foreign-instance) zod error. */
declare function summarizeParseIssues(error: unknown): string;
declare function enforceCapabilityCliOutputLimit(result: Omit<CapabilityCliExecutionResult, "error">, jsonOutput: boolean): CapabilityCliExecutionResult;
/**
 * Adopt the value a capability HTTP route handler returned.
 *
 * Capability handlers can run in a different realm (jiti-loaded modules, bundled
 * fetch polyfills), so a valid `Response` from a handler can fail
 * `instanceof Response` in the host (#1661). Both the real host and the fake
 * host accept a structurally valid Response from any realm and re-wrap it
 * into a this-realm `Response`, so Hono always consumes a native object and a
 * malformed return still fails at the invoke boundary with a pointed error.
 *
 * The body streams through: a foreign `body` stream is piped chunk by chunk
 * with cancellation forwarded to the source, so no full-size buffer is made.
 */
declare function adoptHttpRouteResponse(value: unknown): Response;

export { AGENT_TOOL_NAME_PATTERN, BACKGROUND_NAME_PATTERN, CAPABILITY_AGENT_DYNAMIC_INSTRUCTIONS_MAX_CHARS, CAPABILITY_AGENT_REPLACE_INSTRUCTIONS_MAX_CHARS, CAPABILITY_AGENT_SELECTION_MAX_IDS, CAPABILITY_AGENT_STATIC_INSTRUCTIONS_MAX_CHARS, CAPABILITY_AGENT_STATUS_LABEL_MAX_CHARS, CAPABILITY_AGENT_TOOL_PARAMETERS_MAX_BYTES, CAPABILITY_HTTP_METHODS, CAPABILITY_MENTION_TRIGGER_VALUES, CLI_COMMAND_NAME_PATTERN, KV_VALUE_MAX_BYTES, MENTION_PROVIDER_ID_PATTERN, RESERVED_AGENT_TOOL_NAMES, RESERVED_BB_CLI_COMMANDS, RPC_METHOD_PATTERN, SETTING_KEY_PATTERN, adoptHttpRouteResponse, assertNoRecursiveJsonSchemaReferences, enforceCapabilityCliOutputLimit, isCapabilityMentionTrigger, isStandardSchema, isZodSchemaLike, normalizeMentionProviderTriggers, readRpcMethodContract, registerSettingDescriptors, summarizeParseIssues, validateSettingsUpdate };
