// Gets the button ID to fire off the getColorScheme
const getColorBtn = document.getElementById("get-color-btn");
// Gets the ID of the CHOSEN color from the input (Color Palette)
const colorInput = document.getElementById("color-dropper");
// Gets the ID of the SELECTED Color mode (DROP DOWN MENU)
const colorMode = document.getElementById("color-option");
// Gets the ID of the HTML DIV that will contain THE RENDERED colors
const colorTemplate = document.getElementById("color-palette-container");

//The values passed onto the API with current CHOSEN values (mode, color)
let chosenColorInput = ""
let chosenColorMode = ""

// Event listener for change on the colorInput (Color Palette)
colorInput.addEventListener("change", () => {
   chosenColorInput =  colorInput.value.replace("#", "") //(<) .replace - Removes the "#"infront of the HEX value to pass onto the API link
   //(^) Sets chosenColorInput Varible = to the value that was shocen inside the color pallete 
})
// Event listener for change on the colorMode (DROP DOWN MENU)
colorMode.addEventListener("change", () => {
    chosenColorMode = colorMode.value // (<) Makes chosenColorMode variable = to the value that was chosen on the Mode (DROP DOWN MENU)
})

// When the button is clicked FIRE the getColorScheme func
getColorBtn.addEventListener("click", getColorScheme)

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'

    }
}

//The getColorScheme Retrieves the API info then displays it on screen.
function getColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColorInput}&mode=${chosenColorMode}&count=5`, options) // Calls the API - thecolorapi - retrieve the information we need for the colors.
    .then(res => res.json())// .json() will just return the body as promise with json content
    .then(data => { 
        let dataColors = data.colors // Equals the "thecolorapis" data we asked for.
        let html = "" //Stores the the inner html that is then pushed to the color-pallete-container for display
        for (let color of dataColors) { // For let allows "colors" = the value of const "dataColors" for the html
           html += `<div class="color-container"> 
            <img class="color-img" src="${color.image.bare}">
            <p class="color-hex" id="hex-value">${color.hex.value}</p>
            </div>
            `
            document.getElementById("color-palette-container").innerHTML = html
        }
     })
    }


