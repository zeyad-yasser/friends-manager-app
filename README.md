# Friends Management Application

A full-stack web application built with Flask and React for managing friends' information.

## Project Structure

```
Flask_React/
├── Flask_Server/         # Backend Flask application
│   ├── app.py           # Main Flask application
│   ├── models.py        # Database models
│   ├── routes.py        # API routes
│   └── requirements.txt # Python dependencies
│
├── client/              # Frontend React application
│   ├── public/         
│   ├── src/            
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── App.js      # Main React component
│   ├── package.json    
│   └── README.md       
│
└── README.md           # This file
```

## Features

- RESTful API with Flask backend
- React frontend with Material-UI components
- SQLite database with SQLAlchemy ORM
- CRUD operations for friend management
- Automatic avatar generation based on gender
- Responsive design for all screen sizes

## Getting Started

### Backend Setup

1. Navigate to Flask_Server directory:
```bash
cd Flask_Server
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run Flask application:
```bash
python app.py
```

The backend server will start at `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The frontend application will start at `http://localhost:3000`

## API Endpoints

- `GET /api/friends` - Get all friends
- `POST /api/friends` - Create a new friend
- `PATCH /api/friends/<id>` - Update a friend
- `DELETE /api/friends/<id>` - Delete a friend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
