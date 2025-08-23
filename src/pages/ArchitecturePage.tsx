
import React from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import {
    MemoryIcon,
    CloudSyncIcon,
    BeakerIcon,
    SparklesIcon
} from '../components/ui/Icons';
import { motion } from 'framer-motion';

// Data structure based on the provided "OMC" document.

interface SmartTag {
  name: string;
}

interface SubModule {
  title: string;
  description: string;
  tags: SmartTag[];
}

interface OmcNode {
  id: 'k' | 'l' | 'a' | 'e';
  title: string;
  description: string;
  icon: React.FC<{className?: string}>;
  subModules: SubModule[];
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

const omcArchitectureData: OmcNode[] = [
    {
        id: 'k',
        title: "OMC-K: 知識聖殿 (Knowledge-Node)",
        description: "核心目標：實現全生命週期知識獲取、管理、推理與應用，成為萬能化身的智慧基石。",
        icon: MemoryIcon,
        color: 'secondary',
        subModules: [
            {
                title: "數據攝取與標準化 (Data Ingestion & Standardization)",
                description: "目標：自動化收集並清洗來自所有內外部來源的數據，確保數據質量與一致性。",
                tags: [{ name: "#數據源泉" }, { name: "#純化爐" }]
            },
            {
                title: "知識圖譜構建與維護 (Knowledge Graph Construction & Maintenance)",
                description: "目標：將非結構化與結構化數據轉化為互聯的知識圖譜，支持複雜關係推理。",
                tags: [{ name: "#智慧星圖" }, { name: "#關係引擎" }]
            },
            {
                title: "語義理解與情境推理 (Semantic Understanding & Contextual Reasoning)",
                description: "目標：深入理解用戶意圖與環境上下文，進行高階邏輯與因果推理。",
                tags: [{ name: "#意圖之眼" }, { name: "#邏輯聖裁" }]
            },
            {
                title: "記憶與回溯管理 (Memory & Recall Management)",
                description: "目標：高效管理短期、長期記憶，實現無縫的歷史對話與知識回溯。",
                tags: [{ name: "#記憶聖所" }, { name: "#全知回廊" }]
            },
        ],
    },
    {
        id: 'l',
        title: "OMC-L: 連結符文 (Linkage-Node)",
        description: "核心目標：實現萬能化身與所有內外部系統、API的無縫、安全、高效量子級互聯。",
        icon: CloudSyncIcon,
        color: 'accent',
        subModules: [
            {
                title: "API 量子級集成 (API Quantum Integration)",
                description: "目標：完成與主流商業應用、底層服務、第三方平台的雙向、實時、低延遲數據交換。",
                tags: [{ name: "#神諭接口" }, { name: "#跨維橋樑" }]
            },
            {
                title: "認證與權限管理 (Authentication & Authorization)",
                description: "目標：確保所有外部調用與數據傳輸的安全性與合規性。",
                tags: [{ name: "#安全聖盾" }, { name: "#信任之錨" }]
            },
            {
                title: "錯誤處理與容錯機制 (Error Handling & Fault Tolerance)",
                description: "目標：在外部系統故障或異常情況下，確保系統穩定運行並提供清晰反饋。",
                tags: [{ name: "#堅韌結界" }, { name: "#自愈網絡" }]
            },
            {
                title: "數據流轉與同步 (Data Flow & Synchronization)",
                description: "目標：確保跨平台數據的一致性與實時同步，消除信息孤島。",
                tags: [{ name: "#流轉經絡" }, { name: "#統一場域" }]
            },
        ],
    },
    {
        id: 'a',
        title: "OMC-A: 共識代理 (Agency-Node)",
        description: "核心目標：協調多個專業代理、智能任務流，實現自主決策與高效任務執行。",
        icon: BeakerIcon,
        color: 'success',
        subModules: [
            {
                title: "任務分解與規劃 (Task Decomposition & Planning)",
                description: "目標：將複雜高層指令分解為可執行的子任務序列，並製定最優執行路徑。",
                tags: [{ name: "#策略導航" }, { name: "#執行藍圖" }]
            },
            {
                title: "專業代理調度 (Expert Agent Orchestration)",
                description: "目標：根據任務類型，動態調度最合適的專業化代理協同工作。",
                tags: [{ name: "#集群智慧" }, { name: "#能者居之" }]
            },
            {
                title: "決策與行動執行 (Decision Making & Action Execution)",
                description: "目標：基於知識與情境進行智能決策，並通過連結符文執行對應操作。",
                tags: [{ name: "#自主創生" }, { name: "#行動指令" }]
            },
            {
                title: "用戶意圖反饋與驗證 (User Intent Feedback & Validation)",
                description: "目標：確保代理執行與用戶預期一致，並在必要時進行澄清與校準。",
                tags: [{ name: "#協同共振" }, { name: "#精準校準" }]
            },
        ],
    },
    {
        id: 'e',
        title: "OMC-E: 進化奇點 (Evolution-Node)",
        description: "核心目標：實現萬能化身系統的持續學習、自我優化與適應性演進。",
        icon: SparklesIcon,
        color: 'primary',
        subModules: [
            {
                title: "性能監控與度量 (Performance Monitoring & Metrics)",
                description: "目標：實時追蹤所有模塊的關鍵績效指標 (KPI)，識別瓶頸與潛在問題。",
                tags: [{ name: "#效能之眼" }, { name: "#脈動追蹤" }]
            },
            {
                title: "學習與模型調優 (Learning & Model Fine-tuning)",
                description: "目標：基於實時數據與用戶反饋，持續優化內部模型與策略，提升準確性與效率。",
                tags: [{ name: "#原力覺醒" }, { name: "#智慧塑型" }]
            },
            {
                title: "熵減與技術債獻祭 (Entropy Reduction & Tech Debt Sacrificing)",
                description: "目標：主動識別並降低系統複雜度與技術債，提升可維護性與長期穩定性。",
                tags: [{ name: "#熵減寶石" }, { name: "#淨化聖典" }]
            },
            {
                title: "預測與適應性調整 (Prediction & Adaptive Adjustment)",
                description: "目標：基於歷史數據與趨勢，預測未來需求與挑戰，並自動調整系統行為。",
                tags: [{ name: "#未來視界" }, { name: "#靈動調校" }]
            },
        ],
    },
];

const ArchitecturePage: React.FC = () => {
  const { theme, themeMode } = useTheme();

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navArchitecture} />
        <TrilingualText as="p" text={theme.vocabulary.architectureSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {omcArchitectureData.map((node, index) => {
          const color = theme.palette[themeMode][node.color];
          const IconComponent = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full border-l-4"
                style={{borderColor: color}}
              >
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 flex-shrink-0" style={{ color }}>
                        <IconComponent className="h-full w-full" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold" style={{color}}>{node.title}</h2>
                        <p className="text-sm text-foreground/70">{node.description}</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                  {node.subModules.map(sub => (
                    <div key={sub.title} className="p-4 rounded-lg bg-background/50 border border-border/50">
                        <h4 className="font-bold text-card-foreground">{sub.title}</h4>
                        <p className="text-xs text-card-foreground/60 mb-2">{sub.description}</p>
                        <div className="flex flex-wrap gap-2">
                           {sub.tags.map(tag => (
                              <span key={tag.name} className="px-2 py-1 text-xs font-semibold rounded-full font-mono" style={{backgroundColor: `${color}20`, color}}>
                                {tag.name}
                              </span>
                           ))}
                        </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
};

export default ArchitecturePage;
