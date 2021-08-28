const {BigQuery} = require('@google-cloud/bigquery');
const {existsSync} = require('fs');

const SERVICE_KEY_PATH = "./citron-d3fe6-c13297c099b7.json";

try {
  if (existsSync(SERVICE_KEY_PATH)) {
    console.log("[INFO] : Service key found ! ")
  }
} catch(err) {
  console.log("[ERROR] : Please make sure the service key is the root directory of the project.")
  return 1;
}

const bigquery = new BigQuery({projectId:"citron-d3fe6", keyFilename:SERVICE_KEY_PATH});

query();

async function query() {

  const query = 'SELECT number,UNIX_SECONDS(timestamp) as timestamp FROM `bigquery-public-data.crypto_bitcoin.blocks` order by number;';
  const options = {
    query: query,
    location: 'US',
  };
  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`[INFO] : GCP BigQuery Job ${job.id} started. Please wait. Requesting blocks data on the public gcp database. See : https://www.kaggle.com/bigquery/bitcoin-blockchain`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  console.log("[INFO] : Job done, looking for 2H+ occurences.")
  let numOfOccurences = 0;
  for(let i=1;i<rows.length;i++){
    const blockNextTs = rows[i].timestamp;
    const blockLastTs = rows[i-1].timestamp;
    const blockNextId = rows[i].number;
    const blockLastId = rows[i-1].number;
    const timeDif = blockNextTs-blockLastTs;
    if(timeDif>7200){
      numOfOccurences++;
      console.log("2H+ between blocks",blockLastId,blockNextId,"Time Between(s)",timeDif);
    }
  }
  console.log("Total number of 2H+ occurences is",numOfOccurences)
}
