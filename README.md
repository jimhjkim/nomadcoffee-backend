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

## Day 4 - 5

Create the following resolvers:

- [x] seeProfile: See any users profile.

- [x] login: Log the user in by returning a JWT or return an error in case the password is wrong.

- [x] editProfile: Change the user's profile, this includes changing password and changing the avatarURL.

- [x] Write some code to protect your resolvers and inject the logged in user to the resolver's context.

## Day 6

- [x] Implement Follow / Unfollow functionality.

- [x] Implement followers & following computed fields with pagination on the seeUser resolver (No extra resolvers).

- [x] Implement searchUsers resolver.

## Day 7 - 8

### Models

- [x] Create a `Category` model with a relationships to CoffeeShop

- [x] Create a `CoffeeShop` model with a relationship to the `User` that created the `CoffeeShop` and relationships to `Category`

- [x] Create a `CoffeeShopPhoto` model with a relationship to the `CoffeeShop`

### Resolvers

Create the following resolvers: `createCoffeeShop`, `seeCoffeeShops` `seeCoffeeShop`, `seeCategory`, `seeCategories`, `editCoffeeShop`.

- [x] `createCoffeeShop` should create a `CoffeeShop`, it should create a `Category` if it does not exist (the same way we created Hashtags on #6.4) and should upload and create a `CoffeeShopPhoto` for each uploaded file.

- [x] `seeCoffeeShops` should list all the `CoffeeShop` with **pagination**.

- [x] `seeCoffeeShop` should get a `CoffeeShop` by `id`.

- [x] `seeCategory` should list all the `CoffeeShop` inside of a `Category` with **pagination**.

- [x] `seeCategories` should list all the `Category` and should have a `totalShops` **computed** field that counts all the `CoffeeShop` inside of the `Category`, it should also have **pagination**

- [x] `editCoffeeShop` should edit a `CoffeeShop`

## Day 9

- [ ] We are finished with the backend! Following the lectures of the section #19 deploy your backend to Heroku. You will also have to configure a PostgreSQL Database. Make sure you select only the free versions of Database and Servers
