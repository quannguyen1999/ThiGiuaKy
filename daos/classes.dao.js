var uuid = require('node-uuid');
var AWS = require("aws-sdk");

require('dotenv').config()
AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var docClient = new AWS.DynamoDB.DocumentClient();

const table = 'classes'
const getAll = async () => {
    var params = {
        TableName: table
      };
    return await (await docClient.scan(params).promise()).Items
}

const add = async (classroom) => {
    const options = {
      TableName: table,
      Item: classroom
    }
    return await docClient.put(options).promise().catch((err) => {
      console.log(err);
      return null
    })
  }

  const deleteById = async (ma_lop) => {
    const options = {
      TableName: table,
      Key:{
       'ma_lop': ma_lop
      },
    }
    return await docClient.delete(options).promise().catch((err) => {
      console.log(err);
      return null;
    })
  }

  
  const getSingleById = async (ma_lop) => {
    const options = {
      TableName: table,
      Key: {
        'ma_lop': ma_lop
      }
    }
    return await (await docClient.get(options).promise()).Item
  }

  const update = async (classroom) => {
    const options = {
      TableName: table,
      Key: {
        ma_lop: classroom.ma_lop
      },
      UpdateExpression: "set ten = :name",
      ExpressionAttributeValues:{
          ":name": classroom.ten
      },
      ReturnValues:"UPDATED_NEW"
    }
    return await docClient.update(options).promise().catch((err) => {
      console.log(err);
      return null;
    })
  }

  module.exports ={
    getAll: getAll,
    add: add,
    delete: deleteById,
    getSingleById: getSingleById,
    update: update
}
  
