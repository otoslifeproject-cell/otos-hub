# Market Sizing Table CRAFT

- First Deep Research prompt: 2026-03-29T22:17:27.029000+00:00
- Last Deep Research prompt: 2026-03-29T23:49:00.488000+00:00
- Conversation ID: `69c9a4f8-7210-8393-a706-db8b3a726767`
- Deep Research prompt messages: 4
- Ordinary assistant text outputs in conversation: 22

## Export status

Prompt marker(s) are present, but no assistant Deep Research result message is present in the export. The conversation does contain ordinary assistant follow-up after the run.

> This is not proof that the research never completed. It means the completed Deep Research result body is not stored as an export-tagged result message in this JSON archive.

## Deep Research prompt messages

### Prompt 1 — 2026-03-29T22:17:27.029000+00:00

## C.R.A.F.T. prompt for ChatGPT 5 (research + table build)

#### Context

You are helping OTOS build a **Trust-by-Trust UK market sizing and targeting table** for “OTOS Continuity”.

We are trying to estimate, **per NHS Trust (and where Trust-level is not possible, per ICB / NHS England Region / devolved nation equivalents)**:

1) **How many people could be eligible** for OTOS Continuity (focus: ADHD + addiction / dual diagnosis / comorbidity).

2) How many are **actually in treatment now** (mental health services, addiction treatment, or both).

3) Where the **largest “treatment gap”** exists (eligible vs in-treatment).

4) Trust-level **dual diagnosis policy / pathway maturity**.

5) Where there are **repeat treatment cycles**, approximate **costs**, and **success rates**.

**Non‑negotiable rules**

- Do **not invent** Trust-level counts.
- If a metric is not available at Trust level, provide the closest available geography (ICB / Local Authority / NHS England Region / devolved nation health board).
- Every number must have a **direct source link**, plus a **quote or table reference** (page/table number, dataset name, column, date).
- Keep England, Scotland, Wales, Northern Ireland **separate** unless explicitly harmonised.

**Definitions (use consistently)**

- *Trust:* NHS Trust / NHS Foundation Trust (specify type: Mental Health, Acute, Community, Specialist).
- *Addiction treatment:* OHID/NDTMS (England) “Adults in contact with treatment services” and related measures. For devolved nations, find the closest national equivalent dataset.
- *Dual diagnosis / comorbidity:* co-occurring mental health condition + substance use disorder.
- *OTOS Continuity eligible population* (model assumptions):
    - **Assumption A:** 3% of adult ADHD (18+) = ADHD+addiction dual diagnosis.
    - **Assumption B:** 25% (1 in 4) of people in addiction treatment have ADHD.
    - Output must show *both models* separately.

**What we ultimately need**

A single master table with one row per Trust (or closest unit) that includes:

- ADHD: diagnosed / waiting for assessment / waiting for medication review (if available)
- Addiction: in treatment counts (and breakdown alcohol/opioids/other if available)
- Dual diagnosis: count or best available proxy
- ADHD+addiction: modelled counts (both assumptions)
- In-treatment overlap estimates (if possible)
- Repeat treatment / re-presentations (if possible)
- Outcomes / success rates (treatment completion, re-presentations)
- Cost metrics (if credible official sources exist)
- Trust dual diagnosis policy summary + maturity rating
- Data quality confidence score

#### Role

You are a **UK health systems research lead** with 20+ years’ experience in NHS commissioning, epidemiology, service utilisation modelling, and audit-ready evidence synthesis. Use UK English.

#### Action

1) Confirm scope and geography and propose the best achievable structure.

2) List authoritative data sources with links.

3) Extract all published numbers by geography and map Trust↔ICB↔Region.

4) Build a transparent modelling layer (Model A and Model B).

5) Identify gaps and propose a standardised FOI plan.

6) Produce outputs:

A) Master table

B) Methods appendix

C) Top 20 Trust targets

D) Confidence score per row

7) Run quality checks: totals, double counting risks, time period mismatches.

#### Format

Return four sections in Markdown:

1) Executive summary (≤12 bullets)

2) Source map table (metric → source → geography → date → link)

3) Master table (template + first-pass populated)

4) Missing-data + FOI plan

Label everything as OBSERVED / MODELLED / PROXY.

#### Target Audience

ChatGPT 5. Output is for OTOS leadership and NHS commissioners. Plain, audit-ready UK English.

---

## Missing data checklist (to fill)

- ADHD figures by NHS England region (diagnosed / waiting / etc.)
- Adult ADHD total (18+) by region
- Waiting for medication review counts (England + by region)
- Addiction treatment counts by region from official dataset tables (with substance breakdown)
- Dual diagnosis counts by region
- Trust-level figures (diagnosed, waiting, medication review)

---

## Notes / decisions (pre-filled from Dean)

- Country scope: **UK-wide** (England + Scotland + Wales + Northern Ireland)
- Trust types in scope: **All Trusts / Boards** (Mental Health, Acute, Community, Specialist)
- Time window: **Last 10 years** (rolling)
- Eligibility definition: **Anyone in treatment on either side** (ADHD pathway *or* addiction pathway *or* both)

---

## C.R.A.F.T. prompt v2 (copy/paste into ChatGPT 5)

#### Context

You are helping OTOS build an **audit-ready, UK-wide market sizing and targeting model** for **OTOS Continuity** focused on the highest-cost, most measurable addictions first.

**Primary scope (substance use):** focus on the “big 3” substance groups and keep them separable:

- **Opioids**
- **Cocaine / crack**
- **Alcohol**

**Secondary scope (behavioural):** include:

- **Gambling harms** (official prevalence and treatment volumes where available)

**Tertiary scope (other behavioural addictions):** acknowledge that there are many categories (large landscape), but only include them if there is an official dataset. Otherwise classify as **OUT OF SCOPE FOR QUANT** and capture as a qualitative note.

Do not expand into broad “all addiction” concepts (e.g., sugar/food) unless there is an official UK dataset with a clear case definition.

---

#### Context

You are helping OTOS build an **audit-ready, Trust-by-Trust (UK-wide) market sizing and targeting model** for **OTOS Continuity** (ADHD + addiction / dual diagnosis / comorbidity).

We need a **single master dataset** (with a table output) that estimates, per NHS organisation (using the best available geography):

- **Observed** service volumes (in treatment, waiting, diagnosed where available)
- **Modelled** overlap (ADHD+addiction) using multiple prevalence scenarios
- **Gap** (eligible vs currently served)
- **Outcomes + economic impact** (where credible data exists)

**Time horizon:** last **10 years** of data (use time series where possible, not just a single year).

**Eligibility (OTOS Continuity):** anyone **currently in treatment or on a waiting list** in either:

- ADHD services (assessment, titration, medication review, neurodevelopmental pathways)
- addiction treatment services (alcohol + drugs)
- and especially those with known or likely comorbidity / dual diagnosis

**Core modelling assumptions (fixed, run-ready):**

1) **ADHD prevalence among people in addiction treatment (MODELLED):** run three fixed scenarios and keep them separate:

- Low: **5%**
- Mid: **25%** (“1 in 4”)
- High: **65%**

For each scenario, cite the extracted study rows that justify the value.

2) **Treatment impact when ADHD is treated/medicated (MODELLED):** use a fixed default of **60% improvement**, defined as:

- **60% relative reduction** in **repeat treatment episodes and/or re-presentations** over a **12-month** horizon (or the closest available horizon in the evidence).

If a study uses a different outcome definition or time horizon, capture it in the Numbers Registry and then convert to the closest comparable 12‑month measure using an explicit **ASSUMPTION\*** conversion step.

3) Dual diagnosis definition variability: explicitly separate:

- generic co-occurring MH + substance use
- ADHD + substance use (OTOS core)

**Non‑negotiable rules**

- Do **not invent** Trust-level numbers.
- If Trust-level is unavailable, step up to the closest unit and **name the unit** (ICB, LA, NHS England Region, Health Board, NI Trust, etc.).
- Every number must have a **direct link** to the source + a **table/dataset reference** (dataset name, table name, column name, period).
- Label every metric as one of: **OBSERVED**, **MODELLED**, **PROXY**, or **ASSUMPTION\***.
    - Use **ASSUMPTION\*** for sensible averages / ballparks where no direct numbers exist.
- Keep UK nations separate unless you explicitly harmonise and state how.

**We already have (England-level only) ADHD MI headline figures (May 2025) as a starting point, but we need Trust/Board-level coverage and time series.**

#### Role

You are a **UK health systems research lead and health economist** with 20+ years’ experience in:

- NHS structures (Trusts, ICBs, OHID/NDTMS, devolved nation health data)
- epidemiology and service utilisation modelling
- dual diagnosis pathways (policy vs practice)
- FOI strategy and evidence synthesis
- building tables that stand up to commissioner scrutiny

Write in **plain UK English**, and be conservative with claims.

#### Action

1) **Define the unit of analysis and create a mapping layer**

1. Build a canonical list of UK organisations:
    - England: NHS Trusts / NHS Foundation Trusts (include trust type)
    - Scotland: NHS Boards
    - Wales: Health Boards
    - Northern Ireland: HSC Trusts
2. Create mapping tables where needed:
    - Trust ↔ ICB ↔ NHS England Region (England)
    - Local Authority ↔ provider (for addiction treatment commissioning)
3. Output a “coverage map” showing where each metric exists at what geography.

2) **Collect OBSERVED ADHD metrics (10-year time series where possible)**

For each geography where available, find and extract:

- known/diagnosed ADHD counts (adults 18+ specifically)
- waiting for ADHD assessment
- waiting for titration / medication initiation (if published)
- waiting for medication review (explicitly requested)
- referrals per period
- in-treatment counts (medicated / under specialist follow-up) if available

If adult 18+ is not available directly, state how you approximate and mark as PROXY or ASSUMPTION*.

3) **Collect OBSERVED addiction treatment metrics (10-year time series where possible)**

For each geography where available, extract:

- adults in contact with drug and alcohol treatment services (18+)
- breakdown by substance: alcohol / opioids / non-opiates (and any other standard splits)
- new presentations, re-presentations, and repeat treatment episodes if available
- outcomes: successful completion, non-completion, and any published relapse/re-presentation indicators
- any official unit costs or spend data (public health spend, programme budgets) if available

4) **Collect OBSERVED dual diagnosis / comorbidity metrics**

Per geography, extract:

- published counts or rates for co-occurring MH + substance use
- any published ADHD+SUD comorbidity counts (rare)
- where only policies exist, extract policy language and classify maturity (see step 6)

5) **Build a scenario model to estimate “OTOS Continuity eligible”**

Create at least three prevalence scenarios for ADHD among addiction treatment:

- Low: 5%
- Mid: 25% ("1 in 4")
- High: 65%

For each scenario, compute:

- Estimated ADHD+addiction among those in addiction treatment (by geography)
- Estimated total overlap among “anyone in treatment either side” (avoid double counting; explain how you treat overlap)
- Potential improvement scenarios using the 60% improvement variable, and translate to:
    
    A) outcome lift
    
    B) avoided re-presentations
    
    C) indicative cost impact (only where cost inputs are sourced; otherwise ASSUMPTION*)
    

6) **Trust/Board policy extraction: “Dual Diagnosis policy” maturity**

For each Trust/Board, find official documents and extract:

- whether they have a dual diagnosis or co-occurring conditions policy
- whether ADHD is mentioned explicitly
- whether addiction services are integrated vs commissioned out
- key pathway statements (1–3 lines)

Then rate maturity (0–3):

- 0 = none found
- 1 = policy exists, vague
- 2 = policy exists + referral pathways described
- 3 = integrated pathway + named service/team + clear operational guidance

7) **Costs: annual cost per patient in dual diagnosis (and the three outcomes)**

Attempt to find official UK sources for:

- annual cost per patient for dual diagnosis or co-occurring conditions
- cost of addiction treatment episodes
- cost of untreated ADHD (if credible)

If cost inputs are not available, propose a *range* using ASSUMPTION* and clearly flag it.

For “three outcomes”, compute a table that shows:

- Outcome 1: treatment completion improvement
- Outcome 2: reduced re-presentations / repeat episodes
- Outcome 3: cost impact (where possible)

8) **Latest public announcements / PR / policy direction (UK overview)**

Compile a short, dated list (last 24 months preferred, but include relevant older major announcements within 10 years) of:

- NHS England ADHD Taskforce announcements and responses
- major public health / government updates on addiction treatment
- major updates on dual diagnosis / co-occurring conditions

For each item: include date, link, and 1–2 lines on relevance.

9) **Produce outputs**

A) Master table (one big table)

B) Methods appendix (how numbers were derived)

C) Top target list (ranked opportunities for OTOS)

D) Missing data checklist + FOI request pack

10) **Quality checks**

- Flag double counting risks
- Flag time period mismatches
- Ensure national totals reconcile (within reason) when rolling up

#### Format

Return in Markdown with these sections:

1) Executive summary (≤12 bullets)

2) Source map table (metric → source → geography → period → link)

3) Master table (one big table)

4) Scenario model tables (5% / 25% / 65% + 60% improvement variable)

5) Trust policy maturity table

6) Announcements / PR list (dated)

7) Missing-data + FOI pack

#### Target Audience

ChatGPT 5. Output is for OTOS leadership and NHS commissioners. Plain, audit-ready UK English.

---

## Fill‑in‑the‑blank inputs (paste before running)

- Time window start year (10 years ago): **2016**
- ADHD metrics needed (18+ wherever possible): **Total known ADHD**, **assessment wait list**, **diagnosis wait list**, **medication review wait list**
- Addiction metrics needed (18+): **Adults in treatment (in contact)**, plus **substance split** (alcohol / opioids / non-opioids)
- Hidden-need metric: official estimates for **people with addiction not yet in treatment** (if available), otherwise mark as **ASSUMPTION\*** and show a range.

### Research links to use (Dean-provided)

#### Core ADHD + addiction outcomes / prevalence

- START study: Clinical outcomes of addictive disorders six months after ADHD diagnosis
    - https://www.sciencedirect.com/science/article/pii/S0306460325003260
- Genetic liability: https://onlinelibrary.wiley.com/doi/abs/10.1111/add.14910
- Psychological approach paper: https://link.springer.com/article/10.1007/s00702-020-02277-w
- Meta-analysis (ADHD prevalence in SUD populations): https://www.mdpi.com/1660-4601/20/2/1275
- Hidden disorder paper: https://onlinelibrary.wiley.com/doi/abs/10.1111/add.12086
- Alcohol/substance dependence comorbidity paper: https://academic.oup.com/alcalc/article-abstract/43/3/300/104462

#### Medication / Lisdexamfetamine (context)

- Review: https://link.springer.com/article/10.1007/s40120-022-00392-2
- Case report: https://onlinelibrary.wiley.com/doi/full/10.1155/2023/5574677

#### Search starting point

- Google Scholar query (use for triangulation only, then cite primary sources):
    - https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=ADHD+informed+Addiction&btnG=

#### CGL references (for “ADHD in substance-use settings” proof)

- https://www.changegrowlive.org/about-us/research
- https://www.nottinghamcvs.co.uk/projects/practice-development-unit/learning-series/psychotherapeutic-assessment-approaches-in-the-diagnostic-assessment-of-adhd
- https://www.jobs.nhs.uk/candidate/jobadvert/U0080-24-0013

### Fixed model definition (run-ready)

- **Improvement definition used in the model (fixed):** **60% relative reduction in repeat treatment episodes and/or re-presentations over a 12-month horizon** (or closest available horizon in the evidence; convert with **ASSUMPTION\*** where needed).
- **Evidence rule:** extract all improvement figures found in the studies into the Numbers Registry, then report which extracted rows are closest to this 60% default, and which are higher/lower.

### Evidence extraction rule (no “suggestions”, only what’s written)

When using the links below, you MUST:

- Extract **every numeric value** relevant to ADHD + addiction / dual diagnosis.
- Quote it exactly and record the **context** (population, country, setting, year, diagnostic method, sample size).
- Do **not** smooth or average until after the extraction table is complete.

### Numbers registry (build this first)

Create a table called **Numbers Registry — ADHD + Addiction (All studies)** with one row per numeric claim.

Required columns:

- Study (full citation)
- URL
- Country
- Setting (e.g., addiction treatment, alcohol dependence clinic, psychostimulant users, etc.)
- Population definition
- Age group (must specify 18+ vs mixed)
- N (sample size)
- ADHD definition used (diagnosis vs screening tool; tool name)
- Substance use definition used (SUD type)
- Metric type (prevalence / risk ratio / outcome change / cost / repeat treatment, etc.)
- Numerator / denominator (if given)
- Numeric value (exact)
- Unit (% / count / OR / RR / weeks / £)
- Time horizon (e.g., 6 months follow-up)
- Notes / caveats

### Collation into “end numbers” (only after registry)

After the registry is complete, create:

1) **Hard facts table (OBSERVED):** only officially-published service counts (NHS/OHID/etc.).

2) **Research range table (MODELLED):** summarise the extracted prevalence values as:

- Min
- 25th percentile
- Median
- 75th percentile
- Max
- and a recommended **Default** value explicitly marked as **ASSUMPTION\*** (justify with citation mix and UK-relevance).

### Prevalence scenarios (fixed, run-ready)

Run these three prevalence scenarios and keep them separate:

- Low: **5%**
- Mid: **25%** (“1 in 4”)
- High: **65%**

For each scenario, list the specific extracted study rows in the Numbers Registry that justify the figure (and flag if the evidence base is weak for any scenario).

### Define what “60% improvement” means (extract first)

Do NOT assume “60% improvement”.

Instead:

- Extract all improvement figures from studies (completion, relapse, re-presentation, cravings, etc.) into the registry.
- Then define 3 outcomes (Outcome 1/2/3) and choose a default improvement value as **ASSUMPTION\*** with citations.

---

## Reconstructing the “827 Addicts with ADHD in CPFT area” maths (so it is repeatable)

Use this mini-workflow to reproduce where **827** came from and make it audit-ready.

### Step 1 — Pin the geography (must be explicit)

Pick one (and label it):

- CPFT provider catchment (service footprint)
- Cambridge City / South Cambridgeshire Local Authority
- Cambridgeshire & Peterborough ICB
- NHS England East of England region

### Step 2 — Decide what “opioids” meant in the number

Pick one (and label it):

- **Adults in treatment** for opioids (NDTMS category)
- **Opiate users in treatment** (sometimes distinct wording)
- **Opiate + crack** (often used as a planning group)
- **People who use opioids** (population estimate; usually not “in treatment”)

**Dean note (current best memory):** the 827 figure was built from a combination of **official opiate + cocaine** counts, with **alcohol** and **other drugs** included in the broader roll-up. This could be a “potential” target audience, based on averages but maybe a number which is verifiable from numbers available somewhere.

### Step 3 — Standard reconstructable equations (choose the one that matches)

#### Equation A (most likely): local opioid in-treatment count

1) Get **Adults in contact with treatment** (local authority or ICB)

2) Multiply by **% opioids** (or use direct opioid count if published)

3) If you only have a larger area (region/ICB) and CPFT is smaller, apply a coverage ratio and mark it **ASSUMPTION\***

#### Equation B: opiate + crack planning cohort

1) Get opiate+crack count for the chosen geography

2) If only a rate is available, compute: count = rate × population

#### Equation C: “hidden need” estimate

1) Estimate people with opioid dependence in the community (official estimate if available)

2) Multiply by % in treatment to get “in treatment”

3) Or multiply “in treatment” by an under-treatment multiplier (must be **ASSUMPTION\*** and sourced)

### Step 4 — Required inputs table (fill to recreate 827)

Fill this and the number becomes reproducible:

- Geography used:
- Opioid definition used:
- Source dataset:
- Year/period:
- Metric extracted:
- Any conversion used (%, rate, multiplier):
- Worked calculation:
- Result:
- Confidence (High/Med/Low):

### Step 5 — Link it back into the master model

Once 827 is recreated, compute:

- ADHD among opioid cohort (registry-informed prevalence range)
- ADHD+opioid dual diagnosis eligible count
- Scenario outcomes and £ impact using the extracted improvement and cost figures

### Prompt 2 — 2026-03-29T22:54:29.207000+00:00

ok, and give me the numbers for CPFT

### Prompt 3 — 2026-03-29T22:55:18.290000+00:00

CPFT and CGL figures siode by side so we see the true number of crossover

### Prompt 4 — 2026-03-29T23:49:00.488000+00:00

safe to say around 2000 egibale that are using both seperate silos ? So when thye do a dedupe with CGL they will get a rewult of circa 2000 based in previous year figures?

## Ordinary assistant follow-up present in the conversation

### Assistant output 1 — 2026-03-29T23:49:56.811452+00:00 — gpt-5-4-thinking

I’m tightening it to a commissioner-safe line based on the CPFT/CGL figures already extracted.

### Assistant output 2 — 2026-03-29T23:51:34.900864+00:00 — gpt-5-4-thinking

Not quite.

I would **not** make the statement: **“when they dedupe CPFT and CGL they will get circa 2,000”**. That sounds like an **observed linked-data result**, and we do **not** have that. We have a **modelled range**, not a true deduped count.

A commissioner-safe version is:

> **“Based on the published CPFT and CGL/NDTMS figures for Cambridgeshire & Peterborough, the ADHD–addiction crossover is plausibly in the low hundreds to low thousands. Around 1,000 is the most defensible mid-case estimate; around 2,000 is better treated as an upper-end planning assumption, not as the expected deduped result.”**

Why that is the safer line:
- CPFT’s adult ADHD page shows **380** waiting for assessment, **nearly 1,000** awaiting medication review/titration, **over 1,000** requiring annual reviews, and **2,973 referrals** between **1 January 2024 and 30 June 2025**. citeturn830915search0
- The local Cambridgeshire & Peterborough needs assessment estimates about **20,150** adults with ADHD across the footprint (**9,850 + 5,600** in Cambridgeshire; **3,250 + 1,450** in Peterborough). citeturn340684view0turn155562view0
- In the prior extraction, the **CGL/NDTMS addiction cohort** for Cambridgeshire + Peterborough was **4,175 adults in treatment** in **2022/23**. Applying your scenario rates gives about **209** at 5%, **1,044** at 25%, and **2,714** at 65%. The literature supports a central estimate around **21%** overall in SUD populations, with very wide variation; **65.5%** is an upper-extreme clinical sample, not a routine planning average. citeturn376320view1turn340684view2turn340684view4turn376320view5

So my recommendation is:

**Say “around 1,000 mid-case; up to around 2,000 upper-case.”**  
**Do not say “the dedupe will show 2,000.”**

Confidence: **Medium-low** for any exact crossover number, because the real dedupe needs linked CPFT+CGL person-level data and the published CPFT and NDTMS figures are not from the same reporting window.

### Assistant output 3 — 2026-03-29T23:54:16.070749+00:00 — gpt-5-4-thinking

I’m checking the exact wording and the labels on those two figures so you can quote them cleanly.

### Assistant output 4 — 2026-03-29T23:54:36.955426+00:00 — gpt-5-4-thinking

Yes — **with an important label change**:

- **20,150** = the **estimated adult ADHD population (18+)** across **Cambridgeshire + Peterborough**, from the local needs assessment. It is **not** the number diagnosed or in CPFT care. The same assessment also gives a higher headline summary of **22,500** for Cambridgeshire and **7,550** for Peterborough across all ages, so the **20,150** figure is the adult-only working estimate used in the prior model. citeturn787033view0
- **4,175** = the **adults in contact with drug and alcohol treatment services** across **Cambridgeshire + Peterborough combined** in the prior CPFT/CGL build, using **NDTMS 2022/23 local-authority totals** as the addiction-side denominator. NDTMS defines these annual adult treatment statistics as covering people aged 18+ in structured treatment between **1 April 2022 and 31 March 2023**. citeturn366960search0

So the clean way to say it is:

> **“We are working from an estimated adult ADHD population of about 20,150 across Cambridgeshire & Peterborough, and about 4,175 adults in addiction treatment in the same footprint.”** citeturn787033view0turn366960search0

The bit I would avoid is calling the **20,150** figure “ADHD patients” or “CPFT caseload”, because it is a **population estimate**, not an observed service count. citeturn787033view0

### Assistant output 5 — 2026-03-29T23:59:41.458236+00:00 — gpt-5-4-thinking

I’m pulling this into two clean models: ADHD → likely addiction, and addiction treatment → likely ADHD, then I’ll turn both into low/mid/high counts you can actually say out loud.

### Assistant output 6 — 2026-03-30T00:01:24.204902+00:00 — gpt-5-4-thinking

Yes — and the clean way to do it is to run **two directional models** off the two anchor numbers you already have:

- **Adult ADHD population in Cambridgeshire & Peterborough:** about **20,150** adults. This is a **population estimate**, not a CPFT caseload. citeturn668746search4turn572058view2
- **Adults in addiction treatment in Cambridgeshire & Peterborough:** about **4,175** adults in **2022/23**. This is the addiction-treatment denominator. citeturn668746search2turn455851view0

On the **“3x more likely”** line: that is directionally fine, but the literature is actually a bit stronger than that. A meta-analysis found childhood ADHD was associated with later **SUD odds ratio 2.61**, and a recent Norwegian registry study found **any SUD** in specialist care in **14.4% of females with ADHD** and **15.9% of males with ADHD**, versus **3.2%** and **4.1%** respectively without ADHD. So “about 3x more likely” is usable shorthand, but the printed evidence is more like **2.6x to 4x+**, depending on which study and measure you use. citeturn918480view0turn572058view1

## 1) Start with ADHD and ask: how many are likely to have addiction / SUD?

I would model **20,150** like this:

- **Low:** **5.8%** = about **1,169**. This is a very conservative floor, based on the female ADHD-without-other-psychiatric-comorbidity rate in the Norwegian study. citeturn572058view1
- **Mid:** **15.1%** = about **3,053**. That is the simple midpoint of the same study’s overall ADHD rates for females (**14.4%**) and males (**15.9%**) with any SUD. This is the strongest single “middle” number I can defend from printed evidence. citeturn572058view1
- **High:** **25%** = about **5,038**. I would use this only as an upper planning band, not as a base estimate. It is broadly consistent with higher-risk ADHD subgroups in the Norwegian paper and with the meta-analytic evidence that ADHD materially raises later substance-disorder risk. citeturn572058view1turn918480view0

So the **ADHD-side overlap** is roughly:

**1,169 low / 3,053 mid / 5,038 high.** citeturn572058view1turn918480view0

## 2) Start with addiction treatment and ask: how many are likely to have ADHD?

I would model **4,175** like this:

- **Low:** **5.22%** = about **218**. That comes from a cocaine/opioid dependence study often used as a lower-bound anchor. citeturn881936search7turn870008calculator3
- **Mid evidence-based:** **21%** = about **877**. That is the pooled estimate from the 2023 meta-analysis of ADHD prevalence in SUD populations. citeturn668746search0turn870008calculator4
- **Mid planning number:** **25%** = about **1,044**. This is the older “one in four” figure from the 2012 meta-analysis and is still a very usable commercial planning assumption. citeturn455851view0turn870008calculator5
- **High stress-test:** **65.5%** = about **2,735**. That comes from a high-complexity multiple-substance clinical sample and should be treated as a stress-test ceiling, not a routine service expectation. citeturn668746search2turn870008calculator6

So the **addiction-side overlap** is roughly:

**218 low / 877 evidence-mid / 1,044 planning-mid / 2,735 high-stress.** citeturn668746search0turn455851view0turn668746search2

## What I’d actually say out loud

The most useful commissioner-style line is:

> **“Using the Cambridgeshire & Peterborough numbers, the ADHD–addiction crossover is clearly not trivial: it is likely in the high hundreds on the addiction-treatment side, and in the low thousands on the broader adult-ADHD population side. A sensible working estimate is around 1,000 on the treatment-side model, with around 2,000 reasonable as a planning number, but not as an observed deduped count.”** citeturn668746search0turn455851view0turn572058view1

If you want an even shorter version:

> **“We’re working from ~20,150 adults with ADHD and ~4,175 adults in addiction treatment. Depending on which way you model it, the likely crossover is roughly ~900–1,100 in active addiction treatment, with a broader strategic overlap of roughly ~1,200 to ~5,000 across the full adult ADHD population.”** citeturn668746search0turn455851view0turn572058view1

My recommendation on the **single middle number**:
- use **21%** if you want the **cleanest literature midpoint**;
- use **25%** if you want the **cleanest planning assumption**;
- use **~2,000** only as a **board-level planning figure**, not as “the deduped answer”. citeturn668746search0turn455851view0turn572058view1

If you want, I’ll turn this into a **one-page verbal brief** with the exact sentence, the three numbers, and the caveat line underneath.

### Assistant output 7 — 2026-03-30T00:12:25.216911+00:00 — gpt-5-4-thinking

I’m pulling the published outcome uplifts into a planning model you can use on 50 / 250 / 500 / 1,000 / 2,000 people, and I’ll separate **evidence-backed** from **commercial planning assumptions**.

### Assistant output 8 — 2026-03-30T00:15:21.059025+00:00 — gpt-5-4-thinking

Yes — and the cleanest way to do this is to split it into **two evidence layers**:

First, the **direct ADHD-in-addiction treatment evidence**. The strongest usable published numbers I can see are:
- **61.3%** of patients showed improvement in addictive disorders **six months after ADHD diagnosis** in the START study.
- In the Vanderbilt outpatient SUD cohort, ADHD pharmacotherapy was linked to a **41% lower attrition hazard** (**HR 0.59**) and much longer apparent treatment retention (**36 months vs 9 months**); patients without ADHD medication had a **4.9-fold** higher likelihood of attrition within 90 days.
- In the international INCAS cohort, stimulant treatment was associated with better retention (**OR 2.4**) and **fewer heavy drinking days** at three months (**IRR 0.24**, which is a **76% reduction**). citeturn281194view0turn389324view0turn822169search1

Second, the **broader system-harm evidence** from a large Swedish target-trial-emulation study of ADHD medication. That found lower rates of **first** substance misuse (**IRR 0.85 = 15% reduction**) and, for **recurrent** events, lower rates of **substance misuse** (**IRR 0.75 = 25% reduction**), **transport accidents** (**IRR 0.84 = 16% reduction**), and **criminality** (**IRR 0.75 = 25% reduction**). I have **not** found a clean ADHD+addiction paper that gives you a direct “A&E attendance reduction” percentage, so these are the nearest published system-event proxies. citeturn401383search0turn326839search1

So if you want a practical commercial model, I would use these three variables:

- **Low / conservative:** **20%**
- **Mid / base case:** **59%**
- **High / upside:** **75%**

Why those three?
- **20%** is a rounded conservative system-impact figure from the broader medication literature, sitting close to the published 15% to 25% reductions in substance misuse / transport / criminality events.
- **59%** is the **simple unweighted average** of the three most usable direct ADHD-in-addiction treatment signals: **61.3%**, **41%**, and **76%**.
- **75%** is the upside case, anchored to the INCAS heavy-drinking result rather than rounded all the way up. citeturn401383search0turn281194view0turn389324view0turn822169search1turn464350calculator0

I would describe them like this:

> **Conservative:** 20% improvement / avoided-cost effect  
> **Base case:** 59% improvement / avoided-cost effect  
> **Upside:** 75% improvement / avoided-cost effect

That is **not** a clinical certainty. It is a **planning model** built from heterogeneous international studies. But it is a fair, evidence-backed way to create low / mid / high cases. citeturn281194view0turn389324view0turn822169search1turn401383search0

Using **your assumption** of **£90,000 annual system cost per ongoing addict**:

| Cohort treated | Low 20% | Mid 59% | High 75% |
|---:|---:|---:|---:|
| 50 | £0.9m | £2.655m | £3.375m |
| 250 | £4.5m | £13.275m | £16.875m |
| 500 | £9.0m | £26.55m | £33.75m |
| 1,000 | £18.0m | £53.1m | £67.5m |
| 2,000 | £36.0m | £106.2m | £135.0m |

Those are just: **cohort × uplift variable × £90,000**. citeturn489679calculator0turn489679calculator1turn489679calculator2turn489679calculator3turn489679calculator4turn464350calculator3turn464350calculator6turn464350calculator9turn464350calculator12turn464350calculator15turn464350calculator4turn464350calculator7turn464350calculator10turn464350calculator13turn464350calculator16

If you want the same table on the older **£65,000** assumption, the **1,000-person** row becomes:
- **£13.0m** at 20%
- **£38.35m** at 59%
- **£48.75m** at 75% citeturn763085calculator0turn763085calculator1turn763085calculator2

The sentence I would actually use in a deck is:

> **“Published international evidence suggests that when ADHD is identified and treated in people with addiction, the likely benefit range is around 20% at the conservative end, around 60% in a reasonable base case, and up to 75% in a strong-outcome scenario. On a £90k annual system-cost assumption, that implies annual gross opportunity of roughly £18m per 1,000 patients in the low case, £53m in the base case, and £68m in the upside case.”** citeturn281194view0turn389324view0turn822169search1turn401383search0turn489679calculator3turn464350calculator12turn464350calculator13

The only line I would keep out is anything that sounds like **“this is proven NHS cash-releasing savings”**. It is better framed as **gross annual potential / avoidable system burden**, because the underlying studies are mixed on endpoints and mostly international observational cohorts, not UK payer studies. citeturn281194view0turn389324view0turn822169search1turn401383search0

If you want, I’ll turn this into a **single slide wording block** with the exact headline, sub-headline, and the 50 / 250 / 500 / 1,000 / 2,000 table in board language.

### Assistant output 9 — 2026-03-30T00:28:12.043465+00:00 — gpt-5-4-thinking

I’m checking that quote against the source document and separating **generic dual diagnosis** from **ADHD-specific overlap**, because they are not the same number.

### Assistant output 10 — 2026-03-30T00:28:38.920320+00:00 — gpt-5-4-thinking

I’m reading that PDF directly and pulling the exact wording plus any other usable regional/system numbers from it.

### Assistant output 11 — 2026-03-30T00:29:14.647300+00:00 — gpt-5-4-thinking

Yes — that PDF is useful, and you were right that it carries more weight than just a pathway note.

The key passage is there exactly as you quoted it. The Cambridgeshire & Peterborough commissioners’ document says:

- **“Weaver et al (2003) identified that mental health problems are experienced by the majority of drug (70%) and alcohol (86%) users in community substance misuse treatment services.”** citeturn690247view0

Two important refinements though:

- In the **original Weaver et al. 2003 study**, the abstract reports **75% of drug service patients** and **85% of alcohol service patients** had a **past-year psychiatric disorder**. So the local C&P document appears to be a close paraphrase/rounding of the original evidence, not a brand-new local prevalence estimate. citeturn905027search0turn905027search1
- This is **generic co-occurring mental health + substance misuse**, **not ADHD-specific dual diagnosis**. It is very strong for saying **“the majority of addiction clients have mental health comorbidity”**, but it does **not** prove that the majority have ADHD. citeturn690247view0turn905027search0

So the safe statement you can make is:

> **“Cambridgeshire & Peterborough’s own co-occurring conditions document cites evidence that the majority of people in community substance misuse treatment have mental health comorbidity — around 70–75% in drug services and 85–86% in alcohol services.”** citeturn690247view0turn905027search0turn905027search1

That document is also strong for your **system argument**, because it explicitly says:

- people with co-occurring needs are being excluded by both sides of the system; citeturn690247view0
- providers should operate a **“right door every time”** and **open door policy**; citeturn690247view0
- mental health services must not exclude people because of substance use, and substance/alcohol services must not exclude people because of mental health; citeturn690247view0
- commissioners expect an **integrated approach** and expect providers to develop and deliver it. citeturn690247view0

So I’d treat this PDF as **golden for three things**:
1. proving **co-occurring need is the norm, not the exception** in addiction services, citeturn690247view0turn905027search0
2. proving **the local system already recognises the gap**, citeturn690247view0
3. supporting a **maturity / pathway / commissioning** argument. citeturn690247view0

I would **not** use it as proof of:
- local Cambridgeshire & Peterborough **ADHD prevalence** in addiction services, or
- a true local **deduped crossover count**. citeturn690247view0turn905027search0

The next clean move is to use this PDF for the **generic dual diagnosis layer**, and keep your **ADHD-specific overlap** on a separate low / mid / high model.

### Assistant output 12 — 2026-03-30T00:34:03.864122+00:00 — gpt-5-4-thinking

I’m checking whether that “80% mental health × ADHD share” method is valid, and whether autism can be used as the comparison bucket.

### Assistant output 13 — 2026-03-30T00:34:53.508463+00:00 — gpt-5-4-thinking

Yes — I can see what you’re trying to do, but the **exact method you described is not quite right**.

## The part that is right

The SUN / commissioner document is strong for saying that in addiction treatment, **generic mental health comorbidity is the norm**:

- **drug services:** **70%** in the local C&P document, based on Weaver et al. ([sunnetwork.org.uk](https://www.sunnetwork.org.uk/dev/wp-content/uploads/2020/01/Co-occuring-principles-document-final-.pdf))
- the original Weaver paper reports **75%** of drug service patients and **85%** of alcohol service patients had a **past-year psychiatric disorder**. ([pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/14519608/))

So for your **4,175 adults in addiction treatment**, a generic co-occurring-MH range is roughly:

- **Low:** 4,175 × 70% = **2,923**
- **Mid:** 4,175 × 78% = **3,257**  *(simple midpoint of 70% and 86%)*
- **High:** 4,175 × 86% = **3,591** ([sunnetwork.org.uk](https://www.sunnetwork.org.uk/dev/wp-content/uploads/2020/01/Co-occuring-principles-document-final-.pdf))

## The part that is not right

You **cannot safely do**:

> **80% have mental health problems → ADHD is X% of that because ADHD vs autism totals locally are Y**

That breaks for two reasons:

1. **Weaver’s 70–86% is “any psychiatric disorder”**, not just neurodevelopmental conditions. That bucket includes depression, anxiety, psychosis, personality disorder, trauma-related disorder, etc., not just ADHD or autism. ([pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/14519608/))

2. **ADHD and autism overlap heavily**, so you cannot just add the two local totals and turn them into clean shares. The local C&P needs assessment says autism–ADHD co-occurrence is estimated at **20% to 70%**. ([cambridgeshireinsight.org.uk](https://cambridgeshireinsight.org.uk/wp-content/uploads/2024/11/Chapter-7-Autism-and-ADHD.pdf))

## What you *can* do with the ADHD vs autism local totals

The local needs assessment gives these **all-age** estimates:

- **ADHD:** **22,500** in Cambridgeshire + **7,550** in Peterborough = **30,050**
- **Autism:** **7,200** in Cambridgeshire + **2,350** in Peterborough = **9,550** ([cambridgeshireinsight.org.uk](https://cambridgeshireinsight.org.uk/wp-content/uploads/2024/11/Chapter-7-Autism-and-ADHD.pdf))

That means, on a **simple non-deduped count basis only**:

- ADHD is about **76%**
- autism is about **24%**

of the combined **ADHD+autism** count. But because the same report says co-occurrence is **20%–70%**, those are **not valid unique-population shares**. They are only rough directional context. ([cambridgeshireinsight.org.uk](https://cambridgeshireinsight.org.uk/wp-content/uploads/2024/11/Chapter-7-Autism-and-ADHD.pdf))

For **adults only**, the same needs assessment gives:

- **adult ADHD:** **20,150**
- **adult autism:** **7,500**  
So adult ADHD is about **73%** of the simple adult ADHD+autism total, and adult autism about **27%**. Again: useful context, **not** a valid multiplier into Weaver’s 70–86% MH-comorbidity number. ([cambridgeshireinsight.org.uk](https://cambridgeshireinsight.org.uk/mentalhealthneedsassessment/mental-health-needs-assessment-chapter-two/inequalities-in-mental-health-and-mental-health-services/equality-and-diversity/adhd-and-autism/local-population/))

## The better model for OTOS

Use **two separate layers**:

### Layer 1: generic dual diagnosis / co-occurring MH in addiction services
For 4,175 people in treatment:
- **2,923 low**
- **3,257 mid**
- **3,591 high** ([sunnetwork.org.uk](https://www.sunnetwork.org.uk/dev/wp-content/uploads/2020/01/Co-occuring-principles-document-final-.pdf))

### Layer 2: ADHD-specific overlap in addiction services
Use ADHD-in-SUD evidence directly:
- **Low:** **5.22%** → **218**
- **Mid evidence:** **21%** → **877**
- **Mid planning:** **25%** → **1,044**
- **High stress:** **65.5%** → **2,735** ([pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/18558465/), [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC9859173/), [academic.oup.com](https://academic.oup.com/alcalc/article-pdf/43/3/300/244825/agn014.pdf))

## The “golden number” if you want one

If you want a single board-friendly line, I would say:

> **“In Cambridgeshire & Peterborough, around 3,000 to 3,600 people in addiction treatment are likely to have some co-occurring mental health condition, and around 900 to 1,050 are a defensible ADHD-specific overlap planning number.”**

That uses:
- **Weaver / SUN** for the broad co-occurring-MH layer, and
- **21% to 25%** for the ADHD-specific layer. ([sunnetwork.org.uk](https://www.sunnetwork.org.uk/dev/wp-content/uploads/2020/01/Co-occuring-principles-document-final-.pdf), [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC9859173/))

And if you want the sharper follow-on line:

> **“So ADHD is likely to represent roughly a quarter to a third of the broader co-occurring-MH addiction cohort, not all of it.”**

That is a derived planning proxy from **877–1,044 ADHD-specific** against **2,923–3,591 generic MH-comorbidity**. ([sunnetwork.org.uk](https://www.sunnetwork.org.uk/dev/wp-content/uploads/2020/01/Co-occuring-principles-document-final-.pdf), [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC9859173/))

## My recommendation

Use:
- **3.0k–3.6k** = broad dual diagnosis / co-occurring MH
- **~1.0k** = ADHD-specific base case
- **~2.7k** = high-stress upside case, not base case

That is the cleanest and most defensible structure.

I can turn that into a **single table with formulas** next.

### Assistant output 14 — 2026-03-30T00:38:48.998204+00:00 — gpt-5-4-thinking

I’m collapsing it to one board-ready table: people, rate used, and annual gross potential savings.

### Assistant output 15 — 2026-03-30T00:40:27.380122+00:00 — gpt-5-4-thinking

Use this:

**Context:**  
- **Adults in addiction treatment (C&P): 4,175**. citeturn821261search2turn821261search4  
- **Broad co-occurring MH in addiction treatment:** **70%–86%** from the C&P co-occurring conditions document / Weaver evidence. citeturn616533search2turn748690search15  
- **ADHD within SUD:** **21% pooled meta-analysis**, with a **5.22%** low anchor and **65.5%** high-stress anchor. citeturn821261search0turn675197search5turn869952search0  
- **Outcome uplift variables used:** **20% low**, **59% mid** (simple average of **61.3%**, **41%**, **76%**), **75% high**. The source figures come from START, Vanderbilt, and INCAS. citeturn616533search0turn616533search1turn869952search0turn561624calculator0  

| View | Maths | People | Annual gross potential* |
|---|---:|---:|---:|
| **Broad dual diagnosis / co-occurring MH** | 4,175 × 70% | **2,923** | — |
|  | 4,175 × 78% | **3,257** | — |
|  | 4,175 × 86% | **3,591** | — |
| **ADHD-specific overlap — Low** | 4,175 × 5.22% | **218** | **£3.9m** |
| **ADHD-specific overlap — Mid (evidence)** | 4,175 × 21% | **877** | **£46.6m** |
| **ADHD-specific overlap — Mid (planning)** | 4,175 × 25% | **1,044** | **£55.4m** |
| **ADHD-specific overlap — High stress-test** | 4,175 × 65.5% | **2,735** | **£184.6m** |

\* **Annual gross potential** = people × uplift variable × **£90,000 per person per year**. **£90k is your ASSUMPTION\***, not a sourced official tariff. The row maths above is: low = **218 × 20% × £90k**, mid evidence = **877 × 59% × £90k**, mid planning = **1,044 × 59% × £90k**, high = **2,735 × 75% × £90k**. citeturn666754calculator0turn666754calculator1turn666754calculator2turn666754calculator3turn666754calculator4turn666754calculator5turn666754calculator6turn666754calculator7turn666754calculator8turn666754calculator9turn666754calculator10

**Shortest board line:**  
**“In Cambridgeshire & Peterborough, around 2.9k–3.6k people in addiction treatment are likely to have some co-occurring mental health condition, and around 0.9k–1.0k is the most defensible ADHD-specific planning number; on a £90k annual cost assumption, that implies roughly £47m–£55m annual gross potential.”** citeturn616533search2turn748690search15turn821261search0turn675197search5turn666754calculator1turn666754calculator2

### Assistant output 16 — 2026-03-30T00:44:09.907096+00:00 — gpt-5-4-thinking

I’m just converting the 1,000-person base into savings scenarios now, using the rates we already pinned down.

### Assistant output 17 — 2026-03-30T00:44:32.383809+00:00 — gpt-5-4-thinking

Yes — exactly.

For a **1,000-person cohort**, if you use **£90,000 per person per year** as the total annual system cost, the **starting annual burden is £90m**. Forecasted savings are then just **£90m × success rate**. citeturn869347calculator0

| Scenario | Success rate applied | Forecast annual savings |
|---|---:|---:|
| Low | 20% | **£18.0m** |
| Mid | 59% | **£53.1m** |
| High | 75% | **£67.5m** |

Those figures are: **£90m × 20% = £18.0m**, **£90m × 59% = £53.1m**, and **£90m × 75% = £67.5m**. citeturn869347calculator1turn869347calculator2turn869347calculator3

The clean sentence to use is:

> **“On a 1,000-person cohort, assuming £90,000 annual system cost per person, the gross annual opportunity is £18m in the low case, £53.1m in the base case, and £67.5m in the high case.”**

If you want to anchor the **mid case** to a printed study number, the strongest direct ADHD-in-addiction result we pulled was the **START study**, which found **61.3% improvement in addictive disorders** six months after ADHD diagnosis, so your **59% base case** sits in the same ballpark as the direct literature. citeturn869347search0turn869347search1

For comparison, on **£65,000 per person per year**, the same 1,000-person cohort gives:

- **£13.0m** at 20%
- **£38.35m** at 59%
- **£48.75m** at 75% citeturn869347calculator4turn869347calculator5turn869347calculator6turn869347calculator7

If you want, I can do the exact same final table for **50 / 250 / 500 / 1,000 / 2,000** in the same stripped-down format.

### Assistant output 18 — 2026-03-30T00:49:35.051566+00:00 — gpt-5-4-thinking

I’m checking the paper wording so you can state exactly what happened before that 61.3% figure.

### Assistant output 19 — 2026-03-30T00:49:40.573214+00:00 — gpt-5-4-thinking

Not exactly.

The **61.3%** figure in the START study was measured **six months after ADHD diagnosis** in patients already in addiction treatment. It was **not** a clean “after diagnosis, then full titration, then stable medication” outcome. citeturn281177search0turn281177search1

What the paper actually says is:

- patients were included if they had an **ADHD diagnosis established within the past month** and had **at least one follow-up consultation ≥ 6 months after diagnosis**; citeturn281177search0turn281177search1
- the outcome was whether addictive disorders had **improved, stayed stable, or deteriorated** over that follow-up period; citeturn281177search0turn281177search1
- **methylphenidate initiation was delayed in 29% of cases**, mainly because of psychiatric comorbidity or ongoing addiction. citeturn281177search0turn281177search1

So the safest way to phrase it is:

> **“In the START study, 61.3% showed improvement in addictive disorders within six months of ADHD diagnosis and subsequent clinical management; this was not a pure post-stabilisation medication effect.”** citeturn281177search0turn281177search1

If you want an even tighter caveat line for a deck:

> **“61.3% improvement was observed after ADHD diagnosis over six months, but the study does not isolate fully titrated, stable medication as the sole driver.”** citeturn281177search0turn281177search1

That means for your savings model, **61.3% can be used as a pragmatic upper-mid outcome variable**, but it should be labelled as **post-diagnosis / treatment-pathway improvement**, not **post-stabilised-medication success rate**. citeturn281177search0turn281177search1

### Assistant output 20 — 2026-03-30T00:59:49.675029+00:00 — gpt-5-4-thinking

Use this as your **copy-paste master prompt** for ChatGPT Images.

```text
C.R.A.F.T. PROMPT — OTOS CONTINUITY INFOGRAPHIC POSTER

CONTEXT:
Create a premium, original, editorial-style infographic poster for OTOS that explains the ADHD + addiction opportunity in a way that is instantly understandable to NHS commissioners, health system leaders, public health teams, and investors. The graphic must feel like a world-class data-journalism poster: elegant, highly structured, visually intelligent, simple at first glance, and rich on second look. The goal is to communicate scale, overlap, and potential savings from identifying and treating ADHD within addiction populations. This is not a clinical journal figure and not a sales flyer; it is a polished strategic infographic for serious decision-makers.

The infographic must visually separate:
1. OBSERVED numbers
2. MODELLED overlap
3. ASSUMPTION* savings scenarios

Use the following working numbers unless I replace them:
- Adult ADHD population, Cambridgeshire & Peterborough: 20,150
- Adults in addiction treatment: 4,175
- Broad co-occurring mental health in addiction treatment: 70% to 86%
- ADHD-specific overlap in addiction treatment:
  - Low: 5.22% = 218
  - Mid evidence: 21% = 877
  - Mid planning: 25% = 1,044
  - High stress-test: 65.5% = 2,735
- 1,000-person cohort annual total cost assumption: £90,000 per person per year = £90m annual burden
- Forecast savings if effective ADHD diagnosis + treatment pathway support reduces harm/cost:
  - Low: 20% = £18.0m
  - Mid: 59% = £53.1m
  - High: 75% = £67.5m

Key narrative:
- Co-occurring need is common in addiction care
- ADHD is a material sub-group within that broader co-occurring population
- The opportunity is not abstract; it can be framed as annual gross potential
- Keep wording evidence-informed and strategic
- Do not imply guaranteed savings
- Do not make medication-specific superiority claims
- Phrase outcome improvement as “after ADHD diagnosis and treatment-pathway support” or “after ADHD identification and treatment”, not as a claim about one named drug outperforming another

If an OTOS logo is uploaded, incorporate it tastefully in the design, ideally in the header lockup or footer, small but visible, crisp, premium, never distorted.

ROLE:
You are a globally recognised information designer, NHS communications strategist, and editorial infographic art director with 20+ years of experience creating award-winning visual explainers for healthcare systems, public policy, and board-level strategy documents. You specialise in elegant hierarchy, restrained colour systems, clear visual logic, and layouts that transform complex service data into instantly legible strategic insight.

ACTION:
1. Design a single, original infographic poster in portrait orientation.
2. Make the visual hierarchy immediately clear from top to bottom:
   - headline insight
   - scale of need
   - overlap logic
   - financial opportunity
   - evidence-quality caveat
3. Use a clean, sophisticated infographic composition inspired by premium editorial posters:
   - radial or semi-radial data arcs
   - modular stat panels
   - circular overlap diagrams
   - simple iconography
   - elegant labels
   - thin connector lines
   - restrained annotation
4. Create a strong headline and subheadline using this meaning:
   - Headline idea: “The ADHD Opportunity in Addiction Care”
   - Subheadline idea: “A Cambridgeshire & Peterborough planning model for OTOS Continuity”
   You may improve the wording while keeping the meaning.
5. Build the poster around 4 visual zones:
   A. SCALE OF NEED
      - show 20,150 adult ADHD population
      - show 4,175 adults in addiction treatment
   B. BROAD CO-OCCURRING NEED
      - show 70%–86% of addiction-treatment users likely to have mental health comorbidity
      - visually convert this into 2,923 to 3,591 people
   C. ADHD-SPECIFIC OVERLAP
      - show low / mid / high planning ranges
      - make 877 to 1,044 the most visually credible central range
      - keep 218 as conservative floor
      - keep 2,735 as high stress-test, clearly marked
   D. ANNUAL GROSS POTENTIAL
      - highlight the 1,000-person scenario
      - show £90m annual burden baseline
      - show forecast annual savings:
        - £18.0m low
        - £53.1m mid
        - £67.5m high
6. Make the middle of the poster visually compelling:
   - a clean funnel, orbit, radial arc, or concentric-ring system that shows:
     addiction treatment total → broader co-occurring MH → ADHD-specific likely overlap → 1,000-person target cohort → annual savings scenarios
7. Include short labels only. Avoid dense paragraphs. All text must be large and legible.
8. Use explicit micro-labels such as:
   - OBSERVED
   - MODELLED
   - ASSUMPTION*
   - LOW / MID / HIGH
9. Include a small footer note area with short caveat language such as:
   - “Planning model; not a linked patient-level dedupe”
   - “Gross annual potential, not guaranteed cash release”
   - “ADHD-specific overlap shown separately from broader co-occurring mental health”
10. If possible, include tiny source-style footer markers without heavy citation clutter, for example:
   - local ADHD needs assessment
   - addiction treatment denominator
   - co-occurring conditions evidence
   - international ADHD-in-SUD evidence
   Keep this visually minimal and elegant, not academic.
11. Use iconography sparingly:
   - neurodevelopment / focus / care pathway
   - addiction recovery / support
   - mental health
   - system cost / pound sterling
   - NHS / service flow
12. Ensure the poster looks premium enough for a board presentation, strategy deck, website hero asset, or printed A3 leave-behind.

FORMAT:
Create one finished infographic image with these style requirements:
- portrait poster, 4:5 or 3:4 ratio
- premium editorial infographic aesthetic
- original composition, not a copy of any existing infographic
- minimal clutter
- strong negative space
- elegant grid structure
- legible large typography
- muted healthcare palette:
  - deep navy
  - slate blue
  - teal
  - soft sage
  - off-white / warm grey background
  - very limited accent colour in amber or coral for emphasis
- subtle paper / presentation texture is acceptable
- modern, calm, evidence-led, premium healthcare tone
- polished vector-infographic feel
- no photorealism
- no stock-photo collage
- no messy UI
- no childish cartoon style
- no loud rainbow palette
- no tiny unreadable fine print
- no exaggerated clinical imagery
- no pills or medication imagery dominating the design
- no direct claim that one specific ADHD medication is superior
- British / NHS / policy presentation sensibility, not flashy US startup marketing

Suggested content blocks to render clearly:
- Title
- Subtitle
- Big number: 4,175 adults in addiction treatment
- Big number: 20,150 adult ADHD population
- Broad co-occurring MH: 2,923–3,591
- ADHD-specific overlap:
  - 218 low
  - 877 evidence-mid
  - 1,044 planning-mid
  - 2,735 high stress-test
- 1,000-person target cohort
- £90m annual burden baseline
- £18.0m / £53.1m / £67.5m annual gross potential
- Footer caveat strip

TARGET AUDIENCE:
Primary audience:
- NHS commissioners
- ICB leaders
- public health commissioners
- mental health trust leaders
- addiction service leaders
- health-economics and strategy stakeholders

Secondary audience:
- OTOS leadership
- investors
- partners evaluating rollout potential

Audience preferences:
- plain English
- serious, intelligent, concise
- visually impressive but credible
- strong emphasis on clarity, hierarchy, and legitimacy
- must look trustworthy enough to use in a commissioner meeting

FILL-IN-BLANK OPTIONS:
Replace these if needed before generation:
- [GEOGRAPHY]
- [ADULT_ADHD_TOTAL]
- [ADDICTION_TREATMENT_TOTAL]
- [BROAD_MH_LOW]
- [BROAD_MH_HIGH]
- [ADHD_OVERLAP_LOW]
- [ADHD_OVERLAP_MID_EVIDENCE]
- [ADHD_OVERLAP_MID_PLANNING]
- [ADHD_OVERLAP_HIGH]
- [ANNUAL_COST_PER_PERSON]
- [LOW_SAVINGS]
- [MID_SAVINGS]
- [HIGH_SAVINGS]
- [HEADLINE]
- [SUBHEADLINE]

FINAL CREATIVE DIRECTION:
Make this look like an elite, board-level infographic poster that could sit comfortably between a health-economics strategy visual, a high-end annual report graphic, and a premium magazine-style data explainer. The image must feel calm, intelligent, authoritative, and commercially powerful.
```

Best extra inputs to upload with it:
- the **OTOS logo**
- a **plain text list of the final numbers**
- one line saying **“Use British spelling and £ signs”**

If you want, I can now do the second half: a **fully filled-in final version** of this prompt using your exact OTOS numbers and headline.

### Assistant output 21 — 2026-03-30T01:03:49.394481+00:00 — gpt-5-4-thinking

Yes — **you do not need to attach any visual guidance**.  
For ChatGPT Images, this prompt is detailed enough to stand on its own. Attach only:
- **OTOS logo**
- **CPFT logo**
- **CGL logo**

Here is the **complete, ready-to-paste version**:

```text
Create a single, original, premium infographic poster in portrait orientation for OTOS.

Design brief:
This infographic must explain the strategic opportunity in identifying and treating ADHD within addiction services across Cambridgeshire & Peterborough. The visual should feel like a world-class editorial data graphic: elegant, highly structured, minimal, intelligent, calm, credible, and board-ready. It should look suitable for NHS commissioners, ICB leaders, public health teams, mental health trust executives, addiction service leaders, and investors.

Overall objective:
Show, in one image, the scale of the overlap between ADHD and addiction treatment need, then translate that into a clear annual gross opportunity model. The infographic must feel evidence-led and commercially powerful without looking like an advertisement or a clinical paper.

Geographic frame:
Cambridgeshire & Peterborough

Core narrative to communicate:
1. There is a large adult ADHD population in the area.
2. There is a substantial addiction-treatment population in the same footprint.
3. Most people in addiction treatment are likely to have some form of co-occurring mental health need.
4. A meaningful sub-group are likely to have ADHD specifically.
5. Identifying and treating ADHD within this group creates a major annual gross opportunity.
6. This is a planning model, not a patient-level deduped count.

Use these exact numbers in the design:
- Adult ADHD population: 20,150
- Adults in addiction treatment: 4,175
- Broad co-occurring mental health in addiction treatment: 70% to 86%
- Converted broad co-occurring mental health counts:
  - 2,923
  - 3,257
  - 3,591
- ADHD-specific overlap in addiction treatment:
  - Low: 218
  - Mid evidence: 877
  - Mid planning: 1,044
  - High stress-test: 2,735
- Target cohort for savings model: 1,000 people
- Annual cost baseline: £90,000 per person per year
- Total annual burden for 1,000 people: £90m
- Forecast annual gross potential:
  - Low: £18.0m
  - Mid: £53.1m
  - High: £67.5m

Use this wording logic:
- Broad co-occurring mental health = OBSERVED / EVIDENCE-BASED CONTEXT
- ADHD-specific overlap = MODELLED
- Savings = ASSUMPTION* / FORECAST ANNUAL GROSS POTENTIAL
- Do not say “guaranteed savings”
- Do not say “cash released”
- Do not imply a direct patient-level dedupe has already happened
- Do not make claims that one named ADHD medication is superior to another
- Phrase benefits as occurring after “ADHD identification and treatment-pathway support” or “ADHD diagnosis and treatment”

Visual structure:
Build the poster in 4 elegant zones from top to bottom.

ZONE 1 — HEADER
Create a strong, sophisticated title area.
Use:
Headline: THE ADHD OPPORTUNITY IN ADDICTION CARE
Subheadline: A Cambridgeshire & Peterborough planning model for OTOS Continuity

Place OTOS, CPFT, and CGL logos in a clean, premium way.
Important:
- Include dedicated space for all three logos
- Position them tastefully in the header or footer
- Keep them small but clearly visible
- Do not distort them
- Do not merge them into one mark
- Allow the uploaded OTOS, CPFT, and CGL logos to sit naturally within the design system

ZONE 2 — SCALE OF NEED
Visually present the two anchor populations:
- 20,150 adult ADHD population
- 4,175 adults in addiction treatment

This should be immediately understandable.
Use bold numerals and elegant visual devices such as:
- stat blocks
- proportional bars
- circular anchors
- clean icon-led figures
Keep it simple and spacious.

ZONE 3 — OVERLAP MODEL
This is the heart of the infographic.
Use a visually striking but very clear structure such as:
- concentric rings
- a funnel
- a radial arc system
- nested circles
- a layered pathway
- or a semi-circular evidence dial

Show:
A. Broad co-occurring mental health in addiction treatment
- 70% to 86%
- 2,923 to 3,591 people

B. ADHD-specific overlap inside that broader co-occurring group
- 218 low
- 877 evidence-mid
- 1,044 planning-mid
- 2,735 high stress-test

Make the central visual emphasis land on:
- 877
- 1,044

These should feel like the most credible central planning zone.
Make 218 visibly conservative.
Make 2,735 visibly possible but clearly marked as stress-test / upper-end.

Use small labels such as:
- OBSERVED
- MODELLED
- LOW
- MID
- HIGH
- STRESS-TEST

ZONE 4 — ANNUAL GROSS POTENTIAL
Show a clear transition from overlap to economics.
Use the 1,000-person scenario as the flagship planning example.

Present:
- 1,000 people
- £90m annual burden baseline
- Forecast annual gross potential:
  - £18.0m low
  - £53.1m mid
  - £67.5m high

This section should feel decisive and commercial, but still credible.
Possible visual treatments:
- stacked financial bars
- three scenario columns
- a tiered savings dial
- a simple low / mid / high forecast panel
- elegant pound-denominated visual counters

Include small text such as:
- LOW CASE
- BASE CASE
- HIGH CASE
- FORECAST ANNUAL GROSS POTENTIAL
- BASED ON A 1,000-PERSON COHORT

Footer / caveat strip:
Include a refined, minimal footer note area with short caveat language:
- Planning model, not a linked patient-level dedupe
- ADHD-specific overlap shown separately from broader co-occurring mental health
- Gross annual potential, not guaranteed cash release
- Figures combine observed counts, modelled overlap, and assumption-based forecasting

Design style:
- Portrait poster
- Premium editorial infographic aesthetic
- Original composition
- Strong hierarchy
- Clean grid
- Large readable typography
- High negative space
- Sophisticated information design
- Modern healthcare strategy tone
- Vector-infographic finish
- No photorealism
- No stock-photo collage
- No clutter
- No childish illustration
- No generic corporate brochure look
- No busy rainbow palette
- No tiny unreadable text

Colour palette:
Use a calm, premium NHS-adjacent palette:
- deep navy
- slate blue
- teal
- muted sage
- warm off-white or pale stone background
- limited accent colour in amber or coral for emphasis only

Typography feel:
- elegant condensed sans serif for headings
- modern clean sans serif for labels and numbers
- large bold numeric emphasis
- minimal text blocks
- strong legibility

Iconography:
Use very restrained iconography only where useful:
- adult ADHD / neurodevelopment
- addiction / recovery / support
- mental health
- NHS / care pathway
- pound sterling / system cost
Keep icons minimal, line-based, and premium.

Composition goal:
The finished image should feel like a hybrid of:
- an elite annual report graphic
- a serious health-economics strategy visual
- a magazine-quality data-journalism poster
- a board-level NHS transformation infographic

Final tone:
Calm. Intelligent. Authoritative. Strategic. Expensive-looking. Trustworthy.

British requirements:
- Use British spelling
- Use pound sterling signs (£)
- Use NHS / public-sector visual sensibility
- Keep all language plain, serious, and credible

Very important:
The infographic must be visually beautiful, instantly legible, and persuasive enough to place in:
- an NHS commissioner deck
- an OTOS investor presentation
- a strategy document
- an A3 printed leave-behind
- a website hero graphic

Render one finished infographic poster only.
```

And yes: **do not attach the example visuals** unless you specifically want ChatGPT Images to imitate those layouts.  
For the cleanest result, attach **only the three logos** and use the prompt above.

### Assistant output 22 — 2026-03-30T01:21:04.519731+00:00 — gpt-5-4-thinking

Yes — this needs to be **brighter, cleaner, punchier, and far more headline-led**.

Attach:
- **OTOS logo**
- **CPFT logo**
- **CGL logo**
- **1 visual reference only** for style direction

Use this complete prompt in ChatGPT Images:

```text
C.R.A.F.T. PROMPT — BRIGHT, PREMIUM OTOS INFOGRAPHIC POSTER

CONTEXT:
Create a single, world-class infographic poster for OTOS that explains the ADHD + addiction opportunity in Cambridgeshire & Peterborough in a bold, bright, ultra-clean, premium editorial style.

This must not feel drab, muted, academic, or overly cautious in appearance. It must feel:
- bright
- spacious
- modern
- expensive
- highly legible
- strategically persuasive
- visually crisp
- boardroom ready

The design should combine:
- elite annual-report infographic design
- premium magazine data-journalism
- healthcare strategy clarity
- startup-quality visual confidence

The attached visual reference should be used only for inspiration around cleanliness, punch, and visual hierarchy — not copied literally.

The infographic must focus on the strongest numbers that support the case and present them as powerful headline callouts. It should feature around 8 to 10 large “proof points” or “evidence callouts” across the page, each visually distinct, so the viewer can scan and immediately grasp the argument.

The main storytelling arc is:
1. Scale of the problem
2. Scale of overlap
3. Strength of international evidence
4. Annual economic opportunity
5. Why this matters for high-harm repeat-cycle patients

Important:
- Use the phrase “up to” only for upper-bound modelled or study-best figures
- Clearly separate:
  - OBSERVED
  - MODELLED
  - ASSUMPTION*
- This is a strategic planning infographic, not a clinical journal figure
- It must look commercially powerful but still credible to NHS commissioners

Use these exact content points and numbers:

LOCAL SCALE / OVERLAP
- 20,150 adult ADHD population
- 4,175 adults in addiction treatment
- 70% to 86% broad co-occurring mental health in addiction treatment
- 2,923 to 3,591 people with broader co-occurring mental health need
- ADHD-specific overlap in addiction treatment:
  - 218 low
  - 877 evidence mid
  - 1,044 planning mid
  - up to 2,735 high stress-test

INTERNATIONAL EVIDENCE CALLOUTS
- France: 61.3% improved addictive disorders within 6 months after ADHD diagnosis and treatment-pathway support
- US: 41% lower attrition hazard with ADHD pharmacotherapy
- US: 36 months vs 9 months apparent retention in treatment
- US: 4.9x higher likelihood of attrition within 90 days without ADHD medication
- International cohort: OR 2.4 better retention
- International cohort: 76% fewer heavy drinking days at 3 months
- Sweden: 25% reduction in recurrent substance misuse events
- Sweden: 16% reduction in transport accidents
- Sweden: 25% reduction in criminality events

ECONOMIC MODEL
- 1,000-person target cohort
- £90,000 annual system burden per severe repeat-cycle high-harm case
- £90m annual burden for a 1,000-person cohort
- Forecast annual gross potential:
  - £18.0m low case
  - £53.1m base case
  - £67.5m high case

IMPORTANT ECONOMIC WORDING:
The £90,000 figure must be presented as:
“ASSUMPTION* high-harm annual system burden per severe repeat-cycle case”
It should be visually clear that this is not a published NHS tariff. It is a strategic high-harm planning assumption that includes ripple effects, repeated cycling, and wider system burden.

Do not say:
- guaranteed savings
- cash released
- proven NHS tariff
- exact patient-level dedupe
- one specific ADHD medication is definitively superior

Do say:
- annual gross potential
- high-harm repeat-cycle case
- planning model
- based on observed counts, modelled overlap, and assumption-based forecasting
- after ADHD diagnosis and treatment-pathway support
- up to, where appropriate

ROLE:
You are a globally renowned editorial infographic designer, information architect, and healthcare strategy art director with 20+ years of experience producing iconic visual explainers for health systems, governments, investors, and public-sector transformation programmes. You specialise in clean, bright, elegant, high-trust visuals that translate dense evidence into immediate strategic impact.

ACTION:
1. Create a single portrait infographic poster.
2. Make the design dramatically cleaner, brighter, and more premium than a typical NHS infographic.
3. Use strong white or warm off-white background space.
4. Use a vivid but refined colour palette:
   - deep navy
   - rich teal
   - bright turquoise
   - warm coral or orange accent
   - golden amber highlight
   - soft cool grey
   - white background
5. Build the infographic around bold modular evidence blocks, not one muddy central shape.
6. Include approximately 10 major proof-point callouts, each with:
   - one large number
   - a very short label
   - a micro-caption if needed
7. Create a strong title area at the top:
   - Headline: THE ADHD OPPORTUNITY IN ADDICTION CARE
   - Subheadline: Cambridgeshire & Peterborough — from overlap to annual gross potential
8. Include OTOS, CPFT, and CGL logos in a clean logo strip near the top right or bottom footer.
9. Use a layout with 4 clear zones:

   ZONE 1 — BIG LOCAL NUMBERS
   Show:
   - 20,150 Adult ADHD population
   - 4,175 Adults in addiction treatment
   - 70%–86% Broad co-occurring mental health
   These should be large, bright, and instantly readable.

   ZONE 2 — OVERLAP STORY
   Show the progression:
   - 4,175 in addiction treatment
   - 2,923 to 3,591 broader co-occurring MH
   - 877 to 1,044 as the key ADHD planning range
   - up to 2,735 as the upper-bound stress-test
   Use arrows, layered bars, bold rings, or stepped geometry.
   Make this section feel sharp and obvious.

   ZONE 3 — INTERNATIONAL PROOF
   Create 5 to 6 visually distinct country/stat callouts using bold labels such as:
   - FRANCE — 61.3% improved
   - US — 41% lower attrition hazard
   - US — 36 vs 9 months retention
   - INTERNATIONAL — 76% fewer heavy drinking days
   - SWEDEN — 25% fewer recurrent substance misuse events
   - SWEDEN — 16% fewer transport accidents
   These should feel like bright proof badges, arrows, stat tiles, or directional callouts.

   ZONE 4 — ECONOMIC OPPORTUNITY
   Make this the most commercially powerful section.
   Show:
   - 1,000 PEOPLE
   - £90m ANNUAL BURDEN
   - LOW CASE £18.0m
   - BASE CASE £53.1m
   - HIGH CASE £67.5m
   Make the three savings scenarios highly visible and clean.
   This section should feel decisive and exciting without looking exaggerated.

10. Include strong visual language such as:
   - upward arrows
   - reduction arrows
   - clean segmented bars
   - radial proof markers
   - bright numeric tiles
   - elegant divider lines
   - premium iconography
11. Keep text extremely short.
12. Make every major number large.
13. Avoid muddy gradients, heavy textures, murky colours, or overly soft washed-out design.
14. Avoid clutter, tiny labels, or dense body text.
15. Use elegant healthcare/business icons only where helpful:
   - brain / neurodevelopment
   - person / treatment pathway
   - pound sign / cost
   - arrow / improvement
   - repeat-cycle / recurrence
16. Include a short footer with these caveats in very clean small text:
   - Planning model, not linked patient-level dedupe
   - Gross annual potential, not guaranteed cash release
   - ADHD-specific overlap shown separately from broader co-occurring mental health
   - £90k is an ASSUMPTION* for severe repeat-cycle high-harm annual burden including ripple costs

FORMAT:
Produce one finished infographic image only.
Style requirements:
- portrait orientation
- bright, premium, crisp, clean
- editorial infographic poster
- high negative space
- large typography
- elegant composition
- readable from a distance
- suitable for commissioner deck, investor slide, website hero, or A3 print
- British spelling
- pound signs (£)
- no photorealism
- no stock-photo montage
- no dark, drab, muddy layout
- no generic NHS leaflet feel
- no dull academic poster look

TARGET AUDIENCE:
Primary:
- NHS commissioners
- ICB leaders
- public health decision-makers
- trust executives
- addiction service leaders

Secondary:
- OTOS leadership
- investors
- strategic partners

Audience expectation:
They want immediate clarity, strategic confidence, evidence-backed ambition, and financial relevance. The infographic must persuade in under 15 seconds and reward closer inspection.

FINAL CREATIVE DIRECTION:
Make this feel like an elite strategy infographic that says:
“This is a large, measurable, evidence-backed opportunity.”
The overall feeling should be:
bright, sharp, intelligent, premium, clean, modern, and compelling.
```

One important fix to your messaging:

Use **“up to £67.5m annual gross potential”** rather than presenting the top case as the default.  
That keeps it powerful without weakening credibility.
