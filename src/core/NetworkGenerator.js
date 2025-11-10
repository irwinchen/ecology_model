/**
 * NetworkGenerator.js
 *
 * THEORETICAL FOUNDATION:
 * This module implements a computational model of communication network evolution
 * across five historical eras, grounded in Gregory Bateson's cybernetic principles
 * and the Orality project's core thesis about the post-literate transition.
 *
 * KEY THEORETICAL CONCEPTS IMPLEMENTED:
 *
 * 1. CYBERNETIC HOMEOSTASIS (Bateson, "Steps to an Ecology of Mind")
 *    - Networks seek equilibrium through negative feedback loops
 *    - Regulatory capacity varies by communication medium
 *    - System coherence degrades when homeostatic bandwidth is violated
 *
 * 2. SCHISMOGENESIS (Bateson, "Naven", 1936)
 *    - Symmetrical: Both parties escalate in same direction (arms race, flame wars)
 *    - Complementary: Differentiation emerges (dominant/submissive, broadcaster/viewer)
 *    - Implemented via differential equations: dX/dt = k₁·Y, dY/dt = ±k₂·X
 *
 * 3. DOUBLE BIND THEORY (Bateson et al., "Toward a Theory of Schizophrenia", 1956)
 *    - Paradoxical communication that traps the receiver
 *    - In algorithmic era: network effects create inescapable dependency
 *    - Stress accumulation: dS/dt = α·E·B - β·R
 *
 * 4. DUNBAR'S NUMBER (Cognitive constraint on social relationships)
 *    - Core: ~5 close relationships
 *    - Sympathy group: ~150 meaningful relationships
 *    - Technology extends but does not replace embodied capacity
 *
 * 5. FORCE-DIRECTED LAYOUT AS SOCIAL METAPHOR
 *    - Spatial proximity represents social affinity
 *    - Connection strength creates attractive forces (social gravity)
 *    - Repulsion prevents collapse (maintaining individual identity)
 *    - The layout emerges from relationship dynamics, not imposed structure
 *
 * 6. ORAL RESIDUE (Walter Ong, "Orality and Literacy")
 *    - Primary orality: Face-to-face communication, embodied memory
 *    - Secondary orality: Electronic media recreates oral dynamics
 *    - Each era builds upon but does not eliminate prior modes
 *
 * HISTORICAL ERA PROGRESSION:
 * - Oral Culture: Pure embodied communication, homeostatic
 * - Print Era: Literate elites emerge, creates complementary schismogenesis
 * - Broadcast Era: One-to-many parasocial relationships
 * - Internet Era: Many-to-many, topic-based clustering
 * - Algorithmic Era: Engagement optimization, symmetrical schismogenesis, double binds
 *
 * The model demonstrates how technological mediation progressively strains the
 * homeostatic mechanisms that regulate human communication systems.
 */

import Node from './Node.js';
import FeedbackLoop from './FeedbackLoop.js';
import { ERA_CONFIGS, FORCE_LAYOUT_CONFIG, ROLE_THRESHOLDS } from './config.js';

export class NetworkGenerator {
  constructor(era_key, seed = null) {
    this.era = era_key;
    this.config = ERA_CONFIGS[era_key];
    this.seed = seed || Date.now();
    this.nodes = [];
    this.feedback_loops = [];
    this.edges = [];

    // Random number generator (seedable)
    this.rng = this.createSeededRNG(this.seed);
  }

  /**
   * Create a seeded random number generator
   *
   * Uses Linear Congruential Generator (LCG) algorithm for deterministic
   * pseudo-randomness. This ensures reproducibility - the same seed always
   * generates the same network topology, critical for scientific comparison
   * across eras and debugging emergent behaviors.
   *
   * The determinism here reflects Bateson's concept of "stochastic process" -
   * we're not generating true randomness, but patterns that emerge from
   * constrained variation (Bateson, "Mind and Nature", p. 48).
   */
  createSeededRNG(seed) {
    let state = seed;
    return function () {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  }

  /**
   * Generate the complete network
   *
   * GENERATION SEQUENCE FOR EMERGENT ROLES:
   * 1. Create nodes - all start as 'consumer'
   * 2. Initialize random spatial positions
   * 3. Create connections (embodied, print, broadcast, internet, algorithmic)
   * 4. Count followers and assign emergent roles
   * 5. Identify influencers (for schismogenesis tribal leaders)
   * 6. Pre-compute force strengths (performance optimization)
   * 7. Run force-directed layout (spatial clustering)
   * 8. Initialize schismogenesis (symmetrical escalation)
   * 9. Initialize double binds (algorithmic entrapment)
   *
   * This sequence ensures roles EMERGE from network structure rather than
   * being imposed upfront.
   */
  generate() {
    console.log(`Generating ${this.config.era_name} network...`);

    // Step 1: Create nodes (all start as consumers)
    this.createNodes();

    // Step 2: Initialize random positions first
    this.initializePositions();

    // Step 3: Create connections based on era
    this.createConnections();

    // Step 4: Assign emergent roles based on follower count
    this.assignEmergentRoles();

    // Step 5: Identify influencers (nodes with most followers for schismogenesis)
    this.identifyInfluencers();

    // Step 6: Pre-compute force strengths for edges (optimization)
    this.precomputeForceStrengths();

    // Step 7: Run force-directed layout (connections already exist)
    this.runForceDirectedLayout();

    // Step 8: Initialize schismogenesis (for later eras)
    this.initializeSchismogenesis();

    // Step 9: Initialize double binds (for algorithmic era)
    this.initializeDoubleBinds();

    console.log(
      `Generated ${this.nodes.length} nodes, ${this.edges.length} edges, ${this.feedback_loops.length} feedback loops`
    );

    return {
      nodes: this.nodes,
      edges: this.edges,
      feedback_loops: this.feedback_loops,
      config: this.config
    };
  }

  /**
   * Create nodes with appropriate characteristics
   *
   * EMERGENT ROLES APPROACH:
   * Unlike previous implementation, nodes are NOT assigned roles upfront.
   * All nodes start as 'consumer', and roles emerge from follower accumulation
   * after the network is fully connected. This reflects the reality that
   * "influencer" status is achieved, not assigned.
   *
   * Intrinsic properties (aura, content_quality, etc.) are set in Node constructor.
   * These properties influence connection formation and follower accumulation.
   */
  createNodes() {
    for (let i = 0; i < this.config.population_size; i++) {
      const node = new Node(i, this.config);

      // Assign literacy
      node.is_literate = this.rng() < this.config.literacy_rate;

      // Assign technological access
      node.has_print_access =
        node.is_literate && this.rng() < this.config.print_access_rate;
      node.has_broadcast_access = this.rng() < this.config.broadcast_access_rate;
      node.has_internet_access = this.rng() < this.config.internet_access_rate;
      node.has_smartphone = this.rng() < this.config.smartphone_rate;

      // ALL nodes start as consumers
      // Roles will be assigned AFTER connections based on follower count
      node.role = 'consumer';

      this.nodes.push(node);
    }
  }

  /**
   * Initialize random positions for all nodes
   */
  initializePositions() {
    console.log('Initializing node positions...');

    // Extremely large spread for larger networks (was * 10, then * 40, then * 60, now * 100)
    const spread = Math.sqrt(this.nodes.length) * 100;
    this.nodes.forEach((node) => {
      node.position.x = (this.rng() - 0.5) * spread;
      node.position.y = (this.rng() - 0.5) * spread;
      node.position.z = (this.rng() - 0.5) * 2; // Small z variation to prevent perfect overlap

      // Initialize velocity for simulation
      node.velocity = { x: 0, y: 0 };
    });
  }

  /**
   * Pre-compute force strengths for all edges
   * This avoids O(n²) lookups during force-directed layout
   *
   * THEORETICAL RATIONALE:
   * This implements a key distinction in the Orality project: the difference between
   * EMBODIED relationships (which create actual social gravity) and PARASOCIAL
   * relationships (which feel significant but lack mutual pull).
   *
   * - Embodied connections (face-to-face) have the strongest attractive force
   * - Print/broadcast connections are asymmetric - they don't pull people together spatially
   * - Internet connections only create spatial clustering if grounded in embodied relationships
   * - Algorithmic connections create NO spatial pull (they're engagement-driven, not social)
   *
   * This reflects Bateson's insight that "the map is not the territory" - online
   * connections feel like relationships but lack the proprioceptive feedback of
   * physical co-presence (Orality project: "Proprioceptive Communication" node).
   *
   * The visualization thus reveals the ACTUAL structure of social coherence, not
   * the inflated network of digital "connections."
   */
  precomputeForceStrengths() {
    console.log('Pre-computing edge force strengths...');

    // Build a map of embodied connections for fast lookup
    const embodiedMap = new Map();

    this.edges.forEach((edge) => {
      if (edge.medium === 'embodied') {
        const key1 = `${edge.source}-${edge.target}`;
        const key2 = `${edge.target}-${edge.source}`;
        embodiedMap.set(key1, true);
        embodiedMap.set(key2, true);
      }
    });

    // Pre-compute force strength for each edge
    this.edges.forEach((edge) => {
      // Get base attraction strength based on medium
      let force_strength = FORCE_LAYOUT_CONFIG.attraction_forces[edge.medium] || 0.3;

      // Special handling for internet connections
      // THEORETICAL NOTE: Internet connections only pull if grounded in embodied reality
      // This models the distinction between "weak ties" (Granovetter) that have social utility
      // versus purely digital connections that lack depth
      if (edge.medium === 'internet') {
        // Check if these nodes also have an embodied connection
        const key = `${edge.source}-${edge.target}`;
        const hasEmbodiedConnection = embodiedMap.has(key);

        if (!hasEmbodiedConnection) {
          // Only 25% of non-embodied internet connections have pull
          // This 25% represents topic communities that develop genuine affinity
          if (this.rng() > 0.25) {
            force_strength = 0; // No pull for this edge
          }
        }
        // If they do have embodied connection, use full internet attraction (0.3)
      }

      // Store the computed force strength on the edge
      edge.force_strength = force_strength;
    });

    console.log('Force strengths pre-computed');
  }

  /**
   * Run force-directed layout using pre-computed edge forces
   * Nodes are positioned based on connection forces
   *
   * THEORETICAL FOUNDATION: EMERGENT STRUCTURE FROM LOCAL INTERACTIONS
   *
   * This force-directed algorithm is more than a visualization technique - it's
   * a computational metaphor for how social structure emerges from individual
   * relationships. Key cybernetic principles at work:
   *
   * 1. CIRCULAR CAUSALITY (Bateson, "Cybernetics")
   *    - Node positions influence forces
   *    - Forces influence node positions
   *    - System settles into equilibrium through iterative feedback
   *
   * 2. SELF-ORGANIZATION (Ashby, "Design for a Brain")
   *    - No central planner dictates network structure
   *    - Clusters emerge from local affinity (embodied connections)
   *    - Spatial metaphor reveals hidden social ecology
   *
   * 3. COOLING SCHEDULE (Simulated Annealing)
   *    - High initial "temperature" allows exploration of state space
   *    - Gradual cooling allows system to settle into stable configuration
   *    - Mirrors Bateson's concept of "deutero-learning" - learning to learn
   *
   * 4. REPULSION AS IDENTITY MAINTENANCE
   *    - Nodes repel each other to maintain distinctness
   *    - Without repulsion, social gravity would collapse all into one
   *    - Reflects the balance between communion and autonomy in human psychology
   *
   * The resulting spatial layout is not arbitrary - it's a visual representation
   * of the ACTUAL social topology created by communication patterns.
   */
  runForceDirectedLayout() {
    console.log('Running force-directed layout...');

    // Run force-directed simulation
    let temperature = FORCE_LAYOUT_CONFIG.initial_temperature;

    for (let iter = 0; iter < FORCE_LAYOUT_CONFIG.iterations; iter++) {
      // Calculate forces for each node
      this.nodes.forEach((node) => {
        const force = { x: 0, y: 0 };

        // Repulsive forces between all nodes
        this.nodes.forEach((other) => {
          if (node === other) return;

          const dx = node.position.x - other.position.x;
          const dy = node.position.y - other.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy) + 0.01; // Avoid division by zero

          if (distance < FORCE_LAYOUT_CONFIG.repulsion_distance) {
            const repulsion = FORCE_LAYOUT_CONFIG.repulsion_strength / (distance * distance);
            force.x += (dx / distance) * repulsion;
            force.y += (dy / distance) * repulsion;
          }
        });

        // Store force temporarily
        node.force = force;
      });

      // Apply attractive forces from edges (must be done after repulsion)
      this.edges.forEach((edge) => {
        // Use pre-computed force strength (avoids O(n²) lookups)
        const attraction_strength = edge.force_strength;

        // Skip if attraction strength is 0
        if (attraction_strength === 0) return;

        const source = this.nodes[edge.source];
        const target = this.nodes[edge.target];

        const dx = target.position.x - source.position.x;
        const dy = target.position.y - source.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy) + 0.01;

        const attraction = attraction_strength * edge.strength * distance * 0.1;

        const fx = (dx / distance) * attraction;
        const fy = (dy / distance) * attraction;

        source.force.x += fx;
        source.force.y += fy;
        target.force.x -= fx;
        target.force.y -= fy;
      });

      // Update positions with cooling
      this.nodes.forEach((node) => {
        node.velocity.x = (node.velocity.x + node.force.x) * FORCE_LAYOUT_CONFIG.cooling_factor;
        node.velocity.y = (node.velocity.y + node.force.y) * FORCE_LAYOUT_CONFIG.cooling_factor;

        // Limit velocity by temperature
        const speed = Math.sqrt(node.velocity.x ** 2 + node.velocity.y ** 2);
        if (speed > temperature) {
          node.velocity.x = (node.velocity.x / speed) * temperature;
          node.velocity.y = (node.velocity.y / speed) * temperature;
        }

        // Update position
        node.position.x += node.velocity.x;
        node.position.y += node.velocity.y;

        // Optional: Apply boundaries
        if (FORCE_LAYOUT_CONFIG.use_boundaries) {
          const limit = FORCE_LAYOUT_CONFIG.boundary_size / 2;
          node.position.x = Math.max(-limit, Math.min(limit, node.position.x));
          node.position.y = Math.max(-limit, Math.min(limit, node.position.y));
        }
      });

      // Cool down temperature
      temperature *= 0.98;

      // Log progress every 50 iterations
      if (iter % 50 === 0) {
        console.log(`  Layout iteration ${iter}/${FORCE_LAYOUT_CONFIG.iterations}`);
      }
    }

    // Clean up temporary properties
    this.nodes.forEach((node) => {
      delete node.velocity;
      delete node.force;
    });

    console.log('Force-directed layout complete');
  }

  /**
   * Create connections based on era characteristics
   */
  createConnections() {
    console.log('Creating connections...');

    // Embodied connections (face-to-face, Dunbar's limit)
    console.log('  Creating embodied connections...');
    this.createEmbodiedConnections();
    console.log(`  ✓ ${this.edges.filter(e => e.medium === 'embodied').length} embodied edges created`);

    // Print connections (for literate nodes)
    if (this.config.print_access_rate > 0) {
      console.log('  Creating print connections...');
      this.createPrintConnections();
      console.log(`  ✓ ${this.edges.filter(e => e.medium === 'print').length} print edges created`);
    }

    // Broadcast connections (parasocial)
    if (this.config.broadcast_access_rate > 0) {
      console.log('  Creating broadcast connections...');
      this.createBroadcastConnections();
      console.log(`  ✓ ${this.edges.filter(e => e.medium === 'broadcast').length} broadcast edges created`);
    }

    // Internet connections
    if (this.config.internet_access_rate > 0) {
      console.log('  Creating internet connections...');
      this.createInternetConnections();
      console.log(`  ✓ ${this.edges.filter(e => e.medium === 'internet').length} internet edges created`);
    }

    // Algorithmic connections (social media)
    if (this.config.algorithm_engagement_weight > 0) {
      console.log('  Creating algorithmic connections...');
      this.createAlgorithmicConnections();
      console.log(`  ✓ ${this.edges.filter(e => e.medium === 'algorithmic').length} algorithmic edges created`);
    }

    console.log(`Total edges created: ${this.edges.length}`);
  }

  /**
   * Create embodied (face-to-face) connections
   * Based on Dunbar's number and geographic proximity
   *
   * THEORETICAL GROUNDING: COGNITIVE LIMITS ON SOCIAL SCALE
   *
   * Robin Dunbar's research reveals a fundamental constraint: humans can maintain
   * ~150 stable social relationships, with ~5 forming an intimate core. This isn't
   * arbitrary - it's rooted in neocortex size and cognitive capacity.
   *
   * This implementation models two key insights:
   *
   * 1. STRONG TIES vs WEAK TIES (Granovetter, "The Strength of Weak Ties", 1973)
   *    - Core connections (1-5): High strength (0.8-1.0), emotionally close
   *    - Weak ties (up to 150): Lower strength (0-0.5), but socially valuable
   *    - Strong ties provide support; weak ties provide novel information
   *
   * 2. SPATIAL PROXIMITY AS SOCIAL FOUNDATION
   *    - In oral cultures, your social network IS your geographic community
   *    - The algorithm connects nearby nodes first, modeling village structure
   *    - This creates natural clustering without imposed hierarchy
   *
   * 3. AURA IN EMBODIED SPACE (FOLLOWER ACCUMULATION)
   *    - Charismatic individuals (high aura) attract slightly more connections
   *    - BUT: Proximity dominates (you can't network beyond your village)
   *    - Aura adds ±20% to connection count, not 10x like later media
   *    - This models "village elder" or "storyteller" roles emerging naturally
   *
   * 4. CONNECTION TO ORALITY PROJECT
   *    - Embodied communication is the BASELINE for all human sociality
   *    - Technology extends reach but cannot replace face-to-face depth
   *    - The model shows: even with internet, embodied ties structure the network
   *
   * Note: Later eras ADD new connection types but PRESERVE embodied ones.
   * This reflects oral residue - the persistence of older communication modes
   * within newer technological frameworks (Ong, "Orality and Literacy").
   */
  createEmbodiedConnections() {
    const dunbar_limit = 150; // Max meaningful relationships
    const core_limit = 5; // Close friends

    this.nodes.forEach((node) => {
      // Find nearby nodes (spatial proximity in 2D)
      const nearby = this.nodes
        .filter((other) => other !== node)
        .map((other) => ({
          node: other,
          distance: this.distance2D(node.position, other.position)
        }))
        .sort((a, b) => a.distance - b.distance);

      // Aura influences connection count slightly (±20%)
      // High aura = village elder, attracts more conversations
      // Low aura = recluse, fewer connections
      const aura_modifier = 0.8 + (node.aura_strength * 0.4); // 0.8 to 1.2

      // Create core connections (strong ties)
      const base_core_count = Math.floor(this.rng() * core_limit) + 1;
      const core_count = Math.floor(base_core_count * aura_modifier);

      for (let i = 0; i < Math.min(core_count, nearby.length); i++) {
        const target = nearby[i].node;
        const strength = 0.8 + this.rng() * 0.2; // 0.8 to 1.0

        this.createEdge(node, target, 'embodied', strength);
      }

      // Create weak ties (up to Dunbar limit, also modulated by aura)
      const base_weak_count = Math.floor(this.rng() * (dunbar_limit - core_count));
      const weak_count = Math.floor(base_weak_count * aura_modifier);

      for (
        let i = core_count;
        i < Math.min(core_count + weak_count, nearby.length);
        i++
      ) {
        const target = nearby[i].node;
        const strength = this.rng() * 0.5; // 0 to 0.5

        this.createEdge(node, target, 'embodied', strength);
      }
    });
  }

  /**
   * Create print connections (readers and creators)
   *
   * FOLLOWER ACCUMULATION MECHANISM: PRINT ERA
   *
   * In the print era, follower accumulation is based on:
   * 1. LITERACY (required to create written content)
   * 2. CONTENT QUALITY (better writing attracts more readers)
   * 3. AURA (charisma translates to written voice, but degraded to 30%)
   *
   * This implements Walter Ong's insight that print doesn't eliminate orality
   * but transforms it - written "voice" still carries traces of embodied presence.
   * Benjamin's "aura" partially survives mechanical reproduction through style.
   *
   * Nodes with high (literacy × content_quality × aura) accumulate more followers.
   */
  createPrintConnections() {
    // Filter for literate nodes (potential creators)
    const literate = this.nodes.filter((n) => n.has_print_access && n.is_literate);
    const readers = this.nodes.filter((n) => n.has_print_access);

    if (literate.length === 0 || readers.length === 0) return;

    // Calculate "print appeal" for each literate node
    // Appeal = content_quality × aura_strength (30% transmission) × literacy
    literate.forEach((creator) => {
      const aura_component = creator.aura_strength * this.config.aura_transmission; // 30% for print
      const appeal = creator.content_quality * (0.5 + aura_component * 0.5);

      // Reach scales with appeal
      // Base: 50 readers, Max: 500 readers (at max appeal)
      const base_reach = 50;
      const max_bonus = 450;
      const reach = Math.floor(base_reach + (appeal * max_bonus));

      for (let i = 0; i < Math.min(reach, readers.length); i++) {
        const reader = readers[Math.floor(this.rng() * readers.length)];
        if (reader !== creator) {
          const strength = 0.3 + this.rng() * 0.3; // 0.3 to 0.6
          this.createEdge(creator, reader, 'print', strength);
        }
      }
    });
  }

  /**
   * Create broadcast connections (parasocial relationships)
   *
   * FOLLOWER ACCUMULATION MECHANISM: BROADCAST ERA
   *
   * In the broadcast era, follower accumulation is based on:
   * 1. BROADCAST ACCESS (scarce resource - technology gatekeeping)
   * 2. AURA (TV charisma, 60% transmission through mediation)
   * 3. CONTENT QUALITY (compelling programming attracts viewers)
   *
   * This models the complementary schismogenesis of mass media:
   * - Few broadcasters (access to technology)
   * - Many viewers (passive reception)
   * - Aura transmits better via broadcast (60%) than print (30%) due to
   *   voice, movement, and visual presence
   *
   * Nodes with (broadcast_access × aura × content_quality) accumulate massive followers.
   */
  createBroadcastConnections() {
    // Filter for nodes with broadcast access
    const broadcast_users = this.nodes.filter((n) => n.has_broadcast_access);

    if (broadcast_users.length === 0) return;

    // Only top 1% with highest (aura × content_quality) become broadcasters
    // This models scarcity of broadcast access (expensive equipment, licenses)
    const broadcaster_candidates = broadcast_users
      .map(n => ({
        node: n,
        appeal: (n.aura_strength * 0.6) + (n.content_quality * 0.4)
      }))
      .sort((a, b) => b.appeal - a.appeal);

    const broadcaster_count = Math.max(1, Math.floor(broadcast_users.length * 0.01));
    const potential_broadcasters = broadcaster_candidates.slice(0, broadcaster_count).map(c => c.node);
    const viewers = broadcast_users; // Everyone with broadcast access can watch

    if (potential_broadcasters.length === 0) return;

    // Calculate "broadcast appeal" for each broadcaster
    potential_broadcasters.forEach((broadcaster) => {
      const aura_component = broadcaster.aura_strength * this.config.aura_transmission; // 60% for broadcast
      const appeal = (broadcaster.content_quality * 0.4) + (aura_component * 0.6); // Aura matters more in broadcast

      // Broadcast reach is MASSIVE (one-to-many)
      // Base: 30% of viewers, Bonus: up to 50% more with high appeal
      const base_percentage = 0.3;
      const max_bonus = 0.5;
      const reach_percentage = base_percentage + (appeal * max_bonus);
      const reach_count = Math.floor(viewers.length * reach_percentage);

      for (let i = 0; i < reach_count; i++) {
        const viewer = viewers[Math.floor(this.rng() * viewers.length)];
        if (viewer !== broadcaster) {
          const strength = 0.4 + this.rng() * 0.4; // 0.4 to 0.8
          this.createEdge(broadcaster, viewer, 'broadcast', strength);
        }
      }
    });
  }

  /**
   * Create internet connections (many-to-many, topic-based)
   *
   * FOLLOWER ACCUMULATION MECHANISM: INTERNET ERA
   *
   * In the internet era, follower accumulation is based on:
   * 1. TOPIC CLUSTERING (Reddit, forums, early social networks)
   * 2. DIGITAL AURA (75% transmission - good lighting, editing, writing)
   * 3. CONTENT QUALITY (helpful posts, interesting threads)
   *
   * This models the "Web 2.0" transition:
   * - Anyone can publish (democratization of media)
   * - Communities form around shared interests (topic-based)
   * - But aura still matters - some voices rise above the noise
   * - NOT yet algorithm-driven (chronological feeds, not engagement-optimized)
   *
   * Nodes with high (digital_aura × content_quality) become "community leaders"
   * in their topic areas, accumulating more followers within niches.
   */
  createInternetConnections() {
    const users = this.nodes.filter((n) => n.has_internet_access);

    if (users.length === 0) return;

    // Simulate topic-based clustering
    const num_topics = Math.floor(users.length / 100) + 5;
    const topics = Array.from({ length: num_topics }, () => []);

    // Assign users to topics
    users.forEach((user) => {
      const num_interests = Math.floor(this.rng() * 3) + 1;
      for (let i = 0; i < num_interests; i++) {
        const topic = Math.floor(this.rng() * num_topics);
        topics[topic].push(user);
      }
    });

    // Create connections within topics
    topics.forEach((topic_users) => {
      topic_users.forEach((user) => {
        // Internet appeal = digital_aura (75%) × content_quality
        const digital_aura_component = user.digital_aura; // 75% real + 50% performed
        const appeal = (digital_aura_component * 0.5) + (user.content_quality * 0.5);

        // Connections scale with appeal
        // Base: 10 connections, Max: 100 connections at max appeal
        const base_connections = 10;
        const max_bonus = 90;
        const connections = Math.floor(base_connections + (appeal * max_bonus));

        for (let i = 0; i < Math.min(connections, topic_users.length); i++) {
          const target =
            topic_users[Math.floor(this.rng() * topic_users.length)];
          if (target !== user) {
            const strength = this.rng() * 0.6; // 0 to 0.6
            this.createEdge(user, target, 'internet', strength);
          }
        }
      });
    });
  }

  /**
   * Create algorithmic connections (engagement-optimized)
   *
   * FOLLOWER ACCUMULATION MECHANISM: ALGORITHMIC ERA
   *
   * In the algorithmic era, follower accumulation is based on:
   * 1. INFLAMMATORY CONTENT (engagement optimization - rage drives clicks)
   * 2. DIGITAL AURA (75% real + 50% performed = platform capitalism)
   * 3. POSTING FREQUENCY (algorithmic reward for constant activity)
   *
   * This implements the Orality project's critique of "aura commodification":
   * - Real aura transmits at 75% (the "25% gap")
   * - But ANYONE can perform aura at 50% effectiveness (democratized fraud)
   * - Combined with inflammatory content = toxic amplification
   * - Platform extracts 90% of revenue (surveillance capitalism)
   *
   * The algorithm doesn't care about truth, quality, or social good.
   * It optimizes for engagement = time on platform = ad revenue.
   *
   * Nodes with high (inflammatory_level × digital_aura × posting_frequency)
   * accumulate massive parasocial followers but experience burnout.
   */
  createAlgorithmicConnections() {
    const users = this.nodes.filter((n) => n.has_smartphone);

    if (users.length === 0) return;

    // Each user potentially creates content
    users.forEach((user) => {
      // Calculate "algorithmic appeal" for this user
      // Appeal = (inflammatory_level × 0.5) + (digital_aura × 0.3) + (posting_frequency × 0.2)
      const digital_aura_component = user.digital_aura; // Getter: real aura (75%) + performed (50%)
      const appeal =
        (user.inflammatory_level * 0.5) +
        (digital_aura_component * 0.3) +
        (user.posting_frequency * 0.2);

      // Reach scales EXPONENTIALLY with appeal (algorithmic amplification)
      // Base: 100 connections, Max: 1000 connections at max appeal
      const base_connections = 100;
      const max_bonus = 900;
      const connections = Math.floor(base_connections + (appeal * max_bonus));

      // Actually make the connections
      for (let i = 0; i < Math.min(connections, users.length); i++) {
        const target = users[Math.floor(this.rng() * users.length)];
        if (target !== user) {
          // Connection strength based on inflammatory content
          const is_inflammatory = user.inflammatory_level > 0.6;
          const strength = is_inflammatory
            ? 0.6 + this.rng() * 0.4 // 0.6 to 1.0
            : this.rng() * 0.5; // 0 to 0.5

          this.createEdge(user, target, 'algorithmic', strength);
        }
      }

      // If user is performing aura, accumulate performance fatigue
      if (user.performing_aura) {
        user.performance_fatigue += 0.01 * connections; // Fatigue scales with followers
      }
    });
  }

  /**
   * Create an edge and update node connection lists
   */
  createEdge(source, target, medium, strength) {
    const edge = {
      source: source.id,
      target: target.id,
      medium: medium,
      strength: strength
    };

    this.edges.push(edge);

    // Update node connection lists
    switch (medium) {
      case 'embodied':
        source.embodied_connections.push(edge);
        break;
      case 'print':
        source.print_connections.push(edge);
        break;
      case 'broadcast':
        source.broadcast_connections.push(edge);
        break;
      case 'internet':
        source.internet_connections.push(edge);
        break;
      case 'algorithmic':
        source.algorithmic_connections.push(edge);
        break;
    }
  }

  /**
   * Assign emergent roles based on follower count
   *
   * THEORETICAL FOUNDATION: EMERGENT HIERARCHY FROM NETWORK DYNAMICS
   *
   * This implements a key insight from the Orality project: social roles
   * are not pre-assigned but EMERGE from communication patterns. The role
   * thresholds reflect critical phase transitions:
   *
   * 1. CONSUMER → CREATOR (50 followers)
   *    - Exceeds immediate family/friends circle (~15-30 people)
   *    - Begins producing content for a broader audience
   *    - Still manageable within Dunbar's intimate circle (~150)
   *
   * 2. CREATOR → BROADCASTER (500 followers)
   *    - Approaches cognitive limit of maintaining relationships
   *    - Shift from personal to parasocial communication
   *    - Content creation becomes performative, not conversational
   *
   * 3. BROADCASTER → INFLUENCER (10,000 followers)
   *    - Critical mass for algorithmic amplification
   *    - Platform economics become viable (monetization threshold)
   *    - Aura commodification becomes primary value
   *
   * This also calculates reach based on role and era's aura transmission rate.
   */
  assignEmergentRoles() {
    console.log('Assigning emergent roles based on follower count...');

    // FIRST: Calculate follower counts
    // Follower = someone who receives content from this node (outgoing edges)
    const followerCounts = new Map();

    this.nodes.forEach(node => {
      followerCounts.set(node.id, 0);
    });

    // Count followers (outgoing edges where this node is the source)
    this.edges.forEach(edge => {
      const currentCount = followerCounts.get(edge.source) || 0;
      followerCounts.set(edge.source, currentCount + 1);
    });

    // Attach follower count to each node
    this.nodes.forEach(node => {
      node.follower_count = followerCounts.get(node.id) || 0;
    });

    // THEN: Determine roles based on follower count
    this.nodes.forEach(node => {
      // Use Node's built-in determineRole() method (now that follower_count is set)
      node.determineRole();

      // Calculate reach based on role and era
      node.amplified_reach = this.calculateReach(node);
    });

    // Count roles
    const roleCounts = {
      consumer: this.nodes.filter(n => n.role === 'consumer').length,
      creator: this.nodes.filter(n => n.role === 'creator').length,
      broadcaster: this.nodes.filter(n => n.role === 'broadcaster').length,
      influencer: this.nodes.filter(n => n.role === 'influencer').length
    };

    console.log(`✓ Roles assigned: ${roleCounts.consumer} consumers, ${roleCounts.creator} creators, ${roleCounts.broadcaster} broadcasters, ${roleCounts.influencer} influencers`);
  }

  /**
   * Calculate amplified reach based on node role and era technology
   *
   * THEORETICAL NOTE: TECHNOLOGY AS REACH AMPLIFIER
   *
   * Each era's communication technology extends the range of the human voice:
   * - ORAL: 50m (unaided voice projection)
   * - PRINT: 1,000s via books (spatial and temporal extension)
   * - BROADCAST: Millions via radio/TV (mass simultaneous reach)
   * - INTERNET: Billions via global network (unlimited spatial reach)
   * - ALGORITHMIC: Billions + algorithmic amplification (engagement-optimized reach)
   *
   * But reach is modulated by AURA TRANSMISSION:
   * - Oral: 100% (full embodied presence)
   * - Print: 30% (voice on page, heavily mediated)
   * - Broadcast: 60% (TV charisma, mediated but dynamic)
   * - Internet/Algorithmic: 75% (the "25% gap" phenomenon)
   *
   * Higher roles (broadcaster, influencer) get more amplification because
   * they have access to the technology's full reach potential.
   */
  calculateReach(node) {
    const baseReach = node.base_reach; // Default 50m (unaided voice)
    const auraTransmission = this.config.aura_transmission || 1.0;

    let amplification = 1; // No amplification by default

    // Role-based amplification
    switch (node.role) {
      case 'consumer':
        amplification = 1; // No amplification
        break;
      case 'creator':
        // Print era: can reach hundreds via written word
        if (this.config.print_access_rate > 0) {
          amplification = 10; // 500m effective reach
        }
        break;
      case 'broadcaster':
        // Broadcast era: can reach thousands via mass media
        if (this.config.broadcast_access_rate > 0) {
          amplification = 100; // 5,000m effective reach
        }
        break;
      case 'influencer':
        // Algorithmic era: can reach millions via social media
        if (this.config.algorithm_engagement_weight > 0) {
          amplification = 1000; // 50,000m effective reach
        }
        break;
    }

    // Apply aura transmission degradation
    // Technology amplifies reach but degrades aura fidelity
    const effectiveReach = baseReach * amplification * auraTransmission;

    return effectiveReach;
  }

  /**
   * Identify influencers based on follower count
   * Roughly 1 influencer per 1,000 people (more realistic for platform dynamics)
   *
   * NOTE: Follower counts are already calculated in assignEmergentRoles()
   */
  identifyInfluencers() {
    console.log('Identifying influencers...');

    // Determine number of influencers (1 per 1,000 people, minimum 1)
    const influencer_count = Math.max(1, Math.floor(this.nodes.length / 1000));

    // Sort nodes by follower count (already calculated in assignEmergentRoles)
    const nodesByFollowers = [...this.nodes].sort((a, b) => b.follower_count - a.follower_count);

    // Mark top N as influencers
    for (let i = 0; i < influencer_count && i < nodesByFollowers.length; i++) {
      nodesByFollowers[i].is_influencer = true;
    }

    const influencers = this.nodes.filter(n => n.is_influencer);
    console.log(`✓ Identified ${influencers.length} influencers (avg followers: ${
      influencers.length > 0 ? Math.round(influencers.reduce((sum, n) => sum + n.follower_count, 0) / influencers.length) : 0
    })`);
  }

  /**
   * Initialize schismogenesis (tribal polarization)
   * Mainly for social media and algorithmic eras
   * Influencers become tribal leaders
   *
   * THEORETICAL FOUNDATION: BATESON'S SCHISMOGENESIS APPLIED TO DIGITAL TRIBALISM
   *
   * Gregory Bateson coined "schismogenesis" in "Naven" (1936) to describe
   * progressive differentiation between groups through cumulative interaction.
   * Two types:
   *
   * 1. SYMMETRICAL SCHISMOGENESIS (Implemented here)
   *    - Both groups escalate in the SAME direction
   *    - Classic example: Arms race (we build, they build, we build more...)
   *    - Digital example: Political polarization, online flame wars
   *    - Differential equation: dX/dt = k₁·Y, dY/dt = k₂·X
   *    - Both X and Y increase together, feeding each other
   *
   * 2. COMPLEMENTARY SCHISMOGENESIS (Also implemented)
   *    - Groups differentiate in OPPOSITE directions
   *    - Classic example: Dominant/submissive, teacher/student
   *    - Digital example: Influencer/follower, broadcaster/viewer
   *    - Differential equation: dX/dt = k₁·Y, dY/dt = -k₂·X
   *    - As X increases, Y decreases, creating hierarchy
   *
   * WHY INFLUENCERS BECOME TRIBAL LEADERS:
   * - High follower counts give them amplification power
   * - Algorithmic feeds prioritize their content (engagement optimization)
   * - They set the "X" value that drives follower escalation
   * - This models how a few voices dominate discourse in algorithmic era
   *
   * CYBERNETIC INSIGHT:
   * Schismogenesis is a POSITIVE FEEDBACK LOOP - without negative feedback
   * (regulatory mechanisms), it runs away to pathological extremes. In oral
   * cultures, face-to-face communication provides natural dampening. In
   * algorithmic cultures, engagement optimization REMOVES dampening, allowing
   * runaway polarization.
   *
   * This connects to the Orality project's "Agonistic Dynamics" node - conflict
   * is natural in oral culture but BOUNDED by embodied consequences. Digital
   * agonism lacks these bounds, creating destructive spirals.
   */
  initializeSchismogenesis() {
    if (!this.config.schismogenesis_sample_rate) return;

    const participants_count = Math.floor(
      this.nodes.length * this.config.schismogenesis_sample_rate
    );

    // Get influencers to be tribal leaders
    const influencers = this.nodes.filter(n => n.is_influencer);

    // Create two tribes
    const tribe_a = [];
    const tribe_b = [];

    // Assign influencers as tribal leaders (split them between tribes)
    influencers.forEach((influencer, index) => {
      if (index % 2 === 0) {
        influencer.schismogenesis_state.tribal_affiliation = 'A';
        influencer.schismogenesis_state.is_tribal_leader = true;
        tribe_a.push(influencer);
      } else {
        influencer.schismogenesis_state.tribal_affiliation = 'B';
        influencer.schismogenesis_state.is_tribal_leader = true;
        tribe_b.push(influencer);
      }
    });

    // Fill out the rest of the tribes with regular nodes
    const remaining_slots = participants_count - influencers.length;
    for (let i = 0; i < remaining_slots / 2; i++) {
      const node_a = this.nodes[Math.floor(this.rng() * this.nodes.length)];
      const node_b = this.nodes[Math.floor(this.rng() * this.nodes.length)];

      if (
        !node_a.schismogenesis_state.tribal_affiliation &&
        node_a !== node_b
      ) {
        node_a.schismogenesis_state.tribal_affiliation = 'A';
        tribe_a.push(node_a);
      }

      if (
        !node_b.schismogenesis_state.tribal_affiliation &&
        node_b !== node_a
      ) {
        node_b.schismogenesis_state.tribal_affiliation = 'B';
        tribe_b.push(node_b);
      }
    }

    // Create positive feedback loops between tribal members
    // (symmetrical schismogenesis: both tribes escalate)
    for (let i = 0; i < Math.min(tribe_a.length, tribe_b.length); i++) {
      const loop = new FeedbackLoop(tribe_a[i], tribe_b[i], 'positive', {
        schismogenesis_type: 'symmetrical',
        k1: 0.15,
        k2: 0.15,
        medium: 'algorithmic',
        strength: 0.7
      });

      this.feedback_loops.push(loop);
    }

    const leader_count_a = tribe_a.filter(n => n.schismogenesis_state.is_tribal_leader).length;
    const leader_count_b = tribe_b.filter(n => n.schismogenesis_state.is_tribal_leader).length;

    console.log(
      `Initialized schismogenesis: Tribe A (${tribe_a.length}, ${leader_count_a} leaders), Tribe B (${tribe_b.length}, ${leader_count_b} leaders)`
    );
  }

  /**
   * Initialize double binds (algorithmic entrapment)
   * Primarily for algorithmic era
   */
  initializeDoubleBinds() {
    if (this.era !== 'algorithmic_era') return;

    const smartphone_users = this.nodes.filter((n) => n.has_smartphone);
    const trap_rate = 0.3; // 30% of smartphone users experience double bind

    smartphone_users.forEach((user) => {
      if (this.rng() < trap_rate) {
        user.double_bind.in_double_bind = true;
        user.double_bind.E = 0.5 + this.rng() * 0.5; // Escape attempts: 0.5-1.0
        user.double_bind.B = 0.6 + this.rng() * 0.4; // Blocking strength: 0.6-1.0
        user.double_bind.H = 0.5 + this.rng() * 0.3; // Homeostatic capacity: 0.5-0.8
      }
    });

    const trapped_count = smartphone_users.filter(
      (n) => n.double_bind.in_double_bind
    ).length;
    console.log(`Initialized double binds: ${trapped_count} users trapped`);
  }

  /**
   * Check if two nodes have an embodied connection between them
   */
  hasEmbodiedConnectionBetween(nodeA, nodeB) {
    // Check if nodeA has an embodied connection to nodeB
    const hasConnection = this.edges.some((edge) =>
      edge.medium === 'embodied' &&
      ((edge.source === nodeA.id && edge.target === nodeB.id) ||
       (edge.source === nodeB.id && edge.target === nodeA.id))
    );
    return hasConnection;
  }

  /**
   * Calculate 2D distance between two points (ignoring z)
   */
  distance2D(a, b) {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    );
  }

  /**
   * Calculate 3D distance between two points
   */
  distance3D(a, b) {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
    );
  }

  /**
   * Update simulation (run one time step)
   */
  update(dt = 1) {
    // Generate content flowing through the network
    this.generateContent();

    // Update all nodes
    this.nodes.forEach((node) => node.update(dt));

    // Execute feedback loops
    this.feedback_loops.forEach((loop) => loop.execute());
  }

  /**
   * Generate content that flows through the network
   * This drives cognitive load and emotional responses
   * Influencers produce 90% inflammatory content
   *
   * PLATFORM EXTRACTION MECHANICS (Algorithmic Era):
   *
   * In the algorithmic era, content generation creates revenue through engagement.
   * The platform extracts 90% of this revenue, giving creators only 10%.
   * This models surveillance capitalism's extractive dynamics.
   *
   * Revenue calculation:
   * - Base revenue = follower_count × engagement_rate × content_frequency
   * - Platform takes 90% (extraction_rate from config)
   * - Creator gets 10% (often insufficient for living wage = precarity)
   *
   * This creates a toxic loop:
   * 1. Need money → post more inflammatory content
   * 2. Inflammatory content → more engagement → more fatigue
   * 3. Fatigue → burnout → follower loss → need more money
   * 4. Cycle repeats until pathological adaptation or exit
   */
  generateContent() {
    // Content generation rate depends on era
    const content_rate = this.config.inflammatory_content_ratio || 0.1;
    const num_contents = Math.floor(this.nodes.length * content_rate * 0.01);

    for (let i = 0; i < num_contents; i++) {
      // Pick a random creator or broadcaster
      const creators = this.nodes.filter(
        (n) => n.role === 'creator' || n.role === 'broadcaster' || n.role === 'influencer'
      );

      if (creators.length === 0) continue;

      const creator = creators[Math.floor(Math.random() * creators.length)];

      // Create content
      // Influencers produce 90% inflammatory content
      const inflammatory_rate = creator.is_influencer ? 0.9 : content_rate;
      const is_inflammatory = Math.random() < inflammatory_rate;

      const content = {
        type: is_inflammatory ? 'ragebait' : 'normal',
        information_value: is_inflammatory ? -0.5 : Math.random() * 0.3,
        trust_value: creator.role === 'broadcaster' ? 0.7 : 0.5,
        actionable: Math.random() < 0.3,
        challenges_understanding: Math.random() < 0.2
      };

      // Distribute to connected nodes
      const connections = [
        ...creator.embodied_connections,
        ...creator.print_connections,
        ...creator.broadcast_connections,
        ...creator.internet_connections,
        ...creator.algorithmic_connections
      ];

      // Add content to random subset of connections
      const reach = Math.min(connections.length, Math.floor(Math.random() * 50) + 10);
      for (let j = 0; j < reach; j++) {
        const edge = connections[Math.floor(Math.random() * connections.length)];
        if (edge) {
          const target_node = this.nodes[edge.target];
          if (target_node && target_node.information_buffer) {
            target_node.information_buffer.push(content);
          }
        }
      }

      // PLATFORM EXTRACTION (Algorithmic era only)
      if (this.era === 'algorithmic_era' && creator.follower_count > 0) {
        // Calculate engagement-based revenue
        // More followers + inflammatory content = more engagement = more revenue
        const engagement_multiplier = is_inflammatory ? 2.0 : 1.0;
        const base_revenue_per_follower = 0.001; // $0.001 per follower per post (CPM model)
        const gross_revenue = creator.follower_count * base_revenue_per_follower * engagement_multiplier;

        // Platform extraction (90% to platform, 10% to creator)
        const platform_cut = gross_revenue * (this.config.platform_extraction_rate || 0.9);
        const creator_cut = gross_revenue - platform_cut;

        // Track revenue
        creator.platform_revenue_generated += gross_revenue;
        creator.personal_revenue += creator_cut;

        // Check if creator can escape financial precarity
        // Assume $30k/year minimum = ~$2.5k/month for viability
        const monthly_revenue_estimate = creator.personal_revenue * 30; // Rough estimate
        if (monthly_revenue_estimate > 2500) {
          creator.financial_precarity = false;
        } else {
          creator.financial_precarity = true;
        }

        // Performance fatigue accumulates with posting frequency
        if (creator.performing_aura) {
          creator.performance_fatigue += 0.005; // Small increment per post
        }
      }
    }
  }

  /**
   * Calculate network metrics
   */
  getMetrics() {
    const metrics = {
      // Cognitive health
      avg_cognitive_load: this.average(
        this.nodes.map((n) => n.cognitive_load)
      ),
      percent_overloaded:
        this.nodes.filter((n) => n.cognitive_load > n.cognitive_capacity)
          .length / this.nodes.length,

      // Homeostasis
      percent_within_homeostatic_range:
        this.nodes.filter((n) => n.within_homeostatic_range).length /
        this.nodes.length,
      avg_regulatory_capacity: this.average(
        this.nodes.map((n) => n.regulatory_capacity)
      ),

      // Trust
      avg_trust_coherence: this.average(
        this.nodes.map((n) => n.trust_coherence)
      ),

      // Connections
      avg_embodied_connections: this.average(
        this.nodes.map((n) => n.embodied_connections.length)
      ),
      avg_parasocial_connections: this.average(
        this.nodes.map((n) => n.getParasocialConnections())
      ),

      // Emotional state
      avg_emotional_agitation: this.average(
        this.nodes.map((n) => n.emotional_state)
      ),

      // Schismogenesis
      tribal_polarization: this.calculateTribalPolarization(),

      // Double binds
      percent_in_double_bind:
        this.nodes.filter((n) => n.double_bind.in_double_bind).length /
        this.nodes.length,
      percent_pathological:
        this.nodes.filter((n) => n.double_bind.pathological_adaptation).length /
        this.nodes.length,

      // Influencers
      influencer_count: this.nodes.filter((n) => n.is_influencer).length,
      avg_influencer_followers: this.calculateAvgInfluencerFollowers()
    };

    return metrics;
  }

  /**
   * Calculate average follower count for influencers
   */
  calculateAvgInfluencerFollowers() {
    const influencers = this.nodes.filter(n => n.is_influencer);
    if (influencers.length === 0) return 0;

    const totalFollowers = influencers.reduce((sum, n) => sum + n.follower_count, 0);
    return Math.round(totalFollowers / influencers.length);
  }

  /**
   * Calculate tribal polarization
   */
  calculateTribalPolarization() {
    const tribal_nodes = this.nodes.filter(
      (n) => n.schismogenesis_state.tribal_affiliation
    );
    if (tribal_nodes.length === 0) return 0;

    return this.average(tribal_nodes.map((n) => n.schismogenesis_state.X));
  }

  /**
   * Calculate average of array
   */
  average(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }
}

export default NetworkGenerator;
