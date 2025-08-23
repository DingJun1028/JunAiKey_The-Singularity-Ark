

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import OmniLogPage from './pages/OmniLogPage';
import OmniAgentsPage from './pages/OmniAgentsPage';
import OmniFlowPage from './pages/OmniFlowPage';
import RuleEditorPage from './pages/RuleEditorPage';
import OmniSyncPage from './pages/OmniSyncPage';
import CustomPage from './pages/CustomPage';
import SanctumPage from './pages/SanctumPage';
import ApiLibraryPage from './pages/ApiLibraryPage';
import OraclePage from './pages/OraclePage';
import OmniNotePage from './pages/OmniNotePage';
import ManifestoPage from './pages/ManifestoPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';
import PronunciationLabPage from './pages/PronunciationLabPage';
import GalleryPage from './pages/GalleryPage';
import OmniCodexPage from './pages/OmniCodexPage';
import ArchitecturePage from './pages/ArchitecturePage';
import { useJunAiKeyStore } from './store/junAiKeyStore';
import AgentDetailPage from './pages/AgentDetailPage';
import ProjectBoardPage from './pages/ProjectBoardPage';
import CosmicForgePage from './pages/CosmicForgePage';
import ElementalShrinePage from './pages/ElementalShrinePage';
import OmniMatrixPage from './pages/OmniMatrixPage';
import EvolutionNexusPage from './pages/EvolutionNexusPage';
import AutonomousAgentsPage from './pages/AutonomousAgentsPage';
import OmniTagsPage from './pages/OmniTagsPage';
import SolutionsHubPage from './pages/ParlantGuidePage';
import ImageAltarPage from './pages/ImageAltarPage';
import ProjectChimeraPage from './pages/ProjectChimeraPage';
import UserManualPage from './pages/UserManualPage';

function App() {
  const { initialize, customPages } = useJunAiKeyStore(state => ({
    initialize: state.initialize,
    customPages: state.customPages,
  }));

  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/app" element={<Layout />}>
              <Route index element={<OmniMatrixPage />} />
              <Route path="omni-matrix" element={<OmniMatrixPage />} />
              <Route path="omni-log" element={<OmniLogPage />} />
              <Route path="omni-agents" element={<OmniAgentsPage />} />
              <Route path="omni-agents/:agentId" element={<AgentDetailPage />} />
              <Route path="solutions-hub" element={<SolutionsHubPage />} />
              <Route path="omni-flow" element={<OmniFlowPage />} />
              <Route path="omni-flow/:ruleId" element={<RuleEditorPage />} />
              <Route path="omni-tags" element={<OmniTagsPage />} />
              <Route path="project-board" element={<ProjectBoardPage />} />
              <Route path="project-chimera" element={<ProjectChimeraPage />} />
              <Route path="cosmic-forge" element={<CosmicForgePage />} />
              <Route path="omni-note" element={<OmniNotePage />} />
              <Route path="omni-sync" element={<OmniSyncPage />} />
              <Route path="elemental-shrine" element={<ElementalShrinePage />} />
              <Route path="autonomous-agents" element={<AutonomousAgentsPage />} />
              <Route path="sanctum" element={<SanctumPage />} />
              <Route path="api-library" element={<ApiLibraryPage />} />
              <Route path="oracle" element={<OraclePage />} />
              <Route path="evolution-nexus" element={<EvolutionNexusPage />} />
              <Route path="architecture" element={<ArchitecturePage />} />
              <Route path="manifesto" element={<ManifestoPage />} />
              <Route path="user-manual" element={<UserManualPage />} />
              
              {/* Merged from LingoStep */}
              <Route path="content-generator" element={<ContentGeneratorPage />} />
              <Route path="pronunciation-lab" element={<PronunciationLabPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="image-altar" element={<ImageAltarPage />} />
              <Route path="omni-codex" element={<OmniCodexPage />} />

              {customPages.map(page => (
                 <Route key={page.id} path={`${page.path}`} element={<CustomPage title={page.name} />} />
              ))}
            </Route>
            
          </Routes>
        </HashRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;