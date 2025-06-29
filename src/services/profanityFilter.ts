// Simple profanity filter - in production, use a more comprehensive service
const profanityWords = [
  'badword1', 'badword2', 'inappropriate', 'offensive'
  // Add more words as needed
];

export class ProfanityFilter {
  static filter(text: string): { clean: string; hasProfanity: boolean } {
    let cleanText = text;
    let hasProfanity = false;

    profanityWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      if (regex.test(cleanText)) {
        hasProfanity = true;
        cleanText = cleanText.replace(regex, '*'.repeat(word.length));
      }
    });

    return { clean: cleanText, hasProfanity };
  }

  static containsProfanity(text: string): boolean {
    return profanityWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
  }
}