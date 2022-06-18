import "./Category.scss";

const Category = ({ getCategId }) => {
  const CATEGORY_OPTIONS = [
    {
      id: 0,
      key: "all",
      title: "모두",
      image: "",
    },
    {
      id: 1,
      key: "table",
      title: "책상",
      image: "",
    },
    {
      id: 2,
      key: "chair",
      title: "의자",
      image: "",
    },
    {
      id: 3,
      key: "bed",
      title: "침대",
      image: "",
    },
    {
      id: 4,
      key: "drawer",
      title: "서랍",
      image: "",
    },
  ];

  const handleClick = (id) => {
    getCategId(id);
  };

  return (
    <div className="category-section">
      {CATEGORY_OPTIONS.map(({ id, key, title }) => (
        <div
          key={key}
          className="category-button"
          onClick={() => handleClick(id)}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default Category;
