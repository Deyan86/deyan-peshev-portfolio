"use client";

import { useMemo, useState } from "react";

type Model = {
  model: string; tier: string; overall: number; runtime: string;
  categories: Record<string, number>; checks_passed: number; checks_total: number;
};

export default function Explorer({
  board, weights, cats, needle, speed, runtime, memory, ablation, jev, clef,
}: {
  board: Model[]; weights: Record<string, number>; cats: string[];
  needle: any[]; speed: any[]; runtime: any[]; memory: any[]; ablation: any[];
  jev: { summary: any[]; harness: any }; clef: { rows: any[]; latency: Record<string, any> };
}) {
  const [picked, setPicked] = useState<string[]>(() => board.slice(0, 3).map(m => m.model));
  const [filter, setFilter] = useState("");
  const [scale, setScale] = useState<"log" | "lin">("log");
  const chosen = useMemo(() => board.filter(m => picked.includes(m.model)), [board, picked]);

  const toggle = (name: string) =>
    setPicked(p => p.includes(name) ? p.filter(x => x !== name) : p.length < 4 ? [...p, name] : p);

  // radar geometry: 12 axes, value 0-100 mapped onto the radius
  const R = 150, CX = 190, CY = 175;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / cats.length - Math.PI / 2;
    return [CX + Math.cos(a) * R * (v / 100), CY + Math.sin(a) * R * (v / 100)];
  };
  const poly = (m: Model) => cats.map((c, i) => pt(i, m.categories[c] ?? 0).join(",")).join(" ");
  const HUES = ["#8a5cff", "#22a7ff", "#3ddc97", "#ffb45c"];

  const rates = [...speed.map(s => ({ n: s.model, v: s.tps_avg, src: "LM Studio harness" })),
                 ...runtime.map(r => ({ n: r.model, v: r.rate_lo, src: r.runtime + " (PDF table)" }))];
  const max = Math.max(...rates.map(r => r.v));
  const min = Math.max(Math.min(...rates.map(r => r.v)), 0.01);
  const width = (v: number) => scale === "log"
    ? 100 * (Math.log10(Math.max(v, min)) - Math.log10(min)) / (Math.log10(max) - Math.log10(min))
    : 100 * v / max;

  return (
    <>
      <section className="section" id="compare">
        <div className="section-title">
          <div><span className="eyebrow">05 / COMPARE</span><h2>Pick up to four models, read the shape</h2></div>
          <p>Each vertex is one weighted category, 0–100. The shape matters more than the headline score:
             a model that spikes on coding and collapses on structure-following is exactly the model that
             breaks a pipeline.</p>
        </div>
        <div className="grid2">
          <div className="card">
            <svg viewBox="0 0 380 330" role="img" aria-label="Category radar for the selected models">
              {[100, 75, 50, 25].map(v => (
                <polygon key={v} points={cats.map((_, i) => pt(i, v).join(",")).join(" ")}
                         fill="none" stroke="rgba(132,153,220,.16)" />
              ))}
              {cats.map((c, i) => {
                const [x, y] = pt(i, 118);
                return <text key={c} x={x} y={y} className="axis-label"
                             textAnchor={x > CX + 4 ? "start" : x < CX - 4 ? "end" : "middle"}>{c}</text>;
              })}
              {chosen.map((m, i) => (
                <g key={m.model}>
                  <polygon points={poly(m)} fill={HUES[i]} fillOpacity={.13}
                           stroke={HUES[i]} strokeWidth={1.6} />
                  {cats.map((c, j) => {
                    const [x, y] = pt(j, m.categories[c] ?? 0);
                    return <circle key={c} cx={x} cy={y} r={2.6} fill={HUES[i]} />;
                  })}
                </g>
              ))}
            </svg>
            <div className="legend">
              {chosen.map((m, i) => (
                <span key={m.model}><i className="dot" style={{ background: HUES[i] }} />
                  <b className="mono">{m.model}</b> {m.overall.toFixed(2)}</span>
              ))}
              {!chosen.length && <span>Nothing selected.</span>}
            </div>
          </div>
          <div className="card">
            <input className="search" placeholder="filter models"
                   onChange={e => setFilter(e.target.value)} value={filter} aria-label="Filter models" />
            <div className="chip-list">
              {board.filter(m => m.model.includes(filter)).slice(0, 60).map(m => (
                <button key={m.model} className={picked.includes(m.model) ? "chip on" : "chip"}
                        onClick={() => toggle(m.model)}>
                  <span className={`tier ${m.tier}`}>{m.tier}</span> {m.model}
                </button>
              ))}
            </div>
            <table className="tight">
              <thead><tr><th>Category</th><th>Weight</th>
                {chosen.map(m => <th key={m.model}>{m.model.slice(0, 16)}</th>)}</tr></thead>
              <tbody>{cats.map(c => (
                <tr key={c}><td>{c}</td><td className="mono">{weights[c].toFixed(2)}</td>
                  {chosen.map(m => <td key={m.model} className="sc">{m.categories[c] ?? "—"}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="rates">
        <div className="section-title">
          <div><span className="eyebrow">06 / DECODE RATE</span><h2>Measured generations, two kinds of record</h2></div>
          <p>Violet bars come from the harness JSON; the muted ones were read out of hand-made PDF tables from
             interactive vLLM/Ollama sessions. Log scale by default — on a linear axis the 0.4 tok/s artifacts
             and the 203 tok/s MoE cannot share one picture.</p>
        </div>
        <div className="card">
          <div className="controls">
            <button className={scale === "log" ? "chip on" : "chip"} onClick={() => setScale("log")}>log axis</button>
            <button className={scale === "lin" ? "chip on" : "chip"} onClick={() => setScale("lin")}>linear axis</button>
            <span className="fine">bar length is comparable only within one axis mode</span>
          </div>
          {rates.sort((a, b) => b.v - a.v).map((r, i) => (
            <div className="row-bar" key={r.n + i} title={`${r.n} · ${r.v} tok/s · ${r.src}`}>
              <span className="row-name mono">{r.n}</span>
              <span className="bar"><i style={{ width: `${Math.max(width(r.v), 1.5)}%`,
                background: r.src.startsWith("LM Studio harness") ? undefined : "rgba(120,150,215,.45)" }} /></span>
              <span className="sc">{r.v.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="ladder">
        <div className="section-title">
          <div><span className="eyebrow">07 / CONTEXT LADDER</span><h2>Needle in a haystack, 4K → 32K</h2></div>
          <p>Green passed, amber out-of-memory, red answered wrong. The “262K context” claim came from a spec
             sheet; the ceiling this harness verified is 32K.</p>
        </div>
        <div className="card table-scroll">
          <table className="heat">
            <thead><tr><th>Model</th>{["4K", "8K", "16K", "32K"].map(l => <th key={l}>{l}</th>)}</tr></thead>
            <tbody>{needle.map(r => (
              <tr key={r.model}>
                <td className="mono">{r.model}</td>
                {["4K", "8K", "16K", "32K"].map(l => {
                  const c = r.levels[l];
                  const cls = c.pass ? "cell ok" : c.oom ? "cell warn" : "cell bad";
                  return <td key={l}><span className={cls}
                    title={`${r.model} · ${l} · ${c.pass ? "recalled" : c.oom ? "out of memory" : "wrong answer"}${c.seconds ? ` · ${c.seconds}s` : ""}`}>
                    {c.pass ? "pass" : c.oom ? "OOM" : "fail"}{c.seconds ? ` ${c.seconds}s` : ""}</span></td>;
                })}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="section" id="memory">
        <div className="section-title">
          <div><span className="eyebrow">08 / VRAM BUDGET</span><h2>Loading a model you have no room for</h2></div>
          <p>Against a 24 GB card: cold load costs 19–23 s, a warm reload under a second, and near saturation
             the runtime spills into system RAM.</p>
        </div>
        <div className="grid2">
          <div className="card">
            {memory.map((m: any) => (
              <div className="row-bar" key={m.model} title={`${m.vram_used_mb} of ${m.vram_total_mb} MB · load ${m.load_time_s}s`}>
                <span className="row-name mono">{m.model}</span>
                <span className="bar"><i style={{ width: `${100 * m.vram_used_mb / m.vram_total_mb}%` }} /></span>
                <span className="sc">{Math.round(100 * m.vram_used_mb / m.vram_total_mb)}%</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Same tasks, three prompt shapes</h3>
            {ablation.map((a: any) => (
              <div className="row-bar" key={a.model + a.variant} title={`${a.passed}/${a.total} passed`}>
                <span className="row-name mono">{a.model.slice(0, 22)} · {a.variant}</span>
                <span className="bar"><i style={{ width: `${100 * a.passed / a.total}%` }} /></span>
                <span className="sc">{a.passed}/{a.total}</span>
              </div>
            ))}
            <p className="fine">Prompt format moves the same model further than the checkpoint does.</p>
          </div>
        </div>
      </section>

      <section className="section" id="decision">
        <div className="section-title">
          <div><span className="eyebrow">09 / DECISION HEAD</span><h2>What ran here, and what the card claims</h2></div>
          <p>Left: my own runs on this box. Right: the upstream numbers, on the card’s hardware, kept apart so
             neither can be mistaken for the other.</p>
        </div>
        <div className="grid2">
          <div className="card table-scroll">
            <table>
              <thead><tr><th>Serve name</th><th>Passed</th><th>Truncated</th><th>Mean latency</th><th>Mean completion</th></tr></thead>
              <tbody>{jev.summary.map((s: any) => (
                <tr key={s.model}><td className="mono">{s.model}</td><td className="sc"><b>{s.passed}/{s.total}</b></td>
                  <td className={s.truncated ? "bad" : ""}>{s.truncated}</td><td className="sc">{s.latency_avg_s} s</td>
                  <td className="sc">{s.completion_tokens_avg}</td></tr>
              ))}</tbody>
            </table>
            <p className="fine">Harness: <span className="mono">{jev.harness.endpoint}</span> · temperature{" "}
              {jev.harness.temperature} · max_tokens {jev.harness.max_tokens}. The recorded failure is a
              truncation at the token budget, not a wrong decision.</p>
          </div>
          <div className="card table-scroll">
            <table>
              <thead><tr><th>Benchmark (upstream card)</th><th>Clef</th><th>Jev</th></tr></thead>
              <tbody>{clef.rows.map((r: any) => (
                <tr key={r.benchmark}><td className="mono">{r.benchmark}</td>
                  <td className="sc">{r.scores.Clef}</td><td className="sc">{r.scores.Jev}</td></tr>
              ))}
              {Object.entries(clef.latency).map(([k, v]: [string, any]) => (
                <tr key={k} className="hl"><td className="mono">{k}</td>
                  <td className="sc">{v.Clef}</td><td className="sc">{v.Jev}</td></tr>
              ))}</tbody>
            </table>
            <p className="fine"><b>measured_here: false</b> — vendor rows, reproduced verbatim; they enter no
              leaderboard on this site.</p>
          </div>
        </div>
      </section>
    </>
  );
}
