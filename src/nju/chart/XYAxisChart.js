import Axis from "./axis/Axis";
import AxisChart from "./AxisChart";

export default class XYAxisChart extends AxisChart
{
    initChart()
    {
    	super.initChart();
    	this.addStyleClass("sap-a-xy-axis-chart");
    	this._initAxisX();
    	this._initAxisY();
    }

	_initAxisX(options = {})
	{
        options = Object.assign({
            orient: "bottom"
        }, options);
		this.axisX = new Axis(options);
        this.addAxis(this.axisX);
        this.axisX.addStyleClass("axis-x");
	}

	_initAxisY(options = {})
	{
        options = Object.assign({
            tickFormat: (d, i) => (d === 0 && i === 0) ? "" : d,
            orient: "left",
        }, options);
		this.axisY = new Axis(options);
        this.addAxis(this.axisY);
        this.axisY.addStyleClass("axis-y");
	}

    getScaleX()
    {
        return this.axisX.getScale();
    }

    getScaleY()
    {
        return this.axisY.getScale();
    }

    redraw()
    {
        this.axisX.setRange([0, this.contentFrame.width]);
        this.axisX.translate(0, this.contentFrame.height);
        this.axisY.setRange([this.contentFrame.height, 0]);

        super.redraw();
    }
}
