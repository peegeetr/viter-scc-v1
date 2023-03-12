import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbFileDownload } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { formatDate } from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import Loadmore from "../../partials/Loadmore";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
const FileUploadList = ({ setItemEdit }) => { 
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null); 
  const { ref, inView } = useInView(); 
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["file", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/file/search/${search.current.value}`, // search endpoint
        `/v1/file/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    networkMode: "always",

  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  }; 

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.file_upload_aid);
    setData(item);
    setDel(true);
  };

  return (
    <> 
    
    <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
       <div className="rounded-md mb-8 order-1 md:order-0 border px-2">  
          {result?.pages.map((page, key) => (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => (
            <div
              key={key}
              className="mb-3 border-b border-solid border-gray-100 p-2 rounded-md relative"
            >
              <div className="grid  grid-cols-[50px_1fr] md:grid-cols-[70px_1fr] gap-2 items-center">
                <div className="justify-self-center basis-20 ">
                  <span className="text-3xl">
                    <TbFileDownload />
                  </span>
                </div>

                <div className="w-full py-1"> 
                    <h2 >{item.file_upload_name}</h2> 
                      <p>Link :
                  <a href={item.file_upload_link} className="max-w-[650px] w-full m-0 cursor-pointer text-primary">
                  <u>{item.file_upload_link}</u> 
                  </a> 
                        </p>

                  <p className="text-xs">
                    Date: {formatDate(item.file_upload_date)} 
                  </p>
                  <div className="flex items-center gap-1"> 
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button> 
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button> 
                      </div> 
                </div>
              </div>
            </div>
                  ))}
                </React.Fragment>
              ))}
      
      {(status === "loading" || result?.pages[0].data.length === 0) && (
            <div className="relative">
          {status === "loading" && <TableSpinner />} 
                    <NoData />
        </div>
            )}
            {error && (
              
        <ServerError iconSize={"6xl"} textSize={"xl"} />
            )}
            <div className="text-center">
        <Loadmore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        /></div>
         
 
      </div>
             

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/file/${id}`} 
          msg={ "Are you sure you want to delete this file" 
          }
          item={`${dataItem.file_upload_name}`} 
          arrKey="file"
        />
      )}
    </>
  );
};

export default FileUploadList;
