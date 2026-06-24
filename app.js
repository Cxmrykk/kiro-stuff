/**
 * DeskKitty – AI FAQ Bot for New Employees
 * Main application logic: NLP matching with synonyms, conversation context,
 * feedback persistence, demo mode, and chat UI.
 */

(function () {
  'use strict';

  // === DOM References ===
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const quickQuestions = document.getElementById('quickQuestions');

  // === Constants ===
  const AVATAR = '🐱';
  const BOT_NAME = 'DeskKitty';

  // === State ===
  let messageCount = 0;
  let lastMatchedCategory = null;
  let contextDecay = 0;
  let demoRunning = false;
  let demoAbort = false;

  // === Initialize ===
  function init() {
    addBotMessage(getGreeting(), null, false);
    chatForm.addEventListener('submit', handleSubmit);
    quickQuestions.addEventListener('click', handleQuickQuestion);

    // Demo button
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) demoBtn.addEventListener('click', toggleDemo);

    messageInput.focus();
  }

  function getGreeting() {
    return "Hiii! 🎀✨ I'm **DeskKitty**, your super cute onboarding assistant! " +
      "I'm here to help you feel right at home~ 💕\n\n" +
      "I know all about Wi-Fi, leave policies, expenses, IT support, " +
      "and everything in your employee handbook!\n\n" +
      "Ask me anything or tap a quick question below! Let's make your first day amazing~ 🌸✨";
  }

  // === Event Handlers ===
  function handleSubmit(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;
    messageInput.value = '';
    sendMessage(text);
  }

  function handleQuickQuestion(e) {
    const btn = e.target.closest('.quick-btn');
    if (!btn) return;
    const question = btn.dataset.question;
    sendMessage(question);
  }

  // === Core Chat Logic ===
  function sendMessage(text) {
    addUserMessage(text);
    showTypingIndicator();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      removeTypingIndicator();
      const response = findAnswer(text);
      addBotMessage(response.answer, response.source, true);
    }, delay);
  }

  // === NLP Matching Engine with Synonyms & Context ===
  function findAnswer(query) {
    const normalizedQuery = query.toLowerCase().replace(/[?!.,'"]/g, '');
    
    // Expand synonyms
    let expandedQuery = expandSynonyms(normalizedQuery);
    
    // Add context boost: if last category is known, weight it
    const queryWords = expandedQuery.split(/\s+/);

    let bestMatch = null;
    let bestScore = 0;

    for (const faq of KNOWLEDGE_BASE.faqs) {
      let score = calculateRelevance(expandedQuery, queryWords, faq);
      
      // Context boost: if this FAQ is same category as last answer
      if (lastMatchedCategory && faq.category === lastMatchedCategory && contextDecay < 3) {
        score += 1.5;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    // Confidence threshold
    if (bestScore >= 2) {
      lastMatchedCategory = bestMatch.category;
      contextDecay = 0;
      return {
        answer: bestMatch.answer,
        source: bestMatch.source
      };
    }

    // No match — increment context decay
    contextDecay++;
    if (contextDecay >= 3) {
      lastMatchedCategory = null;
    }

    return getGracefulFallback(normalizedQuery);
  }

  function expandSynonyms(query) {
    if (!KNOWLEDGE_BASE.synonyms) return query;
    
    let expanded = query;
    for (const [phrase, replacement] of Object.entries(KNOWLEDGE_BASE.synonyms)) {
      if (expanded.includes(phrase)) {
        expanded += ' ' + replacement;
      }
    }
    return expanded;
  }

  function calculateRelevance(query, queryWords, faq) {
    let score = 0;

    // Keyword matching (weighted heavily)
    for (const keyword of faq.keywords) {
      if (query.includes(keyword)) {
        score += 3;
      }
      for (const word of queryWords) {
        if (word.length > 3 && keyword.includes(word)) {
          score += 1;
        }
        if (word.length > 2 && keyword.startsWith(word)) {
          score += 0.5;
        }
      }
    }

    // Question text similarity
    const faqWords = faq.question.toLowerCase().split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2 && faqWords.includes(word)) {
        score += 1;
      }
    }

    return score;
  }

  function getGracefulFallback(query) {
    const categoryHints = {
      "IT": ["computer", "software", "tech", "system", "login", "app", "device", "screen", "monitor"],
      "HR": ["contract", "hr", "hire", "team", "people", "human"],
      "Finance": ["money", "pay", "tax", "invoice", "bank", "financial"],
      "Facilities": ["building", "office", "room", "space", "clean", "maintenance"],
      "Security": ["secure", "threat", "incident", "breach", "lost", "stolen"]
    };

    let matchedCategory = null;
    for (const [category, hints] of Object.entries(categoryHints)) {
      for (const hint of hints) {
        if (query.includes(hint)) {
          matchedCategory = category;
          break;
        }
      }
      if (matchedCategory) break;
    }

    if (matchedCategory && KNOWLEDGE_BASE.escalation[matchedCategory]) {
      const esc = KNOWLEDGE_BASE.escalation[matchedCategory];
      return {
        answer: `I'm not sure about that one, but I think the **${matchedCategory}** team can help! ` +
          `\n\nReach out to **${esc.contact}**:\n• Email: ${esc.email}\n• Phone: ext. ${esc.ext}\n\n` +
          `They'll be happy to help you out. Is there anything else I can assist with?`,
        source: "Org Chart – Escalation Contacts"
      };
    }

    const esc = KNOWLEDGE_BASE.escalation["General"];
    return {
      answer: `Hmm, I don't have a specific answer for that one. 🤔\n\n` +
        `Here's what I'd suggest:\n` +
        `• **Ask your buddy** – they know the ropes\n` +
        `• **Contact HR** – ${esc.email} (ext. ${esc.ext})\n` +
        `• **Check the intranet** – intranet.acmecorp.com\n\n` +
        `Or try rephrasing your question — I might know it by a different name!`,
      source: null
    };
  }

  // === UI Rendering ===
  function addUserMessage(text) {
    messageCount++;
    const msgEl = document.createElement('div');
    msgEl.className = 'message message--user';
    msgEl.setAttribute('role', 'article');
    msgEl.setAttribute('aria-label', 'You said');
    msgEl.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">${escapeHtml(text)}</div>
      </div>
    `;
    chatMessages.appendChild(msgEl);
    scrollToBottom();
  }

  function addBotMessage(text, source, showFeedback) {
    messageCount++;
    const msgId = 'msg-' + messageCount;
    const msgEl = document.createElement('div');
    msgEl.className = 'message message--bot';
    msgEl.setAttribute('role', 'article');
    msgEl.setAttribute('aria-label', BOT_NAME + ' said');

    let html = `
      <div class="message-avatar" aria-hidden="true">${AVATAR}</div>
      <div class="message-content">
        <div class="message-bubble">${formatMarkdown(text)}</div>
    `;

    if (source) {
      html += `<div class="message-source">📄 ${escapeHtml(source)}</div>`;
    }

    if (showFeedback) {
      html += `
        <div class="message-feedback" role="group" aria-label="Rate this answer">
          <button class="feedback-btn" data-msg-id="${msgId}" data-vote="up" aria-label="Helpful">👍</button>
          <button class="feedback-btn" data-msg-id="${msgId}" data-vote="down" aria-label="Not helpful">👎</button>
        </div>
      `;
    }

    html += `</div>`;
    msgEl.innerHTML = html;

    if (showFeedback) {
      msgEl.querySelectorAll('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', handleFeedback);
      });
    }

    chatMessages.appendChild(msgEl);
    scrollToBottom();
  }

  // === Feedback System with localStorage ===
  function handleFeedback(e) {
    const btn = e.currentTarget;
    const msgId = btn.dataset.msgId;
    const vote = btn.dataset.vote;
    const feedbackGroup = btn.parentElement;

    // Remove previous active state
    feedbackGroup.querySelectorAll('.feedback-btn').forEach(b => {
      b.classList.remove('active-up', 'active-down');
      b.removeAttribute('aria-pressed');
    });

    // Set active state
    btn.classList.add(vote === 'up' ? 'active-up' : 'active-down');
    btn.setAttribute('aria-pressed', 'true');

    // Persist to localStorage
    const feedbackLog = getFeedbackLog();
    // Remove existing feedback for this message
    const existing = feedbackLog.findIndex(f => f.msgId === msgId);
    if (existing !== -1) feedbackLog.splice(existing, 1);
    
    feedbackLog.push({ msgId, vote, timestamp: new Date().toISOString() });
    localStorage.setItem('deskkitty_feedback', JSON.stringify(feedbackLog));

    // Show toast
    showToast(vote === 'up' ? 'Thanks for the feedback! 👍' : 'Sorry about that. We\'ll improve! 📝');
  }

  function getFeedbackLog() {
    try {
      return JSON.parse(localStorage.getItem('deskkitty_feedback') || '[]');
    } catch {
      return [];
    }
  }

  function exportFeedback() {
    const data = getFeedbackLog();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deskkitty-feedback-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // === Toast Notifications ===
  function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => toast.classList.add('toast--visible'));

    // Remove after 2.5s
    setTimeout(() => {
      toast.classList.remove('toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // === Demo Mode ===
  function toggleDemo() {
    const demoBtn = document.getElementById('demoBtn');
    if (demoRunning) {
      demoAbort = true;
      demoRunning = false;
      if (demoBtn) {
        demoBtn.textContent = '▶ Demo';
        demoBtn.classList.remove('demo-btn--active');
      }
      return;
    }
    runDemo();
  }

  async function runDemo() {
    if (!KNOWLEDGE_BASE.demoScripts) return;
    
    const demoBtn = document.getElementById('demoBtn');
    demoRunning = true;
    demoAbort = false;
    if (demoBtn) {
      demoBtn.textContent = '⏹ Stop';
      demoBtn.classList.add('demo-btn--active');
    }

    // Clear chat
    chatMessages.innerHTML = '';
    messageCount = 0;
    lastMatchedCategory = null;
    contextDecay = 0;

    addBotMessage("🎬 **Demo Mode** — Watch me handle common onboarding questions!", null, false);
    await sleep(1500);

    for (const script of KNOWLEDGE_BASE.demoScripts) {
      if (demoAbort) break;

      // Show label
      addBotMessage(`--- **${script.label}** ---`, null, false);
      await sleep(800);
      if (demoAbort) break;

      // Simulate user typing
      addUserMessage(script.question);
      await sleep(500);
      if (demoAbort) break;

      // Show typing indicator
      showTypingIndicator();
      await sleep(1200);
      if (demoAbort) break;

      // Get and show answer
      removeTypingIndicator();
      const response = findAnswer(script.question);
      addBotMessage(response.answer, response.source, true);
      await sleep(2500);
    }

    if (!demoAbort) {
      await sleep(1000);
      addBotMessage("🎬 **Demo complete!** That's DeskKitty in action~ Try asking your own questions! 💕", null, false);
    }

    demoRunning = false;
    demoAbort = false;
    if (demoBtn) {
      demoBtn.textContent = '▶ Demo';
      demoBtn.classList.remove('demo-btn--active');
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // === Typing Indicator ===
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message message--bot';
    indicator.id = 'typingIndicator';
    indicator.setAttribute('aria-label', BOT_NAME + ' is typing');
    indicator.innerHTML = `
      <div class="message-avatar" aria-hidden="true">${AVATAR}</div>
      <div class="message-content">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  // === Utilities ===
  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/• /g, '&bull; ');
  }

  // Expose export for the button
  window.exportFeedback = exportFeedback;

  // === Start the app ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
