
import { useJunAiKeyStore } from '../store/junAiKeyStore';
import type { JunAiKeyState } from '../types';

export const useJunAiKeyData = () => {
  const data = useJunAiKeyStore(
    (state: JunAiKeyState) => ({
      // State Slices
      agents: state.agents,
      rules: state.rules,
      memories: state.memories,
      galleryItems: state.galleryItems,
      elementalGuardians: state.elementalGuardians,
      collectedArtifactIds: state.collectedArtifactIds,
      activeGuardianIds: state.activeGuardianIds,
      customPages: state.customPages,
      boardColumns: state.boardColumns,
      announcements: state.announcements,
      lastCheckedAnnouncements: state.lastCheckedAnnouncements,
      loading: state.loading,
      
      // Actions
      getAgentById: state.getAgentById,
      getRuleById: state.getRuleById,
      updateRule: state.updateRule,
      addRule: state.addRule,
      addCustomPage: state.addCustomPage,
      addMemory: state.addMemory,
      searchMemories: state.searchMemories,
      toggleArtifact: state.toggleArtifact,
      toggleGuardian: state.toggleGuardian,
      getAllTags: state.getAllTags,
      renameTag: state.renameTag,
      deleteTag: state.deleteTag,
      mergeTags: state.mergeTags,
      setBoardData: state.setBoardData,
      markAllAnnouncementsAsRead: state.markAllAnnouncementsAsRead,

      // Getters
      getClarityBoost: state.getClarityBoost,
      getDevotionBoost: state.getDevotionBoost,
      getSystemEfficiencyBoost: state.getSystemEfficiencyBoost,
      getAiInsightBoost: state.getAiInsightBoost,
    })
  );
  return data;
};