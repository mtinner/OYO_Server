export function nocache(req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
}

export function intQueryParser(req, res, next) {
	req.query = parseNums(req.query);
	next();
}
function parseNums(obj) {
	var result = {},
		key,
		value,
		parsedValue;

	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			value = obj[key];
			parsedValue = parseInt(value);

			if (typeof value === 'string' && !isNaN(parsedValue) && value.match(/^[0-9]*$/)) {
				result[key] = parsedValue;
			}
			else if (value.constructor === Object) {
				result[key] = parseNums(value);
			}
			else {
				result[key] = value;
			}
		}
	}

	return result;
}


export function boolQueryParser(req, res, next) {
	req.query = parseBool(req.query);
	next();
}
function parseBool(obj) {
	var result = {},
		key,
		value;

	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			value = obj[key];

			if (typeof value === 'string') {
				if (value === 'true') {
					result[key] = true;
				}
				else if (value === 'false') {
					result[key] = false;
				}
				else {
					result[key] = value;
				}
			}
			else if (value.constructor === Object) {
				result[key] = parseBool(value);
			}
			else {
				result[key] = value;
			}
		}
	}

	return result;
}
