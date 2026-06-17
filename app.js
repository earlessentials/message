(() => {
  const {
    THEMES,
    THEME_STYLE,
    QUESTION_FLOW,
    MESSAGE_LIBRARY,
    SCIENCE_LIBRARY,
    COMPLIMENT_LIBRARY,
    PROMPT_LIBRARY,
    CURIOSITY_FACTS,
  } = window.ReflectionData;

  const storageKeys = {
    message: "messageYouNeedToday.recentMessages",
    science: "messageYouNeedToday.recentScience",
    compliment: "messageYouNeedToday.recentCompliments",
    prompt: "messageYouNeedToday.recentPrompts",
    curiosity: "messageYouNeedToday.recentCuriosities",
  };

  const els = {
    particleField: document.getElementById("particleField"),
    landingView: document.getElementById("landingView"),
    questionView: document.getElementById("questionView"),
    revealView: document.getElementById("revealView"),
    startButton: document.getElementById("startButton"),
    questionCount: document.getElementById("questionCount"),
    progressPercent: document.getElementById("progressPercent"),
    progressFill: document.getElementById("progressFill"),
    questionEyebrow: document.getElementById("questionEyebrow"),
    questionTitle: document.getElementById("questionTitle"),
    choiceGrid: document.getElementById("choiceGrid"),
    reflectionCard: document.getElementById("reflectionCard"),
    reflectionIcon: document.getElementById("reflectionIcon"),
    themeKicker: document.getElementById("themeKicker"),
    messageTitle: document.getElementById("messageTitle"),
    messageText: document.getElementById("messageText"),
    resonanceText: document.getElementById("resonanceText"),
    scienceText: document.getElementById("scienceText"),
    complimentText: document.getElementById("complimentText"),
    promptText: document.getElementById("promptText"),
    curiosityText: document.getElementById("curiosityText"),
    downloadStory: document.getElementById("downloadStory"),
    downloadSquare: document.getElementById("downloadSquare"),
    shareButton: document.getElementById("shareButton"),
    againButton: document.getElementById("againButton"),
    statusNote: document.getElementById("statusNote"),
  };

  const state = {
    step: 0,
    answers: [],
    result: null,
  };

  const resonanceLanguage = {
    Healing: "repair, emotional clarity, and a gentler relationship with what has been asking for care",
    Purpose: "direction, meaningful effort, and the wish to turn inner knowing into a practical next step",
    Relationships: "connection, emotional presence, and the desire to feel met with sincerity",
    Identity: "self-recognition, personal truth, and a clearer relationship with your own voice",
    Growth: "change, flexibility, and the mature response that is beginning to become available",
    Rest: "regulation, quiet restoration, and the relief of letting enough be enough",
    Creativity: "curiosity, fresh perception, and the spark that wants room to become visible",
    Courage: "honesty, values, and the willingness to take a real step with care",
    "Self-trust": "inner evidence, discernment, and the wish to feel steadier in your own choices",
    "New beginnings": "openness, renewal, and the first shape of something that has not fully arrived yet",
    Presence: "grounding, sensory attention, and the wish to return to the moment with more ease",
    Hope: "possibility, emotional renewal, and a believable next step toward lightness",
  };

  function init() {
    createParticles();
    els.startButton.addEventListener("click", startQuestions);
    els.downloadStory.addEventListener("click", () => downloadCard("story"));
    els.downloadSquare.addEventListener("click", () => downloadCard("square"));
    els.shareButton.addEventListener("click", shareReflection);
    els.againButton.addEventListener("click", startQuestions);

    assertDataShape();
  }

  function assertDataShape() {
    console.info("Message You Need Today data", {
      messages: MESSAGE_LIBRARY.length,
      science: SCIENCE_LIBRARY.length,
      compliments: COMPLIMENT_LIBRARY.length,
      prompts: PROMPT_LIBRARY.length,
      curiosities: CURIOSITY_FACTS.length,
    });
  }

  function createParticles() {
    const fragment = document.createDocumentFragment();
    const count = window.matchMedia("(max-width: 560px)").matches ? 18 : 28;
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty("--duration", `${12 + Math.random() * 12}s`);
      particle.style.setProperty("--delay", `${Math.random() * -18}s`);
      particle.style.setProperty("--x", `${(Math.random() - 0.5) * 9}rem`);
      particle.style.setProperty("--y", `${(Math.random() - 0.5) * 9}rem`);
      particle.style.setProperty("--opacity", `${0.24 + Math.random() * 0.46}`);
      fragment.appendChild(particle);
    }
    els.particleField.appendChild(fragment);
  }

  function startQuestions() {
    state.step = 0;
    state.answers = [];
    state.result = null;
    setStatus("");
    document.body.removeAttribute("data-palette");
    showView("question");
    renderQuestion();
  }

  function showView(name) {
    const active = {
      landing: els.landingView,
      question: els.questionView,
      reveal: els.revealView,
    }[name];

    [els.landingView, els.questionView, els.revealView].forEach((view) => {
      view.classList.toggle("is-active", view === active);
    });
  }

  function renderQuestion() {
    const question = QUESTION_FLOW[state.step];
    const questionNumber = state.step + 1;
    const progress = Math.round((questionNumber / QUESTION_FLOW.length) * 100);

    els.questionCount.textContent = `Question ${questionNumber} of ${QUESTION_FLOW.length}`;
    els.progressPercent.textContent = `${progress}%`;
    els.progressFill.style.width = `${progress}%`;
    els.questionEyebrow.textContent = question.eyebrow;
    els.questionTitle.textContent = question.question;
    els.choiceGrid.innerHTML = "";

    question.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = `<span>${choice.label}</span>`;
      button.addEventListener("click", () => selectChoice(choice));
      els.choiceGrid.appendChild(button);
    });

    requestAnimationFrame(() => {
      const firstChoice = els.choiceGrid.querySelector("button");
      firstChoice?.focus({ preventScroll: true });
    });
  }

  function selectChoice(choice) {
    const buttons = [...els.choiceGrid.querySelectorAll("button")];
    buttons.forEach((button) => {
      const selected = button.textContent === choice.label;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.disabled = true;
    });

    state.answers[state.step] = {
      questionId: QUESTION_FLOW[state.step].id,
      label: choice.label,
      weights: choice.weights,
    };

    window.setTimeout(() => {
      if (state.step < QUESTION_FLOW.length - 1) {
        state.step += 1;
        renderQuestion();
      } else {
        revealReflection();
      }
    }, 260);
  }

  function revealReflection() {
    const profile = buildProfile(state.answers);
    const message = selectForProfile(
      MESSAGE_LIBRARY.filter((item) => profile.topThemes.slice(0, 3).includes(item.theme)),
      profile,
      storageKeys.message,
      28
    );
    const science = selectForProfile(SCIENCE_LIBRARY, profile, storageKeys.science, 36);
    const compliment = selectForProfile(COMPLIMENT_LIBRARY, profile, storageKeys.compliment, 60);
    const prompt = selectForProfile(PROMPT_LIBRARY, profile, storageKeys.prompt, 40);
    const curiosity = selectForProfile(CURIOSITY_FACTS, profile, storageKeys.curiosity, 48);

    state.result = {
      profile,
      message,
      science,
      compliment,
      prompt,
      curiosity,
      resonance: buildResonance(profile),
    };

    renderReveal();
    showView("reveal");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      els.revealView.querySelector("#revealTitle")?.focus({ preventScroll: true });
    });
  }

  function buildProfile(answers) {
    const scores = Object.fromEntries(THEMES.map((theme) => [theme, 0]));
    answers.forEach((answer) => {
      Object.entries(answer.weights).forEach(([theme, value]) => {
        scores[theme] += value;
      });
    });

    const topThemes = THEMES.slice().sort((a, b) => scores[b] - scores[a]);
    return {
      scores,
      topThemes,
      primaryTheme: topThemes[0],
      secondaryTheme: topThemes[1],
      tertiaryTheme: topThemes[2],
      answers,
    };
  }

  function selectForProfile(items, profile, key, recentLimit) {
    const recent = loadRecent(key);
    let pool = items.filter((item) => !recent.includes(item.id));
    if (!pool.length) {
      pool = items.slice();
      saveRecent(key, [], recentLimit);
    }

    const weighted = pool.map((item) => {
      const themes = item.themes || [item.theme].filter(Boolean);
      const themeScore = themes.reduce((sum, theme) => sum + (profile.scores[theme] || 0), 0);
      const primaryBonus = themes.includes(profile.primaryTheme) ? 8 : 0;
      const secondaryBonus = themes.includes(profile.secondaryTheme) ? 3 : 0;
      return {
        item,
        weight: Math.max(1, themeScore + primaryBonus + secondaryBonus),
      };
    });

    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = Math.random() * total;
    const selected = weighted.find((entry) => {
      cursor -= entry.weight;
      return cursor <= 0;
    })?.item || weighted[0].item;

    remember(key, selected.id, recentLimit);
    return selected;
  }

  function loadRecent(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveRecent(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function remember(key, id, limit) {
    const next = [id, ...loadRecent(key).filter((item) => item !== id)].slice(0, limit);
    saveRecent(key, next);
  }

  function buildResonance(profile) {
    const [heart, energy, sentence] = profile.answers;
    const primary = profile.primaryTheme;
    const secondary = profile.secondaryTheme;
    const chosenSentence = sentence.label.endsWith(".") ? sentence.label : `${sentence.label}.`;

    return `The combination of your answers suggests your attention is currently leaning toward ${resonanceLanguage[primary]} and ${resonanceLanguage[secondary]}. Choosing ${heart.label}, ${energy.label}, and "${chosenSentence}" points to a pattern where emotion, energy, and self-perception are asking to be organized with care. Psychology shows that the mind naturally prioritizes unresolved themes; this process, often described as attentional prioritization, allows certain thoughts to occupy more mental space until they feel understood. Today's reflection gives those thoughts language without claiming certainty about you. It responds to the pattern you named.`;
  }

  function renderReveal() {
    const { profile, message, science, compliment, prompt, curiosity } = state.result;
    const style = THEME_STYLE[profile.primaryTheme] || THEME_STYLE.Healing;

    document.body.dataset.palette = style.palette;
    document.documentElement.style.setProperty("--focus", style.accent);
    els.reflectionIcon.textContent = style.icon;
    els.themeKicker.textContent = `${profile.primaryTheme} with ${profile.secondaryTheme}`;
    els.messageTitle.textContent = message.title;
    els.messageText.textContent = message.text;
    els.resonanceText.textContent = state.result.resonance;
    els.scienceText.textContent = science.text;
    els.complimentText.textContent = compliment.text;
    els.promptText.textContent = prompt.text;
    els.curiosityText.textContent = curiosity.text;
  }

  function formatShareText() {
    const { message, science, compliment, prompt, curiosity } = state.result;
    return [
      "Message You Need Today",
      "",
      `Today's Message: ${message.text}`,
      "",
      `A Compliment Just For You: ${compliment.text}`,
      "",
      `Today's Science: ${science.text}`,
      "",
      `Today's Reflection: ${prompt.text}`,
      "",
      `Tiny Curiosity: ${curiosity.text}`,
    ].join("\n");
  }

  async function shareReflection() {
    if (!state.result) return;

    const text = formatShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Message You Need Today",
          text,
        });
        setStatus("Reflection shared.");
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setStatus("Reflection copied to clipboard.");
    } catch {
      copyWithFallback(text);
      setStatus("Reflection copied.");
    }
  }

  function copyWithFallback(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function setStatus(message) {
    els.statusNote.textContent = message;
  }

  async function downloadCard(format) {
    if (!state.result) return;
    setStatus("Preparing your card...");

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const isStory = format === "story";
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = isStory ? 1920 : 1080;
    const ctx = canvas.getContext("2d");

    drawCard(ctx, canvas.width, canvas.height, isStory);

    canvas.toBlob((blob) => {
      if (!blob) {
        setStatus("The card could not be created.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `message-you-need-today-${format}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(`${isStory ? "Story" : "Square"} card saved.`);
    }, "image/png");
  }

  function drawCard(ctx, width, height, isStory) {
    const { profile, message, science, compliment, prompt } = state.result;
    const style = THEME_STYLE[profile.primaryTheme] || THEME_STYLE.Healing;
    const margin = isStory ? 92 : 70;
    const contentWidth = width - margin * 2;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#fffaf2");
    gradient.addColorStop(0.42, "#f8e8e6");
    gradient.addColorStop(1, "#efe2d2");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    drawCardBlob(ctx, width * 0.16, height * 0.08, width * 0.62, "rgba(241, 205, 210, 0.58)");
    drawCardBlob(ctx, width * 0.92, height * 0.18, width * 0.54, "rgba(207, 195, 230, 0.42)");
    drawCardBlob(ctx, width * 0.52, height * 0.95, width * 0.62, "rgba(234, 216, 175, 0.38)");

    ctx.fillStyle = "rgba(255, 252, 247, 0.72)";
    roundedRect(ctx, margin * 0.52, margin * 0.52, width - margin * 1.04, height - margin * 1.04, 46);
    ctx.fill();
    ctx.strokeStyle = "rgba(185, 151, 91, 0.28)";
    ctx.lineWidth = 2;
    ctx.stroke();

    let y = margin + (isStory ? 24 : 4);
    ctx.fillStyle = "#8f667b";
    ctx.font = "700 25px Inter, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("MESSAGE YOU NEED TODAY", margin, y);
    y += isStory ? 74 : 58;

    ctx.fillStyle = "#302733";
    ctx.font = `${isStory ? 78 : 58}px "Cormorant Garamond", Georgia, serif`;
    y = drawWrappedText(ctx, message.title, margin, y, contentWidth, isStory ? 82 : 62, isStory ? 2 : 2);
    y += isStory ? 30 : 18;

    ctx.fillStyle = style.accent;
    ctx.font = "700 24px Inter, sans-serif";
    ctx.fillText(`${profile.primaryTheme} with ${profile.secondaryTheme}`, margin, y);
    y += isStory ? 58 : 42;

    y = drawSection(ctx, "Today's Message", message.text, margin, y, contentWidth, {
      labelColor: "#b9975b",
      textColor: "#3c303f",
      size: isStory ? 31 : 22,
      line: isStory ? 43 : 30,
      maxLines: isStory ? 15 : 12,
    });

    y = drawSection(ctx, "A Compliment Just For You", compliment.text, margin, y, contentWidth, {
      labelColor: "#b9975b",
      textColor: "#5f5362",
      size: isStory ? 25 : 19,
      line: isStory ? 36 : 26,
      maxLines: isStory ? 5 : 4,
    });

    y = drawSection(ctx, "Today's Science", science.text, margin, y, contentWidth, {
      labelColor: "#b9975b",
      textColor: "#5f5362",
      size: isStory ? 24 : 18,
      line: isStory ? 34 : 24,
      maxLines: isStory ? 7 : 5,
    });

    y = drawSection(ctx, "Today's Reflection", prompt.text, margin, y, contentWidth, {
      labelColor: "#b9975b",
      textColor: "#3c303f",
      size: isStory ? 28 : 20,
      line: isStory ? 38 : 28,
      maxLines: isStory ? 3 : 3,
      extraTop: isStory ? 12 : 4,
    });

    ctx.fillStyle = "#8f667b";
    ctx.font = `700 ${isStory ? 25 : 19}px Inter, sans-serif`;
    ctx.fillText("messageyouneedtoday", margin, height - margin + (isStory ? 6 : 0));
  }

  function drawCardBlob(ctx, x, y, radius, color) {
    const gradient = ctx.createRadialGradient(x, y, radius * 0.05, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSection(ctx, label, text, x, y, maxWidth, options) {
    const top = y + (options.extraTop || 0);
    ctx.fillStyle = options.labelColor;
    ctx.font = "700 22px Inter, sans-serif";
    ctx.fillText(label.toUpperCase(), x, top);
    y = top + options.line;
    ctx.fillStyle = options.textColor;
    ctx.font = `${options.size}px Inter, sans-serif`;
    y = drawWrappedText(ctx, text, x, y, maxWidth, options.line, options.maxLines);
    return y + options.line * 0.78;
  }

  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
    const words = text.split(/\s+/);
    let line = "";
    let lines = 0;

    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines += 1;
        if (lines >= maxLines) {
          ctx.fillText(`${line.replace(/[.,;:]?$/, "")}...`, x, y);
          return y + lineHeight;
        }
        ctx.fillText(line, x, y);
        line = word;
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    if (line && lines < maxLines) {
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
    return y;
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  init();
})();
