'use strict';
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();


    let responseBody  = "";
    let statusCode = 0;

    const params = {
        TableName: "Stations",
        Key: {
          id:"EDI"
        },
        UpdateExpression: "set productName = :n",
        ExpressionAttributeValues: {
            ":n": "Aberdeen"
        },

        ReturnValues: "UPDATED_NEW"
    };
    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = 'unable to update station: ${err}';
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "Application/json"
        },
        body: responseBody  
    };
    return response;
};