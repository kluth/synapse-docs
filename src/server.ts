#!/usr/bin/env node

import { DocumentationService } from './index.js';

async function startDocumentationServer() {
  console.log('🚀 Starting Synapse Documentation Server...');
  
  const docsService = new DocumentationService();
  
  try {
    await docsService.start();
    console.log('✅ Documentation server is running!');
    console.log('📖 Visit: http://localhost:3001');
    console.log('🔍 Search: http://localhost:3001/api/search?q=your-query');
    console.log('📚 Examples: http://localhost:3001/examples');
    console.log('🔧 API Docs: http://localhost:3001/api');
  } catch (error) {
    console.error('❌ Failed to start documentation server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down documentation server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down documentation server...');
  process.exit(0);
});

startDocumentationServer().catch(console.error);
