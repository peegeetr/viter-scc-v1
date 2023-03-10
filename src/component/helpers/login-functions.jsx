import { devNavUrl, UrlOtherUser, UrlSystem } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${UrlSystem}/dashboard`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${UrlOtherUser}/dashboard`)
    : navigate(`${devNavUrl}/nopage`);
};
