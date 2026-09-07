// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

import * as react from 'react';
import { ComponentType, ReactNode } from 'react';
import { z } from 'zod';

/** A JSON-safe path segment reported by a Standard Schema validation issue. */
type CapabilityRpcIssuePathSegment = string | number;
/** Validator-neutral validation detail carried by an RPC error envelope. */
interface CapabilityRpcValidationIssue {
    message: string;
    path?: CapabilityRpcIssuePathSegment[];
}
/** Stable wire error categories for capability RPC. */
type CapabilityRpcErrorCode = "handler_error" | "invalid_input" | "invalid_json" | "invalid_output" | "non_json_result" | "unknown_method";
/** Structured RPC failure returned as `{ ok: false, error }`. */
interface CapabilityRpcError {
    code: CapabilityRpcErrorCode;
    message: string;
    issues?: CapabilityRpcValidationIssue[];
}
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
type StandardSchemaV1InferInput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["input"];
type StandardSchemaV1InferOutput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["output"];
interface CapabilityRpcMethodContract<InputSchema extends StandardSchemaV1 = StandardSchemaV1, OutputSchema extends StandardSchemaV1 = StandardSchemaV1> {
    readonly input: InputSchema;
    readonly output: OutputSchema;
}
type CapabilityRpcContract = Readonly<Record<string, CapabilityRpcMethodContract>>;
type CapabilityRpcHandlers<Contract extends CapabilityRpcContract> = {
    [Method in keyof Contract]: (input: StandardSchemaV1InferOutput<Contract[Method]["input"]>) => StandardSchemaV1InferInput<Contract[Method]["output"]> | Promise<StandardSchemaV1InferInput<Contract[Method]["output"]>>;
};
type CapabilityRpcCallInput<Method extends CapabilityRpcMethodContract> = StandardSchemaV1InferInput<Method["input"]>;
type CapabilityRpcCallArgs<Method extends CapabilityRpcMethodContract> = null extends CapabilityRpcCallInput<Method> ? [input?: CapabilityRpcCallInput<Method>] : [input: CapabilityRpcCallInput<Method>];
type CapabilityRpcResult<Method extends CapabilityRpcMethodContract> = StandardSchemaV1InferOutput<Method["output"]>;

declare const reasoningLevelSchema: z.ZodEnum<{
    high: "high";
    low: "low";
    max: "max";
    medium: "medium";
    none: "none";
    ultra: "ultra";
    ultracode: "ultracode";
    xhigh: "xhigh";
}>;
type ReasoningLevel = z.infer<typeof reasoningLevelSchema>;
declare const promptInputSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    mentions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        end: z.ZodNumber;
        resource: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"thread">;
            label: z.ZodString;
            projectId: z.ZodOptional<z.ZodString>;
            threadId: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"project">;
            label: z.ZodString;
            projectId: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"section">;
            label: z.ZodString;
            sectionId: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            entryKind: z.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            kind: z.ZodLiteral<"path">;
            label: z.ZodString;
            path: z.ZodString;
            source: z.ZodEnum<{
                "thread-storage": "thread-storage";
                workspace: "workspace";
            }>;
        }, z.core.$strip>, z.ZodObject<{
            argumentHint: z.ZodNullable<z.ZodString>;
            kind: z.ZodLiteral<"command">;
            label: z.ZodString;
            name: z.ZodString;
            origin: z.ZodEnum<{
                builtin: "builtin";
                project: "project";
                user: "user";
            }>;
            source: z.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
            trigger: z.ZodEnum<{
                "/": "/";
            }>;
        }, z.core.$strip>, z.ZodObject<{
            capabilityId: z.ZodString;
            icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            itemId: z.ZodString;
            kind: z.ZodLiteral<"capability">;
            label: z.ZodString;
        }, z.core.$strip>], "kind">>;
        start: z.ZodNumber;
    }, z.core.$strip>>>;
    text: z.ZodString;
    type: z.ZodLiteral<"text">;
    visibility: z.ZodOptional<z.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"image">;
    url: z.ZodString;
    visibility: z.ZodOptional<z.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z.core.$strip>, z.ZodObject<{
    path: z.ZodString;
    type: z.ZodLiteral<"localImage">;
    visibility: z.ZodOptional<z.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z.core.$strip>, z.ZodObject<{
    mimeType: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    sizeBytes: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"localFile">;
    visibility: z.ZodOptional<z.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z.core.$strip>], "type">;
type PromptInput = z.infer<typeof promptInputSchema>;

declare const createThreadEnvironmentArgsSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    environmentId: z.ZodString;
    type: z.ZodLiteral<"reuse">;
}, z.core.$strip>, z.ZodObject<{
    hostId: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<"host">;
    workspace: z.ZodDiscriminatedUnion<[z.ZodObject<{
        branch: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"existing">;
            name: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            baseBranch: z.ZodString;
            kind: z.ZodLiteral<"new">;
        }, z.core.$strict>], "kind">>;
        path: z.ZodNullable<z.ZodString>;
        type: z.ZodLiteral<"unmanaged">;
    }, z.core.$strip>, z.ZodObject<{
        baseBranch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"named">;
            name: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"default">;
        }, z.core.$strip>], "kind">;
        type: z.ZodLiteral<"managed-worktree">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"personal">;
    }, z.core.$strip>], "type">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"project-default">;
}, z.core.$strip>], "type">;
type CreateThreadEnvironmentArgs = z.infer<typeof createThreadEnvironmentArgsSchema>;

declare const createExecutionInputSourcesSchema: z.ZodObject<{
    model: z.ZodOptional<z.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    reasoningLevel: z.ZodOptional<z.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
}, z.core.$strict>;
type CreateExecutionInputSources = z.infer<typeof createExecutionInputSourcesSchema>;

/**
 * A value that survives a JSON round trip without coercion or data loss.
 *
 * Host boundaries still validate values at runtime because TypeScript cannot
 * exclude non-finite numbers and capability bundles can bypass static types.
 */
type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};

/**
 * The `@get-bb/capability-sdk/app` contract (plugin design §5.2) — pure types with no
 * side effects. The BB app imports these to keep its real implementation in
 * sync (`satisfies CapabilitySdkApp`). Plugin authors import the same shapes through
 * `@get-bb/capability-sdk/app`.
 *
 * Per-slot props are versioned contracts: additive-only within an SDK major.
 */
/** Props passed to a `homepageSection` component. */
interface CapabilityHomepageSectionProps {
    /** Project in view on the compose surface; null when none is selected. */
    projectId: string | null;
}
/**
 * Props passed to a `settingsSection` component.
 *
 * Deliberately empty in V1; versioned additive like the other slot props.
 */
interface CapabilitySettingsSectionProps {
}
/** Props passed to a `navPanel` component (it owns its whole route). */
interface CapabilityNavPanelProps {
    /**
     * The route remainder after the panel root, "" at the root. The panel's
     * route is `/capabilities/<capabilityId>/<path>/*`, so a deep link like
     * `/capabilities/notes/notes/work/ideas.md` renders the panel with
     * `subPath: "work/ideas.md"`. Navigate within the panel via
     * `useBbNavigate().toCapabilityPanel(path, { subPath })` — browser
     * back/forward then walks panel-internal history.
     */
    subPath: string;
}
/**
 * Props passed to a panel tab opened by a `threadPanelAction`.
 *
 * This slot is rendered only for an existing thread. Use
 * `experimental_newThreadPanelAction` for the root New thread screen.
 */
interface CapabilityThreadPanelProps {
    threadId: string;
    /**
     * The JSON value the action's `openPanel` call passed (round-tripped
     * through persistence, so the tab restores across reloads); null when the
     * action opened the panel without params.
     */
    params: JsonValue | null;
}
/** Props passed to a panel tab opened by `experimental_newThreadPanelAction`. */
interface CapabilityNewThreadPanelProps {
    /** Project selected in the root composer; null in projectless compose. */
    projectId: string | null;
    /**
     * The JSON value the action's `openPanel` call passed (round-tripped
     * through persistence, so the tab restores across reloads); null when the
     * action opened the panel without params.
     */
    params: JsonValue | null;
}
interface CapabilityPendingInteractionView {
    id: string;
    threadId: string;
    title: string;
    payload: JsonValue;
    createdAt: number;
    expiresAt: number | null;
}
interface CapabilityPendingInteractionProps {
    interaction: CapabilityPendingInteractionView;
    submit(value: JsonValue): Promise<void>;
    cancel(): Promise<void>;
}
/**
 * Props for a `sidebarFooterAction` — host-rendered (no capability component).
 * Deliberately empty; the registration's `run` carries the behavior.
 */
interface CapabilitySidebarFooterActionProps {
}
/**
 * Props passed to an `experimental_threadList` component — the sidebar's
 * scrolling thread area, replaced wholesale by one capability.
 */
interface CapabilityThreadListProps {
    /** The thread the route currently shows; null on non-thread routes. */
    activeThreadId: string | null;
    /** The project the route currently shows; null when none is selected. */
    activeProjectId: string | null;
    /** True on phone-width viewports and coarse pointers. */
    isCompactViewport: boolean;
    /**
     * Call after the user opens a thread. It closes the mobile sidebar drawer,
     * and it clears the host search field on every viewport. Always call it, or
     * the sidebar stays in search mode after the thread opens.
     */
    onNavigate: () => void;
    /**
     * The host search field's current text, or "" when the field is closed.
     * The host owns that field, so a capability list filters by this rather than
     * shipping a second search box.
     */
    searchQuery: string;
    /**
     * BB's thread list, bound to this sidebar instance. Render it to delegate
     * conditionally without re-entering capability replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    experimental_Original: ComponentType;
}
/**
 * Props passed to an `experimental_threadHeaderAction` component, rendered in
 * the thread header's action row.
 */
interface CapabilityThreadHeaderActionProps {
    /**
     * The thread this header belongs to. Never null: the slot is not rendered
     * on the compose screen or other non-thread routes. A split layout renders
     * one header per pane, so the component mounts once per visible thread,
     * each with its own id — keep per-thread state in the component, never in a
     * module-level singleton.
     */
    threadId: string;
    projectId: string;
    /**
     * True on phone-width viewports and coarse pointers. Collapse to an
     * icon-sized control when it is true — the row is short.
     */
    isCompactViewport: boolean;
}
/**
 * Where a file being opened by a `fileOpener` lives. `path` semantics follow
 * the source: workspace paths are relative to the environment's worktree,
 * thread-storage paths are relative to the thread's storage root, host paths
 * are absolute on the thread's host.
 */
interface CapabilityFileOpenerSource {
    kind: "host" | "thread-storage" | "workspace";
    threadId: string | null;
    environmentId: string | null;
    projectId: string | null;
}
/** Props passed to a `fileOpener` component (rendered as a panel file tab). */
interface CapabilityFileOpenerProps {
    path: string;
    source: CapabilityFileOpenerSource;
    /**
     * BB's file preview, bound to this file. Render it to delegate conditionally
     * without re-entering capability replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    experimental_Original: ComponentType;
}
/** How a code line longer than the viewport is presented. */
type CodeOverflowMode = "scroll" | "wrap";
/** How a diff presents its two sides. */
type DiffViewMode = "split" | "unified";
/** A 1-based, inclusive line range. */
interface SourceCodeLineRange {
    start: number;
    end: number;
}
/**
 * Props of the host-owned `experimental_SourceCode` component — BB's source
 * viewer. The host owns syntax highlighting, gutters, wrapping, line-selection
 * presentation, and the live BB code theme; the caller owns loading the text
 * and any surrounding chrome.
 */
interface SourceCodeProps {
    /** The complete source text to render. */
    content: string;
    /** File path or name. Drives language detection and the a11y label. */
    path: string;
    /** Long-line presentation. Defaults to `"scroll"`. */
    overflow?: CodeOverflowMode;
    /**
     * Lines to highlight and scroll into view (1-based, inclusive). Defaults to
     * `null` — nothing highlighted.
     */
    highlightedLines?: SourceCodeLineRange | null;
    /** Applied to the renderer's root element. */
    className?: string;
}
/**
 * Props of the host-owned `experimental_Diff` component — BB's diff viewer.
 * The host owns patch normalization (a patch without a `diff --git` header is
 * completed from `path`), syntax highlighting, unified/split presentation,
 * gutters, line-selection presentation, and the live BB code theme. Content
 * that cannot be parsed as a patch degrades to plain monospace text.
 */
interface DiffProps {
    /** Unified patch text for exactly ONE file. */
    patch: string;
    /**
     * The file the patch applies to. Used to complete a patch that arrives
     * without a `diff --git` header (GitHub's REST patches, single `@@` hunks)
     * and for language detection.
     */
    path: string;
    /** Side-by-side or inline. Defaults to `"unified"`. */
    view?: DiffViewMode;
    /** Long-line presentation. Defaults to `"scroll"`. */
    overflow?: CodeOverflowMode;
    /** Whether the gutter shows line numbers. Defaults to `true`. */
    showLineNumbers?: boolean;
    /** Applied to the renderer's root element. */
    className?: string;
}
/**
 * Props passed to an `experimental_sourceCodeRenderer` component. Every value
 * is already resolved — the replacement never re-applies a host default.
 */
interface CapabilitySourceCodeRendererProps {
    content: string;
    path: string;
    overflow: CodeOverflowMode;
    highlightedLines: SourceCodeLineRange | null;
    /**
     * BB's source renderer, bound to this request. Render it to delegate
     * conditionally without re-entering capability replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    experimental_Original: ComponentType;
}
/**
 * Props passed to an `experimental_diffRenderer` component. `patch` is always
 * a complete single-file unified patch, whatever shape the caller supplied.
 */
interface CapabilityDiffRendererProps {
    patch: string;
    path: string;
    view: DiffViewMode;
    overflow: CodeOverflowMode;
    showLineNumbers: boolean;
    /**
     * BB's diff renderer, bound to this request. Render it to delegate
     * conditionally without re-entering capability replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    experimental_Original: ComponentType;
}
/**
 * Message context passed to a `messageDirective` component — the assistant
 * (or nested agent) message that contained the directive.
 */
interface CapabilityMessageDirectiveMessage {
    id: string;
    threadId: string;
    turnId: string | null;
    projectId: string | null;
}
/**
 * Open a worktree-relative file in the host's workspace file viewer. Returns
 * true when the host accepted the path; false when the path is invalid or the
 * viewer declined it.
 */
type CapabilityMessageDirectiveOpenWorkspaceFile = (path: string) => boolean;
/**
 * Props passed to a `messageDirective` component. Attributes are untrusted
 * strings parsed from the directive; the capability validates its own fields.
 */
interface CapabilityMessageDirectiveProps {
    /** Parsed, untrusted directive attributes (e.g. `{ file: "demo.html" }`). */
    attributes: Readonly<Record<string, string>>;
    /** Original directive source text (useful for diagnostics / crash fallback). */
    source: string;
    message: CapabilityMessageDirectiveMessage;
    /**
     * Opens a worktree-relative file in the host's workspace file viewer. Null
     * when the message surface has no workspace viewer available.
     */
    openWorkspaceFile: CapabilityMessageDirectiveOpenWorkspaceFile | null;
    /**
     * How the host placed this directive in the message. `block` is a leaf on
     * its own line; `inline` shares a sentence with surrounding prose. The host
     * always sets this; plugins should render a compact phrasing chip for
     * `inline` so the sentence does not split across lines.
     */
    experimental_layout: "block" | "inline";
}
interface CapabilityHomepageSectionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    title: string;
    component: ComponentType<CapabilityHomepageSectionProps>;
}
interface CapabilitySettingsSectionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Optional host-rendered section heading. */
    title?: string;
    /**
     * Optional one-line host-rendered subheading under `title`, in the built-in
     * SettingsSection idiom (ignored when `title` is absent).
     */
    description?: string;
    component: ComponentType<CapabilitySettingsSectionProps>;
}
interface CapabilityNavPanelRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    title: string;
    /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
    icon: string;
    /** URL segment under `/capabilities/<capabilityId>/`; letters, digits, `-`, `_`. */
    path: string;
    component: ComponentType<CapabilityNavPanelProps>;
    /**
     * Ordered, non-closable tabs shown in this page's host-owned right panel.
     * BB owns selection and persistence and always includes its native Browser
     * and Terminal tools beside them. Components mount only while their tab is
     * active and the panel is open, and receive the same `subPath` as the page
     * component.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_fixedTabs?: readonly {
        /** Unique within this nav panel; letters, digits, `-`, `_`. */
        id: string;
        title: string;
        /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
        icon: string;
        component: ComponentType<CapabilityNavPanelProps>;
        /** `flush` lets the component own padding and scrolling. */
        layout?: "flush" | "padded";
    }[];
    /**
     * Optional presentational component rendered at the trailing edge of this
     * panel's sidebar row. It receives no props so it can own a narrow live
     * value through the ordinary SDK hooks without coupling that state to the
     * host sidebar. The host does not mount it on compact viewports and clips it
     * to a small, single-line box on wider viewports. It shares the trailing
     * action column, fading out for the host's options button on hover or focus;
     * do not render controls or rely on unbounded content here.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_sidebarAccessory?: ComponentType;
    /**
     * Optional component rendered on the right side of the shared title bar
     * (e.g. a sync button or a count). Contained separately from the body: a
     * throwing headerContent is hidden without breaking the title bar.
     */
    headerContent?: ComponentType<CapabilityNavPanelProps>;
}
/**
 * What a capability action passes when it asks the host to open one of its panel
 * tabs. Shared by every `openPanel` entry point so a capability registering more
 * than one kind of action can write a single open routine;
 * `CapabilityTargetedPanelActionOpenOptions` adds the `actionId` a caller
 * outside a panel action must pass to name the panel it wants.
 */
interface CapabilityPanelActionOpenOptions {
    /** Tab label. Default: the action's `title`. */
    title?: string;
    /**
     * Persisted with the tab and handed to the component as its `params` prop.
     * Must be a JSON value; anything else is a declined open.
     */
    params?: JsonValue;
}
/**
 * Context handed to a `threadPanelAction`'s `run`.
 *
 * The action is thread-only and is never offered on the root New thread
 * screen, so `threadId` is always present.
 */
interface CapabilityThreadPanelActionContext {
    /** The thread whose panel launcher invoked the action. */
    threadId: string;
    /**
     * Open a tab in the thread's side panel rendering this action's
     * `component`. `title` labels the tab (default: the action's `title`);
     * `params` must be JSON-serializable — it is persisted with the tab and
     * reaches the component as its `params` prop. Opening with params
     * identical to an already-open tab of this action focuses that tab
     * (updating its title) instead of duplicating it. May be called more than
     * once (different params ⇒ multiple tabs) or not at all.
     *
     * Returns true when the host accepted the open; false when it declined —
     * from this launcher, only a `params` that is not a JSON value. The true /
     * false contract is shared with `messageAction`'s `openPanel` and
     * `useBbNavigate().openThreadPanel` (which decline for more reasons) so one
     * open routine can serve every action kind. A decline is never thrown: the
     * host logs it and reports it here.
     */
    openPanel(options?: CapabilityPanelActionOpenOptions): boolean;
}
interface CapabilityThreadPanelActionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label of the action row in the panel's new-tab launcher. */
    title: string;
    /**
     * Icon hint (BB icon name) used when the capability ships no logo; the
     * launcher row and opened tabs prefer the capability's logo.
     */
    icon?: string;
    /** Rendered inside every panel tab this action opens. */
    component: ComponentType<CapabilityThreadPanelProps>;
    /**
     * How the host frames the tab content. "padded" (default) wraps the
     * component in the panel's scroll container with standard padding —
     * right for document-like content. "flush" gives the component the full
     * tab area (no padding, definite height, no host scrolling) — right for
     * app-like content that manages its own layout, such as
     * `ThreadChat`.
     */
    layout?: "flush" | "padded";
    /**
     * Runs when the user activates the action: call your RPC methods, show a
     * toast, and/or open panel tabs via `context.openPanel`. Omitted =
     * immediately open a panel tab with defaults. Errors (sync or async) are
     * contained and logged; they never break the launcher.
     */
    run?(context: CapabilityThreadPanelActionContext): void | Promise<void>;
}
/** Context handed to an `experimental_newThreadPanelAction`'s `run`. */
interface CapabilityNewThreadPanelActionContext {
    /** Project selected in the root composer; null in projectless compose. */
    projectId: string | null;
    /**
     * Open a tab in the root New thread screen's side panel rendering this
     * action's `component`. The title, params, deduplication, return value, and
     * error semantics match `threadPanelAction`.
     */
    openPanel(options?: CapabilityPanelActionOpenOptions): boolean;
}
/** Registration for the root New thread screen's panel Actions list. */
interface CapabilityNewThreadPanelActionRegistration {
    /** Unique within this slot for the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label of the action row in the panel's new-tab launcher. */
    title: string;
    /** Icon hint (BB icon name) used when the capability ships no logo. */
    icon?: string;
    /** Rendered inside every panel tab this action opens. */
    component: ComponentType<CapabilityNewThreadPanelProps>;
    /** Host framing; matches `threadPanelAction`. */
    layout?: "flush" | "padded";
    /**
     * Runs when the user activates the action. Omitted = immediately open a
     * panel tab with defaults. Errors are contained and logged.
     */
    run?(context: CapabilityNewThreadPanelActionContext): void | Promise<void>;
}
interface CapabilityPendingInteractionRegistration {
    /** Matches `rendererId` passed to `bb.ui.requestInput`. */
    id: string;
    component: ComponentType<CapabilityPendingInteractionProps>;
}
/** Context handed to a `sidebarFooterAction`'s `run`. */
interface CapabilitySidebarFooterActionContext {
    /**
     * Navigate to this capability's detail page in Tools, where declarative settings
     * and `settingsSection` slots render.
     */
    openSettings(): void;
}
/**
 * An icon button in the app sidebar footer (next to Settings / bug report).
 * Host-rendered for consistent chrome — capabilities supply icon, label, and
 * `run` behavior only.
 */
interface CapabilitySidebarFooterActionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip and accessible label for the icon button. */
    title: string;
    /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
    icon: string;
    /**
     * Runs when the user activates the action (e.g. call `openSettings()`,
     * open a panel via other surfaces, toast). Errors (sync or async) are
     * contained and logged; they never break the sidebar.
     */
    run(context: CapabilitySidebarFooterActionContext): void | Promise<void>;
}
/**
 * The one status bb would paint for a thread, already resolved through the
 * host's precedence (attention before work; plan and goal before the generic
 * spinner). Draw your own glyph for it — the SDK ships no status component.
 *
 * Treat an unrecognized value as "none": bb adds kinds over time, and an
 * older capability must degrade to drawing nothing rather than throwing.
 *
 * "draft" and "working-draft" are never reported here: an unsubmitted composer
 * draft is per-client state the host reads per row, which an array-wide view
 * cannot. A thread holding a draft reports whatever it would report without
 * one.
 */
type CapabilitySidebarThreadIndicator = "background-agent" | "background-command" | "draft" | "goal" | "none" | "plan-mode" | "runtime" | "unread-error" | "unread-success" | "waiting-for-input" | "workflow" | "working-draft";
/**
 * How a thread's environment presents its workspace: a worktree bb manages,
 * a worktree the user manages, or anything else (a plain checkout).
 */
type CapabilitySidebarWorkspaceKind = "managed-worktree" | "other" | "unmanaged-worktree";
/** Live work counts on a thread. All zero means nothing is running. */
interface CapabilitySidebarThreadActivity {
    workflows: number;
    backgroundAgents: number;
    backgroundCommands: number;
    planMode: number;
    goals: number;
}
/**
 * One thread in the sidebar's live view.
 *
 * A deliberate copy of the fields a sidebar needs — not a re-export of the
 * host's internal thread row type, which changes whenever the app needs a
 * field. Timestamps are epoch milliseconds.
 */
interface CapabilitySidebarThread {
    id: string;
    projectId: string;
    /** Null while a thread is still unnamed; pair with `titleFallback`. */
    title: string | null;
    titleFallback: string | null;
    /** The thread this one was forked from or spawned under; null at the root. */
    parentThreadId: string | null;
    sectionId: string | null;
    /** How this thread came to exist under its parent; null for root threads. */
    originKind: "fork" | null;
    /** The capability that spawned it, or null for non-capability origins. */
    originCapabilityId: string | null;
    /** The agent is blocked on the user: an approval or a question. */
    hasPendingInteraction: boolean;
    activity: CapabilitySidebarThreadActivity;
    indicator: CapabilitySidebarThreadIndicator;
    /**
     * The host's accessible label for `indicator`, e.g. "Thread needs user
     * input"; null when the indicator is "none". Use it for `aria-label` so
     * screen-reader text stays consistent across sidebars.
     */
    indicatorLabel: string | null;
    isUnread: boolean;
    isPinned: boolean;
    isArchived: boolean;
    environment: {
        id: string | null;
        name: string | null;
        branchName: string | null;
        workspaceDisplayKind: CapabilitySidebarWorkspaceKind;
    } | null;
    /**
     * The machine this thread's work runs on, with the name resolved for you.
     * Null when the thread has no environment yet, or when its host is not in
     * the known-hosts list. Useful where a thread has no branch to show — a
     * personal-project thread has a machine but no worktree.
     */
    host: {
        id: string;
        name: string;
    } | null;
    createdAt: number;
    updatedAt: number;
    lastReadAt: number | null;
    latestAttentionAt: number;
}
/**
 * The pull request for a thread's branch, narrowed to what a sidebar row
 * needs. `attention` is bb's rolled-up "does this need you" signal, so a row
 * can colour a badge without reading checks, review, and mergeability itself.
 */
interface CapabilitySidebarPullRequest {
    number: number;
    title: string;
    url: string;
    state: "closed" | "draft" | "merged" | "open";
    attention: "blocked" | "changes_requested" | "checks_failed" | "checks_pending" | "closed" | "conflicts" | "draft" | "merged" | "none" | "ready_to_merge" | "review_requested";
}
interface CapabilitySidebarThreadPullRequestState {
    /** True while the first lookup for this thread's environment is in flight. */
    isLoading: boolean;
    /**
     * The pull request, or null when the branch has none, the thread has no
     * environment, or the lookup could not run (a git-host hiccup). A row should
     * treat null as "nothing to show", never as an error.
     */
    pullRequest: CapabilitySidebarPullRequest | null;
}
/** One project in the sidebar's live view. */
interface CapabilitySidebarProject {
    id: string;
    name: string;
    /** True for the implicit personal project. */
    isPersonal: boolean;
}
interface CapabilitySidebarThreadsState {
    status: "error" | "loading" | "ready";
    threads: readonly CapabilitySidebarThread[];
    projects: readonly CapabilitySidebarProject[];
}
/**
 * Act on threads from a capability surface. Every method routes to the host's own
 * flow, so optimistic updates, toasts, dialogs, pane closing, and route repair
 * behave exactly as they do in the built-in sidebar. Unknown thread ids are
 * ignored by `open` and rejected by the rest.
 */
interface CapabilitySidebarThreadActions {
    /**
     * Navigate to a thread. `split: true` applies bb's split placement rules —
     * a right split by default, focus when the thread is already open, replace
     * at the pane cap — and falls back to plain navigation where splits are off.
     */
    open(threadId: string, options?: {
        split?: boolean;
    }): void;
    /**
     * Go to the new-thread screen. Passing `projectId` also makes that project
     * the composer's selection, so the thread is created where you asked.
     */
    openNewThread(options?: {
        projectId?: string;
        focusPrompt?: boolean;
    }): void;
    setPinned(threadId: string, pinned: boolean): Promise<void>;
    setRead(threadId: string, read: boolean): Promise<void>;
    /** Silent rename — no dialog. For inline editing in your own row. */
    rename(threadId: string, title: string): Promise<void>;
    /** Archives the thread AND its children, closing any panes showing them. */
    archive(threadId: string): void;
    /**
     * Opens bb's delete confirmation, which counts child threads first. Deletion
     * is destructive and recursive, so the host owns the confirmation: there is
     * deliberately no silent `delete`.
     */
    requestDelete(threadId: string): void;
}
/**
 * Render a capability component in the thread header's action row.
 *
 * The frontend sibling of the backend `bb.ui.registerThreadAction`, which
 * renders a host-owned button and runs server-side. Use that one for "do a
 * thing"; use this one when the control must draw live state.
 *
 * The host places it at the left end of the action row, before the workspace
 * button, git actions, the panel toggle, maximize, and close. That row is a
 * 48px chrome row with 28px controls: render one inline control that fits, and
 * put anything taller in a portalled popover.
 */
interface CapabilityThreadHeaderActionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /**
     * Names the region the host wraps around your component (a labelled group).
     * It does NOT label your control: an icon-only button still needs its own
     * accessible name.
     */
    title: string;
    component: ComponentType<CapabilityThreadHeaderActionProps>;
}
/** One pane's place in the split layout, as fractions of the split area. */
interface CapabilitySidebarSplitPane {
    paneId: string;
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** This pane holds the thread the row represents. */
    isMe: boolean;
    isFocused: boolean;
}
/**
 * Drag-to-split support for one row, plus where that thread currently sits in
 * the split layout.
 */
interface CapabilitySidebarThreadSplit {
    /**
     * Spread onto the row's interactive element. Carries the pointer handler
     * that starts a split drag; empty when splits are unavailable, so spreading
     * it is always safe.
     *
     * The host owns every rule: the gesture engages only once the pointer leaves
     * the sidebar toward the main area (so a list with its own drag-to-reorder
     * keeps working), an edge drop splits, a center drop replaces, an
     * already-open thread focuses its pane, and the pane cap coerces a split
     * into a replace.
     */
    splitProps: {
        onPointerDown?: (event: react.PointerEvent<HTMLElement>) => void;
    };
    /**
     * False on compact viewports, when the user disabled splits, and for an
     * unknown thread id. Gate any "open in split" affordance you draw on it.
     */
    isAvailable: boolean;
    /**
     * Where this thread sits in the split layout, or null when it is not open in
     * one (including single-pane layouts). Draw a mini-map, a tint, or nothing.
     */
    layout: {
        panes: readonly CapabilitySidebarSplitPane[];
    } | null;
}
/**
 * Replace the sidebar's thread list with a capability component.
 *
 * Unlike every other slot, this one is EXCLUSIVE: two lists cannot share one
 * scroll area. Registering activates the replacement while the capability is
 * enabled. If multiple capabilities register one, the first in deterministic slot
 * order is active by default; removing it reveals the next. The user can pin
 * BB's list or a specific renderer under Settings → Appearance. A capability can
 * also use its own setting and render `experimental_Original` conditionally.
 * An absent or crashing replacement falls back to BB's list rather than
 * leaving the user with no sidebar.
 *
 * The capability gets the scrolling list and nothing else. The New-thread button,
 * the search field, the capability nav rows, and the footer stay host-rendered in
 * every sidebar — they are shared surfaces (other capabilities live in two of
 * them), and a replaced list must not be able to remove them.
 */
interface CapabilityThreadListRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in Settings → Appearance and capability details. */
    title: string;
    /** Optional one-line description shown with the model choice. */
    description?: string;
    component: ComponentType<CapabilityThreadListProps>;
}
/**
 * Register this capability as a viewer/editor for file extensions. By default,
 * matching files render the first applicable opener in deterministic slot
 * order. The user can pin BB's preview or a specific opener per extension
 * under Settings → Files. The file tab's "Open with" menu can override that
 * choice for one open. A capability can also use its own setting and render
 * `experimental_Original` conditionally. Applies to working-tree, host, and
 * thread-storage files — never to git-ref snapshots (diff views always use
 * BB's preview).
 */
interface CapabilityFileOpenerRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label in the "Open with" menu (e.g. "Notes editor"). */
    title: string;
    /** Lowercase extensions without the dot (e.g. ["md", "mdx"]). */
    extensions: readonly string[];
    component: ComponentType<CapabilityFileOpenerProps>;
}
/**
 * Replace BB's source-code renderer everywhere it renders supplied source
 * text — the native file preview and every capability that calls
 * `experimental_SourceCode`. Like `experimental_threadList` this slot is
 * **exclusive**: one renderer at a time. Registering activates it while the
 * capability is enabled; if several are registered the first in deterministic slot
 * order wins. A missing, disabled, or crashing replacement falls back to BB's
 * renderer, and a replacement can render `experimental_Original` to delegate
 * per call (behind its own setting, by language, by size — whatever it needs).
 */
interface CapabilitySourceCodeRendererRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in capability details. */
    title: string;
    /** Optional one-line description shown with the model choice. */
    description?: string;
    component: ComponentType<CapabilitySourceCodeRendererProps>;
}
/**
 * Replace BB's diff renderer everywhere it renders supplied diff content — the
 * timeline file diffs, the environment diff panel's text bodies, and every
 * capability that calls `experimental_Diff`. Exclusive, with the same activation,
 * fallback, and `experimental_Original` delegation rules as
 * {@link CapabilitySourceCodeRendererRegistration}.
 */
interface CapabilityDiffRendererRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in capability details. */
    title: string;
    /** Optional one-line description shown with the model choice. */
    description?: string;
    component: ComponentType<CapabilityDiffRendererProps>;
}
/**
 * Register a leaf message directive rendered inside assistant (and nested
 * agent) message Markdown. `id` is the directive name: `inline-vis` matches
 * `::inline-vis{file="demo.html"}`.
 */
interface CapabilityMessageDirectiveRegistration {
    /**
     * The directive name. Lowercase kebab-case beginning with a letter.
     */
    id: string;
    component: ComponentType<CapabilityMessageDirectiveProps>;
}
/**
 * A narrow, stable reference to one rendered chat message — NOT an internal
 * timeline row. `sourceSeqEnd` is the last source event sequence the message
 * covers, the anchor the server accepts for agent-history forks.
 */
interface ThreadChatMessageReference {
    id: string;
    threadId: string;
    role: "assistant" | "user";
    /** Visible text of the message. */
    text: string;
    sourceSeqEnd: number;
}
/**
 * What a caller that is *not* itself a panel action passes to open one — a
 * `messageAction`'s `run`, or any component via `useBbNavigate()`. A panel
 * action opening its own tab is already the target, so it passes the bare
 * {@link CapabilityPanelActionOpenOptions} instead.
 */
interface CapabilityTargetedPanelActionOpenOptions extends CapabilityPanelActionOpenOptions {
    /** A `threadPanelAction` id registered by this same capability. */
    actionId: string;
}
/** Context handed to a `messageAction`'s `run`. */
interface CapabilityMessageActionContext {
    /** The thread whose timeline surfaced the action. */
    threadId: string;
    message: ThreadChatMessageReference;
    /**
     * Present only when the action was invoked from the text-selection menu;
     * the exact text the user highlighted inside `message`.
     */
    selectedText?: string;
    /**
     * Open one of this capability's `threadPanelAction` components in the current
     * thread's side panel — the registration-callback equivalent of
     * `useBbNavigate().openThreadPanel`.
     *
     * Returns true when the host accepted the open; false when it declined —
     * `params` was not a JSON value, the action id names no `threadPanelAction`
     * of this plugin, or the surface has no side panel (thread views and plugin
     * nav pages do; a `ThreadChat` embedded in a plugin panel does not). A decline
     * is never thrown: the host logs it and reports it here.
     */
    openPanel(options: CapabilityTargetedPanelActionOpenOptions): boolean;
}
/**
 * An action on chat messages: an icon button in the per-message action bar
 * (user and assistant messages) and an entry in the assistant-message
 * text-selection menu. Host-rendered chrome — the capability supplies title,
 * icon hint, and `run` behavior only.
 */
interface CapabilityMessageActionRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip / menu label for the action. */
    title: string;
    /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
    icon?: string;
    /**
     * Runs when the user activates the action. Errors (sync or async) are
     * contained and logged; they never break the timeline.
     */
    run(context: CapabilityMessageActionContext): void | Promise<void>;
}
/** Props passed to a capability extensions-section page component. */
interface CapabilityExtensionsSectionPageProps {
    /** Which page of the section is active. */
    view: "browse" | "installed";
}
/**
 * A capability-contributed section in the app's Extensions hub, shaped like the
 * built-in Capabilities and Skills sections: a sidebar section with Browse and
 * Installed pages at {@link CapabilityExtensionsSectionRegistration.path}.
 * Experimental: see docs/api_to_audit.md for what to audit before the prefix
 * drops.
 */
interface CapabilityExtensionsSectionRegistration {
    /** Stable id, unique within this capability (letters, digits, `-`, `_`). */
    id: string;
    /** Section label shown in the extensions sidebar, e.g. "Connections". */
    title: string;
    /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
    icon: string;
    /** URL segment under /extensions — letters, digits, `-`, `_`. */
    path: string;
    /** The section's Browse page component. */
    browse: ComponentType<CapabilityExtensionsSectionPageProps>;
    /** The section's Installed page component. */
    installed: ComponentType<CapabilityExtensionsSectionPageProps>;
}
interface CapabilityAppSlots {
    homepageSection(registration: CapabilityHomepageSectionRegistration): void;
    settingsSection(registration: CapabilitySettingsSectionRegistration): void;
    navPanel(registration: CapabilityNavPanelRegistration): void;
    /**
     * Contribute a section to the app's Extensions hub: a sidebar label plus
     * Browse and Installed pages at /extensions/<path>. Shaped after the
     * built-in Capabilities and Skills sections. Experimental: see
     * docs/api_to_audit.md for what to audit before the prefix drops.
     */
    experimental_extensionsSection(registration: CapabilityExtensionsSectionRegistration): void;
    /**
     * Add an action to an existing thread's panel launcher. This slot is
     * thread-only; use `experimental_newThreadPanelAction` for root compose.
     */
    threadPanelAction(registration: CapabilityThreadPanelActionRegistration): void;
    /**
     * Add an action to the root New thread screen's panel launcher (see
     * {@link CapabilityNewThreadPanelActionRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_newThreadPanelAction(registration: CapabilityNewThreadPanelActionRegistration): void;
    pendingInteraction(registration: CapabilityPendingInteractionRegistration): void;
    sidebarFooterAction(registration: CapabilitySidebarFooterActionRegistration): void;
    /**
     * Replace the sidebar's thread list (see
     * {@link CapabilityThreadListRegistration}). Experimental: see
     * docs/api_to_audit.md for what to audit before the prefix drops.
     */
    experimental_threadList(registration: CapabilityThreadListRegistration): void;
    /**
     * Render a component in the thread header's action row (see
     * {@link CapabilityThreadHeaderActionRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_threadHeaderAction(registration: CapabilityThreadHeaderActionRegistration): void;
    fileOpener(registration: CapabilityFileOpenerRegistration): void;
    /**
     * Replace BB's source-code renderer (see
     * {@link CapabilitySourceCodeRendererRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_sourceCodeRenderer(registration: CapabilitySourceCodeRendererRegistration): void;
    /**
     * Replace BB's diff renderer (see
     * {@link CapabilityDiffRendererRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_diffRenderer(registration: CapabilityDiffRendererRegistration): void;
    messageDirective(registration: CapabilityMessageDirectiveRegistration): void;
    messageAction(registration: CapabilityMessageActionRegistration): void;
}
interface CapabilityAppComposer {
    customize(registration: ComposerCustomization): void;
}
/** Stable lifecycle values for one content-script instance in one bb client. */
interface CapabilityContentScriptContext {
    /** The id of the capability that owns this script. */
    readonly capabilityId: string;
    /** Monotonic per-client generation, starting at 1. */
    readonly generation: number;
    /** Aborted before cleanup begins on replacement, deactivation, or teardown. */
    readonly signal: AbortSignal;
    /**
     * Persistently decorate any thread row for this capability generation.
     *
     * The status is owned by the frontend generation and therefore survives
     * route changes. Passing `null` clears the capability's status for that thread.
     * The host clears every remaining status when the frontend generation
     * deactivates.
     *
     * Optional so bundles can feature-detect support while this experimental
     * surface rolls out across 0.x clients.
     */
    readonly experimental_setThreadRowStatus?: (threadId: string, status: CapabilityComposerThreadRowStatus | null) => void;
}
/** Cleanup returned by a frontend content script. */
type CapabilityContentScriptDisposer = () => void | Promise<void>;
/**
 * Trusted same-origin JavaScript/TypeScript mounted once per active frontend
 * generation in each bb app window or browser tab.
 */
interface CapabilityContentScriptRegistration {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /**
     * Install behavior into the bb app shell. The host awaits a returned
     * promise, contains failures, and calls the returned disposer exactly once.
     */
    mount(context: CapabilityContentScriptContext): void | CapabilityContentScriptDisposer | Promise<void | CapabilityContentScriptDisposer>;
}
/** Lifecycle surface for trusted frontend content scripts. */
interface CapabilityAppContentScripts {
    register(registration: CapabilityContentScriptRegistration): void;
}
interface CapabilityAppBuilder {
    slots: CapabilityAppSlots;
    composer: CapabilityAppComposer;
    contentScripts: CapabilityAppContentScripts;
}
type CapabilityAppSetup = (app: CapabilityAppBuilder) => void;
/**
 * The opaque product of `defineCapabilityApp` — a capability's `app.tsx` default
 * export. The host re-runs `setup` against a fresh collector on every
 * (re)interpretation, replacing that capability's registrations wholesale.
 */
interface CapabilityAppDefinition {
    /** Brand the host checks before interpreting a bundle's default export. */
    readonly __bbCapabilityApp: true;
    readonly setup: CapabilityAppSetup;
}
interface CapabilityRpcClient<Contract extends CapabilityRpcContract = CapabilityRpcContract> {
    /**
     * Invoke one of the capability's `bb.rpc` methods (POST
     * /api/v1/capabilities/&lt;id&gt;/rpc/&lt;method&gt;). Resolves with the method's
     * inferred output; rejects with an `Error` carrying the server's message,
     * stable `code`, and validation `issues` when present.
     */
    call<Method extends Extract<keyof Contract, string>>(method: Method, ...args: CapabilityRpcCallArgs<Contract[Method]>): Promise<CapabilityRpcResult<Contract[Method]>>;
}
interface CapabilitySettingsState {
    /**
     * Effective non-secret setting values (secret settings are excluded —
     * read them server-side). Undefined while loading or unavailable.
     */
    values: Record<string, string | boolean> | undefined;
    isLoading: boolean;
}
/** State of the app's shared realtime connection to the bb server. */
type CapabilityRealtimeConnectionState = "connected" | "connecting" | "reconnecting";
/** Where `useComposer()` writes. */
type CapabilityComposerScope = {
    kind: "thread";
    threadId: string;
} | {
    kind: "queued-message";
    threadId: string;
    queuedMessageId: string;
} | {
    kind: "side-chat";
    projectId: string;
    parentThreadId: string;
    tabId: string;
    childThreadId: string | null;
} | {
    kind: "new-thread";
    /** Root compose's effective selected project; null only while unresolved. */
    projectId: string | null;
};
/** One capability-owned composer customization registration. */
interface ComposerCustomization {
    /** Unique within the capability; letters, digits, `-`, `_`. */
    id: string;
    /** Composer kinds where this customization is active; omit for all kinds. */
    scopes?: readonly CapabilityComposerScope["kind"][];
    actions?: readonly {
        id: string;
        component: ComponentType;
    }[];
    banners?: readonly {
        id: string;
        /** Host chrome around the banner. Defaults to `"card"`. */
        chrome?: "bare" | "card";
        component: ComponentType;
    }[];
    plusMenu?: readonly ComposerPlusMenuItem[];
    richText?: ComposerRichTextSpec;
}
/** Host-rendered menu row in the composer's `+` menu. */
interface ComposerPlusMenuItem {
    id: string;
    label: string;
    /** BB icon name; unknown names fall back to the generic capability icon. */
    icon?: string;
    /** Accessible description for the host-rendered row. */
    description?: string;
    disabled?: boolean | ((view: ComposerView) => boolean);
    run(context: {
        composer: CapabilityComposerApi;
        view: ComposerView;
    }): void | Promise<void>;
}
/** Reactive read-side of the composer a capability surface is mounted in. */
interface ComposerView {
    scope: CapabilityComposerScope;
    layout: "compact" | "expanded" | "zen";
    draft: {
        text: string;
        isEmpty: boolean;
        attachmentCount: number;
    };
    run: {
        isRunning: boolean;
        isSubmitting: boolean;
    };
}
interface ComposerRichTextSpec {
    /** Content-derived paint: match ranges receive `className`; text is never mutated. */
    effects?: readonly {
        id: string;
        /** Plain-text offsets into the current structured draft. */
        match(text: string): readonly {
            from: number;
            to: number;
        }[];
        className: string;
    }[];
    /** Debounced, read-only observation of the structured draft. */
    onDraftChange?(draft: ComposerStructuredDraft, view: ComposerView): void;
}
interface ComposerStructuredDraft {
    text: string;
    mentions: readonly {
        from: number;
        to: number;
        provider: string;
        id: string;
        label: string;
    }[];
}
/** Host-rendered paint applied to the editable composer text. */
interface CapabilityComposerTextEffect {
    className: string;
}
/** Host-rendered status that temporarily replaces a thread's draft glyph. */
interface CapabilityComposerThreadRowStatus {
    /** BB icon-name hint; unknown names fall back to the generic capability icon. */
    icon: string;
    /** Accessible label for the status glyph. */
    label: string;
    /**
     * Semantic host treatment for the status glyph. `running` automatically
     * shimmers; terminal `success` and `error` tones are static. Defaults to the
     * neutral tone.
     */
    tone?: "default" | "error" | "running" | "success";
}
/** An @-mention pill bound to one of the calling capability's mention providers. */
interface CapabilityComposerMention {
    /** Mention provider id registered by THIS capability via `bb.ui.registerMentionProvider`. */
    provider: string;
    /** Item id your provider's `resolve` will receive at send time. */
    id: string;
    /** Pill text shown in the composer. */
    label: string;
}
/**
 * Programmatic access to the chat composer draft — the same shared draft the
 * built-in "Add to chat" affordances (file preview, diff, terminal selections)
 * write to. While a queued message is being edited, writes land in that
 * message's inline editor. In a side chat, writes land in the visible side-chat
 * draft. Otherwise, inside a thread context writes land in that thread's draft;
 * anywhere else (nav panel, homepage section) they seed the new-thread composer
 * draft, which persists until the user sends or clears it.
 */
interface CapabilityComposerApi {
    scope: CapabilityComposerScope;
    /** Current plain text for this composer scope. */
    readonly text: string;
    /**
     * Replace the draft's plain text. Attachments are preserved. Inline mentions
     * outside the changed range are preserved and rebased; mentions overlapped
     * by the replacement are removed because their text representation changed.
     */
    setText(next: string): void;
    /**
     * Replace the draft's plain text from the latest committed value. Uses the
     * same structured-state reconciliation as `setText`.
     */
    updateText(updater: (current: string) => string): void;
    /** Clear plain text without clearing independently attached files. */
    clear(): void;
    /**
     * Apply a host-rendered effect to this composer's editable text, or clear it.
     * Effects are scoped to the calling capability and automatically clear when the
     * slot unmounts or its composer scope changes.
     */
    setTextEffect(effect: CapabilityComposerTextEffect | null): void;
    /**
     * Lock or unlock editing for this composer. Locks are scoped to the calling
     * capability and automatically release when the slot unmounts or its composer
     * scope changes.
     */
    setInputLock(locked: boolean): void;
    /**
     * Append text to the draft as a `> ` blockquote block and focus the
     * composer. Blank text is a no-op. This is the "reference this selection
     * in chat" primitive.
     */
    addQuote(text: string): void;
    /**
     * Insert an @-mention pill that resolves through this capability's mention
     * provider at send time — the durable way to reference an entity whose
     * content should be fetched fresh when the message is sent.
     */
    insertMention(mention: CapabilityComposerMention): void;
    /** Focus the composer caret at the end of the draft. */
    focus(): void;
}
/**
 * A consumer-supplied action on the messages of one `ThreadChat` instance,
 * rendered in the embedded timeline's per-message action bar alongside the
 * native and slot-registered actions. Unlike the `messageAction` slot this is
 * scoped to the rendering component, not registered globally.
 */
interface ThreadChatMessageAction {
    /** Unique within this ThreadChat instance; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip / menu label for the action. */
    title: string;
    /** Icon hint (BB icon name); unknown names fall back to a generic icon. */
    icon?: string;
    /**
     * Message roles the action applies to. Omitted = both user and assistant
     * messages.
     */
    roles?: readonly ("assistant" | "user")[];
    /**
     * Runs when the user activates the action. Errors (sync or async) are
     * contained and logged; they never break the timeline.
     */
    run(message: ThreadChatMessageReference): void | Promise<void>;
}
/**
 * Props of the host-owned `ThreadChat` component — one thread's chat
 * (timeline, and for the composer variants the full send/queue/draft
 * engine), rendered by the BB app inside a capability slot. This is the
 * deliberate exception to the no-host-components rule (§5.5): a stable
 * product capability, not a UI kit. Versioned additive like slot props;
 * internal timeline rows, query hooks, and prompt-box configuration are
 * deliberately not exposed.
 */
interface ThreadChatProps {
    threadId: string;
    /**
     * "full" (default) is the page presentation (centered reading width);
     * "compact" is the side-panel presentation; "timeline" renders the
     * transcript without a composer.
     */
    variant?: "compact" | "full" | "timeline";
    /**
     * "contained" (default) fills and scrolls inside a bounded parent;
     * "document" grows with its content and defers scrolling to the page.
     */
    layout?: "contained" | "document";
    /** Bump to focus the composer (ignored by `variant: "timeline"`). */
    focusRequest?: number;
    /**
     * Who controls the permission mode sends run with. "inherit" (default)
     * pins every send to the thread's own resolved default and renders the
     * picker as a dimmed label — a capability surface can never widen it.
     * "editable" gives this chat its own picker, so the user can raise or
     * lower permissions for this thread independently of the thread it was
     * forked from. Ignored by `variant: "timeline"` (no composer).
     */
    permissionPolicy?: "editable" | "inherit";
    className?: string;
    /** Rendered above the conversation, scrolling with it. */
    leadingContent?: ReactNode;
    /**
     * Actions rendered in this instance's per-message action bar (see
     * {@link ThreadChatMessageAction}).
     */
    messageActions?: readonly ThreadChatMessageAction[];
}
/**
 * Every selection the composer resolved, JSON-serializable so a capability can
 * forward it to its own backend rpc verbatim and hand it straight to
 * `bb.sdk.threads.spawn`.
 *
 * The split is deliberate: the composer owns *user selections*, the capability
 * owns *filing and attribution*. `bb.sdk.threads.spawn` auto-fills
 * `origin: "capability"` and `originCapabilityId`, so a thread created this way stays
 * attributed to the capability — which it would not be if the component created
 * the thread itself. The capability adds `sectionId`, `parentThreadId`, `title`,
 * and `visibility` to the request on its own; they are deliberately not
 * composer props.
 */
interface NewThreadRequest {
    /**
     * The selected project id. Choosing "Don't work in a project" submits BB's
     * personal-project id (not `null`) together with a `personal` workspace
     * environment. Forward those fields unchanged to `threads.spawn`; if the
     * capability needs project metadata, request it from the capability backend with
     * `bb.sdk.projects.list({ includePersonal: true })`.
     */
    projectId: string;
    model: string;
    reasoningLevel: ReasoningLevel;
    /**
     * Per-field provenance (caller-explicit vs. default) for the execution
     * options above, forwarded to `spawn` so the server records what the user
     * actually chose.
     */
    executionInputSources: CreateExecutionInputSources;
    environment: CreateThreadEnvironmentArgs;
    input: PromptInput[];
}
/**
 * Props of the host-owned `experimental_NewThreadComposer` component — bb's
 * full new-thread compose surface (prompt editor with @-mentions and expand,
 * attachments, model/reasoning picker, voice, submit, and the row beneath with
 * project, environment, and branch-from),
 * rendered by the BB app inside a capability slot.
 *
 * It is the create-side counterpart to `ThreadChat`: same deliberate
 * exception to the no-host-components rule (§5.5), same additive versioning.
 */
interface NewThreadComposerProps {
    /**
     * Seeds the project picker. The user can change it, including choosing
     * "Don't work in a project"; see {@link NewThreadRequest.projectId} for the
     * submitted projectless shape.
     */
    defaultProjectId?: string;
    /**
     * Seeds the model picker. Like every `default*` prop this is a seed, not a
     * controlled value: the composer stays uncontrolled, the user can change
     * it, and when omitted the composer falls back to the project's remembered
     * model. Re-seeding any default reloads every execution and environment
     * selection. Seeded execution fields are reported as caller-explicit in
     * `executionInputSources`, so `threads.spawn` preserves the choice.
     */
    defaultModel?: string;
    /**
     * Seeds the reasoning-level picker with the same semantics as
     * {@link defaultModel}. Unsupported levels reconcile to the closest level
     * the selected model supports.
     */
    defaultReasoningLevel?: ReasoningLevel;
    /**
     * Seeds the environment and branch pickers from a previously submitted
     * `NewThreadRequest.environment`. Same seed semantics as
     * {@link defaultModel}: a seed the user can change, taking precedence
     * over the composer's own environment default when provided.
     *
     * Round trip: feeding a submitted request's `environment` back in and
     * resubmitting untouched reproduces an equivalent environment, with these
     * documented limits — the composer cannot represent every args variant:
     *
     * - `{ type: "project-default" }` seeds nothing; the composer resolves its
     *   own default and submits that concrete environment instead.
     * - A `host` environment whose host no longer exists (or whose project has
     *   no source on it) falls back to the composer's default host, exactly as
     *   the primary compose surface would.
     * - A `reuse` environment whose worktree no longer has unarchived threads
     *   falls back the same way.
     * - An `unmanaged` workspace's `path` has no composer control; the seeded
     *   selection submits `path: null` (the host's configured checkout). The
     *   composer itself never produces a non-null `path`, so real round trips
     *   are unaffected.
     * - A `managed-worktree` with `baseBranch: { kind: "default" }` leaves the
     *   branch picker on its default, which may resolve to a named base branch
     *   when the project configures a dedicated worktree base — the same branch
     *   the original `default` submission would have created from.
     */
    defaultEnvironment?: CreateThreadEnvironmentArgs;
    /** Seeds the draft, only while the draft is still empty. */
    initialPrompt?: string;
    placeholder?: string;
    /**
     * "contained" (default) fills and scrolls inside a bounded parent;
     * "document" grows with its content and defers scrolling to the page.
     */
    layout?: "contained" | "document";
    /** Bump to focus the editor. */
    focusRequest?: number;
    className?: string;
    /**
     * Where the draft persists. Drafts survive reloads and are shared by every
     * composer using the same key; defaults to a key scoped to this capability.
     */
    draftKey?: string;
    /**
     * Fires on submit with every selection resolved. The draft clears when this
     * resolves and is KEPT if it throws, so a failed create never loses what the
     * user typed.
     */
    onSubmit: (request: NewThreadRequest) => void | Promise<void>;
}
/**
 * Props of the host-owned `Markdown` component — bb's chat message renderer
 * (the same typography, spacing, and code styling as timeline messages).
 * Use it wherever capability UI quotes or previews message content so it reads
 * like the rest of the chat. Like `ThreadChat`, this is a stable product
 * capability, not a UI kit; renderer internals stay private.
 */
interface MarkdownProps {
    /** Markdown source, rendered exactly like a chat message body. */
    content: string;
    className?: string;
}
/** Current app selection, derived from the route. */
interface BbContext {
    projectId: string | null;
    threadId: string | null;
}
interface BbNavigate {
    toThread(threadId: string): void;
    toProject(projectId: string): void;
    /**
     * Navigate to one of this capability's own nav panels by its `path`.
     * `subPath` targets a location inside the panel (the component's
     * `subPath` prop); `replace` swaps the current history entry instead of
     * pushing — use it for redirects so back does not bounce.
     */
    toCapabilityPanel(path: string, options?: {
        subPath?: string;
        replace?: boolean;
    }): void;
    /**
     * Navigate to the root compose surface (the new-thread screen). Pass
     * `initialPrompt` to seed the composer draft and `focusPrompt` to focus the
     * composer on arrival — the pairing behind "Create via chat" style entry
     * points that drop the user into chat with a prefilled prompt.
     */
    toCompose(options?: {
        initialPrompt?: string;
        focusPrompt?: boolean;
    }): void;
    /**
     * Open one of this plugin's registered thread-panel actions in the current
     * surface's host-owned right panel (a thread, or a plugin nav page).
     * Returns false when the surface has no side panel or the action is
     * unavailable.
     */
    openThreadPanel(options: CapabilityTargetedPanelActionOpenOptions): boolean;
}
/**
 * Everything `@get-bb/capability-sdk/app` resolves to at runtime. The BB app builds
 * the real implementation and `satisfies` this interface; `bb capability build`
 * shims the specifier to that object on `globalThis.__bbCapabilityRuntime`.
 */
interface CapabilitySdkApp {
    defineCapabilityApp(setup: CapabilityAppSetup): CapabilityAppDefinition;
    useRpc<Contract extends CapabilityRpcContract = CapabilityRpcContract>(): CapabilityRpcClient<Contract>;
    useRealtime(channel: string, handler: (payload: unknown) => void): void;
    /**
     * Observe the same shared connection that delivers `useRealtime` signals.
     * Use a subsequent transition to `connected` to reconcile server state that
     * may have changed while ephemeral signals could not be delivered. The first
     * connection can transition from `connecting` and is not a reconnection.
     */
    useRealtimeConnectionState(): CapabilityRealtimeConnectionState;
    useSettings(): CapabilitySettingsState;
    useBbContext(): BbContext;
    useBbNavigate(): BbNavigate;
    useComposer(): CapabilityComposerApi;
    /**
     * The sidebar's live thread view (see {@link CapabilitySidebarThreadsState}).
     * Reads the host's own cache and realtime subscriptions, so it costs no
     * extra request and updates exactly when the built-in sidebar does.
     *
     * `threads` is one array of every visible thread and is not capped. Thread
     * objects keep their identity across updates while the underlying entry is
     * unchanged, so a memoized row re-renders only when its own thread changed;
     * the array itself is new on every update. Window your rows (render only
     * what is on screen) as the built-in sidebar does — a list that mounts one
     * row per thread is slow on phones with many threads.
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreads(): CapabilitySidebarThreadsState;
    /**
     * Thread actions bound to the host's mutations (see
     * {@link CapabilitySidebarThreadActions}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_useSidebarThreadActions(): CapabilitySidebarThreadActions;
    /**
     * The pull request for one thread's branch (see
     * {@link CapabilitySidebarThreadPullRequestState}).
     *
     * Per row and opt-in, because it costs a git-host lookup: it is NOT on the
     * thread payload every sidebar loads. Threads sharing an environment share
     * one query, and the host owns the polling and staleness rules — an open PR
     * with pending checks refreshes, a merged one does not.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreadPullRequest(threadId: string): CapabilitySidebarThreadPullRequestState;
    /**
     * Per-row drag-to-split support (see {@link CapabilitySidebarThreadSplit}).
     * Call it once per rendered row, like the built-in sidebar does.
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreadSplit(threadId: string): CapabilitySidebarThreadSplit;
    /**
     * The host-owned chat component (see {@link ThreadChatProps}). Together
     * with `Markdown`, the only components the SDK ships — everything else
     * stays vendored per §5.5.
     */
    ThreadChat: ComponentType<ThreadChatProps>;
    /**
     * The host-owned chat-message markdown renderer (see
     * {@link MarkdownProps}).
     */
    Markdown: ComponentType<MarkdownProps>;
    /**
     * The host-owned new-thread compose surface (see
     * {@link NewThreadComposerProps}). Experimental: see
     * docs/api_to_audit.md for what to audit before the prefix drops.
     */
    experimental_NewThreadComposer: ComponentType<NewThreadComposerProps>;
    /**
     * The host-owned source viewer (see {@link SourceCodeProps}). Renders
     * supplied source text with BB's syntax highlighting, gutters, and live code
     * theme, and honours an active `experimental_sourceCodeRenderer`
     * replacement. Experimental: see docs/api_to_audit.md.
     */
    experimental_SourceCode: ComponentType<SourceCodeProps>;
    /**
     * The host-owned diff viewer (see {@link DiffProps}). Renders supplied patch
     * content with BB's normalization, syntax highlighting, unified/split
     * presentation, and live code theme, and honours an active
     * `experimental_diffRenderer` replacement. Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_Diff: ComponentType<DiffProps>;
    useComposerView(): ComposerView;
}

declare const defineCapabilityApp: (setup: CapabilityAppSetup) => CapabilityAppDefinition;
declare const ThreadChat: react.ComponentType<ThreadChatProps>;
declare const Markdown: react.ComponentType<MarkdownProps>;
declare const experimental_NewThreadComposer: react.ComponentType<NewThreadComposerProps>;
declare const experimental_SourceCode: react.ComponentType<SourceCodeProps>;
declare const experimental_Diff: react.ComponentType<DiffProps>;
declare const useRpc: <Contract extends CapabilityRpcContract = Readonly<Record<string, CapabilityRpcMethodContract<StandardSchemaV1<unknown, unknown>, StandardSchemaV1<unknown, unknown>>>>>() => CapabilityRpcClient<Contract>;
declare const useRealtime: (channel: string, handler: (payload: unknown) => void) => void;
declare const useRealtimeConnectionState: () => CapabilityRealtimeConnectionState;
declare const useSettings: () => CapabilitySettingsState;
declare const useBbContext: () => BbContext;
declare const useBbNavigate: () => BbNavigate;
declare const useComposer: () => CapabilityComposerApi;
declare const useComposerView: () => ComposerView;
declare const experimental_useSidebarThreads: () => CapabilitySidebarThreadsState;
declare const experimental_useSidebarThreadActions: () => CapabilitySidebarThreadActions;
declare const experimental_useSidebarThreadPullRequest: (threadId: string) => CapabilitySidebarThreadPullRequestState;
declare const experimental_useSidebarThreadSplit: (threadId: string) => CapabilitySidebarThreadSplit;

export { Markdown, ThreadChat, defineCapabilityApp, experimental_Diff, experimental_NewThreadComposer, experimental_SourceCode, experimental_useSidebarThreadActions, experimental_useSidebarThreadPullRequest, experimental_useSidebarThreadSplit, experimental_useSidebarThreads, useBbContext, useBbNavigate, useComposer, useComposerView, useRealtime, useRealtimeConnectionState, useRpc, useSettings };
export type { BbContext, BbNavigate, CapabilityAppBuilder, CapabilityAppComposer, CapabilityAppContentScripts, CapabilityAppDefinition, CapabilityAppSetup, CapabilityAppSlots, CapabilityComposerApi, CapabilityComposerMention, CapabilityComposerScope, CapabilityComposerTextEffect, CapabilityComposerThreadRowStatus, CapabilityContentScriptContext, CapabilityContentScriptDisposer, CapabilityContentScriptRegistration, CapabilityDiffRendererProps, CapabilityDiffRendererRegistration, CapabilityExtensionsSectionPageProps, CapabilityExtensionsSectionRegistration, CapabilityFileOpenerProps, CapabilityFileOpenerRegistration, CapabilityFileOpenerSource, CapabilityHomepageSectionProps, CapabilityHomepageSectionRegistration, CapabilityMessageActionContext, CapabilityMessageActionRegistration, CapabilityMessageDirectiveMessage, CapabilityMessageDirectiveOpenWorkspaceFile, CapabilityMessageDirectiveProps, CapabilityMessageDirectiveRegistration, CapabilityNavPanelProps, CapabilityNavPanelRegistration, CapabilityNewThreadPanelActionContext, CapabilityNewThreadPanelActionRegistration, CapabilityNewThreadPanelProps, CapabilityPanelActionOpenOptions, CapabilityPendingInteractionProps, CapabilityPendingInteractionRegistration, CapabilityPendingInteractionView, CapabilityRealtimeConnectionState, CapabilityRpcCallArgs, CapabilityRpcClient, CapabilityRpcContract, CapabilityRpcError, CapabilityRpcErrorCode, CapabilityRpcHandlers, CapabilityRpcIssuePathSegment, CapabilityRpcMethodContract, CapabilityRpcResult, CapabilityRpcValidationIssue, CapabilitySdkApp, CapabilitySettingsSectionProps, CapabilitySettingsSectionRegistration, CapabilitySettingsState, CapabilitySidebarFooterActionContext, CapabilitySidebarFooterActionProps, CapabilitySidebarFooterActionRegistration, CapabilitySidebarProject, CapabilitySidebarPullRequest, CapabilitySidebarSplitPane, CapabilitySidebarThread, CapabilitySidebarThreadActions, CapabilitySidebarThreadActivity, CapabilitySidebarThreadIndicator, CapabilitySidebarThreadPullRequestState, CapabilitySidebarThreadSplit, CapabilitySidebarThreadsState, CapabilitySidebarWorkspaceKind, CapabilitySourceCodeRendererProps, CapabilitySourceCodeRendererRegistration, CapabilityTargetedPanelActionOpenOptions, CapabilityThreadHeaderActionProps, CapabilityThreadHeaderActionRegistration, CapabilityThreadListProps, CapabilityThreadListRegistration, CapabilityThreadPanelActionContext, CapabilityThreadPanelActionRegistration, CapabilityThreadPanelProps, CodeOverflowMode, ComposerCustomization, ComposerPlusMenuItem, ComposerRichTextSpec, ComposerStructuredDraft, ComposerView, DiffProps, DiffViewMode, JsonValue, MarkdownProps, NewThreadComposerProps, NewThreadRequest, SourceCodeLineRange, SourceCodeProps, StandardSchemaV1, StandardSchemaV1InferInput, StandardSchemaV1InferOutput, StandardSchemaV1Issue, StandardSchemaV1Result, ThreadChatMessageAction, ThreadChatMessageReference, ThreadChatProps };
