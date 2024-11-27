import React from 'react';
import cn from 'classnames';

export const Table = ({ products }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort-down" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort-up" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr key={product.id}>
          <td>{product.id}</td>

          <td>{product.name}</td>

          <td>
            {product.category ? (
              <>
                <span>{product.category.icon}</span> {product.category.title}
              </>
            ) : (
              'No category'
            )}
          </td>

          <td
            className={cn({
              'has-text-link': product.owner?.sex === 'm',
              'has-text-danger': product.owner?.sex === 'f',
            })}
          >
            {product.owner ? product.owner.name : 'No owner'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
