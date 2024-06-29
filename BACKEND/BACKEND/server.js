const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL은 Firestore 사용 시 명시하지 않아도 됩니다.
});

const db = admin.firestore();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes(db));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
