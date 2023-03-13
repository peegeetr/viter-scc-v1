import { devNavUrl, UrlAdmin, UrlSystem, UrlViewer } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${UrlSystem}/dashboard`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${UrlAdmin}/dashboard`)
    : data.role_is_viewer === 1 
    ? navigate(`${devNavUrl}/${UrlViewer}/dashboard`)
    :navigate(`${devNavUrl}/nopage`);
};
