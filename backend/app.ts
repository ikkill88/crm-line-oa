import dashboardRouter from "./routes/dashboard";
import messagesRouter from "./routes/messages";
// ...
app.use("/api", dashboardRouter);
app.use("/api", messagesRouter);