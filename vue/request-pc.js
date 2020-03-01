import axios from 'axios'

const instance = axios.create({
	baseURL: ''
})

export const createAPI = (url, method, data) => {
	let config = {}
	if (method.toUpperCase === 'GET') {
		config.params = data
	} else {
		config.data = data
	}

	return instance({
		url,
		method,
		...config
	})
}
