

import {
  SanctumIcon, ApiDocsIcon, StudentsIcon, BeakerIcon, OmniNoteIcon,
  CloudSyncIcon, ChimeraIcon, MicrophoneIcon, ProjectBoardIcon, SparklesIcon,
  BlueprintIcon, DashboardIcon, ManifestoIcon, ArchitectureIcon, TagIcon,
  GalleryIcon, PhotoIcon, ThemeIcon, MatrixIcon, ParlantIcon, OracleIcon, BookOpenIcon
} from '../components/ui/Icons';
import type { MeceDimension } from '../types';

export const OMNI_ARCHITECTURE_DATA: MeceDimension[] = [
  {
    id: 'CoreEngine',
    nameKey: 'meceCoreEngine',
    descriptionKey: 'meceCoreEngineDesc',
    modules: [
      { id: 'omni-flow', nameKey: 'navOmniFlow', descriptionKey: 'omniFlowSubtitle', href: '/app/omni-flow', icon: SanctumIcon },
      { id: 'sanctum', nameKey: 'navSanctum', descriptionKey: 'sanctumSubtitle', href: '/app/sanctum', icon: MatrixIcon },
    ]
  },
  {
    id: 'RuneSystem',
    nameKey: 'meceRuneSystem',
    descriptionKey: 'meceRuneSystemDesc',
    modules: [
      { id: 'api-library', nameKey: 'navApiLibrary', descriptionKey: 'apiLibrarySubtitle', href: '/app/api-library', icon: ApiDocsIcon },
    ]
  },
  {
    id: 'AgentNetwork',
    nameKey: 'meceAgentNetwork',
    descriptionKey: 'meceAgentNetworkDesc',
    modules: [
      { id: 'omni-agents', nameKey: 'navOmniAgents', descriptionKey: 'omniAgentsSubtitle', href: '/app/omni-agents', icon: StudentsIcon },
      { id: 'autonomous-agents', nameKey: 'navAutonomousAgents', descriptionKey: 'autonomousAgentsSubtitle', href: '/app/autonomous-agents', icon: BeakerIcon },
    ]
  },
  {
    id: 'KnowledgeHub',
    nameKey: 'meceKnowledgeHub',
    descriptionKey: 'meceKnowledgeHubDesc',
    modules: [
      { id: 'omni-note', nameKey: 'navOmniNote', descriptionKey: 'omniNoteSubtitle', href: '/app/omni-note', icon: OmniNoteIcon },
      { id: 'omni-codex', nameKey: 'navOmniCodex', descriptionKey: 'codexSubtitle', href: '/app/omni-codex', icon: BookOpenIcon },
      { id: 'oracle', nameKey: 'navOracle', descriptionKey: 'oracleSubtitle', href: '/app/oracle', icon: OracleIcon },
    ]
  },
  {
    id: 'SyncMatrix',
    nameKey: 'meceSyncMatrix',
    descriptionKey: 'meceSyncMatrixDesc',
    modules: [
      { id: 'omni-sync', nameKey: 'navOmniSync', descriptionKey: 'omniSyncSubtitle', href: '/app/omni-sync', icon: CloudSyncIcon },
      { id: 'project-chimera', nameKey: 'navProjectChimera', descriptionKey: 'projectChimeraSubtitle', href: '/app/project-chimera', icon: ChimeraIcon },
    ]
  },
  {
    id: 'InterfaceProtocol',
    nameKey: 'meceInterfaceProtocol',
    descriptionKey: 'meceInterfaceProtocolDesc',
    modules: [
      { id: 'project-board', nameKey: 'navProjectBoard', descriptionKey: 'projectBoardSubtitle', href: '/app/project-board', icon: ProjectBoardIcon },
      { id: 'pronunciation-lab', nameKey: 'navPronunciationLab', descriptionKey: 'pronunciationLabSubtitle', href: '/app/pronunciation-lab', icon: MicrophoneIcon },
      { id: 'solutions-hub', nameKey: 'navSolutionsHub', descriptionKey: 'solutionsHubSubtitle', href: '/app/solutions-hub', icon: ParlantIcon },
    ]
  },
  {
    id: 'EvolutionLoop',
    nameKey: 'meceEvolutionLoop',
    descriptionKey: 'meceEvolutionLoopDesc',
    modules: [
      { id: 'evolution-nexus', nameKey: 'navEvolutionNexus', descriptionKey: 'evolutionNexusSubtitle', href: '/app/evolution-nexus', icon: SparklesIcon },
      { id: 'cosmic-forge', nameKey: 'navCosmicForge', descriptionKey: 'cosmicForgeSubtitle', href: '/app/cosmic-forge', icon: BlueprintIcon },
    ]
  },
  {
    id: 'MonitoringBody',
    nameKey: 'meceMonitoringBody',
    descriptionKey: 'meceMonitoringBodyDesc',
    modules: [
      { id: 'omni-log', nameKey: 'navOmniLog', descriptionKey: 'omniLogSubtitle', href: '/app/omni-log', icon: DashboardIcon },
    ]
  },
  {
    id: 'SecurityDomain',
    nameKey: 'meceSecurityDomain',
    descriptionKey: 'meceSecurityDomainDesc',
    modules: [
      { id: 'manifesto', nameKey: 'navManifesto', descriptionKey: 'manifestoSubtitle', href: '/app/manifesto', icon: ManifestoIcon },
      { id: 'user-manual', nameKey: 'navUserManual', descriptionKey: 'userManualSubtitle', href: '/app/user-manual', icon: BookOpenIcon },
    ]
  },
  {
    id: 'MetaArchitecture',
    nameKey: 'meceMetaArchitecture',
    descriptionKey: 'meceMetaArchitectureDesc',
    modules: [
      { id: 'omni-matrix', nameKey: 'navOmniMatrix', descriptionKey: 'omniMatrixSubtitle', href: '/app/omni-matrix', icon: ArchitectureIcon },
      { id: 'architecture', nameKey: 'navArchitecture', descriptionKey: 'architectureSubtitle', href: '/app/architecture', icon: ArchitectureIcon },
    ]
  },
  {
    id: 'TaggingSystem',
    nameKey: 'meceTaggingSystem',
    descriptionKey: 'meceTaggingSystemDesc',
    modules: [
       { id: 'omni-tags', nameKey: 'navOmniTags', descriptionKey: 'omniTagsSubtitle', href: '/app/omni-tags', icon: TagIcon },
    ]
  },
  {
    id: 'ThemeEngine',
    nameKey: 'meceThemeEngine',
    descriptionKey: 'meceThemeEngineDesc',
    modules: [
      { id: 'gallery', nameKey: 'navGallery', descriptionKey: 'gallerySubtitle', href: '/app/gallery', icon: GalleryIcon },
      { id: 'image-altar', nameKey: 'navImageAltar', descriptionKey: 'imageAltarSubtitle', href: '/app/image-altar', icon: PhotoIcon },
      { id: 'elemental-shrine', nameKey: 'navElementalShrine', descriptionKey: 'elementalShrineSubtitle', href: '/app/elemental-shrine', icon: ThemeIcon },
    ]
  }
];