import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/notes'

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return result;
};

export const getOne = async (noteId) => {
    const result = await request.get(`${baseUrl}/${noteId}`, );

    return result;
}

export const getLatest = async () => {
    const query = encodeURIComponent(`offset=0&pageSize=3`);
    console.log(query);
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&${query}`);

    return result;
}

export const create = async (noteData) => {
    const result = await request.post(baseUrl, noteData);

    return result;
};

export const edit = async (noteId, noteData) => {
    const result = await request.put(`${baseUrl}/${noteId}`, noteData);

    return result;
};

export const remove = async (noteId) => request.remove(`${baseUrl}/${noteId}`);