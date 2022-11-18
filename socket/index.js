const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

// create user

let users = [];

//add user to server

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

//remove user from server

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when connected
    console.log("a user is connected with socket id", socket.id);
    //take the userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);

        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage"), {
            senderId,
            text
        }
    })


    //when disconnected
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log("user disconnected");
    });

  console.log('The length of users', users.length)
});
