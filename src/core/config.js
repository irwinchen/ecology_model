/**
 * config.js
 *
 * THEORETICAL FOUNDATION: MEDIA ECOLOGY AND THE EVOLUTION OF COMMUNICATION
 *
 * This configuration file encodes the core thesis of the Orality project:
 * that different communication technologies create fundamentally different
 * "ecologies of mind" (Bateson), with measurable psychological consequences.
 *
 * THEORETICAL FRAMEWORKS:
 *
 * 1. WALTER ONG - "Orality and Literacy" (1982)
 *    - Primary orality: Cultures with no knowledge of writing
 *      * Aggregative, redundant, conservative, homeostatic
 *      * Empathetic, participatory, situational
 *    - Secondary orality: Electronic media recreate oral dynamics
 *      * Broadcast, internet create "global village" (McLuhan)
 *      * But lack embodied grounding of primary orality
 *
 * 2. MARSHALL McLUHAN - "Understanding Media" (1964)
 *    - "The medium is the message" - technology shapes consciousness
 *    - Media as extensions of human faculties
 *    - Hot media (high definition) vs Cool media (low definition, high participation)
 *    - Print: Hot, linear, individualistic
 *    - Television: Cool, participatory, tribal
 *
 * 3. ERIC HAVELOCK - "Preface to Plato" (1963)
 *    - Literacy creates analytical, abstract thinking
 *    - Orality privileges memory, rhythm, performance
 *    - The transition fundamentally reorganizes consciousness
 *
 * 4. ELIZABETH EISENSTEIN - "The Printing Press as an Agent of Change" (1979)
 *    - Print enables: Standardization, fixity, dissemination
 *    - Creates modern individualism, scientific method, nationalism
 *    - But fragments oral community structures
 *
 * ERA PROGRESSION IN THIS MODEL:
 *
 * Each era is NOT a replacement but a LAYERING. Later eras contain earlier modes
 * as "oral residue" (Ong). The parameters encode:
 *
 * - Population scale (villages → cities → global)
 * - Literacy rates (0% → 98%)
 * - Technology access (embodied → print → broadcast → internet → algorithmic)
 * - Information flow characteristics (slow, grounded → fast, decontextualized)
 * - Inflammatory content ratios (natural agonism → optimized outrage)
 * - Feedback loop dynamics (negative → positive dominance)
 *
 * WHY THESE SPECIFIC PARAMETERS?
 *
 * Each parameter is grounded in historical research and theoretical principles:
 * - Literacy rates: Historical estimates from UNESCO, Eisenstein
 * - Inflammatory content: Models "engagement optimization" in algorithmic era
 * - Schismogenesis rates: Represents tribal polarization in social media
 * - Reach multipliers: Each simulated node represents multiple actual people
 *
 * THE CORE ARGUMENT:
 *
 * Human regulatory capacity (homeostasis, cognitive limits) evolved for oral
 * communication. Each technological transition STRAINS these mechanisms further,
 * until the algorithmic era OVERWHELMS them entirely.
 *
 * This is not technological determinism - humans adapt! But adaptation has costs.
 * The model quantifies those costs through metrics like:
 * - Percent within homeostatic range
 * - Percent in double bind stress
 * - Tribal polarization levels
 * - Cognitive overload rates
 *
 * Configuration as argument: The numbers tell the story of what we've lost and
 * gained in the transition from face-to-face village life to algorithmically-
 * mediated global communication.
 */

/**
 * AURA TRANSMISSION RATES ACROSS MEDIA
 *
 * THEORETICAL FOUNDATION: Benjamin's "Aura" + Digital Mediation
 *
 * How much of embodied aura transmits through different media:
 * - 1.0 (100%): Face-to-face, full embodied presence
 * - 0.75 (75%): Digital media (the "25% better online" effect)
 * - 0.60 (60%): Broadcast (TV charisma, mediated but dynamic)
 * - 0.30 (30%): Print (voice on page, heavily mediated)
 *
 * This explains:
 * - Why meeting influencers IRL often disappoints (25% gap)
 * - Why some people "work" on camera better than others
 * - Why we still value in-person conferences despite Zoom
 */
export const AURA_TRANSMISSION = {
  oral: 1.0,        // 100% - full embodied presence (Benjamin's "aura")
  print: 0.3,       // 30% - "voice on page" (heavily mediated)
  broadcast: 0.6,   // 60% - TV charisma (mediated but dynamic)
  internet: 0.75,   // 75% - good lighting/editing helps
  algorithmic: 0.75 // 75% - same as internet, but AMPLIFIED + EXTRACTED
};

/**
 * FOLLOWER COUNT THRESHOLDS FOR ROLE CLASSIFICATION
 *
 * THEORETICAL FOUNDATION: Dunbar's number + cognitive limits
 *
 * Roles emerge from follower accumulation:
 * - Consumer (0-50): Local social circle
 * - Creator (50-500): Beyond immediate circle, manageable feedback
 * - Broadcaster (500-10k): Beyond Dunbar limit, parasocial dominant
 * - Influencer (10k+): Algorithmic amplification, platform-dependent
 */
export const ROLE_THRESHOLDS = {
  creator: 50,      // Beyond family/friends
  broadcaster: 500, // Approaching Dunbar limit
  influencer: 10000 // Critical mass for platform economics
};

export const ERA_CONFIGS = {
  oral_culture: {
    era_name: 'Oral Culture',
    population_size: 1500, // +500 to model multiple separate villages
    literacy_rate: 0,
    print_access_rate: 0,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.1, // Natural agonism

    // Aura fully works in oral culture
    aura_transmission: AURA_TRANSMISSION.oral,

    // Guaranteed minimums (not needed for oral - everyone is a creator)
    min_creators: 0,

    // Rendering optimization
    edge_render_sample: 1.0, // Render all edges (manageable count)

    // Reach multipliers (oral is 1:1, no amplification)
    reach_multiplier: 1
  },

  early_print: {
    era_name: 'Early Print',
    population_size: 2000, // +1000 to get enough literate people
    literacy_rate: 0.15,
    print_access_rate: 0.15,
    print_medium: 'book',
    institutional_trust: 0.8,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.15,

    // Aura partially captured in print (voice on page)
    aura_transmission: AURA_TRANSMISSION.print,

    // Guaranteed minimums for rare roles
    min_creators: 8, // Ensure at least 8 print creators (authors, publishers)
    min_literate: 300, // Ensure minimum literate population

    // Rendering optimization
    edge_render_sample: 0.8, // Render 80% of edges

    // Reach multipliers (each simulated reader represents 5 actual readers)
    reach_multiplier: 5
  },

  mass_print: {
    era_name: 'Mass Print',
    population_size: 2500, // Increased for literacy diversity
    literacy_rate: 0.7,
    print_access_rate: 0.7,
    print_medium: 'mixed', // newspapers, magazines, books
    institutional_trust: 0.7,
    broadcast_access_rate: 0,
    internet_access_rate: 0,
    smartphone_rate: 0,
    inflammatory_content_ratio: 0.25, // Pamphlets, yellow journalism

    // Aura still limited by print medium
    aura_transmission: AURA_TRANSMISSION.print,

    // Guaranteed minimums
    min_creators: 20, // More creators in mass print era

    // Rendering optimization
    edge_render_sample: 0.6, // Render 60% of edges

    // Reach multipliers (newspapers reach beyond the graph)
    reach_multiplier: 10
  },

  broadcast_era: {
    era_name: 'Broadcast Era',
    population_size: 4000, // +1000 for better broadcast dynamics
    literacy_rate: 0.9,
    print_access_rate: 0.85,
    broadcast_access_rate: 0.85,
    internet_access_rate: 0,
    smartphone_rate: 0,
    institutional_trust: 0.65,
    inflammatory_content_ratio: 0.3,

    // Aura works better through broadcast (TV charisma)
    aura_transmission: AURA_TRANSMISSION.broadcast,

    // Guaranteed minimums
    min_broadcasters: 12, // CRITICAL: ensure we have actual broadcasters
    min_creators: 30, // Print creators still exist

    // Rendering optimization
    edge_render_sample: 0.4, // Render 40% of edges

    // Reach multipliers (broadcasters reach millions beyond the graph)
    reach_multiplier: 50,
    broadcast_reach_multiplier: 1000
  },

  early_internet: {
    era_name: 'Early Internet',
    population_size: 4000,
    literacy_rate: 0.95,
    print_access_rate: 0.9,
    broadcast_access_rate: 0.9,
    internet_access_rate: 0.5,
    smartphone_rate: 0.1,
    institutional_trust: 0.5,
    inflammatory_content_ratio: 0.4,

    // Aura transmits well through internet (75%)
    aura_transmission: AURA_TRANSMISSION.internet,

    // Guaranteed minimums
    min_creators: 50, // More online creators
    min_broadcasters: 10,

    // Rendering optimization
    edge_render_sample: 0.3, // Render 30% of edges

    // Reach multipliers
    reach_multiplier: 20,
    broadcast_reach_multiplier: 1000
  },

  social_media: {
    era_name: 'Social Media',
    population_size: 6000, // +1000 for better tribal dynamics
    literacy_rate: 0.98,
    print_access_rate: 0.8,
    broadcast_access_rate: 0.9,
    internet_access_rate: 0.85,
    smartphone_rate: 0.75,
    institutional_trust: 0.3,
    inflammatory_content_ratio: 0.6,
    algorithm_engagement_weight: 0.5,

    // Aura still transmits but competes with engagement metrics
    aura_transmission: AURA_TRANSMISSION.internet,

    // Guaranteed minimums
    min_creators: 100,

    // Rendering optimization (CRITICAL for performance)
    use_top_edges_only: true, // Render only the strongest N edges
    max_rendered_edges: 12000, // Render top 12k strongest edges

    // Legacy (not used when use_top_edges_only is true)
    edge_render_sample: 0.2,
    edge_strength_threshold: 0.3,

    // Schismogenesis sampling
    schismogenesis_sample_rate: 0.05, // 5% of each tribe participates

    // Reach multipliers
    reach_multiplier: 10,
    viral_multiplier: 100 // Viral content reaches 100x
  },

  algorithmic_era: {
    era_name: 'Algorithmic Era',
    population_size: 8000, // +3000 for city-scale feeling
    literacy_rate: 0.98,
    print_access_rate: 0.7,
    broadcast_access_rate: 0.85,
    internet_access_rate: 0.9,
    smartphone_rate: 0.88,
    institutional_trust: 0.2,
    inflammatory_content_ratio: 0.8, // Algorithm selects for it
    algorithm_engagement_weight: 0.9, // Maximum optimization

    // Aura commodified: 75% transmission but must compete with inflammatory content
    // Can be performed (filters, editing, persona management)
    // Platform extracts most value
    aura_transmission: AURA_TRANSMISSION.algorithmic,
    aura_performance_enabled: true, // Anyone can perform aura (economic necessity)
    platform_extraction_rate: 0.9,  // Platform keeps 90% of revenue

    // Guaranteed minimums
    min_creators: 200,

    // Rendering optimization (CRITICAL for performance)
    use_top_edges_only: true, // Render only the strongest N edges (ignores sampling)
    max_rendered_edges: 5000, // Reduced from 15k to prevent GPU overload (3.6M total edges)
    use_lod: true, // Use level-of-detail rendering
    lod_distance_near: 50, // Full detail within 50 units
    lod_distance_far: 200, // Point sprites beyond 200 units

    // Legacy (not used when use_top_edges_only is true)
    edge_render_sample: 0.05,
    edge_strength_threshold: 0.6,

    // Schismogenesis sampling
    schismogenesis_sample_rate: 0.03, // 3% participate (still 240 nodes)

    // Reach multipliers
    reach_multiplier: 5,
    viral_multiplier: 500, // Algorithmic amplification

    // Enable WebGL optimizations
    use_instanced_rendering: true,
    use_compute_shaders: false // Not available in three.js
  }
};

/**
 * Ensure rare roles meet minimum counts
 */
export function ensureMinimumRoles(nodes, config) {
  // Count current roles
  const counts = {
    creators: nodes.filter((n) => n.role === 'creator').length,
    broadcasters: nodes.filter((n) => n.role === 'broadcaster').length,
    literate: nodes.filter((n) => n.is_literate).length
  };

  // Promote nodes to meet creator minimum
  if (config.min_creators && counts.creators < config.min_creators) {
    const needed = config.min_creators - counts.creators;
    const candidates = nodes.filter(
      (n) => n.is_literate && n.role !== 'creator'
    );
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].role = 'creator';
    }
  }

  // Promote nodes to meet broadcaster minimum
  if (config.min_broadcasters && counts.broadcasters < config.min_broadcasters) {
    const needed = config.min_broadcasters - counts.broadcasters;
    const candidates = nodes.filter(
      (n) => n.has_broadcast_access && n.role !== 'broadcaster'
    );
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].role = 'broadcaster';
    }
  }

  // Promote nodes to meet literate minimum
  if (config.min_literate && counts.literate < config.min_literate) {
    const needed = config.min_literate - counts.literate;
    const candidates = nodes.filter((n) => !n.is_literate);
    for (let i = 0; i < Math.min(needed, candidates.length); i++) {
      candidates[i].is_literate = true;
      candidates[i].has_print_access = true;
    }
  }
}

/**
 * Apply reach multipliers when counting impact
 */
export function calculateActualReach(
  simulated_reach,
  config,
  content_type = 'normal'
) {
  let multiplier = config.reach_multiplier || 1;

  // Apply special multipliers for broadcast and viral content
  if (content_type === 'broadcast' && config.broadcast_reach_multiplier) {
    multiplier = config.broadcast_reach_multiplier;
  } else if (content_type === 'viral' && config.viral_multiplier) {
    multiplier = config.viral_multiplier;
  }

  return simulated_reach * multiplier;
}

/**
 * Determine which edges to render based on config
 */
export function shouldRenderEdge(edge, camera_distance, config) {
  // Check render sample rate
  if (Math.random() > config.edge_render_sample) {
    return false;
  }

  // Check strength threshold
  if (
    config.edge_strength_threshold &&
    edge.strength < config.edge_strength_threshold
  ) {
    return false;
  }

  // Check LOD
  if (config.use_lod && camera_distance > config.lod_distance_far) {
    return false; // Too far, don't render
  }

  return true;
}

/**
 * Get appropriate edge representation for distance
 */
export function getEdgeRepresentation(edge, camera_distance, config) {
  if (!config.use_lod) {
    return 'full'; // Full edge geometry
  }

  if (camera_distance < config.lod_distance_near) {
    return 'full'; // Full edge with lighting, anti-aliasing
  } else if (camera_distance < config.lod_distance_far) {
    return 'simple'; // Simple line, no lighting
  } else {
    return 'point'; // Just two points
  }
}

/**
 * Force-directed layout configuration
 *
 * THEORETICAL GROUNDING: SPATIAL METAPHOR FOR SOCIAL TOPOLOGY
 *
 * These attraction forces encode a fundamental argument about the nature of
 * different communication media:
 *
 * 1. EMBODIED (0.4): Strongest pull
 *    - Face-to-face relationships create ACTUAL social gravity
 *    - Spatial proximity in visualization = social affinity in reality
 *    - This is the baseline for all human sociality (Dunbar)
 *
 * 2. PRINT (0.2): Medium pull
 *    - Shared literacy creates interpretive communities (Fish)
 *    - But it's mediated, asynchronous, lacks embodied feedback
 *    - Creates "imagined communities" (Anderson) weaker than villages
 *
 * 3. BROADCAST (0.1): Weak pull, asymmetric
 *    - Parasocial relationships FEEL meaningful but lack reciprocity
 *    - Viewers cluster around broadcaster (hub-and-spoke)
 *    - No mutual pull between viewers
 *
 * 4. INTERNET (0.15): Conditional pull
 *    - Only creates clustering if grounded in embodied relationships
 *    - Otherwise 75% have NO spatial pull (see NetworkGenerator)
 *    - Models: Online communities that meet IRL vs pure digital connections
 *
 * 5. ALGORITHMIC (0.0): ZERO pull
 *    - Engagement-optimized connections don't create social coherence
 *    - You can have 10,000 "followers" and feel utterly alone
 *    - The algorithm shows you what increases engagement, not what builds community
 *    - Hence: No spatial pull, no clustering, no social gravity
 *
 * WHY THIS MATTERS:
 *
 * The visualization REVEALS the actual social topology hidden beneath the
 * inflated metrics of digital "connection." When you run the model:
 *
 * - Oral culture: Tight clusters (villages)
 * - Print era: Clusters with some dispersion
 * - Broadcast era: Stars (broadcasters with viewer constellations)
 * - Internet era: Dispersed with some clustering
 * - Algorithmic era: Maximum dispersion (despite maximum "connections")
 *
 * More "connections" ≠ more social coherence. Often the opposite.
 * This is McLuhan's "the medium is the message" made computational.
 */
export const FORCE_LAYOUT_CONFIG = {
  // Force strengths by connection medium
  // These values encode theoretical claims about media's social cohesion capacity
  attraction_forces: {
    embodied: 0.4,      // Strong pull - tight clusters (face-to-face creates real bonds)
    print: 0.2,         // Medium pull (shared literacy creates community, but mediated)
    broadcast: 0.1,     // Weak pull - hub-and-spoke (parasocial, asymmetric)
    internet: 0.15,     // Medium pull (only 25% active, or if grounded in embodied)
    algorithmic: 0.0    // NO pull - engagement ≠ social gravity
  },

  // Repulsion between all nodes (prevents overlap)
  repulsion_strength: 2000,  // Extremely strong repulsion for crowded later eras
  repulsion_distance: 500,   // Extremely large repulsion range

  // Layout parameters
  iterations: 300,           // Number of simulation steps
  cooling_factor: 0.95,      // Velocity damping per iteration
  initial_temperature: 500,  // Extremely high initial movement energy

  // Distance threshold for edge rendering
  edge_distance_threshold: 150,  // < threshold = straight, >= threshold = curved

  // Plane boundaries (optional)
  use_boundaries: false,
  boundary_size: 2000        // Increased boundary size for larger spread
};

export default ERA_CONFIGS;
