import React, { useEffect } from "react";
import { UserTable } from "../Components/Table/UserTable.jsx";
import { UserForm } from "../Components/Form/UserForm.jsx";
import userApi from "../../src/api/user";

import { useState } from "react";

const Product = () => {
  useEffect(() => {
    getAllUsers();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rows, setRows] = useState([]);

  const getAllUsers = async () => {
    var response = await userApi.getUsers();
    if (response.ok) {
      var data = await response.json();
      setRows(data);
    }
  };

  const handleDeleteRow = async (targetIndex, id) => {
    var response = await userApi.deleteUser(id);
    if (response.ok) setRows(rows.filter((_, idx) => idx !== targetIndex));
    else alert("Faild");
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };
  const updateUser = async (newRow) => {
    var response = await userApi.updateUser(
      newRow.id,
      newRow.name,
      newRow.email,
      newRow.phoneNumber
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
  const newUser = async (newRow) => {
    var response = await userApi.createUser(
      newRow.name,
      newRow.email,
      newRow.phoneNumber,
      newRow.password
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
  const handleSubmit = async (newRow) => {
    if (rowToEdit != null) updateUser(newRow);
    else newUser(newRow);
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <UserTable
        rows={rows}
        newRow={() => setModalOpen(true)}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
      />
      {modalOpen && (
        <UserForm
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
