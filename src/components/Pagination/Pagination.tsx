import "./Pagination.css";

const Pagination = (props: { paginationItems: JSX.Element[] | undefined }) => {
  return (
    <div className="paginationItemsWrapper">
      <span>&laquo;</span>
      {props.paginationItems}
      <span>&raquo;</span>
    </div>
  );
};
export default Pagination;
