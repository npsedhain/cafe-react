## To use the app visit

[Cafe React App](https://cafe-react-client.herokuapp.com/)

## To run the application locally you will need a database service, and S3 bucket.

### From the root directory run the following two commands:

- `cd server && yarn && yarn start`

- `cd client && yarn && yarn start`

### ENVIRONMENT VARIABLES

#### Server

`PORT=4000`
`CAFE_REACT_CONNECTION=<DATABASE_CONNECTION_THROUGH_CONNECTION_URI>`
`BUCKET_REGION=<YOUR_BUCKET_REGION>`
`BUCKET_NAME=<YOUR_BUCKET_NAME`
`AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_ID>`
`AWS_SECRET_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>`

#### Client

`REACT_APP_SERVER_URI=http://localhost:4000/graphql`
