import './styles.css';
document.addEventListener("DOMContentLoaded", function () {
  const preTitle = document.getElementById("pretitle");
  const maintitle = document.getElementById("maintitle");
  const gameSelector = document.getElementById("gameselector");
  const nextButton = document.getElementById('nextButton');
  const questionsContainer = document.getElementById('questions');
  const section = document.createElement('section');
  const heading = document.createElement('h2');

  const sheets = {
    'Just Met': 'JustMet',
    'Friends': 'OnlyFriends',
    'Lovers': 'Lovers'
  };

  let currentQuestions = [];
  let currentIndex = 0;

  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.API_KEY;

  const fetchSheetData = async (sheetName) => {
    const range = `${sheetName}!A:A`;
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();
    currentQuestions = data.values.slice(1); // Exclude header row
    shuffleArray(currentQuestions); 
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  maintitle.addEventListener("click", function () {
    preTitle.classList.add("move-up");
    maintitle.classList.add("move-up");
    gameSelector.classList.toggle("show");
  });

  const handleBackButtonClick = () => {
    section.style.display = 'none'; 
    heading.style.display = 'none';
    gameSelector.style.display = 'flex'; 
    gameSelector.classList.remove("move-up"); 
    nextButton.style.display = 'none'; 
  };

  const displayNextQuestion = () => {
    if (currentQuestions.length === 0) {
      alert('No more questions available.');
      handleBackButtonClick();
      return;
    }

    const question = currentQuestions.pop()[0]; 
    section.innerHTML = ''; 
    heading.textContent = 'Question';
    section.appendChild(heading);

    section.style.display = 'block';
    heading.style.display = 'block';

    const paragraph = document.createElement('p');
    paragraph.classList.add('fade-in'); 
    paragraph.textContent = question;
    section.appendChild(paragraph);

    questionsContainer.appendChild(section);

    heading.addEventListener('click', () => {
      handleBackButtonClick();
    });

    currentIndex++;
  };
  
  const handleGameModeClick = async (category) => {
    await fetchSheetData(sheets[category]);
    gameSelector.style.display = 'none'; 
    gameSelector.classList.add("move-up"); 
    nextButton.style.display = 'block'; 
    displayNextQuestion(); 
  };

  document.querySelectorAll('#gameselector button').forEach(button => {
    button.addEventListener('click', () => {
      handleGameModeClick(button.textContent);
    });
  });

  nextButton.addEventListener('click', displayNextQuestion);
});
