HR Automation Client
====================

This is the frontend of the project. You can find the backend [here](https://github.com/safiulanik/hr-automation-backend)

Features
--------
 - Self registration with roles ('engineer', 'manager', 'hr')
 - User login
 - Track requests

For Engineer role:
 - Create new request
 - View all requests of current user
 - Update/Delete existing requests

For HR role:
 - View all requests made by all users
 - Process requests
 - Create new request
 - Update/Delete existing requests

For manager:
 - View requests with hr_reviewed status
 - Process requests
 - Create new request
 - Update/Delete requests

Installation
------------

Recommended node version: 10.x.x+

Run the following commands in terminal to run the project:

 - `git clone https://github.com/safiulanik/hr-automation-client.git`
 - Add `local_settings.js` in hr-automation-client/src folder with necessary variables; Demo file:

 ```
 export default {base_url: 'http://127.0.0.1:8000'};
 ```

 - `npm install`
 - `npm start`
