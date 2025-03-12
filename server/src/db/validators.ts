export const usuario = {
	$jsonSchema: {
		bsonType: "object",
		required: ["email", "password"],
		properties: {
			email: {
				bsonType: "string",
				description: "el 'email' es requerido",
			},
			password: {
				bsonType: "string",
				description: "el 'password' es requerido",
			},
		},
	},
}
