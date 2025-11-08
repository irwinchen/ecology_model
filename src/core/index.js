/**
 * index.js
 *
 * Core module exports
 */

export { Node } from './Node.js';
export { FeedbackLoop } from './FeedbackLoop.js';
export { NetworkGenerator } from './NetworkGenerator.js';
export {
  ERA_CONFIGS,
  ensureMinimumRoles,
  calculateActualReach,
  shouldRenderEdge,
  getEdgeRepresentation
} from './config.js';

export default { Node, FeedbackLoop, NetworkGenerator, ERA_CONFIGS };
