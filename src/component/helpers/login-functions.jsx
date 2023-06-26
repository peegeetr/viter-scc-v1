import {
  devNavUrl,
  UrlAdmin,
  UrlSystem,
  UrlMember,
  UrlManager,
  UrlCasher,
} from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${UrlSystem}/dashboard`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${UrlAdmin}/dashboard`)
    : data.role_is_manager === 1
    ? navigate(`${devNavUrl}/${UrlManager}/dashboard`)
    : data.role_is_casher === 1
    ? navigate(`${devNavUrl}/${UrlCasher}/point-of-sales`)
    : data.role_is_member === 1
    ? navigate(`${devNavUrl}/${UrlMember}/dashboard`)
    : navigate(`${devNavUrl}/nopage`);
};
