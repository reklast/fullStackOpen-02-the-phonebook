import axios from 'axios';
const baseUrl = 'https://json-server-fullstackopen-c674a82664d5.herokuapp.com/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const getDeletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const personServices = { getAll, create, updatePerson, getDeletePerson }

export default personServices 