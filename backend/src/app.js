const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const employeesRoutes = require('./routes/employees.routes');
const employersRoutes = require('./routes/employers.routes');
const jobsRoutes = require('./routes/jobs.routes');
const vouchesRoutes = require('./routes/vouches.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/employers', employersRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/vouches', vouchesRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'VouchSafe API' }));

module.exports = app;
