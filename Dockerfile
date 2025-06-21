FROM gyoridavid/short-video-maker:latest

# انسخ الكود
COPY server.js .

# قم بتهيئة npm وتثبيت Express
RUN npm init -y && npm install express

# افتح المنفذ
EXPOSE 8080

# شغّل الخادم
CMD ["node", "server.js"]
