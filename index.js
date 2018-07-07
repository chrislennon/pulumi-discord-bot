"use strict";

const cloud = require("@pulumi/cloud-aws");
const config = require("./config");

let service = new cloud.Service("discord-bot", {
    containers: {
        nodejs: {
            build: `./${config.subDirectory}`,
            memory: 128,
            ports: [{ port: 80 }],
            environment: { 
                "AUTH_TOKEN":  config.authToken
            },
        },
    },
    replicas: 1,
});

console.log(service);
