import React from "react";

class priceModule {
	constructor(location, RateHistory, GallonsRequested) {
		if (location == "TX") {
			this.locationFactor = .02;
		}
		else {
			this.locationFactor = .04
		}
		this.RateHistoryFactor = RateHistory;
		if (GallonsRequested > 1000) {
			this.GallonsRequestedFactor = .02
		} else {
			this.GallonsRequestedFactor = .03
		}
		this.margin = 1.5 * (this.locationFactor - this.RateHistoryFactor + this.GallonsRequestedFactor + .1)
		this.suggestedPrice = this.margin + 1.5
		this.totalDue = this.suggestedPrice * this.GallonsRequested
	}
}

function PricingModule(){
	return(
			<div classname="PricingModule">
				<h1>Pricing Module: Under Construction</h1>
				Total Amount Due: 
				<input type="text" value="numeric non-editable, calculated (gallons * price)" disable/>
			</div>
	);
}

export default PricingModule;