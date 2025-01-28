import React, { useEffect } from "react";
import { ProductTable } from "../Components/Table/ProductTable.jsx";
import { ProductForm } from "../Components/Form/ProductForm.jsx";
import ProductApi from "../../src/api/product";

import { useState } from "react";

const Product = () => {
  useEffect(() => {
    getAllProduct();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rows, setRows] = useState([]);

  const getAllProduct = async () => {
    var response = await ProductApi.getProducts();
    if (response.ok) {
      var data = await response.json();
      setRows(data);
    }
  };

  const handleDeleteRow = async (targetIndex, id) => {
    var response = await ProductApi.deleteProduct(id);
    if (response.ok) setRows(rows.filter((_, idx) => idx !== targetIndex));
    else alert("Faild");
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };
  const updateProduct = async (newRow) => {
    var response = await ProductApi.updateProduct(
      newRow.productId,
      newRow.name,
      newRow.description,
      newRow.price,
      newRow.stock
    );
    if (response.ok) {
      rowToEdit === null
        ? setRows([...rows, newRow])
        : setRows(
            rows.map((currRow, idx) => {
              if (idx !== rowToEdit) return currRow;

              return newRow;
            })
          );
    } else {
      alert("Faild");
    }
  };
  const newProduct = async (newRow) => {
    var response = await ProductApi.createProduct(
      newRow.name,
      newRow.description,
      newRow.price,
      newRow.stock
    );
    if (response.ok) {
      var data = await response.json();
      rowToEdit === null
        ? setRows([...rows, data])
        : setRows(
            rows.map((currRow, idx) => {
              if (idx !== rowToEdit) return currRow;

              return newRow;
            })
          );
    } else {
      alert("Faild");
    }
  };
  const handleSubmit = async (newRow) => {
    if (rowToEdit != null) updateProduct(newRow);
    else newProduct(newRow);
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <ProductTable
        rows={rows}
        newRow={() => setModalOpen(true)}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
      />
      {modalOpen && (
        <ProductForm
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
};

export default Product;
