import axios from "axios";

export default axios.create({
  baseURL: `http://kidsnparty.com.au/redpay/public/api/payments/`
});
