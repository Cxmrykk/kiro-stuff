# DeskMate: AI FAQ Bot for New Employees

## Requirements

### REQ-1: FAQ Knowledge Base
**As a** new employee  
**I want** to ask common workplace questions in natural language  
**So that** I get instant answers without waiting for HR  

**Acceptance Criteria:**
- System contains at least 50 FAQ entries covering IT, HR, Finance, Facilities, Safety, and Legal topics
- Each FAQ entry has keywords, question text, answer text, source reference, and category
- Answers reference the source document section they came from

### REQ-2: Natural Language Understanding
**As a** new employee  
**I want** to type questions in my own words  
**So that** I don't need to know the exact FAQ phrasing  

**Acceptance Criteria:**
- Bot matches questions using keyword scoring with synonym expansion
- Partial word matches are supported
- Confidence threshold prevents low-quality matches from surfacing

### REQ-3: Source Document References
**As a** new employee  
**I want** to see where an answer comes from  
**So that** I can trust the information and find more detail  

**Acceptance Criteria:**
- Every bot response includes a citation to the handbook/policy section
- Source is displayed below the answer bubble in a distinct style

### REQ-4: Graceful Fallback
**As a** new employee  
**I want** to be directed to the right person when the bot can't answer  
**So that** I'm never left without help  

**Acceptance Criteria:**
- Bot detects the likely category of an unanswered question
- Response includes the specific contact person, email, and phone extension
- Generic fallback provided when category cannot be determined

### REQ-5: Feedback System (Stretch Goal)
**As an** HR coordinator  
**I want** employees to rate bot answers with thumbs up/down  
**So that** I can identify unhelpful answers and improve the knowledge base  

**Acceptance Criteria:**
- Each bot response has thumbs up and thumbs down buttons
- Feedback is persisted to localStorage
- Visual confirmation (toast) shown when feedback is submitted
- Feedback data can be exported for review

### REQ-6: Mobile-Optimized SPA
**As a** new employee  
**I want** to use the bot on my phone  
**So that** I can get answers anywhere on my first day  

**Acceptance Criteria:**
- Responsive design optimized for screens ≤480px
- Touch-friendly inputs and buttons
- Uses dynamic viewport height (100dvh) and safe-area insets
- No horizontal scrolling on mobile

### REQ-7: Conversation Context
**As a** new employee  
**I want** follow-up questions to relate to my previous topic  
**So that** I can have a natural conversation  

**Acceptance Criteria:**
- Bot tracks the last matched topic/category
- Ambiguous follow-ups are interpreted in context of previous answer
- Context resets after 3 unrelated messages

### REQ-8: Demo Mode
**As a** presenter during the hackathon pitch  
**I want** a demo mode that auto-plays scripted conversations  
**So that** I can showcase the bot's capabilities smoothly  

**Acceptance Criteria:**
- Demo button visible in the UI
- Plays 3 sample exchanges + 1 graceful fail automatically
- Typing simulation with realistic delays
- Can be stopped/reset at any time

### REQ-9: Source Documents
**As a** hackathon judge  
**I want** to see the mock handbook and FAQ as separate artifacts  
**So that** I can verify the bot ingests real content  

**Acceptance Criteria:**
- handbook.md exists as a standalone readable document
- Knowledge base references align with handbook sections
