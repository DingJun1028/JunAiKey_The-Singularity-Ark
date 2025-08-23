

import React from 'react';

// --- Generic ---

export const GenericIcon: React.FC<{ path: string, className?: string }> = ({ path, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "h-6 w-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

// --- UI & Controls ---

export const SunIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.752-2.648z" className={className} />
);

export const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className={className} />
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.565L17.25 21.75l-.352-1.185a3.375 3.375 0 00-2.287-2.287L13.5 18l1.185-.352a3.375 3.375 0 002.287-2.287L17.25 14.25l.352 1.185a3.375 3.375 0 002.287 2.287L21 18l-1.185.352a3.375 3.375 0 00-2.287 2.287z" className={className} />
);

export const BeakerIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M14.25 6.087c0-1.731.676-3.37 1.88-4.587A4.502 4.502 0 0013.5 1.5H10.5A4.502 4.502 0 007.87 2.913c1.204 1.217 1.88 2.856 1.88 4.587v2.163c0 1.02-.38 1.98-.986 2.713A4.486 4.486 0 007.5 12.75v5.25A4.502 4.502 0 0012 22.5h.083A4.502 4.502 0 0016.5 18v-5.25c0-.98-.38-1.93-.986-2.663a4.486 4.486 0 00-1.264-.975V6.087zM15 12.75v5.25a3 3 0 01-3 3H12a3 3 0 01-3-3v-5.25c0-.828.337-1.58.878-2.121.54-.54.878-1.293.878-2.121V6.087c0-1.156.45-2.243 1.241-3.033A3.001 3.001 0 0112 2.25h.083a3.001 3.001 0 012.176.804c.791.79 1.241 1.877 1.241 3.033v2.419c0 .828.337 1.58.878 2.121.54.54.878 1.293.878 2.121z" className={className} />
);

export const ThemeIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402a3.75 3.75 0 00-.615-5.898L9.402 1.2a3.75 3.75 0 00-5.304 0l-1.902 1.902a3.75 3.75 0 000 5.304l6.402 6.401zM18 13.5a3.75 3.75 0 00-5.304 0l-6.401 6.402a3.75 3.75 0 005.304 0l6.401-6.402a3.75 3.75 0 000-5.304l-1.902-1.902a3.75 3.75 0 00-5.304 0l-1.2 1.2" className={className} />
);

export const BellIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" className={className} />
);

export const MicrophoneIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12-3l-1.636-1.636a6 6 0 00-8.486 0L3 8.25m12 0a6 6 0 01-8.486 0L3 8.25M12 15a3 3 0 100-6 3 3 0 000 6z" className={className} />
);

export const PaperclipIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M18.375 12.738-7.1875-7.1875a5.25 5.25 0 0 0-7.425 7.425l7.1875 7.1875a3.75 3.75 0 0 0 5.3-5.3l-5.63-5.63a2.25 2.25 0 1 0-3.18 3.18l3.94 3.94" className={className} />
);

export const QuillIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" className={className} />
);

export const ScrollIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" className={className} />
);

export const QuoteIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m3.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.405m-3.038-5.858A9.753 9.753 0 013 11.25c0-4.556 4.03-8.25 9-8.25a9.76 9.76 0 012.53.405m3.038 5.858a9.753 9.753 0 01.405 2.53c0 .813-.098 1.604-.284 2.35" className={className} />
);

export const RuneIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" className={className} />
);

export const OracleIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className={className} />
);

export const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className={className} />
);

export const FireGuardianIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M15.362 5.214A12.015 12.015 0 0114.5 4.5c-1.312 0-2.522.428-3.5 1.12-1.313 1.05-2.088 2.587-2.088 4.216 0 1.628.775 3.166 2.088 4.216.978.692 2.188 1.12 3.5 1.12.363 0 .717-.06 1.062-.178M15.362 5.214C16.318 6.44 17 8.136 17 10c0 1.864-.682 3.56-1.638 4.786M15.362 5.214C14.456 4.108 13.25 3.5 11.888 3.5c-2.454 0-4.5 1.954-4.5 4.5s2.046 4.5 4.5 4.5c1.362 0 2.568-.608 3.474-1.714" className={className} />
);
export const WaterGuardianIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M8.25 18.75a1.5 1.5 0 01-3 0v-2.25a1.5 1.5 0 013 0v2.25zM15 18.75a1.5 1.5 0 01-3 0v-2.25a1.5 1.5 0 013 0v2.25zM15 12.75a1.5 1.5 0 01-3 0v-2.25a1.5 1.5 0 013 0v2.25zM11.25 15.75a1.5 1.5 0 01-3 0V13.5a1.5 1.5 0 013 0v2.25zM15 9.75a1.5 1.5 0 01-3 0V7.5a1.5 1.5 0 013 0v2.25zM11.25 12.75a1.5 1.5 0 01-3 0V10.5a1.5 1.5 0 013 0v2.25zM18.75 15a1.5 1.5 0 01-3 0v-2.25a1.5 1.5 0 013 0v2.25zM18.75 9.75a1.5 1.5 0 01-3 0V7.5a1.5 1.5 0 013 0v2.25zM8.25 15.75a1.5 1.5 0 01-3 0V13.5a1.5 1.5 0 013 0v2.25zM8.25 9.75a1.5 1.5 0 01-3 0V7.5a1.5 1.5 0 013 0v2.25zM3.75 12.75a1.5 1.5 0 01-3 0V10.5a1.5 1.5 0 013 0v2.25z" className={className} />
);
export const AirGuardianIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" className={className} />
);
export const EarthGuardianIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className={className} />
);
export const LightGuardianIcon: React.FC<{className?: string}> = ({className}) => ( <SunIcon className={className}/> );
export const DarkGuardianIcon: React.FC<{className?: string}> = ({className}) => ( <MoonIcon className={className}/> );
export const NatureGuardianIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M13.5 21V3m0 18v-6m0-12V3" className={className} />
);
export const AetherGuardianIcon: React.FC<{className?: string}> = ({className}) => ( <SparklesIcon className={className}/> );

export const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 4.5v15m7.5-7.5h-15" className={className} />
);

export const XIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M6 18L18 6M6 6l12 12" className={className} />
);

export const SupabaseIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 21a9 9 0 01-6.176-15.932 9 9 0 0112.352 0A9 9 0 0112 21z" className={className} />
);
export const GitHubIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04 0-1.33-.467-2.42-1.233-3.27.116-.303.533-1.534-.117-3.21 0 0-1.008-.322-3.3 1.23.966-.267 1.983-.399 3-.405 1.017.006 2.034.138 3 .405-2.29-1.552-3.287-1.23-3.287-1.23-.65 1.676-.233 2.907-.117 3.21-.766.85-1.233 1.94-1.233 3.27 0 4.66 2.709 5.73 5.5 6.035-.45.388-.85.95-.85 1.9v2.55" className={className} />
);
export const AITableIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6zM6 12h12M12 3.75v16.5" className={className} />
);
export const CapacitiesIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M8.25 7.5V6.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5V7.5m-6 6V15a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-.75m-6 0h6m-6 0V9m6 4.5V9m-6 0h6" className={className} />
);

export const MemoryIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.875-3.75a.375.375 0 11-1.5 0 .375.375 0 011.5 0z" className={className} />
);

export const SanctumIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" className={className} />
);

export const ManifestoIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.747 3.747 0 01-1.043 3.296 3.747 3.747 0 01-3.296 1.043A3.747 3.747 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.746 3.746 0 0121 12z" className={className} />
);

export const TerminalIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M6.75 7.5l3 2.25-3 2.25m4.5 0h3" className={className} />
);

export const CodeBracketSquareIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" className={className} />
);

export const CloudArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 16.5V9.75m0 0l-2.475 2.475M12 9.75l2.475 2.475M3.75 9.75h16.5c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v2.25c0 .621.504 1.125 1.125 1.125z" className={className} />
);

export const BlueprintIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" className={className} />
);

export const OmniNoteIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" className={className} />
);

export const PhotoIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" className={className} />
);

export const InformationCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" className={className} />
);

export const ExclamationTriangleIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" className={className} />
);

export const ApiDocsIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" className={className} />
);

export const StudentsIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.125-1.584 1.125 1.125 0 00.375-1.487l-2.063-3.612a9.348 9.348 0 00-4.125-3.213 9.352 9.352 0 00-6.25 3.213L2.25 16.06a1.125 1.125 0 00.375 1.487m12.375-3.128a9.353 9.353 0 00-3.213-4.125m-3.213-4.125a9.353 9.353 0 00-3.213 4.125m3.213-4.125a9.353 9.353 0 00-3.213-4.125m3.213 4.125a9.353 9.353 0 00-3.213 4.125m3.213 4.125a9.348 9.348 0 00-4.125-3.213m4.125 3.213a9.348 9.348 0 00-4.125-3.213M3 19.128a9.38 9.38 0 012.625.372 9.337 9.337 0 014.125-1.584 1.125 1.125 0 01.375-1.487l-2.063-3.612a9.348 9.348 0 01-4.125-3.213 9.352 9.352 0 01-6.25 3.213L2.25 16.06a1.125 1.125 0 01.375 1.487m12.375-3.128a9.353 9.353 0 01-3.213-4.125m-3.213-4.125a9.353 9.353 0 01-3.213 4.125m3.213-4.125a9.353 9.353 0 01-3.213-4.125m3.213 4.125a9.353 9.353 0 01-3.213 4.125m3.213 4.125a9.348 9.348 0 01-4.125-3.213m4.125 3.213a9.348 9.348 0 01-4.125-3.213" className={className} />
);

export const CloudSyncIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 16.5V9.75m0 0l-2.475 2.475M12 9.75l2.475 2.475M3.75 9.75h16.5c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v2.25c0 .621.504 1.125 1.125 1.125z" className={className} />
);

export const ChimeraIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.5c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.375 2.25c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-3.375c0-.621.504-1.125 1.125-1.125h1.5z" className={className} />
);

export const ProjectBoardIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125A1.125 1.125 0 003 5.625v12.75c0 .621.504 1.125 1.125 1.125z" className={className} />
);

export const DashboardIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M10.5 6a7.5 7.5 0 100 12h-3a7.5 7.5 0 100-12h3zM10.5 9a4.5 4.5 0 110 6h-3a4.5 4.5 0 110-6h3z" className={className} />
);

export const ArchitectureIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M5.25 6H9m3 0h3.75M3 15h3.75m3 0h3.75" className={className} />
);

export const TagIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM11.25 11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" className={className} />
);

export const GalleryIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M5.25 6H9m3 0h3.75M3 15h3.75m3 0h3.75" className={className} />
);

export const MatrixIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6zM6 12h12M12 3.75v16.5" className={className} />
);

export const ParlantIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.372a3.523 3.523 0 01-1.492-.284M3.75 8.511c-.884.284-1.5 1.128-1.5 2.097v4.286c0 1.136.847 2.1 1.98 2.193l3.72.372a3.523 3.523 0 011.492-.284M3.75 8.511c.884-.284 1.5-1.128 1.5-2.097V4.286c0-1.136.847-2.1 1.98-2.193l3.72-.372a3.523 3.523 0 011.492.284M20.25 8.511c-.884-.284-1.5-1.128-1.5-2.097V4.286c0-1.136-.847-2.1-1.98-2.193l-3.72-.372a3.523 3.523 0 00-1.492.284" className={className} />
);

export const BookOpenIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" className={className} />
);

// --- OMNI CODEX ICONS ---

// Elements
export const ElementGoldIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 6v12m-3-6h6" className={className} />
);
export const ElementWoodIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 21V3m0 0l4 4M12 3L8 7" className={className} />
);
export const ElementWaterIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 14.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" className={className} />
);
export const ElementFireIcon: React.FC<{className?: string}> = ({className}) => (
    <FireGuardianIcon className={className}/>
);
export const ElementEarthIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9z" className={className} />
);
export const ElementLightIcon: React.FC<{className?: string}> = ({className}) => (
    <SunIcon className={className}/>
);
export const ElementDarkIcon: React.FC<{className?: string}> = ({className}) => (
    <MoonIcon className={className}/>
);
export const ElementAetherIcon: React.FC<{className?: string}> = ({className}) => (
    <SparklesIcon className={className}/>
);
export const ElementNatureIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M13.5 21V3m0 18v-6m0-12V3" className={className}/>
);

// Card Types
export const TypePillarIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" className={className} />
);
export const TypeCreatureIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className={className} />
);
export const TypeSpellIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" className={className} />
);
export const TypeArtifactIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877-2.551 2.551zM12 13.5l-2.551 2.551-5.877-5.877A2.652 2.652 0 013 7.75l5.877 5.877L12 13.5z" className={className} />
);
export const TypeEnchantmentIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324l5.58.512a.563.563 0 01.31.95l-4.252 3.9a.563.563 0 00-.162.632l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.162-.632l-4.252-3.9a.563.563 0 01.31-.95l5.58-.512a.563.563 0 00.475-.324L11.48 3.5z" className={className} />
);
export const TypePlaneswalkerIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" className={className} />
);
export const TypeConceptIcon: React.FC<{className?: string}> = ({className}) => (
    <GenericIcon path="M12 18v.01M8.25 8.25c.03-.2.18-.38.38-.52a3.746 3.746 0 015.24 0 .62.62 0 00.52-.38c.19-.39.51-.68.89-.83a4.5 4.5 0 015.86 5.86c-.15.38-.44.7-.83.89a.62.62 0 00-.38.52 3.746 3.746 0 010 5.24.62.62 0 00.38.52c.39.19.68.51.83.89a4.5 4.5 0 01-5.86 5.86c-.38-.15-.7-.44-.89-.83a.62.62 0 00-.52-.38 3.746 3.746 0 01-5.24 0 .62.62 0 00-.52.38c-.19.39-.51.68-.89.83a4.5 4.5 0 01-5.86-5.86c.15-.38.44-.7.83-.89a.62.62 0 00.38-.52 3.746 3.746 0 010-5.24.62.62 0 00-.38-.52c-.39-.19-.68-.51-.83-.89a4.5 4.5 0 015.86-5.86c.38.15.7.44.89.83.2.03.38.18.52.38z" className={className} />
);
