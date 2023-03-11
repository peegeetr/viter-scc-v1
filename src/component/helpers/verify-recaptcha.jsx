import { setError, setMessage } from "../../store/StoreAction";
import { queryData } from "./queryData";

export async function verifyRecaptcha(response, dispatch, setLoading) {
  setLoading(true);
  const recapt = await queryData(
    `/recaptcha/verify-recaptcha.php`,"get",
    { response }
  );

  console.log(recapt);

  if (typeof recapt === "undefined") {
    setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage("API / reCAPTCHA error."));
    return;
  }

  if (!recapt.success) {
    setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage("reCAPTCHA error."));
    return;
  }

  return recapt.success;
}
