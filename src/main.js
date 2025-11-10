/**
 * main.js
 *
 * Application entry point - connects UI, network generation, and visualization
 */

import { NetworkGenerator } from './core/NetworkGenerator.js';
import { Visualizer } from './visualization/Visualizer.js';

class App {
  constructor() {
    // State
    this.generator = null;
    this.visualizer = null;
    this.network_data = null;
    this.simulating = false;
    this.simulation_interval = null;
    this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    // DOM elements
    this.container = document.getElementById('container');
    this.eraSelect = document.getElementById('era-select');
    this.themeToggle = document.getElementById('theme-toggle');
    this.generateBtn = document.getElementById('generate-btn');
    this.simulateBtn = document.getElementById('simulate-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.loading = document.getElementById('loading');
    this.stats = document.getElementById('stats');
    this.sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    this.controlPanel = document.getElementById('control-panel');
    this.statsToggle = document.getElementById('stats-toggle');
    this.statsContent = document.getElementById('stats-content');

    // Connection type toggles
    this.toggleEmbodied = document.getElementById('toggle-embodied');
    this.togglePrint = document.getElementById('toggle-print');
    this.toggleBroadcast = document.getElementById('toggle-broadcast');
    this.toggleInternet = document.getElementById('toggle-internet');
    this.toggleAlgorithmic = document.getElementById('toggle-algorithmic');

    // Legend items (for hover interactions) - specifically the Node Size section
    const legendPanel = document.querySelector('.legend-panel');
    const nodeSizeSection = legendPanel ? legendPanel.querySelector('.legend-section') : null;
    this.legendItems = nodeSizeSection ? nodeSizeSection.querySelectorAll('.legend-item') : [];

    // Stats elements
    this.fpsEl = document.getElementById('fps');
    this.nodesEl = document.getElementById('nodes');
    this.edgesEl = document.getElementById('edges');
    this.cognitiveLoadEl = document.getElementById('cognitive-load');
    this.homeostasisEl = document.getElementById('homeostasis');
    this.emotionalEl = document.getElementById('emotional');
    this.polarizationEl = document.getElementById('polarization');
    this.doubleBindEl = document.getElementById('double-bind');
    this.influencersEl = document.getElementById('influencers');
    this.avgFollowersEl = document.getElementById('avg-followers');

    // Bind event handlers
    this.setupEventHandlers();
  }

  /**
   * Setup event handlers
   */
  setupEventHandlers() {
    this.generateBtn.addEventListener('click', () => this.generateNetwork());
    this.simulateBtn.addEventListener('click', () => this.toggleSimulation());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.sidebarToggleBtn.addEventListener('click', () => this.toggleControlPanel());
    this.statsToggle.addEventListener('click', () => this.toggleStatsPanel());

    // Connection type toggles
    this.toggleEmbodied.addEventListener('change', () => this.updateEdgeVisibility());
    this.togglePrint.addEventListener('change', () => this.updateEdgeVisibility());
    this.toggleBroadcast.addEventListener('change', () => this.updateEdgeVisibility());
    this.toggleInternet.addEventListener('change', () => this.updateEdgeVisibility());
    this.toggleAlgorithmic.addEventListener('change', () => this.updateEdgeVisibility());

    // Legend hover interactions
    this.setupLegendHoverHandlers();
  }

  /**
   * Setup legend hover handlers for node type highlighting
   *
   * NOTE: Ranges are based on ROLE, not fixed follower thresholds
   * - Consumer: role === 'consumer'
   * - Creator: role === 'creator'
   * - Broadcaster: role === 'broadcaster'
   * - Influencer: is_influencer === true (top 0.1% by followers)
   */
  setupLegendHoverHandlers() {
    const roleFilters = [
      'consumer',     // Consumer (10s)
      'creator',      // Creator (100s)
      'broadcaster',  // Broadcaster (1000s)
      'influencer'    // Influencer (top 0.1%)
    ];

    this.legendItems.forEach((item, index) => {
      const role = roleFilters[index];

      // Highlight matching nodes on hover
      item.addEventListener('mouseenter', () => {
        if (this.visualizer) {
          this.visualizer.highlightNodesByRole(role);
        }
      });

      // Clear highlighting on leave
      item.addEventListener('mouseleave', () => {
        if (this.visualizer) {
          this.visualizer.clearHighlights();
        }
      });
    });
  }

  /**
   * Toggle control panel visibility
   */
  toggleControlPanel() {
    this.controlPanel.classList.toggle('collapsed');
  }

  /**
   * Toggle stats panel collapsed state
   */
  toggleStatsPanel() {
    this.stats.classList.toggle('collapsed');
    this.statsToggle.textContent = this.stats.classList.contains('collapsed') ? '+' : '−';
  }

  /**
   * Toggle theme (light/dark)
   */
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);

    // Update visualizer theme if it exists
    if (this.visualizer) {
      this.visualizer.updateTheme(this.currentTheme);
    }

    console.log(`Theme switched to ${this.currentTheme}`);
  }

  /**
   * Generate network for selected era
   */
  async generateNetwork() {
    const era = this.eraSelect.value;

    // Show loading
    this.loading.style.display = 'block';
    this.generateBtn.disabled = true;

    // Clean up existing visualization
    if (this.visualizer) {
      this.visualizer.dispose();
      this.visualizer = null;
    }

    // Stop simulation
    if (this.simulating) {
      this.stopSimulation();
    }

    // Generate network (async to allow UI update)
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      console.log(`Generating ${era} network...`);
      this.generator = new NetworkGenerator(era);
      this.network_data = this.generator.generate();

      // Create visualization with current theme
      this.visualizer = new Visualizer(this.container, this.network_data, {
        theme: this.currentTheme
      });
      this.visualizer.init();

      // Show stats
      this.stats.style.display = 'block';
      this.updateStats();

      // Enable simulation button
      this.simulateBtn.disabled = false;
      this.resetBtn.disabled = false;

      // Start stats update loop
      this.startStatsUpdate();
    } catch (error) {
      console.error('Error generating network:', error);
      alert('Error generating network. See console for details.');
    } finally {
      this.loading.style.display = 'none';
      this.generateBtn.disabled = false;
    }
  }

  /**
   * Toggle simulation on/off
   */
  toggleSimulation() {
    if (this.simulating) {
      this.stopSimulation();
    } else {
      this.startSimulation();
    }
  }

  /**
   * Start simulation
   */
  startSimulation() {
    this.simulating = true;
    this.simulateBtn.textContent = 'Stop Simulation';

    // Run simulation step every 100ms
    this.simulation_interval = setInterval(() => {
      if (this.generator) {
        this.generator.update(1); // Update with dt=1
        this.updateStats();
      }
    }, 100);

    console.log('Simulation started');
  }

  /**
   * Stop simulation
   */
  stopSimulation() {
    this.simulating = false;
    this.simulateBtn.textContent = 'Start Simulation';

    if (this.simulation_interval) {
      clearInterval(this.simulation_interval);
      this.simulation_interval = null;
    }

    console.log('Simulation stopped');
  }

  /**
   * Reset everything
   */
  reset() {
    this.stopSimulation();

    if (this.visualizer) {
      this.visualizer.dispose();
      this.visualizer = null;
    }

    this.generator = null;
    this.network_data = null;
    this.stats.style.display = 'none';
    this.simulateBtn.disabled = true;
    this.resetBtn.disabled = true;

    // Hide all spectrum markers
    this.hideSpectrumMarkers();

    console.log('Reset complete');
  }

  /**
   * Hide all spectrum markers
   */
  hideSpectrumMarkers() {
    const markers = [
      'cognitive-load-marker',
      'homeostasis-marker',
      'emotional-marker',
      'polarization-marker',
      'double-bind-marker'
    ];

    markers.forEach(id => {
      const marker = document.getElementById(id);
      if (marker) {
        marker.classList.remove('visible');
      }
    });
  }

  /**
   * Update stats display
   */
  updateStats() {
    if (!this.generator || !this.visualizer) return;

    const metrics = this.generator.getMetrics();

    // Basic stats
    this.nodesEl.textContent = this.network_data.nodes.length.toLocaleString();
    this.edgesEl.textContent = this.network_data.edges.length.toLocaleString();
    this.fpsEl.textContent = this.visualizer.getFPS();

    // Cognitive metrics
    this.cognitiveLoadEl.textContent = metrics.avg_cognitive_load.toFixed(2);
    this.homeostasisEl.textContent = `${(
      metrics.percent_within_homeostatic_range * 100
    ).toFixed(1)}%`;
    this.emotionalEl.textContent = metrics.avg_emotional_agitation.toFixed(2);

    // Social dynamics
    this.polarizationEl.textContent = metrics.tribal_polarization.toFixed(2);
    this.doubleBindEl.textContent = `${(
      metrics.percent_in_double_bind * 100
    ).toFixed(1)}%`;

    // Influencer metrics
    this.influencersEl.textContent = metrics.influencer_count || 0;
    this.avgFollowersEl.textContent = metrics.avg_influencer_followers ?
      metrics.avg_influencer_followers.toLocaleString() : '0';

    // Update spectrum markers
    this.updateSpectrumMarkers(metrics);
  }

  /**
   * Update spectrum bar marker positions based on metric values
   */
  updateSpectrumMarkers(metrics) {
    // Cognitive Load: 0-1 scale (0 = no load, 1 = at capacity)
    const cognitiveLoadMarker = document.getElementById('cognitive-load-marker');
    if (cognitiveLoadMarker && metrics.avg_cognitive_load !== undefined) {
      const cognitiveLoadPercent = Math.min(metrics.avg_cognitive_load * 100, 100);
      cognitiveLoadMarker.style.left = `${cognitiveLoadPercent}%`;
      cognitiveLoadMarker.textContent = metrics.avg_cognitive_load.toFixed(2);
      cognitiveLoadMarker.classList.add('visible');
    }

    // Homeostatic: percentage within range (higher is better)
    const homeostasisMarker = document.getElementById('homeostasis-marker');
    if (homeostasisMarker && metrics.percent_within_homeostatic_range !== undefined) {
      const homeostasisPercent = metrics.percent_within_homeostatic_range * 100;
      homeostasisMarker.style.left = `${homeostasisPercent}%`;
      homeostasisMarker.textContent = `${homeostasisPercent.toFixed(1)}%`;
      homeostasisMarker.classList.add('visible');
    }

    // Emotional: 0-1 scale (0.5 = calm, extremes are bad)
    const emotionalMarker = document.getElementById('emotional-marker');
    if (emotionalMarker && metrics.avg_emotional_agitation !== undefined) {
      const emotionalPercent = metrics.avg_emotional_agitation * 100;
      emotionalMarker.style.left = `${emotionalPercent}%`;
      emotionalMarker.textContent = metrics.avg_emotional_agitation.toFixed(2);
      emotionalMarker.classList.add('visible');
    }

    // Polarization: 0-1 scale (lower is better)
    const polarizationMarker = document.getElementById('polarization-marker');
    if (polarizationMarker && metrics.tribal_polarization !== undefined) {
      const polarizationPercent = metrics.tribal_polarization * 100;
      polarizationMarker.style.left = `${polarizationPercent}%`;
      polarizationMarker.textContent = metrics.tribal_polarization.toFixed(2);
      polarizationMarker.classList.add('visible');
    }

    // Double Bind: percentage in double bind (lower is better)
    const doubleBindMarker = document.getElementById('double-bind-marker');
    if (doubleBindMarker && metrics.percent_in_double_bind !== undefined) {
      const doubleBindPercent = metrics.percent_in_double_bind * 100;
      doubleBindMarker.style.left = `${doubleBindPercent}%`;
      doubleBindMarker.textContent = `${doubleBindPercent.toFixed(1)}%`;
      doubleBindMarker.classList.add('visible');
    }
  }

  /**
   * Start continuous stats update
   */
  startStatsUpdate() {
    setInterval(() => {
      if (this.visualizer) {
        this.fpsEl.textContent = this.visualizer.getFPS();
      }
    }, 500);
  }

  /**
   * Update edge visibility based on toggle states
   */
  updateEdgeVisibility() {
    if (!this.visualizer) return;

    const visibilityState = {
      embodied: this.toggleEmbodied.checked,
      print: this.togglePrint.checked,
      broadcast: this.toggleBroadcast.checked,
      internet: this.toggleInternet.checked,
      algorithmic: this.toggleAlgorithmic.checked
    };

    this.visualizer.setEdgeVisibility(visibilityState);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  console.log('Orality Network Model initialized');
});
