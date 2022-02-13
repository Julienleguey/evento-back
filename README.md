# Read Me - Evento

# Exercise 1

## 1. Clone the project and install the dependencies
```
$ git clone github_url_of_the_project
$ cd evento-back
$ npm install
```


## 2. Make sure you have postgres installed on your computer
```
$ psql -V
```


## 3. Create the database and run the migrations
```
$ NODE_ENV=development npx sequelize-cli db:create
$ NODE_ENV=development npx sequelize-cli db:migrate
```

## 4. Add seeds (optional)
```
$ npm run seed:create
```


## 5. Run the project in development
The .env.development doesn't contain any sensible information and is not currently ignored.
```
$ npm run dev
```
Go to `http://localhost:8000/ping` to check it's working.


## 6. Run the console
This is a repl server with a built-in async/await. All the models are already loaded.
```
$ npm run console
```

You can now interact directly with your database.
Ex:
```
$ events = await Event.findAll()
```

Alternatively, you can use a tool like pgadmin.


# Exercise 2

The Submarine Diagnostic is located in `/api/services/SubmarineDiagnostic.js`.
Run the script with:
```
$ npm run console
$ sd = new SubmarineDiagnostic()
$ sd.execute()
```


