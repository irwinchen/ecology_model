/**
 * NetworkGenerator.js
 *
 * Generates communication networks for different eras
 * implementing Bateson's cybernetic models.
 */

import Node from './Node.js';
import FeedbackLoop from './FeedbackLoop.js';
import { ERA_CONFIGS, ensureMinimumRoles, FORCE_LAYOUT_CONFIG } from './config.js';

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
   */
  generate() {
    console.log(`Generating ${this.config.era_name} network...`);

    // Step 1: Create nodes
    this.createNodes();

    // Step 2: Ensure minimum role counts
    ensureMinimumRoles(this.nodes, this.config);

    // Step 3: Initialize random positions first
    this.initializePositions();

    // Step 4: Create connections based on era
    this.createConnections();

    // Step 5: Identify influencers (nodes with most followers)
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

      // Assign role
      if (node.has_broadcast_access && this.rng() < 0.001) {
        node.role = 'broadcaster'; // Very rare
      } else if (node.is_literate && this.rng() < 0.01) {
        node.role = 'creator'; // Rare
      } else {
        node.role = 'consumer'; // Most common
      }

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
      if (edge.medium === 'internet') {
        // Check if these nodes also have an embodied connection
        const key = `${edge.source}-${edge.target}`;
        const hasEmbodiedConnection = embodiedMap.has(key);

        if (!hasEmbodiedConnection) {
          // Only 25% of non-embodied internet connections have pull
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

      // Create core connections (strong ties)
      const core_count = Math.floor(this.rng() * core_limit) + 1;
      for (let i = 0; i < Math.min(core_count, nearby.length); i++) {
        const target = nearby[i].node;
        const strength = 0.8 + this.rng() * 0.2; // 0.8 to 1.0

        this.createEdge(node, target, 'embodied', strength);
      }

      // Create weak ties (up to Dunbar limit)
      const weak_count = Math.floor(this.rng() * (dunbar_limit - core_count));
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
   */
  createPrintConnections() {
    const creators = this.nodes.filter((n) => n.role === 'creator');
    const readers = this.nodes.filter((n) => n.has_print_access);

    creators.forEach((creator) => {
      // Each creator reaches some readers
      const reach = Math.floor(this.rng() * 300) + 50; // 50-350 readers

      for (let i = 0; i < Math.min(reach, readers.length); i++) {
        const reader = readers[Math.floor(this.rng() * readers.length)];
        const strength = 0.3 + this.rng() * 0.3; // 0.3 to 0.6

        this.createEdge(creator, reader, 'print', strength);
      }
    });
  }

  /**
   * Create broadcast connections (parasocial relationships)
   */
  createBroadcastConnections() {
    const broadcasters = this.nodes.filter((n) => n.role === 'broadcaster');
    const viewers = this.nodes.filter((n) => n.has_broadcast_access);

    broadcasters.forEach((broadcaster) => {
      // Each broadcaster reaches many viewers (one-to-many)
      const reach_percentage = 0.3 + this.rng() * 0.5; // 30-80% of viewers
      const reach_count = Math.floor(viewers.length * reach_percentage);

      for (let i = 0; i < reach_count; i++) {
        const viewer = viewers[Math.floor(this.rng() * viewers.length)];
        const strength = 0.4 + this.rng() * 0.4; // 0.4 to 0.8

        this.createEdge(broadcaster, viewer, 'broadcast', strength);
      }
    });
  }

  /**
   * Create internet connections (many-to-many, topic-based)
   */
  createInternetConnections() {
    const users = this.nodes.filter((n) => n.has_internet_access);

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
        const connections = Math.floor(this.rng() * 50) + 10; // 10-60 connections
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
   */
  createAlgorithmicConnections() {
    const users = this.nodes.filter((n) => n.has_smartphone);

    users.forEach((user) => {
      // Algorithm optimizes for engagement (inflammatory content)
      const connections = Math.floor(this.rng() * 500) + 100; // 100-600 connections

      for (let i = 0; i < Math.min(connections, users.length); i++) {
        const target = users[Math.floor(this.rng() * users.length)];
        if (target !== user) {
          // Higher strength for inflammatory content
          const is_inflammatory = this.rng() < this.config.inflammatory_content_ratio;
          const strength = is_inflammatory
            ? 0.6 + this.rng() * 0.4 // 0.6 to 1.0
            : this.rng() * 0.5; // 0 to 0.5

          this.createEdge(user, target, 'algorithmic', strength);
        }
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
   * Identify influencers based on follower count
   * Roughly 1 influencer per 10,000 people
   */
  identifyInfluencers() {
    console.log('Identifying influencers...');

    // Calculate follower count for each node
    // Follower = someone who receives content from this node
    const followerCounts = new Map();

    this.nodes.forEach(node => {
      followerCounts.set(node.id, 0);
    });

    // Count followers (incoming edges where this node is the source)
    this.edges.forEach(edge => {
      const currentCount = followerCounts.get(edge.source) || 0;
      followerCounts.set(edge.source, currentCount + 1);
    });

    // Attach follower count to each node
    this.nodes.forEach(node => {
      node.follower_count = followerCounts.get(node.id) || 0;
    });

    // Determine number of influencers (1 per 10,000 people, minimum 1)
    const influencer_count = Math.max(1, Math.floor(this.nodes.length / 10000));

    // Sort nodes by follower count
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
   */
  generateContent() {
    // Content generation rate depends on era
    const content_rate = this.config.inflammatory_content_ratio || 0.1;
    const num_contents = Math.floor(this.nodes.length * content_rate * 0.01);

    for (let i = 0; i < num_contents; i++) {
      // Pick a random creator or broadcaster
      const creators = this.nodes.filter(
        (n) => n.role === 'creator' || n.role === 'broadcaster'
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
