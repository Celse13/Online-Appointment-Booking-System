import React, { useState } from 'react';
import ServiceCategories from './ServiceCategories';
import ServicesList from './ServicesList';

const ServicesContainer = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  const handleSelectCategory = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
  };

  return (
    <div>
      {!selectedCategoryId ? (
        <ServiceCategories onSelectCategory={handleSelectCategory} />
      ) : (
        <ServicesList
          selectedCategoryId={selectedCategoryId}
          selectedCategoryName={selectedCategoryName}
          onBackSelected={handleBack}
        />
      )}
    </div>
  );
};

export default ServicesContainer;
