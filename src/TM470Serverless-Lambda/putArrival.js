'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
 const documentClient = new AWS.DynamoDB.DocumentClient();

 let responseBody = "";
 let statusCode = 0;
 
 
 
const {Train_id, Scheduled_Time, Starting_From, Status, Expected_Arrival_Time} = JSON.parse(event.body);


const params = {
    TableName: "Selected_Arrivals",
    Item: {
        Train_id: Train_id,
       Scheduled_Time: Scheduled_Time,
       Starting_From: Starting_From,
                   Status: Status,
                   Expected_Arrival_Time: Expected_Arrival_Time
    }
};

 try {
     const data = await documentClient.put(params).promise();
     responseBody = JSON.stringify(data);
     statusCode = 200;
 } catch (err) {
     responseBody = 'unable to put arrival: ${err}';
     statusCode = 403;
 }

    const response = {
     statusCode: statusCode,
     headers: {
         "Access-Control-Allow-Headers": "Content-Type",
         "Access-Control-Allow-Origin" : "*",
         "Access-Control-Allow-Methods" : "OPTIONS,POST,GET"
        
        
     },
     body: responseBody
    };

    return response;
};