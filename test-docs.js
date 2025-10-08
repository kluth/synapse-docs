import { DocumentationService } from './dist/index.js';

async function testDocs() {
  console.log('🧪 Testing Documentation Service...');
  
  try {
    const docsService = new DocumentationService();
    console.log('✅ DocumentationService created successfully');
    
    await docsService.initialize();
    console.log('✅ DocumentationService initialized successfully');
    
    console.log('🎉 All tests passed! The documentation service is working correctly.');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testDocs();
