# EPV

Public research companion for:

**Prediction Is Not Permission: Statistical Execution Authority for AI Agents**

EPV studies when an action selected by an AI-agent pipeline has enough
statistical and provenance evidence to execute. The method treats proposal,
selection, and authorization as separate decisions, then routes the selected
action to `AUTHORIZE`, `REVIEW`, or `ABSTAIN`.

Project website: <https://computational-decision-lab.github.io/epv/>

## Reviewer Entry Points

- [Main paper](../paper/main.pdf)
- [Supplement](../paper/supplement.pdf)
- [Combined review PDF](../paper/main_with_supplement.pdf)
- [Reviewer guide](REVIEWER_GUIDE.md)
- [Public package manifest](SUBMISSION_PACKAGE.md)
- [Website source](https://github.com/computational-decision-lab/epv)

## Evidence Snapshot

- 20 resettable MiniWoB tasks, 4,000 fresh episodes, and 32,000 candidate
  executions in the main heldout study.
- At `K=8`, split-local EPV-Opt directly authorizes 388 of 2,000 actions,
  routes 172 to review, and observes 0 adverse authorizations; the reported
  one-sided test upper bound is 0.008.
- The larger disjoint extension retains nonzero adverse outcomes and a null
  multiplicity gain rather than presenting only the favorable result.
- AgentDojo V10 is retained as a negative transfer result: its independent
  holdout does not meet the preregistered authority and support gates.

## Public Boundary

This repository is a curated static reading interface. It contains the site,
paper PDFs, selected figures, reviewer documentation, and optimized visual
assets. It does not publish private model credentials, sealed evaluation data,
provider logs, or the full internal research workspace.

Full experimental source is not included in this public artifact.

## Claim Boundaries

- EPV-Opt authorizes selected actions; it is not a new candidate ranker.
- The adverse-action label is a registered benchmark proxy, not observed
  production, privacy, medical, financial, or legal harm.
- MiniWoB is the only environment in this package with a positive heldout
  statistical execution-authority certificate.
- The four high-value domain scenes on the website are deployment questions,
  not empirical results of the paper.
