# \<las2peer-frontend-user-widget\>

A polymer widget which uses the las2peer Contact and UserInformation Service

## Deploy

1. Add this line to your package.json
```
"las2peer-frontend-user-widget": "github:rwth-acis/las2peer-frontend-user-widget"
```
2. Import to your source code
```
import 'las2peer-frontend-user-widget/las2peer-user-widget.js'
```
3. Add the HTML element
```
<las2peer-user-widget></las2peer-user-widget>
```

## Demo

The project includes a demo which can be run locally by running `npm i` and `polymer serve`

## Changes from legacy polymer module
	>Created seperate ES files for las2peer-user-widget and las2peer-userlist-widget according to legacy definition of Polymer Elements
	>Added super.ready() to ready() function
	>Scrapped x-select in favor of an iron-dropdown due to the x-select item not showing up in the DOM
	>Had to lose the 'modal' property of paper-dialogs since the backdrop appeard on top of everyting, blocking the page
        >Changed syntax to work with shadow DOM
                >`document.getElementById("ID")` becomes `this.$.ID` [[Polymer function which may not be supported by future versions]]
                >`document.getElementsByClassName("CLASS")` becomes `this.shadowRoot.querySelector("#CLASS")
	>Outsourced triggering of click event on file input from paper-button to '_uploadAvatarFile' function
        >Added authorization based on session cookie which is enabled by the `send-cookie` attribute
