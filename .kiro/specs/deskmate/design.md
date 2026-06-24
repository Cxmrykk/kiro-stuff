# DeskMate – Technical Design

## Architecture

Single-page application (SPA) with no backend dependencies. All logic runs client-side in the browser.

```
┌─────────────────────────────────────────┐
│              index.html                  │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐  │
│  │styles.css│ │theme-*.css│ │  HTML   │  │
│  └─────────┘ └──────────┘ └─────────┘  │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │           app.js                  │   │
│  │  ┌────────┐ ┌─────────────────┐  │   │
│  │  │ Chat UI│ │  NLP Engine     │  │   │
│  │  │        │ │  - keyword match│  │   │
│  │  │        │ │  - synonyms     │  │   │
│  │  │        │ │  - context track│  │   │
│  │  └────────┘ └─────────────────┘  │   │
│  │  ┌────────────┐ ┌─────────────┐  │   │
│  │  │ Feedback   │ │  Demo Mode  │  │   │
│  │  │ (localStorage)│            │  │   │
│  │  └────────────┘ └─────────────┘  │   │
│  └──────────────────────────────────┘   │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │      knowledge-base.js            │   │
│  │  - 50 FAQs with keywords         │   │
│  │  - Synonym map                    │   │
│  │  - Org contacts                   │   │
│  │  - Escalation routing             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Key Design Decisions

1. **No build step** – Opens directly in browser for zero-friction demo
2. **Theme system** – CSS-variable overrides in separate file; auto-detected by app.js
3. **Keyword + synonym NLP** – Lightweight, no API dependency, works offline
4. **Conversation context** – Last-topic tracker with 3-message decay
5. **localStorage feedback** – Persists across sessions, exportable as JSON
6. **Demo mode** – Scripted sequences with typing simulation for pitch

## Data Flow

1. User types question → `handleSubmit()`
2. Query normalized → synonyms expanded → `findAnswer()`
3. Each FAQ scored by keyword relevance → best match returned (or fallback)
4. Response rendered with source citation + feedback buttons
5. Feedback clicks → localStorage + toast notification

## File Structure

```
├── index.html              # SPA shell
├── styles.css              # Base styles (untouched by themes)
├── theme-hellokitty.css    # Theme override (removable)
├── app.js                  # Core logic + UI + NLP + demo mode
├── knowledge-base.js       # FAQ data, contacts, synonyms
├── handbook.md             # Mock employee handbook (source doc)
├── SAMPLES.md              # 3 sample exchanges + 1 graceful fail
├── README.md               # Challenge brief
└── .kiro/specs/deskmate/   # Kiro spec files
    ├── requirements.md
    ├── design.md
    └── tasks.md
```
