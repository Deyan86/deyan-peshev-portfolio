import { headline, leaderboard, weights, categoryNames, dataset } from "../../lib/dataset";
import Topbar from "../../components/Topbar";
import Explorer from "../../components/Explorer";

export const metadata = {
  title: "Benchmark evidence | Deyan Peshev",
  description:
    "Locally measured LLM evaluation results: 12 weighted categories, provenance-tagged runs and a coverage audit.",
};

const board = leaderboard();
const rt: any[] = (dataset as any).runtime_comparison;
const env: any = (dataset as any).serve_environment;
const strict: any[] = (dataset as any).strict_screening;

const tick = (b: boolean) => (b ? "yes" : "no");

export default function Benchmarks() {
  return (
    <main>
      <Topbar />
      <section className="hero hero-sm">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> PROJECT 01 · EVALUATION ENGINEERING</div>
          <h1>What actually runs <em>locally</em>, measured</h1>
          <p className="hero-text">
            A deterministic offline harness for LM Studio and Ollama, with the vLLM serves kept alongside them
            as throughput comparisons. Twelve weighted capability categories, executed code instead of judged
            prose, and every number tied to the artifact it came from.
          </p>
          <div className="stats">
            <div className="stat"><b>{headline.models}</b><span>DISTINCT MODELS WITH A RESULT</span></div>
            <div className="stat"><b>{headline.assertions.toLocaleString("en-US")}</b><span>SCORED ASSERTIONS</span></div>
            <div className="stat"><b>{headline.categories}</b><span>WEIGHTED CATEGORIES</span></div>
            <div className="stat"><b>{headline.runs}</b><span>AUTOMATED RUNS</span></div>
          </div>
          <p className="fine">
            {headline.passed.toLocaleString("en-US")} of {headline.assertions.toLocaleString("en-US")} assertions
            passed ({(100 * headline.passed / headline.assertions).toFixed(1)}%). {headline.modelRuns} model-runs
            carry a weighted score; the largest single automated run covered {headline.largestRun} models. Names
            are reproduced as the harness logged them.
          </p>
        </div>
      </section>

      <section className="section" id="leaderboard">
        <div className="section-title">
          <div><span className="eyebrow">01 / LEADERBOARD</span><h2>Best weighted score per model</h2></div>
          <p>One row per model: its highest recorded weighted score, with the run and date it came from.
             Speed is scored relative to the median of its own run, so cross-run comparison is of the other
             eleven categories.</p>
        </div>
        <div className="card table-scroll">
          <table>
            <thead>
              <tr><th>#</th><th>Model</th><th>Tier</th><th>Score</th><th>Runtime</th>
                  <th>Assertions</th><th>Source run</th></tr>
            </thead>
            <tbody>
              {board.map((r, i) => (
                <tr key={r.model}>
                  <td className="mono">{i + 1}</td>
                  <td className="mono">{r.model}</td>
                  <td><span className={`tier ${r.tier}`}>{r.tier}</span></td>
                  <td className="sc"><b>{r.overall.toFixed(2)}</b>
                    <span className="bar"><i style={{ width: `${r.overall}%` }} /></span></td>
                  <td>{r.runtime}</td>
                  <td className="mono">{r.checks_passed}/{r.checks_total}</td>
                  <td className="mono src">{r.run} · {r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="legend">
          {categoryNames.map(c => (
            <span key={c}>{c} <b className="mono">{weights[c].toFixed(2)}</b></span>
          ))}
        </div>
      </section>

      <section className="section" id="runtimes">
        <div className="section-title">
          <div><span className="eyebrow">02 / SERVE RUNTIME</span><h2>vLLM, Ollama and LM Studio on one box</h2></div>
          <p>The August serves were interactive, so the surviving record is seven hand-made comparison tables
             exported to PDF. They are read by word coordinate and carry throughput only — never a weighted
             score, because no harness JSON backs them.</p>
        </div>
        <div className="card table-scroll">
          <table>
            <thead><tr><th>Runtime</th><th>Model</th><th>tok/s</th><th>Also logged</th>
              <th>Basis</th><th>Source</th></tr></thead>
            <tbody>
              {rt.map((r, i) => (
                <tr key={i}>
                  <td>{r.runtime}</td>
                  <td className="mono">{r.model}</td>
                  <td className="sc"><b>{r.rate_lo}{r.rate_hi ? `–${r.rate_hi}` : ""}</b></td>
                  <td className="mono src">{(r.sub_tests || []).map((s: any) => s.raw).join(" · ") || "—"}</td>
                  <td className="src">{r.runtime_basis}</td>
                  <td className="mono src">{(r.sources || []).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="build">
        <div className="section-title">
          <div><span className="eyebrow">03 / BUILD CONSTRAINT</span><h2>Why two runtimes could not be compared</h2></div>
          <p>The only artifact that records the cause: on sm_120 the kernels for the engine with tool calling
             were missing. Unscored by design — it measures a build, not a model.</p>
        </div>
        <div className="grid2">
          <div className="card table-scroll">
            <table>
              <thead><tr><th>vLLM build</th><th>Runs on RTX 5090</th><th>Tool calling</th><th>New features</th></tr></thead>
              <tbody>{env.vllm_options.map((o: any) => (
                <tr key={o.version}><td className="mono">{o.version}</td><td>{o.runs_on_5090}</td>
                  <td>{o.tool_calling}</td><td>{o.new_features}</td></tr>
              ))}</tbody>
            </table>
            <p className="fine">{env.verdict.join(" ")}</p>
          </div>
          <div className="card">
            <h3>Recorded remediation</h3>
            <ul className="fact-list">{env.recommendation.map((r: string) => <li key={r}>{r}</li>)}</ul>
            <p className="fine"><b>{env.bottom_line}</b></p>
            <table>
              <thead><tr><th>Flag</th><th>Purpose as recorded</th></tr></thead>
              <tbody>{env.flags.map((f: any) => (
                <tr key={f.flag}><td className="mono">{f.flag}</td><td>{f.purpose}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="screen">
        <div className="section-title">
          <div><span className="eyebrow">04 / STRICT SCREEN</span><h2>Four checks, 34 models</h2></div>
          <p>Logic, code execution, no markdown fence around JSON, and schema validity — plus the decode rate
             and time-to-first-token measured in the same pass.</p>
        </div>
        <div className="card table-scroll">
          <table>
            <thead><tr><th>Model</th><th>tok/s</th><th>TTFT s</th><th>Logic</th><th>Code</th>
              <th>No-fence</th><th>JSON</th><th>Score</th></tr></thead>
            <tbody>{strict.map((r: any) => (
              <tr key={r.model}>
                <td className="mono">{r.model}</td><td className="sc">{r.tps}</td><td className="sc">{r.ttft_s}</td>
                <td className={r.logic ? "ok" : "bad"}>{tick(r.logic)}</td>
                <td className={r.code ? "ok" : "bad"}>{tick(r.code)}</td>
                <td className={r.strictness ? "ok" : "bad"}>{tick(r.strictness)}</td>
                <td className={r.json_ok ? "ok" : "bad"}>{tick(r.json_ok)}</td>
                <td className="sc"><b>{r.score}/4</b></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <Explorer board={board} weights={weights} cats={categoryNames}
                needle={(dataset as any).context_needle} speed={(dataset as any).measured_speed}
                runtime={rt} memory={(dataset as any).memory_study}
                ablation={(dataset as any).decision_ablation_by_format}
                jev={{ summary: (dataset as any).jev_decision_summary, harness: (dataset as any).jev_harness }}
                clef={{ rows: ((dataset as any).clef_card_reference.rows as any[]).slice(0, 12),
                        latency: (dataset as any).clef_card_reference.latency }} />

      <section className="section">
        <div className="card note-card">
          <h3>How to audit these numbers</h3>
          <p className="fine">
            Every table on this page is generated from one JSON dataset built by the evaluation harness; no
            figure is typed by hand. The repository records the artifact each run wrote, the exclusions applied
            and why, and a coverage audit that reports any scored artifact nothing reads. Corrections to claims
            I published before auditing them are listed in the repository README rather than quietly edited out.
          </p>
        </div>
      </section>
    </main>
  );
}
