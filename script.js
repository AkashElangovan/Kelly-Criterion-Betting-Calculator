document.addEventListener('DOMContentLoaded', () => {
  const accountSizeInput = document.getElementById('accountSize');
  const oddsInput = document.getElementById('odds');
  const weightInput = document.getElementById('weight'); // Added weight input
  const calculateButton = document.getElementById('calculate');
  const probabilityElement = document.getElementById('probability');
  const kellyAmountElement = document.getElementById('kellyAmount');
  const percent10Element = document.getElementById('percent10');
  const percent25Element = document.getElementById('percent25');
  const percent50Element = document.getElementById('percent50');
  const percent75Element = document.getElementById('percent75');
  const copyMessage = document.getElementById('copyMessage');

  // Load saved account size
  chrome.storage.local.get(['accountSize'], (result) => {
    if (result.accountSize) {
      accountSizeInput.value = result.accountSize;
    }
  });

  // Save account size on change
  accountSizeInput.addEventListener('change', () => {
    const accountSize = parseFloat(accountSizeInput.value);
    if (!isNaN(accountSize) && accountSize > 0) {
      chrome.storage.local.set({ accountSize });
    }
  });

  // Calculate Kelly based on the input values
  calculateButton.addEventListener('click', calculateKelly);

  // Copy results to clipboard
  kellyAmountElement.addEventListener('click', () => copyToClipboard(kellyAmountElement.textContent));
  percent10Element.addEventListener('click', () => copyToClipboard(percent10Element.textContent.split(': ')[1]));
  percent25Element.addEventListener('click', () => copyToClipboard(percent25Element.textContent.split(': ')[1]));
  percent50Element.addEventListener('click', () => copyToClipboard(percent50Element.textContent.split(': ')[1]));
  percent75Element.addEventListener('click', () => copyToClipboard(percent75Element.textContent.split(': ')[1]));

  function estimatedWeightedFairOdds(p, bookmakerOdds, weight) {
    return weight * (1 / bookmakerOdds) + (1 - weight) * (100 / p);
  }

  function adjustedWeightedKellyCriterion(p, bookmakerOdds, bankroll, weight) {
    const fairOdds = estimatedWeightedFairOdds(p, bookmakerOdds, weight);
    const q = 1 - p / 100;
    const kellyFraction = (fairOdds * p / 100 - q) / fairOdds;
    const riskAmount = Math.max(0, kellyFraction) * bankroll;
    return [kellyFraction, riskAmount];
  }

  function calculateKelly() {
    const bankroll = parseFloat(accountSizeInput.value);
    const odds = parseFloat(oddsInput.value);
    const p = 60.0; // perceived probability in %
    const weight = parseFloat(weightInput.value) || 0.37; // Get weight value from the input, default is 0.37

    if (isNaN(bankroll) || bankroll <= 0) {
      alert('Please enter a valid bankroll.');
      return;
    }

    if (isNaN(odds) || odds <= 1) {
      alert('Please enter valid odds.');
      return;
    }

    const impliedProbability = (1 / odds) * 100;
    probabilityElement.textContent = impliedProbability.toFixed(2) + '%';

    const [kellyFraction, riskAmount] = adjustedWeightedKellyCriterion(p, odds, bankroll, weight);
    const cappedKelly = Math.min(kellyFraction, 0.25);
    const cappedAmount = cappedKelly * bankroll;

    kellyAmountElement.textContent = `$${cappedAmount.toFixed(2)}`;
    percent10Element.textContent = `10%: $${(0.1 * cappedAmount).toFixed(2)}`;
    percent25Element.textContent = `25%: $${(0.25 * cappedAmount).toFixed(2)}`;
    percent50Element.textContent = `50%: $${(0.5 * cappedAmount).toFixed(2)}`;
    percent75Element.textContent = `75%: $${(0.75 * cappedAmount).toFixed(2)}`;
  }

  function copyToClipboard(text) {
    const cleanText = text.replace('$', '').trim();
    navigator.clipboard.writeText(cleanText).then(() => {
      showCopyMessage();
    }).catch(err => console.error('Copy failed:', err));
  }

  function showCopyMessage() {
    copyMessage.classList.add('show');
    setTimeout(() => copyMessage.classList.remove('show'), 2000);
  }
});
