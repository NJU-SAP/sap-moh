import TabPageView from 'bd/view/TabPageView';

import SpeedChart from '../chart/SpeedChart';
require("./BusOperationChartBundle")
export default class BusOperationTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Operation' },
      rt: { type: 'object' }
    }
  }
  init() {
    super.init();

    this.addStyleClass('moh-bus-operation-tab-page');

    this._initMain();
  }

  _initMain() {
    this.c=new window.HajjBusDetail()
    this.$container.append(this.c.toHtml())
    // this.c.setData({line1:[{x:1,y:10},{x:3,y:18},{x:18,y:18},{x:20,y:18}],
    //                     predict:[{x:1,y:9},{x:3,y:20},{x:18,y:13},{x:20,y:18},{x:22,y:16}],
    //                     line2:[{x:1,y:10},{x:3,y:18},{x:18,y:18},{x:20,y:18}],
    //                     pie1:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}],
    //                     pie2:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}]
    //                 })
    // this.$container.html(`
    //   <div class="left-container">
    //     <div class="speed-container">
    //       <h2>Avg. Speed</h2>
    //       <div>
    //         <h2 class="value"></h2>
    //         <span class="unit">km/h</span>
    //       </div>
    //     </div>
    //     <div class="sunburst-chart-container">
    //       Sunburst Chart
    //     </div>
    //   </div>
    //   <div class="right-container">
    //     <div class="chart-container">
    //       Bar Chart
    //     </div>
    //     <div class="speed-chart-container"></div>
    //   </div>
    // `);
    //this._initSpeedChart();
  }

  _initSpeedChart() {
    this.speedChart = new SpeedChart('speedChart', {
      rtCount: '{index/}'
    });
    this.addSubview(this.speedChart, this.$('.speed-chart-container'));
  }

  setRt(value) {
    this.setProperty('rt', value);
    this.$('.speed-container .value').text(value[value.length - 2].busSpeed);
    if (this.speedChart) {
      this.speedChart.invalidateSize();
      this.speedChart.setRtCount(value.map(item => item.busSpeed));
    }
  }

  update() {

    var self=this
    var acc=Math.floor(new Date().getHours()/0.5)+ (new Date().getMinutes()>=30?1:0)
    $.when($.get("./api/bus/buspassenger"),$.get("./api/bus/busspeed")).then(function(passager,speed){
      self.c.setData({line1:JSON.parse(speed[0]).map(function(d){d.y=+(d.y)+10*(Math.random()-0.5);d.y=d.y>0?d.y:0;return d}).slice(0,acc),
                        line2:JSON.parse(passager[0]).slice(0,acc),
                        pie1:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}],
                        pie2:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}]
                    })
    })
    // this.c.setData({line1:[{x:1,y:10},{x:3,y:18},{x:18,y:18},{x:20,y:18}],
    //                     predict:[{x:1,y:9},{x:3,y:20},{x:18,y:13},{x:20,y:18},{x:22,y:16}],
    //                     line2:[{x:1,y:10},{x:3,y:18},{x:18,y:18},{x:20,y:18}],
    //                     pie1:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}],
    //                     pie2:[{time:"1:00",value:15},{time:"1:30",value:15},{time:"2:00",value:58},{time:"3:00",value:28},{time:"4:00",value:99},{time:"5:00",value:34},{time:"6:00",value:65},{time:"7:00",value:41},{time:"8:00",value:88},{time:"9:00",value:55},{time:"10:00",value:50},{time:"11:00",value:32},{time:"12:00",value:60}]
    //                 })
    const rt = sap.ui.getCore().getModel('index').getProperty('/rt');
    this.setRt(rt);
  }

}
