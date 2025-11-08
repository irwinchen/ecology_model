/**
 * FeedbackLoop.js
 *
 * Represents a feedback loop between nodes in the network.
 * Can be positive (amplifying) or negative (stabilizing).
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
   */
  execute() {
    if (!this.active) return;

    if (this.type === 'positive') {
      this.executePositiveFeedback();
    } else if (this.type === 'negative') {
      this.executeNegativeFeedback();
    }
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
   */
  executeSymmetricalSchismogenesis() {
    // Set up schismogenesis state if not already initialized
    if (!this.source.schismogenesis_state.type) {
      this.source.schismogenesis_state.type = 'symmetrical';
      this.source.schismogenesis_state.k1 = this.k1;
      this.source.schismogenesis_state.k2 = this.k2;
      // CRITICAL: Initialize with small random value to kick off dynamics
      // Otherwise dX/dt = k1*0 = 0 forever
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
   */
  executeNegativeFeedback() {
    // Negative feedback dampens deviation from equilibrium
    // Helps maintain homeostasis

    // Pull emotional state toward homeostatic setpoint
    const deviation = this.target.emotional_state - this.target.homeostatic_setpoint;
    const correction = deviation * this.strength * 0.1;
    this.target.emotional_state -= correction;
    this.target.emotional_state = Math.max(0, Math.min(1, this.target.emotional_state));

    // Reduce cognitive load
    this.target.cognitive_load -= this.target.cognitive_load * this.strength * 0.05;
    this.target.cognitive_load = Math.max(0, this.target.cognitive_load);

    // Support regulatory capacity
    this.target.regulatory_capacity += this.strength * 0.01;
    this.target.regulatory_capacity = Math.min(1, this.target.regulatory_capacity);
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
