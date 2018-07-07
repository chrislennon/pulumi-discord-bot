"use strict";

const aws = require("@pulumi/aws");
const config = require("./config");

let size = "t2.micro";    // t2.micro is available in the AWS free tier

let ami  = "ami-d834aba1"; // AMI for Amazon Linux in eu-west-1 (Ireland)

let group = new aws.ec2.SecurityGroup("discord-bot-secgrp", { 
    ingress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
    egress: [
        {protocol: "tcp", fromPort: 0, toPort: 65535, cidrBlocks: ["0.0.0.0/0"] },
    ]
});

// Install node, clone app repository, start app
let userData = 
`#!/bin/bash

sudo yum update -y

sudo yum install -y gcc gcc-c++ make openssl-devel git

curl -L https://git.io/n-install | N_PREFIX=/home/ec2-user/n sudo -u ec2-user bash -s -- -y 8.11.3

sudo -u ec2-user bash -c 'git clone ${config.gitUrl} /home/ec2-user/repo'

sudo -u ec2-user bash -c '. ~/.bashrc && cd /home/ec2-user/repo/${config.subDirectory} && npm install'

sudo -u ec2-user bash -c '. ~/.bashrc && export AUTH_TOKEN=${config.authToken} && cd /home/ec2-user/repo/${config.subDirectory} && npm start'`;

let server = new aws.ec2.Instance("discord-bot", {
    tags: { "Name": "discord-bot" },
    instanceType: size,
    securityGroups: [ group.name ],
    ami: ami,
    userData: userData
});

exports.publicIp = server.publicIp;
exports.publicHostName = server.publicDns;