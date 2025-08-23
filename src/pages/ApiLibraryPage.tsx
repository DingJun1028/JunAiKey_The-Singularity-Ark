

import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { API_DOCS_DATA } from '../data/api-docs';
import type { ApiEndpoint } from '../types';
import { generateApiMockResponse } from '../services/geminiService';

const ApiMethodBadge: React.FC<{ method: ApiEndpoint['method'] }> = ({ method }) => {
    const colorMap = {
        GET: 'bg-secondary/20 text-secondary',
        POST: 'bg-success/20 text-success',
        PUT: 'bg-primary/20 text-primary',
        DELETE: 'bg-error/20 text-error',
    };

    return (
        <span
            className={`px-3 py-1 text-sm font-bold rounded-full font-mono ${colorMap[method]}`}
        >
            {method}
        </span>
    );
};

const CodeBlock: React.FC<{ code: string; lang: string, className?: string }> = ({ code, lang, className='' }) => (
    <div className={`bg-background/80 border border-border rounded-lg mt-2 ${className}`}>
        <div className="px-4 py-2 border-b border-border">
            <p className="text-xs font-semibold text-foreground/60 uppercase">{lang}</p>
        </div>
        <pre className="p-4 text-sm overflow-x-auto text-foreground/80 font-mono">
            <code>{code}</code>
        </pre>
    </div>
);

const generateCurl = (endpoint: ApiEndpoint, params: Record<string, string>, body: string): string => {
    const baseUrl = endpoint.baseUrl || 'https://api.junaikey.com';
    let curl = `curl -X ${endpoint.method} "${baseUrl}${endpoint.path}`;
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if(value) queryParams.append(key, value);
    });

    const queryString = queryParams.toString();
    if(queryString) {
        curl += `?${queryString}`;
    }
    curl += '"';

    (endpoint.headers || []).forEach(header => {
        if(header.required) {
            let placeholder = '[YOUR_API_KEY]'; // Default
            if (header.name === 'Content-Type') {
                placeholder = 'application/json';
            } else if (header.name === 'Authorization') {
                placeholder = 'Bearer [YOUR_TOKEN]';
            }
            curl += ` \\\n  -H "${header.name}: ${placeholder}"`;
        }
    });

    if (body && (endpoint.method === 'POST' || endpoint.method === 'PUT')) {
        curl += ` \\\n  -d '${body}'`;
    }

    return curl;
}

const ApiLibraryPage: React.FC = () => {
    const { theme } = useTheme();
    const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_DOCS_DATA[0]);
    const [isTrying, setIsTrying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userParams, setUserParams] = useState<Record<string, string>>({});
    const [userBody, setUserBody] = useState<string>('');
    const [apiResponse, setApiResponse] = useState<{ status: number, body: string, curl: string } | null>(null);
    const inputClass = "w-full p-2 bg-background/50 border border-border rounded-md text-foreground focus:ring-1 focus:ring-secondary focus:outline-none";

    useEffect(() => {
        setIsTrying(false);
        setApiResponse(null);
        setIsLoading(false);
        
        const initialParams: Record<string, string> = {};
        (selectedEndpoint.parameters || []).forEach(p => { initialParams[p.name] = '' });
        setUserParams(initialParams);

        try {
            if (selectedEndpoint.requestBody?.schema) {
                const schemaObj = JSON.parse(selectedEndpoint.requestBody.schema);
                setUserBody(JSON.stringify(schemaObj, null, 2));
            } else {
                setUserBody('');
            }
        } catch {
            setUserBody(selectedEndpoint.requestBody?.schema || '');
        }
    }, [selectedEndpoint]);


    const categories = useMemo(() => {
        const cats = API_DOCS_DATA.reduce((acc, endpoint) => {
            (acc[endpoint.category] = acc[endpoint.category] || []).push(endpoint);
            return acc;
        }, {} as Record<string, ApiEndpoint[]>);
        return Object.entries(cats);
    }, []);

    const handleExecute = async () => {
        setIsLoading(true);
        setApiResponse(null);
        
        const curl = generateCurl(selectedEndpoint, userParams, userBody);

        try {
            const mockResponse = await generateApiMockResponse(selectedEndpoint, userParams, userBody);
            
            setApiResponse({
                status: selectedEndpoint.method === 'POST' ? 201 : 200,
                body: mockResponse,
                curl: curl
            });
            toast.success("Mock response generated!");

        } catch(error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'API execution failed.';
            toast.error(errorMessage);
            setApiResponse({
                status: 500,
                body: JSON.stringify({ error: 'Failed to generate mock response.', message: errorMessage }, null, 2),
                curl: curl
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navApiLibrary} />
                <TrilingualText as="p" text={theme.vocabulary.apiLibrarySubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel */}
                <aside className="lg:col-span-3">
                    <Card className="p-4 sticky top-24">
                        <nav className="space-y-4">
                            {categories.map(([category, endpoints]) => (
                                <div key={category}>
                                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider px-2 mb-2">{category}</h3>
                                    <ul className="space-y-1">
                                        {endpoints.map(endpoint => (
                                            <li key={endpoint.id}>
                                                <button
                                                    onClick={() => setSelectedEndpoint(endpoint)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex items-center gap-3 ${selectedEndpoint.id === endpoint.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-foreground/5'
                                                        }`}
                                                >
                                                    <span className={`w-12 text-center font-mono text-xs font-bold`}>{endpoint.method}</span>
                                                    <span>{endpoint.title}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </Card>
                </aside>

                {/* Main Panel */}
                <main className="lg:col-span-9">
                    <Card className="space-y-6">
                        <div className="flex items-center gap-4">
                            <ApiMethodBadge method={selectedEndpoint.method} />
                            <p className="text-lg font-mono font-semibold text-foreground">{selectedEndpoint.path}</p>
                        </div>
                        <h2 className="text-3xl font-bold">{selectedEndpoint.title}</h2>
                        <p className="text-foreground/80">{selectedEndpoint.description}</p>
                        
                        <div className="border-t border-border pt-6 mt-6">
                             <Button variant="secondary" onClick={() => setIsTrying(!isTrying)}>
                                {isTrying ? 'Cancel' : 'Try it out'}
                            </Button>
                        </div>

                       {isTrying && (
                            <div className="space-y-6 border-t border-border pt-6 mt-6">
                                {selectedEndpoint.parameters.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Parameters</h3>
                                        <div className="space-y-4">
                                            {selectedEndpoint.parameters.map(param => (
                                                <div key={param.name}>
                                                    <label className="text-sm font-medium text-foreground/80 mb-1 block">
                                                        {param.name} <span className="text-accent font-mono">{param.type}</span> {param.required && <span className="text-xs text-error/80 ml-2">Required</span>}
                                                    </label>
                                                    <input type="text" value={userParams[param.name] || ''} onChange={e => setUserParams(p => ({...p, [param.name]: e.target.value}))} placeholder={param.description} className={inputClass} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedEndpoint.requestBody && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Request Body</h3>
                                         <textarea
                                            value={userBody}
                                            onChange={(e) => setUserBody(e.target.value)}
                                            className={`${inputClass} font-mono h-48`}
                                            placeholder='Enter JSON body...'
                                        />
                                    </div>
                                )}
                                <Button variant="primary" onClick={handleExecute} disabled={isLoading}>
                                    {isLoading ? <Spinner /> : 'Execute'}
                                </Button>

                                {apiResponse && (
                                    <div className="space-y-6 border-t border-border pt-6 mt-6">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Request</h4>
                                            <CodeBlock code={apiResponse.curl} lang="bash" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Response</h4>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold">Status:</span>
                                                <span className={`font-semibold ${apiResponse.status >= 400 ? 'text-error' : 'text-success'}`}>{apiResponse.status}</span>
                                            </div>
                                            <CodeBlock code={apiResponse.body} lang="json" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default ApiLibraryPage;