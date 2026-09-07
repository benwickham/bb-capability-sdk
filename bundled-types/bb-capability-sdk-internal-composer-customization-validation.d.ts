// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

import { ComposerCustomization, CapabilityComposerThreadRowStatus } from '@get-bb/capability-sdk';

declare const CAPABILITY_SLOT_ID_PATTERN: RegExp;
type RejectionReporter = (reason: string) => void;
/**
 * Parse the runtime value handed to
 * `CapabilityContentScriptContext.experimental_setThreadRowStatus`. `undefined`
 * means the value was rejected; `null` remains the explicit clear operation.
 */
declare function normalizeCapabilityThreadRowStatus(value: unknown, onRejected: RejectionReporter): CapabilityComposerThreadRowStatus | null | undefined;
declare function requireSlotId(kind: string, value: unknown): string;
declare function requireMessageDirectiveId(kind: string, value: unknown): string;
declare function requireNonEmptyString(kind: string, field: string, value: unknown): string;
declare function requireOptionalString(kind: string, field: string, value: unknown): string | undefined;
declare function requireComponent<T>(kind: string, value: unknown): T;
declare function requireUniqueId(kind: string, seen: Set<string>, id: string): void;
/**
 * Validate one registration while isolating composer customization failures.
 * The host and test harness inject their own rejection reporters.
 */
declare function collectComposerCustomization(registration: unknown, seenIds: Set<string>, onRejected: RejectionReporter): ComposerCustomization | null;

export { CAPABILITY_SLOT_ID_PATTERN, collectComposerCustomization, normalizeCapabilityThreadRowStatus, requireComponent, requireMessageDirectiveId, requireNonEmptyString, requireOptionalString, requireSlotId, requireUniqueId };
