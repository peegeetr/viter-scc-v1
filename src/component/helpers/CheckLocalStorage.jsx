export const checkLocalStorage = () => {
  let lcsstoken = null;
  try {
    lcsstoken = JSON.parse(localStorage.getItem("sccToken"));
    // console.log(hrisv3token);
  } catch (error) {
    lcsstoken = null;
  }

  return lcsstoken;
};
