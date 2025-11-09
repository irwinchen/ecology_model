/**
 * Visualizer.js
 *
 * Three.js visualization for the Orality network model.
 * Academic aesthetic with flat circles and optional curved edges.
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
   * Get node color based on influencer status, role, and theme
   * Priority: influencer > role
   */
  getNodeColor(node) {
    const colors = COLORS[this.theme];

    // Influencers get purple color regardless of role
    if (node.is_influencer) {
      return colors.influencer;
    }

    // Otherwise use role-based coloring
    switch (node.role) {
      case 'broadcaster':
        return colors.broadcaster;
      case 'creator':
        return colors.creator;
      default:
        return colors.consumer;
    }
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
   */
  createNodes() {
    this.network_data.nodes.forEach((node) => {
      const color = this.getNodeColor(node);

      // Create circle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Draw filled circle
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();

      // Optional: add subtle border
      ctx.strokeStyle = `rgba(0,0,0,0.1)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Create sprite material
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(2.5, 2.5, 1); // Reduced size for less crowding
      sprite.position.set(node.position.x, node.position.y, node.position.z);
      sprite.userData = { node: node, base_scale: 2.5 };

      this.scene.add(sprite);
      this.node_meshes.set(node.id, sprite);
    });
  }

  /**
   * Create edge lines (straight or curved)
   */
  createEdges() {
    const camera_distance = this.camera.position.length();
    const maxEdges = this.config.max_rendered_edges || Infinity;
    let edgesToRender;

    // Use top-N strongest edges approach for massive networks
    if (this.config.use_top_edges_only) {
      // Sort all edges by strength (descending)
      const sortedEdges = [...this.network_data.edges].sort((a, b) => b.strength - a.strength);

      // Take only the top N strongest edges
      edgesToRender = sortedEdges.slice(0, maxEdges);

      console.log(`Rendering top ${edgesToRender.length} strongest edges (out of ${this.network_data.edges.length} total)`);
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
   */
  updateNodeAppearances() {
    this.node_meshes.forEach((sprite, node_id) => {
      const node = sprite.userData.node;
      const base_scale = sprite.userData.base_scale;

      // Update scale based on cognitive load
      const overload_ratio = node.cognitive_load / node.cognitive_capacity;
      const scale = base_scale * (1 + Math.min(overload_ratio * 0.5, 1.0));
      sprite.scale.set(scale, scale, 1);

      // Pulsate if in double bind stress
      if (node.double_bind.in_double_bind && node.double_bind.S > 0.5) {
        const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 1.0;
        sprite.scale.multiplyScalar(pulse);
      }

      // Update opacity based on emotional state (subtle)
      const opacity = 0.8 + node.emotional_state * 0.2;
      sprite.material.opacity = opacity;
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
   * Dispose of resources
   */
  dispose() {
    this.stop();

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
}

export default Visualizer;
