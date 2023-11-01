# Description

You are a bounty hunter of the Old Republic. Your parents were killed by a Sith Lord as a child and your goal in life is to kill all the Sith and Jedi.

In order to help you in your quest, and since you are a do-it-yourself kind of bounty hunter, you have learned programming so you can keep track of your bounties and kills!

# Objective

Using Express, create an API on the `/bounty` route that:

1. `GET`s a list of all bounties
2. `POST`s new bounties,
3. `DELETE`s a bounty
4. `PUT`s (updates) a bounty

Since we haven't started connecting to MongoDB quite yet, you can just save your bounties in a `bounties` array in your server code. Keep in mind that since it isn't being persisted anywhere, anytime you make a change to your server code and restart the server, you'll lose all your bounties.

A bounty object should have:

- First Name
- Last Name
- Living (Boolean)
- Bounty Amount (number)
- Type (‘Sith’ or ‘Jedi’)
- ID (a unique identifier. Use the `uuid` package to generate unique ids. - `npm install uuid` and check the [docs](https://www.npmjs.com/package/uuid) to see how to use it. It's as simple as requiring the package and running `uuid.v4()`)

Since there isn't a front end set up yet, you'll just use Postman to interact with the server and update the data.

# Requirements for Part 1 - Server Setup and `GET` and `POST`Routes.

Since we don't have a *good* way to tell the server which item we want to `PUT` and `DELETE` yet, we'll start out just by writing the `GET` and `POST` endpoints.

- Write a `GET` endpoint that gets all bounties from the array and sends them to the client.
- Write a `POST` endpoint that adds a new bounty object to the array of bounties.
    - Remember, you'll have to play the part of the database and add an `id` property to the incoming bounty before saving it to the array of bounties. This way you'll be able to easily look it up by its `id` property in order to update and delete it later.

 

# Related Lessons

[Get Request](https://www.notion.so/Get-Request-97bf147de98d440688fea8d3ebbc97e2)

[Request Body - Post Request](https://www.notion.so/Request-Body-Post-Request-09baf6b2a6ab448cbb849df4c66d19f1)

[We Need ID's](https://www.notion.so/We-Need-ID-s-a9c82ba30d3e44aea42c045f7d4a9d69)

[First Express Server](https://www.notion.so/First-Express-Server-6f405642d07a401d9f48d76adbbed58c)

# Next Up

[Express Params](https://www.notion.so/Express-Params-9ffd77247cc94763b27a4f72b6101c2c)