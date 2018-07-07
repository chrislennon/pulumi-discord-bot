# Nodejs container using Pulumi - A Discord Bot

Expanded from the [cloud-js-containers](https://github.com/pulumi/examples/tree/master/cloud-js-containers) and other Pulumi [examples](https://github.com/pulumi/examples).

## Prerequisites

This program requires the Pulumi CLI.  If you don't have it installed already,
[get it here](https://pulumi.io/install) or simply run `curl -fsSL https://get.pulumi.com | sh`.

After that, you'll need to [configure your AWS credentials](https://pulumi.io/install/aws.html) so that Pulumi can
deploy into your account.  If your AWS CLI is already configured, everything should just work.

You will also need [Docker](https://www.docker.com/get-docker) installed and signed in using `docker login`

Since this example uses Discord's bot system, you'll also need
[an Discord bot token](https://discordapp.com/developers/applications/me#top).

## Running the Program

After installing the CLI and cloning this repository, `cd` into the directory, and run these commands:

1. Install NPM modules using `npm install` (or `yarn install` if you prefer Yarn).

2. Create a new stack:

    ```
    $ pulumi stack init pulumi-discord-bot
    ```

3. Configure the required variables:

    ```
    # Set the AWS region and service to deploy into:
    $ pulumi config set aws:region eu-west-1
    $ pulumi config set cloud-aws:useFargate true

    # Configure the bot token:
    $ pulumi config set authToken --secret
    ```

4. Deploy your program to AWS using the `pulumi update` command:

   ```
   $ pulumi update
   ```

   This command  will show you the changes before it makes them.  As soon as you select `yes`, it will begin
   provisioning resources.  After it completes, your program is live!

5. The container will spin up and start the bot.

6. Run the `pulumi logs --follow` command to follow the logs.  After a short while, you should see `console.log`
   output that your bot has connected.

7. If you'd like to make some edits, try changing the `index.js` file, and then just run `pulumi update` again.
   Pulumi will detect the minimal set of edits needed to deploy your code.

8. After you're done playing around, you can destroy your program and stack by simply running two commands:

    ```
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

