import { DocumentationService } from './index.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function generateStaticDocumentation() {
  console.log('📚 Generating static documentation...');
  
  const docsService = new DocumentationService();
  await docsService.initialize();
  
  const outputDir = join(process.cwd(), 'public');
  await mkdir(outputDir, { recursive: true });
  
  // Generate home page
  const pages = docsService['database'].find('documentation_pages', { isPublished: true });
  const allPackages = Array.from(docsService['packages'].values());
  console.log(`📦 Found ${allPackages.length} packages for rendering`);
  console.log('📦 Package names:', allPackages.map(p => p.name));
  
  // Generate package HTML for each category
  const corePackages = allPackages.filter(p => p.category === 'core').map(p => docsService['generatePackageCard'](p)).join('');
  const enterprisePackages = allPackages.filter(p => p.category === 'enterprise').map(p => docsService['generatePackageCard'](p)).join('');
  const nextgenPackages = allPackages.filter(p => p.category === 'nextgen').map(p => docsService['generatePackageCard'](p)).join('');
  const futuristicPackages = allPackages.filter(p => p.category === 'futuristic').map(p => docsService['generatePackageCard'](p)).join('');
  
  const homeHtml = await docsService['templateEngine'].render(docsService['getHomeTemplate'](), {
    packages: allPackages,
    corePackages,
    enterprisePackages,
    nextgenPackages,
    futuristicPackages,
    title: 'Synapse Framework Documentation',
    description: 'Complete documentation for the Synapse TypeScript framework'
  });
  
  await writeFile(join(outputDir, 'index.html'), homeHtml);
  console.log('✅ Generated index.html');
  
  // Generate individual pages
  for (const page of pages) {
    const pageHtml = await docsService['templateEngine'].render(docsService['getPackageTemplate'](), {
      package: { name: page.title, description: page.content },
      title: page.title
    });
    
    await writeFile(join(outputDir, `${page.slug}.html`), pageHtml);
    console.log(`✅ Generated ${page.slug}.html`);
  }
  
  // Generate examples page
  const examples = await docsService['getInteractiveExamples']();
  console.log(`📝 Found ${examples.length} examples for rendering`);
  console.log('📝 Example IDs:', examples.map(ex => ex.id));
  const examplesContent = examples.map(ex => docsService['generateExampleCard'](ex)).join('');
  console.log('📝 Generated examples content length:', examplesContent.length);
  const examplesHtml = await docsService['templateEngine'].render(docsService['getExamplesTemplate'](), {
    examplesContent,
    title: 'Code Examples',
    description: 'Practical examples for using Synapse framework'
  });
  
  await writeFile(join(outputDir, 'examples.html'), examplesHtml);
  console.log('✅ Generated examples.html');
  
  // Generate API page
  const apiContent = docsService['generateAPIContent'](allPackages);
  const apiHtml = await docsService['templateEngine'].render(docsService['getAPITemplate'](), {
    apiContent,
    title: 'API Reference',
    description: 'Complete API documentation for all Synapse packages'
  });
  await writeFile(join(outputDir, 'api.html'), apiHtml);
  console.log('✅ Generated api.html');
  
  // Generate getting started wizard page
  const wizard = await docsService.getGettingStartedWizard();
  const wizardHtml = await docsService['templateEngine'].render(docsService['getWizardTemplate'](), {
    wizard,
    title: 'Getting Started Wizard - Synapse Framework',
    description: 'Interactive step-by-step guide to get you started with Synapse'
  });
  await writeFile(join(outputDir, 'getting-started.html'), wizardHtml);
  console.log('✅ Generated getting-started.html');
  
  // Generate patterns page
  const patterns = await docsService['getDesignPatterns']();
  const patternsContent = patterns.map(pattern => docsService['generatePatternCard'](pattern)).join('');
  const patternsHtml = await docsService['templateEngine'].render(docsService['getPatternsTemplate'](), {
    patternsContent,
    title: 'Design Patterns - Synapse Framework',
    description: 'Design patterns used throughout the Synapse framework'
  });
  await writeFile(join(outputDir, 'patterns.html'), patternsHtml);
  console.log('✅ Generated patterns.html');
  
  console.log('🎉 Static documentation generated successfully!');
  console.log(`📁 Output directory: ${outputDir}`);
}

generateStaticDocumentation().catch(console.error);
