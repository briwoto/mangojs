module.exports = {
	admin: {
		pages: {}
	},
	user: {
		pages: {
			Login: {
				pathname: '/login',
				loc_wait: 'input[name="username"]',
				fields: {
					username: {
						identifier: 'input[name="username"]',
						type: 'text'
					},
					password: {
						identifier: 'input[name="password"]',
						type: 'text'
					}
				},
				buttons: {
					LOGIN: {
						identifier: '//button[.="Login"]'
					}
				}
			},
			Home: {
				pathname: '/home',
				loc_wait: '#s2id_location_from',
				fields: {
					trip: {
						identifier: 'input[name="triptype"]',
						type: 'radio',
						value_map: {
							'ONE WAY': 'oneway',
							'ROUND TRIP': 'round'
						}
					},
					class: {
						identifier: 'input[name="cabinclass"]',
						type: 'select',
						value_map: {
							First: 'first',
							Business: 'business',
							Economy: 'economy'
						},
						value_identifier: 'option[value="~{val}"]'
					},
					from: {
						identifier: '#s2id_location_from',
						type: 'search'
					},
					to: {
						identifier: '#s2id_location_to',
						type: 'search'
					},
					depart: {
						identifier: 'input[name="departure_date"]',
						type: 'date'
					},
					return: {
						identifier: 'input[name="reture_date"]',
						type: 'date'
					}
				},
				buttons: {
					search: {
						identifier: '//button[contains(text(),"Search")]'
					},
					HOTELS: {
						identifier: 'a[data-name="hotels"]'
					},
					FLIGHTS: {
						identifier: 'a[data-name="flights"]'
					},
					TOURS: {
						identifier: 'a[data-name="tours"]'
					},
					CARS: {
						identifier: 'a[data-name="cars"]'
					},
					VISA: {
						identifier: 'a[data-name="visa"]'
					}
				}
			},
			Account: {
				pathname: '/account',
				loc_wait: 'a[href="#profile"]'
			}
		}
	}
};
