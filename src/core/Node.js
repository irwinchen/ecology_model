/**
 * Node.js
 *
 * THEORETICAL FOUNDATION: THE INDIVIDUAL AS A CYBERNETIC SYSTEM
 *
 * This module models each person in the network as a self-regulating cybernetic
 * system, drawing on:
 *
 * 1. GREGORY BATESON - Cybernetic Psychology
 *    - Mind as a system of circular feedback loops
 *    - Consciousness emerges from difference detection and regulation
 *    - Multiple levels of learning (Learning 0, I, II, III)
 *
 * 2. W. ROSS ASHBY - "Design for a Brain" (1952)
 *    - Organisms maintain viability through homeostatic regulation
 *    - Essential variables must stay within viable ranges
 *    - Ultrastability: System reorganizes when regulation fails
 *
 * 3. GEORGE MILLER - "The Magical Number Seven" (1956)
 *    - Working memory capacity: 7±2 chunks
 *    - Fundamental cognitive limit constraining information processing
 *    - Overload occurs when input exceeds processing capacity
 *
 * KEY THEORETICAL IMPLEMENTATIONS:
 *
 * A. HOMEOSTATIC REGULATION
 *    - emotional_state seeks homeostatic_setpoint (default 0.5)
 *    - System is viable within ±homeostatic_bandwidth (0.3)
 *    - Prolonged violation degrades regulatory_capacity
 *    - Eventually leads to system_coherence breakdown
 *
 * B. BATESON'S SCHISMOGENESIS EQUATIONS
 *    Symmetrical: dX/dt = k₁·Y, dY/dt = k₂·X
 *    Complementary: dX/dt = k₁·Y, dY/dt = -k₂·X
 *    - Implemented via Euler method numerical integration
 *    - Tracks escalation history for analysis
 *
 * C. BATESON'S DOUBLE BIND STRESS DYNAMICS
 *    dS/dt = α·E·B - β·R  (Stress accumulation)
 *    dR/dt = -γ·S·(1-H)   (Regulatory capacity degradation)
 *    - E: Escape attempts (trying to leave the platform)
 *    - B: Blocking strength (network effects trap you)
 *    - R: Regulatory capacity (ability to cope)
 *    - H: Homeostatic capacity (system integrity)
 *    - Pathological adaptation occurs when S > 0.9
 *
 * D. COGNITIVE LOAD AND ATTENTION
 *    - Miller's Law: cognitive_capacity = 7 (chunks)
 *    - information_buffer queues incoming content
 *    - Processing rate limits consumption
 *    - Overload occurs when load > capacity
 *
 * WHY DIFFERENTIAL EQUATIONS?
 *
 * Bateson used differential equations because psychological processes are
 * CONTINUOUS and INTERDEPENDENT. You can't understand escalation as a series
 * of discrete events - it's a RATE OF CHANGE that depends on current state.
 *
 * This is fundamentally different from linear models. In linear causality:
 *   Event A causes Event B
 *
 * In cybernetic causality:
 *   Rate of change of A depends on current value of B
 *   Rate of change of B depends on current value of A
 *   → Circular, self-modifying, emergent
 *
 * CONNECTION TO ORALITY PROJECT:
 *
 * Each node represents a person embedded in different communication ecologies.
 * The model shows how the SAME human regulatory system (homeostasis, cognitive
 * limits) responds differently to different media environments:
 *
 * - Oral culture: Regulation works, homeostasis maintained
 * - Print culture: Some stress, manageable
 * - Broadcast culture: Parasocial stress, reduced feedback
 * - Internet culture: Overload begins, filtering needed
 * - Algorithmic culture: Homeostasis overwhelmed, pathological adaptation
 *
 * The equations don't change. The ENVIRONMENT changes. That's the point.
 */

export class Node {
  constructor(id, config) {
    // ===== IDENTITY =====
    this.id = id;
    this.role = 'consumer'; // Will be computed from follower_count (emergent)
    this.is_influencer = false; // follower_count >= 10,000

    // ===== REACH: How far your voice carries =====
    // THEORETICAL FOUNDATION: Oral baseline (unaided human voice)
    // - Conversation: ~20-30 meters
    // - Shouting: ~60-100 meters in open space
    // - This is the evolutionary baseline for all social regulation
    this.base_reach = 50; // Unaided voice reach (meters)
    this.amplified_reach = 50; // After technology amplification

    // ===== AURA: Embodied presence and charisma =====
    // THEORETICAL FOUNDATION: Benjamin's "Aura" + Weber's "Charisma"
    // - Rare, intrinsic quality (~8% of population)
    // - Only fully works face-to-face (embodied)
    // - Can be partially mediated through technology
    // - Can be performed (but costs emotional labor)
    this.has_aura = Math.random() < 0.08; // 8% have natural aura
    this.aura_strength = this.has_aura ? 0.6 + Math.random() * 0.4 : 0; // 0.6-1.0 if present
    this.aura_performance_skill = Math.random(); // Learned ability to simulate aura
    this.performing_aura = false; // Active choice (economic necessity)
    this.performance_fatigue = 0; // Emotional labor cost (0-1)

    // ===== FOLLOWERS: Real vs Parasocial =====
    // THEORETICAL FOUNDATION: Dunbar's number + parasocial relationships
    this.embodied_followers = 0; // Real relationships (Dunbar-limited ~150)
    this.parasocial_followers = 0; // Mediated relationships (unlimited but hollow)
    this.follower_count = 0; // Total (computed from above)

    // ===== CONTENT PROPERTIES: What drives follower accumulation =====
    // THEORETICAL FOUNDATION: Different eras reward different qualities
    this.content_quality = Math.random(); // Intrinsic talent (writing, speaking, ideas)
    this.inflammatory_level = Math.random(); // Provocativeness, outrage potential
    this.posting_frequency = Math.random(); // Activity level, consistency

    // ===== PLATFORM EXTRACTION (Algorithmic era) =====
    // THEORETICAL FOUNDATION: Surveillance capitalism (Zuboff)
    this.platform_revenue_generated = 0; // Ad revenue from this node's engagement
    this.personal_revenue = 0; // What node actually receives (~10%)
    this.financial_precarity = true; // Most nodes don't make sustainable income

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
   *
   * THEORETICAL FOUNDATION: THE DOUBLE BIND IN DIGITAL PLATFORMS
   *
   * Bateson's double bind theory (1956) was originally about schizophrenia:
   * contradictory messages at different logical levels that trap the receiver.
   *
   * Classic example (from "Toward a Theory of Schizophrenia"):
   *   Mother says "I love you" (verbal message)
   *   Mother's body language says "Go away" (meta-message)
   *   Child cannot comment on the contradiction (meta-meta prohibition)
   *   Child cannot leave the relationship (dependency)
   *   → Result: Pathological stress, reality distortion
   *
   * DIGITAL DOUBLE BIND:
   *
   * Modern social media creates an analogous trap:
   *   Level 1: "Stay connected!" (explicit message)
   *   Level 2: "This is harming you" (experienced reality)
   *   Meta-prohibition: Can't discuss without being mocked
   *   Cannot leave: Network effects, FOMO, social isolation without platform
   *   → Result: Chronic stress, compulsive use despite harm
   *
   * THE EQUATIONS:
   *
   * dS/dt = α·E·B - β·R
   *   - Stress (S) accumulates when you try to Escape (E)
   *   - But escape is Blocked (B) by network effects
   *   - Stress is only relieved by Regulatory capacity (R)
   *   - α, β control relative rates
   *
   * dR/dt = -γ·S·(1-H)
   *   - High Stress (S) degrades Regulatory capacity (R)
   *   - Degradation accelerates when Homeostatic capacity (H) is low
   *   - This is a DEATH SPIRAL: stress reduces ability to cope,
   *     reduced coping increases stress
   *
   * KEY INSIGHT:
   * When S > 0.9 (90% stress), the system enters "pathological adaptation" -
   * like a schizophrenic patient, you adapt to the contradiction rather than
   * resolving it. You accept the double bind as normal.
   *
   * EXAMPLES OF PATHOLOGICAL ADAPTATION:
   * - "I know doomscrolling is bad, but I can't stop"
   * - "This is making me anxious, but everyone's on here"
   * - "I hate this app, but I need it to stay connected"
   * - Normalizing constant surveillance, outrage, comparison
   *
   * This models what Bateson called "Learning III" - learning to accept
   * contradictions that would normally drive you insane. It's a survival
   * adaptation that comes at the cost of system coherence.
   *
   * CONNECTION TO ORALITY PROJECT:
   * In oral culture, you CAN leave. You CAN comment on contradictions.
   * The village elder's hypocrisy can be challenged. Face-to-face accountability
   * prevents double binds from becoming systemic.
   *
   * In algorithmic culture, you CANNOT leave (network effects). You CANNOT
   * effectively challenge (your voice drowns in the flood). The system
   * perpetuates its own contradictions.
   */
  updateDoubleBindStress(dt = 1) {
    if (!this.double_bind.in_double_bind) {
      return; // Not in a double bind
    }

    const db = this.double_bind;
    const { S, E, B, R, H, alpha, beta, gamma } = db;

    // Stress accumulation: dS/dt = α·E·B - β·R
    // The more you try to escape (E), the more the system blocks you (B),
    // the more stress accumulates. Only regulation (R) provides relief.
    const dS_dt = alpha * E * B - beta * R;

    // Regulatory capacity degradation: dR/dt = -γ·S·(1-H)
    // Chronic stress erodes your ability to cope, especially when homeostatic
    // capacity (H) is already compromised. This is the death spiral.
    const dR_dt = -gamma * S * (1 - H);

    // Euler method integration (simple numerical solution to differential equations)
    db.S = Math.max(0, Math.min(1, S + dS_dt * dt));
    db.R = Math.max(0, Math.min(1, R + dR_dt * dt));

    // Check for pathological adaptation (S > 0.9)
    // At this point, the person has "learned" to accept the double bind as normal
    db.pathological_adaptation = db.S > 0.9;

    // Stress affects system coherence and regulatory capacity
    // This models Ashby's "ultrastability" - when essential variables go out of range,
    // the system reorganizes itself. But the reorganization may be pathological.
    if (db.pathological_adaptation) {
      this.system_coherence -= 0.01 * dt;
      this.regulatory_capacity = Math.min(this.regulatory_capacity, db.R);
      this.functional = this.system_coherence > 0.3;
    }

    // Update emotional state (stress manifests as agitation)
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

  /**
   * Get visible stress level (for node color visualization)
   *
   * THEORETICAL FOUNDATION: ACUTE PSYCHOLOGICAL STATE
   *
   * This measures what you'd SEE if you looked at someone - the immediate
   * manifestations of distress:
   *
   * 1. Emotional distress (50%): How far from calm/equilibrium?
   *    - Maps to visible agitation, anxiety, emotional dysregulation
   *    - What you'd notice in facial expression, body language
   *
   * 2. Cognitive overload (30%): Are they overwhelmed?
   *    - Maps to confusion, inability to focus, decision paralysis
   *    - What you'd notice in scattered attention, forgetfulness
   *
   * 3. Double bind agitation (20%): Are they visibly trapped?
   *    - Maps to frustration, helplessness, compulsive behavior
   *    - What you'd notice in doomscrolling, checking phone constantly
   *
   * Returns: 0-1 (0 = calm/green, 0.5 = stressed/yellow, 1 = distressed/red)
   */
  getVisibleStress() {
    // Emotional distress: distance from calm equilibrium (0.5 setpoint)
    // Range: 0 (perfectly calm) to 1 (maximum agitation)
    const emotional_distress = Math.abs(this.emotional_state - 0.5) * 2;

    // Cognitive overload: processing beyond capacity
    // Range: 0 (no load) to 1+ (overloaded)
    const cognitive_overload = Math.min(this.cognitive_load / this.cognitive_capacity, 1.0);

    // Double bind agitation: visible stress from being trapped
    // Only contributes if actually in double bind
    const double_bind_agitation = this.double_bind.in_double_bind ?
      this.double_bind.S * 0.5 : 0;

    // Weighted composite
    const visible_stress = (
      emotional_distress * 0.5 +
      cognitive_overload * 0.3 +
      double_bind_agitation * 0.2
    );

    return Math.min(visible_stress, 1.0);
  }

  /**
   * Get system integrity level (for node border visualization)
   *
   * THEORETICAL FOUNDATION: CHRONIC SYSTEMIC DAMAGE
   *
   * This measures LONG-TERM damage to the regulatory system - not what you
   * see in a moment, but what accumulates over time:
   *
   * 1. Regulatory capacity (60%): Can you still self-correct?
   *    - Bateson/Ashby: homeostatic regulation ability
   *    - When this fails, system enters pathological states
   *
   * 2. System coherence (40%): Is the system still intact?
   *    - Ashby's "ultrastability": system integrity
   *    - Below 0.3 = dysfunctional, system has collapsed
   *
   * Returns: 0-1 (1 = healthy/solid border, 0 = collapsed/no border)
   */
  getSystemIntegrity() {
    // Combine regulatory capacity and system coherence
    // Both are already 0-1 range, higher = healthier
    const integrity = (
      this.regulatory_capacity * 0.6 +
      this.system_coherence * 0.4
    );

    return Math.max(0, Math.min(integrity, 1.0));
  }

  /**
   * Get digital aura (combination of real + performed)
   *
   * THEORETICAL FOUNDATION: The 75% Rule
   * - Real aura transmits at 75% through digital media (the "25% better online" effect)
   * - Performed aura can simulate up to 50% strength (filters, editing, persona)
   * - Combined max of 1.0
   *
   * This models:
   * - Why charismatic people are still effective online (75% > 0)
   * - Why anyone can become "influencer" (performance skill matters)
   * - Why meeting IRL often disappoints (25% gap)
   */
  get digital_aura() {
    const real_component = this.has_aura ?
      this.aura_strength * 0.75 : 0;  // 75% transmission of real aura

    const performed_component = this.performing_aura ?
      this.aura_performance_skill * 0.5 : 0;  // Can fake ~50% strength

    return Math.min(real_component + performed_component, 1.0);
  }

  /**
   * Update follower count (sum of embodied + parasocial)
   */
  updateFollowerCount() {
    this.follower_count = this.embodied_followers + this.parasocial_followers;
  }

  /**
   * Determine role from follower count (emergent classification)
   *
   * THEORETICAL FOUNDATION: Dunbar's number and cognitive limits
   * - 0-50: Consumer (local social circle)
   * - 50-500: Creator (beyond immediate circle, but manageable)
   * - 500-10,000: Broadcaster (beyond Dunbar limit, parasocial)
   * - 10,000+: Influencer (algorithmic amplification, platform-dependent)
   */
  determineRole() {
    if (this.follower_count >= 10000) {
      this.role = 'influencer';
      this.is_influencer = true;
    } else if (this.follower_count >= 500) {
      this.role = 'broadcaster';
      this.is_influencer = false;
    } else if (this.follower_count >= 50) {
      this.role = 'creator';
      this.is_influencer = false;
    } else {
      this.role = 'consumer';
      this.is_influencer = false;
    }
  }

  /**
   * Update performance fatigue (emotional labor cost)
   *
   * THEORETICAL FOUNDATION: Hochschild's "Emotional Labor" (1983)
   * - Performing authenticity is exhausting
   * - Cannot sustain indefinitely
   * - Leads to burnout
   */
  updatePerformanceFatigue(dt = 1) {
    if (this.performing_aura) {
      // Fatigue accumulates
      this.performance_fatigue += 0.01 * dt;

      // Cognitive load from maintaining persona
      this.cognitive_load += this.follower_count * 0.001 * dt;

      // If fatigue too high, may stop performing (burnout)
      if (this.performance_fatigue > 0.8 && Math.random() < this.performance_fatigue * 0.1) {
        this.performing_aura = false;
        // Rapid follower loss when authentic performance ends
        this.parasocial_followers = Math.floor(this.parasocial_followers * 0.5);
        this.updateFollowerCount();
      }
    } else {
      // Gradual recovery when not performing
      this.performance_fatigue *= 0.95;
      this.performance_fatigue = Math.max(0, this.performance_fatigue);
    }
  }

  /**
   * Update all node dynamics (called each simulation step)
   */
  updateAll(dt = 1) {
    this.processInformation();
    this.updateSchismogenesis(dt);
    this.updateDoubleBindStress(dt);
    this.updatePerformanceFatigue(dt);
    this.updateFollowerCount();
    this.determineRole();
  }
}

export default Node;
