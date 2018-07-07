let pulumi = require("@pulumi/pulumi");
let config = new pulumi.Config(pulumi.getProject());
module.exports = {
    gitUrl: config.require("gitUrl"),
    authToken: config.require("authToken"),
    subDirectory: config.get("subDirectory") || "",
};
