/**
 * config.js
 *
 * Configuration presets for different communication eras.
 * Hybrid strategy optimized for maximum accessibility (three.js → Unity WebGL).
 */

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

    // Guaranteed minimums
    min_creators: 200,

    // Rendering optimization (CRITICAL for performance)
    use_top_edges_only: true, // Render only the strongest N edges (ignores sampling)
    max_rendered_edges: 15000, // Render top 15k strongest edges
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
 */
export const FORCE_LAYOUT_CONFIG = {
  // Force strengths by connection medium
  attraction_forces: {
    embodied: 0.5,      // Strong pull - tight clusters (reduced for larger networks)
    print: 0.25,        // Medium pull (reduced)
    broadcast: 0.15,    // Weak pull - hub-and-spoke (reduced)
    internet: 0.2,      // Medium pull (only 25% active, or if also embodied) (reduced)
    algorithmic: 0.0    // NO pull - doesn't affect spatial layout
  },

  // Repulsion between all nodes (prevents overlap)
  repulsion_strength: 800,   // Strong repulsion for 8k nodes
  repulsion_distance: 200,   // Large repulsion range

  // Layout parameters
  iterations: 300,           // Number of simulation steps
  cooling_factor: 0.95,      // Velocity damping per iteration
  initial_temperature: 200,  // High initial movement energy

  // Distance threshold for edge rendering
  edge_distance_threshold: 150,  // < threshold = straight, >= threshold = curved

  // Plane boundaries (optional)
  use_boundaries: false,
  boundary_size: 1000
};

export default ERA_CONFIGS;
