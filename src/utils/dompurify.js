import { sanitize } from "dompurify";

const dompurify = (data) => {
  return sanitize(data);
};

export default dompurify;