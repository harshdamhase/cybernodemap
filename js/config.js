//Replace XYZ with your credentials (its not important you can remove this file from HTML).

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "XYZ",
  authDomain: "XYZ",
  projectId: "XYZ",
  storageBucket: "XYZ",
  messagingSenderId: "XYZ",
  appId: "XYZ",
  measurementId: "XYZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);