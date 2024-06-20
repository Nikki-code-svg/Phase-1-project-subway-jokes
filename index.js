document.querySelector("#jokeForm").addEventListener("submit", handleSubmit) // part of POST form

// Post form
function handleSubmit(e) {
  e.preventDefault();
  let jokeForm = {
  type:e.target.joketype.value,
  setup:e.target.setup.value,
  punchline:e.target.punchline.value,

}; // my attribute input submit field 
    checkExistingJoke(jokeForm);
    const sUInput = document.querySelector('#theSetUp').value;
    const pLInput = document.querySelector('#thePunchLine').value;
   
   if (sUInput === ""){
      alert("Set up, do not leave blank.");
      return;
    }
    
  if (pLInput === "") {
      alert("Punch line, do not leave blank.");
      return;
    }
  
}
// This Fetch was made for checking for existing jokes
function checkExistingJoke(newJoke) {
fetch("http://localhost:3000/subwayJokes")
   .then(response => response.json())
   .then(jokeData => {
// Check if there is any joke with the same setup and punchline
  let existingJoke = jokeData.find(joke => joke.setup === newJoke.setup && joke.punchline === newJoke.punchline);

   if (existingJoke) {
    alert("Not Original! Try again."); // If joke does exist, you can not input joke and have to think of another one.
     } else {
       postJoke(newJoke); // If joke doesn't exist, proceed with POST request
     }
     formInput();
     
})
   .catch(error => console.error('Error checking existing jokes:', error));
}
function postAllJokes(jokeObj){
    fetch("http://localhost:3000/subwayJokes", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
},
      body: JSON.stringify(jokeObj)

})
     .then(response => response.json())
     .then(newJoke => {
     console.log("New joke posted:",newJoke);
     document.querySelector("#jokeForm").reset()
})
  .catch(error => console.error('Error posting joke:', error));
}
const blueBtn = document.querySelector("#button-blue")
blueBtn.addEventListener("mouseover", function(){
  blueBtn.style.backgroundColor = "#3DC2EC";
});
blueBtn.addEventListener("mouseout", function(){
  blueBtn.style.backgroundColor ="";
});
// addEventListener on double click of a radio buttom on the submit form. This will prompt an Alert pop up on the website.



// Generator for GET request

const containerJokes = document.querySelector("#containerJokes");
const  dropDown = document.querySelector("#select");
const dropBtn = document.querySelector("#dropBtn");

function generateJoke(jokeList) {
     if (!jokeList || jokeList.length === 0 ) {
        containerJokes.textContent = "No jokes.";
         return;
      }  // checks if jokeList is false, an empty array is false if array is zero then empty
    //    
    let randomJoke = jokeList[Math.floor(Math.random() * jokeList.length)];
     containerJokes.textContent = randomJoke.setup + " " + randomJoke.punchline; // retrieves random joke and updates it in the container div
    //  console.log(randomJoke)
   }  
function filterJokes(jokes) {
      dropBtn.addEventListener("click", () =>{
         let filteredJokes;
         // I want the  dropDown value the = general then filter jokes by type. which is key in your db.json
        if ( dropDown.value === "general"){
              filteredJokes = jokes.filter(joke => joke.type === "general");
         //  otherwise if value is = to programming then look for jokes with type programming
      } else if ( dropDown.value === "programming") {
                filteredJokes = jokes.filter(joke => joke.type === "programming");
      } else if ( dropDown.value === "train") {
                 filteredJokes = jokes.filter(joke => joke.type === "train");
      } else if ( dropDown.value === "science") {
                filteredJokes = jokes.filter(joke => joke.type === "science");
     } 

            generateJoke(filteredJokes);
        
 });
 }

 function displayJokes(){
    
    fetch("http://localhost:3000/subwayJokes")
     .then(response => response.json())
     .then(jokeData =>  {
       filterJokes(jokeData);
})
     .catch(error => console.error('Error GET joke:', error));

}
function main() {
    displayJokes();
  }
  
  main();


