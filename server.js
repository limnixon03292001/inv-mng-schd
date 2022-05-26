const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connDb = require("./config/connDb");

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const notifRoutes = require("./routes/notifRoutes");

const app  = express();

dotenv.config();
app.use(cors());
app.use(express.json());

connDb();

app.get("/", (req,res) => {
    res.send("Express server!")
})


app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/notification", notifRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listeninng on port 5000.")
});

//Sockets realtime
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:3000"],
    },
});

// this variable stores the current online users. *we need to keep track the user
let users = [];
let admin = [];



    const addUser = (userId, socketId) => {
        !users.some((user) => user?.userId === userId) &&
        users.push({ userId, socketId });
       
    };

    const addAdmin = (adminId, socketId) => {
        !admin.some((admin) => admin?.adminId === adminId) &&
        admin.push({ adminId, socketId });
    };
  
    const removeUser = (socketId) => {
        users = users.filter((user) => user?.socketId !== socketId);
    };

    const removeAdmin = (socketId) => {
        console.log("admin socketid:", socketId)
        admin = admin.filter((adminx) => adminx?.socketId !== socketId);
    };
    
//   const getUser = (userId) => {
//      return userId.map((u) => {
//          return users.filter((user) => user.userId === u?._id);
//      })
//   };

io.on("connection", (socket) => {
    const id = socket.id;

     //add userId and socketId to user variable
    socket.on("addUser", (userId) => {
        console.log("current", userId);
        addUser(userId, id);
    });

     //add adminId and socketId to admin variable
     socket.on("addAdmin", (adminId) => {
        addAdmin(adminId, id);
        console.log("admin connected", admin);
    });


    // send a notification to admin
    socket.on("sendNotifAdmin", (newNotif) => {
        console.log("notif", newNotif);
        admin.forEach(currentAdmin => {
            socket.to(currentAdmin?.socketId).emit("notifReceived", newNotif);
        });
    });
    
    // });

//   when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(id);
    removeAdmin(id);
    console.log("user:", users);
    console.log("admin:",admin);
  });

})