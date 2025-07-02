import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4174'); // Adjust URL as needed

  // --- 1. Acknowledgment-Popup ("I Agree") automatisch schließen ---
  try {
    await page.waitForSelector('button:has-text("I Agree")', { timeout: 5000 });
    await page.click('button:has-text("I Agree")');
    console.log('Acknowledgment popup closed ("I Agree" clicked)');
    await randomDelay(500, 1000);
  } catch (e) {
    console.log('No acknowledgment popup found');
  }

  // --- 2. Interests wirklich auswählen (und nicht überspringen) ---
  async function selectInterests(interests = []) {
    try {
      console.log('Looking for interest selection...');
      await randomDelay(1000, 2000);
      const allButtons = await page.$$('button, [role="button"]');
      let interestButtons = [];
      for (const btn of allButtons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.length > 1 && text.length < 30) {
          interestButtons.push(btn);
        }
      }
      if (interestButtons.length === 0) {
        console.warn('No interest buttons found');
        return false;
      }
      let selected = 0;
      for (let i = 0; i < interestButtons.length; i++) {
        const btn = interestButtons[i];
        const text = await page.evaluate(el => el.textContent, btn);
        if (
          interests.length === 0 ||
          interests.some(interest => text.toLowerCase().includes(interest.toLowerCase()))
        ) {
          await btn.click();
          console.log(`Selected interest: ${text.trim()}`);
          selected++;
          await randomDelay(500, 1000);
          if (selected >= (interests.length || 5)) break;
        }
      }
      console.log(`Selected ${selected} interests`);
      return true;
    } catch (error) {
      console.error('Error selecting interests:', error);
      return false;
    }
  }

  // Helper: random delay
  async function randomDelay(min, max) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Example usage:
  await selectInterests(["Techno", "House", "Electro"]); // Customize interests as needed

  // ...rest of your automation...

  await browser.close();
})(); 