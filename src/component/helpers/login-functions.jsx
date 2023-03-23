import { devNavUrl, UrlAdmin, UrlSystem, UrlMember } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${UrlSystem}/dashboard`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${UrlAdmin}/dashboard`)
    : data.role_is_member === 1
    ? navigate(`${devNavUrl}/${UrlMember}/dashboard`)
    : navigate(`${devNavUrl}/nopage`);
};
