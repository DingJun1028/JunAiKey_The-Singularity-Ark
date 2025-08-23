import type { ApiEndpoint } from '../types';

export const API_DOCS_DATA: ApiEndpoint[] = [
  {
    id: 'omnisync-upsert',
    category: 'OmniSync',
    method: 'POST',
    path: '/api/v5/omnisync/notes/upsert',
    title: 'Upsert Notes',
    description: 'This endpoint allows for the creation or updating of notes within the Omni-Sync matrix. It\'s the primary way to push knowledge into the system.',
    headers: [
        { name: 'x-omni-key', description: 'Your unique API key for authentication.', required: true },
        { name: 'Content-Type', description: 'Must be `application/json`.', required: true },
    ],
    parameters: [],
    requestBody: {
        description: 'An array of note objects to create or update.',
        schema: `{
    "notes": [
        {
            "id": "note-unique-id-123",
            "content": "This is the content of the note. It can be plain text, Markdown, or any other format you define.",
            "metadata": {
                "source": "manual_input",
                "tags": ["project-alpha", "meeting"],
                "createdAt": "2024-05-21T10:00:00Z"
            }
        }
    ]
}`
    },
    responseBody: {
      description: 'A confirmation of the upsert operation.',
      schema: `{
    "status": "success",
    "upsertedCount": 1,
    "ids": ["note-unique-id-123"]
}`
    }
  },
  {
    id: 'omnisync-fetch',
    category: 'OmniSync',
    method: 'GET',
    path: '/api/v5/omnisync/notes/fetch',
    title: 'Fetch Notes',
    description: 'Retrieve notes from the Omni-Sync matrix based on various filter criteria. Useful for populating UIs or feeding data to other services.',
    headers: [
        { name: 'x-omni-key', description: 'Your unique API key for authentication.', required: true },
    ],
    parameters: [
      { name: 'tag', type: 'string', description: 'Filter notes by a specific tag.', required: false },
      { name: 'keyword', type: 'string', description: 'Perform a keyword search on note content.', required: false },
      { name: 'limit', type: 'integer', description: 'Maximum number of notes to return. Defaults to 100.', required: false },
    ],
    responseBody: {
      description: 'An array of note objects matching the criteria.',
      schema: `{
    "status": "success",
    "notes": [
        {
            "id": "note-unique-id-123",
            "content": "This is the content of the note.",
            "metadata": {
                "source": "manual_input",
                "tags": ["project-alpha", "meeting"],
                "createdAt": "2024-05-21T10:00:00Z"
            },
            "vectorId": "vec_askdn123..."
        }
    ]
}`
    }
  },
  {
    id: 'omniflow-trigger',
    category: 'OmniFlow',
    method: 'POST',
    path: '/api/v5/omniflow/trigger',
    title: 'Trigger a Flow',
    description: 'Initiates a predefined workflow (Rule) in the OmniFlow engine. This is the entry point for all automation tasks.',
    headers: [
        { name: 'x-omni-key', description: 'Your unique API key for authentication.', required: true },
        { name: 'Content-Type', description: 'Must be `application/json`.', required: true },
    ],
    parameters: [],
    requestBody: {
        description: 'The ID of the flow to trigger and the initial data payload.',
        schema: `{
    "flowId": "flow_process_new_lead",
    "inputData": {
        "leadName": "John Doe",
        "email": "john.doe@example.com",
        "source": "web_form"
    }
}`
    },
    responseBody: {
      description: 'Confirmation that the flow was triggered, including a unique execution ID.',
      schema: `{
    "status": "triggered",
    "flowId": "flow_process_new_lead",
    "executionId": "exec_a912j3nasd0"
}`
    }
  },
   {
    id: 'omnilog-retrieve',
    category: 'OmniLog',
    method: 'GET',
    path: '/api/v5/omnilog/retrieve',
    title: 'Retrieve Logs',
    description: 'Fetches system logs. Essential for debugging and monitoring system activity.',
    headers: [
        { name: 'x-omni-key', description: 'Your unique API key for authentication.', required: true },
    ],
    parameters: [
      { name: 'level', type: 'string', description: 'Filter logs by level (e.g., INFO, WARN, ERROR).', required: false },
      { name: 'agentId', type: 'string', description: 'Filter logs related to a specific agent.', required: false },
    ],
    responseBody: {
      description: 'An array of log entries.',
      schema: `{
    "status": "success",
    "logs": [
        {
            "timestamp": "2024-05-21T10:05:00Z",
            "level": "INFO",
            "message": "Agent [Agent-007] completed task [task_123].",
            "metadata": {
                "agentId": "Agent-007",
                "executionId": "exec_a912j3nasd0"
            }
        }
    ]
}`
    }
  },
  {
    id: 'omniagents-dispatch',
    category: 'OmniAgents',
    method: 'POST',
    path: '/api/v5/omniagents/dispatch',
    title: 'Dispatch an Agent',
    description: 'Assigns a task to a specific agent or lets the supervisor agent delegate it.',
     headers: [
        { name: 'x-omni-key', description: 'Your unique API key for authentication.', required: true },
        { name: 'Content-Type', description: 'Must be `application/json`.', required: true },
    ],
    parameters: [],
    requestBody: {
        description: 'The task details to be dispatched.',
        schema: `{
    "task": {
        "name": "summarize_document",
        "params": {
            "documentUrl": "http://example.com/doc.pdf"
        }
    },
    "agentId": "agent_nlp_processor"
}`
    },
    responseBody: {
      description: 'A confirmation of the dispatch.',
      schema: `{
    "status": "dispatched",
    "taskId": "task_xyz789"
}`
    }
  },
   {
    id: 'omnikeys-validate',
    category: 'OmniKey',
    method: 'POST',
    path: '/api/v5/omnikeys/validate',
    title: 'Validate an OmniKey',
    description: 'Checks if a given OmniKey is valid and returns its associated permissions.',
     headers: [
        { name: 'x-omni-key', description: 'The OmniKey to be validated.', required: true },
        { name: 'Content-Type', description: 'Must be `application/json`.', required: true },
    ],
    parameters: [],
    requestBody: {
        description: 'An empty body or optional context data.',
        schema: `{}`
    },
    responseBody: {
      description: 'The validation status and permissions of the key.',
      schema: `{
    "valid": true,
    "permissions": [
        "omnisync:read",
        "omnisync:write",
        "omniflow:trigger"
    ]
}`
    }
  },
  {
    id: 'capacities-get-spaces',
    category: 'Capacities',
    method: 'GET',
    baseUrl: 'https://api.capacities.io',
    path: '/spaces',
    title: 'Get Spaces',
    description: 'Retrieves a list of all spaces (collections of notes) that the authenticated user has access to. This is a common starting point for interacting with a user\'s content.',
    headers: [
        { name: 'Authorization', description: 'Bearer token for Capacities API. Example: Bearer [YOUR_TOKEN]', required: true },
    ],
    parameters: [],
    responseBody: {
      description: 'A JSON object containing a list of space objects.',
      schema: `{
    "items": [
        {
            "id": "space-id-1",
            "type": "space",
            "title": "Personal Knowledge",
            "icon": "🧠",
            "createdAt": "2023-10-01T12:00:00Z",
            "lastModified": "2024-05-22T09:30:00Z"
        },
        {
            "id": "space-id-2",
            "type": "space",
            "title": "Work Projects",
            "icon": "💼",
            "createdAt": "2023-11-15T14:00:00Z",
            "lastModified": "2024-05-21T18:00:00Z"
        }
    ]
}`
    }
  },
];