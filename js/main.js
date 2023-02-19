const openLoginBtn = document.getElementById('open-login-btn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-btn');
const input = document.getElementById('input');
const loginBtn = document.getElementById('log-in');
const greeting = document.getElementById('greeting');
const textBlock = document.getElementById('text-block');
const contentPage = document.getElementById('content-page');
const burgerBtn = document.getElementById('burger-btn');
const header = document.getElementById('header');
let loggedIn = false;
let menuOpen = false;

// check if there is an Array in local storage, otherwise create one
let nameArray;
let retrievedData = localStorage.getItem("nameArray");

if(retrievedData){
  nameArray = JSON.parse(retrievedData);
} else{
  nameArray = [];
  localStorage.setItem("nameArray", JSON.stringify(nameArray));
}

// Open/close menu in mobile view
burgerBtn.addEventListener('click', () => {
  if (!menuOpen) {
    burgerBtn.classList.add('open');
    header.classList.add('show-menu');
    menuOpen = true;
  } else {
    burgerBtn.classList.remove('open');
    header.classList.remove('show-menu');
    menuOpen = false;
  }
})

// Opens the log-in popup and changes button text between 'logga in' and 'logga ut'
openLoginBtn.addEventListener('click', () => {
  if (loggedIn){
    greeting.innerHTML = ``;
    openLoginBtn.innerHTML=`logga in`;
    popup.classList.add('hidden');
    popup.classList.add('visually-hidden');
    loggedIn = false;
  } else{
    popup.classList.remove('hidden');
    setTimeout(() => {
      popup.classList.remove('visually-hidden');
      textBlock.style.display="none";
    }, 20);
  }
})

// enable button when someting is written in input
input.addEventListener('change', () => {
  if (input.value === ""){
    loginBtn.disabled = true;
  } else{
    loginBtn.disabled = false;
  }
})

// Closes the popup when clicking the close-button
closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  popup.classList.add('visually-hidden');
  textBlock.style.display = "block";
  input.value = "";
})

// closing popup and displaying a greeting to the user, greeting depends on if
// the user has been logged in before
loginBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  popup.classList.add('visually-hidden');
  textBlock.style.display='block';
  openLoginBtn.innerHTML=`logga ut`;
  header.classList.remove('show-menu');
  burgerBtn.classList.remove('open');
  menuOpen = false;
  loggedIn = true;

  // let arraycontainsname = (nameArray.indexOf(input.value) > -1);

  if(nameArray.includes(input.value)){
    greeting.innerHTML=`Välkommen tillbaka <span>${input.value}</span>`
  } else{
    greeting.innerHTML=`Du är inloggad som <span>${input.value}</span>`;
    nameArray.push(`${input.value}`);
    localStorage.setItem("nameArray", JSON.stringify(nameArray));
  }

  input.value="";
}
);