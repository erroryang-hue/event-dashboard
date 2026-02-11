import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    background: '#1e293b',
                    color: '#f8fafc',
                    minHeight: '100vh',
                    fontFamily: 'monospace'
                }}>
                    <h1 style={{ color: '#f87171', marginBottom: '20px' }}>
                        ⚠️ Something went wrong
                    </h1>
                    <div style={{
                        background: '#0f172a',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #334155',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{ color: '#fbbf24' }}>Error:</h3>
                        <pre style={{ color: '#fb923c', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                    </div>
                    {this.state.errorInfo && (
                        <div style={{
                            background: '#0f172a',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #334155',
                            maxHeight: '300px',
                            overflow: 'auto'
                        }}>
                            <h3 style={{ color: '#fbbf24' }}>Component Stack:</h3>
                            <pre style={{ color: '#94a3b8', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </div>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 24px',
                            background: '#6366f1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
