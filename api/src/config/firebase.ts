import * as admin from "firebase-admin";
// import * as serviceAccount from "./firebase-adminsdk.json";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  credential: admin.credential.applicationDefault(),
});

export default admin;
