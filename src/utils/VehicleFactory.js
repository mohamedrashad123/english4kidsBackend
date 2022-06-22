const CarBuilder = require("../domain/vehicles/builders/carBuilder");

class VehicleFactory {
	constructor() {
		this.types = [];
	}

	create(typeId) {
		const vehicleBuilder = this.types.find((type) => {
			return type.id === +typeId;
		}).builder;
		return new vehicleBuilder();
	}

	addTypes(...types) {
		this.types.push(...types);
	}
}

const vehicleFactory = new VehicleFactory();
vehicleFactory.addTypes({ id: 1, builder: CarBuilder });

module.exports = vehicleFactory;
