// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

import * as react from 'react';
import { ComponentType, ReactNode } from 'react';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import Database from 'better-sqlite3';
import { Context } from 'hono';

/**
 * App-wide server-backed preferences.
 * Client-local settings stay in the frontend localStorage helpers instead.
 */
declare const appSettingsSchema: z$1.ZodObject<{
    showKeyboardHints: z$1.ZodBoolean;
    showReasoningTraces: z$1.ZodBoolean;
    showUnhandledAgentEvents: z$1.ZodBoolean;
    steerActiveThreadOnEnter: z$1.ZodBoolean;
}, z$1.core.$strict>;
type AppSettings = z$1.infer<typeof appSettingsSchema>;

declare const appKeybindingOverridesSchema: z$1.ZodArray<z$1.ZodObject<{
    command: z$1.ZodEnum<{
        "composer.focus": "composer.focus";
        "diff.toggle": "diff.toggle";
        "file.quickOpen": "file.quickOpen";
        "modelPicker.cycleModel": "modelPicker.cycleModel";
        "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
        "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
        "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
        "modelPicker.cycleVendor": "modelPicker.cycleVendor";
        "modelPicker.cycleVendorBackward": "modelPicker.cycleVendorBackward";
        "modelPicker.toggle": "modelPicker.toggle";
        "pane.close": "pane.close";
        "pane.focus.1": "pane.focus.1";
        "pane.focus.2": "pane.focus.2";
        "pane.focus.3": "pane.focus.3";
        "pane.focus.4": "pane.focus.4";
        "pane.focus.5": "pane.focus.5";
        "pane.focus.6": "pane.focus.6";
        "pane.focus.7": "pane.focus.7";
        "pane.focus.8": "pane.focus.8";
        "pane.focus.next": "pane.focus.next";
        "pane.focus.previous": "pane.focus.previous";
        "pane.maximize.toggle": "pane.maximize.toggle";
        "panel.close": "panel.close";
        "panel.newTab": "panel.newTab";
        "panel.toggle": "panel.toggle";
        "question.select.1": "question.select.1";
        "question.select.2": "question.select.2";
        "question.select.3": "question.select.3";
        "question.select.4": "question.select.4";
        "question.select.5": "question.select.5";
        "question.select.6": "question.select.6";
        "question.select.7": "question.select.7";
        "question.select.8": "question.select.8";
        "question.select.9": "question.select.9";
        "settings.open": "settings.open";
        "settings.openServers": "settings.openServers";
        "sidebar.toggle": "sidebar.toggle";
        "terminal.open": "terminal.open";
        "thread.archive": "thread.archive";
        "thread.jump.1": "thread.jump.1";
        "thread.jump.2": "thread.jump.2";
        "thread.jump.3": "thread.jump.3";
        "thread.jump.4": "thread.jump.4";
        "thread.jump.5": "thread.jump.5";
        "thread.jump.6": "thread.jump.6";
        "thread.jump.7": "thread.jump.7";
        "thread.jump.8": "thread.jump.8";
        "thread.jump.9": "thread.jump.9";
        "thread.new": "thread.new";
        "thread.next": "thread.next";
        "thread.previous": "thread.previous";
        "thread.rename": "thread.rename";
        "thread.search": "thread.search";
        "workspace.openPreferred": "workspace.openPreferred";
    }>;
    shortcut: z$1.ZodNullable<z$1.ZodObject<{
        alt: z$1.ZodBoolean;
        control: z$1.ZodBoolean;
        key: z$1.ZodString;
        meta: z$1.ZodBoolean;
        mod: z$1.ZodBoolean;
        shift: z$1.ZodBoolean;
    }, z$1.core.$strict>>;
}, z$1.core.$strict>>;
type AppKeybindingOverrides = z$1.infer<typeof appKeybindingOverridesSchema>;

interface JsonObject {
    [key: string]: JsonValue$1;
}
type JsonValue$1 = string | number | boolean | null | JsonValue$1[] | JsonObject;

declare const appThemeSchema: z$1.ZodObject<{
    customCss: z$1.ZodNullable<z$1.ZodString>;
    faviconColor: z$1.ZodEnum<{
        blue: "blue";
        default: "default";
        green: "green";
        orange: "orange";
        pink: "pink";
        purple: "purple";
        red: "red";
        teal: "teal";
        yellow: "yellow";
    }>;
    resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
        dark: z$1.ZodString;
        files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
        light: z$1.ZodString;
    }, z$1.core.$strict>>;
    themeId: z$1.ZodString;
}, z$1.core.$strip>;
type AppTheme = z$1.infer<typeof appThemeSchema>;
/**
 * The complete appearance selection a client sends when changing the palette
 * and/or favicon tint. The server validates `themeId` (built-in id or an
 * existing custom theme) and resolves the CSS from disk for custom themes.
 * Callers changing only one facet must carry the other facet forward explicitly.
 */
declare const appThemeSelectionSchema: z$1.ZodObject<{
    faviconColor: z$1.ZodEnum<{
        blue: "blue";
        default: "default";
        green: "green";
        orange: "orange";
        pink: "pink";
        purple: "purple";
        red: "red";
        teal: "teal";
        yellow: "yellow";
    }>;
    themeId: z$1.ZodString;
}, z$1.core.$strip>;
type AppThemeSelection = z$1.infer<typeof appThemeSelectionSchema>;

declare const changedMessageSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "archived-changed": "archived-changed";
        "environment-changed": "environment-changed";
        "events-appended": "events-appended";
        "history-rewritten": "history-rewritten";
        "interactions-changed": "interactions-changed";
        "order-changed": "order-changed";
        "parent-changed": "parent-changed";
        "pin-state-changed": "pin-state-changed";
        "queue-changed": "queue-changed";
        "read-state-changed": "read-state-changed";
        "status-changed": "status-changed";
        "tabs-changed": "tabs-changed";
        "terminals-changed": "terminals-changed";
        "thread-created": "thread-created";
        "thread-deleted": "thread-deleted";
        "title-changed": "title-changed";
    }>>>;
    entity: z$1.ZodLiteral<"thread">;
    id: z$1.ZodOptional<z$1.ZodString>;
    metadata: z$1.ZodOptional<z$1.ZodObject<{
        backgroundActivityChanged: z$1.ZodOptional<z$1.ZodBoolean>;
        eventTypes: z$1.ZodOptional<z$1.ZodReadonly<z$1.ZodArray<z$1.ZodString & z$1.ZodType<"agent/error" | "agent/unhandled" | "agent/warning" | "client/thread/start" | "client/turn/rejected" | "client/turn/requested" | "client/turn/start" | "item/agentMessage/delta" | "item/backgroundTask/completed" | "item/backgroundTask/progress" | "item/commandExecution/outputDelta" | "item/completed" | "item/fileChange/outputDelta" | "item/mcpToolCall/progress" | "item/plan/delta" | "item/reasoning/summaryTextDelta" | "item/reasoning/textDelta" | "item/started" | "item/toolCall/progress" | "model/fallback" | "model/rateLimits/updated" | "system/agent-turn-watchdog" | "system/error" | "system/manager/user_message" | "system/operation" | "system/permissionGrant/lifecycle" | "system/thread-provisioning" | "system/thread/interrupted" | "system/userQuestion/lifecycle" | "thread/compacted" | "thread/context/cleared" | "thread/contextWindowUsage/updated" | "thread/goal/cleared" | "thread/goal/updated" | "thread/identity" | "thread/name/updated" | "thread/started" | "thread/tokenUsage/updated" | "turn/completed" | "turn/diff/updated" | "turn/input/accepted" | "turn/plan/updated" | "turn/started", string, z$1.core.$ZodTypeInternals<"agent/error" | "agent/unhandled" | "agent/warning" | "client/thread/start" | "client/turn/rejected" | "client/turn/requested" | "client/turn/start" | "item/agentMessage/delta" | "item/backgroundTask/completed" | "item/backgroundTask/progress" | "item/commandExecution/outputDelta" | "item/completed" | "item/fileChange/outputDelta" | "item/mcpToolCall/progress" | "item/plan/delta" | "item/reasoning/summaryTextDelta" | "item/reasoning/textDelta" | "item/started" | "item/toolCall/progress" | "model/fallback" | "model/rateLimits/updated" | "system/agent-turn-watchdog" | "system/error" | "system/manager/user_message" | "system/operation" | "system/permissionGrant/lifecycle" | "system/thread-provisioning" | "system/thread/interrupted" | "system/userQuestion/lifecycle" | "thread/compacted" | "thread/context/cleared" | "thread/contextWindowUsage/updated" | "thread/goal/cleared" | "thread/goal/updated" | "thread/identity" | "thread/name/updated" | "thread/started" | "thread/tokenUsage/updated" | "turn/completed" | "turn/diff/updated" | "turn/input/accepted" | "turn/plan/updated" | "turn/started", string>>>>>;
        hasPendingInteraction: z$1.ZodOptional<z$1.ZodBoolean>;
        projectId: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strict>>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "project-created": "project-created";
        "project-deleted": "project-deleted";
        "project-order-changed": "project-order-changed";
        "project-sources-changed": "project-sources-changed";
        "project-updated": "project-updated";
        "threads-changed": "threads-changed";
    }>>>;
    entity: z$1.ZodLiteral<"project">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "environment-created": "environment-created";
        "environment-deleted": "environment-deleted";
        "git-refs-changed": "git-refs-changed";
        "metadata-changed": "metadata-changed";
        "status-changed": "status-changed";
        "thread-storage-changed": "thread-storage-changed";
        "work-status-changed": "work-status-changed";
    }>>>;
    entity: z$1.ZodLiteral<"environment">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "host-connected": "host-connected";
        "host-disconnected": "host-disconnected";
    }>>>;
    entity: z$1.ZodLiteral<"host">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "agent-configuration-changed": "agent-configuration-changed";
        "capabilities-changed": "capabilities-changed";
        "config-changed": "config-changed";
    }>>>;
    entity: z$1.ZodLiteral<"system">;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>], "entity">;
type ChangedMessage = z$1.infer<typeof changedMessageSchema>;

declare const environmentSchema: z$1.ZodObject<{
    baseBranch: z$1.ZodNullable<z$1.ZodString>;
    branchName: z$1.ZodNullable<z$1.ZodString>;
    createdAt: z$1.ZodNumber;
    defaultBranch: z$1.ZodNullable<z$1.ZodString>;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    isGitRepo: z$1.ZodBoolean;
    isWorktree: z$1.ZodBoolean;
    managed: z$1.ZodBoolean;
    mergeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
    name: z$1.ZodNullable<z$1.ZodString>;
    path: z$1.ZodNullable<z$1.ZodString>;
    projectId: z$1.ZodString;
    status: z$1.ZodEnum<{
        destroyed: "destroyed";
        destroying: "destroying";
        error: "error";
        provisioning: "provisioning";
        ready: "ready";
        retiring: "retiring";
    }>;
    updatedAt: z$1.ZodNumber;
    workspaceProvisionType: z$1.ZodEnum<{
        "managed-worktree": "managed-worktree";
        personal: "personal";
        unmanaged: "unmanaged";
    }>;
}, z$1.core.$strip>;
type Environment = z$1.infer<typeof environmentSchema>;

declare const experimentsSchema: z$1.ZodRecord<z$1.ZodEnum<{
    agentSessionReaping: "agentSessionReaping";
    editMessages: "editMessages";
}>, z$1.ZodBoolean>;
type Experiments = z$1.infer<typeof experimentsSchema>;

declare const hostSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    lastRejectedProtocolVersion: z$1.ZodNullable<z$1.ZodNumber>;
    lastSeenAt: z$1.ZodNullable<z$1.ZodNumber>;
    maxPermissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    name: z$1.ZodString;
    status: z$1.ZodEnum<{
        connected: "connected";
        disconnected: "disconnected";
    }>;
    type: z$1.ZodEnum<{
        persistent: "persistent";
    }>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type Host = z$1.infer<typeof hostSchema>;

/**
 * Live latest-call read. `call` is null only when the session holds nothing.
 * Transport and read failures must not use this empty shape.
 */
declare const latestModelInputResultSchema: z$1.ZodObject<{
    call: z$1.ZodNullable<z$1.ZodObject<{
        dispatchedAt: z$1.ZodNumber;
        loadedContext: z$1.ZodObject<{
            files: z$1.ZodArray<z$1.ZodObject<{
                path: z$1.ZodString;
            }, z$1.core.$strict>>;
            skills: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                name: z$1.ZodString;
                path: z$1.ZodString;
            }, z$1.core.$strict>>;
        }, z$1.core.$strict>;
        messages: z$1.ZodArray<z$1.ZodObject<{
            role: z$1.ZodString;
            text: z$1.ZodString;
        }, z$1.core.$strict>>;
        model: z$1.ZodNullable<z$1.ZodString>;
        systemPrompt: z$1.ZodString;
        tools: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            name: z$1.ZodString;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>>;
}, z$1.core.$strict>;
type LatestModelInputResult = z$1.infer<typeof latestModelInputResultSchema>;

declare const pendingInteractionResolutionSchema: z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    decision: z$1.ZodLiteral<"allow_once">;
    grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
        fileSystem: z$1.ZodNullable<z$1.ZodObject<{
            read: z$1.ZodArray<z$1.ZodString>;
            write: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        network: z$1.ZodNullable<z$1.ZodObject<{
            enabled: z$1.ZodNullable<z$1.ZodBoolean>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    decision: z$1.ZodLiteral<"allow_for_session">;
    grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
        fileSystem: z$1.ZodNullable<z$1.ZodObject<{
            read: z$1.ZodArray<z$1.ZodString>;
            write: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        network: z$1.ZodNullable<z$1.ZodObject<{
            enabled: z$1.ZodNullable<z$1.ZodBoolean>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    decision: z$1.ZodLiteral<"deny">;
}, z$1.core.$strip>], "decision">, z$1.ZodObject<{
    answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
        freeText: z$1.ZodOptional<z$1.ZodString>;
        selected: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>>;
    kind: z$1.ZodLiteral<"user_answer">;
}, z$1.core.$strip>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"capability_submitted">;
}, z$1.core.$strip>]>;
type PendingInteractionResolution = z$1.infer<typeof pendingInteractionResolutionSchema>;
declare const agentPendingInteractionSchema: z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        agentSessionId: z$1.ZodString;
        kind: z$1.ZodLiteral<"agent">;
        requestId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodUnion<readonly [z$1.ZodObject<{
        availableDecisions: z$1.ZodArray<z$1.ZodEnum<{
            allow_for_session: "allow_for_session";
            allow_once: "allow_once";
            deny: "deny";
        }>>;
        kind: z$1.ZodLiteral<"approval">;
        reason: z$1.ZodNullable<z$1.ZodString>;
        subject: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            actions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                command: z$1.ZodString;
                name: z$1.ZodString;
                path: z$1.ZodString;
                type: z$1.ZodLiteral<"read">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"listFiles">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                query: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"search">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                type: z$1.ZodLiteral<"unknown">;
            }, z$1.core.$strip>], "type">>;
            command: z$1.ZodString;
            cwd: z$1.ZodNullable<z$1.ZodString>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"command">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"file_change">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
            writeScope: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"permission_grant">;
            permissions: z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>;
            toolName: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plan">;
            plan: z$1.ZodString;
            planFilePath: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>], "kind">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>]>;
    requestId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">, z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>]>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>;
type AgentPendingInteraction = z$1.infer<typeof agentPendingInteractionSchema>;
declare const capabilityPendingInteractionSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodObject<{
        capabilityId: z$1.ZodString;
        kind: z$1.ZodLiteral<"capability">;
        rendererId: z$1.ZodString;
    }, z$1.core.$strip>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>;
        kind: z$1.ZodLiteral<"capability">;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"capability_submitted">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type CapabilityPendingInteraction = z$1.infer<typeof capabilityPendingInteractionSchema>;
type PendingInteraction = AgentPendingInteraction | CapabilityPendingInteraction;

declare const projectSourceSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    isDefault: z$1.ZodBoolean;
    path: z$1.ZodString;
    projectId: z$1.ZodString;
    type: z$1.ZodLiteral<"local_path">;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectSource = z$1.infer<typeof projectSourceSchema>;

declare const reasoningLevelSchema: z$1.ZodEnum<{
    high: "high";
    low: "low";
    max: "max";
    medium: "medium";
    none: "none";
    ultra: "ultra";
    ultracode: "ultracode";
    xhigh: "xhigh";
}>;
type ReasoningLevel = z$1.infer<typeof reasoningLevelSchema>;
declare const promptInputSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
        end: z$1.ZodNumber;
        resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            label: z$1.ZodString;
            projectId: z$1.ZodOptional<z$1.ZodString>;
            threadId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"project">;
            label: z$1.ZodString;
            projectId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"section">;
            label: z$1.ZodString;
            sectionId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            entryKind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            kind: z$1.ZodLiteral<"path">;
            label: z$1.ZodString;
            path: z$1.ZodString;
            source: z$1.ZodEnum<{
                "thread-storage": "thread-storage";
                workspace: "workspace";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"command">;
            label: z$1.ZodString;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                builtin: "builtin";
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
            trigger: z$1.ZodEnum<{
                "/": "/";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            capabilityId: z$1.ZodString;
            icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"capability">;
            label: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
        start: z$1.ZodNumber;
    }, z$1.core.$strip>>>;
    text: z$1.ZodString;
    type: z$1.ZodLiteral<"text">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    type: z$1.ZodLiteral<"image">;
    url: z$1.ZodString;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    path: z$1.ZodString;
    type: z$1.ZodLiteral<"localImage">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    name: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
    type: z$1.ZodLiteral<"localFile">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>], "type">;
type PromptInput = z$1.infer<typeof promptInputSchema>;
declare const resolvedThreadExecutionOptionsSchema: z$1.ZodObject<{
    model: z$1.ZodString;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    seq: z$1.ZodOptional<z$1.ZodNumber>;
    source: z$1.ZodEnum<{
        "client/thread/start": "client/thread/start";
        "client/turn/requested": "client/turn/requested";
        "client/turn/start": "client/turn/start";
    }>;
}, z$1.core.$strict>;
type ResolvedThreadExecutionOptions = z$1.infer<typeof resolvedThreadExecutionOptionsSchema>;
declare const projectExecutionDefaultsSchema: z$1.ZodObject<{
    model: z$1.ZodString;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
}, z$1.core.$strict>;
type ProjectExecutionDefaults = z$1.infer<typeof projectExecutionDefaultsSchema>;

/** All thread events — agent-originated or system-originated. */
declare const threadEventSchema: z$1.ZodPipe<z$1.ZodUnknown, z$1.ZodUnion<readonly [z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/identity">;
}, z$1.core.$strict>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodNullable<z$1.ZodString>;
    checkpointId: z$1.ZodOptional<z$1.ZodString>;
    error: z$1.ZodOptional<z$1.ZodObject<{
        message: z$1.ZodString;
    }, z$1.core.$strip>>;
    status: z$1.ZodEnum<{
        completed: "completed";
        failed: "failed";
        interrupted: "interrupted";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/completed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    clientRequestId: z$1.ZodString;
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/input/accepted">;
}, z$1.core.$strict>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    threadName: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/name/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/compacted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/context/cleared">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    objective: z$1.ZodString;
    status: z$1.ZodEnum<{
        active: "active";
        budgetLimited: "budgetLimited";
        complete: "complete";
        paused: "paused";
    }>;
    threadId: z$1.ZodString;
    timeUsedSeconds: z$1.ZodNumber;
    tokenBudget: z$1.ZodNullable<z$1.ZodNumber>;
    tokensUsed: z$1.ZodNumber;
    type: z$1.ZodLiteral<"thread/goal/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/goal/cleared">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    item: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        clientRequestId: z$1.ZodOptional<z$1.ZodString>;
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localFile">;
        }, z$1.core.$strip>], "type">>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"userMessage">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"agentMessage">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        aggregatedOutput: z$1.ZodOptional<z$1.ZodString>;
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        command: z$1.ZodString;
        cwd: z$1.ZodString;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        exitCode: z$1.ZodOptional<z$1.ZodNumber>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"commandExecution">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        changes: z$1.ZodArray<z$1.ZodObject<{
            diff: z$1.ZodOptional<z$1.ZodString>;
            kind: z$1.ZodEnum<{
                add: "add";
                delete: "delete";
                update: "update";
            }>;
            movePath: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileChange">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        queries: z$1.ZodArray<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webSearch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        pattern: z$1.ZodNullable<z$1.ZodString>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webFetch">;
        url: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"imageView">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        arguments: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        error: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        result: z$1.ZodOptional<z$1.ZodUnknown>;
        server: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        statusLabels: z$1.ZodOptional<z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>>;
        tool: z$1.ZodString;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"toolCall">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        summary: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"reasoning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"plan">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"contextCompaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>], "type">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    item: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        clientRequestId: z$1.ZodOptional<z$1.ZodString>;
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localFile">;
        }, z$1.core.$strip>], "type">>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"userMessage">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"agentMessage">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        aggregatedOutput: z$1.ZodOptional<z$1.ZodString>;
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        command: z$1.ZodString;
        cwd: z$1.ZodString;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        exitCode: z$1.ZodOptional<z$1.ZodNumber>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"commandExecution">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        changes: z$1.ZodArray<z$1.ZodObject<{
            diff: z$1.ZodOptional<z$1.ZodString>;
            kind: z$1.ZodEnum<{
                add: "add";
                delete: "delete";
                update: "update";
            }>;
            movePath: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileChange">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        queries: z$1.ZodArray<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webSearch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        pattern: z$1.ZodNullable<z$1.ZodString>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webFetch">;
        url: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"imageView">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        arguments: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        error: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        result: z$1.ZodOptional<z$1.ZodUnknown>;
        server: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        statusLabels: z$1.ZodOptional<z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>>;
        tool: z$1.ZodString;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"toolCall">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        summary: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"reasoning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"plan">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"contextCompaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>], "type">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/agentMessage/delta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    reset: z$1.ZodOptional<z$1.ZodBoolean>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/commandExecution/outputDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/fileChange/outputDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/reasoning/summaryTextDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/reasoning/textDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/plan/delta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    itemId: z$1.ZodString;
    message: z$1.ZodOptional<z$1.ZodString>;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/mcpToolCall/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    itemId: z$1.ZodString;
    message: z$1.ZodOptional<z$1.ZodString>;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/toolCall/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    item: z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/backgroundTask/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    item: z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/backgroundTask/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    threadId: z$1.ZodString;
    tokenUsage: z$1.ZodObject<{
        last: z$1.ZodObject<{
            cachedInputTokens: z$1.ZodNumber;
            inputTokens: z$1.ZodNumber;
            outputTokens: z$1.ZodNumber;
            reasoningOutputTokens: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>;
        modelContextWindow: z$1.ZodNullable<z$1.ZodNumber>;
        total: z$1.ZodObject<{
            cachedInputTokens: z$1.ZodNumber;
            inputTokens: z$1.ZodNumber;
            outputTokens: z$1.ZodNumber;
            reasoningOutputTokens: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
    type: z$1.ZodLiteral<"thread/tokenUsage/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    contextWindowUsage: z$1.ZodObject<{
        estimated: z$1.ZodBoolean;
        modelContextWindow: z$1.ZodNullable<z$1.ZodNumber>;
        usedTokens: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/contextWindowUsage/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    explanation: z$1.ZodOptional<z$1.ZodString>;
    plan: z$1.ZodArray<z$1.ZodObject<{
        status: z$1.ZodOptional<z$1.ZodEnum<{
            active: "active";
            completed: "completed";
            failed: "failed";
            pending: "pending";
        }>>;
        step: z$1.ZodString;
    }, z$1.core.$strip>>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/plan/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    diff: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/diff/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    detail: z$1.ZodOptional<z$1.ZodString>;
    errorInfo: z$1.ZodOptional<z$1.ZodObject<{
        category: z$1.ZodEnum<{
            "active-turn-not-steerable": "active-turn-not-steerable";
            "bad-request": "bad-request";
            "budget-exceeded": "budget-exceeded";
            "connection-failed": "connection-failed";
            "context-window-exceeded": "context-window-exceeded";
            "max-output-tokens": "max-output-tokens";
            "max-turns": "max-turns";
            "rate-limit": "rate-limit";
            "stream-disconnected": "stream-disconnected";
            "structured-output-retries": "structured-output-retries";
            "thread-rollback-failed": "thread-rollback-failed";
            "too-many-failed-attempts": "too-many-failed-attempts";
            billing: "billing";
            internal: "internal";
            overloaded: "overloaded";
            policy: "policy";
            sandbox: "sandbox";
            unauthorized: "unauthorized";
            unknown: "unknown";
        }>;
        httpStatusCode: z$1.ZodNullable<z$1.ZodNumber>;
        vendorCode: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    message: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"agent/error">;
    willRetry: z$1.ZodOptional<z$1.ZodBoolean>;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    rateLimits: z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            "spend-control": "spend-control";
            "subscription-window": "subscription-window";
            credits: "credits";
            unknown: "unknown";
        }>;
        overageReason: z$1.ZodNullable<z$1.ZodString>;
        overageStatus: z$1.ZodNullable<z$1.ZodEnum<{
            allowed: "allowed";
            rejected: "rejected";
            unavailable: "unavailable";
            warning: "warning";
        }>>;
        reachedReason: z$1.ZodNullable<z$1.ZodString>;
        routeProviderId: z$1.ZodString;
        status: z$1.ZodEnum<{
            allowed: "allowed";
            blocked: "blocked";
            unknown: "unknown";
            warning: "warning";
        }>;
        windows: z$1.ZodArray<z$1.ZodObject<{
            label: z$1.ZodNullable<z$1.ZodString>;
            resetsAtMs: z$1.ZodNullable<z$1.ZodNumber>;
            status: z$1.ZodEnum<{
                allowed: "allowed";
                blocked: "blocked";
                unknown: "unknown";
                warning: "warning";
            }>;
            vendorKey: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"model/rateLimits/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    category: z$1.ZodEnum<{
        "compaction-skipped": "compaction-skipped";
        config: "config";
        deprecation: "deprecation";
        general: "general";
    }>;
    details: z$1.ZodOptional<z$1.ZodString>;
    summary: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"agent/warning">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    fallbackModel: z$1.ZodString;
    message: z$1.ZodString;
    originalModel: z$1.ZodString;
    reason: z$1.ZodEnum<{
        "model-vendor": "model-vendor";
        refusal: "refusal";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"model/fallback">;
}, z$1.core.$strip>, z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    rawEvent: z$1.ZodObject<{
        id: z$1.ZodOptional<z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodNumber]>>;
        jsonrpc: z$1.ZodLiteral<"2.0">;
        method: z$1.ZodString;
        params: z$1.ZodOptional<z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>>;
    }, z$1.core.$strip>;
    rawType: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"agent/unhandled">;
}, z$1.core.$strip>], "type">, z$1.ZodObject<{
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
}, z$1.core.$strip>>, z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    direction: z$1.ZodLiteral<"outbound">;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/thread/start">;
}, z$1.core.$strip>, z$1.ZodObject<{
    continuationOfRequestId: z$1.ZodOptional<z$1.ZodString>;
    direction: z$1.ZodLiteral<"outbound">;
    execution: z$1.ZodObject<{
        model: z$1.ZodString;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        seq: z$1.ZodOptional<z$1.ZodNumber>;
        source: z$1.ZodEnum<{
            "client/thread/start": "client/thread/start";
            "client/turn/requested": "client/turn/requested";
            "client/turn/start": "client/turn/start";
        }>;
    }, z$1.core.$strict>;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>>>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    requestId: z$1.ZodString;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    systemMessageKind: z$1.ZodOptional<z$1.ZodEnum<{
        "child-completed": "child-completed";
        "child-failed": "child-failed";
        "child-interrupted": "child-interrupted";
        "child-needs-attention": "child-needs-attention";
        "child-outcome-batch": "child-outcome-batch";
        "ownership-assigned": "ownership-assigned";
        "ownership-removed": "ownership-removed";
        unlabeled: "unlabeled";
    }>>;
    systemMessageSubject: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
        threadName: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        count: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"thread-batch">;
    }, z$1.core.$strip>], "kind">>>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread-start">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"new-turn">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"auto">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"steer">;
    }, z$1.core.$strip>], "kind">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/requested">;
}, z$1.core.$strip>, z$1.ZodObject<{
    message: z$1.ZodString;
    reason: z$1.ZodString;
    requestId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/rejected">;
}, z$1.core.$strip>, z$1.ZodObject<{
    direction: z$1.ZodLiteral<"outbound">;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/start">;
}, z$1.core.$strip>, z$1.ZodObject<{
    code: z$1.ZodOptional<z$1.ZodString>;
    detail: z$1.ZodOptional<z$1.ZodString>;
    message: z$1.ZodString;
    reconnectAttempt: z$1.ZodOptional<z$1.ZodNumber>;
    reconnectTotal: z$1.ZodOptional<z$1.ZodNumber>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/error">;
}, z$1.core.$strip>, z$1.ZodObject<{
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    toolCallId: z$1.ZodOptional<z$1.ZodString>;
    turnId: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"system/manager/user_message">;
}, z$1.core.$strip>, z$1.ZodObject<{
    reason: z$1.ZodEnum<{
        "agent-turn-idle": "agent-turn-idle";
        "host-daemon-restarted": "host-daemon-restarted";
        "manual-stop": "manual-stop";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/thread/interrupted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    message: z$1.ZodString;
    metadata: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>>>;
    operation: z$1.ZodString;
    operationId: z$1.ZodString;
    status: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/operation">;
}, z$1.core.$strip>, z$1.ZodObject<{
    interactionId: z$1.ZodString;
    requestId: z$1.ZodString;
    resolution: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">>>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    subject: z$1.ZodObject<{
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"permission_grant">;
        permissions: z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/permissionGrant/lifecycle">;
}, z$1.core.$strip>, z$1.ZodObject<{
    interactionId: z$1.ZodString;
    payload: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    requestId: z$1.ZodString;
    resolution: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>>>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/userQuestion/lifecycle">;
}, z$1.core.$strip>, z$1.ZodObject<{
    entries: z$1.ZodArray<z$1.ZodObject<{
        key: z$1.ZodString;
        metadata: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        startedAt: z$1.ZodOptional<z$1.ZodNumber>;
        status: z$1.ZodOptional<z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            started: "started";
        }>>;
        text: z$1.ZodString;
        type: z$1.ZodEnum<{
            output: "output";
            step: "step";
        }>;
    }, z$1.core.$strip>>;
    environmentId: z$1.ZodString;
    provisioningId: z$1.ZodString;
    status: z$1.ZodEnum<{
        active: "active";
        cancelled: "cancelled";
        completed: "completed";
        failed: "failed";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/thread-provisioning">;
}, z$1.core.$strip>, z$1.ZodObject<{
    activeTurnId: z$1.ZodString;
    activeTurnStartedAt: z$1.ZodNumber;
    agentSessionId: z$1.ZodNullable<z$1.ZodString>;
    elapsedMs: z$1.ZodNumber;
    firedAt: z$1.ZodNumber;
    lastActivityEventAt: z$1.ZodNumber;
    lastActivityEventSequence: z$1.ZodNumber;
    lastActivityEventType: z$1.ZodString;
    reason: z$1.ZodLiteral<"agent-turn-idle">;
    threadId: z$1.ZodString;
    thresholdMs: z$1.ZodNumber;
    type: z$1.ZodLiteral<"system/agent-turn-watchdog">;
}, z$1.core.$strip>], "type">, z$1.ZodObject<{
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
}, z$1.core.$strip>>]>>;
type ThreadEvent = z$1.infer<typeof threadEventSchema>;
type ThreadEventType = ThreadEvent["type"];

declare const threadEventScopeSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    kind: z$1.ZodLiteral<"thread">;
}, z$1.core.$strip>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"turn">;
    turnId: z$1.ZodString;
}, z$1.core.$strip>], "kind">;
type ThreadEventScope = z$1.infer<typeof threadEventScopeSchema>;

type ThreadEventByType = {
    [TType in ThreadEventType]: Extract<ThreadEvent, {
        type: TType;
    }>;
};
type ThreadEventForType<TType extends ThreadEventType> = ThreadEventByType[TType];
type StoredThreadEventDataFromEvent<TEvent extends ThreadEvent> = Omit<TEvent, "scope" | "threadId" | "type">;
interface ThreadEventRowBase {
    id: string;
    scope: ThreadEventScope;
    threadId: string;
    seq: number;
    createdAt: number;
}
type ThreadEventRowFromEvent<TEvent extends ThreadEvent> = ThreadEventRowBase & {
    type: TEvent["type"];
    data: StoredThreadEventDataFromEvent<TEvent>;
};
type ThreadEventRowOfType<TType extends ThreadEventType> = ThreadEventRowFromEvent<ThreadEventForType<TType>>;
type ThreadEventRow = {
    [TType in ThreadEventType]: ThreadEventRowOfType<TType>;
}[ThreadEventType];

declare const threadStatusSchema: z$1.ZodEnum<{
    active: "active";
    error: "error";
    idle: "idle";
    starting: "starting";
    stopping: "stopping";
}>;
type ThreadStatus = z$1.infer<typeof threadStatusSchema>;

declare const threadTimelinePendingTodosSchema: z$1.ZodObject<{
    items: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        status: z$1.ZodEnum<{
            completed: "completed";
            in_progress: "in_progress";
            pending: "pending";
        }>;
        text: z$1.ZodString;
    }, z$1.core.$strip>>;
    sourceSeq: z$1.ZodNumber;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadTimelinePendingTodos = z$1.infer<typeof threadTimelinePendingTodosSchema>;

declare const threadQueuedMessageSchema: z$1.ZodObject<{
    content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    createdAt: z$1.ZodNumber;
    groupWithNext: z$1.ZodBoolean;
    id: z$1.ZodString;
    model: z$1.ZodString;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadQueuedMessage = z$1.infer<typeof threadQueuedMessageSchema>;

declare const createThreadEnvironmentArgsSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    environmentId: z$1.ZodString;
    type: z$1.ZodLiteral<"reuse">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hostId: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"host">;
    workspace: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        branch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"existing">;
            name: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            baseBranch: z$1.ZodString;
            kind: z$1.ZodLiteral<"new">;
        }, z$1.core.$strict>], "kind">>;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"unmanaged">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        baseBranch: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"named">;
            name: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"default">;
        }, z$1.core.$strip>], "kind">;
        type: z$1.ZodLiteral<"managed-worktree">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strip>], "type">;
}, z$1.core.$strip>, z$1.ZodObject<{
    type: z$1.ZodLiteral<"project-default">;
}, z$1.core.$strip>], "type">;
type CreateThreadEnvironmentArgs = z$1.infer<typeof createThreadEnvironmentArgsSchema>;
declare const workspaceFileListResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type WorkspaceFileListResponse = z$1.infer<typeof workspaceFileListResponseSchema>;
declare const workspacePathListResponseSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
        positions: z$1.ZodArray<z$1.ZodNumber>;
        score: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type WorkspacePathListResponse = z$1.infer<typeof workspacePathListResponseSchema>;

declare const createProjectSourceRequestSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    hostId: z$1.ZodString;
    path: z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>;
    type: z$1.ZodLiteral<"local_path">;
}, z$1.core.$strict>, z$1.ZodObject<{
    hostId: z$1.ZodString;
    remoteUrl: z$1.ZodOptional<z$1.ZodString>;
    targetPath: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>>;
    type: z$1.ZodLiteral<"clone">;
}, z$1.core.$strict>], "type">;
type CreateProjectSourceRequest = z$1.infer<typeof createProjectSourceRequestSchema>;
declare const createProjectRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
    source: z$1.ZodObject<{
        hostId: z$1.ZodString;
        path: z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>;
        type: z$1.ZodLiteral<"local_path">;
    }, z$1.core.$strict>;
}, z$1.core.$strip>;
type CreateProjectRequest = z$1.infer<typeof createProjectRequestSchema>;
declare const threadSectionSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    name: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadSectionResponse = z$1.infer<typeof threadSectionSchema>;
declare const createThreadSectionRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
}, z$1.core.$strict>;
type CreateThreadSectionRequest = z$1.infer<typeof createThreadSectionRequestSchema>;
declare const updateThreadSectionRequestSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    name: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateThreadSectionRequest = z$1.infer<typeof updateThreadSectionRequestSchema>;
declare const deleteThreadSectionRequestSchema: z$1.ZodObject<{
    id: z$1.ZodString;
}, z$1.core.$strict>;
type DeleteThreadSectionRequest = z$1.infer<typeof deleteThreadSectionRequestSchema>;
declare const threadSectionMutationResponseSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    name: z$1.ZodString;
    updatedThreadCount: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadSectionMutationResponse = z$1.infer<typeof threadSectionMutationResponseSchema>;
declare const reorderProjectRequestSchema: z$1.ZodObject<{
    nextProjectId: z$1.ZodNullable<z$1.ZodString>;
    previousProjectId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderProjectRequest = z$1.infer<typeof reorderProjectRequestSchema>;
declare const projectListQuerySchema: z$1.ZodObject<{
    include: z$1.ZodOptional<z$1.ZodString>;
    includePersonal: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ProjectListQuery = z$1.infer<typeof projectListQuerySchema>;
declare const projectFilesQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    limit: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    query: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
}, z$1.core.$strip>;
type ProjectFilesQuery = z$1.infer<typeof projectFilesQuerySchema>;
declare const projectPathsQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    query: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
}, z$1.core.$strip>;
type ProjectPathsQuery = z$1.infer<typeof projectPathsQuerySchema>;
declare const projectFileContentQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
}, z$1.core.$strip>;
type ProjectFileContentQuery = z$1.infer<typeof projectFileContentQuerySchema>;
declare const projectBranchesQuerySchema: z$1.ZodObject<{
    hostId: z$1.ZodString;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
    selectedBranch: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ProjectBranchesQuery = z$1.infer<typeof projectBranchesQuerySchema>;
declare const projectBranchesResponseSchema: z$1.ZodObject<{
    branches: z$1.ZodArray<z$1.ZodString>;
    branchesTruncated: z$1.ZodBoolean;
    checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        branchName: z$1.ZodString;
        headSha: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"branch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        headSha: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"detached">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        branchName: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"unborn">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"unknown">;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    defaultBranch: z$1.ZodNullable<z$1.ZodString>;
    defaultBranchRelation: z$1.ZodNullable<z$1.ZodEnum<{
        "local-ahead": "local-ahead";
        "local-behind": "local-behind";
        diverged: "diverged";
        equal: "equal";
        unknown: "unknown";
    }>>;
    defaultWorktreeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
    hasUncommittedChanges: z$1.ZodBoolean;
    operation: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"none">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"merge">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"rebase">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"cherry-pick">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"revert">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"unknown">;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    originDefaultBranch: z$1.ZodNullable<z$1.ZodString>;
    remoteBranches: z$1.ZodArray<z$1.ZodString>;
    remoteBranchesTruncated: z$1.ZodBoolean;
    selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            local: "local";
            missing: "missing";
            remote: "remote";
        }>;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type ProjectBranchesResponse = z$1.infer<typeof projectBranchesResponseSchema>;
declare const promptHistoryQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type PromptHistoryQuery = z$1.infer<typeof promptHistoryQuerySchema>;
declare const promptHistoryResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
}, z$1.core.$strip>>;
type PromptHistoryResponse = z$1.infer<typeof promptHistoryResponseSchema>;
declare const updateProjectRequestSchema: z$1.ZodObject<{
    name: z$1.ZodOptional<z$1.ZodString>;
    sidebarVisibility: z$1.ZodOptional<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strip>;
type UpdateProjectRequest = z$1.infer<typeof updateProjectRequestSchema>;
declare const updateProjectSourceRequestSchema: z$1.ZodObject<{
    isDefault: z$1.ZodOptional<z$1.ZodLiteral<true>>;
    path: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>>;
    type: z$1.ZodLiteral<"local_path">;
}, z$1.core.$strict>;
type UpdateProjectSourceRequest = z$1.infer<typeof updateProjectSourceRequestSchema>;
declare const commandListResponseSchema: z$1.ZodObject<{
    commands: z$1.ZodArray<z$1.ZodObject<{
        argumentHint: z$1.ZodNullable<z$1.ZodString>;
        capabilityId: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodString;
        origin: z$1.ZodEnum<{
            builtin: "builtin";
            project: "project";
            user: "user";
        }>;
        source: z$1.ZodEnum<{
            command: "command";
            skill: "skill";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type CommandListResponse = z$1.infer<typeof commandListResponseSchema>;
/** Query for the complete command catalog available to a project. */
declare const projectCommandsQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type ProjectCommandsQuery = z$1.infer<typeof projectCommandsQuerySchema>;
declare const skillListResponseSchema: z$1.ZodObject<{
    skills: z$1.ZodArray<z$1.ZodObject<{
        capabilityId: z$1.ZodNullable<z$1.ZodString>;
        description: z$1.ZodNullable<z$1.ZodString>;
        filePath: z$1.ZodString;
        id: z$1.ZodString;
        manageable: z$1.ZodBoolean;
        name: z$1.ZodString;
        registrySkillId: z$1.ZodNullable<z$1.ZodString>;
        scope: z$1.ZodEnum<{
            "bb-builtin": "bb-builtin";
            "bb-project": "bb-project";
            "bb-user": "bb-user";
            "pi-project": "pi-project";
            "pi-user": "pi-user";
            "shared-project": "shared-project";
            "shared-user": "shared-user";
            capability: "capability";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type SkillListResponse = z$1.infer<typeof skillListResponseSchema>;
declare const skillContentResponseSchema: z$1.ZodObject<{
    content: z$1.ZodString;
    revision: z$1.ZodString;
}, z$1.core.$strip>;
type SkillContentResponse = z$1.infer<typeof skillContentResponseSchema>;
declare const skillFilesResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodString>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SkillFilesResponse = z$1.infer<typeof skillFilesResponseSchema>;
declare const projectResponseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodEnum<{
        personal: "personal";
        standard: "standard";
    }>;
    name: z$1.ZodString;
    sidebarVisibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
    sources: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        path: z$1.ZodString;
        projectId: z$1.ZodString;
        type: z$1.ZodLiteral<"local_path">;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectResponse = z$1.infer<typeof projectResponseSchema>;
declare const projectWithThreadsResponseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
        model: z$1.ZodString;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
    }, z$1.core.$strict>>;
    gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodEnum<{
        personal: "personal";
        standard: "standard";
    }>;
    name: z$1.ZodString;
    sidebarVisibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
    sources: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        path: z$1.ZodString;
        projectId: z$1.ZodString;
        type: z$1.ZodLiteral<"local_path">;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    threads: z$1.ZodArray<z$1.ZodObject<{
        activity: z$1.ZodObject<{
            activeBackgroundAgentCount: z$1.ZodNumber;
            activeBackgroundCommandCount: z$1.ZodNumber;
            activeGoalCount: z$1.ZodNumber;
            activePlanModeCount: z$1.ZodNumber;
            activeWorkflowCount: z$1.ZodNumber;
        }, z$1.core.$strip>;
        archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
        environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
        environmentHostId: z$1.ZodNullable<z$1.ZodString>;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        environmentName: z$1.ZodNullable<z$1.ZodString>;
        environmentWorkspaceDisplayKind: z$1.ZodEnum<{
            "managed-worktree": "managed-worktree";
            "unmanaged-worktree": "unmanaged-worktree";
            other: "other";
        }>;
        hasPendingInteraction: z$1.ZodBoolean;
        id: z$1.ZodString;
        lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
        latestAttentionAt: z$1.ZodNumber;
        originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
        originKind: z$1.ZodNullable<z$1.ZodEnum<{
            fork: "fork";
        }>>;
        parentThreadId: z$1.ZodNullable<z$1.ZodString>;
        pinSortKey: z$1.ZodNullable<z$1.ZodString>;
        pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
        projectId: z$1.ZodString;
        runtime: z$1.ZodObject<{
            displayStatus: z$1.ZodEnum<{
                "host-reconnecting": "host-reconnecting";
                "waiting-for-host": "waiting-for-host";
                active: "active";
                error: "error";
                idle: "idle";
                provisioning: "provisioning";
                starting: "starting";
                stopping: "stopping";
            }>;
            hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
        }, z$1.core.$strip>;
        sectionId: z$1.ZodNullable<z$1.ZodString>;
        sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
        status: z$1.ZodEnum<{
            active: "active";
            error: "error";
            idle: "idle";
            starting: "starting";
            stopping: "stopping";
        }>;
        title: z$1.ZodNullable<z$1.ZodString>;
        titleFallback: z$1.ZodNullable<z$1.ZodString>;
        updatedAt: z$1.ZodNumber;
        visibility: z$1.ZodEnum<{
            hidden: "hidden";
            visible: "visible";
        }>;
    }, z$1.core.$strict>>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectWithThreadsResponse = z$1.infer<typeof projectWithThreadsResponseSchema>;
declare const sidebarBootstrapResponseSchema: z$1.ZodObject<{
    personalProject: z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
            model: z$1.ZodString;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strict>>;
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            personal: "personal";
            standard: "standard";
        }>;
        name: z$1.ZodString;
        sidebarVisibility: z$1.ZodEnum<{
            hidden: "hidden";
            visible: "visible";
        }>;
        sources: z$1.ZodArray<z$1.ZodObject<{
            createdAt: z$1.ZodNumber;
            hostId: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            path: z$1.ZodString;
            projectId: z$1.ZodString;
            type: z$1.ZodLiteral<"local_path">;
            updatedAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        threads: z$1.ZodArray<z$1.ZodObject<{
            activity: z$1.ZodObject<{
                activeBackgroundAgentCount: z$1.ZodNumber;
                activeBackgroundCommandCount: z$1.ZodNumber;
                activeGoalCount: z$1.ZodNumber;
                activePlanModeCount: z$1.ZodNumber;
                activeWorkflowCount: z$1.ZodNumber;
            }, z$1.core.$strip>;
            archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
            createdAt: z$1.ZodNumber;
            deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
            environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
            environmentHostId: z$1.ZodNullable<z$1.ZodString>;
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            environmentName: z$1.ZodNullable<z$1.ZodString>;
            environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                "unmanaged-worktree": "unmanaged-worktree";
                other: "other";
            }>;
            hasPendingInteraction: z$1.ZodBoolean;
            id: z$1.ZodString;
            lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
            latestAttentionAt: z$1.ZodNumber;
            originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
            originKind: z$1.ZodNullable<z$1.ZodEnum<{
                fork: "fork";
            }>>;
            parentThreadId: z$1.ZodNullable<z$1.ZodString>;
            pinSortKey: z$1.ZodNullable<z$1.ZodString>;
            pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
            projectId: z$1.ZodString;
            runtime: z$1.ZodObject<{
                displayStatus: z$1.ZodEnum<{
                    "host-reconnecting": "host-reconnecting";
                    "waiting-for-host": "waiting-for-host";
                    active: "active";
                    error: "error";
                    idle: "idle";
                    provisioning: "provisioning";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
            }, z$1.core.$strip>;
            sectionId: z$1.ZodNullable<z$1.ZodString>;
            sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                active: "active";
                error: "error";
                idle: "idle";
                starting: "starting";
                stopping: "stopping";
            }>;
            title: z$1.ZodNullable<z$1.ZodString>;
            titleFallback: z$1.ZodNullable<z$1.ZodString>;
            updatedAt: z$1.ZodNumber;
            visibility: z$1.ZodEnum<{
                hidden: "hidden";
                visible: "visible";
            }>;
        }, z$1.core.$strict>>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>;
    projects: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
            model: z$1.ZodString;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strict>>;
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            personal: "personal";
            standard: "standard";
        }>;
        name: z$1.ZodString;
        sidebarVisibility: z$1.ZodEnum<{
            hidden: "hidden";
            visible: "visible";
        }>;
        sources: z$1.ZodArray<z$1.ZodObject<{
            createdAt: z$1.ZodNumber;
            hostId: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            path: z$1.ZodString;
            projectId: z$1.ZodString;
            type: z$1.ZodLiteral<"local_path">;
            updatedAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        threads: z$1.ZodArray<z$1.ZodObject<{
            activity: z$1.ZodObject<{
                activeBackgroundAgentCount: z$1.ZodNumber;
                activeBackgroundCommandCount: z$1.ZodNumber;
                activeGoalCount: z$1.ZodNumber;
                activePlanModeCount: z$1.ZodNumber;
                activeWorkflowCount: z$1.ZodNumber;
            }, z$1.core.$strip>;
            archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
            createdAt: z$1.ZodNumber;
            deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
            environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
            environmentHostId: z$1.ZodNullable<z$1.ZodString>;
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            environmentName: z$1.ZodNullable<z$1.ZodString>;
            environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                "unmanaged-worktree": "unmanaged-worktree";
                other: "other";
            }>;
            hasPendingInteraction: z$1.ZodBoolean;
            id: z$1.ZodString;
            lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
            latestAttentionAt: z$1.ZodNumber;
            originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
            originKind: z$1.ZodNullable<z$1.ZodEnum<{
                fork: "fork";
            }>>;
            parentThreadId: z$1.ZodNullable<z$1.ZodString>;
            pinSortKey: z$1.ZodNullable<z$1.ZodString>;
            pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
            projectId: z$1.ZodString;
            runtime: z$1.ZodObject<{
                displayStatus: z$1.ZodEnum<{
                    "host-reconnecting": "host-reconnecting";
                    "waiting-for-host": "waiting-for-host";
                    active: "active";
                    error: "error";
                    idle: "idle";
                    provisioning: "provisioning";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
            }, z$1.core.$strip>;
            sectionId: z$1.ZodNullable<z$1.ZodString>;
            sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                active: "active";
                error: "error";
                idle: "idle";
                starting: "starting";
                stopping: "stopping";
            }>;
            title: z$1.ZodNullable<z$1.ZodString>;
            titleFallback: z$1.ZodNullable<z$1.ZodString>;
            updatedAt: z$1.ZodNumber;
            visibility: z$1.ZodEnum<{
                hidden: "hidden";
                visible: "visible";
            }>;
        }, z$1.core.$strict>>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    sections: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        id: z$1.ZodString;
        name: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>;
type SidebarBootstrapResponse = z$1.infer<typeof sidebarBootstrapResponseSchema>;
declare const uploadedPromptAttachmentSchema: z$1.ZodObject<{
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    name: z$1.ZodString;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodNumber;
    type: z$1.ZodEnum<{
        localFile: "localFile";
        localImage: "localImage";
    }>;
}, z$1.core.$strip>;
type UploadedPromptAttachment = z$1.infer<typeof uploadedPromptAttachmentSchema>;
declare const copyProjectAttachmentsRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodString>;
    sourceProjectId: z$1.ZodString;
}, z$1.core.$strict>;
type CopyProjectAttachmentsRequest = z$1.infer<typeof copyProjectAttachmentsRequestSchema>;

declare const registrySkillSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    installUrl: z$1.ZodNullable<z$1.ZodString>;
    installs: z$1.ZodNumber;
    name: z$1.ZodString;
    skillId: z$1.ZodString;
    source: z$1.ZodString;
    stars: z$1.ZodNullable<z$1.ZodNumber>;
    summary: z$1.ZodNullable<z$1.ZodString>;
    topic: z$1.ZodNullable<z$1.ZodString>;
    url: z$1.ZodString;
}, z$1.core.$strip>;
type RegistrySkill = z$1.infer<typeof registrySkillSchema>;
declare const registrySkillsPageSchema: z$1.ZodObject<{
    pagination: z$1.ZodObject<{
        hasMore: z$1.ZodBoolean;
        page: z$1.ZodNumber;
        perPage: z$1.ZodNumber;
        total: z$1.ZodNumber;
    }, z$1.core.$strip>;
    ranking: z$1.ZodEnum<{
        "all-time": "all-time";
        trending: "trending";
    }>;
    skills: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        installUrl: z$1.ZodNullable<z$1.ZodString>;
        installs: z$1.ZodNumber;
        name: z$1.ZodString;
        skillId: z$1.ZodString;
        source: z$1.ZodString;
        stars: z$1.ZodNullable<z$1.ZodNumber>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        topic: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type RegistrySkillsPage = z$1.infer<typeof registrySkillsPageSchema>;
declare const registryRepositoryStarsSchema: z$1.ZodObject<{
    stars: z$1.ZodNumber;
}, z$1.core.$strip>;
type RegistryRepositoryStars = z$1.infer<typeof registryRepositoryStarsSchema>;
declare const registrySkillDetailSchema: z$1.ZodObject<{
    files: z$1.ZodNullable<z$1.ZodArray<z$1.ZodObject<{
        contents: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>>;
    hash: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    skillId: z$1.ZodString;
    source: z$1.ZodString;
}, z$1.core.$strip>;
type RegistrySkillDetail = z$1.infer<typeof registrySkillDetailSchema>;
/**
 * Entries that could not be resolved (dead detail page, malformed id) are
 * omitted rather than failing the batch: each entry is independent upstream,
 * and callers already treat a missing entry as "unknown" per card.
 */
declare const registrySkillEntriesResponseSchema: z$1.ZodObject<{
    entries: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        installUrl: z$1.ZodNullable<z$1.ZodString>;
        installs: z$1.ZodNumber;
        name: z$1.ZodString;
        skillId: z$1.ZodString;
        source: z$1.ZodString;
        stars: z$1.ZodNullable<z$1.ZodNumber>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        topic: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type RegistrySkillEntriesResponse = z$1.infer<typeof registrySkillEntriesResponseSchema>;
declare const registrySkillInstallResponseSchema: z$1.ZodObject<{
    filePath: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type RegistrySkillInstallResponse = z$1.infer<typeof registrySkillInstallResponseSchema>;

declare const updateEnvironmentRequestSchema: z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    name: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
}, z$1.core.$strip>;
type UpdateEnvironmentRequest = z$1.infer<typeof updateEnvironmentRequestSchema>;
/**
 * Query for searching paths in an environment's workspace. Unlike the
 * project-scoped variant this needs no `environmentId` — the environment is
 * the route param — and is project-agnostic, so it works for projectless
 * (personal) environments too.
 */
declare const environmentPathsQuerySchema: z$1.ZodObject<{
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type EnvironmentPathsQuery = z$1.infer<typeof environmentPathsQuerySchema>;
declare const environmentDiffBranchesQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
    selectedBranch: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type EnvironmentDiffBranchesQuery = z$1.infer<typeof environmentDiffBranchesQuerySchema>;
declare const environmentDiffBranchesResponseSchema: z$1.ZodObject<{
    branches: z$1.ZodArray<z$1.ZodString>;
    branchesTruncated: z$1.ZodBoolean;
    remoteBranches: z$1.ZodArray<z$1.ZodString>;
    remoteBranchesTruncated: z$1.ZodBoolean;
    selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            local: "local";
            missing: "missing";
            remote: "remote";
        }>;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type EnvironmentDiffBranchesResponse = z$1.infer<typeof environmentDiffBranchesResponseSchema>;
declare const environmentStatusQuerySchema: z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodString>>;
}, z$1.core.$strip>;
type EnvironmentStatusQuery = z$1.infer<typeof environmentStatusQuerySchema>;
declare const environmentDiffQuerySchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    target: z$1.ZodLiteral<"uncommitted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodPipe<z$1.ZodString, z$1.ZodString>;
    target: z$1.ZodLiteral<"branch_committed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodPipe<z$1.ZodString, z$1.ZodString>;
    target: z$1.ZodLiteral<"all">;
}, z$1.core.$strip>, z$1.ZodObject<{
    sha: z$1.ZodString;
    target: z$1.ZodLiteral<"commit">;
}, z$1.core.$strip>], "target">;
type EnvironmentDiffQuery = z$1.infer<typeof environmentDiffQuerySchema>;
/**
 * Query for fetching a single file's contents at one side of a diff target.
 * Used by the diff card to reparse the card's patch with full old/new contents
 * so `@pierre/diffs` can render expand-context buttons between hunks.
 *
 * For `branch_committed` / `all`, callers pass the resolved merge-base SHA
 * (`mergeBaseRef`, surfaced by `workspace.diff`) rather than the branch name
 * — the diff itself was computed against that SHA, so reading the old side
 * from the same SHA keeps the file content aligned with the hunk line
 * numbers. Reading from the branch tip is wrong whenever the branch has
 * moved past the merge-base since the file existed there.
 */
declare const environmentDiffFileQuerySchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"uncommitted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseRef: z$1.ZodString;
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"branch_committed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseRef: z$1.ZodString;
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"all">;
}, z$1.core.$strip>, z$1.ZodObject<{
    path: z$1.ZodString;
    sha: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"commit">;
}, z$1.core.$strip>], "target">;
type EnvironmentDiffFileQuery = z$1.infer<typeof environmentDiffFileQuerySchema>;
declare const environmentDiffFileResponseSchema: z$1.ZodObject<{
    content: z$1.ZodString;
    contentEncoding: z$1.ZodEnum<{
        base64: "base64";
        utf8: "utf8";
    }>;
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodNumber;
}, z$1.core.$strip>;
type EnvironmentDiffFileResponse = z$1.infer<typeof environmentDiffFileResponseSchema>;
declare const environmentArchiveThreadsResponseSchema: z$1.ZodObject<{
    archivedThreadIds: z$1.ZodArray<z$1.ZodString>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type EnvironmentArchiveThreadsResponse = z$1.infer<typeof environmentArchiveThreadsResponseSchema>;
declare const pullRequestMergeMethodSchema: z$1.ZodEnum<{
    merge: "merge";
    rebase: "rebase";
    squash: "squash";
}>;
type PullRequestMergeMethod = z$1.infer<typeof pullRequestMergeMethodSchema>;
declare const commitActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"commit">;
    commitSha: z$1.ZodString;
    commitSubject: z$1.ZodString;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type CommitActionResponse = z$1.infer<typeof commitActionResponseSchema>;
declare const squashMergeActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"squash_merge">;
    commitSha: z$1.ZodString;
    commitSubject: z$1.ZodString;
    merged: z$1.ZodBoolean;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type SquashMergeActionResponse = z$1.infer<typeof squashMergeActionResponseSchema>;
declare const pullRequestReadyActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_ready">;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestReadyActionResponse = z$1.infer<typeof pullRequestReadyActionResponseSchema>;
declare const pullRequestMergeActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_merge">;
    message: z$1.ZodString;
    method: z$1.ZodEnum<{
        merge: "merge";
        rebase: "rebase";
        squash: "squash";
    }>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestMergeActionResponse = z$1.infer<typeof pullRequestMergeActionResponseSchema>;
declare const pullRequestDraftActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_draft">;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestDraftActionResponse = z$1.infer<typeof pullRequestDraftActionResponseSchema>;
declare const environmentStatusResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    workspace: z$1.ZodObject<{
        branch: z$1.ZodObject<{
            currentBranch: z$1.ZodNullable<z$1.ZodString>;
            defaultBranch: z$1.ZodString;
        }, z$1.core.$strip>;
        checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branchName: z$1.ZodString;
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"branch">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"detached">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            branchName: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"unborn">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        mergeBase: z$1.ZodNullable<z$1.ZodObject<{
            aheadCount: z$1.ZodNumber;
            baseRef: z$1.ZodNullable<z$1.ZodString>;
            behindCount: z$1.ZodNumber;
            commits: z$1.ZodArray<z$1.ZodObject<{
                authorName: z$1.ZodString;
                authoredAt: z$1.ZodNumber;
                sha: z$1.ZodString;
                shortSha: z$1.ZodString;
                subject: z$1.ZodString;
            }, z$1.core.$strip>>;
            deletions: z$1.ZodNumber;
            files: z$1.ZodArray<z$1.ZodObject<{
                deletions: z$1.ZodNullable<z$1.ZodNumber>;
                insertions: z$1.ZodNullable<z$1.ZodNumber>;
                path: z$1.ZodString;
                status: z$1.ZodEnum<{
                    "?": "?";
                    "??": "??";
                    A: "A";
                    C: "C";
                    D: "D";
                    M: "M";
                    R: "R";
                    U: "U";
                }>;
            }, z$1.core.$strip>>;
            hasCommittedUnmergedChanges: z$1.ZodBoolean;
            insertions: z$1.ZodNumber;
            lineStatsComplete: z$1.ZodBoolean;
            mergeBaseBranch: z$1.ZodString;
        }, z$1.core.$strip>>;
        workingTree: z$1.ZodObject<{
            deletions: z$1.ZodNumber;
            files: z$1.ZodArray<z$1.ZodObject<{
                deletions: z$1.ZodNullable<z$1.ZodNumber>;
                insertions: z$1.ZodNullable<z$1.ZodNumber>;
                path: z$1.ZodString;
                status: z$1.ZodEnum<{
                    "?": "?";
                    "??": "??";
                    A: "A";
                    C: "C";
                    D: "D";
                    M: "M";
                    R: "R";
                    U: "U";
                }>;
            }, z$1.core.$strip>>;
            hasUncommittedChanges: z$1.ZodBoolean;
            insertions: z$1.ZodNumber;
            lineStatsComplete: z$1.ZodBoolean;
            state: z$1.ZodEnum<{
                clean: "clean";
                committed_unmerged: "committed_unmerged";
                dirty_and_committed_unmerged: "dirty_and_committed_unmerged";
                dirty_uncommitted: "dirty_uncommitted";
                untracked: "untracked";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            not_worktree: "not_worktree";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
/**
 * Structured pull-request lookup outcome. "absent" is a real answer — the
 * host checked and the branch has no PR (non-git environments resolve to
 * "absent" without a daemon call). "unavailable" means the lookup itself
 * failed (gh missing, not authenticated, timeout, unreachable workspace), so
 * callers must not render it as "no PR exists".
 */
declare const environmentPullRequestResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    pullRequest: z$1.ZodObject<{
        attention: z$1.ZodEnum<{
            blocked: "blocked";
            changes_requested: "changes_requested";
            checks_failed: "checks_failed";
            checks_pending: "checks_pending";
            closed: "closed";
            conflicts: "conflicts";
            draft: "draft";
            merged: "merged";
            none: "none";
            ready_to_merge: "ready_to_merge";
            review_requested: "review_requested";
        }>;
        baseRefName: z$1.ZodString;
        checks: z$1.ZodObject<{
            failedCount: z$1.ZodNumber;
            passedCount: z$1.ZodNumber;
            pendingCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                failing: "failing";
                no_checks: "no_checks";
                passing: "passing";
                pending: "pending";
                unknown: "unknown";
            }>;
            totalCount: z$1.ZodNumber;
        }, z$1.core.$strict>;
        headRefName: z$1.ZodString;
        mergeability: z$1.ZodObject<{
            mergeStateStatus: z$1.ZodNullable<z$1.ZodEnum<{
                BEHIND: "BEHIND";
                BLOCKED: "BLOCKED";
                CLEAN: "CLEAN";
                DIRTY: "DIRTY";
                DRAFT: "DRAFT";
                HAS_HOOKS: "HAS_HOOKS";
                UNKNOWN: "UNKNOWN";
                UNSTABLE: "UNSTABLE";
            }>>;
            mergeable: z$1.ZodNullable<z$1.ZodEnum<{
                CONFLICTING: "CONFLICTING";
                MERGEABLE: "MERGEABLE";
                UNKNOWN: "UNKNOWN";
            }>>;
            state: z$1.ZodEnum<{
                blocked: "blocked";
                conflicts: "conflicts";
                draft: "draft";
                mergeable: "mergeable";
                unknown: "unknown";
            }>;
        }, z$1.core.$strict>;
        number: z$1.ZodNumber;
        review: z$1.ZodObject<{
            reviewRequestCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                approved: "approved";
                changes_requested: "changes_requested";
                none: "none";
                review_requested: "review_requested";
                review_required: "review_required";
            }>;
        }, z$1.core.$strict>;
        state: z$1.ZodEnum<{
            closed: "closed";
            draft: "draft";
            merged: "merged";
            open: "open";
        }>;
        title: z$1.ZodString;
        updatedAt: z$1.ZodString;
        url: z$1.ZodString;
    }, z$1.core.$strict>;
}, z$1.core.$strict>, z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"absent">;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentPullRequestResponse = z$1.infer<typeof environmentPullRequestResponseSchema>;
declare const environmentDiffResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    diff: z$1.ZodObject<{
        diff: z$1.ZodString;
        files: z$1.ZodString;
        mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
        shortstat: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    outcome: z$1.ZodLiteral<"available">;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            not_worktree: "not_worktree";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffResponse = z$1.infer<typeof environmentDiffResponseSchema>;
declare const environmentDiffFilesResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        additions: z$1.ZodNumber;
        binary: z$1.ZodBoolean;
        changeKind: z$1.ZodEnum<{
            added: "added";
            copied: "copied";
            deleted: "deleted";
            modified: "modified";
            renamed: "renamed";
            type_changed: "type_changed";
        }>;
        deletions: z$1.ZodNumber;
        loadMode: z$1.ZodEnum<{
            auto: "auto";
            on_demand: "on_demand";
            too_large: "too_large";
        }>;
        origin: z$1.ZodEnum<{
            tracked: "tracked";
            untracked: "untracked";
        }>;
        path: z$1.ZodString;
        previousPath: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    initialPatches: z$1.ZodArray<z$1.ZodObject<{
        patch: z$1.ZodString;
        path: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>>;
    mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
    outcome: z$1.ZodLiteral<"available">;
    shortstat: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            not_worktree: "not_worktree";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffFilesResponse = z$1.infer<typeof environmentDiffFilesResponseSchema>;
declare const environmentDiffPatchResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    patches: z$1.ZodArray<z$1.ZodObject<{
        patch: z$1.ZodString;
        path: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>>;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            not_worktree: "not_worktree";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffPatchResponse = z$1.infer<typeof environmentDiffPatchResponseSchema>;
/**
 * Body for `POST /diff/patch`: the diff target plus the list of new paths whose
 * patches the client wants. A POST (not GET) because the repeated `paths` array
 * cannot survive flat query parsing. The client supplies only new paths; the
 * server re-derives each file's rename/copy pairing (`previousPath`) from its
 * own TOC.
 */
declare const environmentDiffPatchRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodString>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        type: z$1.ZodLiteral<"uncommitted">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mergeBaseBranch: z$1.ZodString;
        type: z$1.ZodLiteral<"branch_committed">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mergeBaseBranch: z$1.ZodString;
        type: z$1.ZodLiteral<"all">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        sha: z$1.ZodString;
        type: z$1.ZodLiteral<"commit">;
    }, z$1.core.$strip>], "type">;
}, z$1.core.$strict>;
type EnvironmentDiffPatchRequest = z$1.infer<typeof environmentDiffPatchRequestSchema>;
type EnvironmentStatusResponse = z$1.infer<typeof environmentStatusResponseSchema>;

type HostDaemonCommandTransport = "onlineRpc" | "settled";
type HostDaemonCommandEnvironmentLane = "read" | "write";
type HostDaemonFlushEventsBeforeResult = boolean | "when-initiated";
interface HostDaemonCommandDescriptor<Type extends string, Schema extends z$1.ZodTypeAny, ResultSchema extends z$1.ZodTypeAny, Transport extends HostDaemonCommandTransport, Retryable extends boolean> {
    type: Type;
    schema: Schema;
    resultSchema: ResultSchema;
    transport: Transport;
    retryable: Retryable;
    flushEventsBeforeResult: HostDaemonFlushEventsBeforeResult;
    envLane: HostDaemonCommandEnvironmentLane | null;
}
declare const hostDaemonCommandRegistry: {
    "thread.rewind.discard": HostDaemonCommandDescriptor<"thread.rewind.discard", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        leaseId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.rewind.discard">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "thread.rewind.prepare": HostDaemonCommandDescriptor<"thread.rewind.prepare", z$1.ZodObject<{
        disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        dynamicTools: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            inputSchema: z$1.ZodUnknown;
            name: z$1.ZodString;
        }, z$1.core.$strip>>;
        environmentId: z$1.ZodString;
        injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            description: z$1.ZodString;
            entryPath: z$1.ZodString;
            kind: z$1.ZodLiteral<"tree">;
            name: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "data-dir": "data-dir";
                builtin: "builtin";
            }>;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"workspace-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodLiteral<"project">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "shared-project": "shared-project";
                "shared-user": "shared-user";
            }>;
        }, z$1.core.$strict>], "kind">>;
        instructionMode: z$1.ZodEnum<{
            append: "append";
            replace: "replace";
        }>;
        instructions: z$1.ZodString;
        leaseId: z$1.ZodString;
        options: z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            model: z$1.ZodString;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strict>;
        projectId: z$1.ZodString;
        retainThroughCheckpointId: z$1.ZodString;
        sourceAgentSessionId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.rewind.prepare">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        agentSessionId: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "thread.start": HostDaemonCommandDescriptor<"thread.start", z$1.ZodObject<{
        capabilityProjection: z$1.ZodObject<{
            entries: z$1.ZodArray<z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                card: z$1.ZodObject<{
                    description: z$1.ZodString;
                    id: z$1.ZodString;
                    name: z$1.ZodString;
                }, z$1.core.$strict>;
                cli: z$1.ZodNullable<z$1.ZodObject<{
                    commands: z$1.ZodArray<z$1.ZodObject<{
                        name: z$1.ZodString;
                        summary: z$1.ZodString;
                        usage: z$1.ZodString;
                    }, z$1.core.$strict>>;
                    name: z$1.ZodString;
                    summary: z$1.ZodString;
                }, z$1.core.$strict>>;
                generation: z$1.ZodString;
                operations: z$1.ZodArray<z$1.ZodObject<{
                    description: z$1.ZodString;
                    name: z$1.ZodString;
                }, z$1.core.$strict>>;
                skills: z$1.ZodArray<z$1.ZodObject<{
                    description: z$1.ZodString;
                    entryPath: z$1.ZodString;
                    id: z$1.ZodString;
                    name: z$1.ZodString;
                    treeHash: z$1.ZodString;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strict>;
        disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        dynamicTools: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            inputSchema: z$1.ZodUnknown;
            name: z$1.ZodString;
        }, z$1.core.$strip>>;
        environmentId: z$1.ZodString;
        fork: z$1.ZodOptional<z$1.ZodObject<{
            sourceAgentSessionId: z$1.ZodString;
        }, z$1.core.$strip>>;
        injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            description: z$1.ZodString;
            entryPath: z$1.ZodString;
            kind: z$1.ZodLiteral<"tree">;
            name: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "data-dir": "data-dir";
                builtin: "builtin";
            }>;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"workspace-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodLiteral<"project">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "shared-project": "shared-project";
                "shared-user": "shared-user";
            }>;
        }, z$1.core.$strict>], "kind">>;
        input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    capabilityId: z$1.ZodString;
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"capability">;
                    label: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    capabilityId: z$1.ZodString;
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"capability">;
                    label: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>>>;
        instructionMode: z$1.ZodEnum<{
            append: "append";
            replace: "replace";
        }>;
        instructions: z$1.ZodString;
        options: z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            model: z$1.ZodString;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strict>;
        projectId: z$1.ZodString;
        requestId: z$1.ZodString;
        threadId: z$1.ZodString;
        threadStoragePath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"thread.start">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        agentSessionId: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "turn.submit": HostDaemonCommandDescriptor<"turn.submit", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    capabilityId: z$1.ZodString;
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"capability">;
                    label: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    capabilityId: z$1.ZodString;
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"capability">;
                    label: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>>>;
        options: z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            model: z$1.ZodString;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strict>;
        requestId: z$1.ZodString;
        resumeContext: z$1.ZodObject<{
            agentSessionId: z$1.ZodString;
            disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            dynamicTools: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                inputSchema: z$1.ZodUnknown;
                name: z$1.ZodString;
            }, z$1.core.$strip>>;
            injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                description: z$1.ZodString;
                entryPath: z$1.ZodString;
                kind: z$1.ZodLiteral<"tree">;
                name: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "data-dir": "data-dir";
                    builtin: "builtin";
                }>;
                treeHash: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"workspace-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodLiteral<"project">;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"host-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "shared-project": "shared-project";
                    "shared-user": "shared-user";
                }>;
            }, z$1.core.$strict>], "kind">>;
            instructionMode: z$1.ZodEnum<{
                append: "append";
                replace: "replace";
            }>;
            instructions: z$1.ZodString;
            projectId: z$1.ZodString;
            workspaceContext: z$1.ZodObject<{
                workspacePath: z$1.ZodString;
                workspaceProvisionType: z$1.ZodEnum<{
                    "managed-worktree": "managed-worktree";
                    personal: "personal";
                    unmanaged: "unmanaged";
                }>;
            }, z$1.core.$strip>;
        }, z$1.core.$strict>;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mode: z$1.ZodLiteral<"start">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
            mode: z$1.ZodLiteral<"auto">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
            mode: z$1.ZodLiteral<"steer">;
        }, z$1.core.$strip>], "mode">;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"turn.submit">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        appliedAs: z$1.ZodEnum<{
            "new-turn": "new-turn";
            steer: "steer";
        }>;
    }, z$1.core.$strip>, "settled", false>;
    "thread.stop": HostDaemonCommandDescriptor<"thread.stop", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        intent: z$1.ZodEnum<{
            interrupt: "interrupt";
            release: "release";
        }>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.stop">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        checkpointId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, "settled", false>;
    "thread.latest_model_input": HostDaemonCommandDescriptor<"thread.latest_model_input", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.latest_model_input">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        call: z$1.ZodNullable<z$1.ZodObject<{
            dispatchedAt: z$1.ZodNumber;
            loadedContext: z$1.ZodObject<{
                files: z$1.ZodArray<z$1.ZodObject<{
                    path: z$1.ZodString;
                }, z$1.core.$strict>>;
                skills: z$1.ZodArray<z$1.ZodObject<{
                    description: z$1.ZodString;
                    name: z$1.ZodString;
                    path: z$1.ZodString;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
            messages: z$1.ZodArray<z$1.ZodObject<{
                role: z$1.ZodString;
                text: z$1.ZodString;
            }, z$1.core.$strict>>;
            model: z$1.ZodNullable<z$1.ZodString>;
            systemPrompt: z$1.ZodString;
            tools: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                name: z$1.ZodString;
            }, z$1.core.$strict>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "interactive.resolve": HostDaemonCommandDescriptor<"interactive.resolve", z$1.ZodObject<{
        agentSessionId: z$1.ZodString;
        environmentId: z$1.ZodString;
        interactionId: z$1.ZodString;
        requestId: z$1.ZodString;
        resolution: z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_once">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_for_session">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"deny">;
        }, z$1.core.$strip>], "decision">, z$1.ZodObject<{
            answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
                freeText: z$1.ZodOptional<z$1.ZodString>;
                selected: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            kind: z$1.ZodLiteral<"user_answer">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"capability_submitted">;
        }, z$1.core.$strip>]>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"interactive.resolve">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "pi.structured_inference": HostDaemonCommandDescriptor<"pi.structured_inference", z$1.ZodObject<{
        cwd: z$1.ZodOptional<z$1.ZodString>;
        model: z$1.ZodString;
        outputSchema: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
        prompt: z$1.ZodString;
        timeoutMs: z$1.ZodNumber;
        type: z$1.ZodLiteral<"pi.structured_inference">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        value: z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>;
    }, z$1.core.$strict>, "settled", false>;
    "environment.provision": HostDaemonCommandDescriptor<"environment.provision", z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        checkout: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"existing">;
            name: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            baseBranch: z$1.ZodString;
            kind: z$1.ZodLiteral<"new">;
            name: z$1.ZodString;
        }, z$1.core.$strict>], "kind">>;
        environmentId: z$1.ZodString;
        initiator: z$1.ZodNullable<z$1.ZodObject<{
            provisioningId: z$1.ZodString;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.provision">;
        workspaceProvisionType: z$1.ZodLiteral<"unmanaged">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        baseBranch: z$1.ZodNullable<z$1.ZodString>;
        branchName: z$1.ZodString;
        environmentId: z$1.ZodString;
        initiator: z$1.ZodNullable<z$1.ZodObject<{
            provisioningId: z$1.ZodString;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>>;
        setupTimeoutMs: z$1.ZodNumber;
        sourcePath: z$1.ZodString;
        targetPath: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.provision">;
        workspaceProvisionType: z$1.ZodLiteral<"managed-worktree">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        initiator: z$1.ZodNullable<z$1.ZodObject<{
            provisioningId: z$1.ZodString;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>>;
        targetPath: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.provision">;
        workspaceProvisionType: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strict>], "workspaceProvisionType">, z$1.ZodObject<{
        branchName: z$1.ZodNullable<z$1.ZodString>;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        isGitRepo: z$1.ZodBoolean;
        isWorktree: z$1.ZodBoolean;
        path: z$1.ZodString;
        transcript: z$1.ZodArray<z$1.ZodObject<{
            key: z$1.ZodString;
            metadata: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
            startedAt: z$1.ZodOptional<z$1.ZodNumber>;
            status: z$1.ZodOptional<z$1.ZodEnum<{
                completed: "completed";
                failed: "failed";
                started: "started";
            }>>;
            text: z$1.ZodString;
            type: z$1.ZodEnum<{
                output: "output";
                step: "step";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "settled", false>;
    "project.clone": HostDaemonCommandDescriptor<"project.clone", z$1.ZodObject<{
        projectSlug: z$1.ZodString;
        remoteUrl: z$1.ZodString;
        targetPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"project.clone">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strict>, "settled", false>;
    "environment.provision.cancel": HostDaemonCommandDescriptor<"environment.provision.cancel", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.provision.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        aborted: z$1.ZodBoolean;
    }, z$1.core.$strip>, "settled", false>;
    "environment.destroy": HostDaemonCommandDescriptor<"environment.destroy", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.destroy">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "workspace.commit": HostDaemonCommandDescriptor<"workspace.commit", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        message: z$1.ZodString;
        type: z$1.ZodLiteral<"workspace.commit">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        commitSha: z$1.ZodString;
        commitSubject: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "workspace.squash_merge": HostDaemonCommandDescriptor<"workspace.squash_merge", z$1.ZodObject<{
        commitMessage: z$1.ZodString;
        environmentId: z$1.ZodString;
        targetBranch: z$1.ZodString;
        type: z$1.ZodLiteral<"workspace.squash_merge">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        commitSha: z$1.ZodString;
        commitSubject: z$1.ZodString;
        merged: z$1.ZodBoolean;
    }, z$1.core.$strip>, "settled", false>;
    "workspace.pull_request_action": HostDaemonCommandDescriptor<"workspace.pull_request_action", z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        environmentId: z$1.ZodString;
        operation: z$1.ZodLiteral<"ready">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        operation: z$1.ZodLiteral<"draft">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        method: z$1.ZodEnum<{
            merge: "merge";
            rebase: "rebase";
            squash: "squash";
        }>;
        operation: z$1.ZodLiteral<"merge">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>], "operation">, z$1.ZodObject<{}, z$1.core.$strict>, "settled", false>;
    "host.list_files": HostDaemonCommandDescriptor<"host.list_files", z$1.ZodObject<{
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.list_files">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        files: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.list_paths": HostDaemonCommandDescriptor<"host.list_paths", z$1.ZodObject<{
        includeDirectories: z$1.ZodBoolean;
        includeFiles: z$1.ZodBoolean;
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.list_paths">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        paths: z$1.ZodArray<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            name: z$1.ZodString;
            path: z$1.ZodString;
            positions: z$1.ZodArray<z$1.ZodNumber>;
            score: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.mkdir": HostDaemonCommandDescriptor<"host.mkdir", z$1.ZodObject<{
        path: z$1.ZodString;
        recursive: z$1.ZodBoolean;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.mkdir">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.move_path": HostDaemonCommandDescriptor<"host.move_path", z$1.ZodObject<{
        destinationPath: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        sourcePath: z$1.ZodString;
        type: z$1.ZodLiteral<"host.move_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.remove_path": HostDaemonCommandDescriptor<"host.remove_path", z$1.ZodObject<{
        path: z$1.ZodString;
        recursive: z$1.ZodBoolean;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.remove_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.browse_directory": HostDaemonCommandDescriptor<"host.browse_directory", z$1.ZodObject<{
        path: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.browse_directory">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        directory: z$1.ZodString;
        entries: z$1.ZodArray<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        parent: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.paths_exist": HostDaemonCommandDescriptor<"host.paths_exist", z$1.ZodObject<{
        paths: z$1.ZodPipe<z$1.ZodArray<z$1.ZodString>, z$1.ZodTransform<string[], string[]>>;
        type: z$1.ZodLiteral<"host.paths_exist">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        existence: z$1.ZodRecord<z$1.ZodString, z$1.ZodBoolean>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "project.inspect": HostDaemonCommandDescriptor<"project.inspect", z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"project.inspect">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "project.clone_default_path": HostDaemonCommandDescriptor<"project.clone_default_path", z$1.ZodObject<{
        projectSlug: z$1.ZodString;
        type: z$1.ZodLiteral<"project.clone_default_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        path: z$1.ZodString;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.pick_folder": HostDaemonCommandDescriptor<"host.pick_folder", z$1.ZodObject<{
        type: z$1.ZodLiteral<"host.pick_folder">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        path: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "capability.host.call": HostDaemonCommandDescriptor<"capability.host.call", z$1.ZodObject<{
        artifact: z$1.ZodObject<{
            byteLength: z$1.ZodNumber;
            digest: z$1.ZodString;
        }, z$1.core.$strict>;
        callId: z$1.ZodString;
        capabilityId: z$1.ZodString;
        generation: z$1.ZodString;
        input: z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>;
        method: z$1.ZodString;
        timeoutMs: z$1.ZodNumber;
        type: z$1.ZodLiteral<"capability.host.call">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        output: z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "capability.host.cancel": HostDaemonCommandDescriptor<"capability.host.cancel", z$1.ZodObject<{
        callId: z$1.ZodString;
        capabilityId: z$1.ZodString;
        generation: z$1.ZodString;
        type: z$1.ZodLiteral<"capability.host.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cancelled: z$1.ZodBoolean;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "capability.host.dispose": HostDaemonCommandDescriptor<"capability.host.dispose", z$1.ZodObject<{
        capabilityId: z$1.ZodString;
        generation: z$1.ZodString;
        type: z$1.ZodLiteral<"capability.host.dispose">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        disposed: z$1.ZodBoolean;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.list_commands": HostDaemonCommandDescriptor<"host.list_commands", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.list_commands">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        commands: z$1.ZodArray<z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            description: z$1.ZodNullable<z$1.ZodString>;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.list_skills": HostDaemonCommandDescriptor<"host.list_skills", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        sharedSkillRoots: z$1.ZodObject<{
            project: z$1.ZodArray<z$1.ZodString>;
            user: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strict>;
        type: z$1.ZodLiteral<"host.list_skills">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        skills: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodNullable<z$1.ZodString>;
            filePath: z$1.ZodString;
            id: z$1.ZodString;
            linked: z$1.ZodBoolean;
            name: z$1.ZodString;
            rootKind: z$1.ZodEnum<{
                "bb-builtin": "bb-builtin";
                "bb-data-dir": "bb-data-dir";
                "bb-project": "bb-project";
                "pi-project": "pi-project";
                "pi-user": "pi-user";
                "shared-project": "shared-project";
                "shared-user": "shared-user";
                capability: "capability";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.delete_skill": HostDaemonCommandDescriptor<"host.delete_skill", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodString;
        rootPath: z$1.ZodNullable<z$1.ZodString>;
        scope: z$1.ZodEnum<{
            "bb-project": "bb-project";
            "bb-user": "bb-user";
            "pi-project": "pi-project";
            "pi-user": "pi-user";
        }>;
        type: z$1.ZodLiteral<"host.delete_skill">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        deletedPath: z$1.ZodString;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "host.write_skill": HostDaemonCommandDescriptor<"host.write_skill", z$1.ZodObject<{
        content: z$1.ZodString;
        cwd: z$1.ZodNullable<z$1.ZodString>;
        expectedSha256: z$1.ZodString;
        name: z$1.ZodString;
        scope: z$1.ZodEnum<{
            "bb-project": "bb-project";
            "bb-user": "bb-user";
        }>;
        type: z$1.ZodLiteral<"host.write_skill">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        filePath: z$1.ZodString;
        outcome: z$1.ZodLiteral<"written">;
        sha256: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        currentSha256: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"conflict">;
    }, z$1.core.$strip>], "outcome">, "onlineRpc", false>;
    "host.install_global_skills": HostDaemonCommandDescriptor<"host.install_global_skills", z$1.ZodObject<{
        skills: z$1.ZodArray<z$1.ZodObject<{
            entryPath: z$1.ZodString;
            name: z$1.ZodString;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>>;
        type: z$1.ZodLiteral<"host.install_global_skills">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        installations: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.global_skills_status": HostDaemonCommandDescriptor<"host.global_skills_status", z$1.ZodObject<{
        names: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.global_skills_status">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        entries: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
            treeHash: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.list_branches": HostDaemonCommandDescriptor<"host.list_branches", z$1.ZodObject<{
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        selectedBranch: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.list_branches">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        branches: z$1.ZodArray<z$1.ZodString>;
        branchesTruncated: z$1.ZodBoolean;
        checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branchName: z$1.ZodString;
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"branch">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"detached">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            branchName: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"unborn">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        defaultBranchRelation: z$1.ZodNullable<z$1.ZodEnum<{
            "local-ahead": "local-ahead";
            "local-behind": "local-behind";
            diverged: "diverged";
            equal: "equal";
            unknown: "unknown";
        }>>;
        hasUncommittedChanges: z$1.ZodBoolean;
        operation: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"none">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"merge">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"rebase">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"cherry-pick">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"revert">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        originDefaultBranch: z$1.ZodNullable<z$1.ZodString>;
        remoteBranches: z$1.ZodArray<z$1.ZodString>;
        remoteBranchesTruncated: z$1.ZodBoolean;
        selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                local: "local";
                missing: "missing";
                remote: "remote";
            }>;
            name: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.file_metadata": HostDaemonCommandDescriptor<"host.file_metadata", z$1.ZodObject<{
        path: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.file_metadata">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        modifiedAtMs: z$1.ZodNumber;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.read_file": HostDaemonCommandDescriptor<"host.read_file", z$1.ZodObject<{
        path: z$1.ZodString;
        ref: z$1.ZodOptional<z$1.ZodString>;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.read_file">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        modifiedAtMs: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.read_file_relative": HostDaemonCommandDescriptor<"host.read_file_relative", z$1.ZodObject<{
        dotfiles: z$1.ZodEnum<{
            allow: "allow";
            deny: "deny";
        }>;
        path: z$1.ZodString;
        rootPath: z$1.ZodString;
        type: z$1.ZodLiteral<"host.read_file_relative">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        modifiedAtMs: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.write_file": HostDaemonCommandDescriptor<"host.write_file", z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        createParents: z$1.ZodBoolean;
        expectedSha256: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
        mode: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.write_file">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"written">;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strict>, z$1.ZodObject<{
        currentSha256: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"conflict">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", false>;
    "pi.models.list": HostDaemonCommandDescriptor<"pi.models.list", z$1.ZodObject<{
        cwd: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"pi.models.list">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        models: z$1.ZodArray<z$1.ZodObject<{
            contextWindow: z$1.ZodOptional<z$1.ZodNumber>;
            cost: z$1.ZodOptional<z$1.ZodObject<{
                cacheRead: z$1.ZodNumber;
                cacheWrite: z$1.ZodNumber;
                input: z$1.ZodNumber;
                output: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            defaultReasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            description: z$1.ZodString;
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            inputModalities: z$1.ZodOptional<z$1.ZodArray<z$1.ZodEnum<{
                image: "image";
                text: "text";
            }>>>;
            isDefault: z$1.ZodBoolean;
            maxTokens: z$1.ZodOptional<z$1.ZodNumber>;
            model: z$1.ZodString;
            routeProviderId: z$1.ZodOptional<z$1.ZodString>;
            supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                reasoningEffort: z$1.ZodEnum<{
                    high: "high";
                    low: "low";
                    max: "max";
                    medium: "medium";
                    none: "none";
                    ultra: "ultra";
                    ultracode: "ultracode";
                    xhigh: "xhigh";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        selectedOnlyModels: z$1.ZodArray<z$1.ZodObject<{
            contextWindow: z$1.ZodOptional<z$1.ZodNumber>;
            cost: z$1.ZodOptional<z$1.ZodObject<{
                cacheRead: z$1.ZodNumber;
                cacheWrite: z$1.ZodNumber;
                input: z$1.ZodNumber;
                output: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            defaultReasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            description: z$1.ZodString;
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            inputModalities: z$1.ZodOptional<z$1.ZodArray<z$1.ZodEnum<{
                image: "image";
                text: "text";
            }>>>;
            isDefault: z$1.ZodBoolean;
            maxTokens: z$1.ZodOptional<z$1.ZodNumber>;
            model: z$1.ZodString;
            routeProviderId: z$1.ZodOptional<z$1.ZodString>;
            supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                reasoningEffort: z$1.ZodEnum<{
                    high: "high";
                    low: "low";
                    max: "max";
                    medium: "medium";
                    none: "none";
                    ultra: "ultra";
                    ultracode: "ultracode";
                    xhigh: "xhigh";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "workspace.status": HostDaemonCommandDescriptor<"workspace.status", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxUntrackedLineStatBytes: z$1.ZodNumber;
        maxUntrackedLineStatFiles: z$1.ZodNumber;
        mergeBaseBranch: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"workspace.status">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        workspaceStatus: z$1.ZodObject<{
            branch: z$1.ZodObject<{
                currentBranch: z$1.ZodNullable<z$1.ZodString>;
                defaultBranch: z$1.ZodString;
            }, z$1.core.$strip>;
            checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                branchName: z$1.ZodString;
                headSha: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"branch">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                headSha: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"detached">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                branchName: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"unborn">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"unknown">;
                reason: z$1.ZodString;
            }, z$1.core.$strip>], "kind">;
            mergeBase: z$1.ZodNullable<z$1.ZodObject<{
                aheadCount: z$1.ZodNumber;
                baseRef: z$1.ZodNullable<z$1.ZodString>;
                behindCount: z$1.ZodNumber;
                commits: z$1.ZodArray<z$1.ZodObject<{
                    authorName: z$1.ZodString;
                    authoredAt: z$1.ZodNumber;
                    sha: z$1.ZodString;
                    shortSha: z$1.ZodString;
                    subject: z$1.ZodString;
                }, z$1.core.$strip>>;
                deletions: z$1.ZodNumber;
                files: z$1.ZodArray<z$1.ZodObject<{
                    deletions: z$1.ZodNullable<z$1.ZodNumber>;
                    insertions: z$1.ZodNullable<z$1.ZodNumber>;
                    path: z$1.ZodString;
                    status: z$1.ZodEnum<{
                        "?": "?";
                        "??": "??";
                        A: "A";
                        C: "C";
                        D: "D";
                        M: "M";
                        R: "R";
                        U: "U";
                    }>;
                }, z$1.core.$strip>>;
                hasCommittedUnmergedChanges: z$1.ZodBoolean;
                insertions: z$1.ZodNumber;
                lineStatsComplete: z$1.ZodBoolean;
                mergeBaseBranch: z$1.ZodString;
            }, z$1.core.$strip>>;
            workingTree: z$1.ZodObject<{
                deletions: z$1.ZodNumber;
                files: z$1.ZodArray<z$1.ZodObject<{
                    deletions: z$1.ZodNullable<z$1.ZodNumber>;
                    insertions: z$1.ZodNullable<z$1.ZodNumber>;
                    path: z$1.ZodString;
                    status: z$1.ZodEnum<{
                        "?": "?";
                        "??": "??";
                        A: "A";
                        C: "C";
                        D: "D";
                        M: "M";
                        R: "R";
                        U: "U";
                    }>;
                }, z$1.core.$strip>>;
                hasUncommittedChanges: z$1.ZodBoolean;
                insertions: z$1.ZodNumber;
                lineStatsComplete: z$1.ZodBoolean;
                state: z$1.ZodEnum<{
                    clean: "clean";
                    committed_unmerged: "committed_unmerged";
                    dirty_and_committed_unmerged: "dirty_and_committed_unmerged";
                    dirty_uncommitted: "dirty_uncommitted";
                    untracked: "untracked";
                }>;
            }, z$1.core.$strip>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                not_worktree: "not_worktree";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diff": HostDaemonCommandDescriptor<"workspace.diff", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxDiffBytes: z$1.ZodNumber;
        maxFileListBytes: z$1.ZodNumber;
        maxUntrackedFiles: z$1.ZodNumber;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diff">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        diff: z$1.ZodObject<{
            diff: z$1.ZodString;
            files: z$1.ZodString;
            mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
            shortstat: z$1.ZodString;
            truncated: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        outcome: z$1.ZodLiteral<"available">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                not_worktree: "not_worktree";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diffFiles": HostDaemonCommandDescriptor<"workspace.diffFiles", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxFiles: z$1.ZodNumber;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diffFiles">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        files: z$1.ZodArray<z$1.ZodObject<{
            additions: z$1.ZodNumber;
            binary: z$1.ZodBoolean;
            deletions: z$1.ZodNumber;
            origin: z$1.ZodEnum<{
                tracked: "tracked";
                untracked: "untracked";
            }>;
            path: z$1.ZodString;
            previousPath: z$1.ZodNullable<z$1.ZodString>;
            statusLetter: z$1.ZodEnum<{
                A: "A";
                C: "C";
                D: "D";
                M: "M";
                R: "R";
                T: "T";
            }>;
        }, z$1.core.$strip>>;
        mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"available">;
        shortstat: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                not_worktree: "not_worktree";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diffPatch": HostDaemonCommandDescriptor<"workspace.diffPatch", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxBytesPerFile: z$1.ZodNumber;
        paths: z$1.ZodArray<z$1.ZodString>;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diffPatch">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        patches: z$1.ZodArray<z$1.ZodObject<{
            patch: z$1.ZodString;
            path: z$1.ZodString;
            truncated: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                not_worktree: "not_worktree";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.pull_request": HostDaemonCommandDescriptor<"workspace.pull_request", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"workspace.pull_request">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
            workspaceProvisionType: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                personal: "personal";
                unmanaged: "unmanaged";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        pullRequest: z$1.ZodObject<{
            baseRefName: z$1.ZodString;
            checks: z$1.ZodArray<z$1.ZodObject<{
                conclusion: z$1.ZodNullable<z$1.ZodEnum<{
                    action_required: "action_required";
                    cancelled: "cancelled";
                    failure: "failure";
                    neutral: "neutral";
                    skipped: "skipped";
                    stale: "stale";
                    startup_failure: "startup_failure";
                    success: "success";
                    timed_out: "timed_out";
                    unknown: "unknown";
                }>>;
                name: z$1.ZodString;
                startedAt: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    completed: "completed";
                    in_progress: "in_progress";
                    queued: "queued";
                    unknown: "unknown";
                }>;
                url: z$1.ZodNullable<z$1.ZodString>;
            }, z$1.core.$strict>>;
            headRefName: z$1.ZodString;
            isDraft: z$1.ZodBoolean;
            mergeStateStatus: z$1.ZodNullable<z$1.ZodEnum<{
                BEHIND: "BEHIND";
                BLOCKED: "BLOCKED";
                CLEAN: "CLEAN";
                DIRTY: "DIRTY";
                DRAFT: "DRAFT";
                HAS_HOOKS: "HAS_HOOKS";
                UNKNOWN: "UNKNOWN";
                UNSTABLE: "UNSTABLE";
            }>>;
            mergeable: z$1.ZodNullable<z$1.ZodEnum<{
                CONFLICTING: "CONFLICTING";
                MERGEABLE: "MERGEABLE";
                UNKNOWN: "UNKNOWN";
            }>>;
            number: z$1.ZodNumber;
            reviewDecision: z$1.ZodNullable<z$1.ZodEnum<{
                APPROVED: "APPROVED";
                CHANGES_REQUESTED: "CHANGES_REQUESTED";
                REVIEW_REQUIRED: "REVIEW_REQUIRED";
            }>>;
            reviewRequestCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                CLOSED: "CLOSED";
                MERGED: "MERGED";
                OPEN: "OPEN";
            }>;
            title: z$1.ZodString;
            updatedAt: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"absent">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        message: z$1.ZodString;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
};
type HostDaemonCommandRegistry = typeof hostDaemonCommandRegistry;
type AnyHostDaemonCommandDescriptor = HostDaemonCommandRegistry[keyof HostDaemonCommandRegistry];
type HostDaemonCommandDescriptorForTransport<Transport extends HostDaemonCommandTransport> = Extract<AnyHostDaemonCommandDescriptor, {
    transport: Transport;
}>;
type HostDaemonResultSchemaMapForTransport<Transport extends HostDaemonCommandTransport> = {
    [Descriptor in HostDaemonCommandDescriptorForTransport<Transport> as Descriptor["type"]]: Descriptor["resultSchema"];
};
type HostDaemonOnlineRpcResultSchemaMap = HostDaemonResultSchemaMapForTransport<"onlineRpc">;
type HostDaemonOnlineRpcResultByType = {
    [K in keyof HostDaemonOnlineRpcResultSchemaMap]: z$1.infer<HostDaemonOnlineRpcResultSchemaMap[K]>;
};

declare const pickFolderResponseSchema: z$1.ZodObject<{
    path: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type PickFolderResponse = z$1.infer<typeof pickFolderResponseSchema>;
declare const pathsExistRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodPipe<z$1.ZodArray<z$1.ZodString>, z$1.ZodTransform<string[], string[]>>;
}, z$1.core.$strip>;
type PathsExistRequest = z$1.infer<typeof pathsExistRequestSchema>;
declare const pathsExistResponseSchema: z$1.ZodObject<{
    existence: z$1.ZodRecord<z$1.ZodString, z$1.ZodBoolean>;
}, z$1.core.$strip>;
type PathsExistResponse = z$1.infer<typeof pathsExistResponseSchema>;

interface CreateFilePreviewResponse {
    baseUrl: string;
    expiresAtMs: number;
}
type HostFileReadResponse = HostDaemonOnlineRpcResultByType["host.read_file"];
type HostFileWriteResponse = HostDaemonOnlineRpcResultByType["host.write_file"];
type HostFileListResponse = HostDaemonOnlineRpcResultByType["host.list_files"];
type HostPathListResponse = HostDaemonOnlineRpcResultByType["host.list_paths"];
type HostMkdirResponse = HostDaemonOnlineRpcResultByType["host.mkdir"];
type HostMovePathResponse = HostDaemonOnlineRpcResultByType["host.move_path"];
type HostRemovePathResponse = HostDaemonOnlineRpcResultByType["host.remove_path"];

/**
 * Query for `GET /hosts/:id/directory`, the interactive path browser's
 * single-level directory read. `path` is an absolute directory on the host;
 * omitting it lists the host's home directory (the daemon resolves it, since a
 * remote caller cannot know the host's home).
 */
declare const hostDirectoryQuerySchema: z$1.ZodObject<{
    path: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type HostDirectoryQuery = z$1.infer<typeof hostDirectoryQuerySchema>;
declare const hostDirectoryListingSchema: z$1.ZodObject<{
    directory: z$1.ZodString;
    entries: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    parent: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type HostDirectoryListing = z$1.infer<typeof hostDirectoryListingSchema>;
/** Project name is sent so the daemon can derive its host-local checkout path. */
declare const hostCloneDefaultPathQuerySchema: z$1.ZodObject<{
    projectId: z$1.ZodString;
}, z$1.core.$strip>;
type HostCloneDefaultPathQuery = z$1.infer<typeof hostCloneDefaultPathQuerySchema>;
declare const hostCloneDefaultPathResponseSchema: z$1.ZodObject<{
    path: z$1.ZodString;
}, z$1.core.$strict>;
type HostCloneDefaultPathResponse = z$1.infer<typeof hostCloneDefaultPathResponseSchema>;
declare const createHostJoinCodeResponseSchema: z$1.ZodObject<{
    expiresAt: z$1.ZodNumber;
    hostId: z$1.ZodString;
    joinCode: z$1.ZodString;
}, z$1.core.$strip>;
type CreateHostJoinCodeResponse = z$1.infer<typeof createHostJoinCodeResponseSchema>;
declare const updateHostRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateHostRequest = z$1.infer<typeof updateHostRequestSchema>;
declare const hostRetryUpdateResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strict>;
type HostRetryUpdateResponse = z$1.infer<typeof hostRetryUpdateResponseSchema>;
type HostPathsExistRequest = PathsExistRequest;
type HostPathsExistResponse = PathsExistResponse;
declare const hostPickFolderRequestSchema: z$1.ZodObject<{
    clientHostId: z$1.ZodString;
}, z$1.core.$strict>;
type HostPickFolderRequest = z$1.infer<typeof hostPickFolderRequestSchema>;
type HostPickFolderResponse = PickFolderResponse;

declare const capabilityUpdateCheckEntrySchema: z$1.ZodObject<{
    blocked: z$1.ZodOptional<z$1.ZodObject<{
        reasons: z$1.ZodArray<z$1.ZodString>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    candidate: z$1.ZodOptional<z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    detail: z$1.ZodOptional<z$1.ZodString>;
    devMode: z$1.ZodOptional<z$1.ZodLiteral<true>>;
    id: z$1.ZodString;
    installed: z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>;
    outcome: z$1.ZodEnum<{
        "update-available": "update-available";
        current: "current";
        incompatible: "incompatible";
        pinned: "pinned";
        unavailable: "unavailable";
    }>;
}, z$1.core.$strip>;
type CapabilityUpdateCheckEntry = z$1.infer<typeof capabilityUpdateCheckEntrySchema>;
declare const capabilityApplyUpdateResultSchema: z$1.ZodObject<{
    applied: z$1.ZodBoolean;
    detail: z$1.ZodOptional<z$1.ZodString>;
    from: z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>;
    outcome: z$1.ZodEnum<{
        "rolled-back": "rolled-back";
        current: "current";
        updated: "updated";
    }>;
    to: z$1.ZodOptional<z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type CapabilityApplyUpdateResult$1 = z$1.infer<typeof capabilityApplyUpdateResultSchema>;
declare const capabilitySourceDetailSchema: z$1.ZodObject<{
    engines: z$1.ZodObject<{
        bb: z$1.ZodOptional<z$1.ZodString>;
        bbCapabilitySdk: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    history: z$1.ZodArray<z$1.ZodObject<{
        activatedAt: z$1.ZodNumber;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    installedAt: z$1.ZodOptional<z$1.ZodNumber>;
    integrity: z$1.ZodOptional<z$1.ZodString>;
    range: z$1.ZodOptional<z$1.ZodString>;
    registry: z$1.ZodOptional<z$1.ZodString>;
    requested: z$1.ZodString;
    resolved: z$1.ZodString;
    resolvedTag: z$1.ZodOptional<z$1.ZodString>;
    subdirectory: z$1.ZodOptional<z$1.ZodString>;
    tagPrefix: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type CapabilitySourceDetail = z$1.infer<typeof capabilitySourceDetailSchema>;
declare const installedCapabilitySchema: z$1.ZodObject<{
    app: z$1.ZodObject<{
        bundle: z$1.ZodNullable<z$1.ZodObject<{
            compatible: z$1.ZodBoolean;
            cssUrl: z$1.ZodNullable<z$1.ZodString>;
            hash: z$1.ZodString;
            jsBytes: z$1.ZodNumber;
            jsUrl: z$1.ZodString;
            sdkMajor: z$1.ZodNumber;
            sdkVersion: z$1.ZodString;
        }, z$1.core.$strip>>;
        hasApp: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
        detail: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            "agent-tool": "agent-tool";
            "thread-integration": "thread-integration";
            skill: "skill";
            theme: "theme";
        }>;
        label: z$1.ZodString;
    }, z$1.core.$strip>>>;
    catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
    catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
    cliCommand: z$1.ZodNullable<z$1.ZodObject<{
        name: z$1.ZodString;
        summary: z$1.ZodString;
    }, z$1.core.$strip>>;
    description: z$1.ZodNullable<z$1.ZodString>;
    enabled: z$1.ZodBoolean;
    handlerStats: z$1.ZodObject<{
        count: z$1.ZodNumber;
        errorCount: z$1.ZodNumber;
        maxMs: z$1.ZodNumber;
        totalMs: z$1.ZodNumber;
    }, z$1.core.$strip>;
    hasSettings: z$1.ZodBoolean;
    icon: z$1.ZodNullable<z$1.ZodString>;
    iconUrl: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    isOrphanedBuiltin: z$1.ZodBoolean;
    logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
    logoUrl: z$1.ZodNullable<z$1.ZodString>;
    name: z$1.ZodNullable<z$1.ZodString>;
    provenance: z$1.ZodEnum<{
        builtin: "builtin";
        catalog: "catalog";
        direct: "direct";
    }>;
    publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    rootDir: z$1.ZodString;
    schedules: z$1.ZodArray<z$1.ZodObject<{
        cron: z$1.ZodString;
        lastError: z$1.ZodNullable<z$1.ZodString>;
        lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
        lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
            error: "error";
            ok: "ok";
            running: "running";
        }>>;
        name: z$1.ZodString;
        nextRunAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    services: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        state: z$1.ZodEnum<{
            backoff: "backoff";
            running: "running";
            stopped: "stopped";
        }>;
    }, z$1.core.$strip>>;
    source: z$1.ZodString;
    sourceDisplay: z$1.ZodString;
    status: z$1.ZodEnum<{
        "needs-configuration": "needs-configuration";
        degraded: "degraded";
        disabled: "disabled";
        error: "error";
        incompatible: "incompatible";
        missing: "missing";
        running: "running";
    }>;
    statusDetail: z$1.ZodNullable<z$1.ZodString>;
    updateState: z$1.ZodObject<{
        availableVersion: z$1.ZodOptional<z$1.ZodString>;
        blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        blockedVersion: z$1.ZodOptional<z$1.ZodString>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
        lastFailure: z$1.ZodOptional<z$1.ZodObject<{
            at: z$1.ZodNumber;
            detail: z$1.ZodString;
            version: z$1.ZodString;
        }, z$1.core.$strip>>;
        outcome: z$1.ZodOptional<z$1.ZodEnum<{
            "update-available": "update-available";
            current: "current";
            incompatible: "incompatible";
            pinned: "pinned";
            unavailable: "unavailable";
        }>>;
    }, z$1.core.$strip>;
    version: z$1.ZodString;
}, z$1.core.$strip>;
type InstalledCapability = z$1.infer<typeof installedCapabilitySchema>;
declare const capabilityListResponseSchema: z$1.ZodObject<{
    capabilities: z$1.ZodArray<z$1.ZodObject<{
        app: z$1.ZodObject<{
            bundle: z$1.ZodNullable<z$1.ZodObject<{
                compatible: z$1.ZodBoolean;
                cssUrl: z$1.ZodNullable<z$1.ZodString>;
                hash: z$1.ZodString;
                jsBytes: z$1.ZodNumber;
                jsUrl: z$1.ZodString;
                sdkMajor: z$1.ZodNumber;
                sdkVersion: z$1.ZodString;
            }, z$1.core.$strip>>;
            hasApp: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            detail: z$1.ZodNullable<z$1.ZodString>;
            id: z$1.ZodString;
            kind: z$1.ZodEnum<{
                "agent-tool": "agent-tool";
                "thread-integration": "thread-integration";
                skill: "skill";
                theme: "theme";
            }>;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
        catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
        cliCommand: z$1.ZodNullable<z$1.ZodObject<{
            name: z$1.ZodString;
            summary: z$1.ZodString;
        }, z$1.core.$strip>>;
        description: z$1.ZodNullable<z$1.ZodString>;
        enabled: z$1.ZodBoolean;
        handlerStats: z$1.ZodObject<{
            count: z$1.ZodNumber;
            errorCount: z$1.ZodNumber;
            maxMs: z$1.ZodNumber;
            totalMs: z$1.ZodNumber;
        }, z$1.core.$strip>;
        hasSettings: z$1.ZodBoolean;
        icon: z$1.ZodNullable<z$1.ZodString>;
        iconUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isOrphanedBuiltin: z$1.ZodBoolean;
        logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
        logoUrl: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        provenance: z$1.ZodEnum<{
            builtin: "builtin";
            catalog: "catalog";
            direct: "direct";
        }>;
        publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        rootDir: z$1.ZodString;
        schedules: z$1.ZodArray<z$1.ZodObject<{
            cron: z$1.ZodString;
            lastError: z$1.ZodNullable<z$1.ZodString>;
            lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
            lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
                error: "error";
                ok: "ok";
                running: "running";
            }>>;
            name: z$1.ZodString;
            nextRunAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        services: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            state: z$1.ZodEnum<{
                backoff: "backoff";
                running: "running";
                stopped: "stopped";
            }>;
        }, z$1.core.$strip>>;
        source: z$1.ZodString;
        sourceDisplay: z$1.ZodString;
        status: z$1.ZodEnum<{
            "needs-configuration": "needs-configuration";
            degraded: "degraded";
            disabled: "disabled";
            error: "error";
            incompatible: "incompatible";
            missing: "missing";
            running: "running";
        }>;
        statusDetail: z$1.ZodNullable<z$1.ZodString>;
        updateState: z$1.ZodObject<{
            availableVersion: z$1.ZodOptional<z$1.ZodString>;
            blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            blockedVersion: z$1.ZodOptional<z$1.ZodString>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
            lastFailure: z$1.ZodOptional<z$1.ZodObject<{
                at: z$1.ZodNumber;
                detail: z$1.ZodString;
                version: z$1.ZodString;
            }, z$1.core.$strip>>;
            outcome: z$1.ZodOptional<z$1.ZodEnum<{
                "update-available": "update-available";
                current: "current";
                incompatible: "incompatible";
                pinned: "pinned";
                unavailable: "unavailable";
            }>>;
        }, z$1.core.$strip>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type CapabilityListResponse = z$1.infer<typeof capabilityListResponseSchema>;
declare const capabilityReloadResponseSchema: z$1.ZodObject<{
    capabilities: z$1.ZodArray<z$1.ZodObject<{
        app: z$1.ZodObject<{
            bundle: z$1.ZodNullable<z$1.ZodObject<{
                compatible: z$1.ZodBoolean;
                cssUrl: z$1.ZodNullable<z$1.ZodString>;
                hash: z$1.ZodString;
                jsBytes: z$1.ZodNumber;
                jsUrl: z$1.ZodString;
                sdkMajor: z$1.ZodNumber;
                sdkVersion: z$1.ZodString;
            }, z$1.core.$strip>>;
            hasApp: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            detail: z$1.ZodNullable<z$1.ZodString>;
            id: z$1.ZodString;
            kind: z$1.ZodEnum<{
                "agent-tool": "agent-tool";
                "thread-integration": "thread-integration";
                skill: "skill";
                theme: "theme";
            }>;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
        catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
        cliCommand: z$1.ZodNullable<z$1.ZodObject<{
            name: z$1.ZodString;
            summary: z$1.ZodString;
        }, z$1.core.$strip>>;
        description: z$1.ZodNullable<z$1.ZodString>;
        enabled: z$1.ZodBoolean;
        handlerStats: z$1.ZodObject<{
            count: z$1.ZodNumber;
            errorCount: z$1.ZodNumber;
            maxMs: z$1.ZodNumber;
            totalMs: z$1.ZodNumber;
        }, z$1.core.$strip>;
        hasSettings: z$1.ZodBoolean;
        icon: z$1.ZodNullable<z$1.ZodString>;
        iconUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isOrphanedBuiltin: z$1.ZodBoolean;
        logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
        logoUrl: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        provenance: z$1.ZodEnum<{
            builtin: "builtin";
            catalog: "catalog";
            direct: "direct";
        }>;
        publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        rootDir: z$1.ZodString;
        schedules: z$1.ZodArray<z$1.ZodObject<{
            cron: z$1.ZodString;
            lastError: z$1.ZodNullable<z$1.ZodString>;
            lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
            lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
                error: "error";
                ok: "ok";
                running: "running";
            }>>;
            name: z$1.ZodString;
            nextRunAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        services: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            state: z$1.ZodEnum<{
                backoff: "backoff";
                running: "running";
                stopped: "stopped";
            }>;
        }, z$1.core.$strip>>;
        source: z$1.ZodString;
        sourceDisplay: z$1.ZodString;
        status: z$1.ZodEnum<{
            "needs-configuration": "needs-configuration";
            degraded: "degraded";
            disabled: "disabled";
            error: "error";
            incompatible: "incompatible";
            missing: "missing";
            running: "running";
        }>;
        statusDetail: z$1.ZodNullable<z$1.ZodString>;
        updateState: z$1.ZodObject<{
            availableVersion: z$1.ZodOptional<z$1.ZodString>;
            blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            blockedVersion: z$1.ZodOptional<z$1.ZodString>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
            lastFailure: z$1.ZodOptional<z$1.ZodObject<{
                at: z$1.ZodNumber;
                detail: z$1.ZodString;
                version: z$1.ZodString;
            }, z$1.core.$strip>>;
            outcome: z$1.ZodOptional<z$1.ZodEnum<{
                "update-available": "update-available";
                current: "current";
                incompatible: "incompatible";
                pinned: "pinned";
                unavailable: "unavailable";
            }>>;
        }, z$1.core.$strip>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type CapabilityReloadResponse = z$1.infer<typeof capabilityReloadResponseSchema>;
declare const capabilityRemoveResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type CapabilityRemoveResponse = z$1.infer<typeof capabilityRemoveResponseSchema>;
declare const capabilitySettingsResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    schema: z$1.ZodRecord<z$1.ZodString, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        secret: z$1.ZodOptional<z$1.ZodLiteral<true>>;
        type: z$1.ZodLiteral<"string">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodBoolean>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        type: z$1.ZodLiteral<"boolean">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        options: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"select">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        type: z$1.ZodLiteral<"project">;
    }, z$1.core.$strict>], "type">>;
    values: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>>;
}, z$1.core.$strip>;
type CapabilitySettingsResponse = z$1.infer<typeof capabilitySettingsResponseSchema>;
declare const capabilityTokenResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    token: z$1.ZodString;
}, z$1.core.$strip>;
type CapabilityTokenResponse = z$1.infer<typeof capabilityTokenResponseSchema>;
declare const capabilityCatalogStatusSchema: z$1.ZodObject<{
    capabilityCount: z$1.ZodNumber;
    includedCapabilityCount: z$1.ZodNumber;
    optionalCapabilityCount: z$1.ZodNumber;
}, z$1.core.$strip>;
type CapabilityCatalogStatus = z$1.infer<typeof capabilityCatalogStatusSchema>;
declare const capabilityCatalogSearchResultSchema: z$1.ZodObject<{
    author: z$1.ZodNullable<z$1.ZodObject<{
        name: z$1.ZodString;
        url: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    capabilityId: z$1.ZodString;
    category: z$1.ZodString;
    compatible: z$1.ZodBoolean;
    description: z$1.ZodString;
    displayName: z$1.ZodString;
    entryId: z$1.ZodString;
    icon: z$1.ZodNullable<z$1.ZodString>;
    iconTinted: z$1.ZodDefault<z$1.ZodBoolean>;
    iconUrl: z$1.ZodNullable<z$1.ZodString>;
    incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
    installed: z$1.ZodBoolean;
    marketplace: z$1.ZodString;
    marketplaceDisplayName: z$1.ZodString;
    official: z$1.ZodBoolean;
    publisherKey: z$1.ZodString;
    publisherLabel: z$1.ZodString;
    repositoryUrl: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    source: z$1.ZodString;
}, z$1.core.$strip>;
type CapabilityCatalogSearchResult$1 = z$1.infer<typeof capabilityCatalogSearchResultSchema>;
/**
 * The true source an install will run against, resolved before anything runs.
 * Both kinds report the exact artifact they resolve to right now — a commit
 * for git, a version and its integrity for npm — so a range or tag install is
 * confirmed against the exact code it will fetch.
 */
declare const capabilityCatalogResolvedSourceSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    kind: z$1.ZodLiteral<"npm">;
    package: z$1.ZodString;
    range: z$1.ZodOptional<z$1.ZodString>;
    registry: z$1.ZodOptional<z$1.ZodString>;
    resolvedIntegrity: z$1.ZodOptional<z$1.ZodString>;
    resolvedVersion: z$1.ZodOptional<z$1.ZodString>;
    tag: z$1.ZodOptional<z$1.ZodString>;
    unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"git">;
    range: z$1.ZodOptional<z$1.ZodString>;
    ref: z$1.ZodOptional<z$1.ZodString>;
    resolvedCommit: z$1.ZodOptional<z$1.ZodString>;
    resolvedTag: z$1.ZodOptional<z$1.ZodString>;
    subdir: z$1.ZodOptional<z$1.ZodString>;
    tagPrefix: z$1.ZodOptional<z$1.ZodString>;
    unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
    url: z$1.ZodString;
}, z$1.core.$strict>], "kind">;
type CapabilityCatalogResolvedSource = z$1.infer<typeof capabilityCatalogResolvedSourceSchema>;
/**
 * What `POST /capability-catalog/install` would do with the same arguments, shown
 * to the user before anything runs. `bundled` entries install from the copy
 * inside the app; `marketplace` entries install from their listed source.
 */
declare const capabilityCatalogInstallPlanSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    capabilityId: z$1.ZodString;
    compatible: z$1.ZodBoolean;
    displayName: z$1.ZodString;
    entryId: z$1.ZodString;
    incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
    kind: z$1.ZodLiteral<"bundled">;
    source: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    author: z$1.ZodObject<{
        name: z$1.ZodString;
        url: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    capabilityId: z$1.ZodString;
    compatible: z$1.ZodBoolean;
    displayName: z$1.ZodString;
    entryId: z$1.ZodString;
    incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
    kind: z$1.ZodLiteral<"marketplace">;
    marketplace: z$1.ZodString;
    marketplaceDisplayName: z$1.ZodString;
    official: z$1.ZodBoolean;
    resolvedSource: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"npm">;
        package: z$1.ZodString;
        range: z$1.ZodOptional<z$1.ZodString>;
        registry: z$1.ZodOptional<z$1.ZodString>;
        resolvedIntegrity: z$1.ZodOptional<z$1.ZodString>;
        resolvedVersion: z$1.ZodOptional<z$1.ZodString>;
        tag: z$1.ZodOptional<z$1.ZodString>;
        unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"git">;
        range: z$1.ZodOptional<z$1.ZodString>;
        ref: z$1.ZodOptional<z$1.ZodString>;
        resolvedCommit: z$1.ZodOptional<z$1.ZodString>;
        resolvedTag: z$1.ZodOptional<z$1.ZodString>;
        subdir: z$1.ZodOptional<z$1.ZodString>;
        tagPrefix: z$1.ZodOptional<z$1.ZodString>;
        unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strict>], "kind">;
    source: z$1.ZodString;
}, z$1.core.$strip>], "kind">;
type CapabilityCatalogInstallPlan = z$1.infer<typeof capabilityCatalogInstallPlanSchema>;
declare const capabilityMarketplaceSchema: z$1.ZodObject<{
    description: z$1.ZodNullable<z$1.ZodString>;
    displayName: z$1.ZodString;
    entryCount: z$1.ZodNumber;
    lastAttemptAt: z$1.ZodNullable<z$1.ZodNumber>;
    lastError: z$1.ZodNullable<z$1.ZodString>;
    lastRefreshAt: z$1.ZodNullable<z$1.ZodNumber>;
    name: z$1.ZodString;
    official: z$1.ZodBoolean;
    resolvedCommit: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodString;
    sourceKind: z$1.ZodEnum<{
        git: "git";
        https: "https";
        path: "path";
    }>;
}, z$1.core.$strip>;
type CapabilityMarketplace = z$1.infer<typeof capabilityMarketplaceSchema>;
declare const capabilityMarketplaceRefreshResultSchema: z$1.ZodObject<{
    error: z$1.ZodNullable<z$1.ZodString>;
    marketplace: z$1.ZodObject<{
        description: z$1.ZodNullable<z$1.ZodString>;
        displayName: z$1.ZodString;
        entryCount: z$1.ZodNumber;
        lastAttemptAt: z$1.ZodNullable<z$1.ZodNumber>;
        lastError: z$1.ZodNullable<z$1.ZodString>;
        lastRefreshAt: z$1.ZodNullable<z$1.ZodNumber>;
        name: z$1.ZodString;
        official: z$1.ZodBoolean;
        resolvedCommit: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodString;
        sourceKind: z$1.ZodEnum<{
            git: "git";
            https: "https";
            path: "path";
        }>;
    }, z$1.core.$strip>;
    name: z$1.ZodString;
    ok: z$1.ZodBoolean;
}, z$1.core.$strip>;
type CapabilityMarketplaceRefreshResult$1 = z$1.infer<typeof capabilityMarketplaceRefreshResultSchema>;

declare const systemModelsResponseSchema: z$1.ZodObject<{
    modelLoadError: z$1.ZodNullable<z$1.ZodObject<{
        code: z$1.ZodEnum<{
            discovery_unavailable: "discovery_unavailable";
            host_offline: "host_offline";
            invalid_pi_config: "invalid_pi_config";
            scope_target_missing: "scope_target_missing";
        }>;
        message: z$1.ZodString;
    }, z$1.core.$strict>>;
    models: z$1.ZodArray<z$1.ZodObject<{
        contextWindow: z$1.ZodOptional<z$1.ZodNumber>;
        cost: z$1.ZodOptional<z$1.ZodObject<{
            cacheRead: z$1.ZodNumber;
            cacheWrite: z$1.ZodNumber;
            input: z$1.ZodNumber;
            output: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        defaultReasoningEffort: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        description: z$1.ZodString;
        displayName: z$1.ZodString;
        id: z$1.ZodString;
        inputModalities: z$1.ZodOptional<z$1.ZodArray<z$1.ZodEnum<{
            image: "image";
            text: "text";
        }>>>;
        isDefault: z$1.ZodBoolean;
        maxTokens: z$1.ZodOptional<z$1.ZodNumber>;
        model: z$1.ZodString;
        routeProviderId: z$1.ZodOptional<z$1.ZodString>;
        supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            reasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
    selectedOnlyModels: z$1.ZodArray<z$1.ZodObject<{
        contextWindow: z$1.ZodOptional<z$1.ZodNumber>;
        cost: z$1.ZodOptional<z$1.ZodObject<{
            cacheRead: z$1.ZodNumber;
            cacheWrite: z$1.ZodNumber;
            input: z$1.ZodNumber;
            output: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        defaultReasoningEffort: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        description: z$1.ZodString;
        displayName: z$1.ZodString;
        id: z$1.ZodString;
        inputModalities: z$1.ZodOptional<z$1.ZodArray<z$1.ZodEnum<{
            image: "image";
            text: "text";
        }>>>;
        isDefault: z$1.ZodBoolean;
        maxTokens: z$1.ZodOptional<z$1.ZodNumber>;
        model: z$1.ZodString;
        routeProviderId: z$1.ZodOptional<z$1.ZodString>;
        supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            reasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
}, z$1.core.$strict>;
type SystemModelsResponse = z$1.infer<typeof systemModelsResponseSchema>;
declare const systemVoiceTranscriptionResponseSchema: z$1.ZodObject<{
    text: z$1.ZodString;
}, z$1.core.$strip>;
type SystemVoiceTranscriptionResponse = z$1.infer<typeof systemVoiceTranscriptionResponseSchema>;
declare const systemConfigResponseSchema: z$1.ZodObject<{
    appearance: z$1.ZodObject<{
        customCss: z$1.ZodNullable<z$1.ZodString>;
        faviconColor: z$1.ZodEnum<{
            blue: "blue";
            default: "default";
            green: "green";
            orange: "orange";
            pink: "pink";
            purple: "purple";
            red: "red";
            teal: "teal";
            yellow: "yellow";
        }>;
        resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
            dark: z$1.ZodString;
            files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
            light: z$1.ZodString;
        }, z$1.core.$strict>>;
        themeId: z$1.ZodString;
    }, z$1.core.$strip>;
    capabilityThemes: z$1.ZodArray<z$1.ZodObject<{
        capabilityId: z$1.ZodString;
        description: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
    customThemes: z$1.ZodArray<z$1.ZodString>;
    dataDir: z$1.ZodString;
    defaultKeybindings: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodEnum<{
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.cycleVendor": "modelPicker.cycleVendor";
            "modelPicker.cycleVendorBackward": "modelPicker.cycleVendorBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "workspace.openPreferred": "workspace.openPreferred";
        }>;
        shortcut: z$1.ZodNullable<z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
        when: z$1.ZodObject<{
            all: z$1.ZodArray<z$1.ZodEnum<{
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
            none: z$1.ZodArray<z$1.ZodEnum<{
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>>;
    experiments: z$1.ZodRecord<z$1.ZodEnum<{
        agentSessionReaping: "agentSessionReaping";
        editMessages: "editMessages";
    }>, z$1.ZodBoolean>;
    featureFlags: z$1.ZodObject<{
        placeholder: z$1.ZodBoolean;
        timelineWindowEventBudget: z$1.ZodNumber;
    }, z$1.core.$strip>;
    generalSettings: z$1.ZodObject<{
        showKeyboardHints: z$1.ZodBoolean;
        showReasoningTraces: z$1.ZodBoolean;
        showUnhandledAgentEvents: z$1.ZodBoolean;
        steerActiveThreadOnEnter: z$1.ZodBoolean;
    }, z$1.core.$strict>;
    hostDaemonPort: z$1.ZodNullable<z$1.ZodNumber>;
    keybindingOverrides: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodEnum<{
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.cycleVendor": "modelPicker.cycleVendor";
            "modelPicker.cycleVendorBackward": "modelPicker.cycleVendorBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "workspace.openPreferred": "workspace.openPreferred";
        }>;
        shortcut: z$1.ZodNullable<z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>>;
    keybindings: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodEnum<{
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.cycleVendor": "modelPicker.cycleVendor";
            "modelPicker.cycleVendorBackward": "modelPicker.cycleVendorBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "workspace.openPreferred": "workspace.openPreferred";
        }>;
        shortcut: z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>;
        when: z$1.ZodObject<{
            all: z$1.ZodArray<z$1.ZodEnum<{
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
            none: z$1.ZodArray<z$1.ZodEnum<{
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>>;
    localHelperPorts: z$1.ZodArray<z$1.ZodNumber>;
    primaryHostId: z$1.ZodNullable<z$1.ZodString>;
    primaryHostPlatform: z$1.ZodNullable<z$1.ZodEnum<{
        darwin: "darwin";
        linux: "linux";
        unknown: "unknown";
        wsl: "wsl";
    }>>;
    serverUrl: z$1.ZodString;
    voiceTranscriptionEnabled: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SystemConfigResponse = z$1.infer<typeof systemConfigResponseSchema>;
declare const systemAttentionResponseSchema: z$1.ZodObject<{
    hasAttention: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SystemAttentionResponse = z$1.infer<typeof systemAttentionResponseSchema>;
/**
 * Theme catalog: the on-disk custom-theme directory plus the discovered custom
 * themes and the active palette. Drives `bb theme list` / `bb theme dir`.
 */
declare const themeCatalogResponseSchema: z$1.ZodObject<{
    active: z$1.ZodObject<{
        customCss: z$1.ZodNullable<z$1.ZodString>;
        faviconColor: z$1.ZodEnum<{
            blue: "blue";
            default: "default";
            green: "green";
            orange: "orange";
            pink: "pink";
            purple: "purple";
            red: "red";
            teal: "teal";
            yellow: "yellow";
        }>;
        resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
            dark: z$1.ZodString;
            files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
            light: z$1.ZodString;
        }, z$1.core.$strict>>;
        themeId: z$1.ZodString;
    }, z$1.core.$strip>;
    capabilities: z$1.ZodArray<z$1.ZodObject<{
        capabilityId: z$1.ZodString;
        description: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
    custom: z$1.ZodArray<z$1.ZodString>;
    dir: z$1.ZodString;
}, z$1.core.$strip>;
type ThemeCatalogResponse = z$1.infer<typeof themeCatalogResponseSchema>;
declare const systemVersionResponseSchema: z$1.ZodObject<{
    currentVersion: z$1.ZodString;
    isDevelopment: z$1.ZodBoolean;
    latestVersion: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodLiteral<"npm">;
    updateAvailable: z$1.ZodBoolean;
    upgradeCommand: z$1.ZodString;
}, z$1.core.$strip>;
type SystemVersionResponse = z$1.infer<typeof systemVersionResponseSchema>;
declare const systemConfigReloadResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
declare const systemCliSkillsStatusResponseSchema: z$1.ZodObject<{
    machines: z$1.ZodArray<z$1.ZodObject<{
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        status: z$1.ZodEnum<{
            installed: "installed";
            missing: "missing";
            outdated: "outdated";
            unknown: "unknown";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type SystemCliSkillsStatusResponse = z$1.infer<typeof systemCliSkillsStatusResponseSchema>;
/** The machines to copy the built-in bb CLI skills onto. */
declare const systemInstallCliSkillsRequestSchema: z$1.ZodObject<{
    hostIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strip>;
type SystemInstallCliSkillsRequest = z$1.infer<typeof systemInstallCliSkillsRequestSchema>;
/**
 * One entry per requested machine. A machine that is offline or otherwise
 * refuses the install fails on its own without taking the others down, so the
 * caller can report exactly which machines got the skills.
 */
declare const systemInstallCliSkillsResponseSchema: z$1.ZodObject<{
    results: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        installations: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        errorMessage: z$1.ZodString;
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        ok: z$1.ZodLiteral<false>;
    }, z$1.core.$strip>], "ok">>;
}, z$1.core.$strip>;
type SystemInstallCliSkillsResponse = z$1.infer<typeof systemInstallCliSkillsResponseSchema>;
type SystemConfigReloadResponse = z$1.infer<typeof systemConfigReloadResponseSchema>;

declare const terminalSessionSchema: z$1.ZodObject<{
    closeReason: z$1.ZodNullable<z$1.ZodEnum<{
        "daemon-disconnect": "daemon-disconnect";
        "environment-destroyed": "environment-destroyed";
        "open-timeout": "open-timeout";
        "process-exit": "process-exit";
        "thread-archived": "thread-archived";
        "thread-deleted": "thread-deleted";
        user: "user";
    }>>;
    cols: z$1.ZodNumber;
    createdAt: z$1.ZodNumber;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    initialCwd: z$1.ZodString;
    lastUserInputAt: z$1.ZodNullable<z$1.ZodNumber>;
    rows: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        disconnected: "disconnected";
        exited: "exited";
        running: "running";
        starting: "starting";
    }>;
    threadId: z$1.ZodNullable<z$1.ZodString>;
    title: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type TerminalSession = z$1.infer<typeof terminalSessionSchema>;
declare const terminalListResponseSchema: z$1.ZodObject<{
    sessions: z$1.ZodArray<z$1.ZodObject<{
        closeReason: z$1.ZodNullable<z$1.ZodEnum<{
            "daemon-disconnect": "daemon-disconnect";
            "environment-destroyed": "environment-destroyed";
            "open-timeout": "open-timeout";
            "process-exit": "process-exit";
            "thread-archived": "thread-archived";
            "thread-deleted": "thread-deleted";
            user: "user";
        }>>;
        cols: z$1.ZodNumber;
        createdAt: z$1.ZodNumber;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        exitCode: z$1.ZodNullable<z$1.ZodNumber>;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        initialCwd: z$1.ZodString;
        lastUserInputAt: z$1.ZodNullable<z$1.ZodNumber>;
        rows: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            disconnected: "disconnected";
            exited: "exited";
            running: "running";
            starting: "starting";
        }>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type TerminalListResponse = z$1.infer<typeof terminalListResponseSchema>;
declare const createTerminalRequestSchema: z$1.ZodObject<{
    cols: z$1.ZodNumber;
    rows: z$1.ZodNumber;
    start: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mode: z$1.ZodLiteral<"shell">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        command: z$1.ZodString;
        mode: z$1.ZodLiteral<"command">;
    }, z$1.core.$strict>], "mode">>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        kind: z$1.ZodLiteral<"environment">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        hostId: z$1.ZodString;
        kind: z$1.ZodLiteral<"host_path">;
    }, z$1.core.$strict>], "kind">;
    title: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type CreateTerminalRequest = z$1.infer<typeof createTerminalRequestSchema>;
declare const updateTerminalRequestSchema: z$1.ZodObject<{
    title: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateTerminalRequest = z$1.infer<typeof updateTerminalRequestSchema>;
declare const terminalInputRequestSchema: z$1.ZodObject<{
    dataBase64: z$1.ZodString;
}, z$1.core.$strict>;
type TerminalInputRequest = z$1.infer<typeof terminalInputRequestSchema>;
declare const terminalResizeRequestSchema: z$1.ZodObject<{
    cols: z$1.ZodNumber;
    rows: z$1.ZodNumber;
}, z$1.core.$strict>;
type TerminalResizeRequest = z$1.infer<typeof terminalResizeRequestSchema>;
declare const terminalOutputQuerySchema: z$1.ZodObject<{
    limitChunks: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
    sinceSeq: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
    tailBytes: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
}, z$1.core.$strict>;
type TerminalOutputQuery = z$1.infer<typeof terminalOutputQuerySchema>;
declare const terminalOutputResponseSchema: z$1.ZodObject<{
    chunks: z$1.ZodArray<z$1.ZodObject<{
        dataBase64: z$1.ZodString;
        seq: z$1.ZodNumber;
    }, z$1.core.$strict>>;
    nextSeq: z$1.ZodNumber;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strict>;
type TerminalOutputResponse = z$1.infer<typeof terminalOutputResponseSchema>;

declare const timelineRowStatusSchema: z$1.ZodEnum<{
    completed: "completed";
    error: "error";
    interrupted: "interrupted";
    pending: "pending";
}>;
type TimelineRowStatus = z$1.infer<typeof timelineRowStatusSchema>;
declare const timelineRowBaseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type TimelineRowBase = z$1.infer<typeof timelineRowBaseSchema>;
declare const timelineConversationRowSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    attachments: z$1.ZodNullable<z$1.ZodObject<{
        imageUrls: z$1.ZodArray<z$1.ZodString>;
        localFilePaths: z$1.ZodArray<z$1.ZodString>;
        localFiles: z$1.ZodNumber;
        localImagePaths: z$1.ZodArray<z$1.ZodString>;
        localImages: z$1.ZodNumber;
        webImages: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    kind: z$1.ZodLiteral<"conversation">;
    mentions: z$1.ZodArray<z$1.ZodObject<{
        end: z$1.ZodNumber;
        resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            label: z$1.ZodString;
            projectId: z$1.ZodOptional<z$1.ZodString>;
            threadId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"project">;
            label: z$1.ZodString;
            projectId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"section">;
            label: z$1.ZodString;
            sectionId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            entryKind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            kind: z$1.ZodLiteral<"path">;
            label: z$1.ZodString;
            path: z$1.ZodString;
            source: z$1.ZodEnum<{
                "thread-storage": "thread-storage";
                workspace: "workspace";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"command">;
            label: z$1.ZodString;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                builtin: "builtin";
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
            trigger: z$1.ZodEnum<{
                "/": "/";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            capabilityId: z$1.ZodString;
            icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"capability">;
            label: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
        start: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    role: z$1.ZodLiteral<"user">;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    systemMessageKind: z$1.ZodEnum<{
        "child-completed": "child-completed";
        "child-failed": "child-failed";
        "child-interrupted": "child-interrupted";
        "child-needs-attention": "child-needs-attention";
        "child-outcome-batch": "child-outcome-batch";
        "ownership-assigned": "ownership-assigned";
        "ownership-removed": "ownership-removed";
        unlabeled: "unlabeled";
    }>;
    systemMessageSubject: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
        threadName: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        count: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"thread-batch">;
    }, z$1.core.$strip>], "kind">>;
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    turnRequest: z$1.ZodObject<{
        isGrouped: z$1.ZodBoolean;
        kind: z$1.ZodEnum<{
            message: "message";
            steer: "steer";
        }>;
        status: z$1.ZodEnum<{
            accepted: "accepted";
            pending: "pending";
            rejected: "rejected";
        }>;
    }, z$1.core.$strip>;
}, z$1.core.$strip>, z$1.ZodObject<{
    attachments: z$1.ZodNullable<z$1.ZodObject<{
        imageUrls: z$1.ZodArray<z$1.ZodString>;
        localFilePaths: z$1.ZodArray<z$1.ZodString>;
        localFiles: z$1.ZodNumber;
        localImagePaths: z$1.ZodArray<z$1.ZodString>;
        localImages: z$1.ZodNumber;
        webImages: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"conversation">;
    role: z$1.ZodLiteral<"assistant">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    turnRequest: z$1.ZodNull;
}, z$1.core.$strip>], "role">;
type TimelineConversationRow = z$1.infer<typeof timelineConversationRowSchema>;
declare const timelineReasoningRowSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"reasoning">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type TimelineReasoningRow = z$1.infer<typeof timelineReasoningRowSchema>;
declare const timelineSystemRowSchema: z$1.ZodUnion<readonly [z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodNullable<z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>>;
    systemKind: z$1.ZodEnum<{
        debug: "debug";
        error: "error";
        reconnect: "reconnect";
    }>;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    operationKind: z$1.ZodEnum<{
        "agent-unhandled": "agent-unhandled";
        "context-clear": "context-clear";
        "thread-interrupted": "thread-interrupted";
        "thread-provisioning": "thread-provisioning";
        compaction: "compaction";
        deprecation: "deprecation";
        generic: "generic";
        warning: "warning";
    }>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodNullable<z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>>;
    systemKind: z$1.ZodLiteral<"operation">;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>, z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    operationKind: z$1.ZodLiteral<"parent-change">;
    parentChange: z$1.ZodObject<{
        action: z$1.ZodEnum<{
            assign: "assign";
            release: "release";
            transfer: "transfer";
        }>;
        nextParentThreadId: z$1.ZodNullable<z$1.ZodString>;
        nextParentThreadTitle: z$1.ZodNullable<z$1.ZodString>;
        previousParentThreadId: z$1.ZodNullable<z$1.ZodString>;
        previousParentThreadTitle: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    systemKind: z$1.ZodLiteral<"operation">;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>], "operationKind">]>;
type TimelineSystemRow = z$1.infer<typeof timelineSystemRowSchema>;
interface TimelineWorkRowBase extends TimelineRowBase {
    kind: "work";
    status: TimelineRowStatus;
}
declare const timelineCommandWorkRowSchema: z$1.ZodObject<{
    activityIntents: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        command: z$1.ZodString;
        name: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"read">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"list_files">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        query: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"search">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        type: z$1.ZodLiteral<"unknown">;
    }, z$1.core.$strip>], "type">>;
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    command: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    cwd: z$1.ZodNullable<z$1.ZodString>;
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    output: z$1.ZodString;
    outputPreview: z$1.ZodOptional<z$1.ZodObject<{
        totalChars: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    source: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"command">;
}, z$1.core.$strip>;
type TimelineCommandWorkRow = z$1.infer<typeof timelineCommandWorkRowSchema>;
declare const timelineToolWorkRowSchema: z$1.ZodObject<{
    activityIntents: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        command: z$1.ZodString;
        name: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"read">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"list_files">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        query: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"search">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        type: z$1.ZodLiteral<"unknown">;
    }, z$1.core.$strip>], "type">>;
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    output: z$1.ZodString;
    outputPreview: z$1.ZodOptional<z$1.ZodObject<{
        totalChars: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusLabels: z$1.ZodOptional<z$1.ZodObject<{
        completed: z$1.ZodString;
        pending: z$1.ZodString;
    }, z$1.core.$strip>>;
    threadId: z$1.ZodString;
    toolArgs: z$1.ZodNullable<z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>>>;
    toolName: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"tool">;
}, z$1.core.$strip>;
type TimelineToolWorkRow = z$1.infer<typeof timelineToolWorkRowSchema>;
declare const timelineFileChangeWorkRowSchema: z$1.ZodObject<{
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    change: z$1.ZodObject<{
        diff: z$1.ZodNullable<z$1.ZodString>;
        diffStats: z$1.ZodObject<{
            added: z$1.ZodNumber;
            removed: z$1.ZodNumber;
        }, z$1.core.$strip>;
        kind: z$1.ZodNullable<z$1.ZodString>;
        movePath: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strip>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    stderr: z$1.ZodNullable<z$1.ZodString>;
    stdout: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"file-change">;
}, z$1.core.$strip>;
type TimelineFileChangeWorkRow = z$1.infer<typeof timelineFileChangeWorkRowSchema>;
declare const timelineWebSearchWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    queries: z$1.ZodArray<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"web-search">;
}, z$1.core.$strip>;
type TimelineWebSearchWorkRow = z$1.infer<typeof timelineWebSearchWorkRowSchema>;
declare const timelineWebFetchWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    pattern: z$1.ZodNullable<z$1.ZodString>;
    prompt: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    url: z$1.ZodString;
    workKind: z$1.ZodLiteral<"web-fetch">;
}, z$1.core.$strip>;
type TimelineWebFetchWorkRow = z$1.infer<typeof timelineWebFetchWorkRowSchema>;
declare const timelineImageViewWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    path: z$1.ZodString;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"image-view">;
}, z$1.core.$strip>;
type TimelineImageViewWorkRow = z$1.infer<typeof timelineImageViewWorkRowSchema>;
declare const timelineApprovalWorkRowSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    approvalKind: z$1.ZodLiteral<"file-edit">;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        denied: "denied";
        waiting: "waiting";
    }>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    target: z$1.ZodObject<{
        itemId: z$1.ZodString;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"approval">;
}, z$1.core.$strip>, z$1.ZodObject<{
    approvalKind: z$1.ZodLiteral<"permission-grant">;
    createdAt: z$1.ZodNumber;
    grantScope: z$1.ZodNullable<z$1.ZodEnum<{
        session: "session";
        turn: "turn";
    }>>;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        denied: "denied";
        granted: "granted";
        interrupted: "interrupted";
        pending: "pending";
        resolving: "resolving";
    }>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    target: z$1.ZodObject<{
        itemId: z$1.ZodString;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"approval">;
}, z$1.core.$strip>], "approvalKind">;
type TimelineApprovalWorkRow = z$1.infer<typeof timelineApprovalWorkRowSchema>;
declare const timelineQuestionWorkRowSchema: z$1.ZodObject<{
    answers: z$1.ZodNullable<z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
        freeText: z$1.ZodOptional<z$1.ZodString>;
        selected: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        answered: "answered";
        interrupted: "interrupted";
        pending: "pending";
        resolving: "resolving";
    }>;
    questions: z$1.ZodArray<z$1.ZodObject<{
        allowFreeText: z$1.ZodBoolean;
        id: z$1.ZodString;
        multiSelect: z$1.ZodBoolean;
        options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodString>;
            label: z$1.ZodString;
            value: z$1.ZodString;
        }, z$1.core.$strip>>>;
        prompt: z$1.ZodString;
        shortLabel: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"question">;
}, z$1.core.$strip>;
type TimelineQuestionWorkRow = z$1.infer<typeof timelineQuestionWorkRowSchema>;
interface TimelineDelegationWorkRow extends TimelineWorkRowBase {
    workKind: "delegation";
    callId: string;
    toolName: string;
    subagentType: string | null;
    description: string | null;
    output: string;
    completedAt: number | null;
    childRows: TimelineRow[];
}
/**
 * An agent background task — a dynamic workflow
 * or a backgrounded shell command (Bash run_in_background), discriminated by
 * `taskType`. The row outlives its spawning turn: progress and terminal state
 * arrive via thread-scoped events folded into this single row. `workflow` is
 * the merged phase/agent tree, present only for workflows; null for shell
 * commands and for workflows the agent reported no progress records for
 * (degraded rendering falls back to description + summary). `model` is the
 * spawning delegation's requested model for background agents; null for
 * commands, workflows, legacy events, and agent events that do not expose it.
 */
declare const timelineWorkflowWorkRowSchema: z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    description: z$1.ZodString;
    error: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    itemId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    model: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    summary: z$1.ZodNullable<z$1.ZodString>;
    taskStatus: z$1.ZodEnum<{
        completed: "completed";
        failed: "failed";
        killed: "killed";
        paused: "paused";
        pending: "pending";
        running: "running";
        stopped: "stopped";
    }>;
    taskType: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    usage: z$1.ZodNullable<z$1.ZodObject<{
        durationMs: z$1.ZodNumber;
        toolUses: z$1.ZodNumber;
        totalTokens: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    workKind: z$1.ZodLiteral<"workflow">;
    workflow: z$1.ZodNullable<z$1.ZodObject<{
        agents: z$1.ZodArray<z$1.ZodObject<{
            agentType: z$1.ZodOptional<z$1.ZodString>;
            attempt: z$1.ZodNumber;
            cached: z$1.ZodBoolean;
            durationMs: z$1.ZodOptional<z$1.ZodNumber>;
            error: z$1.ZodOptional<z$1.ZodString>;
            index: z$1.ZodNumber;
            isolation: z$1.ZodOptional<z$1.ZodString>;
            label: z$1.ZodString;
            lastProgressAt: z$1.ZodNumber;
            lastToolName: z$1.ZodOptional<z$1.ZodString>;
            lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
            model: z$1.ZodString;
            phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
            phaseTitle: z$1.ZodOptional<z$1.ZodString>;
            promptPreview: z$1.ZodOptional<z$1.ZodString>;
            queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
            resultPreview: z$1.ZodOptional<z$1.ZodString>;
            startedAt: z$1.ZodOptional<z$1.ZodNumber>;
            state: z$1.ZodEnum<{
                done: "done";
                failed: "failed";
                queued: "queued";
                running: "running";
                skipped: "skipped";
            }>;
            tokens: z$1.ZodOptional<z$1.ZodNumber>;
            toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
        }, z$1.core.$strip>>;
        phases: z$1.ZodArray<z$1.ZodObject<{
            index: z$1.ZodNumber;
            kind: z$1.ZodOptional<z$1.ZodString>;
            title: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
    workflowName: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type TimelineWorkflowWorkRow = z$1.infer<typeof timelineWorkflowWorkRowSchema>;
type TimelineWorkRow = TimelineCommandWorkRow | TimelineToolWorkRow | TimelineFileChangeWorkRow | TimelineWebSearchWorkRow | TimelineWebFetchWorkRow | TimelineImageViewWorkRow | TimelineApprovalWorkRow | TimelineQuestionWorkRow | TimelineDelegationWorkRow | TimelineWorkflowWorkRow;
interface TimelineTurnRow extends TimelineRowBase {
    kind: "turn";
    turnId: string;
    status: TimelineRowStatus;
    summaryCount: number;
    completedAt: number | null;
    children: TimelineRow[] | null;
}
type TimelineSourceRow = TimelineConversationRow | TimelineReasoningRow | TimelineWorkRow | TimelineSystemRow;
type TimelineRow = TimelineSourceRow | TimelineTurnRow;

declare const createExecutionInputSourcesSchema: z$1.ZodObject<{
    model: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
}, z$1.core.$strict>;
type CreateExecutionInputSources = z$1.infer<typeof createExecutionInputSourcesSchema>;
declare const createThreadRequestSchema: z$1.ZodObject<{
    environment: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"reuse">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host">;
        workspace: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"existing">;
                name: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                baseBranch: z$1.ZodString;
                kind: z$1.ZodLiteral<"new">;
            }, z$1.core.$strict>], "kind">>;
            path: z$1.ZodNullable<z$1.ZodString>;
            type: z$1.ZodLiteral<"unmanaged">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            baseBranch: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"named">;
                name: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"default">;
            }, z$1.core.$strip>], "kind">;
            type: z$1.ZodLiteral<"managed-worktree">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"personal">;
        }, z$1.core.$strip>], "type">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"project-default">;
    }, z$1.core.$strip>], "type">;
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    model: z$1.ZodOptional<z$1.ZodString>;
    origin: z$1.ZodEnum<{
        app: "app";
        capability: "capability";
        cli: "cli";
        sdk: "sdk";
    }>;
    originCapabilityId: z$1.ZodOptional<z$1.ZodString>;
    originKind: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>>;
    parentThreadId: z$1.ZodOptional<z$1.ZodString>;
    projectId: z$1.ZodString;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    sectionId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    sourceSeqEnd: z$1.ZodOptional<z$1.ZodNumber>;
    sourceThreadId: z$1.ZodOptional<z$1.ZodString>;
    startedOnBehalfOf: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodObject<{
        initiator: z$1.ZodEnum<{
            agent: "agent";
            system: "system";
        }>;
        senderThreadId: z$1.ZodString;
    }, z$1.core.$strip>>>;
    title: z$1.ZodOptional<z$1.ZodString>;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strict>;
type CreateThreadRequest = z$1.infer<typeof createThreadRequestSchema>;
declare const forkThreadRequestSchema: z$1.ZodObject<{
    agentContextSeed: z$1.ZodOptional<z$1.ZodArray<z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">, z$1.ZodObject<{
        visibility: z$1.ZodLiteral<"agent-only">;
    }, z$1.core.$strip>>>>;
    input: z$1.ZodOptional<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>>;
    origin: z$1.ZodDefault<z$1.ZodEnum<{
        app: "app";
        capability: "capability";
        cli: "cli";
        sdk: "sdk";
    }>>;
    originCapabilityId: z$1.ZodOptional<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodOptional<z$1.ZodNumber>;
    sourceThreadId: z$1.ZodString;
    title: z$1.ZodOptional<z$1.ZodString>;
    visibility: z$1.ZodDefault<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
    workspace: z$1.ZodDefault<z$1.ZodEnum<{
        isolated: "isolated";
        reuse: "reuse";
    }>>;
}, z$1.core.$strict>;
type ForkThreadRequest = z$1.infer<typeof forkThreadRequestSchema>;
declare const sendMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    mode: z$1.ZodEnum<{
        "queue-if-active": "queue-if-active";
        "steer-if-active": "steer-if-active";
        auto: "auto";
        start: "start";
        steer: "steer";
    }>;
    model: z$1.ZodOptional<z$1.ZodString>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type SendMessageRequest = z$1.infer<typeof sendMessageRequestSchema>;
declare const editMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    expectedRequestSequence: z$1.ZodOptional<z$1.ZodNumber>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    model: z$1.ZodOptional<z$1.ZodString>;
    operationId: z$1.ZodString;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type EditMessageRequest = z$1.infer<typeof editMessageRequestSchema>;
declare const editMessageResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    operationId: z$1.ZodString;
    requestSequence: z$1.ZodNumber;
}, z$1.core.$strict>;
type EditMessageResponse = z$1.infer<typeof editMessageResponseSchema>;
declare const createQueuedMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    model: z$1.ZodOptional<z$1.ZodString>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type CreateQueuedMessageRequest = z$1.infer<typeof createQueuedMessageRequestSchema>;
declare const updateQueuedMessageRequestSchema: z$1.ZodObject<{
    expectedUpdatedAt: z$1.ZodNumber;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
}, z$1.core.$strip>;
type UpdateQueuedMessageRequest = z$1.infer<typeof updateQueuedMessageRequestSchema>;
declare const sendQueuedMessageRequestSchema: z$1.ZodObject<{
    mode: z$1.ZodEnum<{
        auto: "auto";
        steer: "steer";
    }>;
}, z$1.core.$strip>;
type SendQueuedMessageRequest = z$1.infer<typeof sendQueuedMessageRequestSchema>;
declare const reorderQueuedMessageRequestSchema: z$1.ZodObject<{
    groupBoundaryQueuedMessageId: z$1.ZodOptional<z$1.ZodString>;
    nextQueuedMessageId: z$1.ZodNullable<z$1.ZodString>;
    previousQueuedMessageId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderQueuedMessageRequest = z$1.infer<typeof reorderQueuedMessageRequestSchema>;
declare const setQueuedMessageGroupBoundaryRequestSchema: z$1.ZodObject<{
    expectedGroupedPrefixQueuedMessageIds: z$1.ZodArray<z$1.ZodString>;
    groupBoundaryQueuedMessageId: z$1.ZodString;
}, z$1.core.$strip>;
type SetQueuedMessageGroupBoundaryRequest = z$1.infer<typeof setQueuedMessageGroupBoundaryRequestSchema>;
declare const sendQueuedMessageResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    queuedMessage: z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    capabilityId: z$1.ZodString;
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"capability">;
                    label: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        createdAt: z$1.ZodNumber;
        groupWithNext: z$1.ZodBoolean;
        id: z$1.ZodString;
        model: z$1.ZodString;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>;
}, z$1.core.$strip>;
type SendQueuedMessageResponse = z$1.infer<typeof sendQueuedMessageResponseSchema>;
declare const threadListResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    activity: z$1.ZodObject<{
        activeBackgroundAgentCount: z$1.ZodNumber;
        activeBackgroundCommandCount: z$1.ZodNumber;
        activeGoalCount: z$1.ZodNumber;
        activePlanModeCount: z$1.ZodNumber;
        activeWorkflowCount: z$1.ZodNumber;
    }, z$1.core.$strip>;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
    environmentHostId: z$1.ZodNullable<z$1.ZodString>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    environmentName: z$1.ZodNullable<z$1.ZodString>;
    environmentWorkspaceDisplayKind: z$1.ZodEnum<{
        "managed-worktree": "managed-worktree";
        "unmanaged-worktree": "unmanaged-worktree";
        other: "other";
    }>;
    hasPendingInteraction: z$1.ZodBoolean;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinSortKey: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strict>>;
type ThreadListResponse = z$1.infer<typeof threadListResponseSchema>;
declare const resolveThreadMentionsRequestSchema: z$1.ZodObject<{
    threadIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strict>;
type ResolveThreadMentionsRequest = z$1.infer<typeof resolveThreadMentionsRequestSchema>;
declare const resolveThreadMentionsResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    label: z$1.ZodString;
    projectId: z$1.ZodString;
    threadId: z$1.ZodString;
}, z$1.core.$strict>>;
type ResolveThreadMentionsResponse = z$1.infer<typeof resolveThreadMentionsResponseSchema>;
declare const threadSearchResponseSchema: z$1.ZodObject<{
    active: z$1.ZodObject<{
        results: z$1.ZodArray<z$1.ZodObject<{
            matches: z$1.ZodArray<z$1.ZodObject<{
                highlightRanges: z$1.ZodArray<z$1.ZodObject<{
                    end: z$1.ZodNumber;
                    start: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                sourceKind: z$1.ZodEnum<{
                    assistant_message: "assistant_message";
                    system_message: "system_message";
                    title: "title";
                    title_fallback: "title_fallback";
                    user_message: "user_message";
                }>;
                sourceSeq: z$1.ZodNullable<z$1.ZodNumber>;
                text: z$1.ZodString;
            }, z$1.core.$strict>>;
            thread: z$1.ZodObject<{
                activity: z$1.ZodObject<{
                    activeBackgroundAgentCount: z$1.ZodNumber;
                    activeBackgroundCommandCount: z$1.ZodNumber;
                    activeGoalCount: z$1.ZodNumber;
                    activePlanModeCount: z$1.ZodNumber;
                    activeWorkflowCount: z$1.ZodNumber;
                }, z$1.core.$strip>;
                archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
                createdAt: z$1.ZodNumber;
                deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
                environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
                environmentHostId: z$1.ZodNullable<z$1.ZodString>;
                environmentId: z$1.ZodNullable<z$1.ZodString>;
                environmentName: z$1.ZodNullable<z$1.ZodString>;
                environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                    "managed-worktree": "managed-worktree";
                    "unmanaged-worktree": "unmanaged-worktree";
                    other: "other";
                }>;
                hasPendingInteraction: z$1.ZodBoolean;
                id: z$1.ZodString;
                lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
                latestAttentionAt: z$1.ZodNumber;
                originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
                originKind: z$1.ZodNullable<z$1.ZodEnum<{
                    fork: "fork";
                }>>;
                parentThreadId: z$1.ZodNullable<z$1.ZodString>;
                pinSortKey: z$1.ZodNullable<z$1.ZodString>;
                pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
                projectId: z$1.ZodString;
                runtime: z$1.ZodObject<{
                    displayStatus: z$1.ZodEnum<{
                        "host-reconnecting": "host-reconnecting";
                        "waiting-for-host": "waiting-for-host";
                        active: "active";
                        error: "error";
                        idle: "idle";
                        provisioning: "provisioning";
                        starting: "starting";
                        stopping: "stopping";
                    }>;
                    hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
                }, z$1.core.$strip>;
                sectionId: z$1.ZodNullable<z$1.ZodString>;
                sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    active: "active";
                    error: "error";
                    idle: "idle";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                title: z$1.ZodNullable<z$1.ZodString>;
                titleFallback: z$1.ZodNullable<z$1.ZodString>;
                updatedAt: z$1.ZodNumber;
                visibility: z$1.ZodEnum<{
                    hidden: "hidden";
                    visible: "visible";
                }>;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>>;
        total: z$1.ZodNumber;
    }, z$1.core.$strict>;
    archived: z$1.ZodObject<{
        results: z$1.ZodArray<z$1.ZodObject<{
            matches: z$1.ZodArray<z$1.ZodObject<{
                highlightRanges: z$1.ZodArray<z$1.ZodObject<{
                    end: z$1.ZodNumber;
                    start: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                sourceKind: z$1.ZodEnum<{
                    assistant_message: "assistant_message";
                    system_message: "system_message";
                    title: "title";
                    title_fallback: "title_fallback";
                    user_message: "user_message";
                }>;
                sourceSeq: z$1.ZodNullable<z$1.ZodNumber>;
                text: z$1.ZodString;
            }, z$1.core.$strict>>;
            thread: z$1.ZodObject<{
                activity: z$1.ZodObject<{
                    activeBackgroundAgentCount: z$1.ZodNumber;
                    activeBackgroundCommandCount: z$1.ZodNumber;
                    activeGoalCount: z$1.ZodNumber;
                    activePlanModeCount: z$1.ZodNumber;
                    activeWorkflowCount: z$1.ZodNumber;
                }, z$1.core.$strip>;
                archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
                createdAt: z$1.ZodNumber;
                deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
                environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
                environmentHostId: z$1.ZodNullable<z$1.ZodString>;
                environmentId: z$1.ZodNullable<z$1.ZodString>;
                environmentName: z$1.ZodNullable<z$1.ZodString>;
                environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                    "managed-worktree": "managed-worktree";
                    "unmanaged-worktree": "unmanaged-worktree";
                    other: "other";
                }>;
                hasPendingInteraction: z$1.ZodBoolean;
                id: z$1.ZodString;
                lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
                latestAttentionAt: z$1.ZodNumber;
                originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
                originKind: z$1.ZodNullable<z$1.ZodEnum<{
                    fork: "fork";
                }>>;
                parentThreadId: z$1.ZodNullable<z$1.ZodString>;
                pinSortKey: z$1.ZodNullable<z$1.ZodString>;
                pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
                projectId: z$1.ZodString;
                runtime: z$1.ZodObject<{
                    displayStatus: z$1.ZodEnum<{
                        "host-reconnecting": "host-reconnecting";
                        "waiting-for-host": "waiting-for-host";
                        active: "active";
                        error: "error";
                        idle: "idle";
                        provisioning: "provisioning";
                        starting: "starting";
                        stopping: "stopping";
                    }>;
                    hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
                }, z$1.core.$strip>;
                sectionId: z$1.ZodNullable<z$1.ZodString>;
                sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    active: "active";
                    error: "error";
                    idle: "idle";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                title: z$1.ZodNullable<z$1.ZodString>;
                titleFallback: z$1.ZodNullable<z$1.ZodString>;
                updatedAt: z$1.ZodNumber;
                visibility: z$1.ZodEnum<{
                    hidden: "hidden";
                    visible: "visible";
                }>;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>>;
        total: z$1.ZodNumber;
    }, z$1.core.$strict>;
}, z$1.core.$strict>;
type ThreadSearchResponse = z$1.infer<typeof threadSearchResponseSchema>;
declare const threadResponseSchema: z$1.ZodObject<{
    activeBackgroundAgentCount: z$1.ZodNumber;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    canSpawnChild: z$1.ZodBoolean;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strict>;
type ThreadResponse = z$1.infer<typeof threadResponseSchema>;
declare const threadGetQuerySchema: z$1.ZodObject<{
    include: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadGetQuery = z$1.infer<typeof threadGetQuerySchema>;
declare const threadWithIncludesResponseSchema: z$1.ZodObject<{
    activeBackgroundAgentCount: z$1.ZodNumber;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    canSpawnChild: z$1.ZodBoolean;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environment: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodObject<{
        baseBranch: z$1.ZodNullable<z$1.ZodString>;
        branchName: z$1.ZodNullable<z$1.ZodString>;
        createdAt: z$1.ZodNumber;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isGitRepo: z$1.ZodBoolean;
        isWorktree: z$1.ZodBoolean;
        managed: z$1.ZodBoolean;
        mergeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodNullable<z$1.ZodString>;
        projectId: z$1.ZodString;
        status: z$1.ZodEnum<{
            destroyed: "destroyed";
            destroying: "destroying";
            error: "error";
            provisioning: "provisioning";
            ready: "ready";
            retiring: "retiring";
        }>;
        updatedAt: z$1.ZodNumber;
        workspaceProvisionType: z$1.ZodEnum<{
            "managed-worktree": "managed-worktree";
            personal: "personal";
            unmanaged: "unmanaged";
        }>;
    }, z$1.core.$strip>>>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    host: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        id: z$1.ZodString;
        lastRejectedProtocolVersion: z$1.ZodNullable<z$1.ZodNumber>;
        lastSeenAt: z$1.ZodNullable<z$1.ZodNumber>;
        maxPermissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>;
        name: z$1.ZodString;
        status: z$1.ZodEnum<{
            connected: "connected";
            disconnected: "disconnected";
        }>;
        type: z$1.ZodEnum<{
            persistent: "persistent";
        }>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>>;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    originCapabilityId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strict>;
type ThreadWithIncludesResponse = z$1.infer<typeof threadWithIncludesResponseSchema>;
declare const threadPendingInteractionsResponseSchema: z$1.ZodArray<z$1.ZodUnion<readonly [z$1.ZodObject<{
    agentSessionId: z$1.ZodString;
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        agentSessionId: z$1.ZodString;
        kind: z$1.ZodLiteral<"agent">;
        requestId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodUnion<readonly [z$1.ZodObject<{
        availableDecisions: z$1.ZodArray<z$1.ZodEnum<{
            allow_for_session: "allow_for_session";
            allow_once: "allow_once";
            deny: "deny";
        }>>;
        kind: z$1.ZodLiteral<"approval">;
        reason: z$1.ZodNullable<z$1.ZodString>;
        subject: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            actions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                command: z$1.ZodString;
                name: z$1.ZodString;
                path: z$1.ZodString;
                type: z$1.ZodLiteral<"read">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"listFiles">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                query: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"search">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                type: z$1.ZodLiteral<"unknown">;
            }, z$1.core.$strip>], "type">>;
            command: z$1.ZodString;
            cwd: z$1.ZodNullable<z$1.ZodString>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"command">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"file_change">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
            writeScope: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"permission_grant">;
            permissions: z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>;
            toolName: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plan">;
            plan: z$1.ZodString;
            planFilePath: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>], "kind">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>]>;
    requestId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">, z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>]>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodObject<{
        capabilityId: z$1.ZodString;
        kind: z$1.ZodLiteral<"capability">;
        rendererId: z$1.ZodString;
    }, z$1.core.$strip>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue$1, unknown, z$1.core.$ZodTypeInternals<JsonValue$1, unknown>>;
        kind: z$1.ZodLiteral<"capability">;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"capability_submitted">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>]>>;
type ThreadPendingInteractionsResponse = z$1.infer<typeof threadPendingInteractionsResponseSchema>;
declare const threadQueuedMessageListResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                capabilityId: z$1.ZodString;
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"capability">;
                label: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    createdAt: z$1.ZodNumber;
    groupWithNext: z$1.ZodBoolean;
    id: z$1.ZodString;
    model: z$1.ZodString;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>>;
type ThreadQueuedMessageListResponse = z$1.infer<typeof threadQueuedMessageListResponseSchema>;
declare const threadChildSummaryResponseSchema: z$1.ZodObject<{
    nonDeletedChildCount: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadChildSummaryResponse = z$1.infer<typeof threadChildSummaryResponseSchema>;
declare const deleteThreadRequestSchema: z$1.ZodObject<{
    childThreadsConfirmed: z$1.ZodBoolean;
}, z$1.core.$strip>;
type DeleteThreadRequest = z$1.infer<typeof deleteThreadRequestSchema>;
declare const updateThreadRequestSchema: z$1.ZodObject<{
    model: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    parentThreadId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>>;
    sectionId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    title: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strict>;
type UpdateThreadRequest = z$1.infer<typeof updateThreadRequestSchema>;
declare const reorderPinnedThreadRequestSchema: z$1.ZodObject<{
    nextThreadId: z$1.ZodNullable<z$1.ZodString>;
    previousThreadId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderPinnedThreadRequest = z$1.infer<typeof reorderPinnedThreadRequestSchema>;
/**
 * Requested placement for a thread opened in the app's split layout. Edge
 * placements add panes through the eighth pane; at the cap they replace the
 * focused pane. `replace` always replaces the focused pane.
 */
declare const threadOpenSplitSchema: z$1.ZodEnum<{
    down: "down";
    left: "left";
    replace: "replace";
    right: "right";
    top: "top";
}>;
type ThreadOpenSplit = z$1.infer<typeof threadOpenSplitSchema>;
/** Optional secondary-panel file to open with a thread. */
declare const threadOpenFileSchema: z$1.ZodObject<{
    lineNumber: z$1.ZodNullable<z$1.ZodNumber>;
    path: z$1.ZodString;
    source: z$1.ZodEnum<{
        "thread-storage": "thread-storage";
        workspace: "workspace";
    }>;
}, z$1.core.$strict>;
type ThreadOpenFile = z$1.infer<typeof threadOpenFileSchema>;
/** Response for POST /threads/:id/open: how many connected clients received it. */
declare const threadOpenResponseSchema: z$1.ZodObject<{
    delivered: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadOpenResponse = z$1.infer<typeof threadOpenResponseSchema>;
/** Presentation action for one thread pane in each connected app window. */
declare const threadPaneActionSchema: z$1.ZodEnum<{
    "clear-spotlight": "clear-spotlight";
    maximize: "maximize";
    restore: "restore";
    spotlight: "spotlight";
    toggle: "toggle";
}>;
type ThreadPaneAction = z$1.infer<typeof threadPaneActionSchema>;
/** Number of connected app clients that received the pane action. */
declare const threadPaneActionResponseSchema: z$1.ZodObject<{
    delivered: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadPaneActionResponse = z$1.infer<typeof threadPaneActionResponseSchema>;
declare const threadArchiveAllResponseSchema: z$1.ZodObject<{
    archivedThreadIds: z$1.ZodArray<z$1.ZodString>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type ThreadArchiveAllResponse = z$1.infer<typeof threadArchiveAllResponseSchema>;
declare const threadListQuerySchema: z$1.ZodObject<{
    archived: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    hasParent: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    includeHidden: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    offset: z$1.ZodOptional<z$1.ZodString>;
    originCapabilityId: z$1.ZodOptional<z$1.ZodString>;
    originKind: z$1.ZodOptional<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    parentThreadId: z$1.ZodOptional<z$1.ZodString>;
    projectId: z$1.ZodOptional<z$1.ZodString>;
    sectionId: z$1.ZodOptional<z$1.ZodString>;
    sourceThreadId: z$1.ZodOptional<z$1.ZodString>;
    unsectioned: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ThreadListQuery = z$1.infer<typeof threadListQuerySchema>;
declare const threadSearchQuerySchema: z$1.ZodObject<{
    limitPerGroup: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodString;
}, z$1.core.$strip>;
type ThreadSearchQuery = z$1.infer<typeof threadSearchQuerySchema>;
declare const threadTimelineQuerySchema: z$1.ZodObject<{
    afterSequence: z$1.ZodOptional<z$1.ZodString>;
    beforeAnchorId: z$1.ZodOptional<z$1.ZodString>;
    beforeAnchorSeq: z$1.ZodOptional<z$1.ZodString>;
    includeNestedRows: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    segmentLimit: z$1.ZodOptional<z$1.ZodString>;
    summaryOnly: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ThreadTimelineQuery = z$1.infer<typeof threadTimelineQuerySchema>;
declare const timelineTurnSummaryDetailsQuerySchema: z$1.ZodObject<{
    sourceSeqEnd: z$1.ZodString;
    sourceSeqStart: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>;
type TimelineTurnSummaryDetailsQuery = z$1.infer<typeof timelineTurnSummaryDetailsQuerySchema>;
declare const threadStorageFilesQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadStorageFilesQuery = z$1.infer<typeof threadStorageFilesQuerySchema>;
declare const threadStoragePathsQuerySchema: z$1.ZodObject<{
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadStoragePathsQuery = z$1.infer<typeof threadStoragePathsQuerySchema>;
declare const timelineTurnSummaryDetailsResponseSchema: z$1.ZodObject<{
    rows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
}, z$1.core.$strip>;
type TimelineTurnSummaryDetailsResponse = z$1.infer<typeof timelineTurnSummaryDetailsResponseSchema>;
declare const threadTimelineResponseSchema: z$1.ZodObject<{
    activeBackgroundCommands: z$1.ZodArray<z$1.ZodObject<{
        completedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        description: z$1.ZodString;
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"work">;
        model: z$1.ZodNullable<z$1.ZodString>;
        sourceSeqEnd: z$1.ZodNumber;
        sourceSeqStart: z$1.ZodNumber;
        startedAt: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            completed: "completed";
            error: "error";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        threadId: z$1.ZodString;
        turnId: z$1.ZodNullable<z$1.ZodString>;
        usage: z$1.ZodNullable<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workKind: z$1.ZodLiteral<"workflow">;
        workflow: z$1.ZodNullable<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    activePromptMode: z$1.ZodNullable<z$1.ZodObject<{
        mode: z$1.ZodLiteral<"plan">;
        prompt: z$1.ZodString;
    }, z$1.core.$strict>>;
    activeThinking: z$1.ZodNullable<z$1.ZodObject<{
        id: z$1.ZodString;
        startedAt: z$1.ZodNumber;
        text: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    activeWorkflows: z$1.ZodArray<z$1.ZodObject<{
        completedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        description: z$1.ZodString;
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"work">;
        model: z$1.ZodNullable<z$1.ZodString>;
        sourceSeqEnd: z$1.ZodNumber;
        sourceSeqStart: z$1.ZodNumber;
        startedAt: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            completed: "completed";
            error: "error";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        threadId: z$1.ZodString;
        turnId: z$1.ZodNullable<z$1.ZodString>;
        usage: z$1.ZodNullable<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workKind: z$1.ZodLiteral<"workflow">;
        workflow: z$1.ZodNullable<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    contextWindowUsage: z$1.ZodOptional<z$1.ZodObject<{
        estimated: z$1.ZodBoolean;
        modelContextWindow: z$1.ZodNumber;
        usedTokens: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    delta: z$1.ZodOptional<z$1.ZodObject<{
        rowOrder: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        upsertRows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
    }, z$1.core.$strip>>;
    goal: z$1.ZodNullable<z$1.ZodObject<{
        objective: z$1.ZodString;
        sourceSeq: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            active: "active";
            budgetLimited: "budgetLimited";
            complete: "complete";
            paused: "paused";
        }>;
        timeUsedSeconds: z$1.ZodNumber;
        tokenBudget: z$1.ZodNullable<z$1.ZodNumber>;
        tokensUsed: z$1.ZodNumber;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    maxSeq: z$1.ZodNumber;
    modelFallback: z$1.ZodNullable<z$1.ZodObject<{
        detectedAt: z$1.ZodNumber;
        fallbackModel: z$1.ZodString;
        message: z$1.ZodString;
        originalModel: z$1.ZodString;
        reason: z$1.ZodEnum<{
            "model-vendor": "model-vendor";
            refusal: "refusal";
        }>;
        sourceSeq: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    pendingTodos: z$1.ZodNullable<z$1.ZodObject<{
        items: z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodString;
            status: z$1.ZodEnum<{
                completed: "completed";
                in_progress: "in_progress";
                pending: "pending";
            }>;
            text: z$1.ZodString;
        }, z$1.core.$strip>>;
        sourceSeq: z$1.ZodNumber;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    rows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
    timelinePage: z$1.ZodObject<{
        hasOlderRows: z$1.ZodBoolean;
        kind: z$1.ZodEnum<{
            latest: "latest";
            older: "older";
        }>;
        olderCursor: z$1.ZodNullable<z$1.ZodObject<{
            anchorId: z$1.ZodString;
            anchorSeq: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        returnedSegmentCount: z$1.ZodNumber;
        segmentLimit: z$1.ZodNumber;
    }, z$1.core.$strict>;
}, z$1.core.$strip>;
type ThreadTimelineResponse = z$1.infer<typeof threadTimelineResponseSchema>;
declare const threadConversationOutlineResponseSchema: z$1.ZodObject<{
    items: z$1.ZodArray<z$1.ZodObject<{
        attachmentSummary: z$1.ZodNullable<z$1.ZodObject<{
            fileCount: z$1.ZodNumber;
            imageCount: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        id: z$1.ZodString;
        preview: z$1.ZodString;
        role: z$1.ZodEnum<{
            assistant: "assistant";
            user: "user";
        }>;
    }, z$1.core.$strict>>;
    maxSeq: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadConversationOutlineResponse = z$1.infer<typeof threadConversationOutlineResponseSchema>;
declare const threadStorageFileListResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    storageRootPath: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type ThreadStorageFileListResponse = z$1.infer<typeof threadStorageFileListResponseSchema>;
declare const threadStoragePathListResponseSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
        positions: z$1.ZodArray<z$1.ZodNumber>;
        score: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    storageRootPath: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type ThreadStoragePathListResponse = z$1.infer<typeof threadStoragePathListResponseSchema>;

declare const threadTabsResponseSchema: z$1.ZodObject<{
    revision: z$1.ZodNumber;
    tabs: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"thread-info">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"git-diff">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        actionId: z$1.ZodString;
        capabilityId: z$1.ZodString;
        fileOpenerOwner: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"workspace-file-preview">;
            projectId: z$1.ZodNullable<z$1.ZodString>;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
                source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"working-tree">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"head">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"merge-base">;
                    ref: z$1.ZodString;
                }, z$1.core.$strict>], "kind">;
                statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
            }, z$1.core.$strict>;
            threadId: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"thread-storage-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>], "kind">>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"capability-panel">;
        paramsJson: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"workspace-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        projectId: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"working-tree">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"head">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"merge-base">;
            ref: z$1.ZodString;
        }, z$1.core.$strict>], "kind">;
        statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isPinned: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"thread-storage-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"new-tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"side-chat">;
        sourceMessageText: z$1.ZodString;
        sourceSeqEnd: z$1.ZodNullable<z$1.ZodNumber>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"terminal">;
        target: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"environment">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            cwd: z$1.ZodNullable<z$1.ZodString>;
            hostId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host_path">;
        }, z$1.core.$strict>], "kind">>;
        terminalId: z$1.ZodString;
    }, z$1.core.$strict>], "kind">>;
}, z$1.core.$strict>;
type ThreadTabsResponse = z$1.infer<typeof threadTabsResponseSchema>;
declare const updateThreadTabsRequestSchema: z$1.ZodObject<{
    expectedRevision: z$1.ZodNumber;
    tabs: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"thread-info">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"git-diff">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        actionId: z$1.ZodString;
        capabilityId: z$1.ZodString;
        fileOpenerOwner: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"workspace-file-preview">;
            projectId: z$1.ZodNullable<z$1.ZodString>;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
                source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"working-tree">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"head">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"merge-base">;
                    ref: z$1.ZodString;
                }, z$1.core.$strict>], "kind">;
                statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
            }, z$1.core.$strict>;
            threadId: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"thread-storage-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>], "kind">>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"capability-panel">;
        paramsJson: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"workspace-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        projectId: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"working-tree">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"head">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"merge-base">;
            ref: z$1.ZodString;
        }, z$1.core.$strict>], "kind">;
        statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isPinned: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"thread-storage-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"new-tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"side-chat">;
        sourceMessageText: z$1.ZodString;
        sourceSeqEnd: z$1.ZodNullable<z$1.ZodNumber>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"terminal">;
        target: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"environment">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            cwd: z$1.ZodNullable<z$1.ZodString>;
            hostId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host_path">;
        }, z$1.core.$strict>], "kind">>;
        terminalId: z$1.ZodString;
    }, z$1.core.$strict>], "kind">>;
}, z$1.core.$strict>;
type UpdateThreadTabsRequest = z$1.infer<typeof updateThreadTabsRequestSchema>;

/**
 * A value that survives a JSON round trip without coercion or data loss.
 *
 * Host boundaries still validate values at runtime because TypeScript cannot
 * exclude non-finite numbers and capability bundles can bypass static types.
 */
type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};

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
/** Define a shared RPC contract while preserving exact method/schema types. */
declare function defineRpcContract<const Contract extends CapabilityRpcContract>(contract: Contract): Contract;
type CapabilityRpcHandlers<Contract extends CapabilityRpcContract> = {
    [Method in keyof Contract]: (input: StandardSchemaV1InferOutput<Contract[Method]["input"]>) => StandardSchemaV1InferInput<Contract[Method]["output"]> | Promise<StandardSchemaV1InferInput<Contract[Method]["output"]>>;
};
type CapabilityRpcCallInput<Method extends CapabilityRpcMethodContract> = StandardSchemaV1InferInput<Method["input"]>;
type CapabilityRpcCallArgs<Method extends CapabilityRpcMethodContract> = null extends CapabilityRpcCallInput<Method> ? [input?: CapabilityRpcCallInput<Method>] : [input: CapabilityRpcCallInput<Method>];
type CapabilityRpcResult<Method extends CapabilityRpcMethodContract> = StandardSchemaV1InferOutput<Method["output"]>;

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

interface EnvironmentActionArgs {
    environmentId: string;
}
interface EnvironmentGetArgs extends EnvironmentActionArgs {
    signal?: AbortSignal;
}
type EnvironmentMergeBaseBranchUpdateValue = Exclude<UpdateEnvironmentRequest["mergeBaseBranch"], undefined>;
type EnvironmentNameUpdateValue = Exclude<UpdateEnvironmentRequest["name"], undefined>;
interface EnvironmentMergeBaseBranchUpdate {
    mergeBaseBranch: EnvironmentMergeBaseBranchUpdateValue;
    name?: EnvironmentNameUpdateValue;
}
interface EnvironmentNameUpdate {
    mergeBaseBranch?: EnvironmentMergeBaseBranchUpdateValue;
    name: EnvironmentNameUpdateValue;
}
type EnvironmentUpdateFields = EnvironmentMergeBaseBranchUpdate | EnvironmentNameUpdate;
type EnvironmentUpdateArgs = EnvironmentUpdateFields & {
    environmentId: string;
};
interface EnvironmentStatusArgs extends EnvironmentStatusQuery {
    environmentId: string;
    signal?: AbortSignal;
}
type EnvironmentDiffArgs = EnvironmentDiffQuery & {
    environmentId: string;
    signal?: AbortSignal;
};
type EnvironmentDiffFileArgs = EnvironmentDiffFileQuery & {
    environmentId: string;
    signal?: AbortSignal;
};
interface EnvironmentDiffBranchesArgs extends EnvironmentDiffBranchesQuery {
    environmentId: string;
    signal?: AbortSignal;
}
interface EnvironmentCommitArgs {
    environmentId: string;
}
interface EnvironmentSquashMergeArgs {
    environmentId: string;
    mergeBaseBranch: string;
}
interface EnvironmentPullRequestMergeArgs {
    environmentId: string;
    method: PullRequestMergeMethod;
}
type EnvironmentDiffPatchArgs = EnvironmentDiffPatchRequest & {
    environmentId: string;
    signal?: AbortSignal;
};
interface EnvironmentPathsArgs extends EnvironmentPathsQuery {
    environmentId: string;
    signal?: AbortSignal;
}
type EnvironmentArchiveThreadsResult = EnvironmentArchiveThreadsResponse;
type EnvironmentCommitResult = CommitActionResponse;
type EnvironmentDiffResult = EnvironmentDiffResponse;
type EnvironmentDiffBranchesResult = EnvironmentDiffBranchesResponse;
type EnvironmentDiffFileResult = EnvironmentDiffFileResponse;
type EnvironmentDiffFilesResult = EnvironmentDiffFilesResponse;
type EnvironmentDiffPatchResult = EnvironmentDiffPatchResponse;
type EnvironmentGetResult = Environment;
type EnvironmentMarkPullRequestDraftResult = PullRequestDraftActionResponse;
type EnvironmentMarkPullRequestReadyResult = PullRequestReadyActionResponse;
type EnvironmentMergePullRequestResult = PullRequestMergeActionResponse;
type EnvironmentPathsResult = WorkspacePathListResponse;
type EnvironmentPullRequestResult = EnvironmentPullRequestResponse;
type EnvironmentSquashMergeResult = SquashMergeActionResponse;
type EnvironmentStatusResult = EnvironmentStatusResponse;
type EnvironmentUpdateResult = Environment;
interface EnvironmentsArea {
    archiveThreads(args: EnvironmentActionArgs): Promise<EnvironmentArchiveThreadsResult>;
    commit(args: EnvironmentCommitArgs): Promise<EnvironmentCommitResult>;
    diff(args: EnvironmentDiffArgs): Promise<EnvironmentDiffResult>;
    diffBranches(args: EnvironmentDiffBranchesArgs): Promise<EnvironmentDiffBranchesResult>;
    diffFile(args: EnvironmentDiffFileArgs): Promise<EnvironmentDiffFileResult>;
    diffFiles(args: EnvironmentDiffArgs): Promise<EnvironmentDiffFilesResult>;
    diffPatch(args: EnvironmentDiffPatchArgs): Promise<EnvironmentDiffPatchResult>;
    get(args: EnvironmentGetArgs): Promise<EnvironmentGetResult>;
    pullRequest(args: EnvironmentGetArgs): Promise<EnvironmentPullRequestResult>;
    markPullRequestDraft(args: EnvironmentActionArgs): Promise<EnvironmentMarkPullRequestDraftResult>;
    markPullRequestReady(args: EnvironmentActionArgs): Promise<EnvironmentMarkPullRequestReadyResult>;
    mergePullRequest(args: EnvironmentPullRequestMergeArgs): Promise<EnvironmentMergePullRequestResult>;
    paths(args: EnvironmentPathsArgs): Promise<EnvironmentPathsResult>;
    squashMerge(args: EnvironmentSquashMergeArgs): Promise<EnvironmentSquashMergeResult>;
    status(args: EnvironmentStatusArgs): Promise<EnvironmentStatusResult>;
    update(args: EnvironmentUpdateArgs): Promise<EnvironmentUpdateResult>;
}

/**
 * Host file primitives. `hostId` may be omitted to target the server's
 * primary (local) host. `rootPath`, when set, confines the target beneath
 * that absolute root on the host (symlink-safe).
 */
interface FileReadArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    signal?: AbortSignal;
}
interface FileWriteArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    content: string;
    /** Defaults to "utf8". */
    contentEncoding?: "base64" | "utf8";
    /** Defaults to false. */
    createParents?: boolean;
    /**
     * Optimistic-concurrency guard: omitted → unconditional write; a hash →
     * write only when the current content hashes to it (use `read().sha256`);
     * null → create-only. A failed guard resolves to the `conflict` outcome.
     */
    expectedSha256?: string | null;
    /** POSIX permission bits used when creating a file (for example 0o600). */
    mode?: number;
}
interface FileListArgs {
    hostId?: string;
    path: string;
    query?: string;
    limit?: number;
    signal?: AbortSignal;
}
interface PathListArgs extends FileListArgs {
    includeFiles: boolean;
    includeDirectories: boolean;
}
interface FileMkdirArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    recursive?: boolean;
}
interface FileMoveArgs {
    hostId?: string;
    sourcePath: string;
    destinationPath: string;
    rootPath?: string;
}
interface FileRemoveArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    recursive?: boolean;
}
interface FilePreviewArgs {
    hostId?: string;
    rootPath: string;
    signal?: AbortSignal;
    ttlMs?: number;
}
type FileReadResult = HostFileReadResponse;
type FileWriteResult = HostFileWriteResponse;
type FileListResult = HostFileListResponse;
type PathListResult = HostPathListResponse;
type FileMkdirResult = HostMkdirResponse;
type FileMoveResult = HostMovePathResponse;
type FileRemoveResult = HostRemovePathResponse;
type FilePreviewResult = CreateFilePreviewResponse;
interface FilesArea {
    read(args: FileReadArgs): Promise<FileReadResult>;
    write(args: FileWriteArgs): Promise<FileWriteResult>;
    list(args: FileListArgs): Promise<FileListResult>;
    listPaths(args: PathListArgs): Promise<PathListResult>;
    mkdir(args: FileMkdirArgs): Promise<FileMkdirResult>;
    move(args: FileMoveArgs): Promise<FileMoveResult>;
    remove(args: FileRemoveArgs): Promise<FileRemoveResult>;
    createPreview(args: FilePreviewArgs): Promise<FilePreviewResult>;
}

interface GuideRenderArgs {
    chapter?: string;
}
interface GuideRenderResult {
    chapter?: string;
    content: string;
}
interface GuideArea {
    render(args?: GuideRenderArgs): GuideRenderResult;
}

interface HostGetArgs {
    hostId: string;
    signal?: AbortSignal;
}
interface HostDeleteArgs {
    hostId: string;
}
interface HostUpdateArgs extends UpdateHostRequest {
    hostId: string;
}
interface HostRetryUpdateArgs {
    hostId: string;
}
interface HostDirectoryArgs extends HostDirectoryQuery {
    hostId: string;
    signal?: AbortSignal;
}
interface HostCloneDefaultPathArgs extends HostCloneDefaultPathQuery {
    hostId: string;
    signal?: AbortSignal;
}
interface HostPathsExistArgs extends HostPathsExistRequest {
    hostId: string;
    signal?: AbortSignal;
}
interface HostPickFolderArgs extends HostPickFolderRequest {
    hostId: string;
    signal?: AbortSignal;
}
interface HostListArgs {
    signal?: AbortSignal;
}
type HostCreateJoinCodeResult = CreateHostJoinCodeResponse;
type HostDeleteResult = {
    ok: true;
};
type HostDirectoryResult = HostDirectoryListing;
type HostGetResult = Host;
type HostCloneDefaultPathResult = HostCloneDefaultPathResponse;
type HostListResult = Host[];
type HostPathsExistResult = HostPathsExistResponse;
type HostPickFolderResult = HostPickFolderResponse;
type HostRetryUpdateResult = HostRetryUpdateResponse;
type HostUpdateResult = Host;
interface HostsArea {
    createJoinCode(): Promise<HostCreateJoinCodeResult>;
    delete(args: HostDeleteArgs): Promise<HostDeleteResult>;
    directory(args: HostDirectoryArgs): Promise<HostDirectoryResult>;
    get(args: HostGetArgs): Promise<HostGetResult>;
    cloneDefaultPath(args: HostCloneDefaultPathArgs): Promise<HostCloneDefaultPathResult>;
    list(args?: HostListArgs): Promise<HostListResult>;
    pathsExist(args: HostPathsExistArgs): Promise<HostPathsExistResult>;
    pickFolder(args: HostPickFolderArgs): Promise<HostPickFolderResult>;
    retryUpdate(args: HostRetryUpdateArgs): Promise<HostRetryUpdateResult>;
    update(args: HostUpdateArgs): Promise<HostUpdateResult>;
}

type ModelListArgs = {
    kind: "environment";
    environmentId: string;
    hostId?: never;
    signal?: AbortSignal;
} | {
    kind: "host";
    environmentId?: never;
    hostId: string;
    signal?: AbortSignal;
};
type ModelListResult = SystemModelsResponse;
interface ModelsArea {
    /**
     * List Pi models for exactly one explicit scope.
     * Environment scope includes workspace-sensitive Pi configuration; host
     * scope uses only the host's user-level Pi configuration.
     */
    list(args: ModelListArgs): Promise<ModelListResult>;
}

interface ProjectListArgs {
    include?: ProjectListQuery["include"];
    /** Include the singleton personal project. Defaults to false for compatibility. */
    includePersonal?: boolean;
    signal?: AbortSignal;
}
interface ProjectCreateArgs extends CreateProjectRequest {
}
interface ProjectGetArgs {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectUpdateArgs extends UpdateProjectRequest {
    projectId: string;
}
interface ProjectDeleteArgs {
    projectId: string;
}
interface ProjectReorderArgs extends ReorderProjectRequest {
    projectId: string;
}
interface ProjectPromptHistoryArgs extends PromptHistoryQuery {
    projectId: string;
    signal?: AbortSignal;
}
/** Select one project workspace source, or omit both for the primary host. */
type ProjectWorkspaceRoutingArgs = {
    environmentId: string;
    hostId?: never;
} | {
    environmentId?: never;
    hostId: string;
} | {
    environmentId?: never;
    hostId?: never;
};
type ProjectFilesArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectFilesQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectPathsArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectPathsQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectCommandsArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectCommandsQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectFileContentArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectFileContentQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
interface ProjectBranchesArgs extends ProjectBranchesQuery {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectDefaultExecutionOptionsArgs {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectSidebarBootstrapArgs {
    signal?: AbortSignal;
}
interface ProjectAttachmentFileLike {
    arrayBuffer(): Promise<ArrayBuffer>;
    readonly name: string;
    readonly type?: string;
}
interface ProjectAttachmentUploadArgsBase {
    /** MIME override. Omit to use the File/Blob type, when available. */
    mimeType?: string;
    projectId: string;
}
/**
 * Upload bytes owned by this SDK client. A bare Blob/byte buffer needs an
 * explicit filename; File-like values can supply their own name.
 */
type ProjectAttachmentUploadArgs = ProjectAttachmentUploadArgsBase & ({
    clientFile: ProjectAttachmentFileLike;
    filename?: string;
} | {
    clientFile: ArrayBuffer | Blob | Uint8Array;
    filename: string;
});
interface ProjectAttachmentReadArgs {
    path: string;
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectAttachmentCopyArgs extends CopyProjectAttachmentsRequest {
    projectId: string;
}
type ProjectSourceAddArgs = CreateProjectSourceRequest & {
    projectId: string;
};
interface ProjectSourceUpdateArgs extends UpdateProjectSourceRequest {
    projectId: string;
    sourceId: string;
}
interface ProjectSourceDeleteArgs {
    projectId: string;
    sourceId: string;
}
type ProjectBranchesResult = ProjectBranchesResponse;
interface ProjectAttachmentReadResult {
    bytes: Uint8Array;
    mimeType: string;
    sizeBytes: number;
}
type ProjectAttachmentUploadResult = UploadedPromptAttachment;
type ProjectCommandsResult = CommandListResponse;
type ProjectCreateResult = ProjectResponse;
type ProjectDefaultExecutionOptionsResult = ProjectExecutionDefaults | null;
type ProjectDeleteResult = {
    ok: true;
};
interface ProjectFileContentResult {
    /** UTF-8 text or base64, as selected by `contentEncoding`. */
    content: string;
    contentEncoding: "base64" | "utf8";
    mimeType: string;
    sizeBytes: number;
}
type ProjectFilesResult = WorkspaceFileListResponse;
type ProjectGetResult = ProjectResponse;
type ProjectListResult = ProjectResponse[] | ProjectWithThreadsResponse[];
type ProjectPathsResult = WorkspacePathListResponse;
type ProjectPromptHistoryResult = PromptHistoryResponse;
type ProjectReorderResult = ProjectResponse[];
type ProjectSidebarBootstrapResult = SidebarBootstrapResponse;
type ProjectSourceAddResult = ProjectSource;
type ProjectSourceDeleteResult = {
    ok: true;
};
type ProjectSourceUpdateResult = ProjectSource;
type ProjectUpdateResult = ProjectResponse;
interface ProjectSourcesArea {
    add(args: ProjectSourceAddArgs): Promise<ProjectSourceAddResult>;
    delete(args: ProjectSourceDeleteArgs): Promise<ProjectSourceDeleteResult>;
    update(args: ProjectSourceUpdateArgs): Promise<ProjectSourceUpdateResult>;
}
interface ProjectAttachmentsArea {
    copy(args: ProjectAttachmentCopyArgs): Promise<void>;
    read(args: ProjectAttachmentReadArgs): Promise<ProjectAttachmentReadResult>;
    upload(args: ProjectAttachmentUploadArgs): Promise<ProjectAttachmentUploadResult>;
}
interface ProjectsArea {
    attachments: ProjectAttachmentsArea;
    branches(args: ProjectBranchesArgs): Promise<ProjectBranchesResult>;
    commands(args: ProjectCommandsArgs): Promise<ProjectCommandsResult>;
    create(args: ProjectCreateArgs): Promise<ProjectCreateResult>;
    defaultExecutionOptions(args: ProjectDefaultExecutionOptionsArgs): Promise<ProjectDefaultExecutionOptionsResult>;
    delete(args: ProjectDeleteArgs): Promise<ProjectDeleteResult>;
    fileContent(args: ProjectFileContentArgs): Promise<ProjectFileContentResult>;
    files(args: ProjectFilesArgs): Promise<ProjectFilesResult>;
    get(args: ProjectGetArgs): Promise<ProjectGetResult>;
    list(args?: ProjectListArgs): Promise<ProjectListResult>;
    paths(args: ProjectPathsArgs): Promise<ProjectPathsResult>;
    promptHistory(args: ProjectPromptHistoryArgs): Promise<ProjectPromptHistoryResult>;
    reorder(args: ProjectReorderArgs): Promise<ProjectReorderResult>;
    /**
     * One round-trip navigation snapshot: thread sections, every project with
     * its live threads and resolved thread-creation defaults, and the personal
     * project. Backs the sidebar of the web and native apps.
     */
    sidebarBootstrap(args?: ProjectSidebarBootstrapArgs): Promise<ProjectSidebarBootstrapResult>;
    sources: ProjectSourcesArea;
    update(args: ProjectUpdateArgs): Promise<ProjectUpdateResult>;
}

interface CapabilityIdArgs {
    capabilityId: string;
}
/** Install directly from a path:, git:, npm:, or builtin: source spec. */
interface CapabilityInstallArgs {
    /**
     * `path:<dir>`, `builtin:<name>`, `npm:<package>[@<version|tag|range>]`, or
     * `git:<url>[@<spec>]`. A git spec is one ref, or a semver range resolved
     * over the repository's `[<tagPrefix>]vX.Y.Z` release tags:
     * `git:<url>@semver:<range>` and `git:<url>@semver:<tagPrefix>:<range>` say
     * range explicitly, `git:<url>@ref:<name>` says ref explicitly, and a bare
     * `^1.2.0` resolves over tags unless the repository also has a ref of that
     * literal name (which is refused as ambiguous).
     */
    source: string;
    /**
     * Directory of a multi-capability repository to install, relative to the
     * repository root (`git:` and `path:` sources only).
     */
    subdirectory?: string;
    /**
     * Name of a `.bb/capabilities.json` collection entry to install, resolved to its
     * directory in the repository. Mutually exclusive with `subdirectory`.
     */
    capability?: string;
}
/** Install a catalog entry, from BB's official catalog or another marketplace. */
interface CapabilityCatalogInstallArgs {
    entryId: string;
    /**
     * Marketplace that lists the entry. Omitted resolves across every
     * marketplace: exactly one match installs, none falls back to the bundled
     * official capability of that name, and several are refused as ambiguous.
     */
    marketplace?: string;
    /**
     * Source facts returned by installPlan for a third-party entry. The server
     * refuses the install when the listing or its git commit changed afterward.
     */
    confirmedSource?: CapabilityCatalogResolvedSource;
}
/** Ask what an install would do before confirming it. */
interface CapabilityCatalogInstallPlanArgs {
    entryId: string;
    marketplace?: string;
    signal?: AbortSignal;
}
/** Add a marketplace by `https:` manifest URL, `git:<url>[@ref]`, or `path:<dir>`. */
interface CapabilityMarketplaceAddArgs {
    source: string;
}
interface CapabilityMarketplaceListArgs {
    signal?: AbortSignal;
}
interface CapabilityMarketplaceRefreshArgs {
    /** One marketplace to refresh; omitted refreshes every one of them. */
    name?: string;
    signal?: AbortSignal;
}
interface CapabilityMarketplaceRemoveArgs {
    name: string;
}
interface CapabilityReloadArgs {
    capabilityId?: string;
}
interface CapabilityRelocateArgs extends CapabilityIdArgs {
    capabilityRoot: string;
}
interface CapabilitySettingsUpdateArgs extends CapabilityIdArgs {
    values: Record<string, JsonValue$1>;
}
interface CapabilityTokenArgs extends CapabilityIdArgs {
    rotate?: boolean;
}
interface CapabilityCheckUpdatesArgs {
    capabilityId?: string;
    signal?: AbortSignal;
}
interface CapabilityRpcArgs<TOutput> extends CapabilityIdArgs {
    input?: JsonValue$1;
    method: string;
    outputSchema: z$1.ZodType<TOutput>;
}
interface CapabilityCatalogSearchArgs {
    query: string;
    signal?: AbortSignal;
}
interface CapabilityCatalogStatusArgs {
    signal?: AbortSignal;
}
interface CapabilityGetSettingsArgs extends CapabilityIdArgs {
    signal?: AbortSignal;
}
interface CapabilityGetSourceArgs extends CapabilityIdArgs {
    signal?: AbortSignal;
}
interface CapabilityListArgs {
    signal?: AbortSignal;
}
interface CapabilityListUpdateResultsArgs {
    signal?: AbortSignal;
}
type CapabilityDisableResult = InstalledCapability;
type CapabilityEnableResult = InstalledCapability;
type CapabilityGetSettingsResult = CapabilitySettingsResponse;
type CapabilityInstallResult = InstalledCapability;
type CapabilityListResult = CapabilityListResponse;
type CapabilityRelocateResult = InstalledCapability;
type CapabilityReloadResult = CapabilityReloadResponse;
type CapabilityRemoveResult = CapabilityRemoveResponse;
type CapabilityTokenResult = CapabilityTokenResponse;
type CapabilityUpdateSettingsResult = CapabilitySettingsResponse;
type CapabilityGetSourceResult = CapabilitySourceDetail;
type CapabilityCheckUpdatesResult = CapabilityUpdateCheckEntry[];
type CapabilityApplyUpdateResult = CapabilityApplyUpdateResult$1;
type CapabilityCatalogStatusResult = CapabilityCatalogStatus;
type CapabilityCatalogSearchResult = CapabilityCatalogSearchResult$1[];
type CapabilityCatalogInstallPlanResult = CapabilityCatalogInstallPlan;
type CapabilityMarketplaceListResult = CapabilityMarketplace[];
type CapabilityMarketplaceAddResult = CapabilityMarketplace;
type CapabilityMarketplaceRefreshResult = CapabilityMarketplaceRefreshResult$1[];
interface CapabilityMarketplaceRemoveResult {
    /** Installs whose provenance became `direct`; they keep running as before. */
    convertedCapabilityIds: string[];
}
interface CapabilityCatalogArea {
    install(args: CapabilityCatalogInstallArgs): Promise<CapabilityInstallResult>;
    /** The true resolved source an install would use, before anything runs. */
    installPlan(args: CapabilityCatalogInstallPlanArgs): Promise<CapabilityCatalogInstallPlanResult>;
    search(args: CapabilityCatalogSearchArgs): Promise<CapabilityCatalogSearchResult>;
    status(args?: CapabilityCatalogStatusArgs): Promise<CapabilityCatalogStatusResult>;
}
/** Registered marketplaces. Adding one installs nothing; removing one uninstalls nothing. */
interface CapabilityMarketplacesArea {
    add(args: CapabilityMarketplaceAddArgs): Promise<CapabilityMarketplaceAddResult>;
    list(args?: CapabilityMarketplaceListArgs): Promise<CapabilityMarketplaceListResult>;
    refresh(args?: CapabilityMarketplaceRefreshArgs): Promise<CapabilityMarketplaceRefreshResult>;
    remove(args: CapabilityMarketplaceRemoveArgs): Promise<CapabilityMarketplaceRemoveResult>;
}
interface CapabilitiesArea {
    applyUpdate(args: CapabilityIdArgs): Promise<CapabilityApplyUpdateResult>;
    callRpc<TOutput>(args: CapabilityRpcArgs<TOutput>): Promise<TOutput>;
    checkUpdates(args?: CapabilityCheckUpdatesArgs): Promise<CapabilityCheckUpdatesResult>;
    catalog: CapabilityCatalogArea;
    marketplaces: CapabilityMarketplacesArea;
    disable(args: CapabilityIdArgs): Promise<CapabilityDisableResult>;
    enable(args: CapabilityIdArgs): Promise<CapabilityEnableResult>;
    getSettings(args: CapabilityGetSettingsArgs): Promise<CapabilityGetSettingsResult>;
    getSource(args: CapabilityGetSourceArgs): Promise<CapabilityGetSourceResult>;
    install(args: CapabilityInstallArgs): Promise<CapabilityInstallResult>;
    list(args?: CapabilityListArgs): Promise<CapabilityListResult>;
    relocate(args: CapabilityRelocateArgs): Promise<CapabilityRelocateResult>;
    listUpdateResults(args?: CapabilityListUpdateResultsArgs): Promise<CapabilityCheckUpdatesResult>;
    reload(args?: CapabilityReloadArgs): Promise<CapabilityReloadResult>;
    remove(args: CapabilityIdArgs): Promise<CapabilityRemoveResult>;
    token(args: CapabilityTokenArgs): Promise<CapabilityTokenResult>;
    updateSettings(args: CapabilitySettingsUpdateArgs): Promise<CapabilityUpdateSettingsResult>;
}

type BbRealtimeUnsubscribe = () => void;
type BbRealtimeEventName = "environment:changed" | "host:changed" | "project:changed" | "realtime:connection" | "system:changed" | "system:config-changed" | "thread:changed";
type ThreadRealtimeEvent = Extract<ChangedMessage, {
    entity: "thread";
}>;
type ProjectRealtimeEvent = Extract<ChangedMessage, {
    entity: "project";
}>;
type EnvironmentRealtimeEvent = Extract<ChangedMessage, {
    entity: "environment";
}>;
type HostRealtimeEvent = Extract<ChangedMessage, {
    entity: "host";
}>;
type SystemRealtimeEvent = Extract<ChangedMessage, {
    entity: "system";
}>;
type BbRealtimeConnectionState = "connected" | "connecting" | "disconnected";
interface BbRealtimeConnectionEvent {
    reconnectDelayMs: number | null;
    reconnected: boolean;
    state: BbRealtimeConnectionState;
}
/**
 * Entity-changed events are delivered as one shared object to every matching
 * listener; their payload types are readonly so a listener cannot mutate what
 * the next listener receives.
 */
interface BbRealtimeEventMap {
    "thread:changed": ThreadRealtimeEvent;
    "project:changed": ProjectRealtimeEvent;
    "environment:changed": EnvironmentRealtimeEvent;
    "host:changed": HostRealtimeEvent;
    "system:changed": SystemRealtimeEvent;
    "system:config-changed": SystemRealtimeEvent;
    "realtime:connection": BbRealtimeConnectionEvent;
}
type BbRealtimeCallback<TEventName extends BbRealtimeEventName> = (event: BbRealtimeEventMap[TEventName]) => void;
interface ThreadRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"thread:changed">;
    event: "thread:changed";
    threadId?: string;
}
interface ProjectRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"project:changed">;
    event: "project:changed";
    projectId?: string;
}
interface EnvironmentRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"environment:changed">;
    environmentId?: string;
    event: "environment:changed";
}
interface HostRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"host:changed">;
    event: "host:changed";
    hostId?: string;
}
interface SystemRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"system:changed">;
    event: "system:changed";
}
interface SystemConfigRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"system:config-changed">;
    event: "system:config-changed";
}
/**
 * Connection listeners are pure observers — they never open or hold the
 * socket. A listener registered while a socket already exists receives the
 * latest connection event as a snapshot on the next microtask, so a status
 * UI mounted after connect still learns the current state.
 */
interface RealtimeConnectionSubscribeArgs {
    callback: BbRealtimeCallback<"realtime:connection">;
    event: "realtime:connection";
}
type BbRealtimeSubscribeArgsUnion = ThreadRealtimeSubscribeArgs | ProjectRealtimeSubscribeArgs | EnvironmentRealtimeSubscribeArgs | HostRealtimeSubscribeArgs | SystemRealtimeSubscribeArgs | SystemConfigRealtimeSubscribeArgs | RealtimeConnectionSubscribeArgs;
type BbRealtimeSubscribeArgs<TEventName extends BbRealtimeEventName = BbRealtimeEventName> = Extract<BbRealtimeSubscribeArgsUnion, {
    event: TEventName;
}>;
interface BbRealtime {
    subscribe<TEventName extends BbRealtimeEventName>(args: BbRealtimeSubscribeArgs<TEventName>): BbRealtimeUnsubscribe;
}

interface StatusGetArgs {
    projectId?: string;
    signal?: AbortSignal;
    threadId?: string;
}
interface StatusThreadSummary {
    environmentId: string | null;
    id: string;
    parentThreadId: string | null;
    pinnedAt: number | null;
    projectId: string;
    status: ThreadStatus;
    title: string | null;
}
type StatusProject = ProjectResponse;
type StatusChildThreads = ThreadListResponse;
interface StatusResult {
    childThreads: StatusChildThreads | null;
    pendingTodos: ThreadTimelinePendingTodos | null;
    project: StatusProject | null;
    thread: StatusThreadSummary | null;
}
interface StatusArea {
    get(args?: StatusGetArgs): Promise<StatusResult>;
}

interface SkillWorkspaceArgs {
    projectId: string;
    environmentId: string | null;
}
interface SkillListArgs extends SkillWorkspaceArgs {
    signal?: AbortSignal;
}
interface SkillIdentityArgs extends SkillListArgs {
    skillId: string;
}
interface SkillContentArgs extends SkillIdentityArgs {
    path: string;
}
interface SkillUpdateArgs extends SkillWorkspaceArgs {
    skillId: string;
    content: string;
    revision: string;
}
interface SkillDeleteArgs extends SkillWorkspaceArgs {
    skillId: string;
}
/**
 * Registry calls proxy out to skills.sh and GitHub, and the browse grid fans
 * out one per card. Callers pass their query's AbortSignal so abandoning a
 * page cancels its requests instead of leaving them in flight.
 */
interface AbortableArgs {
    signal?: AbortSignal;
}
interface RegistrySkillsSearchArgs extends AbortableArgs {
    query?: string;
    page?: number;
    perPage?: number;
}
interface RegistrySkillIdArgs extends AbortableArgs {
    registrySkillId: string;
}
interface RegistrySkillEntriesArgs extends AbortableArgs {
    registrySkillIds: readonly string[];
}
interface RegistrySkillSourceArgs extends AbortableArgs {
    source: string;
    skillId: string;
}
interface RegistryRepositoryArgs extends AbortableArgs {
    source: string;
}
/**
 * Install is a mutation and deliberately takes no signal: its body is parsed
 * with a strict schema, so an extra key would throw at runtime.
 */
interface RegistrySkillInstallArgs {
    registrySkillId: string;
}
interface SkillsRegistryArea {
    detail(args: RegistrySkillSourceArgs): Promise<RegistrySkillDetail>;
    entries(args: RegistrySkillEntriesArgs): Promise<RegistrySkillEntriesResponse>;
    get(args: RegistrySkillIdArgs): Promise<RegistrySkill>;
    install(args: RegistrySkillInstallArgs): Promise<RegistrySkillInstallResponse>;
    repositoryStars(args: RegistryRepositoryArgs): Promise<RegistryRepositoryStars>;
    search(args?: RegistrySkillsSearchArgs): Promise<RegistrySkillsPage>;
}
interface SkillsArea {
    getContent(args: SkillContentArgs): Promise<SkillContentResponse>;
    list(args: SkillListArgs): Promise<SkillListResponse>;
    listFiles(args: SkillIdentityArgs): Promise<SkillFilesResponse>;
    registry: SkillsRegistryArea;
    remove(args: SkillDeleteArgs): Promise<{
        deletedPath: string;
    }>;
    update(args: SkillUpdateArgs): Promise<{
        filePath: string;
        revision: string;
    }>;
}

type ThemeGetResult = AppTheme;
type ThemeCatalogResult = ThemeCatalogResponse;
type ThemeSetInput = AppThemeSelection;
type ThemeSetResult = AppTheme;
interface ThemeCatalogArgs {
    signal?: AbortSignal;
}
interface ThemeGetArgs {
    signal?: AbortSignal;
}
interface ThemeArea {
    /** The active app palette, resolved server-side (built-in id or custom CSS). */
    get(args?: ThemeGetArgs): Promise<ThemeGetResult>;
    /** The custom-theme directory plus discovered themes and the active palette. */
    catalog(args?: ThemeCatalogArgs): Promise<ThemeCatalogResult>;
    /** Set the complete app appearance selection in one request. */
    set(selection: ThemeSetInput): Promise<ThemeSetResult>;
    /**
     * Activate a palette by id while preserving the active favicon color. This
     * compatibility shorthand reads the active appearance before writing the
     * complete selection; prefer the object form when both values are known.
     */
    set(themeId: string): Promise<ThemeSetResult>;
}

interface SystemAttentionArgs {
    signal?: AbortSignal;
}
interface SystemConfigArgs {
    signal?: AbortSignal;
}
interface SystemVersionArgs {
    force?: boolean;
    signal?: AbortSignal;
}
interface SystemVoiceTranscriptionArgs {
    file: Blob;
    prompt?: string;
    signal?: AbortSignal;
}
type SystemAttentionResult = SystemAttentionResponse;
type SystemConfigResult = SystemConfigResponse;
type SystemReloadConfigResult = SystemConfigReloadResponse;
type SystemInstallCliSkillsArgs = SystemInstallCliSkillsRequest;
interface SystemCliSkillsStatusArgs {
    /** Omit for every enrolled machine. */
    hostIds?: readonly string[];
    signal?: AbortSignal;
}
type SystemCliSkillsStatusResult = SystemCliSkillsStatusResponse;
type SystemInstallCliSkillsResult = SystemInstallCliSkillsResponse;
type SystemVoiceTranscriptionResult = SystemVoiceTranscriptionResponse;
type SystemUpdateExperimentsResult = Experiments;
type SystemUpdateGeneralSettingsResult = AppSettings;
type SystemUpdateKeyboardSettingsResult = AppKeybindingOverrides;
type SystemVersionResult = SystemVersionResponse;
interface SystemArea {
    attention(args?: SystemAttentionArgs): Promise<SystemAttentionResult>;
    config(args?: SystemConfigArgs): Promise<SystemConfigResult>;
    /**
     * Copy bb's built-in CLI skills into each named machine's global agent skill
     * roots(~/.agents/skills). Machines install
     * independently; the result reports each machine's outcome.
     */
    /** Per-machine install state of bb's built-in CLI skills. */
    cliSkillsStatus(args?: SystemCliSkillsStatusArgs): Promise<SystemCliSkillsStatusResult>;
    installCliSkills(args: SystemInstallCliSkillsArgs): Promise<SystemInstallCliSkillsResult>;
    reloadConfig(): Promise<SystemReloadConfigResult>;
    transcribeVoice(args: SystemVoiceTranscriptionArgs): Promise<SystemVoiceTranscriptionResult>;
    updateExperiments(args: Experiments): Promise<SystemUpdateExperimentsResult>;
    updateGeneralSettings(args: AppSettings): Promise<SystemUpdateGeneralSettingsResult>;
    updateKeyboardSettings(args: AppKeybindingOverrides): Promise<SystemUpdateKeyboardSettingsResult>;
    version(args?: SystemVersionArgs): Promise<SystemVersionResult>;
}

interface TerminalThreadScope {
    cwd?: never;
    environmentId?: never;
    hostId?: never;
    kind: "thread";
    threadId: string;
}
interface TerminalEnvironmentScope {
    environmentId: string;
    cwd?: never;
    hostId?: never;
    kind: "environment";
    threadId?: never;
}
interface TerminalHostPathListScope {
    /** Optional exact initial working-directory filter on the selected host. */
    cwd?: string;
    environmentId?: never;
    hostId: string;
    kind: "host_path";
    threadId?: never;
}
interface TerminalHostPathCreateScope {
    /** Null starts in the selected host's home directory. */
    cwd: string | null;
    environmentId?: never;
    hostId: string;
    kind: "host_path";
    threadId?: never;
}
type TerminalListScope = TerminalThreadScope | TerminalEnvironmentScope | TerminalHostPathListScope;
type TerminalCreateScope = TerminalThreadScope | TerminalEnvironmentScope | TerminalHostPathCreateScope;
interface TerminalListArgs {
    signal?: AbortSignal;
    scope: TerminalListScope;
}
interface TerminalCreateArgs {
    cols: number;
    rows: number;
    scope: TerminalCreateScope;
    start?: CreateTerminalRequest["start"];
    title?: string;
}
interface TerminalTargetArgs {
    terminalId: string;
}
interface TerminalGetArgs extends TerminalTargetArgs {
    signal?: AbortSignal;
}
interface TerminalRenameArgs extends TerminalTargetArgs {
    title: UpdateTerminalRequest["title"];
}
interface TerminalCloseArgs extends TerminalTargetArgs {
    mode: "force" | "if-clean";
}
interface TerminalInputArgs extends TerminalTargetArgs {
    dataBase64: TerminalInputRequest["dataBase64"];
}
interface TerminalResizeArgs extends TerminalTargetArgs {
    cols: TerminalResizeRequest["cols"];
    rows: TerminalResizeRequest["rows"];
}
interface TerminalOutputArgs extends TerminalTargetArgs {
    limitChunks?: TerminalOutputQuery["limitChunks"];
    signal?: AbortSignal;
    sinceSeq?: TerminalOutputQuery["sinceSeq"];
    tailBytes?: TerminalOutputQuery["tailBytes"];
}
type TerminalRestartArgs = TerminalTargetArgs;
type TerminalListResult = TerminalListResponse;
type TerminalCreateResult = TerminalSession;
type TerminalGetResult = TerminalSession;
type TerminalRenameResult = TerminalSession;
type TerminalCloseResult = TerminalSession;
type TerminalInputResult = TerminalSession;
type TerminalResizeResult = TerminalSession;
type TerminalOutputResult = TerminalOutputResponse;
type TerminalRestartResult = TerminalSession;
interface TerminalsArea {
    close(args: TerminalCloseArgs): Promise<TerminalCloseResult>;
    create(args: TerminalCreateArgs): Promise<TerminalCreateResult>;
    get(args: TerminalGetArgs): Promise<TerminalGetResult>;
    input(args: TerminalInputArgs): Promise<TerminalInputResult>;
    list(args: TerminalListArgs): Promise<TerminalListResult>;
    output(args: TerminalOutputArgs): Promise<TerminalOutputResult>;
    rename(args: TerminalRenameArgs): Promise<TerminalRenameResult>;
    /**
     * Replace a terminal with a shell at the same scope, size, and title.
     * The server serializes concurrent restarts and opens the replacement before
     * closing the old session, so a failed open leaves the old terminal running.
     * The original command is not replayed because terminal sessions do not
     * persist launch commands. The replacement has a new terminal ID.
     */
    restart(args: TerminalRestartArgs): Promise<TerminalRestartResult>;
    resize(args: TerminalResizeArgs): Promise<TerminalResizeResult>;
}

interface ThreadListArgs {
    archived?: boolean;
    sectionId?: string;
    hasParent?: boolean;
    includeHidden?: boolean;
    limit?: number;
    offset?: number;
    originKind?: ThreadListQuery["originKind"];
    originCapabilityId?: string;
    parentThreadId?: string;
    projectId?: string;
    signal?: AbortSignal;
    sourceThreadId?: string;
    unsectioned?: boolean;
}
interface ThreadSearchArgs extends ThreadSearchQuery {
    signal?: AbortSignal;
}
interface ThreadResolveMentionsArgs extends ResolveThreadMentionsRequest {
    signal?: AbortSignal;
}
interface ThreadGetArgs {
    include?: ThreadGetQuery["include"];
    signal?: AbortSignal;
    threadId: string;
}
type ThreadGetResult = ThreadResponse | ThreadWithIncludesResponse;
type ThreadListResult = ThreadListResponse;
type ThreadSearchResult = ThreadSearchResponse;
type ThreadResolveMentionsResult = ResolveThreadMentionsResponse;
interface ThreadOutputResponse {
    output: string | null;
}
type ThreadMutationResult = ThreadResponse;
type ThreadSpawnResult = ThreadResponse;
type ThreadForkResult = ThreadResponse;
type ThreadInteractionGetResult = PendingInteraction;
type ThreadInteractionListResult = ThreadPendingInteractionsResponse;
type ThreadInteractionResolveResult = PendingInteraction;
type ThreadInteractionRespondResult = PendingInteraction;
type ThreadInteractionCancelResult = PendingInteraction;
type ThreadEventsListResult = ThreadEventRow[];
type ThreadEventWaitResult = ThreadEventRow | null;
type ThreadTimelineResult = ThreadTimelineResponse;
type ThreadArchiveResult = ThreadArchiveAllResponse;
type ThreadOpenResult = ThreadOpenResponse;
type ThreadPaneActionResult = ThreadPaneActionResponse;
type ThreadDeleteResult = {
    ok: true;
};
type ThreadSendResult = {
    ok: true;
};
type ThreadEditMessageResult = EditMessageResponse;
type ThreadStopResult = {
    ok: true;
};
type ThreadCompactResult = {
    ok: true;
};
type ThreadBannerActionResult = {
    ok: true;
};
type ThreadUnarchiveResult = {
    ok: true;
};
type ThreadArchiveAllResult = ThreadArchiveAllResponse;
type ThreadReadStateResult = ThreadResponse;
type ThreadPinOrderResult = ThreadListResponse;
type ThreadPromptHistoryResult = PromptHistoryResponse;
type ThreadQueuedMessagesResult = ThreadQueuedMessageListResponse;
type ThreadQueuedMessageCreateResult = ThreadQueuedMessage;
type ThreadQueuedMessageUpdateResult = ThreadQueuedMessage;
type ThreadQueuedMessageDeleteResult = {
    ok: true;
};
type ThreadQueuedMessageReorderResult = ThreadQueuedMessageListResponse;
type ThreadQueuedMessageSendResult = SendQueuedMessageResponse;
type ThreadQueuedMessageGroupBoundaryResult = ThreadQueuedMessageListResponse;
type ThreadTabsResult = ThreadTabsResponse;
type ThreadTabsUpdateResult = ThreadTabsResponse;
type ThreadStorageFilesResult = ThreadStorageFileListResponse;
type ThreadStoragePathsResult = ThreadStoragePathListResponse;
type ThreadChildSummaryResult = ThreadChildSummaryResponse;
type ThreadDefaultExecutionOptionsResult = ResolvedThreadExecutionOptions | null;
type ThreadConversationOutlineResult = ThreadConversationOutlineResponse;
type ThreadTimelineTurnSummaryDetailsResult = TimelineTurnSummaryDetailsResponse;
interface ThreadSpawnBaseArgs extends Omit<CreateThreadRequest, "input" | "origin" | "originKind" | "startedOnBehalfOf"> {
    origin?: CreateThreadRequest["origin"];
    originKind?: CreateThreadRequest["originKind"];
    startedOnBehalfOf?: CreateThreadRequest["startedOnBehalfOf"];
}
type ThreadSpawnArgs = ThreadSpawnBaseArgs & ({
    input: CreateThreadRequest["input"];
    prompt?: never;
} | {
    input?: never;
    prompt: string;
});
interface ThreadForkArgs extends Omit<ForkThreadRequest, "origin" | "visibility" | "workspace"> {
    origin?: ForkThreadRequest["origin"];
    visibility?: ForkThreadRequest["visibility"];
    workspace?: ForkThreadRequest["workspace"];
}
interface ThreadUpdateArgs extends UpdateThreadRequest {
    threadId: string;
}
interface ThreadDeleteArgs extends DeleteThreadRequest {
    threadId: string;
}
interface ThreadSendArgs extends SendMessageRequest {
    threadId: string;
}
interface ThreadEditMessageArgs extends EditMessageRequest {
    threadId: string;
}
interface ThreadActionArgs {
    threadId: string;
}
interface ThreadStatusArgs extends ThreadActionArgs {
    signal?: AbortSignal;
}
interface ThreadPromptHistoryArgs extends PromptHistoryQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadPinOrderArgs extends ReorderPinnedThreadRequest {
    threadId: string;
}
interface ThreadQueuedMessageArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadQueuedMessageCreateArgs extends CreateQueuedMessageRequest {
    threadId: string;
}
interface ThreadQueuedMessageUpdateArgs extends ThreadQueuedMessageTargetArgs, UpdateQueuedMessageRequest {
}
interface ThreadQueuedMessageTargetArgs {
    queuedMessageId: string;
    threadId: string;
}
interface ThreadQueuedMessageSendArgs extends ThreadQueuedMessageTargetArgs, SendQueuedMessageRequest {
}
interface ThreadQueuedMessageReorderArgs extends ThreadQueuedMessageTargetArgs, ReorderQueuedMessageRequest {
}
interface ThreadQueuedMessageGroupBoundaryArgs extends SetQueuedMessageGroupBoundaryRequest {
    threadId: string;
}
interface ThreadStorageFilesArgs extends ThreadStorageFilesQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadStoragePathsArgs extends ThreadStoragePathsQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadTimelineTurnSummaryDetailsArgs extends TimelineTurnSummaryDetailsQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadTabsUpdateArgs extends UpdateThreadTabsRequest {
    threadId: string;
}
interface ThreadOpenArgs {
    threadId: string;
    split?: ThreadOpenSplit;
    file: ThreadOpenFile | null;
}
interface ThreadPaneActionArgs {
    action: ThreadPaneAction;
    threadId: string;
}
interface ThreadEventsListArgs {
    /** Return only events with a sequence greater than this value. */
    afterSeq?: string;
    /** Return only events with a sequence less than this value. */
    beforeSeq?: string;
    limit?: string;
    /** Defaults to ascending sequence order. */
    order?: "asc" | "desc";
    signal?: AbortSignal;
    threadId: string;
    /** Return only these event types. */
    types?: readonly [ThreadEventType, ...ThreadEventType[]];
}
interface ThreadEventWaitArgs {
    afterSeq?: string;
    signal?: AbortSignal;
    threadId: string;
    type: string;
    waitMs: string;
}
interface ThreadTimelineArgs extends ThreadTimelineQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadOutputArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadModelInputArgs {
    signal?: AbortSignal;
    threadId: string;
}
type ThreadModelInputResult = LatestModelInputResult;
interface ThreadInteractionListArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadInteractionTargetArgs {
    interactionId: string;
    threadId: string;
}
interface ThreadInteractionGetArgs extends ThreadInteractionTargetArgs {
    signal?: AbortSignal;
}
interface ThreadInteractionResolveArgs extends ThreadInteractionTargetArgs {
    resolution: PendingInteractionResolution;
}
interface ThreadInteractionRespondArgs extends ThreadInteractionTargetArgs {
    value: JsonValue$1;
}
type ThreadWaitTarget = {
    kind: "status";
    status: ThreadStatus;
} | {
    kind: "event";
    eventType: string;
};
interface ThreadWaitArgs {
    event?: string;
    pollIntervalMs?: number;
    signal?: AbortSignal;
    status?: ThreadStatus;
    threadId: string;
    timeoutMs?: number;
}
type ThreadWaitResult = {
    event: NonNullable<ThreadEventWaitResult>;
    matched: true;
    target: Extract<ThreadWaitTarget, {
        kind: "event";
    }>;
    threadId: string;
} | {
    matched: true;
    target: Extract<ThreadWaitTarget, {
        kind: "status";
    }>;
    thread: ThreadGetResult;
    threadId: string;
};
interface ThreadInteractionsArea {
    cancel(args: ThreadInteractionTargetArgs): Promise<ThreadInteractionCancelResult>;
    get(args: ThreadInteractionGetArgs): Promise<ThreadInteractionGetResult>;
    list(args: ThreadInteractionListArgs): Promise<ThreadInteractionListResult>;
    resolve(args: ThreadInteractionResolveArgs): Promise<ThreadInteractionResolveResult>;
    respond(args: ThreadInteractionRespondArgs): Promise<ThreadInteractionRespondResult>;
}
interface ThreadEventsArea {
    list(args: ThreadEventsListArgs): Promise<ThreadEventsListResult>;
    wait(args: ThreadEventWaitArgs): Promise<ThreadEventWaitResult>;
}
interface ThreadQueuedMessagesArea {
    create(args: ThreadQueuedMessageCreateArgs): Promise<ThreadQueuedMessageCreateResult>;
    delete(args: ThreadQueuedMessageTargetArgs): Promise<ThreadQueuedMessageDeleteResult>;
    list(args: ThreadQueuedMessageArgs): Promise<ThreadQueuedMessagesResult>;
    reorder(args: ThreadQueuedMessageReorderArgs): Promise<ThreadQueuedMessageReorderResult>;
    send(args: ThreadQueuedMessageSendArgs): Promise<ThreadQueuedMessageSendResult>;
    setGroupBoundary(args: ThreadQueuedMessageGroupBoundaryArgs): Promise<ThreadQueuedMessageGroupBoundaryResult>;
    update(args: ThreadQueuedMessageUpdateArgs): Promise<ThreadQueuedMessageUpdateResult>;
}
interface ThreadTabsArea {
    get(args: ThreadStatusArgs): Promise<ThreadTabsResult>;
    update(args: ThreadTabsUpdateArgs): Promise<ThreadTabsUpdateResult>;
}
interface ThreadsArea {
    archive(args: ThreadActionArgs): Promise<ThreadArchiveResult>;
    archiveAll(args: ThreadActionArgs): Promise<ThreadArchiveAllResult>;
    childSummary(args: ThreadStatusArgs): Promise<ThreadChildSummaryResult>;
    compact(args: ThreadActionArgs): Promise<ThreadCompactResult>;
    cancelPlan(args: ThreadActionArgs): Promise<ThreadBannerActionResult>;
    clearGoal(args: ThreadActionArgs): Promise<ThreadBannerActionResult>;
    conversationOutline(args: ThreadStatusArgs): Promise<ThreadConversationOutlineResult>;
    defaultExecutionOptions(args: ThreadStatusArgs): Promise<ThreadDefaultExecutionOptionsResult>;
    delete(args: ThreadDeleteArgs): Promise<ThreadDeleteResult>;
    editMessage(args: ThreadEditMessageArgs): Promise<ThreadEditMessageResult>;
    events: ThreadEventsArea;
    fork(args: ThreadForkArgs): Promise<ThreadForkResult>;
    get(args: ThreadGetArgs): Promise<ThreadGetResult>;
    interactions: ThreadInteractionsArea;
    list(args?: ThreadListArgs): Promise<ThreadListResult>;
    markRead(args: ThreadActionArgs): Promise<ThreadReadStateResult>;
    markUnread(args: ThreadActionArgs): Promise<ThreadReadStateResult>;
    open(args: ThreadOpenArgs): Promise<ThreadOpenResult>;
    paneAction(args: ThreadPaneActionArgs): Promise<ThreadPaneActionResult>;
    output(args: ThreadOutputArgs): Promise<ThreadOutputResponse>;
    modelInput(args: ThreadModelInputArgs): Promise<ThreadModelInputResult>;
    pin(args: ThreadActionArgs): Promise<ThreadMutationResult>;
    promptHistory(args: ThreadPromptHistoryArgs): Promise<ThreadPromptHistoryResult>;
    queuedMessages: ThreadQueuedMessagesArea;
    reorderPinned(args: ThreadPinOrderArgs): Promise<ThreadPinOrderResult>;
    resolveMentions(args: ThreadResolveMentionsArgs): Promise<ThreadResolveMentionsResult>;
    search(args: ThreadSearchArgs): Promise<ThreadSearchResult>;
    send(args: ThreadSendArgs): Promise<ThreadSendResult>;
    spawn(args: ThreadSpawnArgs): Promise<ThreadSpawnResult>;
    /**
     * Stop active work and release the loaded agent runtime. This operation is
     * idempotent and preserves thread history for a later resume.
     */
    stop(args: ThreadActionArgs): Promise<ThreadStopResult>;
    tabs: ThreadTabsArea;
    timeline(args: ThreadTimelineArgs): Promise<ThreadTimelineResult>;
    timelineTurnSummaryDetails(args: ThreadTimelineTurnSummaryDetailsArgs): Promise<ThreadTimelineTurnSummaryDetailsResult>;
    storageFiles(args: ThreadStorageFilesArgs): Promise<ThreadStorageFilesResult>;
    storagePaths(args: ThreadStoragePathsArgs): Promise<ThreadStoragePathsResult>;
    unarchive(args: ThreadActionArgs): Promise<ThreadUnarchiveResult>;
    unpin(args: ThreadActionArgs): Promise<ThreadMutationResult>;
    update(args: ThreadUpdateArgs): Promise<ThreadMutationResult>;
    wait(args: ThreadWaitArgs): Promise<ThreadWaitResult>;
}

type ThreadSectionCreateResult = ThreadSectionResponse;
type ThreadSectionUpdateResult = ThreadSectionMutationResponse;
type ThreadSectionDeleteResult = ThreadSectionMutationResponse;
type ThreadSectionListResult = ThreadSectionResponse[];
interface ThreadSectionListArgs {
    signal?: AbortSignal;
}
interface ThreadSectionsArea {
    create(args: CreateThreadSectionRequest): Promise<ThreadSectionCreateResult>;
    delete(args: DeleteThreadSectionRequest): Promise<ThreadSectionDeleteResult>;
    list(args?: ThreadSectionListArgs): Promise<ThreadSectionListResult>;
    update(args: UpdateThreadSectionRequest): Promise<ThreadSectionUpdateResult>;
}

/**
 * Every server-backed SDK area. The Node SDK adds the local `guide` area on
 * top of this; the browser SDK omits it so the generated guide templates
 * (~112 KB of markdown) stay out of the web app's boot chunk.
 */
interface BbSdkAreas extends BbRealtime {
    environments: EnvironmentsArea;
    files: FilesArea;
    hosts: HostsArea;
    models: ModelsArea;
    projects: ProjectsArea;
    capabilities: CapabilitiesArea;
    skills: SkillsArea;
    status: StatusArea;
    system: SystemArea;
    terminals: TerminalsArea;
    theme: ThemeArea;
    threadSections: ThreadSectionsArea;
    threads: ThreadsArea;
}
interface BbSdk extends BbSdkAreas {
    guide: GuideArea;
}

interface ExperimentalHostSignalContract<PayloadSchema extends StandardSchemaV1 = StandardSchemaV1> {
    readonly payload: PayloadSchema;
}
type ExperimentalHostSignals = Readonly<Record<string, ExperimentalHostSignalContract>>;
interface ExperimentalHostCallOptions {
    readonly hostId: string;
    readonly signal?: AbortSignal;
}
interface ExperimentalHostClient<Contract extends CapabilityRpcContract, Signals extends ExperimentalHostSignals = {}> {
    call<MethodName extends keyof Contract & string>(method: MethodName, input: StandardSchemaV1InferInput<Contract[MethodName]["input"]>, options: ExperimentalHostCallOptions): Promise<CapabilityRpcResult<Contract[MethodName]>>;
    /**
     * Subscribe to unexpected exits of this capability's worker on a host daemon.
     * Graceful reload, disable, uninstall, and daemon shutdown do not emit this
     * event. A later call starts a fresh worker.
     */
    experimental_onWorkerExit(handler: (event: {
        readonly hostId: string;
    }) => void | Promise<void>): () => void;
    /** Subscribe to a validated, ephemeral signal from this capability's host entry. */
    experimental_onSignal<SignalName extends keyof Signals & string>(signal: SignalName, handler: (event: ExperimentalHostSignalEvent<Signals, SignalName>) => void | Promise<void>): () => void;
}
interface ExperimentalHostSignalEvent<Signals extends ExperimentalHostSignals, SignalName extends keyof Signals & string> {
    readonly hostId: string;
    readonly payload: StandardSchemaV1InferOutput<Signals[SignalName]["payload"]>;
}
interface ExperimentalHostPaths {
    /** Persistent directory scoped to this capability on this daemon. */
    readonly dataDir: string;
    /** Temporary directory scoped to this worker process. */
    readonly tempDir: string;
}
type ExperimentalHostWatchChangeType = "create" | "delete" | "update";
interface ExperimentalHostWatchChange {
    readonly path: string;
    readonly type: ExperimentalHostWatchChangeType;
}
type ExperimentalHostWatchEvent = {
    readonly kind: "changed";
    readonly changes: readonly ExperimentalHostWatchChange[];
} | {
    readonly kind: "rescan-required";
} | {
    readonly kind: "watch-error";
    readonly message: string;
};
interface ExperimentalHostWatchOptions {
    /** Absolute directory observed by the daemon's native watcher service. */
    readonly rootPath: string;
    /** Root-relative ignore entries using the native watcher syntax. */
    readonly ignoredPaths?: readonly string[];
    /** Quiet period before one coalesced delivery. Defaults to 75 ms. */
    readonly debounceMs?: number;
    /** Maximum time changes may wait. Defaults to 500 ms. */
    readonly maxWaitMs?: number;
}
interface ExperimentalHostWatchSubscription {
    dispose(): Promise<void>;
}
interface ExperimentalHostWorkerLease {
    /** Release this worker-retention lease. Safe to call more than once. */
    dispose(): Promise<void>;
}
type ExperimentalHostWatchListener = (event: ExperimentalHostWatchEvent) => void | Promise<void>;
interface ExperimentalHostRpcContext<Signals extends ExperimentalHostSignals = {}> {
    /** Aborted when this request is cancelled or its worker is disposed. */
    readonly signal: AbortSignal;
    /** Aborted once for the lifetime of this worker process. */
    readonly lifecycle: {
        readonly signal: AbortSignal;
    };
    readonly experimental_paths: ExperimentalHostPaths;
    /** Publish a validated, ephemeral event to this capability's server entry. */
    experimental_emitSignal<SignalName extends keyof Signals & string>(signal: SignalName, payload: StandardSchemaV1InferInput<Signals[SignalName]["payload"]>): Promise<void>;
    /** Observe raw filesystem changes through the daemon's native watcher. */
    experimental_watch(options: ExperimentalHostWatchOptions, listener: ExperimentalHostWatchListener): Promise<ExperimentalHostWatchSubscription>;
    /**
     * Keep this worker alive after the current call finishes. Active calls and
     * filesystem watches already retain it; use this only for other background
     * work. The daemon may stop an unretained worker after an idle period.
     */
    experimental_retainWorker(): ExperimentalHostWorkerLease;
}
type ExperimentalHostRpcHandlers<Contract extends CapabilityRpcContract, Signals extends ExperimentalHostSignals = {}> = {
    [MethodName in keyof Contract]: (input: StandardSchemaV1InferOutput<Contract[MethodName]["input"]>, context: ExperimentalHostRpcContext<Signals>) => StandardSchemaV1InferInput<Contract[MethodName]["output"]> | Promise<StandardSchemaV1InferInput<Contract[MethodName]["output"]>>;
};
interface ExperimentalHostEntry<Contract extends CapabilityRpcContract = CapabilityRpcContract, Signals extends ExperimentalHostSignals = {}> {
    readonly experimental_apiVersion: 1;
    readonly contract: Contract;
    readonly experimental_signals?: Signals;
    readonly handlers: ExperimentalHostRpcHandlers<Contract, Signals>;
    readonly dispose?: () => void | Promise<void>;
}
/** Define the single host executable exported by `bb.host`. */
declare function experimental_defineHostEntry<const Contract extends CapabilityRpcContract, const Signals extends ExperimentalHostSignals = {}>(args: {
    contract: Contract;
    experimental_signals?: Signals;
    handlers: ExperimentalHostRpcHandlers<Contract, Signals>;
    dispose?: () => void | Promise<void>;
}): ExperimentalHostEntry<Contract, Signals>;

/**
 * The backend capability API contract — the `bb` object handed to a capability's
 * `server.ts` factory (`export default function capability(bb: BbCapabilityApi)`).
 *
 * Types only: the implementation lives in the BB server
 * (apps/server/src/services/capabilities/plugin-api.ts), which imports these
 * shapes so the contract and the implementation cannot drift. Plugin authors
 * import them type-only (`import type { BbCapabilityApi } from
 * "@get-bb/capability-sdk"`); the import is erased when BB loads the file.
 *
 * Runtime classes stay host-side. NeedsConfigurationError in particular is
 * matched by NAME, so capability code needs no runtime import:
 * `throw Object.assign(new Error(msg), { name: "NeedsConfigurationError" })`.
 */
interface CapabilityLogger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
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
type CapabilitySettingValue = string | boolean;
/** `default` present → non-optional value; absent → `T | undefined`. */
type CapabilitySettingsValues<Ds extends Record<string, CapabilitySettingDescriptor>> = {
    [K in keyof Ds]: Ds[K] extends {
        default: string | boolean;
    } ? CapabilitySettingValueOf<Ds[K]> : CapabilitySettingValueOf<Ds[K]> | undefined;
};
type CapabilitySettingValueOf<D extends CapabilitySettingDescriptor> = D extends {
    type: "boolean";
} ? boolean : string;
interface CapabilitySettingsHandle<Ds extends Record<string, CapabilitySettingDescriptor>> {
    /** Load-safe: callable inside the factory. */
    get(): Promise<CapabilitySettingsValues<Ds>>;
    /** Fires after values change through the settings route/CLI. */
    onChange(listener: (next: CapabilitySettingsValues<Ds>, prev: CapabilitySettingsValues<Ds>) => void): void;
}
interface CapabilitySettings {
    define<Ds extends Record<string, CapabilitySettingDescriptor>>(descriptors: Ds): CapabilitySettingsHandle<Ds>;
}
interface CapabilityKvStorage {
    get<T>(key: string): Promise<T | undefined>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    list(prefix?: string): Promise<string[]>;
}
interface CapabilityStorage {
    /** Namespaced JSON key-value rows in bb.db; values ≤256KB each. */
    kv: CapabilityKvStorage;
    /**
     * The capability's own SQLite database at <dataDir>/capabilities/<id>/data.db — the
     * server's better-sqlite3, WAL mode, busy_timeout 5000. Returns the same
     * open handle for the whole capability load, so calling it per request is
     * cheap; a new handle is opened only on the first call or after the
     * capability closed the previous one. The host closes handles on
     * dispose/reload; a closed handle throws on use.
     */
    database(): Database.Database;
    /**
     * Ordered-statement migration helper: statement index = migration id in a
     * `_bb_migrations` table; unapplied statements run in one transaction.
     * Append-only — never reorder or edit shipped statements.
     */
    migrate(db: Database.Database, statements: string[]): void;
}
/**
 * Thread lifecycle events a capability can observe (design §4.5). Observe-only:
 * handlers run fire-and-forget after the transition is applied and can never
 * block or veto it. `thread` is the same public DTO GET /threads/:id serves.
 */
interface CapabilityThreadEventPayloads {
    /** Fired after a thread row is created. */
    "thread.created": {
        thread: ThreadResponse;
    };
    /** Fired when a thread transitions into `active`. */
    "thread.active": {
        thread: ThreadResponse;
    };
    /** Fired when a thread transitions into `idle`. `lastAssistantText` is
     * assembled the same way GET /threads/:id/output is. */
    "thread.idle": {
        thread: ThreadResponse;
        lastAssistantText: string | null;
    };
    /** Fired when a thread transitions into `error`. `error` is the latest
     * system/error event message, when one exists. */
    "thread.failed": {
        thread: ThreadResponse;
        error: string | null;
    };
    /** Fired after a thread is archived (including cascade archives). */
    "thread.archived": {
        thread: ThreadResponse;
    };
    /** Fired after a thread is soft-deleted. */
    "thread.deleted": {
        thread: ThreadResponse;
    };
}
type CapabilityThreadEventName = keyof CapabilityThreadEventPayloads;
type CapabilityThreadEventHandler<E extends CapabilityThreadEventName> = (payload: CapabilityThreadEventPayloads[E]) => void | Promise<void>;
type CapabilityHttpAuthMode = "local" | "none" | "token";
type CapabilityHttpHandler = (context: Context) => Response | Promise<Response>;
interface CapabilityHttp {
    /**
     * Register an HTTP route, mounted at
     * `/api/v1/capabilities/<id>/http/<path>`. Auth modes (default "local"):
     * - "local": Origin/Host must be a local BB app origin; non-GET requires
     *   content-type application/json (forces a CORS preflight).
     * - "token": requires the per-capability token (`bb capability token <id>`) via
     *   the x-bb-capability-token header or ?token=.
     * - "none": no checks — only for signature-verified webhooks.
     */
    route(method: string, path: string, handler: CapabilityHttpHandler, opts?: {
        auth?: CapabilityHttpAuthMode;
    }): void;
}
interface CapabilityRpc {
    /**
     * Register a Standard Schema-driven rpc contract and its inferred handlers,
     * served at POST
     * `/api/v1/capabilities/<id>/rpc/<method>` with "local" auth semantics. The
     * host validates input before invocation and output before strict JSON
     * serialization. The response is `{ ok: true, result }` or
     * `{ ok: false, error: { code, message, issues? } }`.
     */
    register<Contract extends CapabilityRpcContract>(contract: Contract, handlers: CapabilityRpcHandlers<Contract>): void;
}
interface CapabilityRealtime {
    /**
     * Broadcast an ephemeral `capability-signal` WS message
     * `{ capabilityId, channel, payload }` to every connected client (V1 has no
     * per-channel subscriptions). `payload` must be JSON-serializable;
     * `undefined` is normalized to `null`. Nothing is persisted.
     */
    publish(channel: string, payload: unknown): void;
}
interface CapabilityBackground {
    /**
     * Register a long-lived background service. `start` runs after the
     * factory completes and should resolve when `signal` aborts
     * (dispose/reload/disable/shutdown). A crash restarts it with capped
     * exponential backoff; throwing NeedsConfigurationError marks the capability
     * `needs-configuration` and stops restarting until the next load.
     */
    service(name: string, service: {
        start(signal: AbortSignal): void | Promise<void>;
    }): void;
    /**
     * Register a cron schedule (5-field expression, server-local time). The
     * durable row keyed (capabilityId, name) is upserted at load; the periodic
     * sweep claims due rows with a CAS on next_run_at, but only while this
     * capability is loaded. Failures land in last_status/last_error, visible in
     * `bb capability list`.
     */
    schedule(name: string, cron: string, fn: () => void | Promise<void>): void;
}
interface CapabilityCliCommandInfo {
    name: string;
    summary: string;
    usage: string;
}
/** Context forwarded from the invoking CLI when known; all fields optional. */
interface CapabilityCliContext {
    cwd?: string;
    threadId?: string;
    projectId?: string;
    /** Aborted when the invoking CLI HTTP request disconnects. */
    signal?: AbortSignal;
}
type CapabilityInteractionCancelReason = "capability-disposed" | "request-aborted" | "server-restarted" | "thread-deleted" | "thread-stopped" | "timeout" | "user";
type CapabilityInteractionResult = {
    outcome: "submitted";
    value: JsonValue;
} | {
    outcome: "cancelled";
    reason: CapabilityInteractionCancelReason;
};
interface CapabilityInteractionRequest {
    threadId: string;
    rendererId: string;
    title: string;
    payload: JsonValue;
    /** Defaults to ten minutes; capped at one hour. */
    timeoutMs?: number;
}
interface CapabilityCliResult {
    exitCode: number;
    stdout?: string;
    stderr?: string;
}
/**
 * Maximum combined UTF-8 bytes accepted from capability CLI stdout and stderr.
 * This is the shared source of truth for production and the testing harness.
 */
declare const CAPABILITY_CLI_OUTPUT_MAX_BYTES: number;
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
interface CapabilityCliRegistration {
    /** Top-level command name (`bb <name> …`): lowercase [a-z0-9-]+, and not
     * a core bb command (see RESERVED_BB_CLI_COMMANDS in the server). */
    name: string;
    summary: string;
    /** Subcommand metadata rendered in help and on Capability `open`
     * without executing capability code. Parsing argv is capability-owned. */
    commands?: CapabilityCliCommandInfo[];
    run(argv: string[], ctx: CapabilityCliContext): CapabilityCliResult | Promise<CapabilityCliResult>;
}
interface CapabilityCli {
    /**
     * Register this capability's `bb` subcommand. One registration per factory
     * execution; a repeated call is rejected. Core bb commands always win
     * name collisions; reserved names are rejected at registration.
     */
    register(registration: CapabilityCliRegistration): void;
}
/** Per-turn context handed to bb.agents context providers (design §4.4). */
/** MCP-style content parts a native tool may return (design §4.4). */
type CapabilityAgentToolContentPart = {
    type: "text";
    text: string;
} | {
    type: "image";
    data: string;
    mimeType: string;
};
type CapabilityAgentToolResult = string | {
    content: CapabilityAgentToolContentPart[];
    isError?: boolean;
};
/** Per-call context handed to a native tool's execute (design §4.4). */
interface CapabilityAgentToolContext {
    threadId: string;
    projectId: string;
    /** The tool-call request's abort signal (aborts if the daemon round-trip
     * is torn down mid-call). */
    signal: AbortSignal;
}
/**
 * Native timeline labels for a capability tool, keyed by BB's own timeline row
 * status. This is experimental: BB may refine its presentation contract
 * before the field is stabilized.
 */
interface CapabilityAgentToolExperimentalStatusLabels {
    /** Label shown while the tool call is pending. */
    pending: string;
    /** Label shown after the tool call completes successfully. */
    completed: string;
}
interface CapabilityAgentToolRegistrationBase {
    /** Tool name shown to the model: [a-zA-Z0-9_-]+, unique across capabilities,
     * and not a built-in dynamic tool (see RESERVED_AGENT_TOOL_NAMES in the
     * server). */
    name: string;
    description: string;
    /**
     * Optional usage snippet appended to the thread instructions whenever
     * this tool is in the session's tool set (mirrors the built-in
     * update_environment_directory guidance). Limited to 4096 characters.
     */
    instructions?: string;
    /**
     * Optional native timeline labels. When omitted, BB shows the standard
     * tool name and arguments (for example, `Ran tool search_docs …`). Labels
     * apply only while the call is pending and after successful completion;
     * approval, error, and interruption states keep BB's standard rendering.
     */
    experimental_statusLabels?: CapabilityAgentToolExperimentalStatusLabels;
}
/** Stable, plain-data context resolved by the server for one agent session. */
interface CapabilityAgentConfigurationContext {
    thread: {
        id: string;
        title: string | null;
        parentThreadId: string | null;
        sourceThreadId: string | null;
    };
    project: {
        id: string;
        kind: "personal" | "standard";
        name: string;
        gitRemoteUrl: string | null;
    };
    environment: {
        id: string;
        name: string | null;
        path: string | null;
        workspaceProvisionType: "managed-worktree" | "personal" | "unmanaged";
        branchName: string | null;
    };
    host: {
        id: string;
        name: string;
    };
    /** The selected Pi model id for this agent session. */
    model: string;
    /** How the thread was spawned. A side chat is the builtin side-chat
     * capability's fork: `{ kind: "fork", capabilityId: "side-chat" }`. */
    origin: {
        kind: "fork" | null;
        capabilityId: string | null;
    };
}
/** Per-resolution selection returned by {@link CapabilityAgents.configure}. */
interface CapabilityAgentConfiguration {
    /** Tool names registered by this capability via `registerTool`.
     * Duplicate or unknown names reject this capability's complete selection. */
    tools: string[];
    /** Skill frontmatter names from this capability's manifest skill roots.
     * Duplicate or unknown names reject this capability's complete selection. */
    skills: string[];
    /** Include this capability's registered CLI command in the agent projection.
     * Must be `false` when the capability registers no CLI command. */
    cli: boolean;
    /** Optional dynamic instructions. Append contributions are truncated to
     * 4096 characters. Honored {@link CapabilityAgentConfiguration.experimental_instructionMode}
     * replace text is truncated to 32 KiB. */
    instructions?: string;
    /** When `"replace"`, BB uses this capability's `instructions` as the exclusive
     * system prompt for threads whose `origin.capabilityId` is this capability. Other
     * capabilities requesting replace are ignored. Omitted means append. */
    experimental_instructionMode?: "replace";
    /** When `true`, BB suffixes the existing capability disclosure onto this
     * origin-owned honored replacement prompt. Requires
     * {@link CapabilityAgentConfiguration.experimental_instructionMode} `"replace"`.
     * Only a non-empty replacement from the thread's origin carries this option.
     * Omitted preserves exclusive replacement text with no disclosure. Present
     * values other than literal `true` fail closed. */
    experimental_includeCapabilityDisclosure?: true;
}
interface CapabilityAgents {
    /**
     * Select this capability's statically registered tools and manifest skills for
     * each thread/session resolution, with optional dynamic instructions or an
     * origin-only `experimental_instructionMode: "replace"` prompt. An origin
     * replacement may also set `experimental_includeCapabilityDisclosure: true`.
     * The callback is synchronous and runs at `thread.start` / `turn.submit`; it
     * never rebuilds registrations. Exactly one callback may be registered per
     * factory execution. A throw, malformed result, duplicate id, unknown id,
     * or more than 256 tool/skill ids fails closed for this capability only.
     *
     * The projection is immutable for the constructed agent session.
     * `turn.submit` keeps it. A changed selection applies when the session is
     * next constructed. Side chats are ordinary capability-owned forks here —
     * read `origin` to detect them — and their returned tool, skill, CLI, and
     * dynamic-instruction selections apply at the same boundary.
     */
    configure(configurationProvider: (context: CapabilityAgentConfigurationContext) => CapabilityAgentConfiguration): void;
    /**
     * Register a native tool (design §4.4). `parameters` is either a zod schema
     * (validated per call; execute receives the parsed value) or a plain
     * JSON-schema object (no validation; execute receives the raw arguments as
     * `unknown`). Tools are addressed by name through `use_tool` after
     * `read_capability` and are not flattened as provider tools. A second
     * registration of the same name within this capability is rejected. Names
     * may repeat across Capabilities. Recursive local JSON Schema `$ref` chains
     * are rejected because some model providers reject a schema that contains
     * them.
     */
    registerTool<Schema extends z.ZodType>(tool: CapabilityAgentToolRegistrationBase & {
        parameters: Schema;
        execute(params: z.output<Schema>, ctx: CapabilityAgentToolContext): CapabilityAgentToolResult | Promise<CapabilityAgentToolResult>;
    }): void;
    registerTool(tool: CapabilityAgentToolRegistrationBase & {
        /** Raw JSON-schema escape hatch; params arrive unvalidated. */
        parameters: Record<string, unknown>;
        execute(params: unknown, ctx: CapabilityAgentToolContext): CapabilityAgentToolResult | Promise<CapabilityAgentToolResult>;
    }): void;
    /**
     * Contribute a dynamic section appended to thread instructions. The
     * provider runs when a thread's runtime command config is resolved
     * (thread.start / turn.submit); return null to contribute nothing for
     * that resolution. A live agent session keeps the instructions it was
     * constructed with — a changed contribution takes effect when the
     * agent session is next constructed (thread start or resume after a
     * daemon restart, environment switch, or provider restart), never
     * mid-session. Must be synchronous and fast — it sits on the
     * thread-start path. Output longer than 4096 characters is truncated; a
     * throwing provider is logged against the capability and contributes nothing.
     * A repeated registration within one factory execution is rejected.
     */
    contributeInstructions(provider: (ctx: {
        threadId: string;
        projectId: string;
    }) => string | null): void;
}
type CapabilityMentionTrigger = "!" | "#" | "$" | "@" | "~";
/** Search context handed to a mention provider (design §4.9). `projectId`/
 * `threadId` are null when the composer has not committed one yet. */
interface CapabilityMentionSearchContext {
    trigger: CapabilityMentionTrigger;
    query: string;
    projectId: string | null;
    threadId: string | null;
}
/** One row a mention renderer returns from `search`. `id` is the provider's
 * own item id — the host namespaces it before it reaches the wire. */
interface CapabilityMentionItem {
    id: string;
    title: string;
    subtitle?: string;
    icon?: string;
}
interface CapabilityMentionProviderRegistration {
    /** Unique within this capability: [a-zA-Z0-9_-]+ (no ":" — the host composes
     * wire item ids as "<providerId>:<itemId>"). */
    id: string;
    /** Section label shown above this provider's rows in the mention menu. */
    label: string;
    /**
     * Composer trigger characters this provider should answer. Omit to use the
     * default `@` mention trigger. Valid triggers are `@`, `#`, `$`, `!`, and `~`.
     */
    triggers?: readonly CapabilityMentionTrigger[];
    /**
     * Runs server-side as the user types after one of this provider's triggers
     * in the composer. Each call is time-boxed (2s) and failure-isolated: a slow
     * or throwing provider contributes an empty list — it can never break the
     * mention menu.
     */
    search(ctx: CapabilityMentionSearchContext): CapabilityMentionItem[] | Promise<CapabilityMentionItem[]>;
    /**
     * Resolves one picked item into agent context, called once per unique
     * item at message send time. The returned `context` is attached to the
     * message as an agent-visible (user-hidden) prompt input. Throwing blocks
     * the send with a visible error.
     */
    resolve(itemId: string): {
        context: string;
    } | Promise<{
        context: string;
    }>;
}
interface CapabilityUi {
    /** Block until the app submits or cancels a capability-owned composer form. */
    requestInput(request: CapabilityInteractionRequest, options?: {
        signal?: AbortSignal;
    }): Promise<CapabilityInteractionResult>;
    /**
     * Register a mention provider for the shipped app's composer (design §4.9).
     * Providers default to the `@` trigger and may opt into `#`, `$`, `!`, or
     * `~` with `triggers`. Items group under `label` in the mention menu; a
     * picked item becomes a `{ kind: "capability" }` mention resource whose context
     * is resolved once at send time. Multiple providers per capability; ids must be
     * unique within the capability.
     */
    registerMentionProvider(provider: CapabilityMentionProviderRegistration): void;
}
interface CapabilityEvents {
    /**
     * Add a thread lifecycle listener. Multiple listeners for the same event are
     * additive and run independently in registration order.
     */
    on<E extends CapabilityThreadEventName>(event: E, handler: CapabilityThreadEventHandler<E>): void;
}
interface CapabilityServerApi {
    /**
     * This BB server's own loopback base URL (e.g. "http://127.0.0.1:38886"),
     * which serves the SPA + /api + /ws. For capabilities that proxy or relay
     * traffic back to the server itself (e.g. a tunnel). Bind-gated like
     * `bb.sdk`: reading it before the server is listening throws, so prefer
     * reading it from handlers, services, and timers.
     */
    readonly loopbackBaseUrl: string;
}
interface CapabilityHosts {
    /** Create the owning capability's typed client for its singular `bb.host` entry. */
    experimental_client<Contract extends CapabilityRpcContract, Signals extends ExperimentalHostSignals = {}>(args: {
        contract: Contract;
        experimental_signals?: Signals;
    }): ExperimentalHostClient<Contract, Signals>;
}
interface CapabilityStatusApi {
    /**
     * Mark this capability `needs-configuration` (with a message shown in
     * `bb capability list` and the UI) instead of failing — e.g. a factory or
     * service that finds no API key configured. Cleared on the next load;
     * saving settings does not auto-reload in V1, so ask the user to
     * `bb capability reload <id>` after configuring.
     */
    needsConfiguration(message: string): void;
}
/**
 * The API object handed to a capability's factory (design §4). Implemented by
 * the BB server; this contract is what capability `server.ts` files compile
 * against.
 */
interface BbCapabilityApi {
    /** The capability's own id (namespaces storage, routes, commands). */
    readonly capabilityId: string;
    /** Leveled, capability-scoped logger. */
    readonly log: CapabilityLogger;
    /** Declarative settings (design §4.2). */
    readonly settings: CapabilitySettings;
    /** Namespaced KV + per-capability database (design §4.3). */
    readonly storage: CapabilityStorage;
    /** HTTP routes under /api/v1/capabilities/<id>/http/* (design §4.6). */
    readonly http: CapabilityHttp;
    /** RPC methods under /api/v1/capabilities/<id>/rpc/<method> (design §4.6). */
    readonly rpc: CapabilityRpc;
    /** Ephemeral push to connected frontends (design §4.7). */
    readonly realtime: CapabilityRealtime;
    /** Long-lived services + cron schedules (design §4.8). */
    readonly background: CapabilityBackground;
    /** Agent-facing `bb` CLI subcommand (design §4.4). */
    readonly cli: CapabilityCli;
    /** Per-turn agent context contributions (design §4.4). */
    readonly agents: CapabilityAgents;
    /** Host-rendered UI contributions (design §4.9). */
    readonly ui: CapabilityUi;
    /** Additive capability lifecycle listeners (design §4.5). */
    readonly events: CapabilityEvents;
    /** Capability-reported status (needs-configuration). */
    readonly status: CapabilityStatusApi;
    /** Read-only facts about the running server (loopback base URL). */
    readonly server: CapabilityServerApi;
    /** Server-to-daemon host control-plane declarations. */
    readonly hosts: CapabilityHosts;
    /**
     * The full BB SDK, bound to this server over loopback (design §4.1).
     * Bind-gated: reading this before the host binds the SDK throws. The real
     * server binds it before loading capabilities, so it is available from the
     * moment factories run there — but isolated harnesses may not, so prefer
     * using it from handlers, services, and timers for portability.
     * `threads.spawn` defaults `origin` to "capability" and `originCapabilityId` to
     * this capability's id so spawned threads are attributed automatically.
     */
    readonly sdk: BbSdk;
    /**
     * Register cleanup to run on reload/disable/shutdown. Hooks run LIFO.
     * The sanctioned place to clear timers and close connections.
     */
    onDispose(hook: () => void | Promise<void>): void;
}

export { CAPABILITY_CLI_OUTPUT_MAX_BYTES, defineRpcContract, experimental_defineHostEntry };
export type { BbCapabilityApi, BbContext, BbNavigate, CapabilityAgentConfiguration, CapabilityAgentConfigurationContext, CapabilityAgentToolContentPart, CapabilityAgentToolContext, CapabilityAgentToolExperimentalStatusLabels, CapabilityAgentToolRegistrationBase, CapabilityAgentToolResult, CapabilityAgents, CapabilityAppBuilder, CapabilityAppComposer, CapabilityAppContentScripts, CapabilityAppDefinition, CapabilityAppSetup, CapabilityAppSlots, CapabilityBackground, CapabilityCli, CapabilityCliCommandInfo, CapabilityCliContext, CapabilityCliExecutionResult, CapabilityCliOutputLimitError, CapabilityCliRegistration, CapabilityCliResult, CapabilityComposerApi, CapabilityComposerMention, CapabilityComposerScope, CapabilityComposerTextEffect, CapabilityComposerThreadRowStatus, CapabilityContentScriptContext, CapabilityContentScriptDisposer, CapabilityContentScriptRegistration, CapabilityDiffRendererProps, CapabilityDiffRendererRegistration, CapabilityEvents, CapabilityExtensionsSectionPageProps, CapabilityExtensionsSectionRegistration, CapabilityFileOpenerProps, CapabilityFileOpenerRegistration, CapabilityFileOpenerSource, CapabilityHomepageSectionProps, CapabilityHomepageSectionRegistration, CapabilityHosts, CapabilityHttp, CapabilityHttpAuthMode, CapabilityHttpHandler, CapabilityInteractionCancelReason, CapabilityInteractionRequest, CapabilityInteractionResult, CapabilityKvStorage, CapabilityLogger, CapabilityMentionItem, CapabilityMentionProviderRegistration, CapabilityMentionSearchContext, CapabilityMentionTrigger, CapabilityMessageActionContext, CapabilityMessageActionRegistration, CapabilityMessageDirectiveMessage, CapabilityMessageDirectiveOpenWorkspaceFile, CapabilityMessageDirectiveProps, CapabilityMessageDirectiveRegistration, CapabilityNavPanelProps, CapabilityNavPanelRegistration, CapabilityNewThreadPanelActionContext, CapabilityNewThreadPanelActionRegistration, CapabilityNewThreadPanelProps, CapabilityPanelActionOpenOptions, CapabilityPendingInteractionProps, CapabilityPendingInteractionRegistration, CapabilityPendingInteractionView, CapabilityRealtime, CapabilityRealtimeConnectionState, CapabilityRpc, CapabilityRpcCallArgs, CapabilityRpcClient, CapabilityRpcContract, CapabilityRpcError, CapabilityRpcErrorCode, CapabilityRpcHandlers, CapabilityRpcIssuePathSegment, CapabilityRpcMethodContract, CapabilityRpcResult, CapabilityRpcValidationIssue, CapabilitySdkApp, CapabilityServerApi, CapabilitySettingDescriptor, CapabilitySettingDescriptors, CapabilitySettingValue, CapabilitySettings, CapabilitySettingsHandle, CapabilitySettingsSectionProps, CapabilitySettingsSectionRegistration, CapabilitySettingsState, CapabilitySettingsValues, CapabilitySidebarFooterActionContext, CapabilitySidebarFooterActionProps, CapabilitySidebarFooterActionRegistration, CapabilitySidebarProject, CapabilitySidebarPullRequest, CapabilitySidebarSplitPane, CapabilitySidebarThread, CapabilitySidebarThreadActions, CapabilitySidebarThreadActivity, CapabilitySidebarThreadIndicator, CapabilitySidebarThreadPullRequestState, CapabilitySidebarThreadSplit, CapabilitySidebarThreadsState, CapabilitySidebarWorkspaceKind, CapabilitySourceCodeRendererProps, CapabilitySourceCodeRendererRegistration, CapabilityStatusApi, CapabilityStorage, CapabilityTargetedPanelActionOpenOptions, CapabilityThreadEventHandler, CapabilityThreadEventName, CapabilityThreadEventPayloads, CapabilityThreadHeaderActionProps, CapabilityThreadHeaderActionRegistration, CapabilityThreadListProps, CapabilityThreadListRegistration, CapabilityThreadPanelActionContext, CapabilityThreadPanelActionRegistration, CapabilityThreadPanelProps, CapabilityUi, CodeOverflowMode, ComposerCustomization, ComposerPlusMenuItem, ComposerRichTextSpec, ComposerStructuredDraft, ComposerView, DiffProps, DiffViewMode, ExperimentalHostCallOptions, ExperimentalHostClient, ExperimentalHostEntry, ExperimentalHostPaths, ExperimentalHostRpcContext, ExperimentalHostRpcHandlers, ExperimentalHostSignalContract, ExperimentalHostSignalEvent, ExperimentalHostSignals, ExperimentalHostWatchChange, ExperimentalHostWatchChangeType, ExperimentalHostWatchEvent, ExperimentalHostWatchListener, ExperimentalHostWatchOptions, ExperimentalHostWatchSubscription, ExperimentalHostWorkerLease, JsonValue, MarkdownProps, NewThreadComposerProps, NewThreadRequest, SourceCodeLineRange, SourceCodeProps, StandardSchemaV1, StandardSchemaV1InferInput, StandardSchemaV1InferOutput, StandardSchemaV1Issue, StandardSchemaV1Result, ThreadChatMessageAction, ThreadChatMessageReference, ThreadChatProps };
