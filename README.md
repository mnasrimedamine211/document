# DOCUMENT

The Text Classification System is a web application designed to facilitate the process of labeling text documents. Users can upload documents, assign labels to them, and save this information in a database. Additionally, the system provides functionality to view a list of labeled documents.

Features
Document Management: Users can upload text documents to the system.
Label Assignment: Users can assign one or more labels to each document.
Database Integration: The system integrates with MongoDB to store document-text and label associations.
Document List: Users can view a list of documents along with their assigned labels.


## Installation

### Frontend

1. Navigate to the `frontend` directory:
    ```
    cd frontend
    ```
2. Install dependencies using npm:
    ```
    npm install
    ```
3. Run the frontend server:
    ```
    ng serve
    ```

### Backend

1. Ensure you have MongoDB installed and running.
2. Create a database named `test_document` in MongoDB.
3. Navigate to the `backend` directory:
    ```
    cd backend
    ```
4. Activate the virtual environment (assuming you have already set it up):
    ```
    source venv/bin/activate
    ```
5. Install Python dependencies from `requirements.txt`:
    ```
    pip install -r requirements.txt
    ```
6. Navigate to the Django project directory:
    ```
    cd django_backend
    ```
7. Run the Django development server:
    ```
    python manage.py runserver
    ```

