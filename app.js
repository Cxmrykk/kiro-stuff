/**
 * DeskKitty – AI FAQ Bot for New Employees
 * Main application logic: NLP matching, Audio & VFX Engine,
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
  let audioInitialized = false;

  // === Kawaii Audio Engine ===
  const AudioEngine = {
    ctx: null,
    muted: false,
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },
    playTone(freq, type, duration, vol = 0.1, slideFreq = null) {
      if (this.muted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (slideFreq) osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    },
    meow() {
      if (this.muted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.4);
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 2;
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
      } catch(e) {}
    },
    pop() { this.playTone(600, 'sine', 0.1, 0.1, 300); },
    tink() { this.playTone(1200, 'sine', 0.08, 0.05); },
    bell() { 
      this.playTone(1046.50, 'sine', 0.2, 0.05);
      setTimeout(() => this.playTone(1318.51, 'sine', 0.3, 0.05), 80);
    },
    chime() {
      [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 'sine', 0.4, 0.05), i * 60);
      });
    },
    sad() { this.playTone(400, 'triangle', 0.5, 0.1, 200); }
  };

  // === Magic Visual Effects Engine ===
  const VFX = {
    layer: null,
    idleTimer: null,
    lastMouseTime: 0,
    init() {
      this.layer = document.getElementById('vfx-layer');
      if (!this.layer) return;
      
      // Expanded Ambient Objects
      setInterval(() => this.spawnAmbientObject(), 1200);

      // Peekaboo Kitty Element
      const peekaboo = document.createElement('div');
      peekaboo.id = 'peekaboo-kitty';
      this.layer.appendChild(peekaboo);

      // Global click sparkles
      document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT' && !e.target.closest('button')) {
          this.spawnClickBurst(e.clientX, e.clientY);
        }
      });

      // Cursor Trail
      document.addEventListener('mousemove', (e) => {
        this.resetIdle();
        if (Date.now() - this.lastMouseTime > 40) {
          this.lastMouseTime = Date.now();
          this.spawnTrail(e.clientX, e.clientY);
        }
      });
      document.addEventListener('keydown', () => this.resetIdle());
      this.resetIdle();
    },
    resetIdle() {
      clearTimeout(this.idleTimer);
      const peek = document.getElementById('peekaboo-kitty');
      if (peek) peek.classList.remove('show');
      this.idleTimer = setTimeout(() => {
        if (peek) peek.classList.add('show');
      }, 10000); // 10 seconds of idle time
    },
    spawnAmbientObject() {
      if (!this.layer || document.hidden) return;
      const types = ['petal', 'apple', 'milk', 'button'];
      const type = types[Math.floor(Math.random() * types.length)];
      const obj = document.createElement('div');
      obj.className = `hk-ambient hk-ambient-${type}`;
      obj.style.left = Math.random() * 100 + 'vw';
      const duration = 6 + Math.random() * 5;
      obj.style.animationDuration = duration + 's';
      this.layer.appendChild(obj);
      setTimeout(() => obj.remove(), duration * 1000);
    },
    spawnTrail(x, y) {
      if (!this.layer) return;
      const trail = document.createElement('div');
      trail.className = 'hk-trail-star';
      trail.style.left = (x + 10) + 'px';
      trail.style.top = (y + 10) + 'px';
      this.layer.appendChild(trail);
      setTimeout(() => trail.remove(), 600);
    },
    spawnClickBurst(x, y) {
      if (!this.layer) return;
      for (let i = 0; i < 4; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'hk-particle hk-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 25;
        sparkle.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        this.layer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 600);
      }
    },
    spawnHearts(target) {
      if (!this.layer) return;
      const rect = target.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'hk-heart-float';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top) + 'px';
        heart.style.animationDelay = (i * 0.1) + 's';
        heart.style.setProperty('--tx', (Math.random() * 40 - 20) + 'px');
        this.layer.appendChild(heart);
        setTimeout(() => heart.remove(), 1500 + (i * 100));
      }
    },
    spawnSendCannon(target) {
      if (!this.layer) return;
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'hk-particle hk-cannon-star';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        const angle = (Math.random() * Math.PI) / 1.5 + Math.PI / 6; // shoot upwards
        const dist = 40 + Math.random() * 80;
        particle.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        particle.style.setProperty('--ty', -Math.sin(angle) * dist + 'px');
        particle.style.setProperty('--rot', Math.random() * 360 + 'deg');
        this.layer.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
    },
    spawnConfetti(target) {
      if (!this.layer) return;
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const colors = ['#ff0033', '#ff6680', '#ffcc00', '#ffffff'];
      for (let i = 0; i < 15; i++) {
        const conf = document.createElement('div');
        conf.className = 'hk-particle hk-confetti';
        conf.style.left = x + 'px';
        conf.style.top = y + 'px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 60;
        conf.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        conf.style.setProperty('--ty', Math.sin(angle) * dist - 30 + 'px');
        conf.style.setProperty('--rot', Math.random() * 360 + 'deg');
        this.layer.appendChild(conf);
        setTimeout(() => conf.remove(), 800);
      }
    },
    spawnAppleRain() {
      if (!this.layer) return;
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const apple = document.createElement('div');
          apple.className = 'hk-ambient hk-ambient-apple';
          apple.style.left = Math.random() * 100 + 'vw';
          apple.style.width = '35px';
          apple.style.height = '35px';
          apple.style.animationDuration = (2 + Math.random() * 2) + 's';
          apple.style.opacity = '1';
          this.layer.appendChild(apple);
          setTimeout(() => apple.remove(), 4000);
        }, i * 40);
      }
    }
  };

  // === Initialize App ===
  function init() {
    addBotMessage(getGreeting(), null, false, 'success');
    chatForm.addEventListener('submit', handleSubmit);
    quickQuestions.addEventListener('click', handleQuickQuestion);

    // Audio context requires user interaction
    const ensureAudio = () => {
      if (!audioInitialized) {
        AudioEngine.init();
        audioInitialized = true;
        document.removeEventListener('click', ensureAudio);
        document.removeEventListener('keydown', ensureAudio);
      }
    };
    document.addEventListener('click', ensureAudio);
    document.addEventListener('keydown', ensureAudio);

    // Interactive Avatars (Pet the Kitty)
    const headerAvatar = document.querySelector('.header-avatar');
    if (headerAvatar) {
      headerAvatar.addEventListener('click', (e) => {
        AudioEngine.meow();
        VFX.spawnHearts(e.target);
      });
    }

    // Buttons
    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) demoBtn.addEventListener('click', toggleDemo);

    VFX.init();
    messageInput.focus();
  }

  function getGreeting() {
    return "<span class=\"sparkle-text\">Hiii! 🎀✨</span> I'm **DeskKitty**, your super cute onboarding assistant! " +
      "I'm here to help you feel right at home~ 💕\n\n" +
      "I know all about Wi-Fi, leave policies, expenses, IT support, " +
      "and everything in your employee handbook!\n\n" +
      "Ask me anything or tap a quick question below! <span class=\"sparkle-text\">Let's make your first day amazing~ 🌸✨</span>";
  }

  function toggleSound(e) {
    e.stopPropagation();
    AudioEngine.init();
    AudioEngine.muted = !AudioEngine.muted;
    const soundBtn = document.getElementById('soundBtn');
    if (AudioEngine.muted) {
      soundBtn.textContent = '🔇';
      soundBtn.classList.remove('header-btn--active');
    } else {
      soundBtn.textContent = '🔊';
      soundBtn.classList.add('header-btn--active');
      AudioEngine.meow();
      setTimeout(() => AudioEngine.chime(), 400);
    }
  }

  // === Event Handlers ===
  function handleSubmit(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;
    messageInput.value = '';

    // Easter Eggs Check
    const lower = text.toLowerCase();
    if (lower === 'apple' || lower === 'apples') {
      AudioEngine.chime();
      VFX.spawnAppleRain();
      return;
    }
    if (lower === 'kuromi') {
      AudioEngine.sad();
      document.body.classList.add('kuromi-mode');
      addBotMessage("<span class=\"sparkle-text\">Hehe... Kuromi was here! 🖤💀</span> Everything is dark now!", null, false, 'kuromi');
      setTimeout(() => document.body.classList.remove('kuromi-mode'), 12000);
      return;
    }

    const sendBtn = chatForm.querySelector('.send-btn');
    if (sendBtn) VFX.spawnSendCannon(sendBtn);

    sendMessage(text);
  }

  function handleQuickQuestion(e) {
    const btn = e.target.closest('.quick-btn');
    if (!btn) return;
    AudioEngine.tink();
    const question = btn.dataset.question;
    sendMessage(question);
  }

  // === Core Chat Logic ===
  function sendMessage(text) {
    AudioEngine.pop();
    addUserMessage(text);
    showTypingIndicator();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      removeTypingIndicator();
      const response = findAnswer(text);
      addBotMessage(response.answer, response.source, true, response.type);
    }, delay);
  }

  // === NLP Matching Engine ===
  function findAnswer(query) {
    const normalizedQuery = query.toLowerCase().replace(/[?!.,'"]/g, '');
    let expandedQuery = expandSynonyms(normalizedQuery);
    const queryWords = expandedQuery.split(/\s+/);

    let bestMatch = null;
    let bestScore = 0;

    for (const faq of KNOWLEDGE_BASE.faqs) {
      let score = calculateRelevance(expandedQuery, queryWords, faq);
      if (lastMatchedCategory && faq.category === lastMatchedCategory && contextDecay < 3) {
        score += 1.5;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    if (bestScore >= 2) {
      lastMatchedCategory = bestMatch.category;
      contextDecay = 0;
      return { answer: bestMatch.answer, source: bestMatch.source, type: 'success' };
    }

    contextDecay++;
    if (contextDecay >= 3) lastMatchedCategory = null;
    const fallback = getGracefulFallback(normalizedQuery);
    return { answer: fallback.answer, source: fallback.source, type: 'fallback' };
  }

  function expandSynonyms(query) {
    if (!KNOWLEDGE_BASE.synonyms) return query;
    let expanded = query;
    for (const [phrase, replacement] of Object.entries(KNOWLEDGE_BASE.synonyms)) {
      if (expanded.includes(phrase)) expanded += ' ' + replacement;
    }
    return expanded;
  }

  function calculateRelevance(query, queryWords, faq) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (query.includes(keyword)) score += 3;
      for (const word of queryWords) {
        if (word.length > 3 && keyword.includes(word)) score += 1;
        if (word.length > 2 && keyword.startsWith(word)) score += 0.5;
      }
    }
    const faqWords = faq.question.toLowerCase().split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2 && faqWords.includes(word)) score += 1;
    }
    return score;
  }

  function getGracefulFallback(query) {
    const categoryHints = {
      "IT": ["computer", "software", "tech", "system", "login", "app", "device", "screen"],
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
      answer: `Hmm, I don't have a specific answer for that one... 💧\n\n` +
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

  function addBotMessage(text, source, showFeedback, type = 'normal') {
    messageCount++;
    if (showFeedback) setTimeout(() => AudioEngine.bell(), 150);

    const msgId = 'msg-' + messageCount;
    const msgEl = document.createElement('div');
    // Inject the expressive avatar class
    msgEl.className = `message message--bot avatar-${type}`;
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
      
      const sparkles = document.createElement('div');
      sparkles.className = 'bot-sparkle-container';
      sparkles.innerHTML = `
        <div class="bot-sparkle" style="left: 10px; animation-delay: 0s;"></div>
        <div class="bot-sparkle" style="left: 40px; animation-delay: 0.2s; top: -5px;"></div>
        <div class="bot-sparkle" style="left: 25px; animation-delay: 0.1s; top: 10px;"></div>
      `;
      msgEl.querySelector('.message-bubble').appendChild(sparkles);
      setTimeout(() => sparkles.remove(), 1500);
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

    feedbackGroup.querySelectorAll('.feedback-btn').forEach(b => {
      b.classList.remove('active-up', 'active-down');
      b.removeAttribute('aria-pressed');
    });

    btn.classList.add(vote === 'up' ? 'active-up' : 'active-down');
    btn.setAttribute('aria-pressed', 'true');

    if (vote === 'up') {
      AudioEngine.chime();
      VFX.spawnConfetti(btn);
    } else {
      AudioEngine.sad();
    }

    const feedbackLog = getFeedbackLog();
    const existing = feedbackLog.findIndex(f => f.msgId === msgId);
    if (existing !== -1) feedbackLog.splice(existing, 1);
    
    feedbackLog.push({ msgId, vote, timestamp: new Date().toISOString() });
    localStorage.setItem('deskkitty_feedback', JSON.stringify(feedbackLog));

    showToast(vote === 'up' ? 'Thanks for the feedback! ✨' : 'Sorry about that. We\'ll improve! 🌧️');
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
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast--visible'));

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
        demoBtn.classList.remove('header-btn--active');
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
      demoBtn.classList.add('header-btn--active');
    }

    chatMessages.innerHTML = '';
    messageCount = 0;
    lastMatchedCategory = null;
    contextDecay = 0;

    addBotMessage("🎬 **Demo Mode** — Watch me handle common onboarding questions!", null, false, 'success');
    await sleep(1500);

    for (const script of KNOWLEDGE_BASE.demoScripts) {
      if (demoAbort) break;

      addBotMessage(`--- **${script.label}** ---`, null, false, 'normal');
      await sleep(800);
      if (demoAbort) break;

      AudioEngine.pop();
      addUserMessage(script.question);
      await sleep(500);
      if (demoAbort) break;

      showTypingIndicator();
      await sleep(1200);
      if (demoAbort) break;

      removeTypingIndicator();
      const response = findAnswer(script.question);
      addBotMessage(response.answer, response.source, true, response.type);
      await sleep(2500);
    }

    if (!demoAbort) {
      await sleep(1000);
      addBotMessage("🎬 **Demo complete!** That's DeskKitty in action~ Try asking your own questions! 💕", null, false, 'success');
    }

    demoRunning = false;
    demoAbort = false;
    if (demoBtn) {
      demoBtn.textContent = '▶ Demo';
      demoBtn.classList.remove('header-btn--active');
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