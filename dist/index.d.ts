declare class DocumentationPage {
    id: string;
    title: string;
    slug: string;
    content: string;
    category: 'getting-started' | 'core' | 'enterprise' | 'nextgen' | 'futuristic' | 'api' | 'examples';
    order: number;
    isPublished: boolean;
    tags: string[];
    lastModified: Date;
    author: string;
    views: number;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}
declare class DocumentationExample {
    id: string;
    title: string;
    description: string;
    code: string;
    language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'bash';
    category: string;
    package: string;
    isInteractive: boolean;
    isRunnable: boolean;
    dependencies: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare class DocumentationTutorial {
    id: string;
    title: string;
    description: string;
    steps: Array<{
        title: string;
        content: string;
        code?: string;
        language?: string;
        isOptional?: boolean;
    }>;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    prerequisites: string[];
    category: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare class DocumentationService {
    private server;
    private database;
    private templateEngine;
    private auth;
    private pages;
    private examples;
    private tutorials;
    constructor();
    initialize(): Promise<void>;
    private setupDatabase;
    private setupRoutes;
    private generateContent;
    private getHomeTemplate;
    private getPageTemplate;
    private getExamplesTemplate;
    private getAPITemplate;
    private get404Page;
    private generateGettingStartedContent;
    private generateCoreContent;
    private generateEnterpriseContent;
    private generateNextGenContent;
    private generateFuturisticContent;
    private generateAPIContent;
    private generateExamplesContent;
    start(): Promise<void>;
}
export { DocumentationService, DocumentationPage, DocumentationExample, DocumentationTutorial };
//# sourceMappingURL=index.d.ts.map