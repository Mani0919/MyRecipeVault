import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Alert } from "react-native";

const dataBase = SQLite.openDatabaseAsync("test.db");
export async function createEntries() {
  try {
    const db = await dataBase;
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL , username TEXT NOT NULL,fullname TEXT NOT NULL, email TEXT, phone TEXT)
      `);
    console.log("Table created and sample entries added.");
  } catch (error) {
    console.error("Error creating entries: ", error);
  }
}
//create receipe table

export async function CreateTable() {
  try {
    const db = await dataBase;
    await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS products (
         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
         name TEXT NOT NULL,
         price REAL NOT NULL,
        description TEXT,
        image TEXT,
        submitted_by TEXT,
        rating REAL CHECK(rating >= 0 AND rating <= 5),
       ingredients TEXT  
        );

        `);
    console.log("Table created");
  } catch (error) {
    console.error("Error creating entries: ", error);
  }
}
//insert products
export async function InsertProducts(
  productname,
  price,
  description,
  image,
  username,
  rating,
  ingredients
) {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `INSERT INTO products ( name, price, description, image,submitted_by,rating,ingredients) VALUES ($name, $price, $description, $image,$submitted_by,$rating,$ingredients)`
    );
    try {
      const res = await st.executeAsync({
        // $id: id,
        $name: productname,
        $price: price,
        $description: description,
        $image: image,
        $submitted_by: username,
        $rating: rating,
        $ingredients: ingredients,
      });
      console.log("Inserted successfully");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Database preparation error:", error);
  }
}
//all products
export const AllProducts = async () => {
  try {
    const db = await dataBase;
    try {
      const all = await db.getAllAsync("SELECT * FROM products");
      // console.log("allppppp", all);
      return all;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Database preparation error:", error);
  }
};
//single product
export const SingleProducts = async (id) => {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(`SELECT * FROM products WHERE id = $id`);

    const res = await st.executeAsync({
      $id: id,
    });

    // Fetch all the rows
    const rows = await res.getAllAsync();

    // console.log(rows);

    return rows;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};

//delete single products
export const DeleteSingleProduct = async (id) => {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(`DELETE FROM products WHERE id = $id`);
    try {
      const res = await st.executeAsync({
        $id: id,
      });
      console.log("Product deleted successfully", res);
    } catch (error) {
      console.log("Execution error:", error);
    }
  } catch (error) {
    console.log("Database error:", error);
  }
};
//update the single product

export const UpdateSingleProduct = async (id, updates) => {
  try {
    const db = await dataBase;

    // Build dynamic SET clause
    const fields = Object.keys(updates);
    const setClause = fields
      .map((field, index) => `${field} = $${field}`)
      .join(", ");

    // Prepare the SQL query
    const query = `UPDATE products SET ${setClause} WHERE id = $id`;

    // Prepare the statement
    const st = await db.prepareAsync(query);

    // Execute with the values from `updates` and the `id`
    const res = await st.executeAsync({
      $id: id,
      ...Object.fromEntries(
        fields.map((field) => [`$${field}`, updates[field]])
      ),
    });

    console.log("Product updated successfully", res);
  } catch (error) {
    console.log("Database Error:", error);
  }
};
export const Update = async (
  id,
  name,
  desc,
  price,
  image,
  ingredients,
  rating,
  username
) => {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `UPDATE products SET name=$name,price=$price,description=$desc,image=$image,submitted_by=$username,rating=$rating,ingredients=$ingredients WHERE id=$id`
    );
    try {
      const res = await st.executeAsync({
        $name: name,
        $price: price,
        $desc: desc,
        $image: image,
        $username: username,
        $rating: rating,
        $ingredients: ingredients,
        $id: id,
      });
      console.log("Product Updated");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Data base error");
  }
};
//insert login users
export async function InsertLoginUsers(username, name, email, phone) {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `INSERT INTO login ( username, fullname, email, phone) VALUES ($username, $fullname, $email, $phone)`
    );

    try {
      const res = await st.executeAsync({
        // $id: id,
        $username: username,
        $fullname: name,
        $email: email,
        $phone: phone,
      });
      console.log("Inserted successfully");
    } catch (error) {
      console.log("Execution error:", error);
    }
  } catch (error) {
    console.log("Database preparation error:", error);
  }
}
// check the user
export async function checkUserExists(username, email) {
  console.log("user", username, email);
  if ((!username, !email)) {
    Alert.alert("Username,email required");
  }
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `SELECT * FROM login WHERE username = $username OR email = $email`
    );

    const res = await st.executeAsync({
      $username: username,
      $email: email,
    });

    // Fetch all the rows
    const rows = await res.getAllAsync();

    console.log(rows);

    return rows.length > 0;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}

export const ALLLoginUsers = async () => {
  try {
    const db = await dataBase;
    try {
      const all = await db.getAllAsync("SELECT * FROM login");
      console.log("alluserssss", all);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Database preparation error:", error);
  }
};

export async function insertValues() {
  const db = await dataBase;
  const statement = await db.prepareAsync(
    'INSERT INTO test (value, intValue) VALUES ("mani", 1)'
  );

  try {
    let result = await statement.executeAsync();
    //   console.log('bbb and 101:', result.lastInsertRowId, result.changes);
  } catch (error) {
    console.error("Error inserting values:", error);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function Allusers() {
  const db = await dataBase;
  // const res=await db.getAllAsync(

  // )
  try {
    let result = await db.getAllAsync(`SELECT * FROM test`);
    console.log("all", result);
  } catch (error) {
    console.log(error);
  }
}
