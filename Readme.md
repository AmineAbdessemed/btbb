# btbb

Script that finds the number of bitcoin blocks mined more than 2 hours apart from each other

---
## Requirements

Node.js ^ 14.17.5
GCP service account key with the following persmissions.
⋅⋅*BigQuery Data Viewer.
⋅⋅*BigQuery Job User.

###

## Install

    $ npm install

## Configure app

⋅⋅*Copy the service key in the directory root.
⋅⋅*Change SERVICE_KEY_PATH for the path of your service account key in the index.js file.

## Running the project

    $ npm start
