// src/internal/host-policy.ts
import { z } from "zod";

// ../domain/src/capability-cli.ts
var RESERVED_BB_CLI_COMMANDS = [
  "environment",
  "guide",
  "help",
  "models",
  "capability",
  "project",
  "skill",
  "status",
  "theme",
  "thread"
];

// src/backend-contract.ts
var CAPABILITY_CLI_OUTPUT_MAX_BYTES = 1024 * 1024;

// src/internal/host-policy.ts
var RESERVED_AGENT_TOOL_NAMES = [
  "update_environment_directory",
  "read_capability",
  "use_tool"
];
var KV_VALUE_MAX_BYTES = 256 * 1024;
var CAPABILITY_HTTP_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS"
]);
var RPC_METHOD_PATTERN = /^[a-zA-Z0-9_-]+$/;
var BACKGROUND_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
var CLI_COMMAND_NAME_PATTERN = /^[a-z0-9-]+$/;
var AGENT_TOOL_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
var CAPABILITY_AGENT_STATIC_INSTRUCTIONS_MAX_CHARS = 4096;
var CAPABILITY_AGENT_STATUS_LABEL_MAX_CHARS = 80;
var CAPABILITY_AGENT_SELECTION_MAX_IDS = 256;
var CAPABILITY_AGENT_DYNAMIC_INSTRUCTIONS_MAX_CHARS = 4096;
var CAPABILITY_AGENT_REPLACE_INSTRUCTIONS_MAX_CHARS = 32 * 1024;
var CAPABILITY_AGENT_TOOL_PARAMETERS_MAX_BYTES = 128 * 1024;
var MENTION_PROVIDER_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
var SETTING_KEY_PATTERN = /^[a-zA-Z0-9_-]+$/;
var settingsBaseFields = {
  label: z.string().min(1),
  description: z.string().min(1).optional()
};
var settingDescriptorSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("string"),
    ...settingsBaseFields,
    secret: z.literal(true).optional(),
    default: z.string().optional()
  }).strict(),
  z.object({
    type: z.literal("boolean"),
    ...settingsBaseFields,
    default: z.boolean().optional()
  }).strict(),
  z.object({
    type: z.literal("select"),
    ...settingsBaseFields,
    options: z.array(z.string().min(1)).min(1),
    default: z.string().optional()
  }).strict(),
  z.object({
    type: z.literal("project"),
    ...settingsBaseFields,
    default: z.string().optional()
  }).strict()
]);
function registerSettingDescriptors(target, added) {
  const validated = {};
  for (const [key, raw] of Object.entries(added)) {
    if (!SETTING_KEY_PATTERN.test(key)) {
      throw new Error(
        `invalid setting key "${key}" \u2014 use letters, digits, "-" and "_"`
      );
    }
    if (key in target) {
      throw new Error(`setting "${key}" is already defined`);
    }
    const parsed = settingDescriptorSchema.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const path = issue?.path.join(".") ?? "";
      throw new Error(
        `invalid descriptor for setting "${key}"${path ? ` (${path})` : ""}: ${issue?.message ?? "unknown error"}`
      );
    }
    const descriptor = parsed.data;
    if (descriptor.type === "select" && descriptor.default !== void 0 && !descriptor.options.includes(descriptor.default)) {
      throw new Error(
        `default for setting "${key}" must be one of its options`
      );
    }
    validated[key] = descriptor;
  }
  Object.assign(target, validated);
  return validated;
}
function validateSettingsUpdate(descriptors, values) {
  const errors = [];
  for (const [key, value] of Object.entries(values)) {
    const descriptor = descriptors[key];
    if (!descriptor) {
      errors.push(`unknown setting "${key}"`);
      continue;
    }
    if (value === null) continue;
    if (descriptor.type === "boolean") {
      if (typeof value !== "boolean") {
        errors.push(`setting "${key}" expects a boolean`);
      }
      continue;
    }
    if (typeof value !== "string") {
      errors.push(`setting "${key}" expects a string`);
      continue;
    }
    if (descriptor.type === "select" && !descriptor.options.includes(value)) {
      errors.push(
        `setting "${key}" must be one of: ${descriptor.options.join(", ")}`
      );
    }
  }
  return errors;
}
var CAPABILITY_MENTION_TRIGGER_VALUES = [
  "@",
  "#",
  "$",
  "!",
  "~"
];
var DEFAULT_CAPABILITY_MENTION_TRIGGERS = [
  "@"
];
function isCapabilityMentionTrigger(value) {
  return typeof value === "string" && CAPABILITY_MENTION_TRIGGER_VALUES.includes(value);
}
function normalizeMentionProviderTriggers(providerId, triggers) {
  if (triggers === void 0) {
    return DEFAULT_CAPABILITY_MENTION_TRIGGERS;
  }
  if (!Array.isArray(triggers)) {
    throw new Error(
      `mention provider "${providerId}" triggers must be an array`
    );
  }
  if (triggers.length === 0) {
    throw new Error(
      `mention provider "${providerId}" triggers must include at least one trigger`
    );
  }
  const seen = /* @__PURE__ */ new Set();
  const normalized = [];
  for (const trigger of triggers) {
    if (!isCapabilityMentionTrigger(trigger)) {
      throw new Error(
        `mention provider "${providerId}" trigger ${JSON.stringify(trigger)} is invalid; use one of ${CAPABILITY_MENTION_TRIGGER_VALUES.join(" ")}`
      );
    }
    if (seen.has(trigger)) {
      throw new Error(
        `mention provider "${providerId}" trigger ${JSON.stringify(trigger)} is duplicated`
      );
    }
    seen.add(trigger);
    normalized.push(trigger);
  }
  return normalized;
}
function isStandardSchema(value) {
  if (typeof value !== "object" || value === null) return false;
  const standard = Reflect.get(value, "~standard");
  return typeof standard === "object" && standard !== null && Reflect.get(standard, "version") === 1 && typeof Reflect.get(standard, "vendor") === "string" && typeof Reflect.get(standard, "validate") === "function";
}
function readRpcMethodContract(method, value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(
      `rpc method "${method}" contract must provide input and output Standard Schemas`
    );
  }
  const input = Reflect.get(value, "input");
  const output = Reflect.get(value, "output");
  if (!isStandardSchema(input)) {
    throw new Error(
      `rpc method "${method}" input must be a Standard Schema v1 validator`
    );
  }
  if (!isStandardSchema(output)) {
    throw new Error(
      `rpc method "${method}" output must be a Standard Schema v1 validator`
    );
  }
  return { input, output };
}
function isZodSchemaLike(value) {
  return typeof value === "object" && value !== null && typeof value.safeParse === "function";
}
var SINGLE_SCHEMA_KEYWORDS = [
  "additionalItems",
  "additionalProperties",
  "contains",
  "contentSchema",
  "else",
  "if",
  "items",
  "not",
  "propertyNames",
  "then",
  "unevaluatedItems",
  "unevaluatedProperties"
];
var SCHEMA_ARRAY_KEYWORDS = [
  "allOf",
  "anyOf",
  "oneOf",
  "prefixItems"
];
var SCHEMA_MAP_KEYWORDS = [
  "$defs",
  "definitions",
  "dependentSchemas",
  "patternProperties",
  "properties"
];
function isJsonSchemaObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function decodeJsonPointerToken(token) {
  return token.replaceAll("~1", "/").replaceAll("~0", "~");
}
function resolveLocalJsonSchemaReference(document, anchors, reference) {
  if (!reference.startsWith("#")) return void 0;
  let pointer;
  try {
    pointer = decodeURIComponent(reference.slice(1));
  } catch {
    return void 0;
  }
  if (pointer.length === 0) return document;
  if (!pointer.startsWith("/")) return anchors.get(pointer);
  let current = document;
  for (const encodedToken of pointer.slice(1).split("/")) {
    const token = decodeJsonPointerToken(encodedToken);
    if (Array.isArray(current)) {
      if (!/^(0|[1-9][0-9]*)$/.test(token)) return void 0;
      current = current[Number(token)];
      continue;
    }
    if (!isJsonSchemaObject(current) || !Object.hasOwn(current, token)) {
      return void 0;
    }
    current = current[token];
  }
  return current;
}
function forEachJsonSchemaChild(schema, visit) {
  for (const keyword of SINGLE_SCHEMA_KEYWORDS) {
    const child = schema[keyword];
    if (Array.isArray(child)) {
      for (const entry of child) visit(entry);
    } else {
      visit(child);
    }
  }
  for (const keyword of SCHEMA_ARRAY_KEYWORDS) {
    const children = schema[keyword];
    if (!Array.isArray(children)) continue;
    for (const child of children) visit(child);
  }
  for (const keyword of SCHEMA_MAP_KEYWORDS) {
    const children = schema[keyword];
    if (!isJsonSchemaObject(children)) continue;
    for (const child of Object.values(children)) visit(child);
  }
  const dependencies = schema.dependencies;
  if (isJsonSchemaObject(dependencies)) {
    for (const dependency of Object.values(dependencies)) {
      if (!Array.isArray(dependency)) visit(dependency);
    }
  }
}
function assertNoRecursiveJsonSchemaReferences(schema, subject) {
  if (!isJsonSchemaObject(schema)) return;
  const document = schema;
  const anchors = /* @__PURE__ */ new Map();
  const indexed = /* @__PURE__ */ new Set();
  function indexAnchors(candidate) {
    if (!isJsonSchemaObject(candidate) || indexed.has(candidate)) return;
    indexed.add(candidate);
    for (const keyword of ["$anchor", "$dynamicAnchor"]) {
      const anchor = candidate[keyword];
      if (typeof anchor === "string") anchors.set(anchor, candidate);
    }
    for (const keyword of ["$id", "id"]) {
      const id = candidate[keyword];
      if (typeof id === "string" && /^#[^/]+$/.test(id)) {
        anchors.set(id.slice(1), candidate);
      }
    }
    forEachJsonSchemaChild(candidate, indexAnchors);
  }
  indexAnchors(document);
  const visited = /* @__PURE__ */ new Set();
  const visiting = /* @__PURE__ */ new Set();
  function visit(candidate, viaReference) {
    if (typeof candidate === "boolean" || !isJsonSchemaObject(candidate)) {
      return;
    }
    if (visiting.has(candidate)) {
      throw new Error(
        `${subject} contains recursive JSON Schema ${viaReference?.keyword ?? "$ref"} ${JSON.stringify(viaReference?.value ?? "#")}`
      );
    }
    if (visited.has(candidate)) return;
    visiting.add(candidate);
    for (const keyword of ["$ref", "$recursiveRef", "$dynamicRef"]) {
      const reference = candidate[keyword];
      if (typeof reference === "string" && reference.startsWith("#")) {
        const target = resolveLocalJsonSchemaReference(
          document,
          anchors,
          reference
        );
        if (target !== void 0) {
          visit(target, { keyword, value: reference });
        }
      }
    }
    forEachJsonSchemaChild(candidate, visit);
    visiting.delete(candidate);
    visited.add(candidate);
  }
  visit(schema);
}
function summarizeParseIssues(error) {
  const issues = error?.issues;
  if (Array.isArray(issues) && issues.length > 0) {
    return issues.map((issue) => {
      const path = Array.isArray(issue.path) && issue.path.length > 0 ? issue.path.join(".") : "(input)";
      return `${path}: ${issue.message ?? "invalid"}`;
    }).join("; ");
  }
  return error instanceof Error ? error.message : String(error);
}
function enforceCapabilityCliOutputLimit(result, jsonOutput) {
  const stdoutBytes = Buffer.byteLength(result.stdout, "utf8");
  const stderrBytes = Buffer.byteLength(result.stderr, "utf8");
  const totalBytes = stdoutBytes + stderrBytes;
  if (totalBytes <= CAPABILITY_CLI_OUTPUT_MAX_BYTES) return result;
  const error = {
    code: "capability_cli_output_too_large",
    message: `Capability CLI output is ${totalBytes} bytes (${stdoutBytes} stdout + ${stderrBytes} stderr), exceeding the ${CAPABILITY_CLI_OUTPUT_MAX_BYTES}-byte limit. Narrow the query, request a smaller page, or use a file/streaming command.`,
    maxBytes: CAPABILITY_CLI_OUTPUT_MAX_BYTES,
    stdoutBytes,
    stderrBytes,
    totalBytes
  };
  return jsonOutput ? {
    exitCode: 1,
    stdout: JSON.stringify({ error }),
    stderr: "",
    error
  } : { exitCode: 1, stdout: "", stderr: error.message, error };
}
function adoptHttpRouteResponse(value) {
  if (value instanceof Response) return value;
  if (!isResponseLike(value)) {
    throw new Error("http route handler must return a Response");
  }
  const status = value.status;
  const isNullBodyStatus = status === 101 || status === 204 || status === 205 || status === 304;
  const init = {
    status,
    statusText: typeof value.statusText === "string" ? value.statusText : "",
    headers: new Headers(value.headers)
  };
  if (isNullBodyStatus || value.body === null) {
    return new Response(null, init);
  }
  return new Response(adoptBodyStream(value), init);
}
function adoptBodyStream(value) {
  const source = value.body;
  if (!isReadableStreamLike(source)) {
    return new ReadableStream({
      async start(controller) {
        controller.enqueue(new Uint8Array(await value.arrayBuffer()));
        controller.close();
      }
    });
  }
  const reader = source.getReader();
  return new ReadableStream({
    async pull(controller) {
      const { done, value: chunk } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(chunk);
    },
    async cancel(reason) {
      await reader.cancel(reason);
    }
  });
}
function isReadableStreamLike(value) {
  return value !== null && typeof value === "object" && typeof value.getReader === "function";
}
function isResponseLike(value) {
  if (value === null || typeof value !== "object") return false;
  const candidate = value;
  return typeof candidate.status === "number" && typeof candidate.headers === "object" && candidate.headers !== null && typeof candidate.arrayBuffer === "function" && typeof candidate.clone === "function";
}
export {
  AGENT_TOOL_NAME_PATTERN,
  BACKGROUND_NAME_PATTERN,
  CAPABILITY_AGENT_DYNAMIC_INSTRUCTIONS_MAX_CHARS,
  CAPABILITY_AGENT_REPLACE_INSTRUCTIONS_MAX_CHARS,
  CAPABILITY_AGENT_SELECTION_MAX_IDS,
  CAPABILITY_AGENT_STATIC_INSTRUCTIONS_MAX_CHARS,
  CAPABILITY_AGENT_STATUS_LABEL_MAX_CHARS,
  CAPABILITY_AGENT_TOOL_PARAMETERS_MAX_BYTES,
  CAPABILITY_HTTP_METHODS,
  CAPABILITY_MENTION_TRIGGER_VALUES,
  CLI_COMMAND_NAME_PATTERN,
  KV_VALUE_MAX_BYTES,
  MENTION_PROVIDER_ID_PATTERN,
  RESERVED_AGENT_TOOL_NAMES,
  RESERVED_BB_CLI_COMMANDS,
  RPC_METHOD_PATTERN,
  SETTING_KEY_PATTERN,
  adoptHttpRouteResponse,
  assertNoRecursiveJsonSchemaReferences,
  enforceCapabilityCliOutputLimit,
  isCapabilityMentionTrigger,
  isStandardSchema,
  isZodSchemaLike,
  normalizeMentionProviderTriggers,
  readRpcMethodContract,
  registerSettingDescriptors,
  summarizeParseIssues,
  validateSettingsUpdate
};
