---
title: Network Generation Algorithm
date: 2025-11-07
tags:
  - model
  - algorithm
  - implementation
  - simulation
type: technical-specification
status: draft
---

# Network Generation Algorithm

## Overview

This document specifies the algorithm for generating social networks that model the transition from oral culture through various communication technologies. The algorithm creates heterogeneous populations with varying technology access and simulates the emergence of network structures, cognitive overload, and trust dynamics.

See [[Model/Overview]] for conceptual background.

## Cybernetic Framework (Bateson)

This model is fundamentally **cybernetic** - it models social systems as self-regulating circuits that maintain homeostasis through feedback loops. Gregory Bateson's work on cybernetics, learning theory, and schismogenesis provides the theoretical foundation.

### Core Principles

#### 1. Relationships as Cybernetic Circuits

A true relationship is not just a connection, but a **feedback loop** where both parties regulate each other:

- **Embodied relationships**: Bidirectional feedback (you affect me, I affect you, mutual regulation)
- **Parasocial connections**: Unidirectional (you affect me, but I don't affect you, no regulation possible)

**Key insight**: Dunbar's limit exists because maintaining feedback loops requires cognitive resources. Beyond ~150, you can't maintain the circuits.

#### 2. Homeostasis & System Boundaries

Living systems maintain critical variables within viable ranges through negative feedback loops:

- **Within range**: System self-corrects, stable
- **Beyond threshold**: Regulatory capacity fails, system breaks down

**In our model**:
- Cognitive capacity ~150 is the homeostatic boundary
- Within it: Feedback loops function, trust maintained, relationships stable
- Beyond it: Regulatory collapse, trust breakdown, pathology

#### 3. Feedback Loop Types

**Negative feedback** (stabilizing, self-correcting):
- Example: Social disapproval → behavior change → approval restored
- Characteristic of healthy oral cultures
- Maintains equilibrium

**Positive feedback** (amplifying, runaway):
- Example: Inflammatory post → engagement → more inflammatory posts → [escalation]
- Characteristic of algorithmic systems
- Creates instability, schismogenesis

**Blocked feedback** (pathological):
- Example: Want to quit social media → but all friends are there → stuck
- Creates double binds
- Produces learned helplessness

#### 4. Learning Levels (Logical Types)

Bateson distinguished between different **logical types** of learning:

**Learning 0**: Fixed response, no change

**Learning I**: Context-specific learning
- "This behavior gets rewarded in this context"
- Behavior changes, but character doesn't

**Learning II**: Deutero-learning (learning to learn)
- "I've learned what kinds of behaviors get rewarded"
- **Character structure changes**
- Creates habits of thought
- Very difficult to unlearn

**Learning III**: Learning about Learning II (rare)
- Awareness of the meta-pattern
- Can see you're trapped in a system
- Either: Breakdown or breakthrough

**Critical for our model**: When nodes learn (at level II) that "inflammatory content gets engagement," this is not just behavioral - it's a **character transformation**. They become engagement maximizers.

#### 5. Schismogenesis (Runaway Escalation)

**Symmetrical schismogenesis**: "If you do X, I'll do X+1"
- Example: Tribal conflict online
- Each side escalates in response to the other
- No stable equilibrium
- Eventually: Communication becomes impossible

**Complementary schismogenesis**: "If you dominate, I'll submit more"
- Example: Influencer/follower dynamics
- Increasing differentiation
- Can be stable or runaway

**Algorithms accelerate schismogenesis** by:
- Selecting for extreme responses
- Creating visibility for escalation
- Removing moderating influences
- Rewarding tribal behavior

#### 6. Double Binds

A **double bind** requires:
1. Two or more people in an intense relationship
2. Repeated experience (chronic, not one-time)
3. Primary negative injunction: "Don't do X or punishment"
4. Secondary injunction contradicting the first
5. Tertiary injunction preventing escape
6. Prohibition of meta-communication about the contradiction

**Result**: Pathological adaptation (anxiety, paralysis, learned helplessness, or dissociation)

**Example in our model**:
- Primary: "You need close relationships" (evolutionary requirement)
- Secondary: "To stay connected, you must use social media with hundreds" (social norm)
- Tertiary: "You can't leave, everyone is there" (network effects)
- No meta-communication: The contradiction is invisible/undiscussable

#### 7. Information vs. Noise

**Bateson's definition**: Information is "a difference that makes a difference"

- **Information**: Novel, challenges understanding, enables action, comes from trusted source
- **Redundancy**: Confirms what you know (echo chamber)
- **Noise**: High engagement, low meaning (ragebait)

**In our model**:
- Oral networks: High information/noise ratio (trusted, novel, relevant)
- Print networks: Medium ratio (institutional trust, slower)
- Algorithmic networks: Low ratio (engagement ≠ information value)

### How These Concepts Interact

```
Homeostatic Capacity
       ↓
Feedback Loops Function
       ↓
Can Regulate Behavior & Learn Appropriately (Level 0-I)
       ↓
System Stable

BUT when Technology Exceeds Capacity:
       ↓
Homeostatic Breakdown
       ↓
Feedback Loops Fail
       ↓
Learning Becomes Pathological (Level II-III)
       ↓
Positive Feedback Dominates (Schismogenesis)
       ↓
Double Binds Emerge
       ↓
Information → Noise
       ↓
System Pathology
```

### Questions This Framework Addresses

1. **Why does the network break down beyond Dunbar's limit?**
   - Because feedback loops can't function → regulatory capacity fails

2. **Why do algorithms make it worse?**
   - They create positive feedback (engagement optimization)
   - They block negative feedback (no social cost for bad behavior)
   - They accelerate schismogenesis

3. **Why can't people "just leave"?**
   - Double binds trap them
   - Network effects prevent escape
   - Learning II has changed their character

4. **Why does trust collapse?**
   - Information becomes indistinguishable from noise
   - Cognitive overload prevents evaluation
   - Regulatory circuits broken

5. **Why is oral culture stable?**
   - Strong negative feedback (face-to-face accountability)
   - Within homeostatic boundaries (Dunbar's limit respected)
   - Learning stays at healthy levels (0-I)
   - Information/noise ratio high

## Mathematical Formalization

### Bateson's Schismogenesis Equations

Bateson formalized schismogenesis in *Naven* (1936) using **coupled differential equations** that model mutual influence between parties.

#### Symmetrical Schismogenesis

When two parties/groups (A and B) escalate in response to each other (competitive, "if you do X, I'll do X+1"):

```
dX/dt = k₁ · Y
dY/dt = k₂ · X
```

Where:
- **X** = Behavior intensity of Party A (e.g., inflammatory rhetoric level)
- **Y** = Behavior intensity of Party B
- **k₁** = Coupling constant (how much B's behavior drives A's rate of change)
- **k₂** = Coupling constant (how much A's behavior drives B's rate of change)

**Solution**: If k₁·k₂ > 0, this creates **exponential runaway**:
```
X(t) = X₀ · exp(√(k₁·k₂) · t)
Y(t) = Y₀ · exp(√(k₁·k₂) · t)
```

This is **unstable** - escalation continues until external constraints stop it (exhaustion, intervention, or system breakdown).

**In our model**:
- X and Y represent `escalation_level` for two tribes
- k₁ and k₂ depend on algorithm engagement weight and inflammatory content ratio
- Higher algorithmic amplification → larger k values → faster runaway

#### Complementary Schismogenesis

When two parties differentiate (dominance/submission, "if you dominate, I'll submit more"):

```
dX/dt = k₁ · Y
dY/dt = -k₂ · X
```

Where:
- **X** = Dominance behavior of Party A (e.g., influencer prominence)
- **Y** = Submission behavior of Party B (e.g., follower deference)
- **k₁** > 0: Follower submission increases influencer prominence rate
- **k₂** > 0: Influencer dominance *decreases* follower autonomy rate (negative sign)

**Solution**: This can be **stable or unstable** depending on parameters:
- If k₁·k₂ is small: Oscillation around equilibrium (stable)
- If k₁·k₂ is large: Runaway differentiation until one party has no autonomy (unstable)

**In our model**:
- X represents influencer prominence/reach
- Y represents follower autonomy (1 = autonomous, 0 = fully captured)
- Parasocial relationships create complementary schismogenesis
- Algorithmic amplification increases k₁ (more followers → more algorithmic promotion)

#### Numerical Integration (Euler Method)

For discrete time-step simulation, we use Euler's method:

```javascript
// Symmetrical
X_new = X_old + (k₁ · Y_old) · Δt
Y_new = Y_old + (k₂ · X_old) · Δt

// Complementary
X_new = X_old + (k₁ · Y_old) · Δt
Y_new = Y_old + (-k₂ · X_old) · Δt
```

Where Δt is the simulation time step (we use Δt = 1 for simplicity).

### Double Bind Stress Dynamics

The double bind is not a continuous process but a **trapped state** with accumulating consequences. We model stress accumulation and regulatory capacity degradation:

#### Stress Accumulation

```
dS/dt = α · E · B - β · R
```

Where:
- **S** = Stress level (0 to 1, pathological adaptation at S > 0.9)
- **E** = Escape attempt rate (how often trying to leave)
- **B** = Blocking strength (network effects trap strength, 0 to 1)
- **R** = Regulatory capacity (ability to cope, 0 to 1)
- **α** = Stress accumulation constant (we use 0.1)
- **β** = Stress relief constant when regulation works (we use 0.05)

**Interpretation**: Stress accumulates when escape attempts fail (α·E·B), and only reduces when regulatory capacity can process it (β·R). As R degrades, stress relief becomes impossible.

#### Regulatory Capacity Degradation

```
dR/dt = -γ · S · (1 - H)
```

Where:
- **R** = Regulatory capacity (starts at 1.0)
- **S** = Current stress level
- **H** = Homeostatic health (0 if overloaded, 1 if within range)
- **γ** = Degradation constant (we use 0.02)

**Interpretation**: Stress erodes regulatory capacity, especially when the system is outside homeostatic range. This creates a **runaway degradation**:
- High stress → capacity degrades → less stress relief → higher stress → [loop]

#### Phase Transition to Pathological Adaptation

When stress crosses threshold (S > 0.9), the system undergoes a **discrete phase transition** to one of four pathological adaptations:

```
if S > 0.9 and pathological_adaptation == null:
  pathological_adaptation = weightedChoice({
    'anxiety': 0.4,           // Chronic hyperarousal, constant vigilance
    'learned_helplessness': 0.3,  // Complete surrender, no agency
    'dissociation': 0.2,      // Emotional numbing, detachment
    'paralysis': 0.1          // Decision paralysis, frozen
  })
```

This is **irreversible without intervention** - once adapted, the node remains in that state.

#### Coupling with Cognitive Overload

Double bind stress is coupled to cognitive overload through regulatory capacity:

```
regulatory_capacity = min(
  1.0 / cognitive_overload_ratio,  // From homeostatic failure
  1.0 - (0.5 · double_bind_stress)  // From double bind
)
```

The system takes the **minimum** (worst case) of both degradation sources.

### Intervention Dynamics

#### Breaking Schismogenesis

To stop runaway schismogenesis, reduce coupling constants:

```
k₁_new = k₁ · (1 - intervention_strength)
k₂_new = k₂ · (1 - intervention_strength)
```

**Interventions that work**:
- Remove algorithmic amplification (reduces k₁, k₂ by ~50%)
- Create cross-tribal dialog spaces (introduces negative feedback)
- Make tribal markers invisible (decouples X and Y)

#### Escaping Double Binds

To resolve a double bind, remove the tertiary injunction (enable escape):

```
if intervention_provides_alternative_connection_path:
  tertiary_injunction = null
  can_escape = true
  stress_relief_rate = β · 2  // Recovery begins
```

**Interventions that work**:
- Provide offline social alternatives
- Gradual reduction protocols (time limits before full exit)
- Export social graph to decentralized alternative

## Data Structures

### Node Object

```javascript
class Node {
  // Identity
  id: number

  // Cognitive capacity (Homeostatic boundary)
  cognitive_capacity: 150  // Dunbar's limit (can vary slightly)
  cognitive_load: 0        // Current usage
  cognitive_load_ratio: 0  // load / capacity (0-1, >1 = overload)

  // Homeostatic state
  within_homeostatic_range: true  // Is system functioning normally?
  homeostasis_violation_amount: 0 // How far outside viable range
  regulatory_capacity: 1.0        // 0-1, ability to self-correct
  system_coherence: 1.0           // 0-1, overall system integrity

  // Technology access
  is_literate: boolean
  has_print_access: boolean
  has_broadcast_access: boolean
  has_internet_access: boolean
  has_smartphone: boolean

  // Network role
  role: 'purely_oral' | 'consumer' | 'participant' | 'creator' | 'broadcaster'

  // Position (for visualization)
  position_3d: { x, y, z }
  position_2d: { x, y }

  // Connections by type
  embodied_connections: [Edge]
  text_mediated_connections: [Edge]
  broadcast_connections: [Edge]
  internet_connections: [Edge]
  algorithmic_connections: [Edge]

  // Bateson: Learning levels & history
  learning_level: 0        // 0, 1, 2, or 3 (discrete logical types)
  learning_progress: 0     // 0-1, progress toward next level
  learning_history: []     // Record of what's been learned
  learned_behaviors: {
    content_strategy: null,           // What they've learned works
    engagement_patterns: [],          // What gets rewarded
    algorithm_awareness: 0,           // 0-1, understanding of manipulation
    meta_patterns_recognized: [],     // Level II learnings
    character_changes: []             // Permanent transformations
  }

  // Bateson: Double bind state (stress dynamics)
  double_bind_exposure: {
    is_in_double_bind: false,
    primary_injunction: null,         // "Need close relationships"
    secondary_injunction: null,       // "Must use social media"
    tertiary_injunction: null,        // "Can't leave"
    meta_communication_blocked: true,
    exposure_duration: 0,             // How long trapped

    // Stress dynamics (dS/dt = α·E·B - β·R)
    stress_level: 0,                  // S: 0-1, psychological strain
    escape_attempt_rate: 0,           // E: attempts per time step
    blocking_strength: 0,             // B: 0-1, how hard to escape
    dS_dt: 0,                         // Stress accumulation rate

    // Regulatory degradation (dR/dt = -γ·S·(1-H))
    // Note: regulatory_capacity is stored at node level
    dR_dt: 0,                         // Regulatory capacity change rate

    // Discrete state tracking
    escape_attempts: 0,               // Total failed exits
    pathological_adaptation: null,    // anxiety | paralysis | dissociation | learned_helplessness
    phase_transition_occurred: false  // Has crossed S > 0.9 threshold
  }

  // State
  trust_coherence: 1.0     // 0-1, ability to evaluate information
  emotional_state: 0       // -1 (calm) to 1 (agitated)
  emotional_regulation: 1.0 // 0-1, ability to manage emotions
  doom_scroll_addiction: 0 // 0-1, compulsive checking behavior

  // Bateson: Schismogenesis participation (differential equations)
  schismogenesis_state: {
    participating_in: null,           // symmetrical | complementary | none
    tribal_affiliation: null,         // Which "side" if symmetrical

    // Bateson's differential equation variables
    behavior_intensity: 0,            // X or Y in equations (0-1)
    partner_node_ids: [],             // Who they're in schismogenesis with
    coupling_constant_k: 0,           // k₁ or k₂ (how much partner drives change)
    dX_dt: 0,                         // Rate of change (calculated each step)

    // Legacy field (kept for backwards compatibility, derived from behavior_intensity)
    escalation_level: 0,              // 0-1, same as behavior_intensity

    can_communicate_with_other_side: true,
    last_escalation: null             // timestamp
  }

  // Information processing
  information_received: []            // Content consumed
  information_vs_noise_ratio: 1.0    // 0-1, signal quality
  novel_information_rate: 1.0        // How much truly new info
  echo_chamber_score: 0              // 0-1, redundancy level

  // Metacontext awareness
  perceived_context: 'conversation', // What they think they're doing
  actual_context: 'conversation',    // What they're actually doing
  context_mismatch_stress: 0         // Strain from mismatch

  // Dunbar layer memberships (for other nodes)
  layer_1_5: [nodeId]      // Intimates
  layer_5: [nodeId]        // Close friends
  layer_15: [nodeId]       // Good friends
  layer_50: [nodeId]       // Social friends
  layer_150: [nodeId]      // Acquaintances
  layer_500: [nodeId]      // Recognized

  // Behavioral tracking
  posts_created: 0         // For learning analysis
  inflammatory_score: 0    // 0-1, tendency to post ragebait
  wants_to_leave: false    // Desire to exit system
  functional: true         // System operational vs collapsed
}
```

### Edge Object

```javascript
class Edge {
  source: nodeId
  target: nodeId

  // Edge properties
  type: 'embodied' | 'text' | 'broadcast' | 'internet' | 'algorithmic'
  direction: 'bidirectional' | 'unidirectional'

  // Bateson: Cybernetic circuit properties
  is_cybernetic_circuit: boolean    // Does feedback flow both ways?
  regulatory_capacity: 0-1          // Can this connection regulate behavior?
  feedback_loop_strength: 0-1       // How strong is the regulatory effect?
  feedback_delay: number            // Time lag in feedback (ms to days)

  // Relationship properties
  strength: 0-1            // Intimacy/closeness
  trust_level: 0-1         // Trust between nodes
  dunbar_layer: 1.5 | 5 | 15 | 50 | 150 | 500 | 1500 | 5000

  // Cost
  cognitive_cost: number   // How much capacity this consumes
  time_investment: number  // Hours per week
  maintenance_required: number // Attention needed to sustain

  // State
  last_interaction: timestamp
  decay_rate: number       // How fast relationship fades without maintenance
  interaction_frequency: number // How often they interact

  // Context & information
  context_stability: 0-1   // Is the metacontext clear and stable?
  information_quality: 0-1 // 0 = noise, 1 = genuine information
  novel_information_flow: boolean // Does it provide new information?

  // Visual properties
  color: string            // Warm to cool spectrum
  opacity: 0-1
  thickness: number
}
```

### FeedbackLoop Object

```javascript
class FeedbackLoop {
  id: number
  type: 'negative' | 'positive' | 'blocked'

  // Participants
  nodes_involved: [nodeId]     // Who's in this circuit
  mechanism: string            // How it works (e.g., 'face_to_face_accountability')

  // Properties
  strength: 0-1                // How powerful is the regulatory effect?
  delay: number                // Time lag between action and feedback
  threshold: number            // What level triggers the feedback?

  // Effects
  stabilizing: boolean         // Does it maintain homeostasis?
  can_function: boolean        // Is it currently operational?
  blocked_by: null | string    // What's preventing it from working?

  // For positive feedback loops (runaway)
  amplification_factor: 1.0    // How much does it amplify per cycle?
  escalation_rate: 0           // How fast is it running away?

  // Bateson: Schismogenesis differential equations
  schismogenesis_type: null | 'symmetrical' | 'complementary'
  coupling_constants: {
    k1: 0,                     // How much Y drives dX/dt
    k2: 0                      // How much X drives dY/dt (negative for complementary)
  }
  paired_nodes: {              // For schismogenesis pairs
    nodeA_id: null,            // First party
    nodeB_id: null             // Second party
  }

  // For blocked feedback loops (double binds)
  blocking_mechanism: null | string  // What prevents correction?
  escape_difficulty: 0-1       // How hard to exit?
}
```

### Content Object

```javascript
class Content {
  id: number
  type: 'neutral' | 'inflammatory' | 'ragebait' | 'tribal'
  origin_node: nodeId

  // Engagement properties
  engagement_score: 0-1    // How much it hijacks attention
  trust_cost: 0-1          // How much it erodes trust
  cognitive_load: number   // Processing burden

  // Bateson: Information value
  information_value: -1 to 1   // -1 = noise, 0 = redundancy, 1 = information
  novelty: 0-1                 // How new is this?
  challenges_understanding: boolean // Does it expand perspective?
  actionable: boolean          // Can recipient do something with it?
  truth_value: 0-1            // How accurate is it?

  // Propagation
  reach: number            // How many nodes have seen it
  spread_vector: 'embodied' | 'print' | 'broadcast' | 'internet' | 'algorithmic'
  transformation_rate: 0-1 // How much it changes in transmission

  // Effects
  emotional_intensity: 0-1
  tribal_marker: string    // Which "side" it represents
  schismogenesis_contribution: 0-1 // Does it escalate tribal conflict?

  // Metacontext
  frames_context_as: string    // How does it frame the interaction?
}
```

## Algorithm Phases

### Phase 1: Initialize Population

```javascript
function initializePopulation(config) {
  const nodes = []
  const population_size = config.population_size // e.g., 1000-5000

  for (let i = 0; i < population_size; i++) {
    const node = {
      id: i,
      cognitive_capacity: gaussianRandom(150, 20), // Mean 150, std dev 20
      cognitive_load: 0,

      // Technology access based on era
      is_literate: random() < config.literacy_rate,
      has_print_access: random() < config.print_access_rate,
      has_broadcast_access: random() < config.broadcast_access_rate,
      has_internet_access: random() < config.internet_access_rate,
      has_smartphone: random() < config.smartphone_rate,

      // Role determined by technology access
      role: determineRole(node),

      // Initialize empty
      embodied_connections: [],
      text_mediated_connections: [],
      broadcast_connections: [],
      internet_connections: [],
      algorithmic_connections: [],

      // Initial state
      trust_coherence: 1.0,
      emotional_state: 0,
      doom_scroll_addiction: 0,

      // Dunbar layers
      layer_1_5: [],
      layer_5: [],
      layer_15: [],
      layer_50: [],
      layer_150: [],
      layer_500: []
    }

    // Position in space (for visualization)
    node.position_3d = randomSpherePosition(radius = 30)
    node.position_2d = randomCirclePosition(radius = 25)

    nodes.push(node)
  }

  return nodes
}

function determineRole(node) {
  if (!node.has_internet_access && !node.has_broadcast_access) {
    return 'purely_oral'
  } else if (node.has_internet_access && random() < 0.1) {
    return 'creator'
  } else if (node.has_broadcast_access && random() < 0.001) {
    return 'broadcaster'
  } else if (node.has_internet_access && random() < 0.4) {
    return 'participant'
  } else {
    return 'consumer'
  }
}
```

### Phase 2: Build Embodied Networks

All nodes start with embodied connections, following Dunbar's layer structure.

```javascript
function buildEmbodiedNetworks(nodes) {
  for (const node of nodes) {
    // Each node needs to fill their Dunbar layers
    const remaining_capacity = node.cognitive_capacity
    let current_load = 0

    // Layer 1.5: Intimates (1-2 people, 20 units each)
    const num_intimates = random() < 0.7 ? 1 : 2
    for (let i = 0; i < num_intimates && current_load < remaining_capacity; i++) {
      const partner = findIntimatePartner(node, nodes)
      if (partner) {
        createEmbodiedConnection(node, partner, {
          layer: 1.5,
          strength: 0.9 + random() * 0.1, // Very high
          cognitive_cost: 20
        })
        current_load += 20
      }
    }

    // Layer 5: Close friends (5 people, 8 units each)
    const num_close = Math.min(5, Math.floor((remaining_capacity - current_load) / 8))
    for (let i = 0; i < num_close; i++) {
      const friend = findCloseConnection(node, nodes, {
        proximity: 'high',
        shared_connections: true,
        exclude: [...node.layer_1_5]
      })
      if (friend) {
        createEmbodiedConnection(node, friend, {
          layer: 5,
          strength: 0.7 + random() * 0.2,
          cognitive_cost: 8
        })
        current_load += 8
      }
    }

    // Layer 15: Good friends (15 people, 3 units each)
    const num_good = Math.min(15, Math.floor((remaining_capacity - current_load) / 3))
    for (let i = 0; i < num_good; i++) {
      const friend = findConnection(node, nodes, {
        proximity: 'medium',
        shared_connections: true,
        exclude: [...node.layer_1_5, ...node.layer_5]
      })
      if (friend) {
        createEmbodiedConnection(node, friend, {
          layer: 15,
          strength: 0.5 + random() * 0.2,
          cognitive_cost: 3
        })
        current_load += 3
      }
    }

    // Layer 50: Social friends (50 people, 1 unit each)
    const num_social = Math.min(50, Math.floor((remaining_capacity - current_load) / 1))
    for (let i = 0; i < num_social; i++) {
      const friend = findConnection(node, nodes, {
        proximity: 'medium',
        shared_connections: true,
        exclude: [...node.layer_1_5, ...node.layer_5, ...node.layer_15]
      })
      if (friend) {
        createEmbodiedConnection(node, friend, {
          layer: 50,
          strength: 0.3 + random() * 0.2,
          cognitive_cost: 1
        })
        current_load += 1
      }
    }

    // Layer 150: Acquaintances (up to 150, 0.5 units each)
    const num_acquaint = Math.min(150, Math.floor((remaining_capacity - current_load) / 0.5))
    for (let i = 0; i < num_acquaint; i++) {
      const acquaint = findConnection(node, nodes, {
        proximity: 'low',
        shared_connections: false,
        exclude: [/* previous layers */]
      })
      if (acquaint) {
        createEmbodiedConnection(node, acquaint, {
          layer: 150,
          strength: 0.1 + random() * 0.2,
          cognitive_cost: 0.5
        })
        current_load += 0.5
      }
    }

    node.cognitive_load = current_load
  }
}

function findConnection(node, nodes, criteria) {
  // Filter candidates based on criteria
  let candidates = nodes.filter(other =>
    other.id !== node.id &&
    !criteria.exclude.includes(other.id) &&
    !other.embodied_connections.some(e => e.target === node.id)
  )

  // Score by proximity and shared connections
  candidates = candidates.map(other => {
    let score = 0

    // Spatial proximity
    const distance = euclideanDistance(node.position_3d, other.position_3d)
    score += (50 - distance) / 50 * criteria.proximity_weight

    // Shared connections (triadic closure)
    if (criteria.shared_connections) {
      const shared = countSharedConnections(node, other)
      score += shared * 0.5
    }

    // Random chance
    score += random() * 0.3

    return { node: other, score }
  })

  // Sort by score and pick from top candidates
  candidates.sort((a, b) => b.score - a.score)
  const topN = Math.min(10, candidates.length)
  return candidates[Math.floor(random() * topN)]?.node
}

function createEmbodiedConnection(node1, node2, props) {
  const edge = {
    source: node1.id,
    target: node2.id,
    type: 'embodied',
    direction: 'bidirectional',
    strength: props.strength,
    trust_level: props.strength, // Initially trust matches intimacy
    dunbar_layer: props.layer,
    cognitive_cost: props.cognitive_cost,
    last_interaction: Date.now(),
    decay_rate: 0.01, // 1% strength loss per time unit without interaction

    // Visual
    color: getWarmColor(props.strength), // Orange to red
    opacity: 0.6 + props.strength * 0.3,
    thickness: props.strength * 2
  }

  node1.embodied_connections.push(edge)
  node1[`layer_${props.layer}`].push(node2.id)

  // Reciprocal connection
  const reciprocal = { ...edge, source: node2.id, target: node1.id }
  node2.embodied_connections.push(reciprocal)
  node2[`layer_${props.layer}`].push(node1.id)
}
```

### Phase 2.5: Initialize Feedback Loops

After embodied networks are built, create explicit feedback loop objects that represent the cybernetic circuits regulating the system.

```javascript
function initializeFeedbackLoops(nodes, config) {
  const feedback_loops = []

  // NEGATIVE FEEDBACK LOOPS (Stabilizing, oral culture)

  // 1. Face-to-face accountability loops
  // For each embodied connection, create a regulatory circuit
  for (const node of nodes) {
    for (const edge of node.embodied_connections) {
      if (edge.dunbar_layer <= 50) { // Close relationships have strong feedback
        const loop = {
          id: feedback_loops.length,
          type: 'negative',
          mechanism: 'face_to_face_accountability',
          nodes_involved: [node.id, edge.target],

          // Strong negative feedback in close relationships
          strength: edge.strength, // Stronger relationships = stronger regulation
          delay: 0, // Immediate in face-to-face
          threshold: 0.3, // Kicks in at moderate bad behavior

          stabilizing: true,
          can_function: true,
          blocked_by: null
        }
        feedback_loops.push(loop)
      }
    }
  }

  // 2. Community reputation loops (layer 50-150)
  // Gossip, social standing, reputation management
  for (const node of nodes) {
    const community = [
      ...node.layer_50,
      ...node.layer_150
    ]

    if (community.length > 10) {
      const loop = {
        id: feedback_loops.length,
        type: 'negative',
        mechanism: 'community_reputation',
        nodes_involved: [node.id, ...community.slice(0, 20)], // Sample of community

        strength: 0.6, // Moderate regulatory power
        delay: 24 * 60 * 60 * 1000, // 1 day (gossip spreads)
        threshold: 0.5, // Requires more serious transgression

        stabilizing: true,
        can_function: config.era === 'oral_culture' || config.era === 'early_print',
        blocked_by: config.era === 'algorithmic_era' ? 'geographic_dispersion' : null
      }
      feedback_loops.push(loop)
    }
  }

  // POSITIVE FEEDBACK LOOPS (Runaway, algorithmic era)

  if (config.era === 'social_media' || config.era === 'algorithmic_era') {
    // 3. Engagement optimization loop
    const creators = nodes.filter(n => n.role === 'creator' || n.role === 'participant')

    for (const creator of creators) {
      const loop = {
        id: feedback_loops.length,
        type: 'positive',
        mechanism: 'engagement_optimization',
        nodes_involved: [creator.id],

        strength: config.algorithm_engagement_weight || 0.7,
        delay: 60 * 1000, // 1 minute (nearly instant)
        threshold: 0.1, // Always active

        stabilizing: false,
        can_function: true,
        blocked_by: null,

        // Runaway properties
        amplification_factor: 1.3, // Each cycle amplifies by 30%
        escalation_rate: 0
      }
      feedback_loops.push(loop)
    }

    // 4. Symmetrical Schismogenesis loops (tribal conflict)
    // For each tribal pair, create coupled differential equations
    const tribal_groups = groupByTribalAffiliation(nodes)

    for (const [tribe1, tribe2] of pairs(Object.keys(tribal_groups))) {
      // Pick representative nodes from each tribe for the schismogenesis pair
      const tribe1_nodes = tribal_groups[tribe1]
      const tribe2_nodes = tribal_groups[tribe2]

      // Create pairwise schismogenesis loops
      for (let i = 0; i < Math.min(10, tribe1_nodes.length); i++) {
        for (let j = 0; j < Math.min(10, tribe2_nodes.length); j++) {
          const nodeA = tribe1_nodes[i]
          const nodeB = tribe2_nodes[j]

          // Calculate coupling constants based on algorithmic amplification
          // k = base_rate * algorithm_weight * inflammatory_ratio
          const k1 = 0.15 * (config.algorithm_engagement_weight || 0.7) * config.inflammatory_content_ratio
          const k2 = 0.15 * (config.algorithm_engagement_weight || 0.7) * config.inflammatory_content_ratio

          const loop = {
            id: feedback_loops.length,
            type: 'positive',
            mechanism: 'symmetrical_schismogenesis',
            nodes_involved: [nodeA.id, nodeB.id],

            strength: 0.8,
            delay: 60 * 60 * 1000, // 1 hour
            threshold: 0.2, // Low bar to trigger

            stabilizing: false,
            can_function: true,
            blocked_by: null,

            // Bateson's equations: dX/dt = k₁·Y, dY/dt = k₂·X
            schismogenesis_type: 'symmetrical',
            coupling_constants: { k1, k2 },
            paired_nodes: { nodeA_id: nodeA.id, nodeB_id: nodeB.id },

            amplification_factor: Math.sqrt(k1 * k2), // Growth rate = √(k₁·k₂)
            escalation_rate: 0
          }
          feedback_loops.push(loop)

          // Initialize nodes with their schismogenesis state
          nodeA.schismogenesis_state.participating_in = 'symmetrical'
          nodeA.schismogenesis_state.behavior_intensity = 0.3 // Initial X
          nodeA.schismogenesis_state.partner_node_ids.push(nodeB.id)
          nodeA.schismogenesis_state.coupling_constant_k = k1

          nodeB.schismogenesis_state.participating_in = 'symmetrical'
          nodeB.schismogenesis_state.behavior_intensity = 0.3 // Initial Y
          nodeB.schismogenesis_state.partner_node_ids.push(nodeA.id)
          nodeB.schismogenesis_state.coupling_constant_k = k2
        }
      }
    }

    // 5. Complementary Schismogenesis loops (influencer/follower)
    // For parasocial relationships, create dominance/submission dynamics
    const influencers = nodes.filter(n => n.role === 'creator' || n.role === 'broadcaster')

    for (const influencer of influencers) {
      // Get followers
      const followers = nodes.filter(n =>
        n.internet_connections.some(e => e.target === influencer.id) ||
        n.broadcast_connections.some(e => e.target === influencer.id)
      )

      // Sample subset for complementary schismogenesis
      const sample_followers = sampleRandom(followers, Math.min(20, followers.length))

      for (const follower of sample_followers) {
        // Coupling constants for complementary (dominance/submission)
        // k1: follower submission increases influencer prominence
        // k2: influencer dominance decreases follower autonomy (NOTE: applied with negative sign)
        const k1 = 0.10 * (config.algorithm_engagement_weight || 0.7)
        const k2 = 0.08 * (config.algorithm_engagement_weight || 0.7)

        const loop = {
          id: feedback_loops.length,
          type: 'positive',
          mechanism: 'complementary_schismogenesis',
          nodes_involved: [influencer.id, follower.id],

          strength: 0.6,
          delay: 24 * 60 * 60 * 1000, // 1 day (slower than symmetrical)
          threshold: 0.3,

          stabilizing: false,
          can_function: true,
          blocked_by: null,

          // Bateson's equations: dX/dt = k₁·Y, dY/dt = -k₂·X (note negative)
          schismogenesis_type: 'complementary',
          coupling_constants: { k1, k2 }, // k2 applied with negative sign in execution
          paired_nodes: { nodeA_id: influencer.id, nodeB_id: follower.id },

          amplification_factor: Math.sqrt(k1 * k2), // Can still grow
          escalation_rate: 0
        }
        feedback_loops.push(loop)

        // Initialize nodes
        influencer.schismogenesis_state.participating_in = 'complementary'
        influencer.schismogenesis_state.behavior_intensity = 0.5 // Moderate prominence
        influencer.schismogenesis_state.partner_node_ids.push(follower.id)
        influencer.schismogenesis_state.coupling_constant_k = k1

        follower.schismogenesis_state.participating_in = 'complementary'
        follower.schismogenesis_state.behavior_intensity = 0.8 // High autonomy initially
        follower.schismogenesis_state.partner_node_ids.push(influencer.id)
        follower.schismogenesis_state.coupling_constant_k = k2
      }
    }
  }

  // BLOCKED FEEDBACK LOOPS (Double binds with stress dynamics)

  if (config.era === 'social_media' || config.era === 'algorithmic_era') {
    // 6. Exit barrier loops (network effects trap)
    // Want to leave but can't → stress accumulates
    for (const node of nodes) {
      if (node.has_internet_access) {
        // Count how many friends are online-only
        const online_only_friends = node.embodied_connections.filter(e => {
          const friend = nodes[e.target]
          return friend.has_internet_access &&
                 node.internet_connections.some(ie => ie.target === friend.id)
        }).length

        const total_close_friends = node.layer_5.length

        // If more than half of close friends are online-only, exit is blocked
        if (online_only_friends / total_close_friends > 0.5) {
          const blocking_strength = online_only_friends / total_close_friends

          const loop = {
            id: feedback_loops.length,
            type: 'blocked',
            mechanism: 'network_effects_trap',
            nodes_involved: [node.id],

            strength: 0.9, // Very strong trap
            delay: 0,
            threshold: 0.5, // Activates when want to leave

            stabilizing: false, // Would be stabilizing if it could function
            can_function: false, // This is the key - it's blocked
            blocked_by: 'network_effects',

            blocking_mechanism: 'social_isolation_cost',
            escape_difficulty: blocking_strength
          }
          feedback_loops.push(loop)

          // Mark node as in double bind with stress dynamics parameters
          node.double_bind_exposure.is_in_double_bind = true
          node.double_bind_exposure.primary_injunction = 'need_close_relationships'
          node.double_bind_exposure.secondary_injunction = 'must_be_on_social_media'
          node.double_bind_exposure.tertiary_injunction = 'cannot_leave_without_losing_friends'

          // Initialize stress dynamics parameters
          node.double_bind_exposure.blocking_strength = blocking_strength // B in equations
          node.double_bind_exposure.escape_attempt_rate = 0 // E: will increase when stressed
          node.double_bind_exposure.stress_level = 0 // S: starts at zero
          node.double_bind_exposure.dS_dt = 0
          node.double_bind_exposure.dR_dt = 0
        }
      }
    }
  }

  return feedback_loops
}
```

### Phase 3: Add Print/Text-Mediated Connections

For nodes with literacy access, add connections mediated through text.

```javascript
function addPrintConnections(nodes, config) {
  // Identify creators (authors, publishers)
  const creators = nodes.filter(n =>
    n.is_literate &&
    n.role === 'creator' || n.role === 'broadcaster'
  )

  // Identify consumers (readers)
  const consumers = nodes.filter(n => n.is_literate)

  for (const creator of creators) {
    // Determine reach based on print type
    let max_reach
    if (config.era === 'early_print') {
      max_reach = 100 + random() * 500 // Books: 100-600
    } else if (config.era === 'mass_print') {
      const medium = weightedChoice({
        'book': 0.2,        // 500-2000
        'newspaper': 0.5,   // 5000-50000
        'magazine': 0.2,    // 1000-10000
        'pamphlet': 0.1     // 500-5000
      })
      max_reach = getReachForMedium(medium)
    }

    // Connect to readers within reach
    const readers = sampleRandom(consumers, max_reach)
    for (const reader of readers) {
      if (reader.id === creator.id) continue

      createTextConnection(creator, reader, {
        medium: config.print_medium,
        trust_level: config.institutional_trust, // 0.6-0.8
        cognitive_cost: 0.1 // Low cost for readers
      })
    }
  }
}

function createTextConnection(creator, reader, props) {
  const edge = {
    source: creator.id,
    target: reader.id,
    type: 'text',
    direction: 'unidirectional', // One-way from author to reader
    strength: 0.3, // Moderate connection feeling
    trust_level: props.trust_level,
    cognitive_cost: props.cognitive_cost,

    // Visual
    color: '#FFA500', // Orange (warm-cool gradient)
    opacity: 0.4,
    thickness: 0.5
  }

  creator.text_mediated_connections.push(edge)
  reader.text_mediated_connections.push(edge)
  reader.cognitive_load += props.cognitive_cost
}
```

### Phase 4: Add Broadcast Connections

Broadcast creates massive one-to-many connections.

```javascript
function addBroadcastConnections(nodes, config) {
  const broadcasters = nodes.filter(n => n.role === 'broadcaster')
  const audience = nodes.filter(n => n.has_broadcast_access)

  for (const broadcaster of broadcasters) {
    // Broadcasters reach huge audiences
    const reach = Math.floor(audience.length * (0.5 + random() * 0.5)) // 50-100% of audience
    const viewers = sampleRandom(audience, reach)

    for (const viewer of viewers) {
      if (viewer.id === broadcaster.id) continue

      createBroadcastConnection(broadcaster, viewer, {
        trust_level: 0.5, // Moderate institutional trust
        parasocial_strength: 0.3 + random() * 0.3,
        cognitive_cost: 0.2 // Hidden cost
      })
    }
  }
}

function createBroadcastConnection(broadcaster, viewer, props) {
  const edge = {
    source: broadcaster.id,
    target: viewer.id,
    type: 'broadcast',
    direction: 'unidirectional',
    strength: props.parasocial_strength,
    trust_level: props.trust_level,
    cognitive_cost: props.cognitive_cost,

    // Visual
    color: '#4A90E2', // Blue (cool)
    opacity: 0.3,
    thickness: 0.3
  }

  broadcaster.broadcast_connections.push(edge)
  viewer.broadcast_connections.push(edge)
  viewer.cognitive_load += props.cognitive_cost // Viewer doesn't notice this cost!
}
```

### Phase 5: Add Internet/Social Media Connections

Many-to-many connections, algorithmic feeds.

```javascript
function addInternetConnections(nodes, config) {
  const online_users = nodes.filter(n => n.has_internet_access)

  for (const user of online_users) {
    // Number of connections varies by role
    let num_follows
    if (user.role === 'consumer') {
      num_follows = 50 + random() * 150 // 50-200
    } else if (user.role === 'participant') {
      num_follows = 100 + random() * 300 // 100-400
    } else if (user.role === 'creator') {
      num_follows = 200 + random() * 500 // 200-700
    }

    // Pick random users to follow
    const following = sampleRandom(
      online_users.filter(n => n.id !== user.id),
      num_follows
    )

    for (const followed of following) {
      createInternetConnection(user, followed, {
        is_parasocial: followed.role === 'creator' || followed.role === 'broadcaster',
        trust_level: 0.3 + random() * 0.3,
        cognitive_cost: 0.15 // Small but adds up
      })
    }
  }
}

function createInternetConnection(follower, followed, props) {
  const edge = {
    source: follower.id,
    target: followed.id,
    type: 'internet',
    direction: 'unidirectional',
    strength: props.is_parasocial ? 0.4 : 0.2,
    trust_level: props.trust_level,
    cognitive_cost: props.cognitive_cost,

    // Visual
    color: '#87CEEB', // Light blue (cool)
    opacity: 0.2,
    thickness: 0.2
  }

  follower.internet_connections.push(edge)
  followed.internet_connections.push(edge)
  follower.cognitive_load += props.cognitive_cost
}
```

### Phase 6: Add Algorithmic Amplification

The algorithm injects connections and content based on engagement optimization.

```javascript
function addAlgorithmicConnections(nodes, config) {
  const online_users = nodes.filter(n => n.has_internet_access)

  for (const user of online_users) {
    // Algorithm shows content from non-followed sources
    const num_algorithmic = Math.floor(user.internet_connections.length * 0.5) // 50% more content

    // Algorithm selects for engagement (inflammatory content)
    const candidates = online_users.filter(n =>
      n.id !== user.id &&
      n.role === 'creator' &&
      !user.internet_connections.some(e => e.target === n.id)
    )

    // Weight by engagement potential (creators posting inflammatory content)
    const weighted_candidates = candidates.map(candidate => ({
      node: candidate,
      weight: candidate.inflammatory_score || 0.5
    }))

    const selected = weightedSample(weighted_candidates, num_algorithmic)

    for (const creator of selected) {
      createAlgorithmicConnection(user, creator, {
        trust_level: 0.1 + random() * 0.2, // Low trust
        cognitive_cost: 0.3, // High cost (attention hijack)
        engagement_weight: config.algorithm_engagement_weight
      })
    }
  }

  // Check for cognitive overload
  for (const user of online_users) {
    if (user.cognitive_load > user.cognitive_capacity) {
      user.cognitive_load_ratio = user.cognitive_load / user.cognitive_capacity

      // Overload effects
      degradeEmbodiedConnections(user, user.cognitive_load_ratio - 1)
      degradeTrustCoherence(user, user.cognitive_load_ratio - 1)
      increaseEmotionalState(user, config.inflammatory_content_ratio)
    }
  }
}

function createAlgorithmicConnection(user, creator, props) {
  const edge = {
    source: user.id,
    target: creator.id,
    type: 'algorithmic',
    direction: 'unidirectional',
    strength: 0.1,
    trust_level: props.trust_level,
    cognitive_cost: props.cognitive_cost,

    // Visual
    color: '#B0B0B0', // Gray (cold)
    opacity: 0.15,
    thickness: 0.15
  }

  user.algorithmic_connections.push(edge)
  user.cognitive_load += props.cognitive_cost
}

function degradeEmbodiedConnections(node, overload_amount) {
  // Neglected embodied connections fade
  for (const edge of node.embodied_connections) {
    edge.strength *= (1 - overload_amount * 0.1) // 10% fade per overload unit
    edge.opacity *= (1 - overload_amount * 0.1)
    edge.trust_level *= (1 - overload_amount * 0.05)

    // Update visual
    edge.color = fadeTowardCool(edge.color, overload_amount)
  }
}

function degradeTrustCoherence(node, overload_amount) {
  // Can't evaluate sources when overloaded
  node.trust_coherence *= (1 - overload_amount * 0.2)
  node.trust_coherence = Math.max(0, node.trust_coherence)
}

function increaseEmotionalState(node, inflammatory_ratio) {
  // Exposure to ragebait increases agitation
  node.emotional_state += inflammatory_ratio * 0.3
  node.emotional_state = Math.min(1, node.emotional_state)

  // Addiction forms
  node.doom_scroll_addiction += inflammatory_ratio * 0.1
  node.doom_scroll_addiction = Math.min(1, node.doom_scroll_addiction)
}
```

### Phase 7: Simulate Information Flow

Simulate how content spreads through different connection types.

```javascript
function simulateInformationFlow(nodes, content, steps = 100) {
  const infected = new Set([content.origin_node])
  const timeline = []

  for (let step = 0; step < steps; step++) {
    const newly_infected = new Set()

    for (const node_id of infected) {
      const node = nodes[node_id]

      // Spread through embodied connections (slow, transformative)
      if (content.spread_vector === 'embodied') {
        for (const edge of node.embodied_connections) {
          if (random() < edge.strength * 0.1) { // 10% base chance
            newly_infected.add(edge.target)

            // Content transforms in transmission
            content = transformContent(content, edge.trust_level)
          }
        }
      }

      // Spread through broadcast (fast, identical)
      if (content.spread_vector === 'broadcast') {
        for (const edge of node.broadcast_connections) {
          if (random() < 0.8) { // 80% reach
            newly_infected.add(edge.target)
            // No transformation
          }
        }
      }

      // Spread through internet (instant, algorithmic)
      if (content.spread_vector === 'internet' || content.spread_vector === 'algorithmic') {
        // Algorithm boosts high-engagement content
        const boost = content.engagement_score

        for (const edge of [...node.internet_connections, ...node.algorithmic_connections]) {
          if (random() < boost) {
            newly_infected.add(edge.target)

            // Affects emotional state
            const target = nodes[edge.target]
            target.emotional_state += content.emotional_intensity * 0.1
          }
        }
      }
    }

    // Add newly infected
    for (const node_id of newly_infected) {
      infected.add(node_id)
    }

    timeline.push({
      step,
      infected_count: infected.size,
      content_type: content.type
    })

    // Stop if everyone reached or spread stalls
    if (newly_infected.size === 0) break
  }

  return timeline
}

function transformContent(content, trust_level) {
  // Content changes in oral transmission
  // High trust = faithful transmission
  // Low trust = distortion

  const fidelity = trust_level

  if (random() > fidelity) {
    // Content gets distorted
    content.engagement_score += (random() - 0.5) * 0.2
    content.trust_cost += (random() - 0.5) * 0.1
  }

  return content
}
```

## Emergent Dynamics & Learning Updates

These functions are called periodically during time-stepped simulation to model Bateson's cybernetic concepts.

### Time-Stepped Simulation Loop

```javascript
function runSimulation(nodes, feedback_loops, config, steps = 1000) {
  const timeline = []

  for (let step = 0; step < steps; step++) {
    // Update learning levels
    updateLearning(nodes, step)

    // Execute feedback loops
    executeFeedbackLoops(nodes, feedback_loops, step)

    // Check homeostatic state
    checkHomeostasis(nodes)

    // Update schismogenesis
    updateSchismogenesis(nodes, feedback_loops, config)

    // Update double bind exposure
    updateDoubleBinds(nodes, step)

    // Update information quality
    updateInformationQuality(nodes)

    // Calculate and record metrics
    const metrics = calculateNetworkMetrics(nodes, feedback_loops)
    timeline.push({ step, metrics })

    // Check for system collapse
    if (metrics.percent_functional < 0.1) {
      console.log(`System collapse at step ${step}`)
      break
    }
  }

  return timeline
}
```

### Learning Level Progression

```javascript
function updateLearning(nodes, current_step) {
  for (const node of nodes) {
    // Only creators and participants learn about engagement
    if (node.role !== 'creator' && node.role !== 'participant') continue

    // LEARNING LEVEL 0 → 1: Context-specific learning
    if (node.learning_level === 0 && node.posts_created > 5) {
      // Track which posts got engagement
      node.learned_behaviors.engagement_patterns.push({
        type: 'initial_pattern',
        learned_at: current_step
      })
      node.learning_progress += 0.2

      if (node.learning_progress >= 1.0) {
        node.learning_level = 1
        node.learning_progress = 0
      }
    }

    // LEARNING LEVEL 1 → 2: Deutero-learning (character change)
    if (node.learning_level === 1 && node.posts_created > 50) {
      // Recognize META-pattern: "Inflammatory content ALWAYS works"
      const inflammatory_posts = node.learning_history.filter(h =>
        h.content_type === 'inflammatory' || h.content_type === 'ragebait'
      )

      if (inflammatory_posts.length > 20) {
        node.learned_behaviors.meta_patterns_recognized.push({
          pattern: 'inflammatory_content_wins',
          learned_at: current_step
        })

        // CHARACTER TRANSFORMATION
        node.inflammatory_score += 0.3
        node.learned_behaviors.character_changes.push({
          change: 'became_engagement_maximizer',
          at_step: current_step
        })

        node.learning_progress += 0.3

        if (node.learning_progress >= 1.0) {
          node.learning_level = 2
          node.learning_progress = 0

          // Level II is hard to unlearn
          node.learned_behaviors.content_strategy = 'maximize_engagement'
        }
      }
    }

    // LEARNING LEVEL 2 → 3: Awareness of the trap
    if (node.learning_level === 2) {
      // Conditions for breakthrough to Level III:
      // 1. Severe cognitive overload
      // 2. Low trust coherence
      // 3. Some algorithm awareness
      // 4. Double bind stress

      if (node.cognitive_load_ratio > 1.5 &&
          node.trust_coherence < 0.3 &&
          node.learned_behaviors.algorithm_awareness > 0.5 &&
          node.double_bind_exposure.stress_level > 0.7) {

        node.learning_progress += 0.1

        if (node.learning_progress >= 1.0) {
          node.learning_level = 3
          node.learning_progress = 0

          // Rare moment of clarity
          node.learned_behaviors.algorithm_awareness = 1.0
          node.learned_behaviors.meta_patterns_recognized.push({
            pattern: 'i_am_trapped_in_system',
            learned_at: current_step
          })

          // Either: Breakdown or breakthrough
          if (random() < 0.1) {
            // Breakthrough: Exits system (rare)
            node.wants_to_leave = true
            node.exits_system = true
          } else {
            // Breakdown: Pathological adaptation
            node.double_bind_exposure.pathological_adaptation = weightedChoice({
              'anxiety': 0.4,
              'learned_helplessness': 0.3,
              'dissociation': 0.2,
              'paralysis': 0.1
            })
          }
        }
      }
    }
  }
}
```

### Feedback Loop Execution

```javascript
function executeFeedbackLoops(nodes, feedback_loops, current_step) {
  for (const loop of feedback_loops) {
    if (!loop.can_function) continue

    // Check if enough time has passed since last activation
    if (loop.last_activation && (current_step - loop.last_activation) < loop.delay) {
      continue
    }

    if (loop.type === 'negative') {
      // NEGATIVE FEEDBACK: Stabilizing, corrective
      executeNegativeFeedback(loop, nodes)
    } else if (loop.type === 'positive') {
      // POSITIVE FEEDBACK: Amplifying, runaway
      executePositiveFeedback(loop, nodes, current_step)
    } else if (loop.type === 'blocked') {
      // BLOCKED FEEDBACK: Would stabilize but can't
      executeBlockedFeedback(loop, nodes)
    }

    loop.last_activation = current_step
  }
}

function executeNegativeFeedback(loop, nodes) {
  // Stabilizing feedback
  for (const node_id of loop.nodes_involved) {
    const node = nodes[node_id]

    if (loop.mechanism === 'face_to_face_accountability') {
      // Social correction
      if (node.inflammatory_score > loop.threshold) {
        // Reduce inflammatory behavior
        node.inflammatory_score *= (1 - loop.strength * 0.1)

        // Restore social bonds
        node.embodied_connections.forEach(edge => {
          if (edge.strength < 0.9) {
            edge.strength += loop.strength * 0.05
          }
        })
      }
    } else if (loop.mechanism === 'community_reputation') {
      // Reputation management
      if (node.posts_created > 0) {
        const reputation_score = 1 - node.inflammatory_score

        // Community feedback adjusts behavior
        node.inflammatory_score -= reputation_score * loop.strength * 0.05
        node.inflammatory_score = Math.max(0, node.inflammatory_score)
      }
    }
  }
}

function executePositiveFeedback(loop, nodes, current_step) {
  // Amplifying feedback (runaway)
  if (loop.mechanism === 'engagement_optimization') {
    const node_id = loop.nodes_involved[0]
    const node = nodes[node_id]

    // Each cycle amplifies inflammatory tendency
    node.inflammatory_score *= loop.amplification_factor
    node.inflammatory_score = Math.min(1, node.inflammatory_score)

    loop.escalation_rate += 0.1

  } else if (loop.mechanism === 'symmetrical_schismogenesis') {
    // BATESON'S SYMMETRICAL SCHISMOGENESIS: dX/dt = k₁·Y, dY/dt = k₂·X
    const nodeA_id = loop.paired_nodes.nodeA_id
    const nodeB_id = loop.paired_nodes.nodeB_id
    const nodeA = nodes[nodeA_id]
    const nodeB = nodes[nodeB_id]

    const k1 = loop.coupling_constants.k1
    const k2 = loop.coupling_constants.k2

    // Current behavior intensities
    const X = nodeA.schismogenesis_state.behavior_intensity
    const Y = nodeB.schismogenesis_state.behavior_intensity

    // Calculate rates of change (Euler method, Δt = 1)
    const dX_dt = k1 * Y
    const dY_dt = k2 * X

    // Update behavior intensities
    nodeA.schismogenesis_state.behavior_intensity = Math.min(1, X + dX_dt)
    nodeB.schismogenesis_state.behavior_intensity = Math.min(1, Y + dY_dt)

    // Store rates for metrics
    nodeA.schismogenesis_state.dX_dt = dX_dt
    nodeB.schismogenesis_state.dX_dt = dY_dt

    // Update legacy escalation_level field (for backwards compatibility)
    nodeA.schismogenesis_state.escalation_level = nodeA.schismogenesis_state.behavior_intensity
    nodeB.schismogenesis_state.escalation_level = nodeB.schismogenesis_state.behavior_intensity

    // Eventually can't communicate with other side
    if (nodeA.schismogenesis_state.behavior_intensity > 0.8) {
      nodeA.schismogenesis_state.can_communicate_with_other_side = false
    }
    if (nodeB.schismogenesis_state.behavior_intensity > 0.8) {
      nodeB.schismogenesis_state.can_communicate_with_other_side = false
    }

    // Track escalation rate (exponential growth rate)
    loop.escalation_rate = Math.sqrt(k1 * k2) // √(k₁·k₂)

  } else if (loop.mechanism === 'complementary_schismogenesis') {
    // BATESON'S COMPLEMENTARY SCHISMOGENESIS: dX/dt = k₁·Y, dY/dt = -k₂·X
    const influencer_id = loop.paired_nodes.nodeA_id
    const follower_id = loop.paired_nodes.nodeB_id
    const influencer = nodes[influencer_id]
    const follower = nodes[follower_id]

    const k1 = loop.coupling_constants.k1
    const k2 = loop.coupling_constants.k2

    // X = influencer prominence, Y = follower autonomy
    const X = influencer.schismogenesis_state.behavior_intensity
    const Y = follower.schismogenesis_state.behavior_intensity

    // Calculate rates of change (NOTE: k2 applied with NEGATIVE sign)
    const dX_dt = k1 * Y  // Follower submission increases influencer prominence
    const dY_dt = -k2 * X // Influencer dominance decreases follower autonomy

    // Update behavior intensities
    influencer.schismogenesis_state.behavior_intensity = Math.min(1, X + dX_dt)
    follower.schismogenesis_state.behavior_intensity = Math.max(0, Y + dY_dt) // Can't go below 0

    // Store rates
    influencer.schismogenesis_state.dX_dt = dX_dt
    follower.schismogenesis_state.dX_dt = dY_dt

    // Update legacy escalation_level
    influencer.schismogenesis_state.escalation_level = influencer.schismogenesis_state.behavior_intensity
    follower.schismogenesis_state.escalation_level = 1 - follower.schismogenesis_state.behavior_intensity // Inverted for followers

    // Follower becomes fully captured when autonomy < 0.2
    if (follower.schismogenesis_state.behavior_intensity < 0.2) {
      follower.schismogenesis_state.can_communicate_with_other_side = false // Captured
    }

    // Track rate
    loop.escalation_rate = Math.sqrt(k1 * k2)
  }
}

function executeBlockedFeedback(loop, nodes) {
  // Would stabilize but is blocked
  // NOTE: Actual stress dynamics are now handled in updateDoubleBinds()
  // This function just marks the desire to leave, which triggers stress accumulation
  const node_id = loop.nodes_involved[0]
  const node = nodes[node_id]

  if (loop.mechanism === 'network_effects_trap') {
    // Check if node wants to leave due to overload
    if (node.cognitive_load_ratio > 1.3) {
      node.wants_to_leave = true
      // Stress dynamics will be calculated in updateDoubleBinds() using differential equations
    }
  }
}
```

### Homeostatic Checking

```javascript
function checkHomeostasis(nodes) {
  for (const node of nodes) {
    // Check if within homeostatic range
    node.within_homeostatic_range = node.cognitive_load <= node.cognitive_capacity

    if (!node.within_homeostatic_range) {
      node.homeostasis_violation_amount = node.cognitive_load - node.cognitive_capacity

      // Regulatory capacity degrades with overload
      const overload_ratio = node.cognitive_load / node.cognitive_capacity
      node.regulatory_capacity = 1.0 / overload_ratio
      node.regulatory_capacity = Math.max(0, node.regulatory_capacity)

      // System coherence degrades
      node.system_coherence = 1.0 / (1 + (overload_ratio - 1))
      node.system_coherence = Math.max(0, node.system_coherence)

      // Functional collapse at extreme overload
      if (overload_ratio > 3.0) {
        node.functional = false
      }
    } else {
      node.homeostasis_violation_amount = 0
      node.regulatory_capacity = 1.0
      node.system_coherence = 1.0
    }
  }
}
```

### Schismogenesis Updates

```javascript
function updateSchismogenesis(nodes, feedback_loops, config) {
  if (config.era !== 'social_media' && config.era !== 'algorithmic_era') return

  // Identify tribal conflicts
  const tribes = {}
  for (const node of nodes) {
    if (node.schismogenesis_state.tribal_affiliation) {
      const tribe = node.schismogenesis_state.tribal_affiliation
      if (!tribes[tribe]) tribes[tribe] = []
      tribes[tribe].push(node)
    }
  }

  // For each tribal pair, escalate
  const tribe_names = Object.keys(tribes)
  for (let i = 0; i < tribe_names.length; i++) {
    for (let j = i + 1; j < tribe_names.length; j++) {
      const tribe1_nodes = tribes[tribe_names[i]]
      const tribe2_nodes = tribes[tribe_names[j]]

      // Symmetrical escalation
      for (const node of [...tribe1_nodes, ...tribe2_nodes]) {
        if (node.schismogenesis_state.participating_in !== 'symmetrical') {
          node.schismogenesis_state.participating_in = 'symmetrical'
          node.schismogenesis_state.escalation_level = 0.3
        }

        // Increase over time
        node.schismogenesis_state.escalation_level += 0.05 * config.inflammatory_content_ratio
        node.schismogenesis_state.escalation_level = Math.min(1, node.schismogenesis_state.escalation_level)
      }
    }
  }
}
```

### Double Bind Updates

```javascript
function updateDoubleBinds(nodes, current_step) {
  // Constants for stress dynamics
  const alpha = 0.1   // Stress accumulation constant
  const beta = 0.05   // Stress relief constant
  const gamma = 0.02  // Regulatory degradation constant

  for (const node of nodes) {
    if (node.double_bind_exposure.is_in_double_bind) {
      // Update exposure duration
      node.double_bind_exposure.exposure_duration = current_step

      // Get current state
      const S = node.double_bind_exposure.stress_level
      const R = node.regulatory_capacity
      const B = node.double_bind_exposure.blocking_strength
      const H = node.within_homeostatic_range ? 1 : 0

      // Escape attempt rate increases with cognitive overload and desire to leave
      let E = 0
      if (node.wants_to_leave || node.cognitive_load_ratio > 1.3) {
        E = 0.2 + (node.cognitive_load_ratio - 1) * 0.1
        E = Math.min(1, E)
        node.double_bind_exposure.escape_attempt_rate = E
      }

      // STRESS DYNAMICS: dS/dt = α·E·B - β·R
      const dS_dt = alpha * E * B - beta * R
      node.double_bind_exposure.dS_dt = dS_dt

      // Update stress level (Euler method)
      let S_new = S + dS_dt
      S_new = Math.max(0, Math.min(1, S_new)) // Clamp to [0, 1]
      node.double_bind_exposure.stress_level = S_new

      // REGULATORY DEGRADATION: dR/dt = -γ·S·(1-H)
      const dR_dt = -gamma * S_new * (1 - H)
      node.double_bind_exposure.dR_dt = dR_dt

      // Update regulatory capacity (combined with cognitive overload)
      let R_new = R + dR_dt
      R_new = Math.max(0, R_new)

      // Take minimum (worst case) of cognitive overload and double bind effects
      const R_from_overload = node.cognitive_load_ratio > 1 ?
        1.0 / node.cognitive_load_ratio : 1.0
      const R_from_double_bind = 1.0 - (0.5 * S_new)

      node.regulatory_capacity = Math.min(R_from_overload, R_from_double_bind, R_new)

      // Stress affects other systems
      node.emotional_regulation = 1.0 - (0.5 * S_new)  // Proportional to stress
      node.trust_coherence *= (1 - 0.1 * S_new)        // Degrades with stress

      // Track escape attempts (discrete events)
      if (E > 0.5 && Math.random() < 0.1) {
        node.double_bind_exposure.escape_attempts += 1
      }

      // PHASE TRANSITION to pathological adaptation (S > 0.9 threshold)
      if (S_new > 0.9 &&
          !node.double_bind_exposure.phase_transition_occurred &&
          !node.double_bind_exposure.pathological_adaptation) {

        // Irreversible phase transition
        node.double_bind_exposure.pathological_adaptation = weightedChoice({
          'anxiety': 0.4,           // Chronic hyperarousal
          'learned_helplessness': 0.3,  // Complete surrender
          'dissociation': 0.2,      // Emotional numbing
          'paralysis': 0.1          // Decision paralysis
        })
        node.double_bind_exposure.phase_transition_occurred = true

        // Mark as non-functional in severe cases
        if (node.double_bind_exposure.pathological_adaptation === 'paralysis' ||
            node.double_bind_exposure.pathological_adaptation === 'dissociation') {
          node.functional = false
        }
      }
    }
  }
}
```

### Information Quality Updates

```javascript
function updateInformationQuality(nodes) {
  for (const node of nodes) {
    // Calculate information vs noise ratio
    if (node.information_received.length > 0) {
      const info_values = node.information_received.map(c => c.information_value)
      const avg_info_value = mean(info_values)

      node.information_vs_noise_ratio = (avg_info_value + 1) / 2  // Normalize to 0-1

      // Calculate novelty rate
      const novel_content = node.information_received.filter(c => c.novelty > 0.5)
      node.novel_information_rate = novel_content.length / node.information_received.length

      // Calculate echo chamber score (redundancy)
      const redundant_content = node.information_received.filter(c => c.information_value === 0)
      node.echo_chamber_score = redundant_content.length / node.information_received.length
    }

    // Metacontext tracking
    if (node.has_internet_access) {
      // Online: metacontext is often "performance" not "conversation"
      node.actual_context = 'performance_for_metrics'

      if (node.perceived_context !== node.actual_context) {
        node.context_mismatch_stress += 0.05
        node.context_mismatch_stress = Math.min(1, node.context_mismatch_stress)
      }
    } else {
      // Oral: metacontext is clear
      node.actual_context = 'conversation'
      node.perceived_context = 'conversation'
      node.context_mismatch_stress = 0
    }
  }
}
```

### Calculate Information Value (Bateson)

```javascript
function calculateInformationValue(content, recipient_node) {
  // "A difference that makes a difference"

  let info_value = 0

  // Novelty: Does it tell something new?
  if (content.novelty > 0.5) {
    info_value += 0.3
  }

  // Challenges understanding: Does it expand perspective?
  if (content.challenges_understanding &&
      content.tribal_marker !== recipient_node.schismogenesis_state.tribal_affiliation) {
    info_value += 0.4
  } else if (!content.challenges_understanding) {
    // Echo chamber: redundancy, not information
    info_value -= 0.3
  }

  // Actionable: Can recipient do something with it?
  if (content.actionable) {
    info_value += 0.2
  }

  // Trust in source
  info_value *= content.trust_value

  // Ragebait is ANTI-information (noise)
  if (content.type === 'ragebait') {
    info_value = -0.5
  }

  // Normalize to -1 to 1 range
  info_value = Math.max(-1, Math.min(1, info_value))

  content.information_value = info_value
  return info_value
}
```

## Configuration Presets

**Strategy**: Hybrid approach optimized for **maximum accessibility** (three.js → Unity WebGL).

This configuration uses modest node counts with guaranteed minimums for rare roles, reach multipliers for technologies that extend beyond the graph, and edge rendering optimizations. The goal is to keep the simulation runnable in browsers while accurately modeling the dynamics.

```javascript
const ERA_CONFIGS = {
  oral_culture: {
    population_size: 1500,  // +500 to model multiple separate villages
    literacy_rate: 0,
    print_access_rate: 0,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.1, // Natural agonism

    // Guaranteed minimums (not needed for oral - everyone is a creator)
    min_creators: 0,

    // Rendering optimization
    edge_render_sample: 1.0,  // Render all edges (manageable count)

    // Reach multipliers (oral is 1:1, no amplification)
    reach_multiplier: 1
  },

  early_print: {
    population_size: 2000,  // +1000 to get enough literate people
    literacy_rate: 0.15,
    print_access_rate: 0.15,
    print_medium: 'book',
    institutional_trust: 0.8,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.15,

    // Guaranteed minimums for rare roles
    min_creators: 8,         // Ensure at least 8 print creators (authors, publishers)
    min_literate: 300,       // Ensure minimum literate population

    // Rendering optimization
    edge_render_sample: 0.8,  // Render 80% of edges

    // Reach multipliers (each simulated reader represents 5 actual readers)
    // A book with 300 simulated readers actually reached 1500 people
    reach_multiplier: 5
  },

  mass_print: {
    population_size: 2500,  // Increased for literacy diversity
    literacy_rate: 0.70,
    print_access_rate: 0.70,
    print_medium: 'mixed',   // newspapers, magazines, books
    institutional_trust: 0.7,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.25, // Pamphlets, yellow journalism

    // Guaranteed minimums
    min_creators: 20,        // More creators in mass print era

    // Rendering optimization
    edge_render_sample: 0.6,  // Render 60% of edges

    // Reach multipliers (newspapers reach beyond the graph)
    reach_multiplier: 10      // Each simulated reader = 10 actual readers
  },

  broadcast_era: {
    population_size: 4000,  // +1000 for better broadcast dynamics
    literacy_rate: 0.90,
    print_access_rate: 0.85,
    broadcast_access_rate: 0.85,
    internet_access_rate: 0,
    smartphone_rate: 0,
    institutional_trust: 0.65,
    inflammatory_content_ratio: 0.3,

    // Guaranteed minimums
    min_broadcasters: 12,    // CRITICAL: ensure we have actual broadcasters
    min_creators: 30,        // Print creators still exist

    // Rendering optimization
    edge_render_sample: 0.4,  // Render 40% of edges (many broadcast connections)

    // Reach multipliers (broadcasters reach millions beyond the graph)
    reach_multiplier: 50,     // Each simulated viewer = 50 actual viewers
    broadcast_reach_multiplier: 1000  // Each broadcaster connection = 1000 actual viewers
  },

  early_internet: {
    population_size: 4000,
    literacy_rate: 0.95,
    print_access_rate: 0.90,
    broadcast_access_rate: 0.90,
    internet_access_rate: 0.50,
    smartphone_rate: 0.10,
    institutional_trust: 0.5,
    inflammatory_content_ratio: 0.4,

    // Guaranteed minimums
    min_creators: 50,        // More online creators
    min_broadcasters: 10,

    // Rendering optimization
    edge_render_sample: 0.3,  // Render 30% of edges (many internet connections)

    // Reach multipliers
    reach_multiplier: 20,
    broadcast_reach_multiplier: 1000
  },

  social_media: {
    population_size: 6000,  // +1000 for better tribal dynamics
    literacy_rate: 0.98,
    print_access_rate: 0.80,
    broadcast_access_rate: 0.90,
    internet_access_rate: 0.85,
    smartphone_rate: 0.75,
    institutional_trust: 0.3,
    inflammatory_content_ratio: 0.6,
    algorithm_engagement_weight: 0.5,

    // Guaranteed minimums (less critical now, percentages work)
    min_creators: 100,

    // Rendering optimization
    edge_render_sample: 0.2,  // Render 20% of edges (massive connection count)
    edge_strength_threshold: 0.3,  // Only render edges with strength > 0.3

    // Schismogenesis sampling
    schismogenesis_sample_rate: 0.05,  // 5% of each tribe participates in differential equations

    // Reach multipliers
    reach_multiplier: 10,
    viral_multiplier: 100     // Viral content reaches 100x beyond the graph
  },

  algorithmic_era: {
    population_size: 8000,  // +3000 for city-scale feeling
    literacy_rate: 0.98,
    print_access_rate: 0.70,
    broadcast_access_rate: 0.85,
    internet_access_rate: 0.90,
    smartphone_rate: 0.88,
    institutional_trust: 0.2,
    inflammatory_content_ratio: 0.8, // Algorithm selects for it
    algorithm_engagement_weight: 0.9, // Maximum optimization

    // Guaranteed minimums
    min_creators: 200,        // Many creators in algorithmic era

    // Rendering optimization (CRITICAL for performance)
    edge_render_sample: 0.15, // Render only 15% of edges
    edge_strength_threshold: 0.4,  // Only render stronger edges
    use_lod: true,            // Use level-of-detail rendering
    lod_distance_near: 50,    // Full detail within 50 units
    lod_distance_far: 200,    // Point sprites beyond 200 units

    // Schismogenesis sampling
    schismogenesis_sample_rate: 0.03,  // 3% participate (still 240 nodes with 8k pop)

    // Reach multipliers
    reach_multiplier: 5,
    viral_multiplier: 500,    // Algorithmic amplification reaches 500x

    // Enable WebGL optimizations
    use_instanced_rendering: true,
    use_compute_shaders: false  // Not available in three.js, but ready for Unity
  }
}
```

### Helper Functions for Guaranteed Minimums

```javascript
// Ensure rare roles meet minimum counts
function ensureMinimumRoles(nodes, config) {
  // Count current roles
  const counts = {
    creators: nodes.filter(n => n.role === 'creator').length,
    broadcasters: nodes.filter(n => n.role === 'broadcaster').length,
    literate: nodes.filter(n => n.is_literate).length
  }

  // Promote nodes to meet minimums
  if (config.min_creators && counts.creators < config.min_creators) {
    const needed = config.min_creators - counts.creators
    const candidates = nodes.filter(n => n.is_literate && n.role !== 'creator')
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].role = 'creator'
    }
  }

  if (config.min_broadcasters && counts.broadcasters < config.min_broadcasters) {
    const needed = config.min_broadcasters - counts.broadcasters
    const candidates = nodes.filter(n => n.has_broadcast_access && n.role !== 'broadcaster')
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].role = 'broadcaster'
    }
  }

  if (config.min_literate && counts.literate < config.min_literate) {
    const needed = config.min_literate - counts.literate
    const candidates = nodes.filter(n => !n.is_literate)
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].is_literate = true
      candidates[i].has_print_access = true
    }
  }
}

// Apply reach multipliers when counting impact
function calculateActualReach(simulated_reach, config, content_type = 'normal') {
  let multiplier = config.reach_multiplier || 1

  // Apply special multipliers for broadcast and viral content
  if (content_type === 'broadcast' && config.broadcast_reach_multiplier) {
    multiplier = config.broadcast_reach_multiplier
  } else if (content_type === 'viral' && config.viral_multiplier) {
    multiplier = config.viral_multiplier
  }

  return simulated_reach * multiplier
}

// Determine which edges to render based on config
function shouldRenderEdge(edge, camera_distance, config) {
  // Check render sample rate
  if (Math.random() > config.edge_render_sample) {
    return false
  }

  // Check strength threshold
  if (config.edge_strength_threshold && edge.strength < config.edge_strength_threshold) {
    return false
  }

  // Check LOD
  if (config.use_lod) {
    if (camera_distance > config.lod_distance_far) {
      return false  // Too far, don't render
    }
  }

  return true
}

// Get appropriate edge representation for distance
function getEdgeRepresentation(edge, camera_distance, config) {
  if (!config.use_lod) {
    return 'full'  // Full edge geometry
  }

  if (camera_distance < config.lod_distance_near) {
    return 'full'   // Full edge with lighting, anti-aliasing
  } else if (camera_distance < config.lod_distance_far) {
    return 'simple' // Simple line, no lighting
  } else {
    return 'point'  // Just two points
  }
}
```

### Performance Notes

**For three.js implementation**:
- **Oral/Early Print** (1500-2000 nodes): Should run at 60 FPS on most hardware
- **Mass Print/Broadcast** (2500-4000 nodes): 30-60 FPS with optimizations
- **Social Media** (6000 nodes): 20-30 FPS, requires edge sampling
- **Algorithmic** (8000 nodes): 15-30 FPS, requires aggressive optimizations

**If migrating to Unity WebGL**:
- All eras should run at 60 FPS
- Can increase population 2-3x
- Can render more edges (50-80% instead of 15-20%)
- Can add post-processing effects (bloom, DOF)

## Metrics to Track

```javascript
function calculateNetworkMetrics(nodes, feedback_loops) {
  return {
    // ===== COGNITIVE HEALTH =====
    avg_cognitive_load: mean(nodes.map(n => n.cognitive_load)),
    percent_overloaded: nodes.filter(n => n.cognitive_load > n.cognitive_capacity).length / nodes.length,
    max_overload_ratio: max(nodes.map(n => n.cognitive_load / n.cognitive_capacity)),

    // Homeostatic state
    percent_within_homeostatic_range: nodes.filter(n => n.within_homeostatic_range).length / nodes.length,
    avg_homeostasis_violation: mean(nodes.map(n => n.homeostasis_violation_amount)),
    avg_regulatory_capacity: mean(nodes.map(n => n.regulatory_capacity)),
    avg_system_coherence: mean(nodes.map(n => n.system_coherence)),
    percent_functional: nodes.filter(n => n.functional).length / nodes.length,

    // ===== TRUST =====
    avg_trust_coherence: mean(nodes.map(n => n.trust_coherence)),
    trust_network_fragmentation: calculateFragmentation(nodes),
    min_trust_coherence: min(nodes.map(n => n.trust_coherence)),

    // ===== CONNECTIONS =====
    avg_embodied_connections: mean(nodes.map(n => n.embodied_connections.length)),
    avg_parasocial_connections: mean(nodes.map(n =>
      n.broadcast_connections.length +
      n.internet_connections.length +
      n.algorithmic_connections.length
    )),
    embodied_strength_avg: mean(nodes.flatMap(n => n.embodied_connections.map(e => e.strength))),
    parasocial_to_embodied_ratio: mean(nodes.map(n => {
      const parasocial = n.broadcast_connections.length + n.internet_connections.length + n.algorithmic_connections.length
      const embodied = n.embodied_connections.length
      return embodied > 0 ? parasocial / embodied : 0
    })),

    // ===== EMOTIONAL STATE =====
    avg_emotional_agitation: mean(nodes.map(n => n.emotional_state)),
    avg_emotional_regulation: mean(nodes.map(n => n.emotional_regulation)),
    doom_scroll_prevalence: nodes.filter(n => n.doom_scroll_addiction > 0.5).length / nodes.length,
    avg_doom_scroll_addiction: mean(nodes.map(n => n.doom_scroll_addiction)),

    // ===== BATESON: FEEDBACK LOOP HEALTH =====
    total_feedback_loops: feedback_loops.length,

    // By type
    num_negative_loops: feedback_loops.filter(l => l.type === 'negative').length,
    num_positive_loops: feedback_loops.filter(l => l.type === 'positive').length,
    num_blocked_loops: feedback_loops.filter(l => l.type === 'blocked').length,

    // Functional state
    num_functional_loops: feedback_loops.filter(l => l.can_function).length,
    num_dysfunctional_loops: feedback_loops.filter(l => !l.can_function).length,
    percent_loops_functional: feedback_loops.filter(l => l.can_function).length / feedback_loops.length,

    // Stabilizing vs destabilizing
    num_stabilizing_loops: feedback_loops.filter(l => l.stabilizing && l.can_function).length,
    num_destabilizing_loops: feedback_loops.filter(l => !l.stabilizing && l.can_function).length,

    // Average strength by type
    avg_negative_loop_strength: mean(feedback_loops.filter(l => l.type === 'negative').map(l => l.strength)),
    avg_positive_loop_strength: mean(feedback_loops.filter(l => l.type === 'positive').map(l => l.strength)),

    // Escalation tracking
    avg_escalation_rate: mean(feedback_loops.filter(l => l.type === 'positive').map(l => l.escalation_rate)),
    max_escalation_rate: max(feedback_loops.filter(l => l.type === 'positive').map(l => l.escalation_rate)),

    // ===== BATESON: LEARNING LEVELS =====
    // Distribution across population
    num_learning_level_0: nodes.filter(n => n.learning_level === 0).length,
    num_learning_level_1: nodes.filter(n => n.learning_level === 1).length,
    num_learning_level_2: nodes.filter(n => n.learning_level === 2).length,
    num_learning_level_3: nodes.filter(n => n.learning_level === 3).length,

    percent_learning_level_0: nodes.filter(n => n.learning_level === 0).length / nodes.length,
    percent_learning_level_1: nodes.filter(n => n.learning_level === 1).length / nodes.length,
    percent_learning_level_2: nodes.filter(n => n.learning_level === 2).length / nodes.length,
    percent_learning_level_3: nodes.filter(n => n.learning_level === 3).length / nodes.length,

    // Character transformation tracking
    num_character_transformed: nodes.filter(n =>
      n.learned_behaviors.character_changes && n.learned_behaviors.character_changes.length > 0
    ).length,
    percent_character_transformed: nodes.filter(n =>
      n.learned_behaviors.character_changes && n.learned_behaviors.character_changes.length > 0
    ).length / nodes.length,

    // Algorithm awareness
    avg_algorithm_awareness: mean(nodes.map(n => n.learned_behaviors.algorithm_awareness)),
    percent_algorithm_aware: nodes.filter(n => n.learned_behaviors.algorithm_awareness > 0.5).length / nodes.length,

    // ===== BATESON: DOUBLE BINDS =====
    num_in_double_bind: nodes.filter(n => n.double_bind_exposure.is_in_double_bind).length,
    percent_in_double_bind: nodes.filter(n => n.double_bind_exposure.is_in_double_bind).length / nodes.length,

    avg_double_bind_stress: mean(nodes
      .filter(n => n.double_bind_exposure.is_in_double_bind)
      .map(n => n.double_bind_exposure.stress_level)
    ),
    max_double_bind_stress: max(nodes.map(n => n.double_bind_exposure.stress_level)),

    avg_escape_attempts: mean(nodes
      .filter(n => n.double_bind_exposure.is_in_double_bind)
      .map(n => n.double_bind_exposure.escape_attempts)
    ),

    num_pathological_adaptations: nodes.filter(n =>
      n.double_bind_exposure.pathological_adaptation !== null
    ).length,
    percent_pathological: nodes.filter(n =>
      n.double_bind_exposure.pathological_adaptation !== null
    ).length / nodes.length,

    // Breakdown of adaptation types
    pathological_types: {
      anxiety: nodes.filter(n => n.double_bind_exposure.pathological_adaptation === 'anxiety').length,
      learned_helplessness: nodes.filter(n => n.double_bind_exposure.pathological_adaptation === 'learned_helplessness').length,
      dissociation: nodes.filter(n => n.double_bind_exposure.pathological_adaptation === 'dissociation').length,
      paralysis: nodes.filter(n => n.double_bind_exposure.pathological_adaptation === 'paralysis').length
    },

    num_wants_to_leave: nodes.filter(n => n.wants_to_leave).length,
    percent_wants_to_leave: nodes.filter(n => n.wants_to_leave).length / nodes.length,

    // ===== BATESON: SCHISMOGENESIS =====
    num_participating_schismogenesis: nodes.filter(n =>
      n.schismogenesis_state.participating_in !== null
    ).length,
    percent_participating_schismogenesis: nodes.filter(n =>
      n.schismogenesis_state.participating_in !== null
    ).length / nodes.length,

    num_symmetrical_schismogenesis: nodes.filter(n =>
      n.schismogenesis_state.participating_in === 'symmetrical'
    ).length,
    num_complementary_schismogenesis: nodes.filter(n =>
      n.schismogenesis_state.participating_in === 'complementary'
    ).length,

    avg_escalation_level: mean(nodes
      .filter(n => n.schismogenesis_state.participating_in !== null)
      .map(n => n.schismogenesis_state.escalation_level)
    ),
    max_escalation_level: max(nodes.map(n => n.schismogenesis_state.escalation_level)),

    num_tribes: countUnique(nodes.map(n => n.schismogenesis_state.tribal_affiliation).filter(t => t !== null)),

    num_cannot_communicate_across_divide: nodes.filter(n =>
      !n.schismogenesis_state.can_communicate_with_other_side
    ).length,
    percent_communication_breakdown: nodes.filter(n =>
      !n.schismogenesis_state.can_communicate_with_other_side
    ).length / nodes.length,

    // ===== BATESON: INFORMATION VS NOISE =====
    avg_information_vs_noise_ratio: mean(nodes.map(n => n.information_vs_noise_ratio)),
    min_information_ratio: min(nodes.map(n => n.information_vs_noise_ratio)),

    avg_novel_information_rate: mean(nodes.map(n => n.novel_information_rate)),
    avg_echo_chamber_score: mean(nodes.map(n => n.echo_chamber_score)),

    percent_high_noise: nodes.filter(n => n.information_vs_noise_ratio < 0.3).length / nodes.length,
    percent_echo_chamber: nodes.filter(n => n.echo_chamber_score > 0.7).length / nodes.length,

    avg_content_information_value: mean(
      nodes.flatMap(n => n.information_received).map(c => c.information_value)
    ),

    // ===== METACONTEXT =====
    percent_context_mismatch: nodes.filter(n =>
      n.perceived_context !== n.actual_context
    ).length / nodes.length,

    avg_context_mismatch_stress: mean(nodes.map(n => n.context_mismatch_stress)),

    num_perceive_conversation_but_actually_performance: nodes.filter(n =>
      n.perceived_context === 'conversation' && n.actual_context === 'performance_for_metrics'
    ).length,

    // ===== INFLAMMATORY CONTENT =====
    inflammatory_exposure: calculateInflammatoryExposure(nodes),
    avg_inflammatory_score: mean(nodes.filter(n => n.role === 'creator' || n.role === 'participant').map(n => n.inflammatory_score)),
    percent_high_inflammatory: nodes.filter(n => n.inflammatory_score > 0.7).length / nodes.length,

    // ===== SYSTEM HEALTH AGGREGATE =====
    // Composite score combining multiple factors
    system_health_score: calculateSystemHealthScore({
      regulatory_capacity: mean(nodes.map(n => n.regulatory_capacity)),
      trust_coherence: mean(nodes.map(n => n.trust_coherence)),
      percent_functional: nodes.filter(n => n.functional).length / nodes.length,
      percent_loops_functional: feedback_loops.filter(l => l.can_function).length / feedback_loops.length,
      information_ratio: mean(nodes.map(n => n.information_vs_noise_ratio)),
      percent_in_double_bind: nodes.filter(n => n.double_bind_exposure.is_in_double_bind).length / nodes.length
    })
  }
}

// Helper: Calculate overall system health (0-1, 1 = healthy)
function calculateSystemHealthScore(factors) {
  return (
    factors.regulatory_capacity * 0.25 +
    factors.trust_coherence * 0.20 +
    factors.percent_functional * 0.20 +
    factors.percent_loops_functional * 0.15 +
    factors.information_ratio * 0.10 +
    (1 - factors.percent_in_double_bind) * 0.10
  )
}
```

## Next Steps

1. Implement in JavaScript/three.js
2. Create control panel for adjusting parameters
3. Visualize network evolution
4. Add information flow animation
5. Validate against historical data
6. Build comparative view (multiple eras side-by-side)

## Related Documents

- [[Model/Overview]]
- [[Model/Visualization Design]] (to be created)
- [[Model/Validation]] (to be created)

---
*Created: 2025-11-07*
*Status: #draft*
