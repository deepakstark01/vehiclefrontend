
import React from 'react'
import { Key, Copy, RefreshCw, Code } from 'lucide-react';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
    }
const ExampleSection = (apiKey) => {
  return (
    <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Example Usage</h2>
          <button
            onClick={() => copyToClipboard(curlCommand)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono text-white/90 whitespace-pre">
  {`curl --location 'http://127.0.0.1:80/vehicles/api/lookup' \\
  --header 'X-API-Key: ${apiKey || 'YOUR_API_KEY'}' \\
  --header 'Content-Type: application/json' \\
  --data '{
      "veh_num": "DL8CX5463"
  }'`}
          </code>
        </pre>
      </div>
      <div className="mt-6 p-4 bg-[#1DB954]/10 rounded-lg">
        <h3 className="font-medium mb-2 text-[#1DB954]">Headers Required</h3>
        <ul className="text-white/60 text-sm space-y-2">
          <li><code className="text-[#1DB954]">X-API-Key</code>: Your API key</li>
          <li><code className="text-[#1DB954]">Content-Type</code>: application/json</li>
        </ul>
      </div>
    </div>
  )
}

export default ExampleSection

  