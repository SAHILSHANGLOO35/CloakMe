export function generateRandomUsername() {
    // Expanded lists of adjectives and nouns
    const adjectives = [
        "Happy",
        "Curious",
        "Mysterious",
        "Silent",
        "Wandering",
        "Hidden",
        "Brave",
        "Fearless",
        "Eager",
        "Swift",
        "Clever",
        "Lone",
        "Daring",
        "Charming",
        "Vivid",
        "Jolly",
        "Wild",
        "Fierce",
        "Cunning",
        "Radiant",
        "Noble",
        "Glowing",
    ];

    const nouns = [
        "Explorer",
        "Shadow",
        "Voyager",
        "Ghost",
        "Phoenix",
        "Enigma",
        "Ranger",
        "Knight",
        "Seeker",
        "Hunter",
        "Nomad",
        "Guardian",
        "Storm",
        "Maverick",
        "Sorcerer",
        "Warrior",
        "Legend",
        "Drifter",
        "Oracle",
        "Falcon",
        "Specter",
        "Sage",
    ];

    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number

    // Pick random elements
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    // Combine to form username
    return `${adjective}${noun}${randomNum}`;
}
