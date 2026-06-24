/**
 * DeskMate Knowledge Base
 * Mock employee handbook, FAQ, policies, and org chart data.
 */

const KNOWLEDGE_BASE = {
  // === FAQ entries (50 Q&As) ===
  faqs: [
    {
      id: 1,
      keywords: ["wifi", "wi-fi", "internet", "network", "password", "connect"],
      question: "What's the Wi-Fi password?",
      answer: "The office Wi-Fi network is **AcmeCorp-Staff**. The password is `Welcome2024!`. For guest access, use network **AcmeCorp-Guest** with password `Guest@Acme`. Both reset monthly on the 1st.",
      source: "IT Handbook, Section 2.1 – Network Access",
      category: "IT"
    },
    {
      id: 2,
      keywords: ["expense", "expenses", "reimbursement", "receipt", "submit", "claim"],
      question: "How do I submit an expense report?",
      answer: "Submit expenses through **Expensify** (app or web). Take a photo of your receipt, categorize the expense, and submit within 30 days of purchase. Reports under $100 are auto-approved. Over $100 requires manager approval. Reimbursements process within 5 business days.",
      source: "Finance Policy, Section 4.2 – Expense Reimbursement",
      category: "Finance"
    },
    {
      id: 3,
      keywords: ["leave", "vacation", "holiday", "time off", "pto", "annual", "sick", "days off"],
      question: "What is the leave policy?",
      answer: "You receive **20 days annual leave** plus public holidays. Sick leave is **10 days/year** (no doctor's note needed for ≤3 consecutive days). Request time off through **BambooHR** at least 2 weeks in advance. Unused leave carries over up to 5 days into the next year.",
      source: "Employee Handbook, Section 5.1 – Leave Entitlements",
      category: "HR"
    },
    {
      id: 4,
      keywords: ["it support", "tech support", "computer", "laptop", "it help", "helpdesk", "technical"],
      question: "Who do I contact for IT support?",
      answer: "For IT issues, contact the **IT Helpdesk**:\n• Email: it-support@acmecorp.com\n• Slack: #it-helpdesk\n• Phone: ext. 4400\n• In-person: Level 2, Room 204\n\nFor urgent issues (system down, security breach), call the **IT Emergency Line**: ext. 4401.",
      source: "IT Handbook, Section 1.1 – Getting Help",
      category: "IT"
    },
    {
      id: 5,
      keywords: ["parking", "car", "park", "vehicle", "garage"],
      question: "Where do I park?",
      answer: "Employee parking is in **Levels B1–B3** of the building garage. Use your access badge to enter. Spaces are first-come, first-served. If the garage is full, there's overflow parking at the lot on Elm Street (5-min walk). Bicycle racks are on Level B1 near the elevators.",
      source: "Facilities Guide, Section 3.1 – Parking",
      category: "Facilities"
    },
  ],
};

// Add remaining FAQs
KNOWLEDGE_BASE.faqs.push(
  {
    id: 6,
    keywords: ["dress", "code", "attire", "wear", "clothing", "casual"],
    question: "What's the dress code?",
    answer: "We follow a **smart casual** dress code. Jeans are fine, but no flip-flops or gym wear. On Fridays, it's fully casual. If you have client meetings, business casual is expected. When in doubt, ask your manager.",
    source: "Employee Handbook, Section 2.3 – Dress Code",
    category: "HR"
  },
  {
    id: 7,
    keywords: ["hours", "work hours", "start", "finish", "schedule", "flexible", "core"],
    question: "What are the working hours?",
    answer: "Core hours are **10:00 AM – 4:00 PM**. You can flex your start between 7:30–10:00 and finish between 4:00–6:30, as long as you complete 8 hours. Lunch is typically 12:00–1:00 PM but flexible within core hours.",
    source: "Employee Handbook, Section 3.1 – Working Hours",
    category: "HR"
  },
  {
    id: 8,
    keywords: ["remote", "work from home", "wfh", "hybrid", "home"],
    question: "Can I work from home?",
    answer: "Yes! We operate a **hybrid model**: 3 days in-office (Tue/Wed/Thu) and 2 days remote (Mon/Fri). You need manager approval for additional remote days. Ensure you're available on Slack during core hours when remote.",
    source: "Employee Handbook, Section 3.2 – Remote Work Policy",
    category: "HR"
  },
  {
    id: 9,
    keywords: ["pay", "payday", "salary", "payroll", "payslip", "paid"],
    question: "When do I get paid?",
    answer: "Salary is paid on the **25th of each month** via direct deposit. If the 25th falls on a weekend, you'll be paid the preceding Friday. Payslips are available in **BambooHR** under 'My Pay'. First paycheck may be prorated based on start date.",
    source: "Finance Policy, Section 1.1 – Payroll Schedule",
    category: "Finance"
  },
  {
    id: 10,
    keywords: ["benefits", "perks", "insurance", "health", "dental", "gym", "wellness"],
    question: "What benefits do I get?",
    answer: "Your benefits include:\n• **Health & dental insurance** (starts day 1)\n• **$500/year wellness allowance** (gym, classes, etc.)\n• **$1,000 learning budget** annually\n• **Employee Assistance Program** (free counseling)\n• **Life insurance** (2x salary)\n• Free snacks & coffee in the kitchen\n• Monthly team socials",
    source: "Employee Handbook, Section 6.1 – Benefits Overview",
    category: "HR"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 11,
    keywords: ["meeting", "rooms", "book", "conference", "reserve", "calendar"],
    question: "How do I book a meeting room?",
    answer: "Book rooms through **Google Calendar** — just add a room when creating an event. Available rooms: **Everest** (12 ppl), **Kilimanjaro** (8 ppl), **Fuji** (4 ppl), **Denali** (2 ppl, phone booth). If a room is empty and unbooked, feel free to use it.",
    source: "Facilities Guide, Section 2.1 – Meeting Rooms",
    category: "Facilities"
  },
  {
    id: 12,
    keywords: ["slack", "chat", "messaging", "channels", "communication"],
    question: "How do I use Slack?",
    answer: "Slack is our primary communication tool. Key channels:\n• **#general** – company-wide announcements\n• **#random** – casual chat\n• **#your-team-name** – team-specific\n• **#it-helpdesk** – tech issues\n• **#social** – events & outings\n\nDownload the app on desktop and mobile. Set your status and profile photo in the first week.",
    source: "IT Handbook, Section 3.1 – Communication Tools",
    category: "IT"
  },
  {
    id: 13,
    keywords: ["printer", "print", "printing", "scanner", "scan", "copy"],
    question: "How do I use the printer?",
    answer: "Printers are on each floor near the kitchens. Use your badge to release print jobs (tap the card reader). To set up: install **PaperCut** from the software center. Color printing costs apply for personal use. Scanners are built into the same machines — scan to email.",
    source: "IT Handbook, Section 2.3 – Printing & Scanning",
    category: "IT"
  },
  {
    id: 14,
    keywords: ["onboarding", "first day", "new starter", "getting started", "first week"],
    question: "What should I do in my first week?",
    answer: "Your first week checklist:\n1. Complete HR paperwork in BambooHR\n2. Set up laptop with IT (Level 2, Room 204)\n3. Activate email & Slack\n4. Meet your buddy (assigned on day 1)\n5. Attend the Welcome Session (Tue 10 AM)\n6. Tour the office with your manager\n7. Review the Employee Handbook\n8. Set up Expensify & BambooHR apps",
    source: "Onboarding Guide, Section 1 – First Week",
    category: "HR"
  },
  {
    id: 15,
    keywords: ["buddy", "mentor", "assigned", "support person", "guide"],
    question: "Do I get a buddy?",
    answer: "Yes! Every new starter is paired with an **onboarding buddy** — a team member who's been here 6+ months. They'll show you around, answer questions, and have lunch with you in your first week. Your buddy will be introduced on your first day by your manager.",
    source: "Onboarding Guide, Section 2 – Buddy System",
    category: "HR"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 16,
    keywords: ["kitchen", "food", "coffee", "snacks", "lunch", "fridge", "microwave"],
    question: "Where's the kitchen?",
    answer: "There's a kitchen on **every floor** (near the elevators). Each has: coffee machine, microwave, fridge, toaster, and free snacks. Label your food in the fridge — unlabeled items are cleared every Friday. The main café is on Level 1 with subsidized lunches ($5).",
    source: "Facilities Guide, Section 1.2 – Kitchen & Café",
    category: "Facilities"
  },
  {
    id: 17,
    keywords: ["security", "badge", "access", "card", "key", "building", "entry"],
    question: "How does building access work?",
    answer: "Your **access badge** works at all entry points. Tap it at the front door, elevator, and garage. The building is accessible **7 AM – 9 PM** weekdays. For after-hours access, request approval from Facilities (facilities@acmecorp.com). Report lost badges to Security immediately (ext. 4500).",
    source: "Facilities Guide, Section 4.1 – Building Security",
    category: "Facilities"
  },
  {
    id: 18,
    keywords: ["emergency", "fire", "evacuation", "alarm", "first aid", "safety"],
    question: "What do I do in an emergency?",
    answer: "**Fire/Evacuation:** Follow EXIT signs, use stairs (never elevators), assemble at the **Elm Street car park**. Fire wardens wear orange vests.\n\n**First Aid:** Kits on every floor near kitchens. Trained first aiders listed on the noticeboard.\n\n**Emergency contacts:** Security ext. 4500, Building management ext. 4600.",
    source: "Safety Handbook, Section 1.1 – Emergency Procedures",
    category: "Safety"
  },
  {
    id: 19,
    keywords: ["software", "apps", "install", "tools", "programs", "download"],
    question: "What software do I need to install?",
    answer: "Essential software (all via **Software Center**):\n• **Slack** – messaging\n• **Google Workspace** – email, docs, calendar\n• **BambooHR** – HR portal\n• **Expensify** – expenses\n• **1Password** – password manager\n• **Zoom** – video calls\n• **PaperCut** – printing\n\nNeed something else? Submit a request in #it-helpdesk.",
    source: "IT Handbook, Section 2.2 – Required Software",
    category: "IT"
  },
  {
    id: 20,
    keywords: ["password", "reset", "login", "credentials", "account", "locked"],
    question: "How do I reset my password?",
    answer: "Go to **password.acmecorp.com** and click 'Reset Password'. You'll need your employee email. If your account is locked, contact IT Helpdesk (ext. 4400). Passwords must be 12+ characters with uppercase, lowercase, and a number. We use **1Password** for team credentials.",
    source: "IT Handbook, Section 2.4 – Account Security",
    category: "IT"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 21,
    keywords: ["manager", "boss", "report", "reporting", "supervisor", "line manager"],
    question: "Who is my manager?",
    answer: "Your direct manager was introduced during your offer process. Check **BambooHR** → 'My Info' → 'Job' tab to see your reporting line. If you're unsure, ask HR (hr@acmecorp.com) or check the org chart on the company intranet.",
    source: "Onboarding Guide, Section 3 – Your Team",
    category: "HR"
  },
  {
    id: 22,
    keywords: ["training", "learning", "courses", "development", "professional", "budget"],
    question: "What training is available?",
    answer: "You have a **$1,000/year learning budget** for courses, conferences, and books. Access free courses on **LinkedIn Learning** (SSO login). Mandatory compliance training is assigned in your first month via BambooHR. Talk to your manager about a Personal Development Plan.",
    source: "Employee Handbook, Section 7.1 – Learning & Development",
    category: "HR"
  },
  {
    id: 23,
    keywords: ["performance", "review", "feedback", "goals", "objectives", "1:1", "one-on-one"],
    question: "How do performance reviews work?",
    answer: "Performance reviews happen **twice yearly** (June and December). You'll set quarterly OKRs with your manager. **Weekly 1:1s** are standard — use them for feedback and blockers. Mid-year is a check-in; end-of-year ties to compensation adjustments.",
    source: "Employee Handbook, Section 7.2 – Performance Management",
    category: "HR"
  },
  {
    id: 24,
    keywords: ["vpn", "remote access", "connect remotely", "work outside"],
    question: "How do I connect to VPN?",
    answer: "Use **GlobalProtect VPN** (pre-installed on your laptop). Connect with your work email and password. VPN is required to access internal systems when off-network. If you have issues, try disconnecting and reconnecting. Persistent problems → IT Helpdesk ext. 4400.",
    source: "IT Handbook, Section 2.5 – VPN Access",
    category: "IT"
  },
  {
    id: 25,
    keywords: ["email", "outlook", "gmail", "mail", "inbox", "signature"],
    question: "How do I set up my email?",
    answer: "Your email is **firstname.lastname@acmecorp.com**. We use **Google Workspace** (Gmail). Log in at mail.google.com with your work credentials. Set up your email signature using the template in the #general Slack channel pinned messages. Add your email to mobile via the Gmail app.",
    source: "IT Handbook, Section 3.2 – Email Setup",
    category: "IT"
  },
  {
    id: 26,
    keywords: ["phone", "extension", "desk phone", "voicemail", "call"],
    question: "How does the phone system work?",
    answer: "Desk phones use **RingCentral**. Your extension is in BambooHR under 'My Info'. Dial 9 for an outside line. For voicemail, press *97 and follow prompts. The mobile app lets you make/receive calls from your work number on your personal phone.",
    source: "IT Handbook, Section 3.3 – Phone System",
    category: "IT"
  },
  {
    id: 27,
    keywords: ["travel", "business travel", "trip", "flights", "hotel", "booking"],
    question: "How do I book business travel?",
    answer: "Book travel through **TravelPerk** (SSO login). Get manager approval before booking. Policy: economy flights, 4-star hotels max, $50/day meal allowance. Book at least 2 weeks ahead for best rates. Keep all receipts for expense claims.",
    source: "Finance Policy, Section 4.3 – Business Travel",
    category: "Finance"
  },
  {
    id: 28,
    keywords: ["probation", "trial", "probationary", "period"],
    question: "How long is my probation period?",
    answer: "Probation is **3 months** from your start date. You'll have check-ins with your manager at weeks 4, 8, and 12. Successfully passing probation is confirmed in writing. During probation, notice period is 1 week (vs. 4 weeks after).",
    source: "Employee Handbook, Section 1.2 – Probation",
    category: "HR"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 29,
    keywords: ["resignation", "resign", "quit", "notice", "leaving", "exit"],
    question: "What's the notice period?",
    answer: "After probation, the notice period is **4 weeks** for both employee and employer. During probation, it's 1 week. Submit resignation in writing to your manager and HR. You'll have an exit interview with HR in your last week.",
    source: "Employee Handbook, Section 1.3 – Notice Period",
    category: "HR"
  },
  {
    id: 30,
    keywords: ["harassment", "bullying", "complaint", "report", "misconduct", "grievance"],
    question: "How do I report harassment or misconduct?",
    answer: "Report to any of:\n• Your manager\n• HR directly (hr@acmecorp.com)\n• Anonymous hotline: 1-800-555-SAFE\n• **Ethics Portal** on the intranet\n\nAll reports are confidential and investigated within 5 business days. Zero tolerance policy applies. You will not face retaliation for reporting.",
    source: "Employee Handbook, Section 9.1 – Anti-Harassment Policy",
    category: "HR"
  },
  {
    id: 31,
    keywords: ["referral", "refer", "recruit", "hiring", "bonus", "candidate"],
    question: "Is there an employee referral program?",
    answer: "Yes! Refer someone who gets hired and you receive a **$2,000 bonus** (paid after their 3-month probation). Submit referrals through BambooHR → 'Referrals' tab. No limit on referrals. Bonus doubles to $4,000 for hard-to-fill roles.",
    source: "Employee Handbook, Section 8.1 – Referral Program",
    category: "HR"
  },
  {
    id: 32,
    keywords: ["birthday", "celebration", "team event", "social", "party"],
    question: "Do we celebrate birthdays?",
    answer: "Yes! The team usually does a card + cake on birthdays (your manager coordinates). Monthly team socials are the last Friday of each month (drinks + activities). Quarterly all-hands include celebrations. Budget: $30/person for team events from your team's social fund.",
    source: "Employee Handbook, Section 10 – Social & Culture",
    category: "HR"
  },
  {
    id: 33,
    keywords: ["stock", "equity", "options", "shares", "vesting", "esop"],
    question: "Do I get stock options?",
    answer: "Full-time employees receive **stock options** after 12 months. Vesting schedule: 4-year vest with a 1-year cliff. Details are in your offer letter. Questions about your grant → talk to Finance (finance@acmecorp.com) or your manager.",
    source: "Finance Policy, Section 2.1 – Equity Program",
    category: "Finance"
  },
  {
    id: 34,
    keywords: ["contract", "employment", "agreement", "offer letter", "terms"],
    question: "Where can I find my employment contract?",
    answer: "Your signed contract is in **BambooHR** → 'My Documents'. You received a copy via email when you signed. For questions about terms, contact HR (hr@acmecorp.com). Key details: your role, salary, benefits, and notice period are all specified there.",
    source: "Employee Handbook, Section 1.1 – Employment Terms",
    category: "HR"
  },
  {
    id: 35,
    keywords: ["pet", "dog", "animal", "office pet", "bring pet"],
    question: "Can I bring my pet to work?",
    answer: "We're a **dog-friendly office** on Fridays! Dogs must be well-behaved, leashed in common areas, and stay with their owner. Register your dog with Facilities first (facilities@acmecorp.com). No other pets allowed due to allergy considerations.",
    source: "Facilities Guide, Section 5.1 – Pet Policy",
    category: "Facilities"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 36,
    keywords: ["charity", "volunteer", "community", "csr", "give back", "donation"],
    question: "Is there a volunteer or charity program?",
    answer: "You get **2 paid volunteer days/year** to support a cause you care about. The company also matches donations up to **$500/year** through our CSR platform (charity.acmecorp.com). Annual charity drive happens in December.",
    source: "Employee Handbook, Section 10.2 – Community & CSR",
    category: "HR"
  },
  {
    id: 37,
    keywords: ["parental", "maternity", "paternity", "baby", "family", "adoption"],
    question: "What's the parental leave policy?",
    answer: "**Primary caregiver:** 16 weeks fully paid. **Secondary caregiver:** 4 weeks fully paid. Applies to birth, adoption, and surrogacy. Can be taken flexibly within the first 12 months. Notify HR at least 8 weeks before planned leave start.",
    source: "Employee Handbook, Section 5.3 – Parental Leave",
    category: "HR"
  },
  {
    id: 38,
    keywords: ["ergonomic", "desk", "chair", "standing", "monitor", "setup", "workstation"],
    question: "Can I get ergonomic equipment?",
    answer: "Yes! Submit a request through **Facilities** (facilities@acmecorp.com). Standard options: standing desk converter, ergonomic chair, external monitor, keyboard, and mouse. Budget: up to $500 for your workstation. An ergonomic assessment is available on request.",
    source: "Facilities Guide, Section 1.3 – Workstation Setup",
    category: "Facilities"
  },
  {
    id: 39,
    keywords: ["intern", "internship", "graduate", "placement", "work experience"],
    question: "Do we hire interns?",
    answer: "Yes, we run **summer internships** (June–August) and occasional year-round placements. Refer candidates through BambooHR referrals. Interns are paid, receive mentorship, and may convert to full-time. Talk to your manager if you'd like to mentor an intern.",
    source: "Employee Handbook, Section 8.2 – Internship Program",
    category: "HR"
  },
  {
    id: 40,
    keywords: ["mental health", "counseling", "stress", "wellbeing", "therapy", "eap"],
    question: "Is there mental health support?",
    answer: "Absolutely. You have access to:\n• **Employee Assistance Program (EAP)** – 6 free counseling sessions/year, call 1-800-555-HELP\n• **Headspace** subscription (free for employees)\n• Mental Health First Aiders on each floor\n• Wellness room on Level 3 for quiet time\n\nAll support is 100% confidential.",
    source: "Employee Handbook, Section 6.3 – Mental Health & Wellbeing",
    category: "HR"
  },
  {
    id: 41,
    keywords: ["promotion", "career", "growth", "path", "advance", "role change"],
    question: "How do promotions work?",
    answer: "Promotions are reviewed during **June and December cycles**. Criteria: sustained performance above expectations, demonstrated next-level capabilities, and business need. Your manager nominates you and it's reviewed by the leadership team. Discuss your career path in your 1:1s.",
    source: "Employee Handbook, Section 7.3 – Career Progression",
    category: "HR"
  },
  {
    id: 42,
    keywords: ["company", "values", "mission", "culture", "about us"],
    question: "What are the company values?",
    answer: "Our core values:\n1. **Customer First** – every decision starts with the customer\n2. **Own It** – take responsibility, follow through\n3. **Better Together** – collaboration over competition\n4. **Stay Curious** – always be learning\n5. **Ship It** – bias toward action\n\nThese guide how we work, hire, and make decisions.",
    source: "Employee Handbook, Section 0 – Our Values",
    category: "General"
  }
);

KNOWLEDGE_BASE.faqs.push(
  {
    id: 43,
    keywords: ["address", "office", "location", "directions", "where", "map"],
    question: "What's the office address?",
    answer: "**AcmeCorp HQ**\n123 Innovation Drive, Level 4–6\nTech District, Melbourne VIC 3000\n\nNearest public transport: Central Station (5-min walk). Bus routes 109, 96 stop outside. Building entrance is on Innovation Drive (look for the blue awning).",
    source: "Facilities Guide, Section 0 – Location",
    category: "Facilities"
  },
  {
    id: 44,
    keywords: ["sick", "unwell", "ill", "doctor", "medical", "cannot come"],
    question: "What do I do if I'm sick?",
    answer: "1. Notify your manager via Slack/email before your start time\n2. Log it in **BambooHR** as sick leave\n3. No doctor's note needed for ≤3 days\n4. For 4+ consecutive days, a medical certificate is required\n5. If you're contagious, please stay home!\n\nYou have 10 sick days/year. Don't feel guilty using them.",
    source: "Employee Handbook, Section 5.2 – Sick Leave",
    category: "HR"
  },
  {
    id: 45,
    keywords: ["policy", "policies", "rules", "handbook", "documentation", "guide"],
    question: "Where can I find company policies?",
    answer: "All policies are on the **Company Intranet** (intranet.acmecorp.com) under 'Policies'. Key documents:\n• Employee Handbook\n• IT Security Policy\n• Finance & Expense Policy\n• Safety Handbook\n• Facilities Guide\n\nAlso available in BambooHR → 'Documents'. Updated quarterly.",
    source: "Employee Handbook, Introduction",
    category: "General"
  },
  {
    id: 46,
    keywords: ["diversity", "inclusion", "dei", "equity", "belonging"],
    question: "What DEI initiatives does the company have?",
    answer: "We have active **Employee Resource Groups** (ERGs): Women in Tech, LGBTQ+ Alliance, Cultural Diversity Network, and Parents' Group. Monthly DEI learning sessions, inclusive hiring practices, and a dedicated DEI committee. Join any ERG via the #dei Slack channel.",
    source: "Employee Handbook, Section 10.3 – Diversity & Inclusion",
    category: "HR"
  },
  {
    id: 47,
    keywords: ["overtime", "extra hours", "weekend work", "compensated", "time in lieu"],
    question: "Do I get paid for overtime?",
    answer: "Salaried employees don't receive overtime pay but can take **time in lieu** for significant extra hours (pre-approved by manager). Hourly/contract workers are paid 1.5x for overtime. Weekend work requires manager approval. We discourage regular overtime — talk to your manager if workload is unsustainable.",
    source: "Employee Handbook, Section 3.3 – Overtime",
    category: "HR"
  },
  {
    id: 48,
    keywords: ["confidential", "nda", "secret", "proprietary", "intellectual property", "ip"],
    question: "What's the confidentiality policy?",
    answer: "You signed an **NDA** as part of your contract. Key rules: don't share company information externally, don't discuss unreleased projects on social media, use only approved file-sharing tools, and report any suspected data breaches to IT immediately. IP created during employment belongs to the company.",
    source: "Employee Handbook, Section 9.2 – Confidentiality & IP",
    category: "Legal"
  },
  {
    id: 49,
    keywords: ["social media", "linkedin", "twitter", "post", "online", "public"],
    question: "Can I post about work on social media?",
    answer: "You can share that you work here and general positive experiences. **Don't share:** unreleased products, internal metrics, confidential info, or client details. If posting about the company, add a disclaimer that views are your own. For official company posts, contact Marketing.",
    source: "Employee Handbook, Section 9.3 – Social Media Policy",
    category: "Legal"
  },
  {
    id: 50,
    keywords: ["feedback", "suggestion", "improve", "idea", "complaint"],
    question: "How do I give feedback or suggestions?",
    answer: "Multiple channels:\n• **Weekly 1:1** with your manager\n• **Anonymous feedback** via the quarterly engagement survey\n• **#ideas** Slack channel for product/process ideas\n• **HR inbox** for sensitive concerns (hr@acmecorp.com)\n• **Town halls** (monthly) have open Q&A\n\nWe genuinely want to hear from you!",
    source: "Employee Handbook, Section 10.4 – Feedback Culture",
    category: "HR"
  }
);

// === Org Chart / Contact List ===
KNOWLEDGE_BASE.contacts = [
  { name: "Sarah Chen", role: "HR Director", email: "sarah.chen@acmecorp.com", ext: "4100", department: "Human Resources" },
  { name: "Marcus Johnson", role: "IT Manager", email: "marcus.johnson@acmecorp.com", ext: "4400", department: "IT" },
  { name: "Priya Patel", role: "Finance Lead", email: "priya.patel@acmecorp.com", ext: "4200", department: "Finance" },
  { name: "David Kim", role: "Facilities Manager", email: "david.kim@acmecorp.com", ext: "4300", department: "Facilities" },
  { name: "Rachel Torres", role: "CEO", email: "rachel.torres@acmecorp.com", ext: "4001", department: "Executive" },
  { name: "Tom Williams", role: "CTO", email: "tom.williams@acmecorp.com", ext: "4002", department: "Executive" },
  { name: "Lisa Nguyen", role: "People & Culture Manager", email: "lisa.nguyen@acmecorp.com", ext: "4101", department: "Human Resources" },
  { name: "James OBrien", role: "Security Officer", email: "james.obrien@acmecorp.com", ext: "4500", department: "Security" },
  { name: "Emma Blackwell", role: "Office Manager", email: "emma.blackwell@acmecorp.com", ext: "4301", department: "Facilities" },
  { name: "Carlos Ramirez", role: "Learning & Development Lead", email: "carlos.ramirez@acmecorp.com", ext: "4102", department: "Human Resources" }
];

// === Escalation contacts by category ===
KNOWLEDGE_BASE.escalation = {
  "IT": { contact: "Marcus Johnson", email: "it-support@acmecorp.com", ext: "4400" },
  "HR": { contact: "Sarah Chen", email: "hr@acmecorp.com", ext: "4100" },
  "Finance": { contact: "Priya Patel", email: "finance@acmecorp.com", ext: "4200" },
  "Facilities": { contact: "David Kim", email: "facilities@acmecorp.com", ext: "4300" },
  "Security": { contact: "James OBrien", email: "security@acmecorp.com", ext: "4500" },
  "General": { contact: "Lisa Nguyen", email: "lisa.nguyen@acmecorp.com", ext: "4101" },
  "Safety": { contact: "James OBrien", email: "security@acmecorp.com", ext: "4500" },
  "Legal": { contact: "Sarah Chen", email: "hr@acmecorp.com", ext: "4100" }
};

// === Synonym Expansion Map ===
// Maps common alternative words to the keywords used in FAQ entries
KNOWLEDGE_BASE.synonyms = {
  "days off": "leave",
  "time off": "leave",
  "annual leave": "leave",
  "holiday": "vacation",
  "holidays": "vacation",
  "pto": "leave",
  "day off": "leave",
  "off work": "leave",
  "reimbursed": "expense",
  "reimburse": "expense",
  "claim back": "expense",
  "get paid back": "expense",
  "money back": "expense",
  "internet": "wifi",
  "wireless": "wifi",
  "connect online": "wifi",
  "net access": "wifi",
  "computer help": "it support",
  "tech help": "it support",
  "broken laptop": "it support",
  "fix computer": "it support",
  "my laptop": "it support",
  "car park": "parking",
  "where to park": "parking",
  "drive to work": "parking",
  "outfit": "dress",
  "what to wear": "dress",
  "clothes": "dress",
  "start time": "hours",
  "what time": "hours",
  "when do i start": "hours",
  "finish time": "hours",
  "end of day": "hours",
  "work remotely": "remote",
  "from home": "remote",
  "telecommute": "remote",
  "telework": "remote",
  "salary": "pay",
  "when paid": "pay",
  "paycheck": "pay",
  "wage": "pay",
  "compensation": "pay",
  "health cover": "benefits",
  "medical": "benefits",
  "perk": "benefits",
  "gym membership": "benefits",
  "room booking": "meeting",
  "book a room": "meeting",
  "reserve room": "meeting",
  "conference room": "meeting",
  "chat app": "slack",
  "messenger": "slack",
  "im": "slack",
  "print something": "printer",
  "photocopier": "printer",
  "copier": "printer",
  "new here": "onboarding",
  "just started": "onboarding",
  "first day": "onboarding",
  "new starter": "onboarding",
  "mentor": "buddy",
  "helping me": "buddy",
  "food": "kitchen",
  "eat": "kitchen",
  "hungry": "kitchen",
  "caffeine": "kitchen",
  "tea": "kitchen",
  "get in": "security",
  "enter building": "security",
  "locked out": "security",
  "swipe card": "security",
  "id card": "security",
  "fire drill": "emergency",
  "evacuation": "emergency",
  "hurt": "emergency",
  "injured": "emergency",
  "tools": "software",
  "applications": "software",
  "programs": "software",
  "what apps": "software",
  "forgot password": "password",
  "can't log in": "password",
  "cant login": "password",
  "locked account": "password",
  "report to": "manager",
  "who is my boss": "manager",
  "direct report": "manager",
  "courses": "training",
  "upskill": "training",
  "certification": "training",
  "learn": "training",
  "appraisal": "performance",
  "review meeting": "performance",
  "kpi": "performance",
  "okr": "performance",
  "remote connect": "vpn",
  "work outside office": "vpn",
  "mail": "email",
  "inbox": "email",
  "extension": "phone",
  "desk phone": "phone",
  "trip": "travel",
  "flight": "travel",
  "accommodation": "travel",
  "trial period": "probation",
  "baby": "parental",
  "pregnant": "parental",
  "new parent": "parental",
  "adoption": "parental",
  "chair": "ergonomic",
  "standing desk": "ergonomic",
  "back pain": "ergonomic",
  "counseling": "mental health",
  "stressed": "mental health",
  "anxiety": "mental health",
  "depressed": "mental health",
  "therapy": "mental health",
  "get promoted": "promotion",
  "career growth": "promotion",
  "move up": "promotion",
  "advance": "promotion",
  "about the company": "company",
  "what we do": "company",
  "our mission": "company",
  "suggest": "feedback",
  "complain": "feedback",
  "improvement": "feedback",
  "dog": "pet",
  "puppy": "pet",
  "bring animal": "pet",
  "quitting": "resignation",
  "leave company": "resignation",
  "hand in notice": "resignation",
  "two weeks": "resignation"
};

// === Demo Mode Scripted Conversations ===
KNOWLEDGE_BASE.demoScripts = [
  {
    label: "Wi-Fi Setup",
    question: "What's the Wi-Fi password?",
  },
  {
    label: "Leave Policy",
    question: "How many days off do I get per year?",
  },
  {
    label: "Expense Claim",
    question: "I bought lunch for a client. How do I get reimbursed?",
  },
  {
    label: "Graceful Fail",
    question: "What's the policy on bringing a skateboard to the office?",
  }
];