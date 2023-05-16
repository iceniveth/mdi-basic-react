## Getting Started

Install:
- NodeJS 18.11 and up.
- MongoDB (optional since we could use MongoDB Atlas their cloud provided DB) 

Create a `.env` file with the content:

```
MONGODB_CONNECTION_STRING=
MONGODB_DBNAME="
```

> The value above for those keys should be taken from the MongoDB instance.

Then run this on terminal

```
npm install
npm start


# Docker Linux/Bash
docker run -it --rm -v $(pwd):/app -w /app -p 8081:8081 node npm start
```

Visit Route /api/cart