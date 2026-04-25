---
name: "Design Project"
description: "Interactively gather requirements and generate a comprehensive DESIGN_DOCUMENT.md for a new Single Page Webapp."
argument-hint: "Describe the app you want to build"
agent: "agent"
tools: ["vscode/askQuestions", "search/codebase", "createFiles", "editFiles"]
---

As an expert Project Manager and Software Architect, I want you to ask me questions 2-3 at a time to create a comprehensive `./design/DESIGN_DOCUMENT.md` file for a new Single Page Webapp (npm, TypeScript, etc.).

This repo includes a basic hello world application with all of the libraries already installed. You'll most likely start Phase 1 by running `npm run remove-template-examples` to remove the hello world files.

The app I want to create is: ${input:appDescription:Describe the app you want to build}.

Use #tool:vscode/askQuestions to ask 2-3 focused questions at a time — covering areas such as:

- Core features and user workflows
- Target audience and personas
- Data sources and API integrations
- Authentication and authorization requirements
- UI/UX expectations (design system, accessibility, responsive breakpoints)
- State management and routing needs
- Performance and scalability requirements
- Deployment environment and CI/CD preferences

Once all necessary information has been gathered, produce a `./design/DESIGN_DOCUMENT.md` that includes:

1. **Project Overview** — purpose, goals, and success criteria
2. **Target Audience** — user personas and use cases
3. **Feature List** — prioritized feature breakdown (MVP vs. future phases)
4. **Architecture** — component structure, state management, routing, and data flow
5. **API & Integrations** — external services, endpoints, and data contracts
6. **Authentication & Authorization** — strategy and role definitions
7. **UI/UX Guidelines** — design system usage, accessibility standards, responsive strategy
8. **Phase Plan** — ordered implementation phases starting with Phase 1
9. **Open Questions** — unresolved decisions or assumptions to revisit
