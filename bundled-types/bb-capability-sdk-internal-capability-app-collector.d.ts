// Portable type declarations for `@get-bb/capability-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Read the local
// bb source checkout.

import { CapabilityHomepageSectionRegistration, CapabilitySettingsSectionRegistration, CapabilityNavPanelRegistration, CapabilityThreadPanelActionRegistration, CapabilityNewThreadPanelActionRegistration, ComposerCustomization, CapabilityPendingInteractionRegistration, CapabilitySidebarFooterActionRegistration, CapabilityThreadListRegistration, CapabilityThreadHeaderActionRegistration, CapabilityFileOpenerRegistration, CapabilitySourceCodeRendererRegistration, CapabilityDiffRendererRegistration, CapabilityMessageDirectiveRegistration, CapabilityMessageActionRegistration, CapabilityExtensionsSectionRegistration, CapabilityContentScriptRegistration, CapabilityAppDefinition } from '@get-bb/capability-sdk';

/** Validated registrations produced by one capability app setup execution. */
interface CollectedCapabilityAppRegistrations {
    homepageSections: CapabilityHomepageSectionRegistration[];
    settingsSections: CapabilitySettingsSectionRegistration[];
    navPanels: CapabilityNavPanelRegistration[];
    threadPanelActions: CapabilityThreadPanelActionRegistration[];
    newThreadPanelActions: CapabilityNewThreadPanelActionRegistration[];
    composerCustomizations: ComposerCustomization[];
    pendingInteractions: CapabilityPendingInteractionRegistration[];
    sidebarFooterActions: CapabilitySidebarFooterActionRegistration[];
    threadLists: CapabilityThreadListRegistration[];
    threadHeaderActions: CapabilityThreadHeaderActionRegistration[];
    fileOpeners: CapabilityFileOpenerRegistration[];
    sourceCodeRenderers: CapabilitySourceCodeRendererRegistration[];
    diffRenderers: CapabilityDiffRendererRegistration[];
    messageDirectives: CapabilityMessageDirectiveRegistration[];
    messageActions: CapabilityMessageActionRegistration[];
    extensionsSections: CapabilityExtensionsSectionRegistration[];
    contentScripts: CapabilityContentScriptRegistration[];
}
/**
 * Run a capability app definition against the canonical validating collector.
 * Both the BB app and the public test harness use this implementation so a
 * registration accepted by one cannot be rejected or normalized differently
 * by the other.
 */
declare function collectCapabilityAppRegistrations(definition: CapabilityAppDefinition, onComposerCustomizationRejected?: (reason: string) => void): CollectedCapabilityAppRegistrations;

export { collectCapabilityAppRegistrations };
export type { CollectedCapabilityAppRegistrations };
