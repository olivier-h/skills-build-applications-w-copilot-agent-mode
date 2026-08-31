import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT || 8000);
app.use(cors());
app.use(express.json());
const baseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
const fallbackUsers = [
    { _id: 'u1', name: 'Ava Thompson', email: 'ava@octofit.test', team: 'Storm Squad', points: 420, level: 'Gold' },
    { _id: 'u2', name: 'Leo Martinez', email: 'leo@octofit.test', team: 'River Riders', points: 390, level: 'Silver' },
    { _id: 'u3', name: 'Nia Patel', email: 'nia@octofit.test', team: 'Lightning', points: 510, level: 'Platinum' },
];
const fallbackTeams = [
    { _id: 't1', name: 'Storm Squad', coach: 'Coach Lee', members: ['Ava Thompson', 'Max Wu'], wins: 8 },
    { _id: 't2', name: 'River Riders', coach: 'Coach Gomez', members: ['Leo Martinez', 'Priya Shah'], wins: 6 },
    { _id: 't3', name: 'Lightning', coach: 'Coach Nguyen', members: ['Nia Patel', 'Sam Ortiz'], wins: 10 },
];
const fallbackActivities = [
    { _id: 'a1', userId: 'u1', type: 'Running', durationMinutes: 35, distanceKm: 5.3, calories: 420, date: '2026-08-31T08:00:00.000Z' },
    { _id: 'a2', userId: 'u2', type: 'Strength', durationMinutes: 45, distanceKm: 0, calories: 310, date: '2026-08-30T16:30:00.000Z' },
    { _id: 'a3', userId: 'u3', type: 'Cycling', durationMinutes: 50, distanceKm: 18.5, calories: 540, date: '2026-08-29T18:15:00.000Z' },
];
const fallbackLeaderboard = [
    { _id: 'l1', rank: 1, userId: 'u3', name: 'Nia Patel', teamName: 'Lightning', points: 510 },
    { _id: 'l2', rank: 2, userId: 'u1', name: 'Ava Thompson', teamName: 'Storm Squad', points: 420 },
    { _id: 'l3', rank: 3, userId: 'u2', name: 'Leo Martinez', teamName: 'River Riders', points: 390 },
];
const fallbackWorkouts = [
    { _id: 'w1', title: 'Cardio Blast', focus: 'Endurance', difficulty: 'Intermediate', durationMinutes: 25, equipment: ['Jump rope', 'Mat'] },
    { _id: 'w2', title: 'Core Circuit', focus: 'Core strength', difficulty: 'Beginner', durationMinutes: 20, equipment: ['Mat'] },
    { _id: 'w3', title: 'Power Ladder', focus: 'Explosive movement', difficulty: 'Advanced', durationMinutes: 30, equipment: ['Cones', 'Agility ladder'] },
];
async function loadUsers() {
    try {
        await connectToDatabase();
        const users = await User.find().lean();
        return users.length ? users : fallbackUsers;
    }
    catch {
        return fallbackUsers;
    }
}
async function loadTeams() {
    try {
        await connectToDatabase();
        const teams = await Team.find().lean();
        return teams.length ? teams : fallbackTeams;
    }
    catch {
        return fallbackTeams;
    }
}
async function loadActivities() {
    try {
        await connectToDatabase();
        const activities = await Activity.find().lean();
        return activities.length ? activities : fallbackActivities;
    }
    catch {
        return fallbackActivities;
    }
}
async function loadLeaderboard() {
    try {
        await connectToDatabase();
        const entries = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
        return entries.length ? entries : fallbackLeaderboard;
    }
    catch {
        return fallbackLeaderboard;
    }
}
async function loadWorkouts() {
    try {
        await connectToDatabase();
        const workouts = await Workout.find().lean();
        return workouts.length ? workouts : fallbackWorkouts;
    }
    catch {
        return fallbackWorkouts;
    }
}
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running',
        baseUrl,
        endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
    });
});
app.get('/api/users', async (_req, res) => {
    const users = await loadUsers();
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await loadTeams();
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await loadActivities();
    res.json(activities);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await loadLeaderboard();
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await loadWorkouts();
    res.json(workouts);
});
app.listen(port, '0.0.0.0', async () => {
    console.log(`Octofit Tracker API listening on ${baseUrl}`);
    try {
        await connectToDatabase();
        console.log('MongoDB connection is available for the Octofit Tracker app.');
    }
    catch (error) {
        console.warn('MongoDB is not available yet; using local fallback sample data.', error);
    }
});
