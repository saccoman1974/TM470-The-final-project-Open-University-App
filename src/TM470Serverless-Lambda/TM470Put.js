'use strict';
const AWS = require('AWS-sdk');

exports.handler = async(event, context) => {

    const documentClient = new AWS.DynamoDB.documentClient();


    let responseBody  = "";
    let statusCode = 0;

    const params = {
        TableName: "Stations",
        Item: {
            id: '1234',
            productName: 'Glasgow'
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

    const response
}