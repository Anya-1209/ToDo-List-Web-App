import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Define task lists
const todayTasks = [];
const workTasks = [];
const shoppingTasks = [];

// Serve static files from the public directory
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index', { todayTasks, workTasks, shoppingTasks });
});

// Handle task creation form submission
app.post('/addTask', (req, res) => {
    const { taskText, taskType } = req.body;

    if (taskType === 'work') {
        workTasks.push({ text: taskText, completed: false });
    } else if (taskType === 'shopping') {
        shoppingTasks.push({ text: taskText, completed: false });
    } else {
        todayTasks.push({ text: taskText, completed: false });
    }

    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
