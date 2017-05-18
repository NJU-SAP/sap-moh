import { Router } from 'express';
import config from 'config';
import moment from 'moment';
import _ from 'lodash';
const path =require("path")
var csv = require('node-csv').createParser();

import BusLineFlowModel from './../../model/BusModel';
import buslinesRawData from './../../../data/gis/bus-lines.json';

const stations = {};

const router = Router();
router.get('/arrivals', async (req, res) => {
  let stationId = req.query.stationId;
  if (!stationId) {
    stationId = 1;
  }
  let buses = stations[stationId];
  if (!buses) {
    buses = [];
    stations[stationId] = buses;
    for (let i = 0; i < 10 + Math.round(Math.random() * 5); i++) {
      const bus = {
        id: 10000 + Math.round(Math.random() * 20000),
        pilgrims: 50 + Math.round(Math.random() * 20),
        arrivalIn: 1 + Math.round(Math.random() * 14)
      };
      buses.push(bus);
    }
    buses.sort((a, b) => a.arrivalIn - b.arrivalIn);
  }
  res.send(buses);
});


const busLineFlowModels = buslinesRawData.map(rawGeoData =>
  new BusLineFlowModel({
    busCount: config.get('buses.count'),
    geoData: rawGeoData
  }));

router.get('/rt', async (req, res) => {
  try {
    const time = moment(req.query.time);
    await Promise.all(busLineFlowModels.map(model => model.refresh(time)));
    const results = _.assign(..._.map(busLineFlowModels, model => model.getAllBusInfo()));
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});
router.get("/buspassenger",async(req,res)=>{
    try{
      let maxCarry=60
        csv.parseFile(path.resolve(__dirname,'../../../data/index/pilgrim-count.csv') , function(err, data) {
        
          data=data.map((d,i)=>{
            var dd={}
            dd.x=i*0.5
            if(d[0]>40000){
              dd.y= Math.floor(maxCarry*0.8+maxCarry*0.2*Math.random())
            }else if(d[0]>20000){
              dd.y= Math.floor(maxCarry*0.3+maxCarry*0.3*Math.random())
            }
            else if(d[0]>10000){
              dd.y= Math.floor(maxCarry*0.2+maxCarry*0.2*Math.random())
            }
            else{
               dd.y= Math.floor(maxCarry*0.1*Math.random())
            }
            return dd
          })
          res.status(200).end(JSON.stringify(data))
      });
    }catch(e){
      console.error("buscount---"+ e)
      res.status(500).end()
    }
})
router.get("/busspeed",async(req,res)=>{
    try{
        csv.parseFile(path.resolve(__dirname,'../../../data/index/bus-speed.csv') , function(err, data) {
        
         data=data.map((d,i)=>{
           var dd={}
           dd.x=i*0.5
           dd.y=d[0]
           return dd
         })
      
          res.status(200).end(JSON.stringify(data))
      });
    }catch(e){
      console.error("busspeed---"+ e)
      res.status(500).end()
    }
})

export default router;
