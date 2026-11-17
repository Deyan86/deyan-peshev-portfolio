import raw from "../data/benchmarks.json";

export type Row = {
  model: string; tier: string; overall: number; runtime: string; run: string; date: string;
  categories: Record<string, number>; checks_total: number; checks_passed: number;
};

const D = raw as unknown as {
  meta: {
    models_with_recorded_results: number; distinct_model_names_touched: number;
    categories_scored: number; runs: { file: string; runtime: string; models: number; date: string }[];
    harness: { weights: Record<string, number> };
    category_names: string[]; scored_runs_discovered: number;
    truncated_prefixes_left_separate: number; manual_table_models: number;
  };
  full_benchmark: Row[];
  serve_environment: {
    vllm_options: { version: string; runs_on_5090: string; tool_calling: string; new_features: string }[];
    flags: { flag: string; purpose: string }[];
    recommendation: string[]; bottom_line: string;
  };
};

export const dataset = raw as unknown as Record<string, any>;

const runs = D.meta.runs;
const records = D.full_benchmark;

export const headline = {
  models: D.meta.models_with_recorded_results,
  nameStrings: D.meta.distinct_model_names_touched,
  runs: runs.length,
  modelRuns: records.length,
  categories: D.meta.categories_scored,
  assertions: records.reduce((a, r) => a + r.checks_total, 0),
  passed: records.reduce((a, r) => a + r.checks_passed, 0),
  largestRun: Math.max(...runs.map(r => r.models)),
};

/** Best weighted score recorded per model, highest first. */
export function leaderboard(limit?: number) {
  const best = new Map<string, Row>();
  for (const r of records) {
    const cur = best.get(r.model);
    if (!cur || r.overall > cur.overall) best.set(r.model, r);
  }
  const all = [...best.values()].sort((a, b) => b.overall - a.overall);
  return limit ? all.slice(0, limit) : all;
}

export const weights = D.meta.harness.weights;
export const categoryNames = D.meta.category_names;
export const buildMatrix = D.serve_environment;
