require('./db_con')
const express = require('express');
const course_router=require('./routers/courses')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/courses',course_router);

app.listen(port, () => console.log(`Server on ${port}`));