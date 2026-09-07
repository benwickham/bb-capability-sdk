// src/internal/composer-customization-validation.ts
var CAPABILITY_SLOT_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
var CAPABILITY_MESSAGE_DIRECTIVE_ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
function requireSlotId(kind, value) {
  if (typeof value !== "string" || !CAPABILITY_SLOT_ID_PATTERN.test(value)) {
    throw new Error(
      `${kind}: "id" must match ${String(CAPABILITY_SLOT_ID_PATTERN)}, got ${JSON.stringify(value)}`
    );
  }
  return value;
}
function requireMessageDirectiveId(kind, value) {
  if (typeof value !== "string" || !CAPABILITY_MESSAGE_DIRECTIVE_ID_PATTERN.test(value)) {
    throw new Error(
      `${kind}: "id" must match ${String(CAPABILITY_MESSAGE_DIRECTIVE_ID_PATTERN)}, got ${JSON.stringify(value)}`
    );
  }
  return value;
}
function requireNonEmptyString(kind, field, value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${kind}: "${field}" must be a non-empty string`);
  }
  return value;
}
function requireOptionalString(kind, field, value) {
  if (value !== void 0 && typeof value !== "string") {
    throw new Error(`${kind}: "${field}" must be a string when set`);
  }
  return value;
}
function requireComponent(kind, value) {
  if (typeof value !== "function") {
    throw new Error(`${kind}: "component" must be a React component function`);
  }
  return value;
}
function requireFunction(kind, field, value) {
  if (typeof value !== "function") {
    throw new Error(`${kind}: "${field}" must be a function`);
  }
  return value;
}
function requireUniqueId(kind, seen, id) {
  if (seen.has(id)) {
    throw new Error(`${kind}: duplicate id "${id}"`);
  }
  seen.add(id);
}
function parseContributionArray(kind, value, onRejected, parse) {
  if (value === void 0) return void 0;
  if (!Array.isArray(value)) {
    onRejected(`${kind}: must be an array when set`);
    return void 0;
  }
  const seenIds = /* @__PURE__ */ new Set();
  const parsed = [];
  for (const [index, entry] of value.entries()) {
    const entryKind = `${kind}[${index}]`;
    try {
      const parsedEntry = parse(entryKind, entry);
      requireUniqueId(entryKind, seenIds, parsedEntry.id);
      parsed.push(parsedEntry);
    } catch (error) {
      onRejected(error instanceof Error ? error.message : String(error));
    }
  }
  return parsed;
}
function parseRegions(kind, registration, onRejected) {
  const actions = parseContributionArray(`${kind}.actions`, registration.actions, onRejected, (entryKind, value) => {
    const entry = value;
    return {
      id: requireSlotId(entryKind, entry?.id),
      component: requireComponent(entryKind, entry?.component)
    };
  });
  const banners = parseContributionArray(`${kind}.banners`, registration.banners, onRejected, (entryKind, value) => {
    const entry = value;
    const id = requireSlotId(entryKind, entry?.id);
    const chrome = entry?.chrome;
    if (chrome !== void 0 && chrome !== "card" && chrome !== "bare") {
      throw new Error(
        `${entryKind}: "chrome" must be "card" or "bare" when set`
      );
    }
    return {
      id,
      ...chrome !== void 0 ? { chrome } : {},
      component: requireComponent(entryKind, entry?.component)
    };
  });
  const plusMenu = parseContributionArray(
    `${kind}.plusMenu`,
    registration.plusMenu,
    onRejected,
    (entryKind, value) => {
      const entry = value;
      const id = requireSlotId(entryKind, entry?.id);
      const icon = requireOptionalString(entryKind, "icon", entry?.icon);
      const description = requireOptionalString(
        entryKind,
        "description",
        entry?.description
      );
      const disabled = entry?.disabled;
      if (disabled !== void 0 && typeof disabled !== "boolean" && typeof disabled !== "function") {
        throw new Error(
          `${entryKind}: "disabled" must be a boolean or function when set`
        );
      }
      return {
        id,
        label: requireNonEmptyString(entryKind, "label", entry?.label),
        ...icon !== void 0 ? { icon } : {},
        ...description !== void 0 ? { description } : {},
        ...disabled !== void 0 ? {
          disabled
        } : {},
        run: requireFunction(entryKind, "run", entry?.run)
      };
    }
  );
  let richText;
  if (registration.richText !== void 0) {
    const raw = registration.richText;
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      onRejected(`${kind}.richText: must be an object when set`);
    } else {
      const effects = parseContributionArray(
        `${kind}.richText.effects`,
        raw.effects,
        onRejected,
        (entryKind, value) => {
          const entry = value;
          return {
            id: requireSlotId(entryKind, entry?.id),
            match: requireFunction(entryKind, "match", entry?.match),
            className: requireNonEmptyString(
              entryKind,
              "className",
              entry?.className
            )
          };
        }
      );
      const onDraftChange = raw.onDraftChange;
      if (onDraftChange !== void 0 && typeof onDraftChange !== "function") {
        onRejected(
          `${kind}.richText: "onDraftChange" must be a function when set`
        );
      }
      richText = {
        ...effects !== void 0 ? { effects } : {},
        ...typeof onDraftChange === "function" ? {
          onDraftChange
        } : {}
      };
    }
  }
  return {
    ...actions !== void 0 ? { actions } : {},
    ...banners !== void 0 ? { banners } : {},
    ...plusMenu !== void 0 ? { plusMenu } : {},
    ...richText !== void 0 ? { richText } : {}
  };
}
function collectComposerCustomization(registration, seenIds, onRejected) {
  const kind = "composer.customize";
  try {
    const raw = registration;
    const id = requireSlotId(kind, raw?.id);
    const scopes = raw?.scopes;
    if (scopes !== void 0) {
      if (!Array.isArray(scopes)) {
        throw new Error(`${kind}: "scopes" must be an array when set`);
      }
      for (const scope of scopes) {
        if (scope !== "thread" && scope !== "queued-message" && scope !== "side-chat" && scope !== "new-thread") {
          throw new Error(
            `${kind}: invalid scope kind ${JSON.stringify(scope)}`
          );
        }
      }
    }
    requireUniqueId(kind, seenIds, id);
    return {
      id,
      ...scopes !== void 0 ? { scopes: [...scopes] } : {},
      ...parseRegions(`${kind}(${id})`, raw ?? {}, onRejected)
    };
  } catch (error) {
    onRejected(error instanceof Error ? error.message : String(error));
    return null;
  }
}

// src/internal/capability-app-collector.ts
function collectCapabilityAppRegistrations(definition, onComposerCustomizationRejected = (reason) => console.warn(reason)) {
  const collected = {
    homepageSections: [],
    settingsSections: [],
    navPanels: [],
    threadPanelActions: [],
    newThreadPanelActions: [],
    composerCustomizations: [],
    pendingInteractions: [],
    sidebarFooterActions: [],
    threadLists: [],
    threadHeaderActions: [],
    fileOpeners: [],
    sourceCodeRenderers: [],
    diffRenderers: [],
    messageDirectives: [],
    messageActions: [],
    extensionsSections: [],
    contentScripts: []
  };
  const seenIds = {
    homepageSection: /* @__PURE__ */ new Set(),
    settingsSection: /* @__PURE__ */ new Set(),
    navPanel: /* @__PURE__ */ new Set(),
    threadPanelAction: /* @__PURE__ */ new Set(),
    newThreadPanelAction: /* @__PURE__ */ new Set(),
    composerCustomization: /* @__PURE__ */ new Set(),
    pendingInteraction: /* @__PURE__ */ new Set(),
    sidebarFooterAction: /* @__PURE__ */ new Set(),
    threadList: /* @__PURE__ */ new Set(),
    threadHeaderAction: /* @__PURE__ */ new Set(),
    fileOpener: /* @__PURE__ */ new Set(),
    sourceCodeRenderer: /* @__PURE__ */ new Set(),
    diffRenderer: /* @__PURE__ */ new Set(),
    messageDirective: /* @__PURE__ */ new Set(),
    messageAction: /* @__PURE__ */ new Set(),
    extensionsSection: /* @__PURE__ */ new Set(),
    contentScript: /* @__PURE__ */ new Set()
  };
  definition.setup({
    slots: {
      homepageSection(registration) {
        const kind = "slots.homepageSection";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.homepageSection, id);
        collected.homepageSections.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          component: requireComponent(kind, registration.component)
        });
      },
      settingsSection(registration) {
        const kind = "slots.settingsSection";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.settingsSection, id);
        const title = requireOptionalString(kind, "title", registration.title);
        const description = requireOptionalString(
          kind,
          "description",
          registration.description
        );
        collected.settingsSections.push({
          id,
          ...title !== void 0 ? { title } : {},
          ...description !== void 0 ? { description } : {},
          component: requireComponent(kind, registration.component)
        });
      },
      navPanel(registration) {
        const kind = "slots.navPanel";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.navPanel, id);
        const path = requireNonEmptyString(kind, "path", registration.path);
        if (!CAPABILITY_SLOT_ID_PATTERN.test(path)) {
          throw new Error(
            `${kind}: "path" must match ${String(CAPABILITY_SLOT_ID_PATTERN)} (it becomes a URL segment), got ${JSON.stringify(path)}`
          );
        }
        if (registration.headerContent !== void 0 && typeof registration.headerContent !== "function") {
          throw new Error(
            `${kind}: "headerContent" must be a React component function when set`
          );
        }
        if (registration.experimental_sidebarAccessory !== void 0 && typeof registration.experimental_sidebarAccessory !== "function") {
          throw new Error(
            `${kind}: "experimental_sidebarAccessory" must be a React component function when set`
          );
        }
        const experimentalFixedTabs = (() => {
          if (registration.experimental_fixedTabs === void 0) return [];
          if (!Array.isArray(registration.experimental_fixedTabs)) {
            throw new Error(
              `${kind}: "experimental_fixedTabs" must be an array when set`
            );
          }
          const seenFixedTabIds = /* @__PURE__ */ new Set();
          return registration.experimental_fixedTabs.map((value, index) => {
            const fixedTabKind = `${kind}.experimental_fixedTabs[${index}]`;
            const fixedTab = value;
            const id2 = requireSlotId(fixedTabKind, fixedTab?.id);
            requireUniqueId(fixedTabKind, seenFixedTabIds, id2);
            const layout = fixedTab?.layout;
            if (layout !== void 0 && layout !== "padded" && layout !== "flush") {
              throw new Error(
                `${fixedTabKind}: "layout" must be "padded" or "flush" when set`
              );
            }
            return {
              id: id2,
              title: requireNonEmptyString(
                fixedTabKind,
                "title",
                fixedTab?.title
              ),
              icon: requireNonEmptyString(
                fixedTabKind,
                "icon",
                fixedTab?.icon
              ),
              component: requireComponent(fixedTabKind, fixedTab?.component),
              ...layout === void 0 ? {} : { layout }
            };
          });
        })();
        collected.navPanels.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          icon: requireNonEmptyString(kind, "icon", registration.icon),
          path,
          component: requireComponent(kind, registration.component),
          ...experimentalFixedTabs.length > 0 ? { experimental_fixedTabs: experimentalFixedTabs } : {},
          ...registration.experimental_sidebarAccessory !== void 0 ? {
            experimental_sidebarAccessory: registration.experimental_sidebarAccessory
          } : {},
          ...registration.headerContent !== void 0 ? { headerContent: registration.headerContent } : {}
        });
      },
      threadPanelAction(registration) {
        const kind = "slots.threadPanelAction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.threadPanelAction, id);
        if (registration.run !== void 0 && typeof registration.run !== "function") {
          throw new Error(`${kind}: "run" must be a function when set`);
        }
        if (registration.layout !== void 0 && registration.layout !== "padded" && registration.layout !== "flush") {
          throw new Error(`${kind}: "layout" must be "padded" or "flush"`);
        }
        collected.threadPanelActions.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...registration.icon !== void 0 ? {
            icon: requireNonEmptyString(kind, "icon", registration.icon)
          } : {},
          component: requireComponent(kind, registration.component),
          ...registration.layout !== void 0 ? { layout: registration.layout } : {},
          ...registration.run !== void 0 ? { run: registration.run } : {}
        });
      },
      experimental_newThreadPanelAction(registration) {
        const kind = "slots.experimental_newThreadPanelAction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.newThreadPanelAction, id);
        if (registration.run !== void 0 && typeof registration.run !== "function") {
          throw new Error(`${kind}: "run" must be a function when set`);
        }
        if (registration.layout !== void 0 && registration.layout !== "padded" && registration.layout !== "flush") {
          throw new Error(`${kind}: "layout" must be "padded" or "flush"`);
        }
        collected.newThreadPanelActions.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...registration.icon !== void 0 ? {
            icon: requireNonEmptyString(kind, "icon", registration.icon)
          } : {},
          component: requireComponent(kind, registration.component),
          ...registration.layout !== void 0 ? { layout: registration.layout } : {},
          ...registration.run !== void 0 ? { run: registration.run } : {}
        });
      },
      pendingInteraction(registration) {
        const kind = "slots.pendingInteraction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.pendingInteraction, id);
        collected.pendingInteractions.push({
          id,
          component: requireComponent(kind, registration.component)
        });
      },
      sidebarFooterAction(registration) {
        const kind = "slots.sidebarFooterAction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.sidebarFooterAction, id);
        if (typeof registration.run !== "function") {
          throw new Error(`${kind}: "run" must be a function`);
        }
        collected.sidebarFooterActions.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          icon: requireNonEmptyString(kind, "icon", registration.icon),
          run: registration.run
        });
      },
      experimental_threadList(registration) {
        const kind = "slots.experimental_threadList";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.threadList, id);
        const description = requireOptionalString(
          kind,
          "description",
          registration.description
        );
        collected.threadLists.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...description !== void 0 ? { description } : {},
          component: requireComponent(kind, registration.component)
        });
      },
      experimental_threadHeaderAction(registration) {
        const kind = "slots.experimental_threadHeaderAction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.threadHeaderAction, id);
        collected.threadHeaderActions.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          component: requireComponent(kind, registration.component)
        });
      },
      fileOpener(registration) {
        const kind = "slots.fileOpener";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.fileOpener, id);
        const rawExtensions = registration?.extensions;
        if (!Array.isArray(rawExtensions) || rawExtensions.length === 0) {
          throw new Error(
            `${kind}: "extensions" must be a non-empty array of lowercase extensions without the dot`
          );
        }
        const extensions = rawExtensions.map((extension) => {
          if (typeof extension !== "string" || !/^[a-z0-9]+$/.test(extension)) {
            throw new Error(
              `${kind}: extensions must be lowercase alphanumerics without the dot, got ${JSON.stringify(extension)}`
            );
          }
          return extension;
        });
        collected.fileOpeners.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          extensions,
          component: requireComponent(kind, registration.component)
        });
      },
      experimental_sourceCodeRenderer(registration) {
        const kind = "slots.experimental_sourceCodeRenderer";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.sourceCodeRenderer, id);
        const description = requireOptionalString(
          kind,
          "description",
          registration.description
        );
        collected.sourceCodeRenderers.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...description !== void 0 ? { description } : {},
          component: requireComponent(kind, registration.component)
        });
      },
      experimental_diffRenderer(registration) {
        const kind = "slots.experimental_diffRenderer";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.diffRenderer, id);
        const description = requireOptionalString(
          kind,
          "description",
          registration.description
        );
        collected.diffRenderers.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...description !== void 0 ? { description } : {},
          component: requireComponent(kind, registration.component)
        });
      },
      messageDirective(registration) {
        const kind = "slots.messageDirective";
        const id = requireMessageDirectiveId(kind, registration?.id);
        requireUniqueId(kind, seenIds.messageDirective, id);
        collected.messageDirectives.push({
          id,
          component: requireComponent(kind, registration.component)
        });
      },
      messageAction(registration) {
        const kind = "slots.messageAction";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.messageAction, id);
        if (typeof registration.run !== "function") {
          throw new Error(`${kind}: "run" must be a function`);
        }
        collected.messageActions.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          ...registration.icon !== void 0 ? {
            icon: requireNonEmptyString(kind, "icon", registration.icon)
          } : {},
          run: registration.run
        });
      },
      experimental_extensionsSection(registration) {
        const kind = "slots.experimental_extensionsSection";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.extensionsSection, id);
        const path = requireNonEmptyString(kind, "path", registration.path);
        if (!CAPABILITY_SLOT_ID_PATTERN.test(path)) {
          throw new Error(
            `${kind}: "path" must match ${String(CAPABILITY_SLOT_ID_PATTERN)} (it becomes a URL segment), got ${JSON.stringify(path)}`
          );
        }
        collected.extensionsSections.push({
          id,
          title: requireNonEmptyString(kind, "title", registration.title),
          icon: requireNonEmptyString(kind, "icon", registration.icon),
          path,
          browse: requireComponent(kind, registration.browse),
          installed: requireComponent(kind, registration.installed)
        });
      }
    },
    composer: {
      customize(registration) {
        const customization = collectComposerCustomization(
          registration,
          seenIds.composerCustomization,
          onComposerCustomizationRejected
        );
        if (customization !== null) {
          collected.composerCustomizations.push(customization);
        }
      }
    },
    contentScripts: {
      register(registration) {
        const kind = "contentScripts.register";
        const id = requireSlotId(kind, registration?.id);
        requireUniqueId(kind, seenIds.contentScript, id);
        if (typeof registration.mount !== "function") {
          throw new Error(`${kind}: "mount" must be a function`);
        }
        collected.contentScripts.push({ id, mount: registration.mount });
      }
    }
  });
  return collected;
}
export {
  collectCapabilityAppRegistrations
};
