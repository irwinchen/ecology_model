# Orality Network Model

An interactive 3D network visualization implementing Gregory Bateson's cybernetic models of **schismogenesis** (runaway escalation) and **double bind** (stress dynamics) across different communication eras.

## Overview

This project models how communication technologies (from oral culture to algorithmic social media) affect network dynamics, cognitive load, homeostasis, and social cohesion. The model implements Bateson's original differential equations using Euler method numerical integration.

## Mathematical Foundation

### Schismogenesis Equations

**Symmetrical schismogenesis** (both parties escalate together):
```
dX/dt = k₁ · Y
dY/dt = k₂ · X
```
Growth rate: √(k₁·k₂), creates exponential runaway

**Complementary schismogenesis** (dominance/submission differentiation):
```
dX/dt = k₁ · Y
dY/dt = -k₂ · X
```

### Double Bind Stress Dynamics

**Stress accumulation**:
```
dS/dt = α · E · B - β · R
```
- S: Stress level (pathological at S > 0.9)
- E: Escape attempt rate
- B: Blocking strength (network effects)
- R: Regulatory capacity
- α, β: Accumulation and relief rates

**Regulatory capacity degradation**:
```
dR/dt = -γ · S · (1 - H)
```
- γ: Degradation rate
- H: Homeostatic capacity

## Features

- **7 Communication Eras**: Oral culture → Early print → Mass print → Broadcast → Early internet → Social media → Algorithmic era
- **Network Generation**: Creates realistic networks with Dunbar's limit, technological access rates, and role distributions
- **Real-time Simulation**: Watch networks evolve with differential equations updating each time step
- **3D Visualization**: Three.js rendering with orbital controls, LOD optimization, and edge sampling
- **Performance Optimization**: Handles 1500-8000 nodes with configurable edge rendering (15-100% sample rate)
- **Live Metrics**: Track cognitive load, homeostasis, emotional state, polarization, and double bind prevalence

## Installation

### Prerequisites

- Node.js 16+ and npm

### Setup

```bash
cd /Users/irwinchen/vaults/Orality/Model
npm install
```

## Running the Application

### Development mode (with hot reload)

```bash
npm run dev
```

Open browser to http://localhost:5173

### Build for production

```bash
npm run build
```

Output in `dist/` directory.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
Model/
├── src/
│   ├── core/
│   │   ├── Node.js              # Node class with Bateson equations
│   │   ├── FeedbackLoop.js      # Positive/negative feedback loops
│   │   ├── NetworkGenerator.js  # Main network generation algorithm
│   │   ├── config.js            # ERA_CONFIGS and helper functions
│   │   └── index.js             # Core module exports
│   ├── visualization/
│   │   └── Visualizer.js        # Three.js visualization
│   └── main.js                  # Application entry point
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Usage

1. **Select an era** from the dropdown (default: Algorithmic Era)
2. **Click "Generate Network"** to create the network (takes 5-15 seconds depending on era)
3. **Click "Start Simulation"** to run the differential equations and watch dynamics evolve
4. **Use mouse to navigate**:
   - Left drag: Rotate camera
   - Right drag: Pan camera
   - Scroll: Zoom in/out

### Visual Legend

- **Blue nodes**: Consumers (most common)
- **Green nodes**: Creators (authors, publishers, content creators)
- **Red nodes**: Broadcasters (rare, high reach)

Node size increases with cognitive overload. Nodes pulse when experiencing double bind stress.

### Edge Colors

- **Gray**: Embodied (face-to-face)
- **Green**: Print connections
- **Red**: Broadcast (parasocial)
- **Blue**: Internet connections
- **Magenta**: Algorithmic (social media feed)

Edge opacity reflects connection strength.

## Configuration Presets

Each era has optimized settings:

| Era | Population | Edge Sampling | Reach Multiplier | Notes |
|-----|-----------|---------------|------------------|-------|
| Oral Culture | 1500 | 100% | 1x | Multiple villages |
| Early Print | 2000 | 80% | 5x | Guaranteed 8 creators, 300 literate |
| Mass Print | 2500 | 60% | 10x | Yellow journalism emerges |
| Broadcast | 4000 | 40% | 50x (1000x broadcasters) | Guaranteed 12 broadcasters |
| Early Internet | 4000 | 30% | 20x | Topic-based clustering |
| Social Media | 6000 | 20% | 10x (100x viral) | 5% schismogenesis participants |
| Algorithmic | 8000 | 15% | 5x (500x viral) | LOD rendering, 3% schismogenesis |

See `src/core/config.js` for full configuration details.

## Performance Notes

**Three.js (current implementation)**:
- Oral/Early Print (1500-2000 nodes): 60 FPS
- Mass Print/Broadcast (2500-4000 nodes): 30-60 FPS
- Social Media (6000 nodes): 20-30 FPS
- Algorithmic (8000 nodes): 15-30 FPS

**Future Unity WebGL migration**:
- All eras: 60 FPS
- Can increase population 2-3x
- Can render 50-80% of edges (vs 15-20%)

## Key Metrics

- **Avg Cognitive Load**: Mean information processing burden
- **Homeostatic Balance**: % of nodes within healthy emotional range
- **Avg Emotional State**: 0 (calm) to 1 (agitated)
- **Tribal Polarization**: Average schismogenesis escalation level
- **In Double Bind**: % experiencing algorithmic entrapment

## Architecture Decisions

### Maximum Accessibility Strategy

The implementation uses a **three.js → Unity WebGL migration path**:

1. **Start with three.js**: Browser-based, zero installation, fast iteration
2. **Optimize for web**: Edge sampling, LOD, strength thresholds
3. **Migrate to Unity WebGL if needed**: Better performance, still browser-based
4. **Rejected Swift**: Mac-only, no web access, limits audience

### Guaranteed Minimums

Configuration ensures rare roles always appear:
- Early print: minimum 8 creators, 300 literate
- Broadcast: minimum 12 broadcasters
- Uses `ensureMinimumRoles()` to promote random nodes after assignment

### Reach Multipliers

Simulated connections represent actual reach beyond the graph:
- Oral: 1x (1:1 representation)
- Early print: 5x (300 readers = 1500 actual)
- Broadcast: 1000x (one broadcaster = millions of viewers)
- Viral algorithmic: 500x (100 shares = 50,000 actual)

## References

### Bateson's Work

- Bateson, G. (1936). *Naven*. Cambridge University Press. [Schismogenesis equations]
- Bateson, G. (1972). *Steps to an Ecology of Mind*. University of Chicago Press. [Double bind theory]
- Bateson, G. (1979). *Mind and Nature*. Dutton. [Cybernetic epistemology]

### Network Science

- Dunbar, R. (2021). *Friends: Understanding the Power of our Most Important Relationships*. Little, Brown Book Group.

### Project Documentation

- See `Model/Algorithm.md` for complete mathematical specification
- See `Model/Overview.md` for conceptual framework

## Future Development

Planned features:
- [ ] Control panel for adjusting coupling constants (k₁, k₂)
- [ ] Time-series charts for metrics
- [ ] Node detail view (click to inspect individual state)
- [ ] Intervention modeling (add negative feedback loops)
- [ ] Historical accuracy validation
- [ ] Export network data (JSON, GraphML)
- [ ] Unity WebGL migration for better performance

## License

MIT

---

**Created**: 2025-11-07
**Last Updated**: 2025-11-07
**Status**: Initial implementation complete, ready for testing
