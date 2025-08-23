import express from 'express';
import cors from 'cors';
import { SupervisorAgent } from '../agents/supervisor.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 啟動神諭議會背景運作
const council = new SupervisorAgent();
council.activatePassiveAgents();

app.get('/api', (req, res) => {
  res.send('神域主腦後端已上線。');
});

// 範例API端點
app.get('/api/tasks', (req, res) => {
  // 未來將從「阿卡西記錄」中獲取
  res.json([{ id: 1, text: '分析宇宙常數' }]);
});

app.listen(PORT, () => {
  console.log(`[神域主腦] 正在監聽 ${PORT} 埠口... 萬象皆在掌控之中。`);
});