import './App.css'

const leaderboard = [
  { name: 'Nia Patel', team: 'Lightning', points: 510, badge: 'Gold' },
  { name: 'Ava Thompson', team: 'Storm Squad', points: 420, badge: 'Silver' },
  { name: 'Leo Martinez', team: 'River Riders', points: 390, badge: 'Bronze' },
]

const workouts = [
  { title: 'Cardio Blast', focus: 'Endurance', duration: '25 min' },
  { title: 'Core Circuit', focus: 'Core strength', duration: '20 min' },
  { title: 'Power Ladder', focus: 'Explosive movement', duration: '30 min' },
]

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="ms-auto text-light small">Mergington High School</div>
        </div>
      </nav>

      <main className="container py-4">
        <section className="row g-4 align-items-stretch mb-4">
          <div className="col-md-8">
            <div className="card h-100 border-0 shadow-sm hero-card">
              <div className="card-body p-4">
                <p className="text-uppercase text-primary fw-semibold mb-2">Fitness challenge</p>
                <h1 className="display-6 fw-bold mb-3">Turn every workout into a win.</h1>
                <p className="lead text-secondary mb-4">
                  Track activity, build healthy competition, and motivate every student to stay active.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <button className="btn btn-primary px-4">Log activity</button>
                  <button className="btn btn-outline-primary px-4">View leaderboard</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm stat-card">
              <div className="card-body p-4">
                <p className="text-muted text-uppercase small mb-2">This week</p>
                <div className="display-5 fw-bold text-dark">3,420</div>
                <p className="text-success fw-semibold mb-0">+18% vs last week</p>
              </div>
            </div>
          </div>
        </section>

        <section className="row g-4 mb-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h2 className="h4 mb-0">Leaderboard</h2>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="list-group list-group-flush">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.name} className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="rank-badge">#{index + 1}</span>
                        <div>
                          <div className="fw-semibold">{entry.name}</div>
                          <small className="text-muted">{entry.team}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold">{entry.points} pts</div>
                        <small className="text-primary">{entry.badge}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h2 className="h4 mb-0">Suggested workouts</h2>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="d-grid gap-3">
                  {workouts.map((workout) => (
                    <div key={workout.title} className="p-3 border rounded-3 bg-light-subtle">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="h6 mb-1">{workout.title}</h3>
                        <span className="badge bg-success-subtle text-success">{workout.duration}</span>
                      </div>
                      <small className="text-secondary">{workout.focus}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
