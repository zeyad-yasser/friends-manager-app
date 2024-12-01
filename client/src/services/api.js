import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllFriends = async () => {
    try {
        const response = await axios.get(`${API_URL}/friends`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createFriend = async (friendData) => {
    try {
        const response = await axios.post(`${API_URL}/friends`, friendData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateFriend = async (id, friendData) => {
    try {
        const response = await axios.patch(`${API_URL}/friends/${id}`, friendData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteFriend = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/friends/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
