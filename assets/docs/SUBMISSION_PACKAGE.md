# AAAI Submission Package

Paper: **Prediction Is Not Permission: Statistical Execution Authority for AI Agents**

Project website: <https://colin-wang-research.github.io/epv-aaai/>

## Submission Files

- `paper/aaai/main.tex` and `paper/aaai/sections/`
- `paper/aaai/supplement.tex`
- `paper/aaai/main.pdf`
- `paper/aaai/supplement.pdf`
- `paper/aaai/main_with_supplement.pdf`

The reviewer-facing package contains the page-limited main paper and a concise
audit supplement. The combined PDF is generated losslessly and normalized with
embedded fonts when Ghostscript is available.

## Primary Frozen Artifacts

- Protocol: `configs/statistical_execution_authority_hidden_v4.yaml`
- Candidate outcomes: `results/statistical_execution_authority_hidden_v4/candidate_outcomes.csv`
- Metrics: `results/statistical_execution_authority_hidden_v4/metrics.csv`
- Decisions: `results/statistical_execution_authority_hidden_v4/decisions.csv`
- Calibration: `results/statistical_execution_authority_hidden_v4/calibration.json`
- Task certificates: `results/statistical_execution_authority_hidden_v4/task_certificates.csv`
- Replacement decomposition: `results/statistical_execution_authority_hidden_v4/correlated_replacement_decomposition.csv`
- Integrity audit: `results/statistical_execution_authority_hidden_v4/artifact_integrity.json`

The v4 protocol covers 20 tasks, 4,000 fresh episodes, 32,000 candidate-plan
executions, and a one-time 2,000-episode test. Its seeds are disjoint from v2
and v3. Protocol and generator hashes are recorded in the YAML, metadata,
supplement, integrity audit, and `log.md`.

## Frozen Robustness Extension

- Protocol: `configs/statistical_execution_authority_hidden_v5.yaml`
- Results: `results/statistical_execution_authority_hidden_v5/`
- Integrity audit: `results/statistical_execution_authority_hidden_v5/artifact_integrity.json`
- Exact registered certifier snapshot:
  `results/statistical_execution_authority_hidden_v5/frozen_sources/epv_eval/core/selective_risk.py`

V5 adds 8,000 disjoint-seed episodes and 64,000 candidate executions. It tests
task-specific development thresholds with exact taskwise Bonferroni and Holm
certificates. Both corrections authorize the same 499 test actions at `K=8`;
the null Holm gain is preserved rather than promoted as an improvement. The
frozen certifier snapshot matches the preregistered SHA-256 exactly; the audit
also verifies that the current shared module differs only by the later
useful-completion lower-bound function used in v9/v10.

## Post-Outcome Audit and AgentDojo Transfer

- V6 audit config: `configs/statistical_execution_authority_audit_v6.yaml`
- V6 audit results: `results/statistical_execution_authority_audit_v6/`
- AgentDojo static config/results:
  `configs/statistical_execution_authority_agentdojo_v2.yaml` and
  `results/statistical_execution_authority_agentdojo_v2/`
- AgentDojo dynamic negative study:
  `configs/statistical_execution_authority_agentdojo_dynamic_v1.yaml` and
  `results/statistical_execution_authority_agentdojo_dynamic_v1/`
- AgentDojo pooled calibration:
  `configs/statistical_execution_authority_agentdojo_dynamic_v2.yaml` and
  `results/statistical_execution_authority_agentdojo_dynamic_v2/`
- AgentDojo independent holdout:
  `configs/statistical_execution_authority_agentdojo_dynamic_v3_confirmation.yaml`
  and `results/statistical_execution_authority_agentdojo_dynamic_v3_confirmation/`

V6 is explicitly a post-outcome diagnostic. It evaluates 64 deterministic
candidate-order permutations, an exact threshold-conditioned replacement
identity, matched-semantics task-local CP baselines, and the separate effects of
threshold timing and risk-event granularity. It is not described as a new
confirmatory holdout.

The AgentDojo sequence separates static replay, dynamic provider stress,
calibration, and independent transfer. V9 obtains a feasible pooled dual
calibration certificate with 84 selected clusters, zero authority violations,
and 66 useful completions. Its registered test is never opened because the
fixed total cap cannot cover the full split. V10 imports the exact v9 pipeline
on 90 fresh clusters and completes all 1,080 trajectories. It observes zero
authority violations among 19 authorized clusters and 16 useful completions,
but the preregistered transfer gate is not met because the authority UCB is
`0.146` and support is below 40. The result is retained as negative transfer
evidence; no recalibration or rerun is performed.

## Verification

```bash
make verify
```

Equivalent direct command:

```bash
PYTHONPATH=. .venv/bin/python scripts/verify_submission_package.py
```

The verifier does **not** run `--collect`. It analyzes the frozen candidate CSV,
runs the read-only audit, regenerates theory/results figures and tables, compiles
the PDFs, checks all recursively included figures, runs tests, and requires
readiness `0 fail`.

## Current Readiness Contract

- Main paper at most seven pages and US Letter.
- Supplement US Letter and reviewer-readable.
- Combined page count equals main plus supplement.
- No unresolved references or overfull boxes.
- No Type 3 or unembedded fonts.
- Matplotlib figures use embedded TrueType fonts; `pdffonts`, `pdftotext`, and
  `pdfimages` complete without font-type mismatch warnings.
- Figure legends outside plotting axes; layout collision reports have zero
  legend/text overlaps.
- Frozen protocol, generator, artifact, result, route, theory, and versioning
  claims reproduce.
- No live API, provider credential, or local absolute path is required or
  exposed. The one-time hidden outcome set is already consumed and hash-locked.
- Current verified output: main 7 pages, supplement 6 pages, combined 13 pages;
  221 tests pass and 1 is skipped; 43 figure checks have zero failures and zero
  warnings; readiness reports 44 passes, one warning, and zero failures.
- The declared external-evidence warning records that the independent
  AgentDojo holdout does not confirm the pooled v9 calibration certificate and
  establishes no task-local or high-impact authority.

## Claim Boundaries

- Statistical Execution Authority is the formal object; the empirical study is
  one controlled resettable-browser instantiation.
- Split-local EPV-Opt does not dominate end-to-end CP on coverage or SCoRE-SDR
  on utility in the frozen benchmark.
- The five high-impact tasks have no score-clearing support and abstain; this is
  fail-closed routing, not evidence of safe high-impact execution.
- Four ordinary tasks certify. The preserved `login-user-popup` failure routes
  to review and demonstrates why coarse group certification was insufficient.
- The v5 extension certifies five ordinary tasks, including one with nonzero
  calibration harm, but provides no empirical Holm gain and no high-impact
  authority.
- The v6 order audit and factor ablation are post-outcome analyses. They support
  mechanism interpretation but cannot replace a new sealed confirmatory test.
- AgentDojo demonstrates static multi-model proposals and dynamic sandbox
  interaction, but its independent holdout does not confirm the pooled
  calibration certificate and gives no task-local or high-impact authority.
- Legacy finance and broad proxy artifacts remain in the repository but are not
  included in the reviewer-facing supplement or main claim.

## Public Repository Hygiene

The public package should include source, frozen artifacts, generated vector
figures, tables, PDFs, tests, manifests, and reviewer documentation. It should
exclude `.venv`, caches, local agent state, credentials, LaTeX intermediates,
and private review-session files. See `.gitignore` and `REVIEWER_GUIDE.md`.
