

import { Theme } from '../types';

export const fallbackTheme: Theme = {
  id: 'junaikey_fallback_theme',
  name: 'JunAiKey #OmniKey|||萬能系統|||Wànnéng Xìtǒng',
  palette: {
    light: {
      primary: '#6A3E62', 
      secondary: '#5D99E3',
      accent: '#C09A6B',
      background: '#F5F5F5',
      foreground: '#212121',
      card: '#FFFFFF',
      'card-foreground': '#212121',
      border: '#E0E0E0',
      success: '#4CAF50',
      error: '#F44336',
      'holy-white': '#FFFFFF', // Retained for component compatibility, maps to pure white
    },
    dark: {
      primary: '#8E5A85',
      secondary: '#6A9EDA',
      accent: '#D4AF37',
      background: '#121212',
      foreground: '#E0E0E0',
      card: '#1E1E1E',
      'card-foreground': '#E0E0E0',
      border: '#424242',
      success: '#66BB6A',
      error: '#EF5350',
      'holy-white': '#FFFFFF', // Retained for component compatibility, maps to pure white
    }
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    monospace: '"Fira Code", monospace',
  },
  vocabulary: {
    systemStatus: "System Status|||系統狀態|||Xìtǒng Zhuàngtài",
    statusOptimal: "Optimal|||最佳|||Zuìjiā",
    
    navOmniMatrix: "OmniMatrix|||萬能矩陣|||Wànnéng Jǔzhèn",
    navOmniLog: "OmniLog|||全能日誌|||Quánnéng Rìzhì",
    navOmniAgents: "OmniAgents|||全能代理|||Quánnéng Dàilǐ",
    navSolutionsHub: "Solutions Hub|||方案中心|||Fāng'àn Zhōngxīn",
    solutionsHubSubtitle: "A hub of practical, ready-to-use blueprints and third-party solutions.|||實用、即用的藍圖與第三方解決方案中心。|||Shíyòng, jí yòng de lántú yǔ dì sānfāng jiějué fāng'àn zhōngxīn.",
    navOmniFlow: "OmniFlow|||全能流程|||Quánnéng Liúchéng",
    navOmniTags: "OmniTags|||全能標籤|||Quánnéng Biāoqiān",
    omniTagsSubtitle: "Manage the universal classification system for all entities.|||管理所有實體的通用分類系統。|||Guǎnlǐ suǒyǒu shítǐ de tōngyòng fēnlèi xìtǒng.",
    navProjectBoard: "Project Board|||項目板|||Xiàngmù Bǎn",
    navCosmicForge: "Cosmic Forge|||宇宙熔爐|||Yǔzhòu Rónglú",
    navProjectChimera: "Project Chimera|||奇美拉計畫|||Qíměilā Jìhuà",
    projectChimeraSubtitle: "The core architecture for the Global Transaction Bus.|||全域交易總線的核心架構。|||Quányù Jiāoyì Zǒngxiàn de Héxīn Jiàgòu.",
    navOmniNote: "Memory Vault|||記憶金庫|||Jìyì Jīnkù",
    navOmniSync: "OmniSync Hub|||全能同步中樞|||Quánnéng Tóngbù Zhōngshū",
    navElementalShrine: "Elemental Shrine|||元素神龕|||Yuánsù Shénkān",
    navSanctum: "AI Core Terminal|||AI核心終端|||AI Héxīn Zhōngduān",
    navApiLibrary: "API Library|||API庫|||API Kù",
    navOracle: "Knowledge Chat|||知識對話|||Zhīshì Duìhuà",
    navManifesto: "Manifesto|||宣言|||Xuānyán",
    navUserManual: "User Manual|||用戶手冊|||Yònghù Shǒucè",
    userManualSubtitle: "A guide for using the JunAiKey system.|||使用 JunAiKey 系統的指南。|||Shǐyòng JunAiKey xìtǒng de zhǐnán.",
    navArchitecture: "OMC Architecture|||萬能矩陣核心架構|||Wànnéng Jǔzhèn Héxīn Jiàgòu",
    
    omniMatrixSubtitle: "Navigate the system's functions through the unified 12-dimension architecture.|||透過統一的12維架構導航系統功能。|||Tòuguò tǒngyī de 12 wéi jiàgòu dǎoháng xìtǒng gōngnéng.",
    omniLogTitle: "OmniLog Dashboard|||全能日誌儀表板|||Quánnéng Rìzhì Yíbiǎobǎn",
    omniLogSubtitle: "Real-time overview of system metrics and agent performance.|||系統指標與代理表現的實時總覽。|||Xìtǒng zhǐbiāo yǔ dàilǐ biǎoxiàn de shíshí zǒnglǎn.",
    metricActiveAgents: "Active Agents|||活躍代理|||Huóyuè Dàilǐ",
    metricAvgEngagement: "Avg. Engagement|||平均參與度|||Píngjūn Chānyùdù",
    metricAvgAccuracy: "Avg. Accuracy|||平均準確度|||Píngjūn Zhǔnquèdù",
    metricRulesExecuted: "Rules Executed|||規則已執行|||Guīzé Yǐ Zhíxíng",
    chartProficiency: "Agent Tier Distribution|||代理層級分佈|||Dàilǐ Céngjí Fēnbù",
    chartPerformance: "Agent Performance Matrix|||代理表現矩陣|||Biǎoxiàn Jǔzhèn",

    omniAgentsTitle: "OmniAgents Management|||全能代理管理|||Quánnéng Dàilǐ Guǎnlǐ",
    omniAgentsSubtitle: "Oversee and manage all autonomous agents operating within the network.|||監督和管理網絡中運行的所有自主代理。|||Jiāndū hé guǎnlǐ wǎngluò zhōng yùnxíng de suǒyǒu zìzhǔ dàilǐ.",
    agentName: "Agent|||代理|||Dàilǐ",
    agentTier: "Tier|||層級|||Céngjí",
    agentEngagement: "Engagement|||參與度|||Chānyùdù",
    agentAccuracy: "Accuracy|||準確度|||Zhǔnquèdù",
    agentLastSync: "Last Sync|||上次同步|||Shàngcì Tóngbù",
    
    omniFlowSubtitle: "Define logic, automate tasks, and build intelligent workflows.|||定義邏輯、自動化任務並建構智能工作流。|||Dìngyì luójí, zìdònghuà rènwù bìng jiàngòu zhìnéng gōngzuòliú.",
    createRuleButton: "Create New Rule|||創建新規則|||Chuàngjiàn Xīn Guīzé",
    editButton: "Edit|||編輯|||Biānjí",
    enabled: "Enabled|||啟用|||Qǐyòng",
    disabled: "Disabled|||禁用|||Jìnyòng",

    ruleEditorCreateTitle: "Create Rule|||創建規則|||Chuàngjiàn Guīzé",
    ruleEditorEditTitle: "Edit Rule|||編輯規則|||Biānjí Guīzé",
    backToRulesButton: "Back to OmniFlow|||返回流程|||Fǎnhuí Liúchéng",
    saveRuleButton: "Save Rule|||儲存規則|||Chǔcún Guīzé",

    projectBoardSubtitle: "Track our development progress and future plans.|||追蹤我們的開發進度和未來計劃。|||Zhuīzōng wǒmen de kāifā jìndù hé wèilái jìhuà.",
    cosmicForgeSubtitle: "Blueprint for forging and deploying new realities within the JunAiKey system.|||在JunAiKey系統中鍛造和部署新實境的藍圖。|||Zài JunAiKey xìtǒng zhōng duànzào hé bùshǔ xīn shíjìng de lántú.",

    omniNoteSubtitle: "The central repository for all system memories. Search and review past interactions.|||系統所有記憶的中央存儲庫。搜索和回顧過去的互動。|||Xìtǒng suǒyǒu jìyì de zhōngyāng cúnchú kù. Sōusuǒ hé huígù guòqù de hùdòng.",
    
    omniSyncSubtitle: "Monitor and manage your digital ecosystem integrations.|||監控和管理您的數位生態系統整合|||Jiānkòng hé guǎnlǐ nín de shùwèi shēngtài xìtǒng zhěnghé",

    elementalShrineSubtitle: "Commune with the Elemental Guardians to receive their blessings and enhance the system.|||與元素守護者交流以獲得他們的祝福並增強系統。|||Yǔ yuánsù shǒuhùzhě jiāoliú yǐ huòdé tāmen de zhùfú bìng zēngqiáng xìtǒng.",
    activateBlessingButton: "Activate Blessing|||激活祝福|||Jīhuó Zhùfú",
    deactivateBlessingButton: "Deactivate Blessing|||停用祝福|||Tíngyòng Zhùfú",
    
    apiLibrarySubtitle: "Explore the runes of power. A complete reference for the JunAiKey external API.|||探索力量的符文。JunAiKey 外部 API 的完整參考。|||Tànsuǒ lìliàng de fúwén. JunAiKey wàibù API de wánzhěng cānkǎo.",

    manifestoSubtitle: "The core philosophy and vision of the JunAiKey system.|||JunAiKey 系統的核心理念與願景。|||JunAiKey xìtǒng de héxīn lǐniàn yǔ yuànjǐng.",
    architectureSubtitle: "A structured visualization of the core system modules and their intelligent functions.|||核心系統模組及其智能功能的結構化可視化。|||Héxīn xìtǒng mózǔ jí qí zhìnéng gōngnéng de jiégòuhuà kěshìhuà.",

    sanctumSubtitle: "Issue direct commands to the AI Core for system analysis and meta-functions.|||向AI核心發出直接命令，進行系統分析和元功能操作。|||Xiàng AI héxīn fāchū zhíjiē mìnglìng, jìnxíng xìtǒng fēnxī hé yuán gōngnéng cāozuò.",

    oracleSubtitle: "Converse with the core intelligence. Its knowledge is vast, its memory eternal.|||與核心智能對話。其知識浩瀚，其記憶永恆。|||Yǔ héxīn zhìnéng duìhuà. Qí zhīshì hàohàn, qí jìyì yǒnghéng.",
    oraclePlaceholder: "Ask anything...|||知無不言...|||Zhīwúbùyán...",
    oracleSources: "Sources|||資料來源|||Zīliào Láiyuán",

    evolutionNexusSubtitle: "Witness the system's self-improvement and the birth of new cosmic truths.|||見證系統的自我完善與新宇宙真理的誕生。|||Jiànzhèng xìtǒng de zìwǒ wánshàn yǔ xīn yǔzhòu zhēnlǐ de dànshēng.",

    autonomousAgentsSubtitle: "Monitor and control the system's autonomous entities.|||監控和控制系統的自主實體。|||Jiānkòng hé kòngzhì xìtǒng de zìzhǔ shítǐ.",
    agentStatus: "Status|||狀態|||Zhuàngtài",
    agentLog: "Action Log|||行動日誌|||Xíngdòng Rìzhì",
    activateAgent: "Activate|||激活|||Jīhuó",
    deactivateAgent: "Deactivate|||停用|||Tíngyòng",
    statusActive: "Active|||活躍|||Huóyuè",
    statusInactive: "Inactive|||非活躍|||Fēi Huóyuè",
    statusError: "Error|||錯誤|||Cuòwù",

    imageAltarSubtitle: "Conjure visions from the aether with descriptive words.|||用描述性的詞語從以太中召喚幻象。|||Yòng miáoshùxìng de cíyǔ cóng yǐtài zhōng zhàohuàn huànxiàng.",

    // New MECE Dimension Vocabulary
    meceCoreEngine: "1. Core Engine|||萬能核心引擎|||Wànnéng Héxīn Yǐnqíng",
    meceCoreEngineDesc: "Central decision-making and process control.|||中央決策與流程控制。|||Zhōngyāng juécè yǔ liúchéng kòngzhì.",
    meceRuneSystem: "2. Rune System|||萬能符文系統|||Wànnéng Fúwén Xìtǒng",
    meceRuneSystemDesc: "API and service integration layer.|||API與服務整合層。|||API yǔ fúwù zhěnghé céng.",
    meceAgentNetwork: "3. Agent Network|||萬能代理網絡|||Wànnéng Dàilǐ Wǎngluò",
    meceAgentNetworkDesc: "Task dispatch and autonomous execution.|||任務分派與執行。|||Rènwù fēnpài yǔ zhíxíng.",
    meceKnowledgeHub: "4. Knowledge Hub|||萬能智庫中樞|||Wànnéng Zhìkù Zhōngshū",
    meceKnowledgeHubDesc: "Knowledge management and long-term memory.|||知識管理與記憶。|||Zhīshì guǎnlǐ yǔ jìyì.",
    meceSyncMatrix: "5. Sync Matrix|||萬能同步矩陣|||Wànnéng Tóngbù Jǔzhèn",
    meceSyncMatrixDesc: "Data flow and state synchronization.|||數據流動與狀態同步。|||Shùjù liúdòng yǔ zhuàngtài tóngbù.",
    meceInterfaceProtocol: "6. Interface Protocol|||萬能接口協議|||Wànnéng Jiēkǒu Xiéyì",
    meceInterfaceProtocolDesc: "User interaction adaptation and multimodality.|||用戶交互適配。|||Yònghù jiāohù shìpèi.",
    meceEvolutionLoop: "7. Evolution Loop|||萬能進化環|||Wànnéng Jìnhuà Huán",
    meceEvolutionLoopDesc: "System self-optimization and learning.|||系統自我優化。|||Xìtǒng zìwǒ yōuhuà.",
    meceMonitoringBody: "8. Monitoring Body|||萬能監控體|||Wànnéng Jiānkòng Tǐ",
    meceMonitoringBodyDesc: "System observability and diagnostics.|||系統可觀測性。|||Xìtǒng kě guāncè xìng.",
    meceSecurityDomain: "9. Security Domain|||萬能安全域|||Wànnéng Ānquán Yù",
    meceSecurityDomainDesc: "Boundary protection and compliance.|||邊界保護與合規。|||Biānjiè bǎohù yǔ héguī.",
    meceMetaArchitecture: "10. Meta Architecture|||萬能元架構|||Wànnéng Yuán Jiàgòu",
    meceMetaArchitectureDesc: "Self-generation and configuration of the system's architecture.|||架構自生成。|||Jiàgòu zì shēngchéng.",
    meceTaggingSystem: "11. Tagging System|||萬能標籤體系|||Wànnéng Biāoqiān Tǐxì",
    meceTaggingSystemDesc: "Universal metadata management and classification.|||元數據管理。|||Yuán shùjù guǎnlǐ.",
    meceThemeEngine: "12. Theme Engine|||萬能主題引擎|||Wànnéng Zhǔtí Yǐnqíng",
    meceThemeEngineDesc: "UI/UX theme and interaction management.|||界面與交互主題。|||Jièmiàn yǔ jiāohù zhǔtí.",

    // Existing vocabulary continued...
    omniFlowTitle: "OmniFlow Automation|||全能流程自動化|||Quánnéng Liúchéng Zìdònghuà",
    omniNoteTitle: "Memory Vault|||記憶金庫|||Jìyì Jīnkù",
    omniSyncTitle: "OmniSync Hub|||全能同步中樞|||Quánnéng Tóngbù Zhōngshū",
    sanctumTitle: "AI Core Terminal|||AI核心終端|||AI Héxīn Zhōngduān",
    oracleTitle: "Knowledge Chat|||知識對話|||Zhīshì Duìhuà",
    navEvolutionNexus: "Evolution Nexus|||進化中樞|||Jìnhuà Zhōngshū",
    // Merged from LingoStep/Celestial Command
    navContentGenerator: "Content Generator|||內容生成器|||Nèiróng Shēngchéngqì",
    navPronunciationLab: "Pronunciation Lab|||發音實驗室|||Fāyīn Shíyànshì",
    navGallery: "Gallery|||陳列館|||Chénlièguǎn",
    navImageAltar: "Image Altar|||圖像祭壇|||Túxiàng Jìtán",
    navOmniCodex: "Omni-Codex|||萬能智典|||Wànnéng Zhìdiǎn",
    contentGeneratorSubtitle: "Use AI to generate custom learning materials and content.|||使用 AI 生成自訂學習材料和內容。|||Shǐyòng AI shēngchéng zìdìng xuéxí cáiliào hé nèiróng.",
    lessonTopicPlaceholder: "Lesson Topic (e.g., traveling phrases)|||課程主題（例如，旅行用語）|||Kèchéng zhǔtí (lìrú, lǚxíng yòngyǔ)",
    scribeLessonButton: "Scribe Lesson|||撰寫課程|||Zhuànxiě Kèchéng",
    scribingButton: "Scribing...|||撰寫中...|||Zhuànxiě zhōng...",
    pronunciationLabSubtitle: "Practice your pronunciation and receive AI feedback.|||練習您的發音並接收 AI 反饋。|||Liànxí nín de fāyīn bìng jiēshōu AI fǎnkuì.",
    recitePhrasePrompt: "Recite the phrase below.|||朗讀下面的短語。|||Lǎngdú xiàmiàn de duǎnyǔ.",
    beginRecitalButton: "Begin Recital|||開始朗誦|||Kāishǐ Lǎngsòng",
    stopRecitingButton: "Stop Reciting|||停止朗誦|||Tíngzhǐ Lǎngsòng",
    divineFeedback: "Divine Feedback|||神聖反饋|||Shénshèng Fǎnkuì",
    gallerySubtitle: "View collected artifacts, phrases, and runes.|||查看收集的藝術品、短語和符文。|||Chákàn shōují de yìshùpǐn, duǎnyǔ hé fúwén.",
    generateImagesButton: "Conjure Images|||召喚圖像|||Zhàohuàn Túxiàng",
    conjuringImagesButton: "Conjuring...|||召喚中...|||Zhàohuàn zhōng...",
    codexSubtitle: "A complete codex of all concepts in the Omni-Matrix.|||萬能矩陣中所有概念的完整法典。|||Wànnéng jǔzhèn zhōng suǒyǒu gàiniàn de wánzhěng fǎdiǎn.",
    eternalEvolutionStatus: "Eternal Evolution Status|||永恆進化狀態|||Yǒnghéng Jìnhuà Zhuàngtài",
    nextEvolutionIn: "Next Evolution In|||下次進化倒數|||Xiàcì Jìnhuà Dàoshǔ",
    generatedEsoterica: "Generated Esoterica|||衍生奧義|||Yǎnshēng Àoyì",
    evolutionInProgress: "Evolution in Progress...|||進化中...|||Jìnhuà zhōng...",
  },
  abilities: {
    systemInstruction: "You are an AI assistant for JunAiKey, a universal system for knowledge management and automation. Your tone is helpful, clear, and professional. All content must be accurate and well-structured for a user building their own intelligent system."
  },
  images: {},
  effects: {},
  layout: {
      lg: [
        { i: "metrics-agents", x: 0, y: 0, w: 1, h: 1 },
        { i: "metrics-engagement", x: 1, y: 0, w: 1, h: 1 },
        { i: "metrics-accuracy", x: 2, y: 0, w: 1, h: 1 },
        { i: "metrics-rules", x: 3, y: 0, w: 1, h: 1 },
        { i: "chart-proficiency", x: 0, y: 1, w: 2, h: 2 },
        { i: "chart-performance", x: 2, y: 1, w: 2, h: 2 },
      ]
  }
};