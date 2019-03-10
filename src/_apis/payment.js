import axios from "axios";

export default axios.create({
  // baseURL: `http://kidsnparty.com.au/redpay/public/api/payments/`
  baseURL: `http://localhost:8000/api/payment/`
});
