# EPV Reviewer Guide

This guide accompanies **Prediction Is Not Permission: Statistical Execution
Authority for AI Agents**.

## One-Sentence Claim

In a multi-candidate agent system, the safety object is the action produced by
the complete frozen generation, eligibility, scoring, selection, and routing
pipeline; source-level evidence does not by itself authorize that selected
action.

## Recommended Reading Order

1. Read the [main paper](../paper/main.pdf) for the claim and controlled study.
2. Use the website's Selection-Induced Authority Risk figure to understand why
   candidate count alone does not determine selected-action risk.
3. Inspect the exact post-selection pipeline figure after the conceptual EPV
   architecture illustration.
4. Read the [supplement](../paper/supplement.pdf) for proofs, protocol details,
   local certificates, failure cases, and transfer evidence.
5. Use the website's limitations and engineering sections to distinguish
   demonstrated evidence from deployment requirements.

## Core Heldout Result

At `K=8` on 2,000 one-time test episodes:

| Method | Direct coverage | Review coverage | Observed FAR | Test UCB | Utility |
| --- | ---: | ---: | ---: | ---: | ---: |
| Learned selector | 1.000 | 0.000 | 0.684 | 0.701 | -449.10 |
| End-to-end CP | 0.280 | 0.000 | 0.038 | 0.054 | 474.69 |
| EPV-Opt full family | 0.099 | 0.182 | 0.025 | 0.053 | 180.66 |
| EPV-Opt split-local | 0.194 | 0.086 | 0.000 | 0.008 | 367.85 |

These methods certify different formal objects. The common test upper bound is
a diagnostic, not evidence that their guarantees are interchangeable.

## Negative Evidence To Preserve

- A prior protocol version produced zero direct coverage.
- The larger extension contains nonzero adverse authorizations and no gain from
  the less conservative multiplicity procedure.
- AgentDojo V10 imports the frozen calibration pipeline but does not confirm
  transfer: authority uncertainty remains above the registered gate and direct
  support is below the registered minimum.

## What The Domain Scenes Mean

The AI coding, finance, healthcare workflow, and cybersecurity scenes ask what
evidence should be required before a consequential action. They are not claims
that EPV was empirically validated in those domains. Each scene therefore
states its consequential action, plausible failure, required evidence, and
human-review boundary.

## What Is Not Claimed

- Production-replicated evidence or universal deployment authority.
- A positive independent AgentDojo certificate.
- Pointwise, drift-robust, or post-update guarantees.
- Medical efficacy, financial profit, offensive-security capability, or
  autonomous production deployment.
- Universal utility dominance over every baseline.
