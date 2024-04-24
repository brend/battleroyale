# Battle Royale

## Configuration

Make sure to configure the following environment variables:

``` ini
MONGO_URI=mongodb://<your mongo db instance>
SECRET_KEY=<your secret key for JWT signing>
```

## Usage

``` sh
npm i
npm run serve
```

## Endpoints

```
/api
  /users
    /register POST {email: string, username: string, password: string}
    /login POST {email: string, password: string} -> JWT
    /profile GET [Authentication: Bearer <JWT>] -> {email: string, username: string}
```