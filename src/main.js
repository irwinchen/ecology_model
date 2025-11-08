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
    this.currentEdgeStyle = 'straight';

    // DOM elements
    this.container = document.getElementById('container');
    this.eraSelect = document.getElementById('era-select');
    this.edgeStyleSelect = document.getElementById('edge-style-select');
    this.themeToggle = document.getElementById('theme-toggle');
    this.generateBtn = document.getElementById('generate-btn');
    this.simulateBtn = document.getElementById('simulate-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.loading = document.getElementById('loading');
    this.stats = document.getElementById('stats');

    // Stats elements
    this.fpsEl = document.getElementById('fps');
    this.nodesEl = document.getElementById('nodes');
    this.edgesEl = document.getElementById('edges');
    this.cognitiveLoadEl = document.getElementById('cognitive-load');
    this.homeostasisEl = document.getElementById('homeostasis');
    this.emotionalEl = document.getElementById('emotional');
    this.polarizationEl = document.getElementById('polarization');
    this.doubleBindEl = document.getElementById('double-bind');

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
    this.edgeStyleSelect.addEventListener('change', (e) =>
      this.changeEdgeStyle(e.target.value)
    );
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
   * Change edge style (straight/curved)
   */
  changeEdgeStyle(style) {
    this.currentEdgeStyle = style;

    // Update visualizer edge style if it exists
    if (this.visualizer) {
      this.visualizer.setEdgeStyle(style);
    }

    console.log(`Edge style changed to ${style}`);
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

      // Create visualization with current theme and edge style
      this.visualizer = new Visualizer(this.container, this.network_data, {
        theme: this.currentTheme,
        edge_style: this.currentEdgeStyle
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

    console.log('Reset complete');
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
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  console.log('Orality Network Model initialized');
});
