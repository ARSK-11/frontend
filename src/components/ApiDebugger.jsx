import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function ApiDebugger() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testApiConnection = async () => {
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      console.log('Testing API connection...');
      
      const response = await fetch('http://localhost:3000/api/clothing', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      setResult(data);
      setStatus('success');
    } catch (err) {
      console.error('API test failed:', err);
      setError(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    // Auto-test on component mount
    testApiConnection();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 API Connection Debugger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={testApiConnection} disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test API Connection'
            )}
          </Button>
          
          {status === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Connected
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              Failed
            </div>
          )}
        </div>

        {status === 'loading' && (
          <div className="text-sm text-gray-600">
            Testing connection to http://localhost:3000/api/clothing...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Connection Error:</h4>
            <p className="text-red-700 text-sm">{error}</p>
            <div className="mt-3 text-sm text-red-600">
              <p><strong>Troubleshooting steps:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Make sure the backend is running on port 3000</li>
                <li>Check if CORS is properly configured</li>
                <li>Verify the API endpoint is correct</li>
                <li>Check browser console for more details</li>
              </ul>
            </div>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Connection Successful!</h4>
            <p className="text-green-700 text-sm mb-2">
              Found {result.data?.length || 0} clothing items
            </p>
            <details className="text-sm">
              <summary className="cursor-pointer text-green-600">View API Response</summary>
              <pre className="mt-2 p-2 bg-white border rounded text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p><strong>Backend URL:</strong> http://localhost:3000</p>
          <p><strong>API Endpoint:</strong> /api/clothing</p>
          <p><strong>Frontend URL:</strong> {window.location.origin}</p>
        </div>
      </CardContent>
    </Card>
  );
} 