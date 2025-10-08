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
    const homeHtml = await docsService['templateEngine'].render(docsService['getHomeTemplate'](), {
        pages,
        title: 'Synapse Framework Documentation',
        description: 'Complete documentation for the Synapse TypeScript framework'
    });
    await writeFile(join(outputDir, 'index.html'), homeHtml);
    console.log('✅ Generated index.html');
    // Generate individual pages
    for (const page of pages) {
        const pageHtml = await docsService['templateEngine'].render(docsService['getPageTemplate'](), {
            page,
            title: page.title,
            content: page.content
        });
        await writeFile(join(outputDir, `${page.slug}.html`), pageHtml);
        console.log(`✅ Generated ${page.slug}.html`);
    }
    // Generate examples page
    const examples = docsService['database'].find('documentation_examples');
    const examplesHtml = await docsService['templateEngine'].render(docsService['getExamplesTemplate'](), {
        examples,
        title: 'Code Examples',
        description: 'Practical examples for using Synapse framework'
    });
    await writeFile(join(outputDir, 'examples.html'), examplesHtml);
    console.log('✅ Generated examples.html');
    // Generate API page
    const apiHtml = docsService['getAPITemplate']();
    await writeFile(join(outputDir, 'api.html'), apiHtml);
    console.log('✅ Generated api.html');
    console.log('🎉 Static documentation generated successfully!');
    console.log(`📁 Output directory: ${outputDir}`);
}
generateStaticDocumentation().catch(console.error);
//# sourceMappingURL=generate-static.js.map