import express from "express";
import { catagory } from "../Models/category.js";
import { Product } from "../Models/ProductModels.js";

export const createcategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "All fill data",
      });
    }

    const Exitname = await catagory.findOne({ name });

    if (Exitname) {
      return res.status(400).json({
        status: false,
        message: "Already Created category this name",
      });
    }

    const newcategory = await catagory.create(req.body);

    return res.status(201).json({
      status: true,
      message: "category created",
      data: newcategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Errror in create category ${error.message}`,
    });
  }
};


export const getCaterory = async(req,res) => {
  try {

    const findcaterory = await catagory.find().sort({ _id: -1 })

    if(!findcaterory){
      return res.status(404).json({
        status:false,
        message : "Category Not Fount"
      })
    }
    
    return res.status(200).json({
      status:true,
      message:"FindCategory SuccesFully",
      data : findcaterory
    })
  } catch (error) {
    return res.status(500).json({
      status : false,
      message : `Error in Find Category ${error.message}`
    })
  }
}