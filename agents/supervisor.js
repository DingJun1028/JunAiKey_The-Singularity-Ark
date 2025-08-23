// --- 神域主腦 v4.0: 監督代理 ---
// 職責：協調並管理所有專家代理

import { LinterAgent } from './linter.agent.js';
import { SecurityAuditorAgent } from './security.agent.js';

export class SupervisorAgent {
  constructor() {
    this.linter = new LinterAgent();
    this.securityAuditor = new SecurityAuditorAgent();
    console.log('[監督代理] 神諭議會已成立。');
  }
  
  // 啟動被動和背景運作的代理
  activatePassiveAgents() {
    console.log('[監督代理] 守律者與聖盾衛已進入背景靜默守護模式。');
    // 在真實應用中，這裡會啟動真正的背景進程
    this.linter.start();
    this.securityAuditor.start();
  }
}