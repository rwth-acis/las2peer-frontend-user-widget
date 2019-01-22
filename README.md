A polymer3.0 widget used to display and change basic user details.
Ideally you should be able to build it by simply running
```
nmp i
```
and
```
polymer serve
```

## Changes from legacy polymer module
	>Created seperate ES files for las2peer-user-widget and las2peer-userlist-widget according to legacy definition of Polymer Elements
	>Added super.ready() to ready() function
	>Scrapped x-select in favor of an iron-dropdown due to the x-select item not showing up in the DOM
	>Had to lose the 'modal' property of paper-dialogs since the backdrop appeard on top of everyting, blocking the page
	>Changed syntax from 'document.getElementById("ID") to 'this.$.ID'
	>Outsourced triggering of click event on file input from paper-button to '_uploadAvatarFile' function
	>Changed authorization for Service Requests from based on login-name + password or OIDC Token + Provider to session cookie
		>This also makes the demo sort of obsolete
