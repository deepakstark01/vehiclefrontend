
// Pages/APiCreate/GenrateApiKey.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Key, Copy, RefreshCw } from 'lucide-react';
import { generateApiKey } from '../../features/genrateAPIKey/genratekeySlice';
import toast, { Toaster } from 'react-hot-toast';
import ExampleSection from '../../component/ExampleSection';

const GenrateApiKey = () => {
  const dispatch = useDispatch();
  const { apiKey, isLoading, keyDetails } = useSelector(state => state.genratekey);
  const [keyName, setKeyName] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerateKey = async () => {
    if (!keyName.trim()) {
      return toast.error('Please enter a key name');
    }
    try {
      await dispatch(generateApiKey({
        name: keyName,
        description: description || 'Generated via dashboard'
      })).unwrap();
      toast.success('API key generated successfully');
    } catch (error) {
      toast.error(error?.message || 'Failed to generate API key');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6 text-white">Generate API Key</h1>
      
      <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your API Key</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Key Name *</label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                  focus:outline-none focus:border-[#1DB954] text-white"
                placeholder="Enter key name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                  focus:outline-none focus:border-[#1DB954] text-white"
                placeholder="Enter description (optional)"
                rows="3"
              />
            </div>
          </div>

          {apiKey ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <code className="font-mono text-[#1DB954] break-all">{apiKey}</code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {keyDetails && (
                <div className="text-sm text-white/60 pt-4 border-t border-white/10 space-y-2">
                  <p>Daily Limit: {keyDetails.daily_limit} requests</p>
                  <p>Usage Today: {keyDetails.daily_usage} requests</p>
                  <p>Plan: {keyDetails.plan}</p>
                  <p>Created: {new Date(keyDetails.created_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-white/40 text-center p-4 border border-dashed border-white/20 rounded-lg">
              No API key generated yet
            </div>
          )}
        </div>

        <button
          onClick={handleGenerateKey}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#1DB954] text-black rounded-lg hover:bg-[#1DB954]/90 
            transition-all duration-300 flex items-center justify-center gap-2 
            disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-black/20 border-t-black rounded-full" />
              Generating...
            </>
          ) : (
            <>
              {apiKey ? <RefreshCw className="w-5 h-5" /> : <Key className="w-5 h-5" />}
              {apiKey ? 'Regenerate Key' : 'Generate API Key'}
            </>
          )}
        </button>
      </div>

      <div>
      <h1 className="text-3xl font-bold mb-6 text-white">API Documentation</h1>
      <ExampleSection apiKey = {apiKey} />
    </div>
    </div>
  );
};

export default GenrateApiKey;