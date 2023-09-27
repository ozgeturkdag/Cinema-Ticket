//Tıklanan koltuk tespiti için container divi çağırma
const container = document.querySelector(".container");

const infoText = document.querySelector(".infoText");
const select = document.getElementById("movie");
//Selectin içindeki value değeri filmin fiyatına eşit
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = document.querySelectorAll(".seat:not(.reserved)");

//Veri Tabanında veri okuma

const getSeatsFromDatabase = () => {
  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  select.selectedIndex = dbSelectedMovie;
  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

//Veri Tabanına Kaydetme

const saveSeatsToDatabase = (index) => {
  localStorage.setItem("selectedSeatIndex", JSON.stringify(index));
  localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex));
};

getSeatsFromDatabase();
//Tutar Hesaplama Fonksiyonu
const priceCalculator = () => {
  //====Koltukların  Sıra Numarası Tespit İşlemleri====//

  //Tüm Koltukları dizi haline getirme
  const seatsArray = [];
  seats.forEach((seat) => {
    seatsArray.push(seat);
  });

  const selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArray = [];

  selectedSeats.forEach((selectedSeat) => {
    selectedSeatsArray.push(selectedSeat);
  });

  let selectedSeatIndex = selectedSeatsArray.map((selectedSeat) => {
    return seatsArray.indexOf(selectedSeat);
  });

  //====Hesaplama İşlemleri====//

  //Toplam seçili koltuk sayısını bulma
  const selectedSeatsCount =
    container.querySelectorAll(".seat.selected").length;
  const moviePrice = select.value;

  //Seçili koltuk varsa sorgusu
  if (selectedSeatsCount > 0) {
    //Eğer varsa textin still özellğini değiştrime
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }
  //Toplam seçili koltuk sayısını html gönderme
  count.innerText = selectedSeatsCount;
  //Toplam Tutarı Html'e gönderme
  amount.innerText = moviePrice * selectedSeatsCount;

  saveSeatsToDatabase(selectedSeatIndex);
};
priceCalculator();

container.addEventListener("click", (pointerEvent) => {
  //tıklanan elementlerden koltuğu tespit etme

  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }

  priceCalculator();
});

select.addEventListener("change", () => {
  priceCalculator();
});
