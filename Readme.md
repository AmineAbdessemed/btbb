# btbb

Script that finds the number of bitcoin blocks mined more than 2 hours apart from each other.

---
## Requirements

+ Node.js ^ 14.17.5
+ GCP service account key with the following persmissions:
	+ BigQuery Data Viewer.
	+ BigQuery Job User.

###

## Install

    $ npm install

## Configure app

+ Copy the service account key in the directory root.
+ Change the value of SERVICE_KEY_PATH in the index.js file for the path of your service account key.

## Running the project

    $ npm start
