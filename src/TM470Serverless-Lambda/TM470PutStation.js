'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
 const documentClient = new AWS.DynamoDB.DocumentClient();

 let responseBody = "";
 let statusCode = 0;


const params = {
    TableName: "Stations",
    Item: {
        id: 'EDI',
        StationName: 'Edinburgh'
    }
}

 try {
     const data = await documentClient.put(params).promise();
     responseBody = JSON.stringify(data);
     statusCode = 201;
 } catch (err) {
     responseBody = 'unable to put station: ${err}';
     statusCode = 403;
 }

    const response = {
     statusCode: statusCode,
     headers: {
         "content-type": "application/json"
     },
     body: responseBody
    };

    return response;
};
