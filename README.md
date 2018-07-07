# Start EC2 instance with Discord Bot (nodejs app)

## Prerequisites

This program requires the Pulumi CLI.  If you don't have it installed already,
[get it here](https://pulumi.io/install) or simply run `curl -fsSL https://get.pulumi.com | sh`.

After that, you'll need to [configure your AWS credentials](https://pulumi.io/install/aws.html) so that Pulumi can
deploy into your account.  If your AWS CLI is already configured, everything should just work.

Since this example uses Discord's bot system, you'll also need
[an Discord bot token](https://discordapp.com/developers/applications/me#top).

## Running the Program

After installing the CLI and cloning the repo, `cd` into the directory, and run these commands:

1. Install NPM modules using `npm install` (or `yarn install` if you prefer Yarn).

2. Create a new stack:

    ```
    $ pulumi stack init pulumi-discord-bot
    ```

3. Configure the required variables:

    ```
    # Set the AWS region to deploy into:
    $ pulumi config set aws:region eu-west-1
    # Configure the bot token and git source (use git https url type):
    $ pulumi config set authToken --secret
    $ pulumi config set gitUrl --plaintext
    # [Optionally] set a sub directory inside git source:
    $ pulumi config set subDirectory --plaintext
    ```

4. Deploy your program to AWS using the `pulumi update` command:

   ```
   $ pulumi update
   ```

   This command  will show you the changes before it makes them.  As soon as you select `yes`, it will begin
   provisioning resources, uploading your lambda, etc.  After it completes, your program is live!

5. The EC2 instance will spin up and execute the userData script:

    After some time (download and setup of nodejs) the bot will connect to Discord!

    The userData approach is not currently ideal (from a security standpoint etc) and as such *USE WITH CAUTION*.

6. Run the `pulumi logs --follow` command to follow the logs.  After a short while, you should see `console.log`
   output that your message was posted to Discord.

7. If you'd like to make some edits, try changing the `index.js` file, and then just run `pulumi update` again.
   Pulumi will detect the minimal set of edits needed to deploy your code.

8. After you're done playing around, you can destroy your program and stack by simply running two commands:

    ```
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

## Debugging

You can connect to your instance via ssh however you must specity a `keyName:` in the instance creation, for example:

```
let server = new aws.ec2.Instance("discord-bot", {
    tags: { "Name": "discord-bot" },
    instanceType: size,
    securityGroups: [ group.name ],
    keyName: 'ec2-key-name',
    ami: ami,
    userData: userData
});
```

You will be then able to ssh to the public dns address and view userData logs, for example:
```
$ ssh ec2-user@$(pulumi stack output publicHostName) -i ec2-key-name.pem

...

ec2-user$ cat /var/log/cloud-init-output.log

```

