import type { LegalPack } from "./types";
import { cs } from "./cs";
import { vi } from "./vi";
import { en } from "./en";
import { de } from "./de";

const PACKS: Record<string, LegalPack> = { cs, vi, en, de };

export function getLegalPack(locale: string): LegalPack {
  return PACKS[locale] ?? PACKS.cs;
}
