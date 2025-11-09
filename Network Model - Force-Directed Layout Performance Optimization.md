---
title: Network Model - Force-Directed Layout Performance Optimization
date: 2025-11-08
tags: [performance-optimization, network-model, algorithmic-era, force-directed-layout, gpu-optimization, webgl]
status: complete
type: note
---

# Network Model - Force-Directed Layout Performance Optimization

## Problem Statement
The network generation process for the Algorithmic Era model was experiencing catastrophic performance degradation due to an O(n²) complexity issue in the force-directed layout algorithm.

## Performance Challenge
- **Original Complexity**: O(iterations × edges²)
- **Network Scale**: 8,000 nodes, 3.6 million edges
- **Core Issue**: `hasEmbodiedConnectionBetween()` method called repeatedly during force simulation loop

## Optimization Strategy
### Key Refactoring Steps
1. **Pre-computation Approach**
   - Created `initializePositions()` for random node positioning
   - Implemented `precomputeForceStrengths()` to:
     - Build a Map of embodied connections
     - Pre-compute `force_strength` for each edge
   - Renamed `positionNodes()` to `runForceDirectedLayout()`

### Connection Handling Logic
- Only 25% of internet connections without embodied connections have gravitational pull
- Full attraction strength for internet connections between nodes with embodied connections
- Algorithmic connections have zero positioning force

## Performance Metrics
- **Before Optimization**: O(iterations × edges²) = 300 × 3.6M² (catastrophic hang)
- **After Optimization**: O(edges) + O(iterations × edges) = Manageable computation

## Files Modified
- `/src/core/NetworkGenerator.js`
- `/vite.config.js` (port change to 5173)

## Implementation Notes
- Added console logging to track connection creation phases
- Ongoing testing to verify complete network generation

## Implications
This optimization is critical for scaling the network model, particularly for large-scale simulations of the Algorithmic Era's communication networks.

## Related Nodes
- [[Algorithmic Era]]
- [[Network Topology]]
- [[Computational Complexity]]

## GPU Rendering Optimization (Follow-up)

After resolving the CPU generation bottleneck, a second critical issue emerged during rendering:

### Problem: WebGL Context Loss
- **Symptom**: Nodes rendering then immediately disappearing, WebGL context loss/restore cycles
- **Root Cause**: GPU memory exhaustion from rendering 15,000 edges with curved geometry (20 segments each)
- **Network Scale**: 8,000 nodes visible, but 3.6M edges overwhelmed GPU even with sampling

### Solution: Aggressive Edge Culling + Context Recovery
1. **Reduced rendering budget**: 15,000 → 5,000 edges (67% reduction)
   - Stratified sampling ensures proportional representation of all connection types
   - Each medium (embodied, print, broadcast, internet, algorithmic) gets fair share based on proportion

2. **WebGL context recovery handlers**:
   ```javascript
   // Context loss: Pause rendering, prevent error loops
   renderer.domElement.addEventListener('webglcontextlost', ...)

   // Context restore: Recreate scene automatically
   renderer.domElement.addEventListener('webglcontextrestored', ...)
   ```

### Performance Results
- **Before**: Context loss, visual glitches, browser unresponsive
- **After**: Stable 15 FPS, smooth rendering, no GPU errors
- **Visual Quality**: Maintained via intelligent stratified sampling

## Files Modified
- `/Model/src/core/NetworkGenerator.js` - Force-directed layout pre-computation
- `/Model/src/core/config.js` - Edge rendering limits per era
- `/Model/src/visualization/Visualizer.js` - WebGL context recovery handlers
- `/Model/vite.config.js` - Port change to 5173

## Deployment
- **Repository**: https://github.com/irwinchen/ecology_model
- **Branch**: feature/planar-force-layout → main
- **GitHub Pages**: Auto-deploys from main branch
- **Commit**: f99a99d

## Implications
These dual optimizations (CPU + GPU) demonstrate the full-stack nature of performance work in computational models:
1. **Algorithmic efficiency** (CPU): O(n²) → O(n) via pre-computation
2. **Resource management** (GPU): Graceful degradation and recovery under extreme load
3. **Visual fidelity**: Stratified sampling preserves insights while respecting hardware limits

The work reveals how modern web-based visualizations must carefully balance:
- **Conceptual completeness** (modeling all 3.6M connections)
- **Computational feasibility** (generating network in reasonable time)
- **Rendering capability** (displaying results without crashing GPU)

## Reflections
The optimization journey demonstrates the importance of **multi-layer performance thinking** in computational models:
- First layer: Algorithmic complexity (force simulation)
- Second layer: GPU rendering limits (WebGL capabilities)
- Third layer: User experience (graceful degradation vs. crashes)

Each layer required distinct solutions, but together they enable the visualization of communication networks at unprecedented scale for a web-based academic tool.