/**
 * Visualizer.js
 *
 * THEORETICAL FOUNDATION: VISUALIZATION AS EPISTEMOLOGY
 *
 * This module transforms abstract network data into visual form. But visualization
 * is never neutral - it's an argument about what matters and how to see it.
 *
 * KEY THEORETICAL COMMITMENTS:
 *
 * 1. TUFTE'S PRINCIPLES ("The Visual Display of Quantitative Information", 1983)
 *    - Maximize data-ink ratio (remove chartjunk)
 *    - Flat circles, simple lines - no unnecessary decoration
 *    - Color encodes meaning (role, medium type)
 *    - Size encodes importance (follower count, role hierarchy)
 *
 * 2. BATESON'S "DIFFERENCE THAT MAKES A DIFFERENCE"
 *    - What we choose to visualize reflects what we consider significant
 *    - Node size: Role hierarchy + follower count = influence
 *    - Edge opacity: Connection strength = relationship depth
 *    - Spatial layout: Physical proximity = social affinity
 *    - These are CLAIMS about what constitutes meaningful difference
 *
 * 3. SPATIAL METAPHOR AS ANALYTICAL TOOL
 *    - We use space to represent social distance (conceptual blending)
 *    - This is not arbitrary - spatial cognition is fundamental to human thought
 *    - "Close friend," "distant relative," "social circles" - language reveals
 *      the deep metaphor linking space and relationship
 *    - The force-directed layout MATERIALIZES this metaphor
 *
 * 4. STRATIFIED SAMPLING AS FAIR REPRESENTATION
 *    - With 8,000 nodes and millions of edges, we can't render everything
 *    - Naive random sampling would oversample common connections (algorithmic)
 *    - Stratified sampling ensures ALL media types are represented proportionally
 *    - This is an epistemological choice: preserve diversity over raw frequency
 *
 * DESIGN DECISIONS AND THEIR RATIONALES:
 *
 * A. FLAT 2D CIRCLES (Sprites)
 *    - Academic aesthetic (not game-like or flashy)
 *    - Echoes scientific diagrams (molecular, social network diagrams)
 *    - Simplicity focuses attention on structure, not rendering
 *
 * B. COLOR CODING BY ROLE AND MEDIUM
 *    - Influencers: Purple (royalty, prominence)
 *    - Creators: Gold (value creation)
 *    - Broadcasters: Red (attention, broadcast)
 *    - Consumers: Teal (majority, calm)
 *    - Each medium type has distinct color
 *    - Allows pattern recognition at a glance
 *
 * C. CURVED vs STRAIGHT EDGES
 *    - Short connections: Straight (local, tight)
 *    - Long connections: Curved (distant, reaching across network)
 *    - Visual metaphor: Tension in long-distance relationships
 *    - Aesthetic: Reduces visual clutter from crossing lines
 *
 * D. OPACITY MAPPING
 *    - Strength-based opacity: Strong ties visible, weak ties fade
 *    - Power curve (strength^0.7) emphasizes strong connections
 *    - Reveals the "skeleton" of the network (core structure)
 *    - Weak ties recede (they're there, but not dominant visually)
 *
 * E. DYNAMIC VISUAL STATES
 *    - Cognitive overload: Node pulses, grows
 *    - Double bind stress: Pulsing animation
 *    - Emotional agitation: Increased opacity
 *    - The visualization SHOWS the psychological state of the system
 *
 * CONNECTION TO ORALITY PROJECT:
 *
 * The visualization makes visible what's normally invisible: the ECOLOGY of
 * communication. You can SEE:
 * - How oral culture forms tight clusters (villages)
 * - How print creates dispersed but connected communities
 * - How broadcast creates star patterns (celebrity hubs)
 * - How internet fragments into topic islands
 * - How algorithmic era creates dispersion despite maximum "connection"
 *
 * This is "Living Memory" (Orality project node) - the network diagram becomes
 * a shared artifact for thinking about communication structure. It externalizes
 * the invisible ecology, making it available for collective reflection.
 *
 * EPISTEMOLOGICAL HUMILITY:
 *
 * All visualization is simplification. We're collapsing high-dimensional
 * complexity into 2D space and color. What's lost:
 * - Temporal dynamics (we show a snapshot, not evolution)
 * - Individual variation (nodes are stereotyped by role)
 * - Nuance of relationship quality (reduced to strength number)
 *
 * But what's gained is PATTERN RECOGNITION at scale. We can SEE structures
 * that would be invisible in tables or equations. This is the power and
 * limitation of visualization as a way of knowing.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { shouldRenderEdge, getEdgeRepresentation, FORCE_LAYOUT_CONFIG } from '../core/config.js';

// Design system color mapping
const COLORS = {
  light: {
    background_start: 0xF5F1E8,
    background_end: 0xE8DEC8,
    fog: 0xE8DEC8,
    consumer: 0x2D9B8A,      // Vibrant teal (was 0x6B8E7F)
    creator: 0xE6A83D,       // Bright gold/amber (was 0xB8956A)
    broadcaster: 0xD94F3D,   // Bright coral red (was 0x9B6B5C)
    influencer: 0x8B5CF6,    // Vibrant purple (high-follower nodes)
    embodied: 0xA86F4A,      // Richer brown (was 0x8B7355)
    print: 0x2D8A75,         // Deep green (was 0x5A7B6F)
    broadcast: 0xE67A4D,     // Bright orange (was 0xC4886B)
    internet: 0x4D7ABF,      // Vibrant blue (was 0x7B8BA3)
    algorithmic: 0xC94FA3,   // Bright magenta (was 0xA67B8C)
  },
  dark: {
    background_start: 0x1C1814,
    background_end: 0x0F0D0A,
    fog: 0x0F0D0A,
    consumer: 0x3DCCB3,      // Bright cyan/teal (was 0x7BA393)
    creator: 0xFFBF47,       // Vibrant gold (was 0xCBA87A)
    broadcaster: 0xFF6B5C,   // Bright salmon/coral (was 0xAF7D6F)
    influencer: 0xA78BFA,    // Bright lavender purple (high-follower nodes)
    embodied: 0xD9964D,      // Bright tan/brown (was 0xA38B6F)
    print: 0x47CC9E,         // Bright mint green (was 0x6B9485)
    broadcast: 0xFFAA75,     // Bright peach/orange (was 0xD69B7F)
    internet: 0x5C9EFF,      // Bright sky blue (was 0x8B9BB8)
    algorithmic: 0xE066CC,   // Vibrant pink/magenta (was 0xB88B9F)
  }
};

export class Visualizer {
  constructor(container, network_data, options = {}) {
    this.container = container;
    this.network_data = network_data;
    this.config = network_data.config;

    // Visualization options
    this.theme = options.theme || 'light'; // 'light' or 'dark'

    // Three.js components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Visualization objects
    this.node_meshes = new Map(); // node.id -> THREE.Sprite or Mesh
    this.edge_lines = [];
    this.edges_by_node = new Map(); // node.id -> [edge_line1, edge_line2, ...]

    // Interaction state
    this.highlighted_nodes = new Set();
    this.highlighted_edges = new Set();
    this.hovered_node_id = null;

    // Mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouse_move_handler = null;

    // Edge visibility state (tracked for highlighting)
    this.edge_visibility_state = {
      embodied: true,
      print: true,
      broadcast: true,
      internet: true,
      algorithmic: true
    };

    // Animation
    this.animating = false;
    this.animation_frame = null;

    // Performance monitoring
    this.fps = 60;
    this.frame_times = [];
  }

  /**
   * Initialize three.js scene
   */
  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.updateTheme(this.theme);

    // Create camera positioned at 45° angle looking down at plane
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5000);
    // Position camera above and in front of the plane (45° angle)
    this.camera.position.set(0, 600, 600);
    this.camera.lookAt(0, 0, 0);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 3000;
    this.controls.target.set(0, 0, 0); // Look at center of plane

    // No lights needed for flat aesthetic

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Handle mouse movement for node hover detection
    this.mouse_move_handler = (event) => this.onMouseMove(event);
    this.renderer.domElement.addEventListener('mousemove', this.mouse_move_handler);

    // Handle WebGL context loss/restore
    this.renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      console.warn('WebGL context lost! Pausing rendering...');
      this.stop();
    }, false);

    this.renderer.domElement.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored! Recreating scene...');
      this.handleContextRestored();
    }, false);

    // Create visualization
    this.createVisualization();

    // Render one frame to compile shaders before starting animation
    // This prevents WebGL INVALID_OPERATION errors
    this.renderer.render(this.scene, this.camera);

    // Start animation after a small delay to ensure materials are compiled
    requestAnimationFrame(() => this.start());
  }

  /**
   * Update theme (light/dark)
   */
  updateTheme(theme) {
    this.theme = theme;
    const colors = COLORS[theme];

    // Update background (gradient from start to end)
    this.scene.background = new THREE.Color(colors.background_start);

    // Update fog
    this.scene.fog = new THREE.Fog(colors.fog, 500, 2000);

    // Update node colors if already created
    if (this.node_meshes.size > 0) {
      this.node_meshes.forEach((sprite, node_id) => {
        const node = sprite.userData.node;
        const color = this.getNodeColor(node);
        sprite.material.color.setHex(color);
      });
    }

    // Update edge colors if already created
    if (this.edge_lines.length > 0) {
      this.edge_lines.forEach((line) => {
        const edge = line.userData.edge;
        const color = this.getEdgeColor(edge.medium);
        line.material.color.setHex(color);
      });
    }
  }

  /**
   * Get node color based on visible stress level
   *
   * VISUALIZATION PRINCIPLE: COLOR = ACUTE STRESS STATE
   *
   * Green (healthy) → Yellow (stressed) → Red (distressed)
   * Uses HSL color space for smooth gradient
   *
   * @param {Node} node - The node to get color for
   * @returns {THREE.Color} - Color object
   */
  getNodeColor(node) {
    const stress = node.getVisibleStress(); // 0-1 range

    // HSL gradient: Hue from 120° (green) to 0° (red)
    // Green (calm) → Yellow (moderate stress) → Red (severe distress)
    const hue = (1 - stress) * 120; // 120° = green, 60° = yellow, 0° = red

    // Adjust saturation and lightness based on theme
    const saturation = 0.8; // Vibrant colors
    const lightness = this.theme === 'dark' ? 0.6 : 0.5;

    return new THREE.Color().setHSL(hue / 360, saturation, lightness);
  }

  /**
   * Get edge color based on medium and theme
   */
  getEdgeColor(medium) {
    const colors = COLORS[this.theme];
    switch (medium) {
      case 'embodied':
        return colors.embodied;
      case 'print':
        return colors.print;
      case 'broadcast':
        return colors.broadcast;
      case 'internet':
        return colors.internet;
      case 'algorithmic':
        return colors.algorithmic;
      default:
        return colors.embodied;
    }
  }

  /**
   * Create node and edge visualization
   */
  createVisualization() {
    console.log('Creating visualization...');

    // Create nodes
    this.createNodes();

    // Create edges
    this.createEdges();

    console.log(
      `Rendered ${this.node_meshes.size} nodes, ${this.edge_lines.length} edges`
    );
  }

  /**
   * Create flat 2D circle nodes using sprites
   *
   * VISUALIZATION PRINCIPLES:
   * - Size = Follower count (logarithmic scale - influence/reach)
   * - Color = Visible stress (green → yellow → red gradient)
   * - Border = System integrity (solid → dashed → none)
   */
  createNodes() {
    this.network_data.nodes.forEach((node) => {
      const color = this.getNodeColor(node);
      const integrity = node.getSystemIntegrity();

      // Size based on follower count (logarithmic scale with power curve)
      // Creates dramatic size differences: consumers tiny, influencers huge
      const follower_count = node.follower_count || 1;
      const log_followers = Math.log10(follower_count + 1);

      // Map to visual size range with power curve for exaggeration
      const min_size = 1.5;  // Tiny consumers
      const max_size = 25;   // Massive influencers (2x larger than before)

      // Use power curve (^1.5) to exaggerate differences
      const normalized = log_followers / 6; // 0-1 range
      const curved = Math.pow(normalized, 1.5); // Exaggerate larger values
      const node_size = min_size + curved * (max_size - min_size);

      // Create circle texture with border encoding system integrity
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Draw filled circle (stress color)
      const colorHex = color.getHexString();
      ctx.fillStyle = `#${colorHex}`;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();

      // Draw border based on system integrity
      // 1.0-0.7: Solid border (healthy, can self-regulate)
      // 0.7-0.4: Dashed border (degrading, struggling)
      // 0.4-0.0: Thin/no border (collapsed, dysfunctional)

      if (integrity > 0.7) {
        // Healthy: solid border
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.4)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();

      } else if (integrity > 0.4) {
        // Degrading: dashed border
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.5)` : `rgba(0,0,0,0.3)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]); // Dashed pattern
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

      } else if (integrity > 0.2) {
        // Collapsing: thin border
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.3)` : `rgba(0,0,0,0.2)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Below 0.2: no border (system has collapsed)

      // Create sprite material
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85
      });

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(node_size, node_size, 1);
      sprite.position.set(node.position.x, node.position.y, node.position.z);
      // Store canvas in userData so we can reuse it during updates
      sprite.userData = {
        node: node,
        base_scale: node_size,
        canvas: canvas,
        ctx: ctx
      };

      this.scene.add(sprite);
      this.node_meshes.set(node.id, sprite);
    });
  }

  /**
   * Create edge lines (straight or curved)
   *
   * THEORETICAL NOTE: STRATIFIED SAMPLING AS EPISTEMOLOGICAL FAIRNESS
   *
   * When networks grow large (8,000 nodes, 3.6M edges), we face a fundamental
   * problem: we can't render everything without crashing the GPU.
   *
   * TWO SAMPLING APPROACHES:
   *
   * 1. NAIVE RANDOM SAMPLING
   *    - Pick N edges at random
   *    - Problem: Algorithmic connections are 90%+ of all edges
   *    - Result: Visualization shows ONLY algorithmic connections
   *    - This misrepresents the network structure
   *
   * 2. STRATIFIED SAMPLING (Implemented here)
   *    - Group edges by medium type (embodied, print, broadcast, internet, algorithmic)
   *    - Allocate render budget PROPORTIONALLY to each medium's share
   *    - Within each medium, select the STRONGEST connections
   *    - Result: All media types visible, proportional to their actual presence
   *
   * WHY THIS MATTERS:
   *
   * Stratified sampling embodies a theoretical claim: that DIVERSITY of connection
   * types is as important as FREQUENCY. We want to see:
   * - The embodied core (even though it's <5% of edges)
   * - Print networks (rare but structurally important)
   * - Broadcast hubs (few but high-impact)
   * - Internet clusters (moderate frequency)
   * - Algorithmic flood (dominant numerically)
   *
   * If we sampled randomly, embodied connections would be nearly invisible
   * (statistically drowned out). But theoretically, they're the FOUNDATION -
   * everything else builds on embodied relationships.
   *
   * This is an epistemological choice: represent the ECOLOGY, not just the
   * dominant species. It's Bateson's "pattern that connects" - we're looking
   * for structure across levels, not just raw counts.
   *
   * TECHNICAL IMPLEMENTATION:
   * - Calculate each medium's proportion of total edges
   * - Allocate render slots proportionally
   * - Sort edges by strength (descending)
   * - Take top N strongest from each medium
   * - This ensures we see the "skeleton" of each communication mode
   */
  createEdges() {
    const camera_distance = this.camera.position.length();
    const maxEdges = this.config.max_rendered_edges || Infinity;
    let edgesToRender;

    // Use stratified sampling for massive networks (ensures all connection types are represented)
    if (this.config.use_top_edges_only) {
      // Group edges by medium type
      const edgesByMedium = {
        embodied: [],
        print: [],
        broadcast: [],
        internet: [],
        algorithmic: []
      };

      this.network_data.edges.forEach(edge => {
        if (edgesByMedium[edge.medium]) {
          edgesByMedium[edge.medium].push(edge);
        }
      });

      // Calculate total edges
      const totalEdges = this.network_data.edges.length;
      edgesToRender = [];

      console.log('Stratified edge sampling:');

      // For each medium, sample proportionally based on its share of total edges
      for (const [medium, edges] of Object.entries(edgesByMedium)) {
        if (edges.length === 0) continue;

        // Calculate this medium's proportion of total edges
        const proportion = edges.length / totalEdges;

        // Allocate render budget proportionally
        const allocatedCount = Math.round(maxEdges * proportion);

        // Sort edges in this medium by strength (descending) and take top N
        const sortedEdges = edges.sort((a, b) => b.strength - a.strength);
        const selectedEdges = sortedEdges.slice(0, allocatedCount);

        edgesToRender.push(...selectedEdges);

        console.log(`  ${medium}: ${edges.length} total → rendering ${selectedEdges.length} strongest (${(proportion * 100).toFixed(1)}%)`);
      }

      console.log(`Total: ${edgesToRender.length} edges rendered from ${totalEdges} total`);
    } else {
      // Use traditional sampling approach
      edgesToRender = this.network_data.edges.filter((edge) =>
        shouldRenderEdge(edge, camera_distance, this.config)
      ).slice(0, maxEdges);
    }

    // Render the selected edges
    edgesToRender.forEach((edge) => {
      // When using top-edges approach, always render (ignore LOD)
      if (this.config.use_top_edges_only) {
        this.createEdgeLine(edge, 'simple');
      } else {
        const representation = getEdgeRepresentation(
          edge,
          camera_distance,
          this.config
        );

        if (representation === 'full' || representation === 'simple') {
          this.createEdgeLine(edge, representation);
        }
      }
    });
  }

  /**
   * Create an edge line (straight or curved based on distance)
   */
  createEdgeLine(edge, representation) {
    const source_node = this.network_data.nodes[edge.source];
    const target_node = this.network_data.nodes[edge.target];

    if (!source_node || !target_node) return;

    const source_pos = new THREE.Vector3(
      source_node.position.x,
      source_node.position.y,
      source_node.position.z
    );

    const target_pos = new THREE.Vector3(
      target_node.position.x,
      target_node.position.y,
      target_node.position.z
    );

    // Calculate 2D distance (ignoring z)
    const dx = target_node.position.x - source_node.position.x;
    const dy = target_node.position.y - source_node.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let points;

    // Use distance-based rendering: nearby = straight, far = curved
    if (distance >= FORCE_LAYOUT_CONFIG.edge_distance_threshold) {
      // Far connections get curved edges
      points = this.createCurvedEdge(source_pos, target_pos);
    } else {
      // Nearby connections get straight edges
      points = [source_pos, target_pos];
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Color and opacity
    const color = this.getEdgeColor(edge.medium);
    let baseOpacity;

    // Reduced base opacity for better depth perception
    switch (edge.medium) {
      case 'embodied':
        baseOpacity = 0.3;  // was 0.4
        break;
      case 'print':
        baseOpacity = 0.25; // was 0.3
        break;
      case 'broadcast':
        baseOpacity = 0.2;  // was 0.25
        break;
      case 'internet':
        baseOpacity = 0.15; // was 0.2
        break;
      case 'algorithmic':
        baseOpacity = 0.12; // was 0.15
        break;
      default:
        baseOpacity = 0.25;
    }

    // Apply strength multiplier with emphasis on strong connections
    const opacity = baseOpacity * Math.pow(edge.strength, 0.7); // Power curve emphasizes strong edges

    // Calculate line width based on strength (range: 1-3)
    const linewidth = 1 + (edge.strength * 2);

    const material = new THREE.LineBasicMaterial({
      color: color,
      opacity: opacity,
      transparent: true,
      linewidth: linewidth
    });

    const line = new THREE.Line(geometry, material);
    line.userData = { edge: edge };

    // Populate edge lookup map for fast access during hover interactions
    const source_id = edge.source;
    const target_id = edge.target;

    if (!this.edges_by_node.has(source_id)) {
      this.edges_by_node.set(source_id, []);
    }
    if (!this.edges_by_node.has(target_id)) {
      this.edges_by_node.set(target_id, []);
    }

    this.edges_by_node.get(source_id).push(line);
    this.edges_by_node.get(target_id).push(line);

    this.scene.add(line);
    this.edge_lines.push(line);
  }

  /**
   * Create curved edge using quadratic bezier
   */
  createCurvedEdge(start, end) {
    // Calculate control point (offset perpendicular to line)
    const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
    const direction = new THREE.Vector3().subVectors(end, start);
    const distance = direction.length();

    // Perpendicular vector (cross with up vector)
    const perpendicular = new THREE.Vector3()
      .crossVectors(direction, new THREE.Vector3(0, 1, 0))
      .normalize();

    // Offset control point (adjust curve intensity based on distance)
    const curve_intensity = Math.min(distance * 0.15, 50);
    const control = midpoint.clone().add(
      perpendicular.multiplyScalar(curve_intensity)
    );

    // Create quadratic bezier curve
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);

    // Generate points along curve
    return curve.getPoints(20); // 20 segments for smooth curve
  }

  /**
   * Update visualization (called each frame)
   */
  update() {
    // Update controls
    this.controls.update();

    // Update node appearances based on state
    this.updateNodeAppearances();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Calculate FPS
    this.calculateFPS();
  }

  /**
   * Update node visual states
   *
   * Updates node appearance based on changing psychological state:
   * - Color: Updates stress gradient (green → yellow → red)
   * - Border: Updates system integrity visualization
   * - Pulsing: Shows double bind entrapment
   * - Respects highlighting state (doesn't override interaction highlights)
   */
  updateNodeAppearances() {
    // Check if we're currently highlighting nodes
    const is_highlighting = this.highlighted_nodes.size > 0 || this.highlighted_edges.size > 0;

    this.node_meshes.forEach((sprite, node_id) => {
      const node = sprite.userData.node;
      const base_scale = sprite.userData.base_scale;
      const canvas = sprite.userData.canvas;
      const ctx = sprite.userData.ctx;

      // Get current metrics
      const stress = node.getVisibleStress();
      const integrity = node.getSystemIntegrity();

      // Clear and redraw the existing canvas (reuse, don't recreate!)
      ctx.clearRect(0, 0, 64, 64);

      // Get updated stress color
      const hue = (1 - stress) * 120; // Green → Yellow → Red
      const saturation = 0.8;
      const lightness = this.theme === 'dark' ? 0.6 : 0.5;
      const color = new THREE.Color().setHSL(hue / 360, saturation, lightness);
      const colorHex = color.getHexString();

      // Draw filled circle with stress color
      ctx.fillStyle = `#${colorHex}`;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();

      // Draw border based on system integrity
      if (integrity > 0.7) {
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.4)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
      } else if (integrity > 0.4) {
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.5)` : `rgba(0,0,0,0.3)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (integrity > 0.2) {
        ctx.strokeStyle = this.theme === 'dark' ?
          `rgba(255,255,255,0.3)` : `rgba(0,0,0,0.2)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Tell Three.js to update the texture (no texture recreation!)
      sprite.material.map.needsUpdate = true;

      // Keep base size (follower count doesn't change during simulation)
      let scale = base_scale;

      // Pulsate if in double bind stress (intensity based on stress level)
      if (node.double_bind.in_double_bind && node.double_bind.S > 0.5) {
        const pulse_intensity = node.double_bind.S * 0.3; // 0.3 max intensity
        const pulse = Math.sin(Date.now() * 0.005) * pulse_intensity + 1.0;
        scale *= pulse;
      }

      sprite.scale.set(scale, scale, 1);

      // Update opacity - but ONLY if we're not currently highlighting
      // (highlighting controls opacity during interaction)
      if (!is_highlighting) {
        const opacity = 0.85 + stress * 0.15;
        sprite.material.opacity = opacity;
      }
      // If highlighting, the highlighting methods control opacity, so don't override
    });
  }

  /**
   * Start animation loop
   */
  start() {
    if (this.animating) return;
    this.animating = true;
    this.animate();
  }

  /**
   * Stop animation loop
   */
  stop() {
    this.animating = false;
    if (this.animation_frame) {
      cancelAnimationFrame(this.animation_frame);
    }
  }

  /**
   * Animation loop
   */
  animate() {
    if (!this.animating) return;

    this.animation_frame = requestAnimationFrame(() => this.animate());
    this.update();
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  /**
   * Handle mouse movement for node hover detection
   *
   * Uses Three.js raycasting to detect which node (if any) is under the cursor.
   * When a node is hovered, it highlights the node and its connections.
   * Individual node hover overrides any type-level highlighting from legend.
   */
  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the raycaster with camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all node sprites for raycasting
    const node_sprites = Array.from(this.node_meshes.values());

    // Find intersected nodes
    const intersects = this.raycaster.intersectObjects(node_sprites);

    if (intersects.length > 0) {
      // Found a hovered node
      const hovered_sprite = intersects[0].object;
      const hovered_node = hovered_sprite.userData.node;

      // Only update if we're hovering over a different node
      if (this.hovered_node_id !== hovered_node.id) {
        this.hovered_node_id = hovered_node.id;
        // Highlight this specific node and its connections
        this.highlightNode(hovered_node.id, this.edge_visibility_state);
      }
    } else {
      // No node hovered
      if (this.hovered_node_id !== null) {
        this.hovered_node_id = null;
        // Clear highlighting
        this.clearHighlights();
      }
    }
  }

  /**
   * Calculate FPS
   */
  calculateFPS() {
    const now = performance.now();
    this.frame_times.push(now);

    // Keep only last 60 frames
    if (this.frame_times.length > 60) {
      this.frame_times.shift();
    }

    if (this.frame_times.length > 1) {
      const elapsed =
        this.frame_times[this.frame_times.length - 1] - this.frame_times[0];
      this.fps = ((this.frame_times.length - 1) * 1000) / elapsed;
    }
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return Math.round(this.fps);
  }

  /**
   * Handle WebGL context restoration
   */
  handleContextRestored() {
    // Clear existing visualization objects
    this.node_meshes.forEach((sprite) => {
      this.scene.remove(sprite);
    });
    this.edge_lines.forEach((line) => {
      this.scene.remove(line);
    });

    this.node_meshes.clear();
    this.edge_lines = [];

    // Recreate visualization
    this.createVisualization();

    // Render one frame to compile shaders
    this.renderer.render(this.scene, this.camera);

    // Restart animation
    this.start();
  }

  /**
   * Dispose of resources
   */
  dispose() {
    this.stop();

    // Remove event listeners
    if (this.mouse_move_handler) {
      this.renderer.domElement.removeEventListener('mousemove', this.mouse_move_handler);
    }

    // Dispose geometries and materials
    this.node_meshes.forEach((sprite) => {
      sprite.material.map.dispose();
      sprite.material.dispose();
    });

    this.edge_lines.forEach((line) => {
      line.geometry.dispose();
      line.material.dispose();
    });

    // Dispose renderer
    this.renderer.dispose();

    // Remove canvas
    if (this.renderer.domElement.parentElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  /**
   * Focus camera on a specific node
   */
  focusOnNode(node_id) {
    const sprite = this.node_meshes.get(node_id);
    if (!sprite) return;

    const target_pos = sprite.position.clone();
    const camera_offset = new THREE.Vector3(50, 50, 50);

    this.camera.position.copy(target_pos).add(camera_offset);
    this.controls.target.copy(target_pos);
  }

  /**
   * Highlight nodes by condition
   */
  highlightNodes(condition_fn) {
    this.node_meshes.forEach((sprite, node_id) => {
      const node = sprite.userData.node;
      if (condition_fn(node)) {
        sprite.material.opacity = 1.0;
        sprite.scale.multiplyScalar(1.2);
      } else {
        sprite.material.opacity = 0.3;
      }
    });
  }

  /**
   * Reset all highlights
   */
  resetHighlights() {
    this.node_meshes.forEach((sprite) => {
      const node = sprite.userData.node;
      const base_scale = sprite.userData.base_scale;
      sprite.material.opacity = 0.8;
      sprite.scale.set(base_scale, base_scale, 1);
    });
  }

  /**
   * Set visibility for edge types
   * @param {Object} visibilityState - { embodied: bool, print: bool, broadcast: bool, internet: bool, algorithmic: bool }
   */
  setEdgeVisibility(visibilityState) {
    // Store visibility state for use in highlighting
    this.edge_visibility_state = { ...visibilityState };

    this.edge_lines.forEach((line) => {
      const edge = line.userData.edge;
      const isVisible = visibilityState[edge.medium];
      line.visible = isVisible;
    });
  }

  /**
   * Highlight nodes by role (for legend hover)
   *
   * INTERACTION PRINCIPLE: TYPE-LEVEL HIGHLIGHTING
   * - Dim non-matching nodes to 0.25 opacity
   * - Keep matching nodes at normal opacity
   * - Do NOT show edges (only node highlighting)
   * - Used when hovering over legend items
   *
   * @param {string} role - 'consumer', 'creator', 'broadcaster', or 'influencer'
   */
  highlightNodesByRole(role) {
    this.highlighted_nodes.clear();

    this.node_meshes.forEach((sprite, node_id) => {
      const node = sprite.userData.node;

      // Check if node matches the role
      // Influencers are identified by is_influencer flag (top 0.1% by followers)
      const matches = role === 'influencer'
        ? node.is_influencer
        : node.role === role;

      if (matches) {
        this.highlighted_nodes.add(node_id);
        // Keep normal opacity (based on stress state)
        const stress = node.getVisibleStress();
        sprite.material.opacity = 0.85 + stress * 0.15;
      } else {
        // Dim non-matching nodes
        sprite.material.opacity = 0.25;
      }
    });

    // No edge highlighting for type-level hover
  }

  /**
   * Highlight a specific node and its first-order connections
   *
   * INTERACTION PRINCIPLE: INDIVIDUAL NODE HIGHLIGHTING
   * - Highlight the selected node (full opacity)
   * - Show all first-order connected edges (respect visibility toggles)
   * - Dim non-connected nodes to 0.25 opacity
   * - Show edges in BOTH directions (bidirectional)
   * - Used when hovering over a node in the graph
   *
   * @param {number} node_id - The node to highlight
   * @param {Object} visibilityState - Current edge type visibility settings
   */
  highlightNode(node_id, visibilityState) {
    this.highlighted_nodes.clear();
    this.highlighted_edges.clear();

    const target_sprite = this.node_meshes.get(node_id);
    if (!target_sprite) return;

    // Highlight the selected node
    this.highlighted_nodes.add(node_id);
    const node = target_sprite.userData.node;
    const stress = node.getVisibleStress();
    target_sprite.material.opacity = 0.85 + stress * 0.15;

    // Get all edges connected to this node
    const connected_edges = this.edges_by_node.get(node_id) || [];

    // Highlight connected edges (respect visibility toggles)
    connected_edges.forEach(line => {
      const edge = line.userData.edge;

      // Only highlight if this edge type is currently visible
      if (visibilityState[edge.medium]) {
        this.highlighted_edges.add(line);

        // Increase edge opacity for highlighting
        const baseOpacity = {
          'embodied': 0.3,
          'print': 0.25,
          'broadcast': 0.2,
          'internet': 0.15,
          'algorithmic': 0.12
        }[edge.medium] || 0.25;

        // Boost highlighted edge opacity
        line.material.opacity = Math.min(baseOpacity * Math.pow(edge.strength, 0.7) * 3, 0.9);
      }
    });

    // Dim all other nodes
    this.node_meshes.forEach((sprite, id) => {
      if (id !== node_id) {
        sprite.material.opacity = 0.25;
      }
    });

    // Dim all other edges
    this.edge_lines.forEach(line => {
      if (!this.highlighted_edges.has(line)) {
        const edge = line.userData.edge;
        const baseOpacity = {
          'embodied': 0.3,
          'print': 0.25,
          'broadcast': 0.2,
          'internet': 0.15,
          'algorithmic': 0.12
        }[edge.medium] || 0.25;

        line.material.opacity = baseOpacity * Math.pow(edge.strength, 0.7) * 0.25;
      }
    });
  }

  /**
   * Clear all highlighting and restore normal appearance
   *
   * Resets node opacities to stress-based values and edge opacities
   * to their normal strength-based values.
   */
  clearHighlights() {
    this.highlighted_nodes.clear();
    this.highlighted_edges.clear();

    // Restore node opacities based on stress state
    this.node_meshes.forEach((sprite, node_id) => {
      const node = sprite.userData.node;
      const stress = node.getVisibleStress();
      sprite.material.opacity = 0.85 + stress * 0.15;
    });

    // Restore edge opacities based on strength
    this.edge_lines.forEach(line => {
      const edge = line.userData.edge;

      const baseOpacity = {
        'embodied': 0.3,
        'print': 0.25,
        'broadcast': 0.2,
        'internet': 0.15,
        'algorithmic': 0.12
      }[edge.medium] || 0.25;

      line.material.opacity = baseOpacity * Math.pow(edge.strength, 0.7);
    });
  }
}

export default Visualizer;
