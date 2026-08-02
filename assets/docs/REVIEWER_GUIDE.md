# Reviewer Guide

This artifact accompanies:

**Prediction Is Not Permission: Statistical Execution Authority for AI Agents**

## One-Sentence Claim

The safety object in a multi-candidate agent system is the action produced by
the complete frozen generation, eligibility, scoring, selection, and routing
pipeline; source-level evidence does not by itself certify that selected action.

## Reading Order

1. `paper/aaai/main_with_supplement.pdf`
2. Main Figure 1: why candidate count and pairwise ranking alone do not identify
   selected-action risk.
3. Main Figure 2: EPV-Opt certifies after frozen selection.
4. Main Figure 3 and Table 1: full `K` behavior, risk/coverage boundaries, and
   local routing.
5. Supplement S1: full proofs.
6. Supplement S3--S5: sequential protocol, all results, the preserved v3
   failure, local task certificates, and replacement terms.
7. Supplement S6: hashes, commands, and evidence boundaries.
8. Supplement S7: the larger taskwise-threshold extension and preserved zero
   Holm gain.
9. Supplement S8: candidate-order, threshold-conditioned replacement, and
   matched-semantics/factor audits.
10. Supplement S9: the V7--V10 AgentDojo transfer sequence and its unconfirmed
    independent holdout.

## Core Numbers to Verify

At `K=8` on 2,000 one-time test episodes:

| Method | Direct | Review | Observed FAR | One-sided test UCB | Utility | AV |
|---|---:|---:|---:|---:|---:|---:|
| Learned selector | 1.000 | 0 | 0.684 | 0.701 | -449.10 | -8.00 |
| Sourcewise CP + argmax | 0.089 | 0 | 0.000 | 0.017 | 169.43 | 610.53 |
| SCoRE-SDR | 0.318 | 0 | 0.077 | 0.097 | 517.05 | 958.15 |
| End-to-end CP | 0.280 | 0 | 0.038 | 0.054 | 474.69 | 915.80 |
| EPV-Opt full family | 0.099 | 0.182 | 0.025 | 0.053 | 180.66 | 621.77 |
| EPV-Opt SplitLocal | 0.194 | 0.086 | 0.000 | 0.008 | 367.85 | 808.95 |

These methods have different formal targets. The test UCB is a common
diagnostic, not a claim that sourcewise CP, SCoRE-SDR, pooled CP, and EPV-Opt
provide interchangeable guarantees.

AV is an outcome diagnostic relative to the uncensored selector after common
verification overhead. It is not the objective optimized on calibration data.

Split-local EPV-Opt directly certifies:

- `click-checkboxes`: 100 calibration actions, 0 harm, UCB 0.060;
- `click-option`: 99 actions, 0 harm, UCB 0.061;
- `enter-password`: 100 actions, 0 harm, UCB 0.060;
- `login-user`: 93 actions, 0 harm, UCB 0.065.

The `login-user-popup` task has 4 harms among 7 score-clearing calibration
actions, is not certified, and routes all nine score-clearing test actions to
review. V3's zero-direct-coverage outcome is also preserved.

The disjoint v5 extension contains 8,000 episodes and 64,000 candidate
executions. At `K=8`, taskwise Bonferroni and Holm both certify five tasks and
authorize 499/2,000 actions with 4 harms (aggregate test UCB 0.018). The
nonzero-harm task has 6/300 calibration harms and 4/100 test harms. Holm adds
zero actions, and all external-side-effect tasks abstain.

The post-outcome v6 audit adds three interpretation checks without claiming a
new holdout. Across 64 deterministic candidate-order permutations, the mean
uncensored FAR decreases from 0.944 at `K=1` to 0.679 at `K=8`, while individual
threshold-conditioned transitions can increase or decrease conditional FAR.
Task-specific Bonferroni thresholds authorize only eight more v5 test actions
than the pooled threshold, and Holm adds none. A factor audit shows that the
larger coverage gain comes from changing the risk-event family, not threshold
timing alone.

The AgentDojo sequence uses Opus, Sonnet, and Fable across workspace, travel,
banking, and Slack sandbox tasks. V7 executes 75,165 static candidate-context
pairs and produces no feasible certifier. V8 preserves an infeasible dynamic
calibration and a provider-interface failure stress. V9 obtains one pooled
dual calibration certificate on 84 selected clusters: 0 authority violations
(UCB 0.043) and 66 useful completions (LCB 0.683). The registered v9 test is
left unopened by its fixed cost gate.

V10 is a separately preregistered, test-only confirmation of that exact frozen
pipeline. It completes 90 clusters and 1,080 trajectories, authorizes 19, and
observes 0 authority violations and 16 useful completions. It does not confirm
transfer: the one-sided authority UCB is 0.146 above the 0.10 gate and support
is below 40, although the useful-completion LCB is 0.641. These are heldout
diagnostics, not a replacement calibration certificate.

## Reproduce the Submission

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/pip install -r requirements-figures.txt
make verify
```

The verifier consumes frozen data. It does not query a model API or recollect
the one-time test. `make sea-v4-collect` is intentionally excluded from
ordinary verification.

Current offline verification reports 221 passed tests and 1 skipped test, 43
passing figure checks, and readiness with 44 passes, 1 declared evidence-boundary
warning, and 0 failures. The main, supplement, and combined PDFs contain 7, 6,
and 13 US-letter pages. All fonts are embedded and no Type 3 font is present.

Readiness outputs:

- `results/submission_readiness/audit.csv`
- `results/submission_readiness/summary.json`
- `results/figure_compliance/aaai_figure_audit.csv`
- `results/statistical_execution_authority_hidden_v4/artifact_integrity.json`
- `results/statistical_execution_authority_hidden_v5/artifact_integrity.json`
- `results/statistical_execution_authority_audit_v6/metadata.json`
- `results/statistical_execution_authority_agentdojo_v2/artifact_integrity.json`
- `results/statistical_execution_authority_agentdojo_dynamic_v1/artifact_integrity.json`
- `results/statistical_execution_authority_agentdojo_dynamic_v2/calibration_certificate.json`
- `results/statistical_execution_authority_agentdojo_dynamic_v3_confirmation/artifact_integrity.json`

## What Is Not Claimed

- Externally administered or production-replicated LLM-agent evidence.
- WebArena, tau-bench, or production-browser performance.
- A positive independent AgentDojo execution-authority certificate; v9 is a
  pooled calibration certificate and v10 does not confirm its transfer.
- Pointwise, unregistered-task, drift-robust, or post-update certificates.
- Universal EPV-Opt estimator dominance.
- Observed real-world privacy, financial, or irreversible harm.
- Any finance alpha or profitability result.

MiniWoB is the only environment with a positive heldout certificate. The
AgentDojo sequence closes the multi-model and dynamic-interaction gap but not
the positive-transfer, task-local, high-impact, or production gaps; these
limitations are explicit.
