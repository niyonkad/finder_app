## Requirements
- Python 3.xx

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devhacks-2024/In-De-Nile-Repository.git
   ```

### Backend Setup

1. Navigate to the project directory:

    ```bash
    cd In-De-Nile-Repository
    ```
2. Create, then activate a Virtual Environment (Optional):

    ```bash
    python -m venv .venv
    source .venv/bin/activate (on MacOS/Linux)
    source .venv/Scripts/activate (on Windows)
    ```

3. Install Dependencies:

    ```bash
    cd backend
    python -m pip install -r requirements.txt
    ```

4. Apply Migrations

    ```bash
    python manage.py migrate
    ```

5. Start the development server

    ```bash
    python manage.py runserver
    ```
