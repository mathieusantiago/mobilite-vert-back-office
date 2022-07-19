import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const Paging = (props) => {
  const [currentNumberPage, setCurrentNumberPage] = useState(1);
  const maxPage = Math.ceil(props.totalArticle.length / props.articlePerPage);
  const changePage = (val) => {
    if (val === "next") {
      props.paginate(currentNumberPage + 1);
      setCurrentNumberPage(currentNumberPage + 1);
    }
    if (val === "prev") {
      props.paginate(currentNumberPage - 1);
      setCurrentNumberPage(currentNumberPage - 1);
    }
  };
  return (
    <div>
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            changePage("prev");
          }}
        />
        <Pagination.Item>{`${currentNumberPage}-${maxPage}`}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            changePage("next");
          }}
        />
      </Pagination>
    </div>
  );
};

export default Paging;
