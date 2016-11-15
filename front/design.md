# Installation

Run `npm install`
Run `npm install -g browserify`

Add `<script src="bundle.js"></script>` on `index.html`

Run `browserify index.js -o bundle.js` to compile a new `bundle.js`.

# HTML Side

Add on the input field `frictionless="email"`

Mapping Clearbit data on HTML side
	`person.email`
	`person.name`
Or map the data on JS side.

Custom mapping `frictionless-mapping="true"` default false

Gestion:
	- Field
	- Radio Button
	- List
	- CheckList

# JS Side
## Class

- FrictionlessSignup
	- Store the form in object
	- Store metadata: API Keys
	- getEmail
	- callApi
	- prefill
	- end
- Display: All interactions with the view
	<!-- - prefill -->
	- getUrlParameter
	- getFieldData
	- setField: Only if empty
	- fieldIsEmpty: -> boolean
- Api
	- Call Clearbit -> Object with payload
	- Call Segment: -> Object with payload
- Mapper
	- Map the Clearbit data: object data -> object mapped
	- Custom mapper function
- Utils
	- checkEmail address with regex: string -> boolean
	- checkIfEmailAlreadyExist: custom function with api call

# Events

	set an event on all fields, emit an event when focus out
	throw error if email is not valid
	throw error if an account already exist
	send event if data was modified per the user
	send event if the data was prefilled correctly
	send event with email address

# Features

- Prefill the email address in the form if exist in url parameter and call Clearbit
- Invalidate the data with boolean if the fields change
- Get email from URL
- When the user unfocused the email field
