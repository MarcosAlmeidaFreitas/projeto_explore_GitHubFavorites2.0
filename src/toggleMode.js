const buttonToggle = document.getElementById('toggleButton');
const spanToggle = document.querySelector('#spanToggleButton');
let lightMode = false;

buttonToggle.addEventListener('click', (event)=>{
  lightMode = !lightMode;
  
  if (lightMode) spanToggle.textContent = 'Ativar LightMode';
  else spanToggle.textContent = 'Ativar DarkMode';

  document.documentElement.classList.toggle('light');
});





