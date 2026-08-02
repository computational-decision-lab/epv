# Statistical Execution Authority

Project website: <https://colin-wang-research.github.io/epv-aaai-20260707-site/>

This repository contains the AAAI submission artifact for:

**Prediction Is Not Permission: Statistical Execution Authority for AI Agents**

The paper studies **Post-Selection Agent Authorization**: when the action chosen
by a heterogeneous agent pipeline has enough statistical and provenance
evidence to execute. It names **Selection-Induced Authority Risk (SIAR)** and
implements **EPV-Opt**, which calibrates the complete frozen selector and routes
selected actions to `AUTHORIZE`, `REVIEW`, or `ABSTAIN` under simultaneous
global, group, and high-impact conditional-risk constraints.

## Reviewer Entry Points

- Reviewer guide: `REVIEWER_GUIDE.md`
- Submission manifest: `SUBMISSION_PACKAGE.md`
- Main paper: `paper/aaai/main.pdf`
- Supplement: `paper/aaai/supplement.pdf`
- Combined PDF: `paper/aaai/main_with_supplement.pdf`
- Frozen v4 protocol: `configs/statistical_execution_authority_hidden_v4.yaml`
- Frozen v4 results: `results/statistical_execution_authority_hidden_v4/`
- Frozen v5 extension: `results/statistical_execution_authority_hidden_v5/`
- Frozen v5 certifier source:
  `results/statistical_execution_authority_hidden_v5/frozen_sources/epv_eval/core/selective_risk.py`
- Frozen post-outcome v6 audit: `results/statistical_execution_authority_audit_v6/`
- AgentDojo static multi-model study: `results/statistical_execution_authority_agentdojo_v2/`
- AgentDojo dynamic negative study: `results/statistical_execution_authority_agentdojo_dynamic_v1/`
- AgentDojo pooled calibration: `results/statistical_execution_authority_agentdojo_dynamic_v2/`
- AgentDojo independent holdout: `results/statistical_execution_authority_agentdojo_dynamic_v3_confirmation/`

## Verified Evidence Snapshot

- 20 MiniWoB tasks and 4,000 fresh reset-state episodes.
- 32,000 actual executions of deterministic multi-planner candidate plans.
- 2,000 fresh calibration and 2,000 one-time test episodes with registered
  `K={1,2,4,8}`; these seeds do not overlap the v2/v3 studies.
- At `K=8`, end-to-end CP directly authorizes 0.280 of episodes at observed FAR
  0.038. Split-local EPV-Opt directly authorizes 0.194, routes 0.086 to review,
  and observes 0/388 harmful authorizations (one-sided test UCB 0.008).
- Four tasks obtain simultaneous task certificates. The preserved
  `login-user-popup` failure has 4/7 harmful calibration actions and routes all
  nine score-clearing test actions to review.
- V3's zero-direct-coverage result remains in the supplement. No live model API
  is required.
- A disjoint v5 extension adds 8,000 episodes and 64,000 candidate executions.
  At `K=8`, task-specific thresholds certify five tasks and authorize 499/2,000
  actions with 4 harms. Holm and taskwise Bonferroni authorize identical
  actions, a preserved null multiplicity result.
- A registered post-outcome v6 audit evaluates 64 candidate-order permutations,
  the exact threshold-conditioned replacement decomposition, and matched-risk-
  semantics baselines. The audit is diagnostic, not a fresh confirmatory test.
- A registered AgentDojo sequence uses Opus, Sonnet, and Fable in the benchmark
  sandbox. V7 executes 75,165 static candidate-context pairs and yields no
  feasible certifier. V8 preserves an infeasible dynamic calibration and a
  provider-interface failure stress. V9 obtains a pooled dual calibration
  certificate on 84 selected clusters: 0 authority violations (UCB 0.043) and
  66 useful completions (LCB 0.683). Its test remains unopened because the
  registered cost cap could not cover the full split.
- V10 imports the exact v9 pipeline on 90 fresh clusters and 1,080 trajectories.
  It authorizes 19 clusters with 0 authority violations and 16 useful
  completions, but does not meet the preregistered confirmation gate: authority
  UCB 0.146 exceeds 0.10 and support is below 40, while utility LCB is 0.641.
  This negative holdout result is retained rather than recalibrated or rerun.

## Rebuild and Verify

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/pip install -r requirements-figures.txt
make verify
```

The verifier consumes the frozen candidate-outcome artifact, regenerates the
current theory/results figures and tables, compiles both PDFs, combines them,
runs recursive figure/font/layout checks, executes the test suite, and runs the
submission readiness audit.

Useful safe targets:

```bash
make sea-v4-audit # read-only frozen-result audit
make sea-v5-audit # read-only v5 extension audit
PYTHONPATH=. .venv/bin/python scripts/run_statistical_execution_authority_audit_v6.py
PYTHONPATH=. .venv/bin/python scripts/build_agentdojo_dynamic_evidence_tables.py
make sea-theory   # deterministic theory checks and Figure 1
make sea-v4-tables # reviewer-facing supplement tables
make figures      # current SEA figures; no outcome recollection
make paper        # main, supplement, combined PDF
make test
make readiness
```

`make sea-v4-collect` is intentionally separate, refuses to overwrite the
frozen candidate artifact, and is not part of ordinary verification.

## Repository Structure

```text
configs/                         frozen protocol and risk groups
epv_eval/benchmarks/             deterministic MiniWoB multi-planner generator
epv_eval/core/selective_risk.py  SIAR identities and EPV-Opt calibration
epv_eval/core/thresholded_risk.py
                                 threshold-conditioned risk decomposition
results/statistical_execution_authority_hidden_v4/
                                 frozen outcomes, task certificates, audits
results/statistical_execution_authority_hidden_v3/
                                 preserved zero-coverage negative result
results/statistical_execution_authority_hidden_v5/
                                 taskwise-threshold extension and null Holm gain
results/statistical_execution_authority_theory/
                                 numerical identity and support checks
results/statistical_execution_authority_audit_v6/
                                 order, matched-semantics, and factor audits
results/statistical_execution_authority_agentdojo_v2/
                                 static multi-model negative transfer
results/statistical_execution_authority_agentdojo_dynamic_v1/
                                 dynamic negative/provider-stress evidence
results/statistical_execution_authority_agentdojo_dynamic_v2/
                                 feasible pooled calibration certificate
results/statistical_execution_authority_agentdojo_dynamic_v3_confirmation/
                                 independent holdout, not confirmed
paper/aaai/sections/             current seven-page main-paper sections
paper/aaai/supplement.tex        concise audit supplement
scripts/                         analysis, plots, tables, readiness, verifier
tests/                           unit and frozen-artifact tests
```

The former broad EPV supplement and verification scripts remain as
`supplement_legacy_epv.tex`, `check_submission_readiness_legacy_epv.py`, and
`verify_submission_package_legacy_epv.py`. They are repository history, not the
reviewer-facing evidence chain.

## Claim Boundaries

- Candidate count alone does not determine SIAR; score-harm dependence and
  replacement behavior determine its direction.
- EPV-Opt is an authorization and routing method, not a new candidate ranker.
- SCoRE-SDR, sourcewise CP, pooled end-to-end CP, and EPV-Opt certify different
  risk objects; observed test FAR does not make those guarantees equivalent.
- The experiment uses deterministic multi-planner candidates, not independent
  LLM agents or a multi-model comparison.
- The adverse-action label is a registered task-reward proxy in a resettable
  browser benchmark, not observed production, privacy, or financial loss.
- MiniWoB remains the only environment with a positive heldout statistical
  execution-authority certificate. AgentDojo adds three model families and
  dynamic tool interaction, but the v9 pooled calibration certificate is not
  confirmed by v10 because independent holdout support contracts to 19/90.
  No task-local, high-impact, production, or legal authority is claimed.
- Current full verification: 221 tests pass and 1 is skipped; the recursive
  figure audit has 43 checks with zero failures or warnings; readiness has 44 passes, one declared
  external-evidence warning, and zero failures. The PDFs are 7, 6, and 13 US-
  letter pages for main, supplement, and combined respectively.
