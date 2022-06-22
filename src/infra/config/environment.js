const environment = {
	database: {
		dialect: process.env.DATABASE_DIALECT,
		url: process.env.DATABASE_URI || "",
	},
};

module.exports = environment;
