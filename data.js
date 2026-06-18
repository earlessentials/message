window.ReflectionData = (() => {
  const THEMES = [
    "Healing",
    "Purpose",
    "Relationships",
    "Identity",
    "Growth",
    "Rest",
    "Creativity",
    "Courage",
    "Self-trust",
    "New beginnings",
    "Presence",
    "Hope",
  ];

  const THEME_STYLE = {
    Healing: { palette: "healing", icon: "H", accent: "#c77c88" },
    Purpose: { palette: "purpose", icon: "P", accent: "#b9975b" },
    Relationships: { palette: "healing", icon: "R", accent: "#b97889" },
    Identity: { palette: "purpose", icon: "I", accent: "#8f667b" },
    Growth: { palette: "hope", icon: "G", accent: "#ba8e67" },
    Rest: { palette: "rest", icon: "R", accent: "#7c7898" },
    Creativity: { palette: "hope", icon: "C", accent: "#b8879a" },
    Courage: { palette: "purpose", icon: "C", accent: "#a96770" },
    "Self-trust": { palette: "rest", icon: "S", accent: "#84648a" },
    "New beginnings": { palette: "hope", icon: "N", accent: "#c09a61" },
    Presence: { palette: "rest", icon: "P", accent: "#788096" },
    Hope: { palette: "hope", icon: "H", accent: "#be8971" },
  };

  const QUESTION_FLOW = [
    {
      id: "heart",
      eyebrow: "Question One",
      question: "What feels most present in your heart today?",
      choices: [
        ["Love", { Relationships: 5, Hope: 2, Presence: 1 }],
        ["Healing", { Healing: 5, Rest: 2, "Self-trust": 1 }],
        ["Purpose", { Purpose: 5, Growth: 2, Creativity: 1 }],
        ["Direction", { Purpose: 4, "New beginnings": 3, "Self-trust": 1 }],
        ["Change", { Growth: 4, "New beginnings": 4, Courage: 1 }],
        ["Self-worth", { Identity: 4, "Self-trust": 4, Healing: 1 }],
        ["Peace", { Rest: 4, Presence: 4, Healing: 1 }],
        ["Courage", { Courage: 5, Growth: 2, Purpose: 1 }],
        ["Uncertainty", { "Self-trust": 4, Hope: 3, Presence: 1 }],
        ["Connection", { Relationships: 5, Presence: 2, Healing: 1 }],
      ].map(([label, weights]) => ({ label, weights })),
    },
    {
      id: "energy",
      eyebrow: "Question Two",
      question: "What kind of energy are you hoping to experience today?",
      choices: [
        ["Clarity", { Purpose: 3, "Self-trust": 3, Presence: 2 }],
        ["Comfort", { Healing: 4, Rest: 4, Hope: 1 }],
        ["Confidence", { Courage: 4, Identity: 3, Purpose: 1 }],
        ["Joy", { Hope: 4, Creativity: 3, Relationships: 1 }],
        ["Trust", { "Self-trust": 4, Relationships: 2, Hope: 2 }],
        ["Hope", { Hope: 5, "New beginnings": 2, Healing: 1 }],
        ["Stillness", { Rest: 5, Presence: 3, Healing: 1 }],
        ["Focus", { Purpose: 4, Presence: 2, Growth: 2 }],
        ["Freedom", { Growth: 3, Creativity: 3, Identity: 2 }],
        ["Renewal", { "New beginnings": 4, Healing: 2, Hope: 2 }],
      ].map(([label, weights]) => ({ label, weights })),
    },
    {
      id: "sentence",
      eyebrow: "Question Three",
      question: "Choose the sentence that feels closest to you today.",
      choices: [
        ["I am learning to trust myself.", { "Self-trust": 5, Identity: 2, Courage: 1 }],
        ["I am creating space for something new.", { "New beginnings": 5, Growth: 2, Rest: 1 }],
        ["I want to move forward gently.", { Healing: 3, Purpose: 3, Rest: 2 }],
        ["I want more clarity.", { Purpose: 4, Presence: 2, "Self-trust": 2 }],
        ["I am embracing change.", { Growth: 4, "New beginnings": 3, Courage: 1 }],
        ["I want deeper connection.", { Relationships: 5, Healing: 1, Presence: 1 }],
        ["I want to feel peaceful.", { Rest: 4, Presence: 3, Healing: 1 }],
        ["I am becoming more myself.", { Identity: 5, Creativity: 1, "Self-trust": 2 }],
        ["I want to slow down.", { Rest: 5, Presence: 2, Healing: 1 }],
        ["I want to feel grounded.", { Presence: 4, "Self-trust": 3, Rest: 2 }],
      ].map(([label, weights]) => ({ label, weights })),
    },
  ];

  const themeCopy = {
    Healing: ["repair", "tender accuracy", "what has been asking for care"],
    Purpose: ["direction", "quiet alignment", "the next useful step"],
    Relationships: ["connection", "specific warmth", "the bond that wants presence"],
    Identity: ["self-recognition", "honest voice", "the life that feels genuinely yours"],
    Growth: ["growth", "wider response", "the pattern becoming more spacious"],
    Rest: ["rest", "regulated quiet", "the wisdom of enough"],
    Creativity: ["creativity", "curious attention", "the spark asking for room"],
    Courage: ["courage", "values in motion", "the truth becoming visible"],
    "Self-trust": ["self-trust", "inner evidence", "the promise you can keep"],
    "New beginnings": ["renewal", "fresh permission", "the open space ahead"],
    Presence: ["presence", "sensory clarity", "the moment becoming vivid"],
    Hope: ["hope", "believable possibility", "the light with practical edges"],
  };

  const titleWords = [
    "Quiet Repair", "The Soft Place", "A Gentle Rhythm", "Tender Accuracy", "The Useful Spark", "A Devoted Hour",
    "The Golden Thread", "Quiet Ambition", "Warm Attention", "The Better Listening", "A Softer Door",
    "Room For The Real", "Your Own Voice", "The Inner Signature", "A More Honest Mirror", "Permission To Prefer",
    "The Wider Response", "The Edge Of Capacity", "The Practice Of Returning", "More Room Inside", "The Art Of Pausing",
    "The Full Cup", "Quiet As A Resource", "The Intelligence Of Enough", "The Small Spark", "A Beautiful Question",
    "The Room To Wander", "Making As Listening", "The Honest Step", "Tender Bravery", "The Threshold", "Values In Motion",
    "A Promise You Can Keep", "The First Signal", "Private Reassurance", "Inner Consent", "The Open Space", "A First Page",
    "The Doorway Of Relief", "The First Gentle Yes", "The Vivid Minute", "Here With Yourself", "The Ordinary Gold",
    "A Slower Seeing", "A Believable Light", "The Next Good Hour", "A Reason To Look Up", "Small Beautiful Proof",
  ];

  const openings = [
    "Your answers point toward a part of you that wants to be met with more precision and less hurry.",
    "Something in your inner life seems ready for language that feels clear, warm, and usable.",
    "The pattern you chose suggests a quiet wish to feel more organized inside your own experience.",
    "There is a thoughtful intelligence in the way your attention is gathering around this theme today.",
  ];
  const practices = [
    "Choose one small action that gives this theme a place in the real day, then let the action be simple enough to complete.",
    "Let one sentence become a container for what you feel, and let one practical gesture make that sentence visible.",
    "Offer your attention a narrow doorway: one message, one pause, one honest decision, one minute of complete presence.",
    "Give this part of your life a gentle structure, because structure can make tenderness easier to trust.",
  ];
  const closings = [
    "A day can change texture through one exact response made with care.",
    "The smallest sincere movement can become evidence that something in you is listening.",
    "This is how inner shifts become livable: they enter the ordinary and begin to change its atmosphere.",
    "Let the quietness of this be enough to matter.",
  ];

  const MESSAGE_LIBRARY = Array.from({ length: 88 }, (_, index) => {
    const theme = THEMES[index % THEMES.length];
    const [noun, quality, focus] = themeCopy[theme];
    const title = titleWords[index % titleWords.length];
    const text = `${openings[index % openings.length]} Today is carrying the language of ${noun}, which often begins as a subtle change in attention before it becomes a decision. ${quality} gives the mind a steadier way to approach ${focus}, allowing emotion to become information rather than noise. You may notice this theme in a repeated thought, a bodily signal, a conversation you keep rehearsing, or a wish that keeps returning with softness. ${practices[index % practices.length]} Let this be a day of exact, generous noticing, where the smallest response made with care is allowed to count as part of your becoming and as proof that inner shifts can live inside ordinary minutes. ${closings[index % closings.length]}`;
    return { id: `message-${index + 1}`, theme, themes: [theme], title, text };
  });

  const scienceConcepts = [
    ["Affect labeling", "Putting feelings into words can reduce emotional intensity by recruiting prefrontal regulation and making the feeling more organized.", "Lieberman et al. (2007)", ["Healing", "Presence", "Self-trust"]],
    ["Attentional prioritization", "The mind gives extra space to unresolved or emotionally charged material so it can receive understanding or action.", "Anderson (2005)", ["Purpose", "Healing", "Identity"]],
    ["Memory reconsolidation", "A recalled memory can briefly become flexible before it is stored again, which allows new emotional information to matter.", "Nader et al. (2000)", ["Healing", "Growth", "Hope"]],
    ["Neuroplasticity", "Repeated attention and behavior can strengthen neural pathways, making small patterns biologically meaningful over time.", "Draganski et al. (2004)", ["Growth", "Self-trust", "New beginnings"]],
    ["Cognitive reappraisal", "Changing the meaning assigned to a situation can support healthier emotion regulation and more flexible choice.", "Ochsner & Gross (2005)", ["Growth", "Courage", "Presence"]],
    ["Self-distancing", "Taking a wider perspective on your own experience can reduce emotional flooding and support clearer problem solving.", "Kross et al. (2014)", ["Self-trust", "Healing", "Courage"]],
    ["Implementation intentions", "Linking a cue with an action helps goals become behavior by reducing the decisions required in the moment.", "Gollwitzer (1999)", ["Purpose", "Self-trust", "New beginnings"]],
    ["Growth mindset", "Interpreting ability as developable can change persistence, feedback use, and the emotional meaning of effort.", "Dweck (2006)", ["Growth", "Courage", "Hope"]],
    ["Default mode network", "Reflective thought, memory, imagination, and self-relevant meaning often involve the brain's default mode network.", "Raichle et al. (2001)", ["Rest", "Identity", "Presence"]],
    ["Interoception", "Internal body signals such as breath, heartbeat, and tension influence emotion, judgment, and the felt sense of meaning.", "Craig (2002)", ["Presence", "Self-trust", "Healing"]],
    ["Predictive processing", "The brain uses past experience to predict the present, then updates when new information is clear enough.", "Friston (2010)", ["Growth", "New beginnings", "Presence"]],
    ["Broaden-and-build", "Positive emotions can broaden attention and help people build resources such as connection, flexibility, and curiosity.", "Fredrickson (2001)", ["Hope", "Creativity", "Relationships"]],
    ["Secure base behavior", "People explore more freely when they feel emotionally supported by a secure base.", "Bowlby (1969)", ["Relationships", "Courage", "New beginnings"]],
    ["Active constructive responding", "Engaged responses to another person's good news can strengthen relationship satisfaction and shared positive emotion.", "Gable et al. (2004)", ["Relationships", "Hope", "Presence"]],
    ["Social baseline theory", "Trusted connection can reduce the load the brain believes it is carrying.", "Coan & Sbarra (2015)", ["Relationships", "Healing", "Rest"]],
    ["Sleep and memory", "Sleep supports memory consolidation and emotional processing, which can make a concern feel different by morning.", "Walker & Stickgold (2004)", ["Rest", "Healing", "Growth"]],
    ["Allostatic load", "Stress systems need cycles of activation and restoration; repeated strain without recovery creates biological cost.", "McEwen (1998)", ["Rest", "Healing", "Presence"]],
    ["Habit loops", "Habits often follow cue, routine, and reward patterns, which means awareness of the cue can open a new response.", "Wood & Neal (2007)", ["Growth", "Purpose", "Self-trust"]],
    ["Reward prediction error", "Dopamine systems update learning when outcomes are better or different than expected.", "Schultz et al. (1997)", ["Hope", "New beginnings", "Creativity"]],
    ["Information gap", "Curiosity grows when the mind senses a gap between what it knows and what it wants to know.", "Loewenstein (1994)", ["Creativity", "Purpose", "Hope"]],
    ["Spacing effect", "Learning improves when practice is spaced over time, making repeated small returns powerful.", "Ebbinghaus (1885)", ["Growth", "Self-trust", "Purpose"]],
    ["Retrieval practice", "Actively recalling information strengthens memory more than passive rereading.", "Roediger & Karpicke (2006)", ["Purpose", "Growth", "Identity"]],
    ["Working memory", "Writing concerns down can reduce working-memory load and make clarity easier to access.", "Baddeley & Hitch (1974)", ["Purpose", "Rest", "Presence"]],
    ["Cognitive load", "Clear structure reduces mental effort, which is why a simple next step can calm complexity.", "Sweller (1988)", ["Purpose", "Healing", "Self-trust"]],
    ["Attention networks", "Focus depends on alerting, orienting, and executive systems that can be supported by environment.", "Posner & Petersen (1990)", ["Presence", "Purpose", "Rest"]],
    ["Mindfulness training", "Returning attention to an anchor trains regulation by making the return itself the practice.", "Tang et al. (2007)", ["Presence", "Rest", "Healing"]],
    ["Expressive writing", "Writing can help organize emotion into meaning when the page becomes a place for language and feeling to meet.", "Pennebaker & Chung (2011)", ["Healing", "Identity", "Presence"]],
    ["Self-compassion", "Kindness, common humanity, and mindful awareness can make learning feel safer and more sustainable.", "Neff (2003)", ["Healing", "Self-trust", "Growth"]],
    ["Self-determination", "Autonomy, competence, and relatedness support motivation because they make effort feel personally meaningful.", "Deci & Ryan (2000)", ["Purpose", "Identity", "Relationships"]],
    ["Flow states", "Flow appears when challenge and skill meet in a balanced way, making attention feel absorbed and rewarding.", "Csikszentmihalyi (1990)", ["Creativity", "Purpose", "Growth"]],
    ["Divergent thinking", "Generating multiple possibilities helps the mind loosen habit and form fresh associations.", "Guilford (1950)", ["Creativity", "New beginnings", "Hope"]],
    ["Emotion granularity", "Precisely naming feelings can improve regulation because the response can fit the actual state.", "Barrett et al. (2001)", ["Healing", "Identity", "Presence"]],
    ["Values affirmation", "Reflecting on personal values can buffer stress by giving the mind a larger frame than the immediate threat.", "Cohen & Sherman (2014)", ["Courage", "Identity", "Purpose"]],
    ["Mental contrasting", "Pairing a desired future with a present obstacle can clarify realistic action.", "Oettingen (2012)", ["Purpose", "Hope", "New beginnings"]],
    ["Choice overload", "Reducing too many options can restore agency because the mind can compare what truly matters.", "Iyengar & Lepper (2000)", ["Purpose", "Rest", "Self-trust"]],
    ["Loss aversion", "Potential losses can feel heavier than similar gains, which can make change seem larger than it is.", "Kahneman & Tversky (1979)", ["Courage", "New beginnings", "Growth"]],
    ["Anchoring", "Initial labels can shape later judgment, including old labels a person carries about themselves.", "Tversky & Kahneman (1974)", ["Identity", "Growth", "Self-trust"]],
    ["Confirmation bias", "The mind tends to notice evidence for existing beliefs, so new evidence must be allowed to register.", "Nickerson (1998)", ["Identity", "Hope", "Growth"]],
    ["Prospection", "Imagining possible futures supports planning because the brain can simulate outcomes before acting.", "Seligman et al. (2013)", ["Hope", "Purpose", "New beginnings"]],
    ["Heart-rate variability", "Flexible body-brain regulation is associated with more adaptive emotional responding.", "Thayer & Lane (2000)", ["Rest", "Presence", "Courage"]],
  ];
  const scienceFrames = [
    (c, t) => `${c[1]} For today's theme of ${t.toLowerCase()}, this matters because your reflection is helping attention become organized enough to use. The concept gives language to a human pattern without claiming certainty about your inner life. Citation: ${c[2]}.`,
    (c, t) => `${c[1]} This connects with ${t.toLowerCase()} because small shifts in attention can change what the mind treats as available. A reflection works best when it makes experience more nameable and less vague. Citation: ${c[2]}.`,
    (c, t) => `${c[1]} In practical terms, the science supports one gentle idea: clarity often begins when the mind can place a feeling inside a usable frame. Today's message offers that kind of frame. Citation: ${c[2]}.`,
  ];
  const SCIENCE_LIBRARY = scienceConcepts.flatMap((concept, i) =>
    scienceFrames.map((frame, j) => ({ id: `science-${i + 1}-${j + 1}`, topic: concept[0], themes: concept[3], citation: concept[2], text: frame(concept, concept[3][j % concept[3].length]) }))
  );

  const qualities = [
    ["honesty", ["Healing", "Identity"], "Honest self-observation gives growth a place to begin without turning it into self-criticism."],
    ["discernment", ["Purpose", "Self-trust"], "Discernment helps a person choose with care when many directions ask for attention."],
    ["tender patience", ["Healing", "Rest"], "Tender patience creates the conditions where complicated feelings can become understandable."],
    ["curiosity", ["Creativity", "Hope"], "Curiosity keeps the mind available to wonder, learning, and possibilities that have not fully formed."],
    ["inner steadiness", ["Presence", "Self-trust"], "Inner steadiness allows a person to stay close to truth without being consumed by urgency."],
    ["emotional precision", ["Healing", "Presence"], "Emotional precision turns vague heaviness into information that can be cared for wisely."],
    ["openness", ["New beginnings", "Relationships"], "Openness lets life keep speaking when certainty has grown too tight."],
    ["care", ["Relationships", "Rest"], "Care is visible in the way attention becomes gentle, specific, and generous."],
    ["quiet bravery", ["Courage", "Growth"], "Quiet bravery moves through honest choices that may never need applause to matter."],
    ["self-respect", ["Identity", "Self-trust"], "Self-respect gives your needs a legitimate place inside decisions and relationships."],
    ["attentiveness", ["Presence", "Relationships"], "Attentiveness notices the subtle details that often carry the deepest meaning."],
    ["generosity of spirit", ["Relationships", "Hope"], "Generosity of spirit creates warmth while preserving the importance of your own boundaries."],
    ["creative perception", ["Creativity", "Growth"], "Creative perception sees a second layer in ordinary moments and turns it into insight."],
    ["devotion", ["Purpose", "Relationships"], "Devotion reveals what you are willing to return to with care, time, and attention."],
    ["humility", ["Growth", "Healing"], "Humility makes learning possible because it keeps curiosity available."],
    ["hopefulness", ["Hope", "New beginnings"], "Hopefulness keeps one believable door open."],
    ["thoughtfulness", ["Relationships", "Purpose"], "Thoughtfulness gives your choices tenderness and intelligent timing."],
    ["reflective depth", ["Identity", "Presence"], "Reflective depth allows a person to understand patterns rather than simply react to them."],
    ["gentle focus", ["Purpose", "Rest"], "Gentle focus keeps attention connected to meaning without making the day feel harsh."],
    ["adaptive wisdom", ["Growth", "Courage"], "Adaptive wisdom helps you meet changing circumstances with flexibility and dignity."],
    ["relational sensitivity", ["Relationships", "Healing"], "Relational sensitivity notices what people feel beneath what they manage to say."],
    ["grounded imagination", ["Creativity", "Presence"], "Grounded imagination lets possibility stay connected to real life."],
    ["moral clarity", ["Courage", "Purpose"], "Moral clarity helps a person act from values when the next step feels vulnerable."],
    ["emotional courage", ["Courage", "Healing"], "Emotional courage is the willingness to stay close to what is real with care."],
    ["spacious awareness", ["Rest", "Presence"], "Spacious awareness gives your inner world enough room to settle and speak."],
    ["renewing energy", ["New beginnings", "Hope"], "Renewing energy senses when life is asking for a new rhythm."],
    ["compassionate clarity", ["Healing", "Purpose"], "Compassionate clarity allows truth and kindness to support each other."],
    ["sincere presence", ["Presence", "Relationships"], "Sincere presence makes others feel met without requiring performance."],
    ["quiet self-loyalty", ["Self-trust", "Identity"], "Quiet self-loyalty turns private awareness into choices that honor your life."],
    ["meaningful restraint", ["Rest", "Courage"], "Meaningful restraint protects energy for what deserves your best attention."],
    ["wise sensitivity", ["Healing", "Relationships"], "Wise sensitivity can read nuance while still seeking steadiness."],
    ["future tenderness", ["Hope", "Purpose"], "Future tenderness lets you imagine tomorrow with responsibility and warmth."],
  ];
  const complimentFrames = [
    (q) => `I admire the ${q[0]} reflected in your answers. ${q[2]}`,
    (q) => `Your responses carry the mark of ${q[0]}. ${q[2]}`,
    (q) => `There is thoughtful ${q[0]} in the way you approached these questions. ${q[2]}`,
    (q) => `The pattern in your answers suggests ${q[0]}. ${q[2]}`,
    (q) => `I notice ${q[0]} in what you chose today. ${q[2]}`,
    (q) => `Your answers point toward ${q[0]}, which is a meaningful quality. ${q[2]}`,
    (q) => `There is something quietly beautiful about your ${q[0]}. ${q[2]}`,
    (q) => `The way you answered feels connected to ${q[0]}. ${q[2]}`,
  ];
  const COMPLIMENT_LIBRARY = qualities.flatMap((quality, i) =>
    complimentFrames.map((frame, j) => ({ id: `compliment-${i + 1}-${j + 1}`, themes: quality[1], text: frame(quality) }))
  );

  const promptFrames = [
    "What part of {focus} is asking for more {quality} today?",
    "Where could {focus} become a little more honest before tonight?",
    "What would change if you gave {focus} ten minutes of undivided attention?",
    "What is one small boundary that would protect {focus}?",
    "What truth about {focus} feels ready to be written plainly?",
    "How might {focus} feel if you approached it with {quality}?",
    "What conversation could make {focus} feel less vague?",
    "What tiny action would give {focus} more shape?",
    "Where has {focus} been waiting for permission to matter?",
    "What would make {focus} feel more spacious this afternoon?",
    "What evidence do you have that {focus} is already changing?",
    "What does your body know about {focus} before your mind explains it?",
    "What would a kinder rhythm around {focus} look like?",
    "What do you want to remember about {focus} at the end of today?",
    "What is one beautiful question you can ask about {focus}?",
  ];
  const promptFoci = [
    ["your heart", ["Healing", "Relationships"]], ["your next step", ["Purpose", "New beginnings"]],
    ["your sense of self", ["Identity", "Self-trust"]], ["your energy", ["Rest", "Presence"]],
    ["your relationships", ["Relationships", "Healing"]], ["your courage", ["Courage", "Growth"]],
    ["your hope", ["Hope", "New beginnings"]], ["your creativity", ["Creativity", "Purpose"]],
    ["your inner pace", ["Rest", "Presence"]], ["your becoming", ["Growth", "Identity"]],
  ];
  const promptQualities = ["gentleness", "clarity", "patience", "attention", "warmth", "space", "trust", "curiosity", "honesty", "steadiness"];
  const PROMPT_LIBRARY = promptFrames.flatMap((frame, i) =>
    promptFoci.map((focus, j) => ({ id: `prompt-${i + 1}-${j + 1}`, themes: focus[1], text: frame.replaceAll("{focus}", focus[0]).replace("{quality}", promptQualities[(i + j) % promptQualities.length]) }))
  );

  const factBank = [
    "Octopuses can change color and texture in fractions of a second.",
    "Some octopuses show sleep color shifts that researchers compare with dreaming.",
    "Trees can exchange chemical signals through mycorrhizal fungal networks.",
    "The gut has its own enteric nervous system with millions of neurons.",
    "People often synchronize walking pace when they feel connected.",
    "Music can influence breathing rate and heartbeat patterns.",
    "Yawning may help regulate brain temperature and alertness.",
    "Remembering can briefly make a memory flexible before it is stored again.",
    "Honey can remain edible for extremely long periods when sealed and dry.",
    "Bananas are botanical berries, while strawberries are aggregate fruits.",
    "A large cumulus cloud can weigh hundreds of thousands of kilograms.",
    "The human brain uses about 20 percent of the body's resting energy.",
    "The scent after rain is partly caused by a compound called geosmin.",
    "Some butterflies can taste with receptors on their feet.",
    "A day on Venus is longer than a year on Venus.",
    "The moon is slowly moving away from Earth by a few centimeters each year.",
    "Human bones can be stronger than steel by weight.",
    "The cornea has no blood vessels and receives oxygen from the air.",
    "Tears have different chemical compositions depending on why they are produced.",
    "Snowflakes usually have six-sided symmetry because of water molecule structure.",
    "Lightning can heat surrounding air hotter than the surface of the sun.",
    "Mushrooms are more closely related to animals than to plants.",
    "Crows can remember human faces for years.",
    "Dolphins have signature whistles that function like individual names.",
    "Bees can communicate food locations through a waggle dance.",
    "Pineapples are made of many fused berries.",
    "Coffee beans are seeds from coffee cherries.",
    "Chocolate comes from fermented cacao seeds.",
    "Popcorn pops because water inside the kernel turns to steam.",
    "Mint feels cool because menthol activates cold-sensitive receptors.",
    "Babies can recognize their mother's voice before birth.",
    "Sleep helps the brain consolidate emotional experiences.",
    "Morning light helps calibrate the body's internal clock.",
    "Curiosity activates reward-related brain systems.",
    "Novelty can make memories feel more vivid.",
    "The brain often predicts what it will perceive before sensory input arrives.",
    "Rainbows are full circles, though the ground usually hides the lower half.",
    "Sound travels faster in water than in air.",
    "Bioluminescence is common in the deep ocean.",
    "Ice floats because solid water is less dense than liquid water.",
    "Glaciers can preserve ancient air bubbles.",
    "Earthquakes can make the whole planet ring like a bell.",
    "Migrating birds can use Earth's magnetic field for navigation.",
    "Some frogs can survive freezing with natural antifreeze compounds.",
    "Tardigrades can survive extreme conditions by entering a dormant state.",
    "Microbes in the ocean produce much of Earth's oxygen through photosynthesis.",
    "Tree rings can record climate conditions from past years.",
    "Vanilla comes from the seed pods of an orchid.",
    "Saffron is made from the stigmas of crocus flowers.",
    "Velcro was inspired by burrs sticking to fabric and fur.",
    "GPS requires relativistic corrections to stay accurate.",
    "QR codes can still work when partly damaged because of error correction.",
    "A prism separates white light because colors bend by different amounts.",
    "A piano has more than two hundred strings.",
    "Sourdough flavor comes from yeasts and lactic acid bacteria working together.",
    "The smell of old books comes from compounds released as paper ages.",
    "Your fingerprints begin forming before birth.",
    "The smallest bones in the human body are in the middle ear.",
    "Language can influence how quickly people distinguish certain colors.",
    "A meaningful compliment can activate social reward pathways.",
    "The sky looks blue because shorter blue wavelengths scatter more in air.",
  ];
  const curiosityTails = ["That tiny detail makes the ordinary world feel newly alive.", "It is a small reminder that reality keeps hidden texture close by.", "A fact like this can make attention feel a little brighter."];
  const CURIOSITY_FACTS = Array.from({ length: 180 }, (_, index) => ({
    id: `curiosity-${index + 1}`,
    text: index < factBank.length ? factBank[index] : `${factBank[index % factBank.length]} ${curiosityTails[Math.floor(index / factBank.length) % curiosityTails.length]}`,
    themes: [THEMES[index % THEMES.length], THEMES[(index + 5) % THEMES.length]],
  }));

  return {
    THEMES,
    THEME_STYLE,
    QUESTION_FLOW,
    MESSAGE_LIBRARY,
    SCIENCE_LIBRARY,
    COMPLIMENT_LIBRARY,
    PROMPT_LIBRARY,
    CURIOSITY_FACTS,
  };
})();
