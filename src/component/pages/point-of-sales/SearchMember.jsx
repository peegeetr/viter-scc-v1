import React from "react";
import { setIsModalSearch } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { AssociateMemberId } from "../../helpers/functions-general";

const SearchMember = ({ setSearch }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const onSearch = React.useRef("0");

  const handleChange = async (e) => {
    if (onSearch.current.value === "") {
      setSearch("merin");
      dispatch(setIsModalSearch(false));
      return;
    }

    setSearch(onSearch.current.value);
    dispatch(setIsModalSearch(true));
  };

  return (
    <>
      <input
        type="search"
        name="search_member"
        ref={onSearch}
        onChange={handleChange}
        autoComplete="off"
      />
      <label className="capitalize">search member</label>
    </>
  );
};

export default SearchMember;
