//Seem to be all built here, update issue could be here too though

const orm = require("../config/orm");

let burger = {
    selectAll: (cb) => {
        orm.selectAll("burgers", (res)=>{
            cb(res);
        });
    },
    selectOne: (condition, cb) => {
        orm.selectOne("burgers", condition, (res)=>{
            cb(res);
        });
    },
    insert: (cols, valArr, cb) => {
        orm.insert("burgers", cols, valArr, (res)=>{
            cb(res);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.update("burgers", objColVals, condition, (res)=>{
            cb(res);
        })
    },
    deleteEl: (condition, cb) => {
        orm.deleteEl("burgers", condition, (res)=>{
            cb(res);
        });
    }
};
module.exports = burger;