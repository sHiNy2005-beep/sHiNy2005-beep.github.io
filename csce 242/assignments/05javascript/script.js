function showPoem() {
  document.getElementById("display-poem").innerHTML = `
    <pre>
Here comes the sun
Sun
  Sun
    Sun
Here it comes
    </pre>
  `;
}

function toggleColorPicker() {
  const picker = document.getElementById("colorPicker");
  const btn = document.getElementById("colorBtn");
  const display = document.getElementById("colorDisplay");

  if (picker.classList.contains("hidden")) {
    picker.classList.remove("hidden");
    display.classList.remove("hidden"); 
    display.textContent = "Selected Color"+ picker.value;     
    btn.textContent = "Hide Color Picker"; 
  } 
  else {
    picker.classList.add("hidden");  
    display.classList.add("hidden");         
    btn.textContent = "Select a Color";    
  }
} 
document.getElementById("colorPicker").addEventListener("input", (event) => { 
  const chosenColor = event.target.value;
  const display = document.getElementById("colorDisplay");

  display.textContent = "Lorem Ipsem: " + chosenColor;  
  display.style.color = chosenColor;
});

function changeImage() {
    const img = document.getElementById("weatherImage");
    if (img.src.includes("cloudy.png")) {
      img.src = "images/sunny.png";
    } else {
      img.src = "images/cloudy.png";
    }
}

