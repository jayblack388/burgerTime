const express = require("express");

let router = express.Router();

let burger = require("../models/burger.js");

router.get("/", (req, res, next)=>{
    burger.selectAll((data)=>{
        let hbsObj = {
            burgers: data
        }
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.get("/:id", (req, res, next)=>{
    let condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.selectOne(condition, (err, data)=>{
        if (err){
            return res.status(500).end();
        }
        console.log(data);
        res.render("single-burger", data[0])
    });
});

router.post("/api/burgers", (req, res, next)=>{
    burger.insert(["burger_name"], [req.body.name], (childRes)=>{
        res.json({ id: childRes.insertId});
    });
});

router.put("/api/burgers/:id", (req, res, next)=>{
    let condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured
    }, condition, (childRes)=>{
        if(childRes.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/id", (req, res, next)=>{
    let condition = "id = " + req.params.id;
    burger.deleteEl(condition, (childRes)=>{
        if (childRes.affectedRows === 0) {
            return res.status(404).end()
       } else {
           res.status(200).end();
       }
    });
});

module.exports = router;