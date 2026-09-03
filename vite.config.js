import { defineConfig } from 'vite'

export default defineConfig({
    // IMPORTANT: This must match your repository name exactly
    base: '/',
    build: {
        rollupOptions: {
            // This ensures your extra HTML pages (teaching, publications) are included in the build
            input: {
                main: 'index.html',
                publications: 'publications.html',
                teaching: 'teaching.html',
                students: 'students.html',
                news: 'news.html',
                projects: 'projects.html',
                opensource: 'opensource.html',
                labprojects: 'labprojects.html',
                prTool: 'pr-tool.html',
                paperTracking: 'paper-tracking.html',
                dam: 'dam.html',
                matrixPublishing: 'matrix-publishing.html',
                internal: 'internal/index.html',
                campaign: 'campaign.html',
                activityArrangement: 'activity-arrangement.html'
            }
        },
        outDir: 'docs', // Output to docs/ for easier GitHub Pages deployment
        emptyOutDir: true
    }
})
