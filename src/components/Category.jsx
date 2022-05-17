import './Category.scss';

const Category = () => {
  const CATEGORY_OPTIONS = [
		{ 
			key: 'table',
			title: '책상',
			image: '',
		},
		{
			key: 'chair',
			title: '의자',
			image: '',
		},
		{
			key: 'bed',
			title: '침대',
			image: '',
		}, 
		{
			key: 'drawer',
			title: '서랍',
			image: '',
		}
	];

	return (
    <div className="category-section">
			{CATEGORY_OPTIONS.map(({key, title}) => (
				<div key={key} className="category-button">
					{title}
				</div>
			))}
		</div>
  );

};

export default Category;