/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './components/Table';

function fillingTheTable(products, categories, users) {
  return products.map(product => {
    const category = categories.find(cat => cat.id === product.categoryId);
    const owner = users.find(user => user.id === category?.ownerId);

    return {
      ...product,
      category: category
        ? { title: category.title, icon: category.icon }
        : null,
      owner: owner ? { id: owner.id, name: owner.name, sex: owner.sex } : null,
    };
  });
}

export function App() {
  const enrichedProducts = fillingTheTable(
    productsFromServer,
    categoriesFromServer,
    usersFromServer,
  );

  const [selectedUserId, setselectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = enrichedProducts
    .filter(
      product =>
        selectedUserId === null || product.owner?.id === selectedUserId, // eslint-disable-next-line
    )
    .filter(
      product => product.name.toLowerCase().includes(searchQuery.toLowerCase()), // eslint-disable-next-line
    );

  return (
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs has-text-weight-bold">
            <a
              data-cy="FilterAllUsers"
              href="#/"
              className={!selectedUserId ? 'is-active' : ''}
              onClick={() => {
                setselectedUserId(null);
              }}
            >
              All
            </a>
            {usersFromServer.map(user => (
              <a
                key={user.id}
                data-cy="FilterUser"
                href="#/"
                className={selectedUserId === user.id ? 'is-active' : ''}
                onClick={() => {
                  setselectedUserId(user.id);
                }}
              >
                {user.name}
              </a>
            ))}
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                type="text"
                className="input"
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="icon is-left">
                <i className="fas fa-search" />
              </span>
              {searchQuery && (
                <span className="icon is-right">
                  <button
                    type="button"
                    className="delete"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}
            </p>
          </div>

          <div className="panel-block is-flex-wrap-wrap">
            <a
              href="#/"
              data-cy="AllCategories"
              className="button is-success mr-6 is-outlined"
            >
              All
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 1
            </a>

            <a data-cy="Category" className="button mr-2 my-1" href="#/">
              Category 2
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 3
            </a>
            <a data-cy="Category" className="button mr-2 my-1" href="#/">
              Category 4
            </a>
          </div>

          <div className="panel-block">
            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
            >
              Reset all filters
            </a>
          </div>
        </nav>
      </div>

      <div className="box table-container">
        {filteredProducts.length > 0 ? (
          <Table products={filteredProducts} />
        ) : (
          <p className="has-text-weight-bold my-4">
            No products matching selected criteria
          </p>
        )}
      </div>
    </div>
  );
}
