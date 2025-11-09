/**
 * FeedbackLoop.js
 *
 * THEORETICAL FOUNDATION: CYBERNETIC FEEDBACK AS THE HEART OF COMMUNICATION
 *
 * This module implements Gregory Bateson's cybernetic theory of communication
 * and Norbert Wiener's feedback loop mathematics. It is the ENGINE of dynamics
 * in the network model.
 *
 * KEY CONCEPTS:
 *
 * 1. FEEDBACK AS CIRCULAR CAUSALITY (Bateson, "Steps to an Ecology of Mind")
 *    - Linear causality: A → B → C (one-way)
 *    - Circular causality: A → B → A (recursive, self-modifying)
 *    - Communication is ALWAYS circular - we respond to responses
 *    - This is what makes communication different from mere transmission
 *
 * 2. POSITIVE vs NEGATIVE FEEDBACK (Wiener, "Cybernetics", 1948)
 *    - NEGATIVE feedback: Dampens deviation, maintains equilibrium (thermostat)
 *      * Enables homeostasis
 *      * Stabilizes systems
 *      * Example: Shame regulates social excess in oral culture
 *    - POSITIVE feedback: Amplifies deviation, creates runaway dynamics (microphone screech)
 *      * Enables change and evolution
 *      * Can become pathological if unchecked
 *      * Example: Social media outrage spirals
 *
 * 3. BATESON'S SCHISMOGENESIS (Implemented as positive feedback)
 *    - Symmetrical: dX/dt = k₁·Y, dY/dt = k₂·X (both escalate together)
 *    - Complementary: dX/dt = k₁·Y, dY/dt = -k₂·X (one rises, other falls)
 *
 * 4. DOUBLE BIND (Bateson et al., 1956)
 *    - Contradictory injunctions at different logical levels
 *    - Cannot escape without violating one injunction
 *    - Creates pathological stress dynamics
 *    - Digital double bind: "Must engage" vs "Engagement harms you"
 *
 * WHY THIS MATTERS FOR THE ORALITY PROJECT:
 *
 * The transition from oral to literate to digital changes the BALANCE between
 * positive and negative feedback:
 *
 * - Oral culture: Negative feedback dominates (face-to-face regulation)
 * - Print culture: Reduced feedback (one-way transmission)
 * - Broadcast: Almost no feedback (parasocial)
 * - Internet: Feedback returns but is mediated
 * - Algorithmic: Positive feedback dominates (engagement optimization)
 *
 * The algorithmic era deliberately AMPLIFIES positive feedback (controversy drives
 * engagement) while REMOVING negative feedback (no embodied consequences). This
 * creates runaway dynamics that overwhelm human regulatory capacity.
 *
 * This is the core mechanism of the "Cybernetic Homeostasis" node in the
 * Orality project - showing how different media create different feedback
 * ecologies, with profound psychological consequences.
 */

export class FeedbackLoop {
  constructor(source_node, target_node, type, config = {}) {
    this.source = source_node;
    this.target = target_node;
    this.type = type; // 'positive' or 'negative'

    // Strength of the feedback loop (0 to 1)
    this.strength = config.strength || 0.5;

    // Medium through which feedback operates
    this.medium = config.medium || 'embodied'; // 'embodied', 'print', 'broadcast', 'internet', 'algorithmic'

    // Coupling constants for Bateson's equations
    this.k1 = config.k1 || 0.1; // How much target drives source rate of change
    this.k2 = config.k2 || 0.1; // How much source drives target rate of change

    // Schismogenesis type (if this is a positive feedback loop)
    this.schismogenesis_type = config.schismogenesis_type || null; // 'symmetrical' or 'complementary'

    // Delay (in simulation steps) before feedback takes effect
    this.delay = config.delay || 0;

    // History of feedback signals
    this.signal_history = [];

    // Active state
    this.active = true;
  }

  /**
   * Execute the feedback loop
   *
   * Runs appropriate feedback dynamics based on loop type and era.
   * In algorithmic era, also checks for performance fatigue double bind.
   */
  execute() {
    if (!this.active) return;

    if (this.type === 'positive') {
      this.executePositiveFeedback();
    } else if (this.type === 'negative') {
      this.executeNegativeFeedback();
    }

    // Always check for performance fatigue double bind in algorithmic era
    // This runs independently of positive/negative feedback classification
    // because it's a UNIQUE trap of platform capitalism
    this.executePerformanceFatigueDoubleBind();
  }

  /**
   * Execute positive feedback (amplifying, potentially runaway)
   * Implements Bateson's schismogenesis equations
   */
  executePositiveFeedback() {
    if (this.schismogenesis_type === 'symmetrical') {
      // Both parties escalate in the same direction
      // Example: Arms race, social media outrage spiral
      this.executeSymmetricalSchismogenesis();
    } else if (this.schismogenesis_type === 'complementary') {
      // Differentiation: one dominates, other submits
      // Example: Parasocial relationship, algorithmic dependency
      this.executeComplementarySchismogenesis();
    } else {
      // Generic positive feedback (simple amplification)
      this.executeGenericAmplification();
    }
  }

  /**
   * Symmetrical schismogenesis: dX/dt = k₁·Y, dY/dt = k₂·X
   * Both parties escalate together (e.g., flame war)
   *
   * THEORETICAL DEEP DIVE: BATESON'S SYMMETRICAL SCHISMOGENESIS
   *
   * In "Naven" (1936), Bateson observed how Iatmul men engaged in competitive
   * display that fed upon itself - each man's boasting provoked more boasting
   * from rivals, in an escalating spiral. He formalized this as:
   *
   * dX/dt = k₁·Y  (Party A's escalation driven by Party B's level)
   * dY/dt = k₂·X  (Party B's escalation driven by Party A's level)
   *
   * KEY INSIGHTS:
   *
   * 1. MUTUAL AMPLIFICATION
   *    - The more you escalate, the more I escalate
   *    - The more I escalate, the more you escalate
   *    - This is POSITIVE FEEDBACK - self-reinforcing
   *
   * 2. EXPONENTIAL GROWTH
   *    - If k₁·k₂ > 0, the system grows exponentially
   *    - Solution: X(t) ~ e^(√(k₁k₂)·t)
   *    - Without dampening, escalation becomes infinite
   *
   * 3. CRITICAL INITIAL CONDITIONS
   *    - Must seed with non-zero values (0.05) to kick off dynamics
   *    - Real-world parallel: A small provocation sparks a flame war
   *    - Bateson called this the "schismogenetic potential" of a situation
   *
   * 4. DIGITAL AMPLIFICATION
   *    - In oral culture: Face-to-face shame provides natural dampening
   *    - In algorithmic culture: Engagement metrics REWARD escalation
   *    - The algorithm effectively increases k₁ and k₂, accelerating spirals
   *
   * EXAMPLES:
   * - Political polarization: Each side's extremism justifies the other's
   * - Arms races: Each nation's buildup provokes the other's
   * - Twitter flame wars: Each reply escalates the conflict
   * - Conspiracy theories: Each "revelation" provokes more speculation
   *
   * This connects to "Agonistic Dynamics" in the Orality project - showing
   * how natural human contest becomes pathological when removed from embodied
   * regulatory feedback.
   */
  executeSymmetricalSchismogenesis() {
    // Set up schismogenesis state if not already initialized
    if (!this.source.schismogenesis_state.type) {
      this.source.schismogenesis_state.type = 'symmetrical';
      this.source.schismogenesis_state.k1 = this.k1;
      this.source.schismogenesis_state.k2 = this.k2;
      // CRITICAL: Initialize with small random value to kick off dynamics
      // Otherwise dX/dt = k1*0 = 0 forever
      // This models the "spark" that ignites polarization
      this.source.schismogenesis_state.X = Math.random() * 0.05; // 0 to 0.05
    }

    if (!this.target.schismogenesis_state.type) {
      this.target.schismogenesis_state.type = 'symmetrical';
      this.target.schismogenesis_state.k1 = this.k1;
      this.target.schismogenesis_state.k2 = this.k2;
      // CRITICAL: Initialize with small random value
      this.target.schismogenesis_state.X = Math.random() * 0.05;
    }

    // Link the escalation levels (source.X influences target.Y and vice versa)
    // This creates the CIRCULAR CAUSALITY that drives escalation
    this.target.schismogenesis_state.Y = this.source.schismogenesis_state.X;
    this.source.schismogenesis_state.Y = this.target.schismogenesis_state.X;

    // Update escalation (will be computed in node.updateSchismogenesis())
    // This feedback loop just ensures the coupling
  }

  /**
   * Complementary schismogenesis: dX/dt = k₁·Y, dY/dt = -k₂·X
   * Differentiation: source dominates, target submits (or vice versa)
   */
  executeComplementarySchismogenesis() {
    // Set up schismogenesis state
    if (!this.source.schismogenesis_state.type) {
      this.source.schismogenesis_state.type = 'complementary';
      this.source.schismogenesis_state.k1 = this.k1;
      this.source.schismogenesis_state.k2 = this.k2;
    }

    if (!this.target.schismogenesis_state.type) {
      this.target.schismogenesis_state.type = 'complementary';
      this.target.schismogenesis_state.k1 = this.k1;
      this.target.schismogenesis_state.k2 = this.k2;
    }

    // Link escalation levels (complementary: negative coupling)
    this.target.schismogenesis_state.Y = this.source.schismogenesis_state.X;
    this.source.schismogenesis_state.Y = this.target.schismogenesis_state.X;

    // The negative coupling is handled in the differential equation itself
  }

  /**
   * Generic amplification (no specific schismogenesis model)
   */
  executeGenericAmplification() {
    // Amplify emotional state
    const amplification = this.strength * 0.05;
    this.target.emotional_state += this.source.emotional_state * amplification;
    this.target.emotional_state = Math.min(1, this.target.emotional_state);

    // Amplify cognitive load
    this.target.cognitive_load += this.source.cognitive_load * amplification * 0.1;
  }

  /**
   * Execute negative feedback (stabilizing, homeostatic)
   *
   * THEORETICAL FOUNDATION: NEGATIVE FEEDBACK AS LIFE-SUSTAINING REGULATION
   *
   * While positive feedback gets attention (it's dramatic!), negative feedback
   * is the unsung hero of biological and social systems. This implements
   * principles from:
   *
   * 1. W. Ross Ashby's "Design for a Brain" (1952)
   *    - Living systems maintain viability through negative feedback
   *    - Deviations from equilibrium trigger corrective responses
   *    - This is HOMEOSTASIS - the fundamental cybernetic process
   *
   * 2. Bateson's "Cybernetic Explanation" (Steps to an Ecology of Mind)
   *    - Negative feedback is what allows systems to have "purpose"
   *    - The system seeks a target state (homeostatic setpoint)
   *    - Error correction minimizes distance from target
   *
   * 3. Connection to Oral Culture
   *    - Face-to-face communication provides immediate negative feedback
   *    - You see someone's face when you offend them → you moderate
   *    - Community shame regulates deviant behavior → social homeostasis
   *    - This is the "Homeostasis" node in the Orality project
   *
   * WHAT THIS CODE DOES:
   *
   * 1. EMOTIONAL REGULATION
   *    - If emotional_state > setpoint: Pull it down
   *    - If emotional_state < setpoint: Pull it up
   *    - Proportional correction (deviation × strength)
   *    - This is a PID controller's "P" term
   *
   * 2. COGNITIVE LOAD REDUCTION
   *    - Gradually decrease information overload
   *    - Models: Sleep, rest, processing time
   *    - Without this, cognitive load would only increase
   *
   * 3. REGULATORY CAPACITY SUPPORT
   *    - Strengthen ability to self-regulate over time
   *    - Models: Learning coping skills, building resilience
   *    - This is Bateson's "deutero-learning" - learning to regulate
   *
   * 4. PERFORMANCE FATIGUE REDUCTION (Algorithmic era)
   *    - If node is NOT performing aura, fatigue slowly recovers
   *    - Models: Taking breaks, stepping back from content creation
   *    - But recovery is SLOW compared to accumulation rate
   *
   * WHY ALGORITHMIC ERA BREAKS THIS:
   * - Infinite scroll removes natural stopping points
   * - Engagement optimization fights against disengagement
   * - No embodied feedback to signal overload
   * - Result: Homeostatic mechanisms are overwhelmed
   *
   * This negative feedback represents what's MISSING in algorithmic communication.
   */
  executeNegativeFeedback() {
    // Negative feedback dampens deviation from equilibrium
    // Helps maintain homeostasis (Ashby's "Design for a Brain")

    // Pull emotional state toward homeostatic setpoint
    // This is classic error-correction: correction ∝ (current - target)
    const deviation = this.target.emotional_state - this.target.homeostatic_setpoint;
    const correction = deviation * this.strength * 0.1;
    this.target.emotional_state -= correction;
    this.target.emotional_state = Math.max(0, Math.min(1, this.target.emotional_state));

    // Reduce cognitive load (models rest, sleep, processing)
    this.target.cognitive_load -= this.target.cognitive_load * this.strength * 0.05;
    this.target.cognitive_load = Math.max(0, this.target.cognitive_load);

    // Support regulatory capacity (deutero-learning: learning to regulate)
    this.target.regulatory_capacity += this.strength * 0.01;
    this.target.regulatory_capacity = Math.min(1, this.target.regulatory_capacity);

    // Performance fatigue recovery (SLOW - only when not performing)
    if (this.target.performance_fatigue !== undefined && !this.target.performing_aura) {
      this.target.performance_fatigue -= this.target.performance_fatigue * this.strength * 0.02;
      this.target.performance_fatigue = Math.max(0, this.target.performance_fatigue);
    }
  }

  /**
   * Execute performance fatigue double bind (algorithmic era)
   *
   * THEORETICAL FOUNDATION: DOUBLE BIND THROUGH PLATFORM DEPENDENCY
   *
   * This implements Bateson's "double bind" theory ("Toward a Theory of Schizophrenia", 1956)
   * applied to the creator economy. The double bind has these characteristics:
   *
   * 1. PRIMARY NEGATIVE INJUNCTION
   *    "You must perform aura to earn money and survive"
   *    - Platform economics require constant content creation
   *    - Revenue depends on follower engagement
   *    - Must maintain performance even when exhausted
   *
   * 2. SECONDARY NEGATIVE INJUNCTION (CONTRADICTORY)
   *    "Performance causes fatigue which will destroy your ability to perform"
   *    - Emotional labor accumulates as performance_fatigue
   *    - Burnout risk increases with fatigue
   *    - But stopping means losing income
   *
   * 3. TERTIARY NEGATIVE INJUNCTION
   *    "You cannot escape the situation"
   *    - Network effects lock you into the platform
   *    - No viable alternative income sources
   *    - Quitting means financial collapse
   *
   * THE TRAP:
   * - Perform → accumulate fatigue → risk burnout → must perform more to compensate
   * - Don't perform → lose followers → lose income → must perform to survive
   * - Either choice leads to harm
   * - Classic double bind: damned if you do, damned if you don't
   *
   * This models Arlie Hochschild's "emotional labor" (The Managed Heart, 1983)
   * combined with platform capitalism's extractive dynamics. The result is
   * pathological adaptation or burnout.
   */
  executePerformanceFatigueDoubleBind() {
    // Only applies to algorithmic era with performance mechanics
    if (this.medium !== 'algorithmic') return;
    if (this.target.performance_fatigue === undefined) return;

    // POSITIVE FEEDBACK: Financial precarity drives more performance
    if (this.target.financial_precarity && !this.target.performing_aura) {
      // Precarity forces resumption of performance
      if (Math.random() < 0.1) { // 10% chance per update to restart
        this.target.performing_aura = true;
      }
    }

    // POSITIVE FEEDBACK: Performance accumulates fatigue
    if (this.target.performing_aura) {
      // Fatigue increases with follower count (more audience = more pressure)
      const fatigue_rate = 0.001 * (1 + this.target.follower_count * 0.0001);
      this.target.performance_fatigue += fatigue_rate * this.strength;
    }

    // BURNOUT CHECK: High fatigue can force exit
    if (this.target.performance_fatigue > 0.8) {
      // Burnout probability scales with fatigue
      const burnout_probability = (this.target.performance_fatigue - 0.8) * 0.5;

      if (Math.random() < burnout_probability * this.strength) {
        // BURNOUT: Stop performing, lose half of parasocial followers
        this.target.performing_aura = false;
        this.target.parasocial_followers = Math.floor(this.target.parasocial_followers * 0.5);
        this.target.follower_count = this.target.embodied_followers + this.target.parasocial_followers;

        // Mark as pathological if this has happened multiple times
        if (this.target.burnout_count === undefined) {
          this.target.burnout_count = 0;
        }
        this.target.burnout_count++;

        if (this.target.burnout_count >= 3) {
          // Pathological adaptation after repeated burnouts
          this.target.double_bind.pathological_adaptation = true;
        }
      }
    }

    // COGNITIVE LOAD: Performance creates ongoing cognitive burden
    if (this.target.performing_aura) {
      this.target.cognitive_load += this.target.follower_count * 0.00001 * this.strength;
    }
  }

  /**
   * Update feedback loop strength based on interaction frequency
   */
  updateStrength(delta) {
    this.strength += delta;
    this.strength = Math.max(0, Math.min(1, this.strength));

    // If strength falls too low, deactivate
    if (this.strength < 0.1) {
      this.active = false;
    }
  }

  /**
   * Record a signal in the history
   */
  recordSignal(signal_value) {
    this.signal_history.push({
      time: Date.now(),
      value: signal_value
    });

    // Keep history bounded
    if (this.signal_history.length > 100) {
      this.signal_history.shift();
    }
  }

  /**
   * Calculate actual reach using multipliers (for metrics)
   */
  calculateActualReach(config) {
    let multiplier = config.reach_multiplier || 1;

    // Apply medium-specific multipliers
    if (this.medium === 'broadcast' && config.broadcast_reach_multiplier) {
      multiplier = config.broadcast_reach_multiplier;
    } else if (this.medium === 'algorithmic' && config.viral_multiplier) {
      multiplier = config.viral_multiplier;
    }

    return multiplier;
  }
}

export default FeedbackLoop;
