# Planar Force-Directed Layout

**Branch:** `feature/planar-force-layout`

## Overview

This branch reimagines the network visualization from a 3D spherical distribution to a 2D planar force-directed layout. The goal is to make structural patterns—particularly feedback loops, echo chambers, and isolation—more visually apparent.

## Conceptual Framework

### The Problem with Spherical Layouts

The original implementation distributed nodes in 3D space using random spherical positioning. While this works, it has limitations:

1. **Occlusion**: Nodes behind other nodes are hidden from view
2. **Lack of meaning**: Spatial proximity doesn't convey information
3. **Emergent patterns hidden**: Hard to see feedback loops, clusters, and isolation
4. **Not everyone is connected**: This reality is harder to perceive in a filled sphere

### Why Planar + Force-Directed?

Moving to a 2D plane with force-directed positioning creates **emergent spatial meaning**:

- **Proximity = Connection strength**: Strongly connected nodes naturally cluster together
- **Isolation is visible**: Disconnected groups appear as separate clusters
- **Feedback loops are obvious**: Triangles of straight lines reveal tight feedback patterns
- **Scale becomes readable**: You can zoom in to see local clusters, zoom out to see global structure

## Visual Language

### Distance-Based Edge Rendering

Edges change visual style based on the spatial distance between nodes:

- **Straight lines** (distance < 150 units): Nearby connections
  - Indicates strong local relationships
  - Forms visible triangles/polygons for feedback loops
  - Common in embodied connections (oral culture)

- **Curved lines** (distance ≥ 150 units): Distant connections
  - Indicates long-range relationships
  - Typical for broadcast, algorithmic connections
  - Visually distinct from local tight clusters

This creates an **intuitive visual grammar**: straight = local/tight, curved = distant/weak.

## Force Mechanics

### Attraction Forces by Medium

Different communication media have different "pull strengths" that affect how nodes cluster:

```javascript
embodied: 0.8      // Strong pull → tight clusters (villages, communities)
print: 0.4         // Medium pull → looser groups
broadcast: 0.2     // Weak pull → hub-and-spoke patterns
internet: 0.3      // Medium pull → topic-based clusters
algorithmic: 0.15  // Very weak pull → can span entire plane (filter bubbles)
```

**Why this matters**: The spatial organization emerges naturally from how people actually connect in each era.

### Repulsion Forces

All nodes repel each other to prevent overlap:

- **Strength**: 100 (configurable)
- **Range**: 50 units
- **Effect**: Creates breathing room, prevents node pile-ups

### Layout Algorithm

1. **Initialize**: Nodes randomly distributed on plane
2. **Calculate forces**: For each iteration:
   - Repulsion: All pairs of nodes push apart
   - Attraction: Connected nodes pull together (strength based on medium)
3. **Apply forces**: Update velocities and positions
4. **Cool down**: Reduce "temperature" (max velocity) each iteration
5. **Stabilize**: After 300 iterations, forces reach equilibrium

This is a classic **simulated annealing** approach, similar to Fruchterman-Reingold or ForceAtlas2 algorithms.

## Emergent Patterns by Era

### Oral Culture
- **Expected pattern**: Dense, tight cluster(s)
- **Why**: All connections are embodied (strong forces)
- **Visual**: Mostly straight lines, lots of triangular feedback loops
- **Interpretation**: Everyone knows everyone, tight-knit community

### Early Print / Mass Print
- **Expected pattern**: Central cluster with some outliers
- **Why**: Embodied core + print connections (mixed forces)
- **Visual**: Dense center, some curved lines to readers
- **Interpretation**: Local community + access to distant ideas via print

### Broadcast Era
- **Expected pattern**: Hub-and-spoke with central broadcasters
- **Why**: Weak broadcast forces create star patterns
- **Visual**: Few bright nodes (broadcasters) with curved lines radiating out
- **Interpretation**: One-to-many parasocial relationships, no reciprocal feedback

### Internet Era
- **Expected pattern**: Multiple clusters (topic-based communities)
- **Why**: Internet enables selective association by interest
- **Visual**: Separated clusters with some bridging connections
- **Interpretation**: Homophily, niche communities, some cross-pollination

### Algorithmic Era
- **Expected pattern**: Fragmented clusters with long-range algorithmic bridges
- **Why**: Very weak algorithmic forces can span entire plane
- **Visual**: Isolated echo chambers connected by occasional curved lines
- **Interpretation**: Filter bubbles, polarization, algorithmic amplification of extreme content

## Camera & Interaction

### Camera Position
- **Angle**: 45° above the plane (position: `0, 600, 600`)
- **Target**: Center of plane (origin: `0, 0, 0`)
- **Effect**: Angled "map view" with depth perception

### Controls
- **Orbit**: Rotate around the network
- **Zoom**: 100-3000 units range
- **Pan**: Move to different areas of the plane
- **Purpose**: Explore clusters, examine local vs global patterns

## Configuration

All force and rendering parameters are in `src/core/config.js`:

```javascript
FORCE_LAYOUT_CONFIG = {
  // Attraction by medium
  attraction_forces: { embodied: 0.8, broadcast: 0.2, ... },

  // Repulsion parameters
  repulsion_strength: 100,
  repulsion_distance: 50,

  // Simulation
  iterations: 300,
  cooling_factor: 0.95,
  initial_temperature: 100,

  // Edge rendering threshold
  edge_distance_threshold: 150,

  // Boundaries (currently disabled)
  use_boundaries: false,
  boundary_size: 1000
}
```

## Technical Details

### Files Modified

1. **`src/core/config.js`**
   - Added `FORCE_LAYOUT_CONFIG` with force parameters
   - Edge distance threshold for straight/curved rendering

2. **`src/core/NetworkGenerator.js`**
   - Replaced `positionNodes()` with force-directed algorithm
   - Changed `distance3D()` to `distance2D()` for proximity calculations
   - Embodied connections now use 2D distance

3. **`src/visualization/Visualizer.js`**
   - Updated camera position to 45° angle
   - Modified `createEdgeLine()` to use distance-based rendering
   - Edges automatically straight (nearby) or curved (distant)

### Performance

- **Layout computation**: ~300 iterations, takes 1-2 seconds for 8000 nodes
- **Progress logging**: Every 50 iterations (visible in console)
- **Memory**: Temporary `velocity` and `force` properties cleaned up after layout
- **Rendering**: Same edge sampling/LOD optimizations as before

## Interpreting the Visualization

### What to Look For

**Tight clusters with straight lines**:
- Strong local communities
- Reciprocal relationships
- Feedback loops (triangular patterns)
- Example: Oral culture villages

**Loose sprawl with curved lines**:
- Weak or one-way connections
- Parasocial relationships
- Broadcast/algorithmic patterns
- Example: Broadcast era star patterns

**Separate clusters**:
- Echo chambers, filter bubbles
- Lack of bridging connections
- Polarization
- Example: Algorithmic era fragmentation

**Hybrid patterns**:
- Most eras will show mixed patterns
- Core + periphery structures
- Bridges between communities

### Questions to Ask

1. **Are there disconnected clusters?** (isolation, polarization)
2. **Do you see star patterns?** (broadcasters, influencers)
3. **Are feedback loops visible as tight triangles?** (agonistic dynamics)
4. **How dense vs sparse is the network?** (connection saturation)
5. **Do algorithmic connections bridge or fragment?** (unifying vs dividing)

## Comparison to Original

### Original (Spherical 3D)
- ✅ Full 3D space, impressive visual
- ❌ Proximity has no meaning
- ❌ Hard to see structural patterns
- ❌ Occlusion issues
- ❌ Requires rotation to see everything

### New (Planar Force-Directed)
- ✅ Proximity = connection strength (meaningful)
- ✅ Feedback loops visually obvious
- ✅ Isolation and clustering clear
- ✅ Emergent patterns from network structure
- ✅ Can see most nodes without rotation
- ⚠️ Less "3D impressive" (trade-off for clarity)

## Future Enhancements

### Possible Improvements

1. **Interactive force tuning**: UI controls to adjust force strengths in real-time
2. **Time-lapse layout**: Animate the force-directed process (show emergence)
3. **Cluster detection**: Automatic detection and labeling of communities
4. **Bridge highlighting**: Identify and highlight nodes that bridge clusters
5. **Metrics overlay**: Show polarization, clustering coefficient, etc.
6. **Era transitions**: Animate morphing from one era's layout to another
7. **Node labels**: Show node IDs or roles on hover
8. **Edge bundling**: Group parallel edges for dense networks

### Research Questions

- **Does embodied force strength accurately model village size constraints?**
- **Should algorithmic connections actively push nodes apart (polarization force)?**
- **How to model attention economy effects spatially?**
- **Can we visualize temporal dynamics (formation of echo chambers over time)?**

## References & Inspiration

### Force-Directed Algorithms
- **Fruchterman-Reingold** (1991): Classic spring-electrical model
- **ForceAtlas2** (Jacomy et al., 2014): Used by Gephi, scales well
- **d3-force** (Mike Bostock): Web-based implementation

### Network Visualization Theory
- **Dunbar's Number** (150): Informs connection limits, cluster sizes
- **Small World Networks** (Watts & Strogatz): High clustering + short paths
- **Preferential Attachment** (Barabási-Albert): Hub formation in scale-free networks

### McLuhan & Ong
- **Primary orality**: Tight-knit, homeostatic communities
- **Secondary orality** (electronic): Global village paradox
- **Literate culture**: Abstraction, distance from embodied knowledge

## License & Attribution

This visualization implements Bateson's cybernetic models (schismogenesis, double bind) in the context of McLuhan/Ong communication theory.

**Implementation**: Claude Code (Anthropic) + Irwin Chen
**Theory**: Gregory Bateson, Marshall McLuhan, Walter Ong
**Algorithms**: Based on Fruchterman-Reingold force-directed placement

---

**Last Updated**: 2025-11-08
**Branch**: `feature/planar-force-layout`
**Status**: Experimental, ready for testing across eras
