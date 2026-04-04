export const questions = [

  // 🧠 IDENTITY AUTHENTICATION
  {
    stage: "identity",
    level: 1,
    type: "mcq",
    q: "What poker hand did James Bond win with in Montenegro?",
    options: ["Royal Flush","Straight Flush","Full House","Four of a Kind"],
    answer: "Straight Flush"
  },
  {
    stage: "identity",
    level: 2,
    type: "mcq",
    q: "What is James Bond’s favorite drink?",
    options: [
      "Vodka Martini — Shaken, not stirred",
      "Scotch Neat",
      "Old Fashioned",
      "Gin and Tonic"
    ],
    answer: "Vodka Martini — Shaken, not stirred"
  },
  {
    stage: "identity",
    level: 3,
    type: "mcq",
    q: "Name all of James Bond’s love interests.",
    options: [
      "Vesper Lynd, Tracy Bond, Madeleine Swann",
      "Domino, Tiffany Case, Natalya Simonova",
      "Honey Ryder, Kissy Suzuki, Wai Lin",
      "Solitaire, Natalya Simonova, Camille Montes"
    ],
    answer: "Vesper Lynd, Tracy Bond, Madeleine Swann"
  },

  // 🔒 SECURITY CLEARANCE
  {
    stage: "security",
    level: 1,
    type: "mcq",
    q: "What was the name of the horse that Arunan had?",
    options: ["Luna","Bella","Maya","Shadow"],
    answer: "Maya"
  },
  {
    stage: "security",
    level: 2,
    type: "mcq",
    q: "Arunan had a Grey 2023 BMW 330i. What was its name?",
    options: ["Frost","Cloud","Phantom","Glacier"],
    answer: "Cloud"
  },

  // 🧩 FINAL RECONSTRUCTION (SPECIAL TYPE)
  {
    stage: "security",
    level: 3,
    type: "cipher",
    q: "Reconstruct the classified transmission:",
    answerMask: "B___d M____ u_ r______ , l______ m____ u_ f_____ a__ f_____ i_ f______",
    answer: "blood makes us related, loyalty makes us family, and family is forever"
  }
];
