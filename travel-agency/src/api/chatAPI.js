import axiosClient from "./axiosClient";

const chatApi = {
  // ساخت یک چت جدید
  createChat: () => axiosClient.post("/chat/"),

  // گرفتن یک چت خاص (با پیام‌هاش)
  getChat: (chatId) => axiosClient.get(`/chat/${chatId}/`),

  // فرستادن پیام جدید
  sendMessage: (chatId, content) =>
    axiosClient.post(`/chat/${chatId}/messages/`, { content }),
};

export default chatApi;