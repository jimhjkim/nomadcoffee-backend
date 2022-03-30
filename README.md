# nomadcoffee-backend

A series of daily challenges to reinforce lessons learned from building an instagram clone.

## Day 1 - 2

- [x] Create a Github Repository named 'nomadcoffee-backend'.

- [x] Set up a Prisma project.

- [x] The project should follow the architecture outlined on the video (.typeDefs.js , .resolvers.js).

- [x] Use babel, nodemon and dotenv

## Day 3

- [x] On your schema.prisma let's create the User model, the model must have the following fields:

  - id
  - username
  - email
  - name
  - location
  - password
  - avatarURL
  - githubUsername

- [x] After you are done, make a createAccount resolver. createAccount should:

  - Create a user
  - Hash the password
  - Check that the username / email aren't taken
  - Return ok:true or ok:false, error:$error if there is an error.
