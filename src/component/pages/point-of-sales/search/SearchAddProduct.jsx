import { queryData } from "@/component/helpers/queryData";
import NoData from "@/component/partials/NoData";
import ButtonSpinner from "@/component/partials/spinners/ButtonSpinner";
import TableSpinner from "@/component/partials/spinners/TableSpinner";

const SearchAddProduct = ({
  label,
  name,
  disabled,
  endpoint,
  setSearch,
  setIsSearch,
  handleSearchModal,
  setLoading,
  setData,
  search,
  isSearch,
  loading,
  data,
  setNewDataList,
}) => {
  // const yearDue = getUrlParam().get("yearDue");
  const handleSearch = async (
    e,
    setSearch,
    setIsSearch,
    setLoading,
    endpoint,
    setData,
    setNewDataList,
    value
  ) => {
    if (e.target.value.trim() === "") {
      setSearch("");
      setNewDataList([]);
      setIsSearch(false);
      return;
    }
    setLoading(true);
    setIsSearch(true);
    setSearch(e.target.value);

    const data = await queryData(endpoint, "post", {
      search: value,
      yeardueId: yearDue,
    });

    // console.log(data);

    if (typeof data === "undefined") {
      setLoading(true);
      console.log("undefined");
      return;
    }

    if (!data.success) {
      setLoading(true);
      setData([]);
      setIsSearch(false);
      return;
    }

    if (data.success) {
      setData(data.data);

      setLoading(false);
    }
  };

  const handleClick = (item, setSearch, setIsSearch, setNewDataList) => {
    setSearch(`${item.client_id} - (${item.client_entities_id})`);
    setIsSearch(false);
    setNewDataList(item);
  };

  return (
    <>
      <InputSearch
        label={label}
        type="text"
        disabled={disabled}
        name={name}
        onChange={(e) =>
          handleSearch(
            e,
            setSearch,
            setIsSearch,
            setLoading,
            endpoint,
            setData,
            setNewDataList,
            e.target.value
          )
        }
        value={search}
        placeholder="Search..."
        onClick={() => handleSearchModal()}
      />

      {isSearch && loading && (
        <span className="absolute top-1/2 right-0 -translate-x-1/2 mr-2">
          <ButtonSpinner color="stroke-primary" />
        </span>
      )}

      {isSearch && (
        <ul className="absolute z-50 max-h-32 overflow-y-auto top-16 w-full bg-white shadow-3xl rounded-md h-[30rem] border border-t-0">
          {loading ? (
            <li className=" p-2 w-full text-center bg-white focus:bg-gray-200 border-b border-white">
              <TableSpinner />
            </li>
          ) : data.length > 0 ? (
            data.map((item, key) => (
              <button
                type="button"
                className="text-left pl-2 py-[1px] w-full bg-white hover:bg-gray-200 focus:bg-gray-200 cursor-pointer duration-200"
                key={key}
                onClick={() =>
                  handleClick(item, setSearch, setIsSearch, setNewDataList)
                }
              >
                {`${item.client_id} - (${item.client_entities_id})`}
              </button>
            ))
          ) : (
            <li className="pt-1 w-full text-center bg-white focus:bg-gray-200 border-b border-white">
              <NoData />
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default SearchAddProduct;
