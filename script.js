const container = document.querySelector('.container');
const movie = document.getElementById('movie');
//querySelectorAll returns the NodeList similar to an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');
var ticketPrice = +selectedMovie.value;

populateUI();




function setMovieData(moviePrice, movieIndex){
    localStorage.setItem('selectedMoviePrice', moviePrice);
    localStorage.setItem('selectedIndex', movieIndex);
}
function updateDetails(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected') ;
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    //console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedseatsCount = selectedSeats.length;
    total.innerText = selectedseatsCount*ticketPrice;
    count.innerText = selectedseatsCount;
}


//get data from local storage and populateUI
function populateUI(){
    const  selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    //console.log(selectedSeats);
    if(selectedSeats!==null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.toggle('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedIndex');
    if(selectedMovieIndex!==null){
        movie.selectedIndex = selectedMovieIndex;
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMoviePrice!==null)
        movie.value = selectedMoviePrice;
    

}
container.addEventListener('click',(event)=>{
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
    } 
    updateDetails();
});
movie.addEventListener('change', (event)=>{
    ticketPrice = +event.target.value;
    setMovieData(event.target.value, event.target.selectedIndex);
    updateDetails();
})
