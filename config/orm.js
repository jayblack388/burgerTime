// I think we are all good here, there seems to be some issues with the update function when you use a single word though

const con = require("./connection");

const printQMarks = num => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

const objToSQL = ob => {
  let arr = [];
  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  console.log(arr)
  return arr.toString();
}

const orm = {
  selectAll: (table, cb)=>{
    let queryString = "SELECT * FROM " + table + ";";
    con.query(queryString, (err, res)=>{
      if (err) {throw err};
      cb(res);
    });
  },
  selectOne: (table, condition, cb)=>{
    let queryString = "SELECT * FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    con.query(queryString, (err, res)=>{
      if (err) {throw err};
      cb(res);
    });
  },
  insert: (table, cols, valArr, cb)=>{
    let queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString +="VALUES (";
    queryString += printQMarks(valArr.length);
    queryString += ") ";
    console.log(queryString);
    con.query(queryString, valArr, (err, res)=>{
      if (err) {throw err};
      cb(res);
    });
  },
  update: (table, objColVals, condition, cb)=>{
    let queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSQL(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    con.query(queryString, (err, res)=>{
      if (err) {throw err};
      cb(res);
    });
  },
  deleteEl: (table, condition, cb)=>{
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    con.query(queryString, (err, res)=>{
      if (err) {throw err};
      cb(res);
    })
  }
};

module.exports = orm;