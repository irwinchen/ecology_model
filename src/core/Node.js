/**
 * Node.js
 *
 * Represents an individual person in the network.
 * Implements Bateson's differential equations for schismogenesis
 * and double bind stress dynamics.
 */

export class Node {
  constructor(id, config) {
    // ===== IDENTITY =====
    this.id = id;
    this.role = 'consumer'; // 'consumer', 'creator', 'broadcaster'

    // ===== TECHNOLOGICAL ACCESS =====
    this.is_literate = false;
    this.has_print_access = false;
    this.has_broadcast_access = false;
    this.has_internet_access = false;
    this.has_smartphone = false;

    // ===== COGNITIVE DYNAMICS =====
    this.cognitive_load = 0;
    this.cognitive_capacity = 7; // Miller's Law: 7±2 chunks
    this.attention_available = 1.0; // 0 to 1

    // Homeostatic regulation (Bateson/Ashby)
    this.homeostatic_setpoint = 0.5;
    this.homeostatic_bandwidth = 0.3; // ±0.3 range
    this.within_homeostatic_range = true;
    this.homeostasis_violation_amount = 0;
    this.regulatory_capacity = 1.0; // Ability to maintain equilibrium
    this.system_coherence = 1.0; // Integrity of internal regulatory systems
    this.functional = true; // System operates correctly

    // ===== BATESON SCHISMOGENESIS EQUATIONS =====
    this.schismogenesis_state = {
      // Symmetrical schismogenesis: dX/dt = k₁·Y, dY/dt = k₂·X
      // Complementary schismogenesis: dX/dt = k₁·Y, dY/dt = -k₂·X
      X: 0, // This party's escalation level (0 to 1)
      Y: 0, // Other party's escalation level (0 to 1)
      k1: 0.1, // Coupling constant: how much Y drives dX/dt
      k2: 0.1, // Coupling constant: how much X drives dY/dt
      type: null, // 'symmetrical', 'complementary', or null
      tribal_affiliation: null, // Which tribe this node belongs to
      escalation_history: [] // Track escalation over time
    };

    // ===== BATESON DOUBLE BIND STRESS DYNAMICS =====
    this.double_bind = {
      // dS/dt = α·E·B - β·R
      // dR/dt = -γ·S·(1-H)
      S: 0, // Stress level (0 to 1, pathological at > 0.9)
      E: 0, // Escape attempt rate (how often trying to leave)
      B: 0, // Blocking strength (network effects trap strength)
      R: 1.0, // Regulatory capacity (ability to cope)
      H: 1.0, // Homeostatic capacity (system integrity)
      alpha: 0.3, // Stress accumulation rate
      beta: 0.2, // Stress relief rate
      gamma: 0.1, // Regulatory degradation rate
      in_double_bind: false,
      pathological_adaptation: false // S > 0.9
    };

    // ===== EMOTIONAL STATE =====
    this.emotional_state = 0.5; // 0 (calm) to 1 (agitated)
    this.emotional_regulation = 1.0; // Ability to regulate emotions
    this.doom_scroll_addiction = 0; // Compulsive content consumption

    // ===== TRUST =====
    this.trust_coherence = 1.0; // Internal consistency of trust signals
    this.institutional_trust = config.institutional_trust || 0.7;

    // ===== CONNECTIONS (by medium) =====
    this.embodied_connections = []; // Face-to-face
    this.print_connections = []; // Books, newspapers
    this.broadcast_connections = []; // TV, radio (parasocial)
    this.internet_connections = []; // Forums, blogs
    this.algorithmic_connections = []; // Social media feeds

    // ===== INFORMATION FLOW =====
    this.information_exposure_rate = 0; // Messages per time step
    this.information_processing_rate = 3; // Can process N messages per step
    this.information_buffer = []; // Queued content

    // ===== SPATIAL POSITION (for visualization) =====
    this.position = { x: 0, y: 0, z: 0 };
  }

  /**
   * Update schismogenesis using Bateson's differential equations
   * with Euler method numerical integration (Δt = 1)
   */
  updateSchismogenesis(dt = 1) {
    if (!this.schismogenesis_state.type) {
      return; // Not participating in schismogenesis
    }

    const state = this.schismogenesis_state;
    const { X, Y, k1, k2, type } = state;

    let dX_dt, dY_dt;

    if (type === 'symmetrical') {
      // Symmetrical schismogenesis: dX/dt = k₁·Y, dY/dt = k₂·X
      // Both parties escalate in same direction
      dX_dt = k1 * Y;
      dY_dt = k2 * X;
    } else if (type === 'complementary') {
      // Complementary schismogenesis: dX/dt = k₁·Y, dY/dt = -k₂·X
      // Differentiation: dominance/submission
      dX_dt = k1 * Y;
      dY_dt = -k2 * X;
    } else {
      return;
    }

    // Euler method: X(t+Δt) = X(t) + dX/dt · Δt
    state.X = Math.max(0, Math.min(1, X + dX_dt * dt));
    state.Y = Math.max(0, Math.min(1, Y + dY_dt * dt));

    // Track history
    state.escalation_history.push({
      time: Date.now(),
      X: state.X,
      Y: state.Y,
      dX_dt: dX_dt,
      dY_dt: dY_dt
    });

    // Keep history bounded (last 100 steps)
    if (state.escalation_history.length > 100) {
      state.escalation_history.shift();
    }

    // Update emotional state based on escalation
    this.emotional_state = Math.min(1, this.emotional_state + state.X * 0.1);
  }

  /**
   * Update double bind stress using Bateson's stress dynamics
   * dS/dt = α·E·B - β·R
   * dR/dt = -γ·S·(1-H)
   */
  updateDoubleBindStress(dt = 1) {
    if (!this.double_bind.in_double_bind) {
      return; // Not in a double bind
    }

    const db = this.double_bind;
    const { S, E, B, R, H, alpha, beta, gamma } = db;

    // Stress accumulation: dS/dt = α·E·B - β·R
    const dS_dt = alpha * E * B - beta * R;

    // Regulatory capacity degradation: dR/dt = -γ·S·(1-H)
    const dR_dt = -gamma * S * (1 - H);

    // Euler method integration
    db.S = Math.max(0, Math.min(1, S + dS_dt * dt));
    db.R = Math.max(0, Math.min(1, R + dR_dt * dt));

    // Check for pathological adaptation (S > 0.9)
    db.pathological_adaptation = db.S > 0.9;

    // Stress affects system coherence and regulatory capacity
    if (db.pathological_adaptation) {
      this.system_coherence -= 0.01 * dt;
      this.regulatory_capacity = Math.min(this.regulatory_capacity, db.R);
      this.functional = this.system_coherence > 0.3;
    }

    // Update emotional state
    this.emotional_state = Math.min(1, this.emotional_state + db.S * 0.05);
  }

  /**
   * Check if node is within homeostatic range
   */
  checkHomeostasis() {
    const distance_from_setpoint = Math.abs(this.emotional_state - this.homeostatic_setpoint);
    this.within_homeostatic_range = distance_from_setpoint <= this.homeostatic_bandwidth;
    this.homeostasis_violation_amount = Math.max(0, distance_from_setpoint - this.homeostatic_bandwidth);

    // Prolonged violation degrades regulatory capacity
    if (!this.within_homeostatic_range) {
      this.regulatory_capacity -= 0.005;
      this.regulatory_capacity = Math.max(0.1, this.regulatory_capacity);
    } else {
      // Gradual recovery when in range
      this.regulatory_capacity += 0.002;
      this.regulatory_capacity = Math.min(1.0, this.regulatory_capacity);
    }
  }

  /**
   * Process information buffer (consume queued content)
   */
  processInformation() {
    const processable = Math.min(
      this.information_processing_rate,
      this.information_buffer.length
    );

    for (let i = 0; i < processable; i++) {
      const content = this.information_buffer.shift();

      // Update cognitive load
      // IMPORTANT: Even ragebait (negative info value) consumes cognitive resources
      // Use absolute value to represent processing cost, regardless of value
      const processing_cost = Math.abs(content.information_value || 0.1);
      this.cognitive_load += processing_cost;

      // Update emotional state based on content
      if (content.type === 'ragebait') {
        this.emotional_state += 0.2;
      } else if (content.type === 'calming') {
        this.emotional_state -= 0.1;
      }
    }

    // Decay cognitive load over time
    this.cognitive_load *= 0.95;
    this.cognitive_load = Math.max(0, this.cognitive_load); // Ensure non-negative

    // Decay emotional agitation over time
    this.emotional_state *= 0.98;
    this.emotional_state = Math.max(0, Math.min(1, this.emotional_state));

    // Check homeostasis
    this.checkHomeostasis();
  }

  /**
   * Update all node dynamics (called each simulation step)
   */
  update(dt = 1) {
    this.processInformation();
    this.updateSchismogenesis(dt);
    this.updateDoubleBindStress(dt);
  }

  /**
   * Get total connection count
   */
  getTotalConnections() {
    return (
      this.embodied_connections.length +
      this.print_connections.length +
      this.broadcast_connections.length +
      this.internet_connections.length +
      this.algorithmic_connections.length
    );
  }

  /**
   * Get parasocial connection count
   */
  getParasocialConnections() {
    return (
      this.broadcast_connections.length +
      this.internet_connections.length +
      this.algorithmic_connections.length
    );
  }

  /**
   * Calculate attention available (1 - load/capacity)
   */
  getAttentionAvailable() {
    if (this.cognitive_capacity === 0) return 0;
    return Math.max(0, 1 - this.cognitive_load / this.cognitive_capacity);
  }
}

export default Node;
