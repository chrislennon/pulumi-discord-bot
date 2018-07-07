let pulumi = require("@pulumi/pulumi");
let config = new pulumi.Config(pulumi.getProject());
module.exports = {
    authToken: config.require("authToken"),
    subDirectory: config.get("subDirectory") || "bot",
};
